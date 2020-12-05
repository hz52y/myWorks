<!--  -->
<template>
  <div class="details">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="分享"
      left-arrow
      @click-left="back"
      @click-right="share"
    />
    <van-swipe class="my-swipe" :autoplay="3000" width="375" indicator-color="white">
      <van-swipe-item v-for="item in 4" :key="item">
        <img :src="goodsInfo.img" />
      </van-swipe-item>
    </van-swipe>
    <div class="gInfo">
      <van-count-down :time="time" format="秒杀倒计时:DD 天 HH 时 mm 分 ss 秒" />
      <h4>¥{{ (goodsInfo.price * 1).toFixed(2) }}</h4>
      <p>{{ goodsInfo.desc }}</p>
      <p>库存{{ goodsInfo.total }}</p>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" @click="toCart" text="购物车" :badge="count" />
      <van-goods-action-button
        :disabled="!goodsInfo.total"
        @click="addCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      goodsInfo: {}
    };
  },
  created() {
    //模拟利用id获取更加详细数据
    // this.$request({
    //   url: "details",
    //   params: {
    //     id: this.$route.params.id,
    //   },
    // }).then((res) => {
    //   this.goodsInfo = res.data;
    // });
    this.$request({
      url: "home"
    }).then(res => {
      this.goodsInfo = res.data.find(item => item.id == this.$route.params.id);
    });
    // 模拟后台更改库存
    // this.$root.$on("sendData", (id, count) => {
    //   if (id == this.goodsInfo.id) {
    //     this.goodsInfo.total -= count;
    //   }
    // });
  },
  computed: {
    //   count(){
    //     return this.$store.state.cart.cart.length
    //   }
    ...mapState({
      count(state) {
        return state.cart.cart.length;
      }
    })
  },
  methods: {
    addCart() {
      if (!sessionStorage.getItem("token")) {
        this.$router.push("/me");
      } else {
        const goods = {
          id: this.goodsInfo.id,
          price: this.goodsInfo.price,
          img: this.goodsInfo.img,
          name: this.goodsInfo.name,
          max: this.goodsInfo.total,
          count: 1,
          isChecked: false
        };
        this.$store.commit("cart/addCart", goods);
        this.goodsInfo.total--;
      }
    },
    back() {
      //返回
      this.$router.go(-1);
    },
    toCart() {
      this.$router.push("/cart");
    },
    share() {
      Toast("分享成功");
    }
  }
};
</script>
<style scoped>
.van-goods-action {
  margin-bottom: 10px;
}

.my-swipe img {
  /* 加路由动画后,图片宽度不是100%,van-swipe插件添加width="375" */
  height: 100%;
  width: 100%;
}
h4 {
  color: red;
}
.details {
  /* 100vh屏幕的高度 */
  /* width: 100vw; */
  /* height: 100vh; */
  width: 100%;
  height: 100%;
}
.van-count-down {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: red;
}
.gInfo p {
  font-weight: bold;
  font-size: 16px;
}
</style>
