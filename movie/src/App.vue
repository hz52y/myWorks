<template>
  <div id="app">
    <router-view />
    <tab-bar background="#23262d" v-if="$route.path!='/position'">
      <tab-bar-item
        v-for="(item, i) in list"
        :key="i"
        :to="item.to"
        :icon="item.icon"
        :actIcon="item.actIcon"
        :text="item.text"
        :actTextColor="item.actTextColor"
      ></tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from './components/tabbar/TabBar'
import TabBarItem from './components/tabbar/TabBarItem'
export default {
  data() {
    return {
      list: [
        {
          to: '/home',
          //引入本地路径用require
          icon: require('@/assets/images/tabbar/home.png'),
          actIcon: require('@/assets/images/tabbar/home-on.png'),
          actTextColor: '#f1737a',
          text: '首页',
        },
        {
          to: '/rating',
          icon: require('@/assets/images/tabbar/cinema.png'),
          actIcon: require('@/assets/images/tabbar/cinema-on.png'),
          actTextColor: '#f1737a',
          text: '评分',
        },
        {
          to: '/search',
          icon: require('@/assets/images/tabbar/movie.png'),
          actIcon: require('@/assets/images/tabbar/movie-on.png'),
          actTextColor: '#f1737a',
          text: '搜索',
        },
        {
          to: '/login',
          icon: require('@/assets/images/tabbar/user.png'),
          actIcon: require('@/assets/images/tabbar/user-on.png'),
          actTextColor: '#f1737a',
          text: '登录',
        },
      ],
    }
  },
  components: {
    TabBar,
    TabBarItem,
  },
}
</script>

<style lang="scss" scoped>
</style>
