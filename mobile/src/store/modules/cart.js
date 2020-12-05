const cart = {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    addCart(state, obj) {
      const g = state.cart.find((item) => item.id == obj.id);
      if (g) {
        g.count++;
      } else {
        state.cart.push(obj);
      }
    },
    setAllChecked(state, v) {
      state.cart.map((item) => (item.isChecked = v));
    },

    del(state, id) {
      let i = state.cart.findIndex((item) => item.id == id);
      state.cart.splice(i, 1);
    },
  },
  getters: {
    getAllChecked(state) {
      if (!state.cart.length) return false;
      return state.cart.every((item) => item.isChecked == true);
    },
    total(state) {
      return state.cart
        .filter((item) => item.isChecked == true)
        .reduce((pre, goods) => {
          return pre + goods.price * goods.count;
        }, 0);
    },
  },
};

export default cart;
