import Vue from "vue";
import VueRouter from "vue-router";

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
    component: () => import("@/views/Home"),
  },
  {
    path: "/cart",
    meta: {
      title: "购物车",
    },
    component: () => import("@/views/Cart"),
  },
  {
    path: "/me",
    meta: {
      title: "我的",
    },
    component: () => import("@/views/Me"),
  },
  {
    path: "/about",
    meta: {
      title: "关于",
    },
    component: () => import("@/views/About"),
  },
  {
    path: "/details/:id",
    meta: {
      title: "商品详情",
      hideTab: true, //详情页不显示tabbar
    },
    component: () => import("@/views/Details"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  if (to.path == "/cart" && !sessionStorage.getItem("token")) {
    next("/me");
  } else {
    next();
  }
});

export default router;
