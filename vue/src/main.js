// 依赖vue一套构建用户界面的渐进式js框架。
import Vue from "vue";
//引用APP组件(跟组件)
import App from "./App.vue";
//自动匹配index.js
import router from "./router";
import store from "./store";
import "./assets/css/global.css";
// 在components中建立一个组件
// 在main.js中用import引入
// 使用Vue.component('组件名',引入的组件）
// 在其他组件中引用<组件名/>
// 注册组件必须要放在根实例前面才可以使用
import PublicCpn from "./components/PublicCpn.vue";

//component单数:注册全局组件时,路由表
//复数:加s
//全局组件:在vue管理范围内的所有组件内使用
//局部组件:只能在父组件(父组件里注册)里使用
//(子组件只能在父组件里使用)
Vue.component("PublicCpn", PublicCpn);
//public存放单页面应用页面得地方
//dist/打包发布(public文件夹最终会打包到dist)
//gitignore//配置忽略哪些文件不共享
// components是小组件
// views是页面级组件
//views存放页面的目录,页面由多个组件拼凑而成
//assets用于存放项目当中静态资源得目录 css  img video 字体  iconfont
//运行(npm run serve)
//编译(npm run build)//会生成dist文件夹
//可视化工具(vue ui)
//创建项目(vue create myproject(项目名)Mobile)-n(跳过git初始化)
// install(简写i)uninstall(简写un)
// npm install  swiper --save
//下载低版本
// npm install --save swiper@5.4.5
// npm install vue-awesome-swiper --save(依赖swiper)
//npm install vue-router --save(安装路由)
// npm uninstall axios(卸载)
//--save || -S // 运行依赖（发布）我们发布后还需要依赖的模块
//--save-dev || -D //开发依赖（辅助）发布后用不到它，而只是在我们开发才用到它
//是否显示构建项目的提示信息,产品发布可以改成true
Vue.config.productionTip = false;
// new Vue({
// 同时写el和template,
// template里的内容会替换<div id="app"></div>
// el:"#app",//内部也会调用.$mount("#app");
// template:"#app",
//h==>createElement()回调函数,参数标签名
//createElement("h2",{标签的属性},["标签里的内容"])会替换<div id="app"></div>
//也可以传入组件对象APP
//render解析(将APP里的template解析成render函数)
//render解析的内容会替换<div id="app"></div>
//   render: (h) => h(App),
// }).$mount("#app");

// 理解：createElement 函数是用来生成 HTML DOM 元素的，
// 也就是上文中的 generate HTML structures，也就是 Hyperscript，
// 这样作者才把 createElement 简写成 h。

// Vue.js 里面的 createElement 函数，这个函数的作用就是生成一个 VNode节点，
// render 函数得到这个 VNode 节点之后，返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。

new Vue({
  router,
  store,
  //解析App组件
  render: (h) => h(App),
  //挂载到#app=>div上,跟el:"#app"一样
}).$mount("#app");
//将vue实例(vue实例内解析挂载的对象store,router,解析好的APP组件等)挂载到id为#app的dom元素内
