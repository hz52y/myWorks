const cart = {
  namespaced: true, //开启命名空间(保证每个模块变量的唯一性,
  //防止因为两个模块方法名相同导致两个模块方法同时触发)
  state: {
    num: 1,
    //购物车
    cart: [],
  },
  mutations: {
    inc(state, val) {
      state.num += val;
    },
    add(state, obj) {
      const g1 = state.cart.find((item) => item.id == obj.id);
      if (g1) {
        g1.count++;
      } else {
        state.cart.push(obj);
      }
    },
    del(state, id) {
      const i = state.cart.findIndex((item) => item.id == id);
      state.cart.splice(i, 1);
    },
    setAllChecked(state, val) {
      state.cart.map((item) => (item.isChecked = val));
    },
  },
  getters: {
    // 计算属性
    getAllChecked(state) {
      if (!state.cart.length) return false;

      return state.cart.every((item) => item.isChecked == true);
    },
    total(state) {
      //获取this.$store.getters.total
      return state.cart
        .filter((item) => item.isChecked == true)
        .reduce((pre, goods) => {
          return pre + goods.price * goods.count;
        }, 0);
    },
  },
  actions: {
    syncInc(context, n) {
      setTimeout(() => {
        context.commit("inc", n);
      }, 1000);
    },
  },
};

export default cart;
