<template>
  <div>
    <h1>关于</h1>
    <p>获取vuex中state中的数据=>{{$store.state.num}}</p>
    <p>data接收=>{{num1}} computed接收=>{{num2}} total=>{{total}}</p>
    <button @click="inc">增加</button>
    <button @click="syncDec">异步减少</button>
    <h2>--------------------辅助函数--------------------------------</h2>
    <p>mapxxx=>{{num}} {{total1}}</p>
    <h2>使用辅助函数事件中传递参数</h2>
    <button @click="inc1([2,'辅助'])">辅助函数增加</button>
    <button @click="syncDec1(3)">辅助函数异步减少</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "about",
  // created() {
  //   console.log(mapState); //是一个方法,接收两个参数,并且返回一个方法的调用,方法的调用返回一个对象
  //   console.log([...[1, 2, 3]]);
  //   console.log({ ...mapState(["num"]) });//相当于将一个对象展开到另一个对象里
  // },
  data() {
    return {
      //data中的内容只会在 created 钩子触发前初始化一次
      //一般我们使用data时也是直接将data赋予一个新值
      //这里并不会监听到vuex中num的变化
      num1: this.$store.state.num,
    };
  },
  activated() {
    console.log("关于==>activated");
  },
  computed: {
    //而computed则是通过依赖追踪实现的，
    //计算属性在它的相关依赖发生改变时会重新求值
    num2() {
      return this.$store.state.num;
    },
    total() {
      return this.$store.getters.total;
    },
    //使用辅助函数
    //数组写法
    // ...mapState(["num"]),
    //对象写法
    ...mapState({
      num: "num", //字符串写法
      // num(state) {//函数写法
      //   return "$" + state.num.toFixed(2);
      // }
    }),

    ...mapGetters({
      total1: "total",
    }),
  },
  methods: {
    inc() {
      this.$store.commit("add", [2, "李白"]);
    },
    syncDec() {
      this.$store.dispatch("syncSub", 3);
    },
    // ...mapMutations(["inc1"]),
    //相当于调用了(映射)this.$store.commit("add", [2, "李白"]);
    //将 this.inc1()映射为 this.$store.commit("add", [2, "李白"]);
    ...mapMutations({
      inc1: "add",
    }),
    ...mapActions({
      syncDec1: "syncSub",
    }),
  },
};
</script>
