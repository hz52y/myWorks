module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            // 注意将蓝湖上的设计稿，宽度设置为375px,这样设计稿是100px，
            // 程序上直接写100px就可以了
            //设计稿是750=>需要将所有px单位数据除以2
            // 把px单位换算成rem单位
            rootValue: 37.5,//配置1rem=37.5px
            // vant官方使用的是37.5
            // 如果要是用vant插件, 建议rootValue设置为37.5
            // 如果设计稿是750的把rem提示插件(设置=>Cssrem:rootfontsize改为75)
            // 然后按提示插件转换为对应rem,如果设计稿是750px=>就写10rem=>在页面展示的就是375px,
            // 因为这里配置了rootValue(跟字体大小)为37.5px,1rem=37.5px
            // 与页面比例关系是1:1
            selectorBlackList: ["vant", "mu"], // 忽略转换正则匹配项
            propList: ["*"],
          }),
        ],
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
};
