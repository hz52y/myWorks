<template>
  <div id="app">
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/cart">购物车</router-link>
      <router-link to="/user">我的</router-link>
    </div>
    <keep-alive exclude="about,home">
      <!-- 父子路由传递数据==>router-view也是插件
      实际上等同于父子组件之间数据的传递-->
      <!-- <router-view :data="msg" @send="getData" ></router-view> -->
      <router-view></router-view>
      <!-- 但是不建议在路由组件请求数据,传给子组件,一般在路由到的主页面请求数据
      使用路由不用注册-->
    </keep-alive>
    <!-- 2.利用route，缓存部分页面 -->
    <!-- <p>keepAlive==>{{$route.meta.keepAlive}}</p>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>-->
    <!-- 被包含在 <keep-alive> 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated
　　  //只有切换到被keep-alive包裹且没有被exclude的页面时,才会调用
    // 在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用
    //如果要在每次进入页面的时候获取最新的数据,需要在activated阶段获取数据，替换原来的created-->
  </div>
</template>

<style scoped>
  /*不加scoped 公共样式 */
  /* @import url(xxx.css)等价于@import "xxx.css"; 引入局部使用的css 只能在style标签下引入css*/
  /*区别于import "xxx.css"; 只能在js文件中引入css*/
</style>
