<template>
  <div class="about">
    <!-- 解除防盗链 -->
    <meta name="referrer" content="never" />
    <!-- 弹出时间框 -->
    <van-button type="primary" @click="showMask">弹出时间</van-button>
    <div class="box animate__animated animate__fadeInRight">
      电影列表
      <div></div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="show = !show"
        @confirm="finish"
      />
    </van-popup>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
        :immediate-check="false"
      >
        <div id="list-content">
          <div v-for="(item, index) in data" class="list" :key="index">
            <img :src="item.medium" />
            <div>
              <p>名称 : {{ item.title }}</p>
              <p>时长 : {{ item.longtime }}</p>
              <p>年份 : {{ item.year }}</p>
              <p>评分 : {{ item.rating_average }}</p>
              <p>
                导演 : {{ item.director ? item.director.join("/") : "未知" }}
              </p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// api地址
// 热映：http://www.bufantec.com/api/douban/movie/in_theaters
// 即将上映：http://www.bufantec.com/api/douban/movie/coming_soon
// top250: http://www.bufantec.com/api/douban/movie/top250
//参数start(当前页) limit(每页数量)totalRow(总数)
export default {
  name: "about",
  data() {
    return {
      //弹出时间
      show: false,
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2050, 12, 31),
      currentDate: new Date(),
      //上拉加载,下拉刷新
      data: [],
      data1: [],
      total: 1, //总条数
      page: 1, //页码
      raw: 4, //每页条数
      isLoading: false,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight; //视口大小
    document.getElementById("list-content").style.minHeight =
      winHeight - 80 + "px"; //调整上拉加载框高度
  },
  methods: {
    //下拉刷新
    onRefresh() {
      this.page = 1;
      this.finished = false;
      this.getList();
    },
    //上拉加载
    onLoad() {
      // 异步更新数据
      console.log("加载");
      this.page++;
      this.$request1({
        url: "in_theaters",
        params: {
          start: this.page,
          limit: this.raw,
        },
      }).then((res) => {
        this.data1 = res.data.data.list;
        this.total = res.data.data.totalRow;
        this.data1.map((v) => {
          this.data.push(v);
        });
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.data.length >= this.total) {
          this.finished = true;
        }
      });
    },

    getList() {
      this.$request1({
        url: "coming_soon",
        params: {
          start: this.page,
          limit: this.raw,
        },
      }).then((res) => {
        this.data = res.data.data.list;
        this.total = res.data.data.totalRow;
        this.isLoading = false;
        if (this.data.length >= this.total) {
          this.finished = true;
        }
      });
    },

    showMask() {
      this.show = !this.show;
    },
    finish(val) {
      console.log(val); //选择后的时间
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
// vant官方使用的是37.5
//使用sass(需要安装ruby环境)
//npm install -D sass-loader node-sass
$color: #27a;
.about {
  .van-button {
    width: 100%;
    background-color: $color;
  }
}
.box {
  width: 100%;
  height: 100px;
  text-align: center;
  background-color: #27a;
  position: relative;
  div {
    width: 44px;
    height: 44px;
    position: absolute;
    // 水平垂直居中
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #666 url(../assets/icon2x.png) no-repeat 0 0;
    background-size: 440px;
  }
}
.list {
  display: flex;
  margin-top: 10px;
  div {
    width: 50%;
    margin-left: 10px;
  }
  p {
    font-size: 16px;
  }
  img {
    width: 50%;
    height: 200px;
  }
}
</style>
