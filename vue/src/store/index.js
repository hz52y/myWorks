import Vue from "vue";
import Vuex from "vuex";
// Vuex:一般放需要在多个界面共享的状态,
//官方:状态管理模式。它采用集中式存储管理应用的所有组件的状态
//多个组件需要共享某个状态(变量,数据),那么就可以把这个状态存在Vuex(对象)中
//使用场景:1.组件层级关系复杂,不容易传递数据,
//2.大型项目,多个状态在多个页面共享
//3.用户登录状态,用户名称,头像,地理位置信息,商品的收藏,购物车物品
Vue.use(Vuex);
//导入模块
import cart from "./modules/cart.js";
import user from "./modules/user.js";

export default new Vuex.Store({
  //Store 全局数据仓库

  state: {
    //在任何组件都可访问,
    // 一般在computed中接收state和getters中的变量
    // 计算属性在它的相关依赖发生改变时会重新求值
    // 访问state方法:this.$store.state.变量名
    num: 1,
    list: [10, 20, 30, 40],
    //对state共享数据的更改的同步方法写在mutations中,
    //这样调试工具能监听到state中数据的更改,方便调试
  },
  mutations: {
    //同步操作,一切修改(赋值)state数据的方法都写在mutations当中
    //mutations执行的异步操作不能反映到调试工具里面
    //参数1:state对象,参数2:载荷(payload)
    //载荷(参数) 一次只能传递一个 如果想要传递多个数据
    //需要把数据定义成数据或对象的方式
    //数组解构
    //在methods中访问:this.$store.commit("add",[2,"李白"])
    add(state, [step, name]) {
      state.num += step;
      console.log(name);
    },
    sub(state, step) {
      state.num -= step;
    },
  },
  getters: {
    // 计算属性
    total(state) {
      //在computed中访问:this.$store.getters.total
      //以属性形式访问,不能传参
      return state.list.reduce((pre, n) => {
        return pre + n;
      }, 0);
    },
  },
  actions: {
    // Action 提交的是 mutation，而不是直接变更状态。
    //可以是同步提交 也可以是异步提交
    //在Action中执行的是提交mutations里面的方法 而不是直接修改对应的数据
    //修改state中的数据(包括赋值)一定是在mutation中

    // syncSub(context, n) {
    syncSub({ commit }, n) {
      // 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，
      // 才能取到正确的值。如果解构失败，变量的值等于undefined。
      // context={
      //   commit: ƒ boundCommit(type, payload, options)
      //   dispatch: ƒ boundDispatch(type, payload)
      //   getters: {}
      //   rootGetters: {}
      //   rootState: {__ob__: Observer}
      //   state: {__ob__: Observer}
      // }
      // {commit}=context==>解构赋值
      //context=>上下文对象=>Store=>对象解构(属性名要相同,快速获取属性或方法)
      //分发this.$store.dispatch("syncSub", 2);
      setTimeout(() => {
        commit("sub", n);
      }, 1000);
    },
  },

  modules: {
    //挂载模块
    cart,
    user,
  },
});

// actions中一定是对mutations中的方法的异步或同步提交

// mutations: {
//   addNum(state, amount) {
//     state.num += amount
//   },
//   someMutation(state) {
//       state.count--
//   }
// },
// actions: {
//同步提交
//   increment({commit}, args) {
//     commit('addNum', args)
//   },
//异步提交
//   actionSomemution(context) {
//     setTimeout(() => {
//         context.commit('someMutation')
//     }, 1000)
//   }
// }

// store.js
// mutations : {
//   getLoopImg(state) {
//       this.axios.get("api/setting/get_loop_img")
//           .then(res => {
//               state.loop_sec = res.data.loop_sec;
//               state.loop_img = res.data.data.loop_img;
//           })
//   }
// }
// actions : {
//     updateLoopImg (context) {
//         context.commit('getLoopImg');
//     }
// }

// // -------------------------------------------
// a.vue
// this.$store.dispatch("updateLoopImg");
