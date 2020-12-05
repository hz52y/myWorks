<template>
  <div>
    <tabbar @sendData="getData"></tabbar>
    <swiper :imgs="list.slice(0, 6)"></swiper>
    <!-- .sync
    当一个子组件改变了一个 props的值时，
    父组件中的这个数据也会同步发生改变-->
    <movie-list :movieData="list"></movie-list>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[12, 20, 40, 60]"
      :page-size.sync="limit"
      :current-page.sync="start"
      layout="prev, pager, next, jumper,sizes,total"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination>
  </div>
</template>

<script>
//@是src目录
//@以src目录为根目录
// scoped 使样式只作用域当前的组件
//.vue可以省略
import Tabbar from '@/components/Tabbar'
import MovieList from '@/components/MovieList'
import Swiper from '@/components/Swiper'
// api地址
// 热映：http://www.bufantec.com/api/douban/movie/in_theaters
// 即将上映：http://www.bufantec.com/api/douban/movie/coming_soon
// top250: http://www.bufantec.com/api/douban/movie/top250
//参数start(当前页) limit(每页数量)totalRow(总数量)
export default {
  name: 'home',
  //注册组件
  components: {
    MovieList,
    Swiper,
    Tabbar,
  },
  data() {
    return {
      total: 0,
      start: 1,
      limit: 12,
      list: [],
      type: 'in_theaters',
    }
  },

  created() {
    //keepAlive缓存页面只会触发一次
    console.log('首页==>created')
  },
  //一般在每个页面请求数据,然后传递给子组件展示
  activated() {
    console.log('首页==>activated')
    //该页面被缓存,如果要在每次进入页面的时候获取最新的数据
    //需要在activated阶段获取数据,替换原来的created
    // es7 async方法(最终)
    //立即执行函数最好加分号
    //初始化
    ;(async () => {
      const res = await this.$request({
        url: '/api/douban/movie/' + this.type,
        params: {
          start: this.start,
          limit: this.limit,
        },
      })
      // console.log("async-->", res);
      // :total="total"
      // total是总请求的总数据
      // :page-size.sync="limit"
      // page-size = res.data.data.pageSize
      //page-size是每页显示多少数据
      //所以总页数=total(240)/(page-size(12,20,40,60))
      this.total = res.data.data.totalRow
      this.list = res.data.data.list
    })()
  },
  methods: {
    //更新数据
    updateData() {
      this.$request({
        // 通过proxy代理请求路径变为
        // Request URL: http://localhost:9527/api/douban/movie/in_theaters?start=1&limit=12
        url: '/api/douban/movie/' + this.type,
        params: {
          start: this.start,
          limit: this.limit,
        },
      }).then((res) => {
        this.list = res.data.data.list
      })
    },

    getData(val) {
      this.type = val
      //重置查询页码为1
      this.start = 1
      this.updateData()
    },
    //页码发生改变时触发
    handleCurrentChange(val) {
      //val为改变后的页码
      //:page-size.sync="limit"
      //:current-page.sync="start"
      //sync修饰符,双向绑定(会同步,不用再赋值this.start = val)
      this.updateData()
    },
    //每页显示数据发生改变时触发
    handleSizeChange() {
      this.updateData()
    },
  },
}
</script>
<style scoped>
.el-pagination {
  text-align: center;
  margin: 50px auto;
}
</style>