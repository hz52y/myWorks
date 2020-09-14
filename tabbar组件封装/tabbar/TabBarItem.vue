<template>
  <div class="tabbar-item" @click="itemClick">
    <img v-if="isAct" class="tabbar-item-img" :src="actIcon" />
    <img v-else class="tabbar-item-img" :src="icon" />
    <div :style="{color:isAct?actTextColor:''}" class="tabbar-item-text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    to: String,
    icon: String,
    actIcon: String,
    text: String,
    actTextColor: {
      type: String,
      //默认激活颜色
      default: '#555',
    },
  },
  computed: {
    isAct() {
      return this.$route.fullPath == this.to
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.to)
    },
  },
}
</script>
<style lang="scss"  scoped>
.tabbar-item {
  width: 80px;
  height: 100px;
  margin-top: 10px;
  .tabbar-item-img {
    width: 100%;
    height: 80%;
  }
  .tabbar-item-text {
    font-size: 28px;
    line-height: 8px;
  }
}
</style>
