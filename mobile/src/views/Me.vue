<template>
  <div class="me">
    <van-form v-if="!isInfo" @submit="onSubmit" @failed="onError">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ validator, required: true, message: '至少6位字母开头' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-form>
    <div v-else>
      <p>用户信息:{{ isInfo }}</p>
      <van-button @click="quite" type="primary">退出登录</van-button>
    </div>
  </div>
</template>

<script>
// Profile我的
import { Toast } from "vant";
export default {
  data() {
    return {
      isInfo: sessionStorage.getItem("token"),
      username: "",
      password: ""
    };
  },
  methods: {
    validator(val) {
      return /^[a-z]\w{6}/i.test(val);
    },
    onSubmit(values) {
      Toast("登录成功");
      sessionStorage.setItem("token", values.username);
      this.$router.push("/home");
    },
    onError() {
      Toast("输入有误");
      return false;
    },
    quite() {
      sessionStorage.clear();
      this.$router.push("/home");
    }
  }
};
</script>
