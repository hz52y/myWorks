<template>
  <div class="login">
    <h2>登录</h2>
    <el-form :model="user" :rules="rules" ref="loginForm" label-position="right">
      <!-- prop用于表单验证 label标签前面的名字-->
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="密码">
        <el-input type="password" v-model="user.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="verifyCode" label="验证码">
        <el-input v-model="user.verifyCode" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    //定义一个校验手机号的校验器
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        callback()
      } else {
        callback(new Error('请输入合法手机号'))
      }
    }
    return {
      //表单数据对象
      user: {
        loginType: 0,
        mobile: '18317774424',
        pwd: '411524',
        verifyCode: '',
      },
      //校验规则
      rules: {
        mobile: [
          //required是否必填,message检验提示信息,trigger触发时机blur失去焦点时触发
          //change域改变时触发
          { required: true, message: '请输入11位手机', trigger: 'blur' },
          //validator校验器
          { validator: checkMobile, trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur',
          },
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm() {
      //选中表单元素并校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // console.log(valid);true校验通过
          this.$request1({
            url: '/user/login',
            method: 'post',
            data: this.user,
          })
            .then((res) => {
              // console.log(res)
              if (res.data.code == 0) {
                this.$message.success('登录成功')
                //存下sessionKey为token,访问重要网页的令牌
                sessionStorage.setItem('token', res.data.data.sessionKey)
                //跳转到首页
                this.$router.push('/home')
              }
            })
            .catch(() => {
              this.$message.error('登录失败')
              return false
            })
        } else {
          this.$message.error('账号不合法')
          return false
        }
      })
    },
    resetForm() {
      //重置表单
      this.$refs.loginForm.resetFields()
    },
  },
}
</script>

<style scoped>
.login {
  margin: 0 auto;
  width: 500px;
  margin-top: 200px;
  padding: 10px;
  border-radius: 8px;
}
/* 组件名当做类名用 */
.el-input {
  width: 400px;
}
</style>
