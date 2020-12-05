<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/login">登录</router-link>
    <el-button @click="logOut" style="margin-left:80% ;">退出登录</el-button>
    <!-- 推荐 -->
    <keep-alive exclude="about">
      <router-view></router-view>
    </keep-alive>
    <!-- 2.利用route的meta,缓存页面 -->
    <!-- <p>$route.meta.keepAlive===>{{$route.meta.keepAlive}}</p> -->
    <!-- <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>-->

    <!-- 被包含在 <keep-alive> 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated
　　  //只有切换到被keep-alive包裹且没有被exclude的页面时,才会调用
    // 在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用
    //如果要在每次进入页面的时候获取最新的数据,需要在activated阶段获取数据，替换原来的created-->
  </div>
</template>

<script>
//一般不在路由组件中请求数据
export default {
  methods: {
    logOut() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
/* 用@导入样式 */
/* @import "xxx.css"; */
</style>
