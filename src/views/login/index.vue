<template>
  <!-- 页面大盒子 -->
  <div class="login-box">
    <!-- 登录盒子 -->
    <div class="login">
      <!-- 登录顶部文字 -->
      <div class="title-box">
        <img src="./img/logo.png" alt class="logo" />
        <span class="left-titie">黑马面面</span>
        <span class="line"></span>
        <span class="right-titie">用户登录</span>
      </div>
      <!-- 表单验证   el-from  饿了么ui 设置的 包裹from表单   -->     
      <!-- 表单中的数据 每一行都要使用 el=from-tiem包裹才有效果  且会自动添加上下空间  但是它的宽度是父盒子的宽-->
      <!-- 解释:  :model='from'绑定一个属性 后声明的  ;abel-wodth  设置form表单的外边距  ref 设置一个定位
       -->
      <el-form class="login-from" :model="from" label-width="43px;" :rules="rules" ref="loginFrom">
        <!-- prop 绑定一个需要验证的属性 验证值在data里的from中设置   且prop的值必须和 v-model的值一致 不会报错但不会有效果-->
        <el-form-item class="user" prop="phone">
          <!-- v-model 同步   clearable 设置该属性 可以显示清除内容   prefix-icon 的设置小图标
            placeholder 设置input框的内容  el-input 输入框
          -->
          <el-input v-model="from.phone" clearable prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item class="login-password" prop="user">
          <!-- show=password 设置密码框  -->
          <el-input v-model="from.user" prefix-icon="el-icon-key" show-password placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <!-- 该地方 使用栅格布局   el-row 行  el-col 列  每行共24列  列数满后 后面添加的列数会自动换行到下一列 
          设置列  :span='24 ' 
          -->

          <el-row class="login-code">
            <el-col :span="17">
              <el-input v-model="from.code" prefix-icon="el-icon-help" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img src="./img/login_captcha.png" alt class="codeimg" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="agree">
          <!-- el-checkbox 多选框   -->
          <el-checkbox class="login-clause" v-model="from.agree">
            我已阅读并同意
            <!-- el-link 文字链接的样式 -->
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="loginBtn">登录</el-button>
          <el-button class="login-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./img/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 设置存储验证表单数据的值
      from: {
        phone: "",
        user: "",
        code: "",
        // 多选框  默认false
        agree:false,
      },
      // 设置验证的具体内容
      rules: {
        // required 必须填写   message  设置提示信息  trigger  提示信息触发的判断条件
        phone: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        user: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // min 最小输入文字  max最大输入文字 
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        agree: [
            // 多选框没有失去焦点,只要值改变事件
            // 因为checkbox 其实他的值不可能为空  除非强行赋值为空 
            // { required: true, message: "请输入验证码", trigger: "blur" }
            // 
            // 只要值为ture才满足条件 否则代表不匹配  
            // pattern 是验证书写 正则表达式  change 属性改变进行判断
          { pattern: /true/, message: "必须勾选同意用户协议", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    loginBtn() {
      // validate 触发表单中所有的验证信息  
      this.$refs.loginFrom.validate(valid => {
        // 通过则显示下代码
        if (valid) {
          alert("登录成功");
        }
        // 未通过则触发验证提示信息
      });
    }
  }
};
</script>

<style lang='less'>
// 页面
.login-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 使用弹性 */
  display: flex;
  /* 测轴居中 */
  align-items: center;
  /* 左右距离相等 */
  justify-content: space-around;

  // 登录盒子
  .login {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);

    // 顶部文字
    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      margin-top: 50px;
      margin-bottom: 29px;
      .logo {
        width: 22px;
        height: 17px;
      }
      .left-titie {
        font-size: 22px;
        margin-left: 16px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-titie {
        font-size: 21px;
      }
    }

    // 表单验证板块
    .login-from {
      padding-left: 40px;

      // 账号
      .user {
        width: 394px;
        height: 45px;
      }
      // 密码
      .login-password {
        width: 394px;
        height: 43px;
      }
      // 验证
      .login-code {
        display: flex;
        width: 394px;
        height: 44px;

        .codeimg {
          width: 100%;
          height: 42px;
          vertical-align: bottom;
        }
      }

      .login-clause {
        display: flex;
        align-items: center;

        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }

      .login-btn {
        width: 394px;
        height: 40px;
        // 第二个
        &:nth-child(2) {
          margin-left: 0;
          margin-top: 26px;
        }
      }
    }
  }
}
</style>