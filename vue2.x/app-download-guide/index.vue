<template>
  <page title="APP 投放管理">
    <!-- tabs -->
    <el-tabs
      v-model="activeName"
      @tab-click="tabsHandler">
      <el-tab-pane
        v-for="({key, title}, index) in tabs"
        :key="index"
        :label="title"
        :name="key">
        <!-- button & search -->
        <el-row class="app-downlaod-guide-search">
          <el-col :span="4">
            <el-button
              @click="openPutItem"
              type="primary">
              添加
            </el-button>
          </el-col>
          <el-col :span="12" class="app-downlaod-guide-input">
            <el-input
              :placeholder="placeholder"
              v-model="searchValue"
              @input="inputHandler"
              class="input-with-select">
              <el-button
                  :disabled="isEmpty"
                  @click="searchHandler"
                  slot="append"
                  :title="isEmpty ? `输入的搜索内容不可为空！` : ``"
                  :style="isEmpty ? `color: #fff; background-color: #ccc;` : `color: #fff; background-color: #409EFF;`"
                  icon="el-icon-search">
                  查询
              </el-button>
            </el-input>
          </el-col>
        </el-row>
        <!-- table -->
        <el-table
          :data="tableData"
          border
          class="app-downlaod-guide-table"
          style="width: 100%">
          <el-table-column
            v-for="({
              prop,
              label,
              align,
              width,
              slot,
            }, i) in channelClomuns"
            :key="prop + i"
            :prop="prop"
            :width="width"
            :align="align"
            :label="label">
            <template
              slot-scope="scope">
              <a
                v-if="prop === `putLink`"
                target="_blank"
                href="tableData[scope.$index].putLink">
                {{tableData[scope.$index].putLink}}
              </a>
              <span v-else>
                {{tableData[scope.$index][prop]}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :key="operations.prop"
            :prop="operations.prop"
            :align="operations.align"
            :label="operations.label">
            <template
              slot-scope="scope"
              v-if="operations.slot">
              <el-button
                v-if="isShowEdit"
                type="primary"
                @click="editHandler(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button
                v-if="isShowDelete"
                type="danger"
                @click="deleteHandler(scope.$index, scope.row)">
                下架
              </el-button>
              <el-button
                v-if="isShowPublish"
                type="primary"
                @click="handlePublishHandler(scope.$index, scope.row)">
                上架
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="app-downlaod-guide-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="pagination.sizes"
          :page-size="pagination.size"
          :layout="pagination.layout"
          :total="pagination.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- modal -->
    <FormModal
      :dialogFormVisible="dialogFormVisible"
      :dialogFormData="dialogFormData"
      @close-put-item="closePutItem"
      @save-put-item="savePutItem"
    />
    <!-- <FormModal
      :dialogFormVisible="dialogFormVisible"
      :dialogFormData="dialogFormData"
      :closePutItem="closePutItem"
      :savePutItem="savePutItem"
    /> -->
  </page>
</template>

<script>
  /**
   *
   * @author xgqfrms
   *
   * @description 模块 AppDOwnLoadGuide
   * @augments
   * @example
   * @link
   * @created 2019-12-24
   *
   */
  import axios from 'axios';
  import tableData from "./datas";
  import { APP_DOWNLOAD_GUIDE } from "./CONSTANTS";
  import FormModal from './form-modal';

  const {
    tabs,
    channelClomuns,
    operations,
  } = APP_DOWNLOAD_GUIDE;

  export default {
    name: 'AppDOwnLoadGuide',
    components: {
      FormModal,
    },
    data() {
      return {
        tabs: tabs,
        channelClomuns: channelClomuns,
        operations: operations,
        activeName: "published",
        isEmpty: true,
        searchValue: "",
        placeholder: "请输入查询内容",
        isShowPublish: true,
        isShowEdit: true,
        isShowDelete: true,
        // tableData: [],
        tableData: tableData,
        pagination: {
          current: 1,
          size: 10,
          total: 100,
          // total: 0,
          sizes: [10, 20, 30, 50],
          layout: "total, sizes, prev, pager, next, jumper",
        },
        dialogFormVisible: false,
        dialogFormData: {
          putId: "",
          putLink: "",
          title: "",
          subtitle: "",
          putTime: "",
          datetimeRange: ["", ""],// stringify array
        },
      };
    },
    methods: {
      // flag
      openPutItem() {
        this.dialogFormVisible = true;
        console.log(`open`, this.dialogFormVisible);
      },
      closePutItem() {
        this.dialogFormVisible = false;
        console.log(`open`, this.dialogFormVisible);
      },
      savePutItem(flag = `add`, data = {}) {
        // save flag
        console.log(`add / edit`, data)
      },
      editPutItem() {
        this.dialogFormVisible = true;
      },
      // tabs handler
      tabsHandler(tab, event) {
        const name = tab.name || ``;
        switch (name) {
          case "published":
            this.isShowPublish = false;
            this.isShowEdit = true;
            this.isShowDelete = true;
            break;
          case "deleted":
            this.isShowPublish = true;
            this.isShowEdit = true;
            this.isShowDelete = false;
            break;
          case "ready":
          default:
            this.isShowPublish = true;
            this.isShowEdit = true;
            this.isShowDelete = true;
            break;
        }
      },
      // table handlers
      publishHandler(index, row) {
        console.log(`publish index, row`, index, row);
      },
      editHandler(index, row) {
        console.log(`edit index, row`, index, row);
      },
      deleteHandler(index, row) {
        console.log(`delete index, row`, index, row);
      },
      handleSizeChange(size = 10) {
        console.log(`size =`, size);
      },
      handleCurrentChange(page = 1) {
        console.log(`curenr =`, page);
      },
      // search
      inputHandler(value = ``) {
        const empty = value.length ? false : true;
        this.searchValue = value;
        this.isEmpty = empty;
      },
      searchHandler(e) {
        const value = this.searchValue;
      },
      fetchTableData(){
        //
      },
      fetchSearchData(){
        //
      },
      init() {
        // this.fetchTableData();
      }
    },
    mounted() {
      this.init();
    },
    created() {
      // console.log(`created `, this.props);
    },
  }
</script>

<style lang="less">
  .app-downlaod-guide-container {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    width: calc(100vw);
    height: calc(2.9rem);
    border-bottom: 0.2rem solid rgba(249, 248, 253, 1);
  }
  .app-downlaod-guide-input{
    max-width: 700px;
    min-width: 200px;
  }
  .app-downlaod-guide-search,
  .app-downlaod-guide-pagination,
  .app-downlaod-guide-table{
    position: relative;
    box-sizing: border-box;
    margin-top: 30px;
  }
</style>
