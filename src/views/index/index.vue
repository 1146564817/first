<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i
          @click="isCollapse=!isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'  "
        ></i>
        <img src="./img/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.avatar" alt />
        <span class="name">{{$store.state.username}},你好</span>

        <el-button type="primary" size="small" @click="btnli" class="btnli">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <!-- 设置 宽度auto 可以自适应宽度 -->
      <el-aside width="auto" class="my-aside" >
        <el-menu router :collapse="isCollapse"  default-active="1" class="el-menu-vertical-demo">

      <template v-for="(item,index) in childrenli">
         <!--  -->
          <el-menu-item  :key="index" :index="'/index/' + item.path" v-if="item.meta.rules.includes($store.state.roles)">
            <i :class="item.meta.ioc"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>

        </template>

        </el-menu>
      </el-aside>

      <el-main class="my-main">
        <!-- 子路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from "@/api/index.js";
import { removeToken } from "@/utilis/token.js";
import  childrenli  from "@/router/children.js";




export default {
  data() {
    return {
      name: "彭彪",
      imgUrl: "",
      isCollapse: true,
      // 把路由规则存到data中
      childrenli,
    };
  },
  methods: {
    // 点击退出
    btnli() {
      // 点击时显示提示
      // 参数1 提示信息   参数2标题   参数3 对象 里面存代码操作
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定后退出请求
          logout().then(res => {
            window.console.log(res);
            // 提示
            this.$message.success("退出成功");
            // 清除内容中的token
            removeToken();
              // 使用vuex 操作数据  在html中使用不用加this  在js中使用需要加this.$  否则没有效果并报错
            this.$store.commit("quUsername", '');
            this.$store.commit("quAvatar",'');
            // 跳转到登录页面
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },

  created() {
    // 获取用户信息
    // info().then(res => {
    //   window.console.log(res);
    //   if (res.data.code == 200) {
    //     // this.name=res.data.data.username
    //     this.imgUrl = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    //     // window.console.log(this.avatar);
    //   }
    // });
  }

  // beforeCreate(){

  //   if(getToken()==null){
  //     this.$massage.error('请先登录')
  //     this.$router.push('/login')
  //   }
  // }
};
</script>

<style lang='less'>
.my-container {
  height: 100%;
}
.my-header {
  // background-color: pink;
  height: 60px;
  display: flex;
  //   左右间距相同
  //   justify-content: space-around;
  //   标签之间的距离相等
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;

    i {
      font-size: 25px;
      margin-right: 18px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      width: 92px;
      height: 22px;
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
    }
    .name {
      height: 15px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      margin-left: 10px;
    }
    .btnli {
      margin-left: 10px;
    }
  }
}
.my-aside {
  // background-color:pink;
}
.my-main {
  background-color: #0094ff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>