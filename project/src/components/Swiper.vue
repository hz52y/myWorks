<template>
  <div>
    <!-- swiper轮播 -->
    <swiper :options="swiperOptions">
      <swiper-slide class="swiper-slide-item" v-for="(item, i) in imgs" :key="i">
        <el-image fit="cover" class="swiper-img" :src="item.medium"></el-image>
      </swiper-slide>
      <div class="swiper-pagination dot" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- elementUI轮播 -->
    <!-- <el-carousel :interval="3000" height="500px">
      <el-carousel-item v-for="(item, i) in imgs" :key="i">
        <img :src="item.large" />
      </el-carousel-item>
    </el-carousel>-->
  </div>
</template>

<script>
//局部引入swiper
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  //局部引入的swiper需要注册组件
  components: {
    Swiper,
    SwiperSlide,
  },
  //接收父组件请求的数据
  props: {
    imgs: Array,
  },
  data() {
    return {
      swiperOptions: {
        //一页展示slide个数
        slidesPerView: 1.2,
        // active slide会居中
        centeredSlides: true,
        // 当设置了Active Slide居中后，还可以配合设置此参数，
        // 使得第一个和最后一个Slide 始终贴合边缘。
        centeredSlidesBounds: true,
        //slide间隔
        spaceBetween: 30,
        //小点
        pagination: {
          el: '.swiper-pagination',
          //点击切换
          clickable: true,
        },
        //上一个下一个slide切换
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        //自动切换
        autoplay: true,
        //循环切换
        loop: true,
      },
    }
  },
}
</script>

<style lang="less" scoped>
// npm i less less-loader -S
// 使用 scoped 后，父组件的样式将不会渗透到子组件中
//vue穿透语法(>>>)
//Sass穿透语法(::v-deep)
//less穿透语法(/deep/)
.swiper-img {
  width: 100%;
  height: 300px;
}
img {
  width: 100%;
  height: 100%;
}
.swiper-button-prev,
.swiper-button-next {
  color: #666;
}
/* .el-carousel {
 组件el-carousel的类名
} */
.el-carousel /deep/.el-carousel__button {
  // 组件el-carousel-item的类名
  background: fff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}
//穿透语法,组件class上加类名
.dot /deep/ .swiper-pagination-bullet {
  background: rgba(0, 0, 0, 1);
}
.dot /deep/ .swiper-pagination-bullet-active {
  background: rgba(255, 255, 255, 0.8);
}
.el-carousel /deep/.el-carousel__arrow {
  width: 50px;
  height: 50px;
}
// .el-carousel__arrow
// .el-icon-arrow-right
.el-carousel /deep/.el-icon-arrow-right,
.el-carousel /deep/.el-icon-arrow-left {
  font-size: 30px;
  color: #fff;
}
</style>
