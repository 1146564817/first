<template>
  <div>
    <!-- 上面卡片 -->
    <el-card class="box-card">
      <!-- inline 行内表单模式 -->
      <el-form  ref='formInline' :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop='rid'>
          <el-input class="wideA" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop='name'>
          <el-input class="wideB" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop='username'>
          <el-input class="wideA" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop='status'>
          <el-select class="wideC"  v-model="formInline.status" placeholder="请选择状态">
            <el-option  label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        
      <!-- onSubmit -->
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button size="medium" type="primary" @click="onSubmit">搜索</el-button>
          <el-button size="medium" @click="Eliminate">清除</el-button>
          <el-button size="medium" icon="el-icon-plus" type="primary" @click="$refs.subjectAdd.dialogFormVisible=true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  
    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
         <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>

        <el-table-column prop="name" label="学科名称"></el-table-column>

        <el-table-column prop="short_name" label="简称"></el-table-column>

        <el-table-column prop="username" label="创建者"></el-table-column>

        <el-table-column prop="create_time" label="创建日期"></el-table-column>

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
      <subjectAdd ref='subjectAdd'></subjectAdd>
      <subjectEide ref='subjectEide'></subjectEide>
  </div>

</template>

<script>
import { sulist ,statusid,statusRemove} from "@/api/subject.js";
import subjectAdd from './components/subjectAdd.vue'
import subjectEide from './components/subjectEide.vue'
export default {
  name:'name',
  components:{
    subjectAdd,
    subjectEide
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
    // 表单点击搜索
    onSubmit(){
      // 搜索时默认页面为1
      this.page=1
      this.gosulist()
    },
    // 清除表单筛选内容
    Eliminate(){
      // 清空表单resetFields
      this.$refs.formInline.resetFields();
      // 清空后重新请求表格数据
      this.gosulist()
    },

    // 编辑按钮事件 组件之间传值
    handleEdit(item){
      // 使用父子传参 将子组件的  dialogFormVisible 改为 true  点击时显示对话框
      this.$refs.subjectEide.dialogFormVisible=true
      
      // 组件之间传内容
      // 需要判断点击的内容传参是否是上一次被点击过的
      // 如果本次点击的按钮不是上一次被点击的按钮就传数据过去  如果是就不动
      if(item!=this.dataEide){
        // 引用对象赋值 就相当于将同一个对象地址的属性 赋值了  一个赋值变量修改了  内存中的页该了
        // this.$refs.subjectEide.form=item
        // 使用...解构复制一个对象 赋值给对话框的from对象  
        this.$refs.subjectEide.form={...item}
        // 将本次点击这行的值 赋值给 声明的变量  让它可以在被点击时进行数据对比 
        this.dataEide=item
      }
     
    },
  // 删除表单
    handleDelete(item){
      statusRemove({
        id:item.id
      }).then(res=>{
        window.console.log(res);
        if(res.data.code==200){

          this.$message.success('删除成功')
          // 判断 如果本页码中的数据条 等于1 在删除时  就设置默认当前显示页 为第1页
          if(this.tableData.length==1){
            this.page=1
          }
          // 调用请求数据
          this.gosulist()
        }else{
          // this.$message.error(res.data.message)
          this.$message.error(res.data.message)
        }
        
        
      })
    },
  
    // 表格请求封装
    gosulist(){
      sulist(
      {
        page:this.page,
        // page:this.page;
        limit:this.size,
        ...this.formInline
      }
      ).then(res=>{
      window.console.log(res);
      // 总数据
      this.total=res.data.data.pagination.total
      // 表格信息对象
      this.tableData = res.data.data.items;
    })
    },
    // 启用或禁用按钮
    handleid(itme){
      statusid({
        id:itme.id
      }).then(()=>{
        this.$message.success('状态修改成功')
        this.gosulist()
      })
    },

    // 页码改变事件
    handleSizeChange(size){
       // 赋值新的页码容量
      this.size=size
      // 如果页码容量改变了 都要从第1页开始
      this.page=1
      this.gosulist()
    },
    // 分页切换事件 
    handleCurrentChange(page){
     this.page=page
      this.gosulist()
    }
  },
  created() {
    this.gosulist()
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