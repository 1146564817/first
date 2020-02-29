<template>
  <!-- center 居中显示 -->
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref='form'>
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { statusEdit } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        rid: "",
        name: ""
      },
      // 表单验证
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 编辑内容
  doEdit() {
    // 编辑 验证表单
    this.$refs.form.validate(v=>{
      // 判断是否通过
      if(v){
        // 通过  发送请求
        statusEdit({
          // 传参数
          ...this.form
        }).then(res=>{
          window.console.log(res);
          // 判断是否请求通过
          if(res.data.code==200){
            // 提示信息
            this.$message.success('编辑成功')
            // 关闭对话框
            this.dialogFormVisible = false
            // 请求刷新表单数据
            this.$parent.gosulist()
          }else{
            this.$message.error(res.data.message)
          }
        })

      }else{
        this.$message.error('验证未通过')
      }
    })
  },

  }
};
</script>

<style>
</style>