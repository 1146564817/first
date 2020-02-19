<template>
  <div class='login-box'>
      <div class="login"></div>
      <img src="./img/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style>
.login-box{
  width: 100%;
  height: 100%;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
  /* 使用弹性 */
  display:flex;
  /* 测轴居中 */
  align-items: center;
 
/* 左右距离相等 */
  justify-content: space-around;
}
.login{
  width:478px;
height:550px;
background:rgba(245,245,245,1);
}
</style>