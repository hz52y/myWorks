import Axios from "axios";
import Vue from "vue";
// method是创建请求时使用的方法
// baseURL请求基地址
// params get请求参数
// data post请求参数
// headers是即将被发送的自定义请求头
// axios
//   .get("http://bufantec.com/api/douban/movie/in_theaters", {
//     params: {
//       start: 2
//     }
//   })
//   .then(res => {
//     console.log(res.data.data.list);
//     this.list = res.data.data.list;
//   });
//axios({
//     url: "http://rap2api.taobao.org/app/mock/121145/post",
//     method: "POST",
//     post请求传参用data
//     data: {
//       name: "小月"
//     }
//   })
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   axios({
//     baseURL: "http://bufantec.com/api/douban/movie",
//     timeout: 2000, //2000ms超时
//     url: "/in_theaters",
//     //get请求传参params
//     params: {
//       start: 2
//     }
//   }).then(res => {
//     this.list = res.data.data.list;
//   });
// async/await
//请求失败不能获取错误信息
// (async () => {
//   const res = await Axios({
//     // method: "get",
//     url: "http://bufantec.com/api/douban/movie/in_theaters",
//   });

//   // console.log(Axios({xxx}));//返回一个promise对象
//   console.log(res);
// })();
// // 获取失败数据try/catch
// (async () => {
//   try {
//     const res = await new Promise((resolve, reject) => {
//       resolve(1);
//       // reject(2);
//     });
//     //Promise获取成功/失败数据
//     // .then((res) => {
//     //   console.log(res);
//     // })
//     // .catch((err) => {
//     //   console.log(err);
//     // });
//     //async获取成功/失败数据try/catch
//     console.log(res);
//   } catch (error) {
//     console.log(error); //1
//   }
// })();

// 因为axios不是vue的插件，所以不能直接用use方法，
// 如果要全局使用axios就需要在main.js中设置成全局的，
//需要将其加载到原型上。
// 然后再组件中通过this调用
// Vue.prototype.$axios = axios;
// this.$axios();
//公共配置
// axios.defaults.baseURL = "http://bufantec.com";
// axios.defaults.timeout = 5000;

//封装Axios
// config是配置对象
function request(config) {
  const axios = Axios.create({
    //如果使用proxy配置跨域则不需要配置baseURL
    // 通过proxy代理请求路径变为
    // Request URL: http://localhost:9527/api/douban/movie/in_theaters?start=1&limit=12
    // baseURL: "http://bufantec.com",
    timeout: 3000,
  });
  let load;
  //拦截器
  //请求拦截
  axios.interceptors.request.use(
    (config) => {
      // 1.设置请求loading动画
      // 2.一些网络请求必须携带特殊信息(比如登录请求token)
      // config.headers['xxx-token']=sessionStorage.getItem("token");
      // 3.config不符合服务器要求,需要更换请求头等
      load = this.$loading({
        lock: true,
        text: "努力加载中...",
        // spinner: "el-icon-loading", //设置加载图标类名
        background: "#fff",
        // background: "rgba(0,0,0,.5)",
        // target: document.querySelector("div"), // 设置加载动画区域
      });
      // 如果是post请求,设置Request Headers的content-type
      if (config.method.toLowerCase() === "post") {
        //如果使用qs则不用设置请求 headers
        config.headers = {
          'content-type': 'application/x-www-form-urlencoded'
        };
        // 默认情况下，axios将JavaScript对象序列化为JSON,
        // 要以application / x - www - form - urlencoded格式发送数据
        // 可以使用qs库序列化数据
        //{xx:{key:value,key1:value1}} ==> xx.key=value&xx.key1=value1
        // config.data = qs.stringify(config.data, {
        //   allowDots: true
        // })
      }
      //返回处理后的配置
      return config;
    },
    (err) => {
      //拦截失败做的事
      console.log(err);
    }
  );
  //响应拦截
  axios.interceptors.response.use((res) => {
    setTimeout(() => {
      load.close();
    }, 100);
    // return res.data一般对获得的数据做一些处理,再返回
    return res;
  }, err => {
    return Promise.reject(err)
  });

  //返回一个promise对象
  return axios(config);
}
//多个不同域名
function request1(config) {
  const axios = Axios.create({
    // baseURL: "https://api.zhubaba.cn",
    timeout: 3000,
  });
  //返回一个promise对象
  return axios(config);
}
Vue.prototype.$request = request;
Vue.prototype.$request1 = request1;
