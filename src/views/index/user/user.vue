<template>
  <div>
    <!-- 上面卡片 -->
    <el-card class="box-card">
      <!-- inline 行内表单模式 -->
      <el-form  ref='formInline' :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop='username'>
          <el-input class="wideA" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop='email'>
          <el-input class="wideB" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop='role_id'>
          <el-select class="wideC"  v-model="formInline.role_id" placeholder="请选择角色">
            <el-option  label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        
      <!-- onSubmit -->
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button size="medium" type="primary" @click="onSubmit">搜索</el-button>
          <el-button size="medium" @click="Eliminate">清除</el-button>
          <el-button size="medium" icon="el-icon-plus" type="primary" @click="clicklb" >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
         <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>

        <el-table-column prop="phone" label="电话"></el-table-column>

        <el-table-column prop="email" label="邮箱"></el-table-column>

        <el-table-column prop="role" label="角色"></el-table-column>

        <el-table-column prop="create_time" label="备注"></el-table-column>

        <el-table-column prop="status" label="状态">
           <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
           
        </el-table-column>

        <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
        <el-button 
        type="text"
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
          
        <el-button 
        type="text"
          size="mini"
          @click="handleid(scope.row)">{{scope.row.status==1?'禁用':'启用'}}</el-button>
        <el-button
        type="text"
          size="mini"
          @click="handleDelete(scope.row)">删除</el-button>
        </template>
        </el-table-column>
        
      </el-table>
      <!-- size-change 页数  current-change分页  current-page 当前页  page-sizes 一页多少条 page-size 默认多少条一页   layout允许模式   total 总数据 -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
      <!-- <subjectAdd ref='subjectAdd'></subjectAdd>
      <subjectEide ref='subjectEide'></subjectEide> -->
      <userli ref='userli'></userli>
  </div>

</template>

<script>
// import { sulist ,statusid,statusRemove} from "@/api/subject.js";
// import subjectAdd from './components/subjectAdd.vue'
// import subjectEide from './components/subjectEide.vue'
import userli from './components/userlis.vue'

import {userlist,userStatus,userRemove} from '@/api/user.js'
export default {
  name:'user',
  components:{
    userli
  },
  data() {
    return {
      // currentPage4:10,
      // 总数据
      total:0,
      // 每页多少条
      size:5,
      // 默认当前页
      page:1,
        // 表单筛选
      formInline: {},
      // 表格信息
      tableData: [],
      // 判断编辑时与上次点击的一致
      dataEide:null,
    };

  },
  methods: {
    // 编辑
    clicklb(){
      this.$refs.userli.dialogFormVisible=true
       this.$refs.userli.idname=false
      this.$refs.formInline.resetFields()

    },

    
    // 清除事件
    Eliminate(){
        this.$refs.formInline.resetFields()
        this.goulist()
    },
    // 搜索事件
    onSubmit(){
      this.page=1
      this.goulist()
    },
    // 编辑事件
    handleEdit(item){
      this.$refs.userli.dialogFormVisible=true
      this.$refs.userli.idname=true
      if(item!=this.dataEide){
          this.$refs.userli.form={...item}
          this.dataEide=item
      }
      
    },

    // 状态切换事件
    handleid(item){
      userStatus({
        id:item.id
      }).then(res=>{
        if(res.data.code==200){
          this.$message.success('修改成功')
          this.goulist()
        }else{
          this.$message.error(res.data.message)
        }
      })

      
    },
  
    // 删除事件
    handleDelete(item){
        userRemove({
          id:item.id
        }).then(res=>{
          if(res.data.code==200){
            this.$message.success('删除成功')
            this.goulist()
          }else{
            this.$message.error(res.data.message)
          }
        })
    },

    // 页码改变事件
    handleSizeChange(size){
      this.size=size
      this.page=1
      this.goulist()
    },
    // 分页切换事件
    handleCurrentChange(page){
      this.page=page
      this.goulist()
    },
    // 获取列表信息
    goulist(){
      userlist({
        ...this.formInline
      }).then(res=>{
       window.console.log('zhes',res);
       if(res.data.code==200){
        //  this.$message.success('')
        this.tableData=res.data.data.items
        this.total=res.data.data.pagination.total
       }
      })
    }
  },
  created() {
    this.goulist()
  }
};
</script>

<style lang='less'>
.box-card {
  margin-bottom: 20px;
  .wideA {
    width: 100px;
  }
  .wideB {
    width: 139px;
  }
  .wideC {
    width: 139px;
  }
}
</style>