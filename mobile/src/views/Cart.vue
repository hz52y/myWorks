<!--  -->
<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="back" />
    <van-swipe-cell v-for="item in list" :key="item.id">
      <div class="goodsItem">
        <van-checkbox v-model="item.isChecked"></van-checkbox>
        <p class="name">{{ item.name }}</p>
        <van-card :num="item.count" :price="item.price" :thumb="item.img" />
        <!-- @change="iptChange(item.id, $event)" -->
        <van-stepper
          @change="iptChange(item)"
          v-model="item.count"
          min="1"
          :max="item.max"
          integer
        />
      </div>

      <template #right>
        <van-button @click="del(item.id)" square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
    <div v-if="!list.length">
      <h4>购物车空空如也</h4>
    </div>
    <van-submit-bar :price="total * 100" button-text="提交订单">
      <van-checkbox v-model="allChecked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    list() {
      return this.$store.state.cart.cart
    },
    allChecked: {
      get() {
        return this.$store.getters['cart/getAllChecked']
      },
      set(v) {
        this.$store.commit('cart/setAllChecked', v)
      },
    },

    ...mapGetters({
      total: 'cart/total',
    }),
    // total() {
    //   return this.$store.getters["cart/total"];
    // },
  },
  methods: {
    iptChange(obj) {
      // obj.count=>输入框的值(双向数据绑定)
      // console.log(obj.id, obj.count);
      // this.$root.$emit("sendData", obj.id, obj.count);
    },
    ...mapMutations({
      del: 'cart/del',
    }),
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
<style scoped>
h4 {
  text-align: center;
}
.van-submit-bar {
  margin-bottom: 50px;
}
.name {
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
}

.goodsItem {
  display: flex;
  justify-content: space-between;
}

.van-stepper {
  margin-top: 40px;
}
.delete-button {
  height: 100%;
}
</style>
