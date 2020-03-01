<template>
  <!-- center 居中显示 -->
  <el-dialog center :title="idname? '编辑用户': '新增用户'" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref='form'>
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

     <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
        <el-select @change="form.role_id = form.role" v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
        </el-select>
     </el-form-item>
     <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
        </el-select>
     </el-form-item>

      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
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
import { userAdd ,userEdit} from "@/api/user.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: { },
      idname:false,
      // 表单验证
      rules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: "邮箱格式不正确", trigger: "blur" }
        ],
        phone: [
            { required: true, message: "手机号码不能为空", trigger: "blur" },
            { pattern: /0?(13|14|15|18|17)[0-9]{9}/, message: "手机号码格式不正确", trigger: "blur" }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {

    doAdd() {
        // 验证表单是否通过
       this.$refs.form.validate(v=>{
           if(v){
            if(this.idname){
                // 修改
            userEdit(this.form)
            .then(res=>{
                window.console.log(res);
                if(res.data.code==200){
                    this.$message.success('编辑成功')
                    this.dialogFormVisible=false,
                    this.$parent.goulist()
                }
            })
            
            }else{
                // 新增
            userAdd({
                ...this.form
            }).then(res=>{
                 window.console.log(res);
                 if(res.data.code==200){
                    this.$message.success('新增成功')
                     this.dialogFormVisible=false,
                     this.$parent.goulist()
                 }
            })
            }
           
           }
       })
    }
    
  }
};
</script>

<style>
</style>