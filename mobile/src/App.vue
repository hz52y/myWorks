<template>
  <div id="app">
    <!-- exclude="detail,about" 保持缓存(组件不会重复创建和销毁),排除详情页和about页 -->
    <!-- 被包含在 <keep-alive> 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated
　　 //只有切换到被keep-alive包裹且没有被exclude的页面时,才会调用
    // 在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用
    //如果要在每次进入页面的时候获取最新的数据,需要在activated阶段获取数据，替换原来的created-->
    <transition :name="transitionName">
      <!-- <keep-alive>写在router-view外层-->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
    <!-- 设置自定义类名 -->
    <!-- <transition :enter-active-class="transitionName">
      <router-view></router-view>
    </transition>-->

    <van-tabbar route v-if="!this.$route.meta.hideTab">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/me" icon="friends-o" dot>我的</van-tabbar-item>
      <van-tabbar-item to="/about" icon="ellipsis">关于</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: "",
      };
    },
    watch: {
      $route(to, from) {
        const t = to.path.split("/").length;
        const f = from.path.split("/").length;
        if (t > f) {
          // animate__animated animate__bounce
          this.transitionName = "in";
        } else if (t < f) {
          this.transitionName = "back";
        } else {
          this.transitionName = "";
        }
      },
    },
  };
</script>

<style scoped>
  /* .nav-enter,
.nav-leave-to {
  opacity: 0;
  transform: translateX(100px);
} */
  /* slideInRight */
  /* fadeInRight */
  /* zoomIn */
  .in-enter-active {
    animation: zoomIn 0.4s;
  }
  /* fadeInLeft */
  /* slideInLeft */
  .back-enter-active {
    animation: fadeInLeft 0.3s;
  }
</style>
