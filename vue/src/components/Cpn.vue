<template>
  <div>
    <strong>+++++++++++++++++++Cpn++++++++++++++++++++</strong>
    <h2>我是Cpn</h2>
    <p>Cpn子组件获取的数据-->{{ msg }}</p>
    <slot name="cpn">
      <h2>我是插槽默认值</h2>
    </slot>
    <button @click="send">子组件send数据=>父组件</button>
    <Cpn1></Cpn1>
    <PublicCpn></PublicCpn>
    <strong>+++++++++++++++++++Cpn++++++++++++++++++++</strong>
  </div>
</template>


<script>
import Cpn1 from "./Cpn1.vue";

// Cpn1是Cpn的子组件
export default {
  name: "cpn",
  data() {
    return {
      childData: "我是子组件的数据"
    };
  },
  props: {
    msg: String
  },
  methods: {
    send() {
      this.$emit("sendData", this.childData);
    }
  },
  components: {
    //注册Cpn1
    // Cpn1: Cpn1
    // 简写
    Cpn1
  }
};
</script>

<style scoped>
</style>