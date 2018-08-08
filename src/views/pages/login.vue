<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" type="password"  v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin('loginForm')">
         登录
        </el-button>
      </el-form-item>
      <div class="tips">
      </div>
    </el-form>
  </div>
</template>

<script>
// import addRouter from "../../router/permision";
// import * as allrouters from "../../router/routes";
export default {
  name: "login",
  data() {
    return {
      loading: false,
      loginForm: {
        username: "admin",
        password: ""
      },
      loginRules: {
        username: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("login", { ...this.loginForm }).then(data => {
            if (data.code == 200) {
              sessionStorage.setItem("token", data.data.token);
              this.$router.replace({ name: "busScheduleList" });

              // TODO:
              // let auth_routes = Object.keys(allrouters).filter(v => {
              //   let flag = false;
              //   data.data.roles.forEach(routeName => {
              //     if (v.indexOf(routeName) > -1) {
              //       flag = true;
              //     }
              //   });
              //   return flag;
              // });

              // addRouter(this.$router, allrouters)
              //   .then(routes => {
              //     this.$store.commit("addRoutes", routes);
              //     this.$router.replace({ name: auth_routes[0] });
              //   })
              //   .catch(err => {
              //     this.$message({
              //       type: "error",
              //       message: err,
              //       center: true
              //     });
              //   });
            } else {
              this.$message({
                type: "error",
                message: data.msg,
                center: true
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
