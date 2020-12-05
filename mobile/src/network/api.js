import Vue from "vue";
import Axios from "axios";

function request(config) {
  const axios = Axios.create({
    baseURL: "https://app/",
    timeout: 2000,
  });

  // axios.interceptors.request.use((config) => {
  //   //loading动画
  //   return config;
  // });

  return axios(config);
}

Vue.prototype.$request = request;

function request1(config) {
  const axios = Axios.create({
    baseURL: "http://www.bufantec.com/api/douban/movie/",
    timeout: 2000,
  });

  return axios(config);
}

Vue.prototype.$request1 = request1;
