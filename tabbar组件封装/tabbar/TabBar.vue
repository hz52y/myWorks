<template>
  <div class="tab" :style="{color:textColor,background}">
    <!--没有具名插槽,一个匿名插槽对应tab-bar组件包裹的全部元素-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    textColor: {
      type: String,
      default: '#9d9d9d',
    },
    background: {
      type: String,
      default: '#eee',
    },
  },
}
</script>
<style lang="scss" scoped>
.tab {
  position: fixed;
  width: 100%;
  height: 130px;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
</style>
