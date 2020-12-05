<template>
  <div>
    <!-- <img :src="src" alt /> -->
    <!--alt属性用于指定图片未找到时，显示的内容。 -->
    <img src="@/assets/images/headImg.png" alt="user-headImg" />
    <p>query参数==>{{ $route.query }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //引入本地资源,要是用require
      // src: require("../assets/images/headImg.png")
    };
  }
};
</script>
