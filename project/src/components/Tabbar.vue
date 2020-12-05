<template>
  <div>
    <ul class="title" @click="change">
      <li data-type="in_theaters">正在热映</li>
      <li data-type="coming_soon">即将上映</li>
      <li data-type="top250">Top250</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    change(e) {
      //先判断点击的是不是li标签
      if (e.target.closest('li')) {
        this.$emit('sendData', e.target.dataset.type)
      }
    },
  },
}
</script>
<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  width: 320px;
  padding: 10px 0;
}
.title li {
  width: 100px;
  height: 30px;
  background-color: #27a;
  color: #fff;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
