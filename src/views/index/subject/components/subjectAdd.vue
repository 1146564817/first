<template>
  <!-- center 居中显示 -->
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
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
      <el-button type="primary" @click="doAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { statusAdd } from "@/api/subject.js";
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
        name: [{ required: true, message: "学科编号不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {

  doAdd() {
    // 验证表单是否通过
    this.$refs.form.validate(v=>{
    if(v){
     statusAdd({
      //  使用ES6解构赋值 简单添加传的请求参数
      ...this.form
     }).then(res=>{
      if(res.data.code==200){
        // window.console.log(res);
        // 提示
        this.$message.success('添加成功')
        // 关闭对话框
        this.dialogFormVisible = false
        
        
        // 请求刷新表单数据
        this.$parent.gosulist()
        // 通过后需要清空表单中的数据
        this.$refs.form.resetFields()

      }else{
        this.$message.error(res.data.message)
      }
    })
  
    }else{
    this.$message.error('验证码未通过')
  
  
    }
    })
  },

  }
};
</script>

<style>
</style>