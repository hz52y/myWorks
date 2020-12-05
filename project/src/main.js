// from后面直接跟依赖包名(比如vue,vue-router),
// 会自动引入node_modules里通过npm下载好的依赖包
import Vue from "vue";
import App from "./App.vue";
//引入到入口文件才能解析运行
import "./plugins/element.js";
//引入全局样式
import "./assets/css/global.css";
import "./assets/css/normalize.css";
//多个页面都需要轮播图,一般全局引入
// import "./plugins/swiper.js";
import "./network/api.js";
//默认匹配index文件
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
