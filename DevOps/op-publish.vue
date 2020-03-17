<template lang='pug'>
.publish
  project-dialog(ref='projectDialog', @success='search')
  //- el-dialog.test-dialog(title='发布测试', :visible.sync='showTestDialog', with='1000px')
  //-   el-form-item(label="分支名")
  //-     el-input(v-model='testBranches')
  //-   .dialog-footer(slot='footer')
  //-     el-button(@click='showTestDialog = false') 取消
  //-     el-button(type='primary', @click='doStartTest')

  el-dialog.test-dialog(title='发布测试', :visible.sync='showTestDialog',
  width="30%")
    el-input(v-model='testBranches', placeholder='请输入分支', style='margin-bottom: 10px;')
    el-input(v-model='extraParams', placeholder='构建参数 $MOZART_EXTRA_PARAMS')
    .dialog-footer(slot='footer')
      el-button(size='small', @click='closeTestDialog') 取消
      el-button(size='small', @click='removeMergedBranches') 过滤已合并分支
      el-button.primary(size='small', type='primary', @click='doStartTest') 确定

  el-dialog.rollback-dialog(title='回滚版本', :visible.sync='showRollbackDialog', with='1000px')
    .screen
      el-table(:data='rollbackChoices')
        el-table-column(label='版本')
          template(slot-scope="scope") {{scope.row.version}}
        el-table-column(label='commit')
          template(slot-scope="scope") {{scope.row.commit}}
        el-table-column(label='发布时间')
          template(slot-scope="scope") {{scope.row.time}}
        el-table-column
          template(slot-scope="scope")
            el-button(size='mini', @click='rollbackProjectVersion(scope.row.version)') 回滚该版本

  el-dialog.history-dialog(title='发布历史', :visible.sync='showHistoryDialog', width='1000px')
    .screen
      el-table(:data='histories')
        el-table-column(label='时间')
          template(slot-scope="scope") {{formatTime(scope.row.startTime)}}
        el-table-column(label='分支')
          template(slot-scope="scope") {{scope.row.branches || 'master'}}
        el-table-column(label='发布者')
          template(slot-scope="scope") {{scope.row.user.realname}}
        el-table-column(label='状态')
          template(slot-scope="scope") {{statusText(scope.row.status)}}
        el-table-column(label='日志')
          template(slot-scope="scope")
            span(@click='checkLog(scope.row)') 点击查看

  el-dialog.log-dialog(title='发布日志', :visible.sync='showLogDialog', width='1000px')
    .screen(id='logScreen')
      .row(v-for='log in logs', v-html='log')

  // 添加项目
  // 项目列表
  el-table(:data='data', style="width: 100%")
      el-table-column(prop="id", label="id")
      el-table-column(prop="name", label="名称")
      el-table-column(prop="desc", label="描述")
      el-table-column(label="任务")
        template(slot-scope="scope")
          .task-block(v-for='action in ["test", "prerelease", "release"]')
            template(v-if='scope.row[runningTaskName(action)]')
              el-progress(:percentage='scope.row[action + "_percent"] || 0', stauts='success')
              .funcs
                span.item
                  i.el-icon-search
                  span.text(@click='checkLog(scope.row[runningTaskName(action)])') 查看详情
                span.item
                  i.el-icon-circle-close-outline
                  span.text(@click='cancelTask(scope.row, action)') 取消发布
            template(v-else)
              el-button(size="mini", @click="startTask(action, scope.row)") 发布{{nameFromAction(action)}}
            el-button(size='mini', @click='showHistory(scope.row, action)' icon='el-icon-tickets')
          el-button(size='mini', @click='rollbackPop(scope.row)') 回滚
          el-button(size='mini', @click='checkWorkspace(scope.row)') 查看目录

      el-table-column(label="上一次构建")
        template(slot-scope="scope")
          .row 测试 {{infoStr(scope.row.lastTestTask)}}
          .row 预发 {{infoStr(scope.row.lastPrereleaseTask)}}
          .row 上线 {{infoStr(scope.row.lastReleaseTask)}}
      el-table-column(:render-header='renderOperationHeader')
        template(slot-scope="scope")
          el-button(size="mini", @click="handleEdit(scope.$index, scope.row)") 编辑
          el-button(size="mini", type="danger", @click="handleDelete(scope.$index, scope.row)") 删除
</template>

<script>
import { mapState } from 'vuex'
import ProjectDialog from '@/components/ProjectDialog'
import socket from '../socket'
import moment from 'moment'
import _ from 'lodash'
import Convert from 'ansi-to-html'
const convert = new Convert()

const notify = function (title, message) {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission()
  } else {
    const n = new Notification(title, {
      body: message
    })
    n.onclick = function () {}
  }
}

export default {
  components: {
    ProjectDialog
  },
  data () {
    return {
      showTestDialog: false,
      showHistoryDialog: false,
      showLogDialog: false,
      showRollbackDialog: false,
      rollbackProject: null,
      currentProj: null,
      dumpedBranches: [],
      testBranches: '',
      extraParams: '',
      histories: [],
      rollbackChoices: [],
      logs: [],
      data: []
    }
  },
  computed: mapState(['adminUser']),
  mounted () {
    this.search()
    socket.on('startTaskUI', ({ projectId, action, task }) => {
      const project = _.find(this.data, { id: projectId })
      this.startTaskUI(project, action, task)
    })
    socket.on('stopTaskUI', ({ projectId, action }) => {
      const project = _.find(this.data, { id: projectId })
      this.stopTaskUI(project, action)
    })
  },
  methods: {
    removeMergedBranches () {
      let proj = this.currentProj
      this.$http.get(`/project/${proj.id}/mergedBranches?branches=${this.testBranches}`)
        .then((mergedBranches) => {
          let branches = this.testBranches
          branches = branches.split(',').filter((item) => {
            return mergedBranches.indexOf(item) === -1
          })
          this.testBranches = branches.join(',')
          this.$message('过滤已合并分支：' + mergedBranches.join(','))
        })
    },
    checkWorkspace (row) {
      window.open('/workspace/' + row.name)
    },
    closeTestDialog () {
      this.showTestDialog = false
      this.currentProj = null
    },
    formatTime (time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    },
    statusText (status) {
      return ({
        1: '进行中',
        2: '成功',
        3: '已取消',
        4: '失败'
      })[status]
    },
    rollbackPop (proj) {
      this.showRollbackDialog = true
      this.rollbackChoices = []
      this.rollbackProject = proj
      this.$http.get(`/project/${proj.id}/builds`)
        .then((choices) => {
          this.rollbackChoices = choices
        })
    },
    rollbackProjectVersion (version) {
      let proj = this.rollbackProject
      this.$http.post(`/project/${proj.id}/rollback?version=${version}`)
        .then(() => {
          this.doTask(proj, 'release', null)
        })
      this.showRollbackDialog = false
      this.rollbackProject = null
    },
    showHistory (proj, action) {
      this.showHistoryDialog = true
      this.$http.get(`/project/${proj.id}/history?action=${action}`)
        .then((histories) => {
          console.log('histories', histories)
          this.histories = histories
        })
    },
    runningTaskName (step) {
      return 'running' + _.capitalize(step) + 'Task'
    },
    lastTaskName (step) {
      return 'last' + _.capitalize(step) + 'Task'
    },
    infoStr (task) {
      const time = task && task.endTime
      if (time) {
        const timeStr = moment(time).format('YYYY-MM-DD HH:mm')
        return `${timeStr} ${task.user.realname} ${this.statusText(task.status)}`
      } else {
        return '空'
      }
    },
    percent (proj, task) {
      let lastBuildDuration = (proj.lastBuildDuration || (50 * 60)) * 1000
      if (!task) {
        return 0
      } else {
        let timeConsuming = new Date() - new Date(task.startTime)
        if (timeConsuming < 0) {
          timeConsuming = 0
        }
        const result = timeConsuming > lastBuildDuration ? 99 : +(timeConsuming / lastBuildDuration * 100).toFixed(1)
        return result
      }
    },
    search () {
      this.$http.get('/project').then((data) => {
        this.data = data.map((item) => {
          ['test', 'prerelease', 'release'].forEach((action) => {
            const taskName = this.runningTaskName(action)
            const task = item[taskName]
            this.calPercent(item, action)
            if (task) {
              this.listenTaskStatus(item, task)
            }
          })
          return item
        })
      })
    },
    renderOperationHeader (h, data) {
      return h('el-button', {
        attrs: {
          type: 'primary',
          size: 'mini'
        },
        on: {
          click: () => {
            this.$refs.projectDialog.pop()
          }
        }
      }, '新建')
    },
    doTask (proj, action, data) {
      if (action !== 'test') {
        this.dumpedBranches.splice(0) // 清空
      }
      this.$http.post(`/project/${proj.id}/${action}`, data)
      .then((task) => {
        this.startTaskUI(proj, action, task, true)
      })
    },
    nameFromAction (action) {
      return ({
        test: '测试',
        prerelease: '预发',
        release: '上线'
      })[action]
    },
    calPercent (proj, action) {
      const taskName = this.runningTaskName(action)
      const task = proj[taskName]
      const percent = this.percent(proj, task)
      proj[action + '_percent'] = percent
    },
    listenTaskStatus (proj, task) {
      console.log('listenTaskStatus', task)
      const action = task.action
      const actionName = this.nameFromAction(action)
      const taskName = this.runningTaskName(action)
      const successTaskName = this.lastTaskName(action)
      task.interval = setInterval(() => {
        this.calPercent(proj, action)
      }, 1000)
      this.calPercent(proj, action)

      let notifyContent = ''
      if (task.action === 'test') {
        notifyContent = `分支：${task.branches}`
      }
      notifyContent += `发布者：${task.user.realname}`

      socket.on(task.id + '-fail', () => {
        proj[taskName] = null
        const title = `${proj.name}发布${actionName}失败`
        this.$message({
          type: 'error',
          message: title
        })
        notify(title, notifyContent)
        socket.off(task.id + '-fail')
      })
      socket.on(task.id + '-success', () => {
        proj[taskName] = null
        task.endTime = new Date()
        proj[successTaskName] = task
        const title = `${proj.name}发布${actionName}成功`
        this.$message({
          type: 'success',
          message: title
        })
        notify(title, notifyContent)
        socket.off(task.id + '-success')
        if (this.dumpedBranches.length) {
          this.$http.get(`/project/${proj.id}/dumpBranches`, {
            params: {
              branches: this.dumpedBranches.join(',')
            }
          })
            .then(ownerInfo => {
              // 邮件非本人的话是需要通知的
              let email = this.$store.state.adminUser.username
              let needNotification = ownerInfo.filter(user => user.authoremail !== email)
              this.$confirm('以下未被合并包人员被下包' + needNotification.map(user => user.branch + user.authorname).join(','), '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // this.$message({
                //   type: 'success',
                //   message: '通知功能未上线'
                // })
              }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '不通知'
                // })
              })
            })
            .catch(e => {
              // 无法获取被下线的分支名单
              console.error(e)
            })
        }
      })
    },
    doStartTest () {
      let value = this.testBranches
      let extraParams = this.extraParams
      let proj = this.currentProj
      this.showTestDialog = false
      let lastSuccessBranches = proj.lastTestTask ? proj.lastTestTask.branches : 'master'
      this.dumpedBranches = lastSuccessBranches.split(',').filter(branch => !value.includes(branch))
      this.doTask(proj, 'test', {
        branches: value,
        params: extraParams
      })
    },
    startTask (action, proj) {
      const name = this.nameFromAction(action)
      if (action === 'test') {
        this.showTestDialog = true
        this.currentProj = proj
        this.testBranches = proj.lastTestTask ? proj.lastTestTask.branches : 'master'
      } else {
        this.$prompt(`确认要发布${name}“${proj.name}”么？`, `发布${proj.name}`, {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          inputPlaceholder: '构建参数 $MOZART_EXTRA_PARAMS'
        }).then((e) => {
          this.doTask(proj, action, {
            params: e.value
          })
        })
      }
    },
    startTaskUI (proj, action, task, emit) {
      const name = this.nameFromAction(action)
      const taskName = this.runningTaskName(action)
      proj[taskName] = task
      this.$message({
        type: 'success',
        message: '正在发布' + name
      })

      this.listenTaskStatus(proj, task)
      if (emit) {
        socket.emit('startTaskUI', {
          projectId: proj.id,
          action,
          task
        })
      }
    },
    stopTaskUI (project, action, emit) {
      if (emit) {
        socket.emit('stopTaskUI', {
          projectId: project.id,
          action
        })
      }
      const taskName = this.runningTaskName(action)
      project[taskName] = null
      this.$message({
        type: 'success',
        message: '取消发布'
      })
    },
    cancelTask (project, action) {
      const taskName = this.runningTaskName(action)
      const task = project[taskName]
      if (!task) {
        return
      }

      clearInterval(task.interval)
      this.$http.post(`/task/${task.id}/cancel`)
        .then((result) => {
          this.stopTaskUI(project, action, true)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    logScreenToBottom () {
      const logScreen = document.getElementById('logScreen')
      if (logScreen) {
        logScreen.scrollTop = logScreen.scrollHeight
      }
    },
    checkLog (task) {
      this.$http.get(`/task/${task.id}/logs`)
        .then((logs) => {
          this.showLogDialog = true
          try {
            this.logs = logs.split(/\n/g).map((line) => {
              return convert.toHtml(line)
            })
            this.logScreenToBottom()
          } catch (e) {
            console.log(e)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })

      if (task.status === 1) {
        socket.on(task.id + '-log', (log) => {
          console.log('log', log)
          this.logs.push(convert.toHtml(log))
          this.logScreenToBottom()
        })
      }
    },
    handleEdit (index, data) {
      this.$refs.projectDialog.pop(data)
    },
    handleDelete (index, data) {
      this.$confirm(`确认要删除“${data.name}”么？`, '删除host', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/project/${data.id}`)
          .then(() => {
            this.data.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
      })
    }
  }
}
</script>

<style lang="less">
.publish {
  .login {
    width: 400px;
    margin: 0 auto;
  }
  .task-block {
    margin-bottom: 10px;
  }
  .funcs {
    i {
      margin-right: 3px;
    }
    .item {
      cursor: pointer;
      margin-right: 10px;
    }
  }

  .log-dialog {
    .el-dialog__body {
      padding-top: 10px;
    }
    .screen {
      height: 400px;
      overflow: scroll;
      background-color: #333;
      color: #fff;
      padding: 10px;
      border-radius: 4px;
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/pages/Publish.vue
