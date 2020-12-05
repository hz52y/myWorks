<!--  -->
<template>
  <div>
    <van-tabs sticky>
      <van-tab v-for="index in 8" :key="index" :title="'手机' + index">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <van-card
            v-for="item in goods"
            :key="item.id"
            @click="toDetails(item.id)"
            :price="item.price"
            :title="item.name"
            :thumb="item.img"
          ></van-card>
        </van-pull-refresh>
        <div class="box"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      goods: [],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.$request({
      url: "home",
    }).then((res) => {
      this.goods = res.data;
    });
  },
  methods: {
    onRefresh() {
      this.$request({
        url: "home",
      }).then((res) => {
        setTimeout(() => {
          this.isLoading = false;
          this.goods = res.data;
        }, 1000);
      });
    },
    toDetails(id) {
      this.$router.push("/details/" + id);
      // this.$router.push({
      //   path: "/details",
      //   //一般情况下详情页会利用id请求更加详细的数据,
      //   query: { id },
      // });
    },
  },
};
</script>
<style scoped>
.box {
  height: 100px;
}
</style>
