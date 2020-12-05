<template>
  <div>
    <h1>购物车</h1>
    <h2>--------------购物车----------------------------------------</h2>
    <ul>
      <li v-for="item in list" :key="item.id">
        <input type="checkbox" v-model="item.isChecked" />
        #{{item.id}}|商品 {{item.goods}}|单价 {{item.price|filterData}} |数量 {{item.count}}|小计 {{item.price*item.count|filterData}}
        <button
          @click="del(item.id)"
        >删除</button>
      </li>
    </ul>
    <input type="checkbox" v-model="allChecked" />
    全选
    总计:{{total|filterData}}
    <h2>--------------------模块化辅助函数--------------------------------</h2>
    <p>mapxxx=>{{num}}----{{total1}}</p>
    <button @click="inc(2)">增加</button>
    <button @click="syncInc(3)">异步增加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  created() {
    console.log(this.$store);
    // console.log(this.$store.state["cart/num"]);//undefined
    // console.log(this.$store.state.cart.num); //1
  },
  activated() {
    console.log("购物车==>activated");
  },
  computed: {
    list() {
      return this.$store.state.cart.cart;
    },
    //使用辅助函数,只能用函数方法获取state中的变量
    ...mapState({
      num(state) {
        return state.cart.num;
      },
    }),

    allChecked: {
      get() {
        return this.$store.getters["cart/getAllChecked"];
      },
      set(v) {
        this.$store.commit("cart/setAllChecked", v);
      },
    },
    ...mapGetters({
      total1: "cart/total",
    }),
    total() {
      //有特殊字符属性名获取方法obj["xxx"]
      return this.$store.getters["cart/total"];
    },
  },
  methods: {
    del(id) {
      this.$root.$emit("sendData", id);
      this.$store.commit("cart/del", id);
    },
    ...mapMutations({
      inc: "cart/inc",
    }),
    ...mapActions({
      syncInc: "cart/syncInc",
    }),
  },
  filters: {
    filterData(price) {
      return "$" + price.toFixed(2);
    },
  },
};
</script>
