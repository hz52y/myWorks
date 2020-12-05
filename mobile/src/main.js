import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/global.css";
// npm install animate.css --save
import Animated from "animate.css";
//引入重置样式
// npm install --save normalize.css
import "normalize.css/normalize.css";
import "./network/api.js";
import "./network/mock.js";
import "./plugins/vant.js";
// npm install postcss-pxtorem --save-dev
// npm i -S  amfe-flexible
import "amfe-flexible";
//全局使用Animated
Vue.use(Animated);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
