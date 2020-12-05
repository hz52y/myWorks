import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//配置路由表
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      //在元数据中定义一个是否缓存页面的标识
      keepAlive: true,
    },
    component: () => import("@/views/Home"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "关于",
    },

    component: () => import("@/views/About"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      keepAlive: true,
    },

    component: () => import("@/views/Login"),
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//定义全局导航守卫(控制访问权限)
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    // 更改标题
    document.title = to.matched[0].meta.title;
    next();
  } else if (!sessionStorage.getItem("token")) {
    next("/login");
  } else {
    document.title = to.matched[0].meta.title;
    next();
  }
});
//解决重复点路由跳转会报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
