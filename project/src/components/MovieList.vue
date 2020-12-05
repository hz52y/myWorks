<template>
  <div>
    <!-- 解除防盗链 -->
    <meta name="referrer" content="never" />
    <ul class="list">
      <li v-for="(item, i) in movieData" :key="i">
        <img :src="item.medium" />
        <div class="movieInfo">
          <p>名称 : {{ item.title }}</p>
          <p>时长 : {{ item.longtime }}</p>
          <p>年份 : {{ item.year }}</p>
          <p>评分 : {{ item.rating_average }}</p>
          <p>导演 : {{ item.director ? item.director.join("/") : "未知" }}</p>
          <p>
            编剧 :
            {{ item.scriptwriter ? item.scriptwriter.join("/") : "未知" }}
          </p>
          <p>上映时间 : {{ item.show_date ? item.show_date.join("/") : "未知" }}</p>
          <p>类型 : {{ item.genres ? item.genres.join("/") : "未知" }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    movieData: Array,
  },
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.list li {
  width: 350px;
  height: 250px;
  border: 1px solid #eee;
  margin-left: 35px;
  display: flex;
}
.list img {
  width: 50%;
  height: 100%;
}

.movieInfo {
  padding: 10px 10px;
}

.movieInfo p {
  font-size: 14px;
}
</style>
