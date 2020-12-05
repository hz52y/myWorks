import Vue from "vue";
//全局引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//Vue.use()方法将插件安装到全局
Vue.use(ElementUI);

//按需引入
//需在babel.config配置文件中加
// "plugins": [
//     [
//       "component",
//       {
//         "libraryName": "element-ui",
//         "styleLibraryName": "theme-chalk"
//       }
//     ]
//   ]
//并不需要引入css样式
// import {
//   Message,
//   Button,
//   Table,
//   TableColumn,
//   Form,
//   FormItem,
// } from "element-ui";

// Vue.use(Message);
// .use(Button)
// .use(Form)
// .use(FormItem)
// .use(Table)
// .use(TableColumn);
