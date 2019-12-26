<template>
  <el-dialog
    title="表单编辑"
    :before-close="closeForm"
    :visible.sync="visible">
    <el-form
      :model="form">
      <el-form-item
        label="投放 ID"
        :label-width="formLabelWidth">
        <el-input
          v-model="form.putId"
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item
        label="投放链接"
        :label-width="formLabelWidth">
        <el-input
          v-model="form.putLink"
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item
        label="主标题"
        :label-width="formLabelWidth">
        <el-input
          v-model="form.title"
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item
        label="副标题"
        :label-width="formLabelWidth">
        <el-input
          v-model="form.subtitle"
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item
        label="投放时间"
        :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.putTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="closeForm">
        取消
      </el-button>
      <el-button
        @click="saveForm"
        type="primary">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "FormModal",
    props: {
      dialogFormData: {
        type: Object,
        default: () => {},
      },
      dialogFormVisible: {
        type: Boolean,
        default: () => false,
      },
      // closePutItem: {
      //   type: Function,
      //   default: () => {},
      // },
      // savePutItem: {
      //   type: Function,
      //   default: () => {},
      // },
    },
    data() {
      return {
        form: {
          putId: "",
          putLink: "",
          title: "",
          subtitle: "",
          putTime: "",
          datetimeRange: ["", ""],
        },
        formLabelWidth: "120px",
        visible: true,
        // visible: false,
      };
    },
    methods: {
      init() {
        //
      },
      closeForm() {
        // this.visible = false;
        console.log(`close modal`);
        // this.$emit(`closePutItem`);
        // this.$emit(`close-putItem`);
        this.$emit(`close-put-item`);
      },
      saveForm() {
        // this.visible = false;
        console.log(`save form`);
        // this.$emit(`savePutItem`, {abc: 123});
        this.$emit(`save-put-item`, {abc: 123});
      },
    },
    mounted() {
      this.init();
      this.visible = this.dialogFormVisible;
    },
    created() {
      this.visible = this.dialogFormVisible;
      // const {
      //   dialogFormVisible,
      //   dialogFormData,
      // } = this;
      // this.visible = this.dialogFormVisible;
      // this.form = dialogFormData;
    },
     watch: {
      dialogFormVisible(newProp, oldProp){
        console.log(`newProp, oldProp`, newProp, oldProp)
        this.visible = newProp;
      }
    },
  }
</script>

<style lang="less">
</style>
