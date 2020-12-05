import Vue from "vue";
import VueRouter from "vue-router";
// 通过Vue.use(插件名),将插件安装到全局
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    meta: {
      title: "首页",
    },
    //路由懒加载(使用的时候再加载)
    // 路由懒加载:将路由对应的组件打包成一个个的js代码块
    // 不会一次性加载所有文件,只有这个路由被访问到的时候,再从请求相关js文件
    // const routes=[
    //     {
    //         path:"/home",
    //         component:()=>import("../components/Home")
    //     }
    // ]
    component: () => import("@/views/Home"),
  },
  {
    path: "/about",
    meta: {
      title: "关于",
    },
    component: () => import("@/views/About"),
  },
  {
    path: "/cart",
    meta: {
      title: "购物车",
      //缓存购物车页面
      keepAlive: true,
    },
    component: () => import("@/views/Cart"),
  },
  {
    path: "/user",
    meta: {
      title: "我的",
      //缓存我的页面
      keepAlive: true,
    },
    component: () => import("@/views/User"),
    children: [
      // {
      //   //子路由重定向建议加/user
      //   path: "/user",(路径为/user时重定向到userImg页)
      //   redirect: "userImg",
      // },
      {
        path: "userInfo/:userId",
        // name属性用于to跳转,(命名的路由)
        // <router-link :to="{ name: 'userInfo', params: { userId: id } }">
        // 命名的路由编程式导航
        // router.push({ name: 'user', params: { userId: '123' } })
        name: "userInfo",
        component: () => import("@/components/UserInfo"),
      },
      {
        path: "userImg",
        // <router-link :to="{ name: 'userImg', query: user }">头像</router-link>
        name: "userImg",
        component: () => import("@/components/UserImg"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

//全局导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
});

export default router;
