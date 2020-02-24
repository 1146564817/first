<template>
<el-container class="my-container">
  <el-header class="my-header">
    <div class="left">
      <i></i>
      <img src="./img/logo.png" alt="">
    </div>
    <div class="right"></div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>


</template>

<script>
// import { info } from "@/api/index.js";
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {},
  created() {
    // // 获取用户信息
    // info().then(res => {
    //   window.console.log(res);
    // });
  }
};
</script>

<style lang='less'>
.my-container {
  width: 100%;
}
.my-header {
  background-color: pink;
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
      font-size: 43px;
    }
    .name {
      width: 63px;
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
  background-color: yellowgreen;
}
.my-main {
  background-color: #0094ff;
}
</style>