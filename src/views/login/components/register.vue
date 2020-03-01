<template>
  <!-- 注册对话框   visible 绑定对话框是否显示  true显示  -->
  <el-dialog title="用户注册" center :visible.sync="dialogFormVisible">
    <!-- rules 绑定from表单 的验证规则  model=from 绑定属性 -->
    <el-form :model="form" :rules="rules" ref="regFrom">
      <!-- prop 绑定 验证规则 
      注意 : 绑定的规则名要和双向绑定名一致否则会没有效果且不包错
      -->
      <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="name" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码"  prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" show-password autocomplete="off"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="16">
          <el-form-item label="图形码" prop="imgCode" :label-width="formLabelWidth">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <img :src="imgRefresh" class="imgcod" alt @click="codclick" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="验证码" prop="idcoed" :label-width="formLabelWidth">
            <el-input v-model="form.idcoed" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <!-- 使用三元表达式  判断需要显示的信息  disabled 禁止属性 布尔值 -->
          <el-button
            v-model="btnnum"
            :disabled="btnnum!=0"
            @click="numVer"
          >{{btnnum==0? '获取用户验证码':'还要'+btnnum+'秒'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="btnVer">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";    @在vue-li中 就是手脚架中  @相当于src文件夹
import { regApi,registerid } from "@/api/register.js";
export default {
  name:'arr',
  data() {
    return {
      // 要上传的文件地址
      // uploadUrl: process.env.VUE_APP_URL + "/uploads",
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 临时上传图片
      imageUrl: "",
      // true则显示对话框
      dialogFormVisible: false,
      //   文字的显示宽度
      formLabelWidth: "65px",
      // 请求手机号码
      btnnum: 0,
      // 验证码图片刷新  错误  忘记写 创建全局的格式  VUE_APP_
      //   imgRefresh: process.env.URL + "/captcha?type=sendsms",
      imgRefresh: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //   绑定的from属性
      form: {
        avatar: "", //图片上传
        name: "", //昵称
        email: "", // 邮箱
        phone: "", //手机
        password: "", //密码
        imgCode: "", //图形码
        idcoed: "" // 验证码
      },
      //   表单验证的规则
      rules: {
        // 头像
        avatar: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        // 昵称
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        // 邮箱
        mailbox: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        // 手机
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机格式不正确",
            trigger: "blur"
          }
        ],
        // 密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        // 图形码
        imgCode: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          // len 相当于字符串的length
          { len: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        // 验证码
        idcoed: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //  在点击确定时 验证表单信息  注意点   上传图片的img不是表单信息 需要手动设置和消除属性
    btnVer() {
      this.$refs.regFrom.validate(v => {
        if (v) {
          // 在外面插入的请求方法  直接输入请求值
          registerid({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$massage.success("注册成功!");
                // 注册成功则清空表单的数据
              this.$refs.regFrom.resetFields();
              // 头像需要单独设置为空
              this.imageUrl = "";
            }else{
              this.$message.error(res.data.message)
            }
          });
        }
      });
    },
    // 上传事件
    // 图片成功回调函数  res响应报文  file文件信息
    handleAvatarSuccess(res, file) {
       window.console.log(res);

      // 将文件的临时路径赋值给前面的变量
      this.imageUrl = URL.createObjectURL(file.raw);
      // 图片是img  所以  avatar 没有值需要 上传成功后赋值给它 才有值  有了值才能验证
      // this.form.avatar = res.data.file_paht;
      this.form.avatar = res.data.file_path;

      // 因为img不是表单元素  所以需要单独设置一个验证事件
      this.$refs.regFrom.validateField("avatar");

    },

    
    // 图片上传前进行判断函数
    beforeAvatarUpload(file) {
      // 图片格式
       const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      // 图片大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },



    // 图片点击转换
    codclick() {
      this.imgRefresh =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },

    // 请求手机验证码
    numVer() {
      // 在请求前先判断信息是否正确合法   记得取反 !
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        //
        return this.$message.error("手机格式不正确");
      }
      if (this.form.imgCode.length != 4) {
        this.$message.error("验证码长度不正确");
        return;
      }
      this.btnnum = 60;
      let timerID = setInterval(() => {
        this.btnnum--;
        if (this.btnnum == 0) {
          clearInterval(timerID);
          // clearTimeout(itemid)
        }
      }, 1000);

      // 发送手机验证码请求  axios  封装的api请求
      // 由于axios在有跨域问题时 默认不会带cookie     就需要设置 withCredentials:true,
      regApi({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success(
            "成功获取验证码,验证码为" + res.data.data.captcha
          );
        } else {
          this.sec=0
          this.$message.error(res.data.message);
        }
      });
    },

  }
};
</script>

<style lang='less'>
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}
.el-dialog__title {
  color: #fff;
}
.imgcod {
  width: 100%;
  height: 41px;
}

// 上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  text-align: center;
}
</style>