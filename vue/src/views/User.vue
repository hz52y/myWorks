<template>
  <div>
    <h1>我的</h1>
    <!-- <router-link :to="'/user/userInfo/' + id">信息</router-link> -->
    <router-link :to="{ name: 'userInfo', params: { userId: id } }">我的</router-link>
    <!-- <router-link :to="{ path: '/user/userImg', query: user }">头像</router-link> -->
    <!-- 通过name跳转不用写path -->
    <router-link :to="{ name: 'userImg', query: user }">头像</router-link>

    <transition name="nav">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      id: "李白",
      user: {
        uid: "libai",
        name: "李白",
        age: 18,
      },
    };
  },
  activated() {
    console.log("我的==>activated");
  },
};
</script>

<style scoped>
.nav-enter,
.nav-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.nav-enter-active,
.nav-leave-active {
  transition: all 1s ease;
}
</style>
