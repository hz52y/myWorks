<template>
  <div>
    <h1>首页</h1>

    <h2>------------------------------商品--------------------------</h2>
    <ul>
      <li v-for="item in list" :key="item.id">
        #{{item.id}}|商品 {{item.goods}} |单价 {{item.price|filterData}} |库存 {{item.total}}
        <button
          :disabled="!item.total"
          @click="add(item.id)"
        >添加到购物车</button>
      </li>
    </ul>

    <h2>-----------------------------组件传值-----------------------</h2>
    <PublicCpn></PublicCpn>
    <!-- 向子组件传值 -->
    <Cpn ref="cpn" :msg="homeData" @sendData="getData">
      <!-- 使用插槽 v-slot简写为#-->
      <template v-slot:cpn>
        <div>
          <button @click="getRef">$refs=>子组件</button>
        </div>
      </template>
    </Cpn>
  </div>
</template>


<script>
// Cpn指向components/Cpn默认导出的组件
//@以src目录为根目录
//.vue可以省略
import Cpn from "@/components/Cpn.vue";

//默认导出组件对象
export default {
  //默认会选中上面的template模板
  // template :"#",
  //组件名
  name: "home",
  components: {
    Cpn,
  },
  data() {
    return {
      list: [
        { id: 1, goods: "苹果", total: 20, price: 10 },
        { id: 2, goods: "香蕉", total: 25, price: 20 },
        { id: 3, goods: "葡萄", total: 15, price: 30 },
      ],
      homeData: "父组件Home的数据",
    };
  },
  created() {
    this.$root.$on("sendData", (id) => {
      const g = this.list.find((item) => item.id == id);
      const g1 = this.$store.state.cart.cart.find((item) => item.id == id);
      g.total += g1.count;
    });
  },
  activated() {
    //只有切换到被keep-alive包裹且没有被exclude的页面时,才会调用
    // 在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用
    //如果要在每次进入页面的时候获取最新的数据,需要在activated阶段获取数据，替换原来的created
    console.log("首页==>activated");
  },
  methods: {
    add(id) {
      const g = this.list.find((item) => item.id == id);
      const obj = {
        id: g.id,
        goods: g.goods,
        price: g.price,
        count: 1,
        isChecked: false,
      };
      this.$store.commit("cart/add", obj);
      g.total--;
    },

    getRef() {
      //获取子组件的方法send
      console.log(this.$refs.cpn.send);
    },
    //上面不写参数,默认发送所有参数
    getData(cdata) {
      console.log(cdata);
    },
  },

  filters: {
    filterData(price) {
      return "$" + price.toFixed(2);
    },
  },
};
</script>
<style scoped>
/* 添加“scoped”属性以将CSS仅限于此组件 */
</style>
