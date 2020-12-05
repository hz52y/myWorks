module.exports = {
    //publicPath部署应用包时的基本 URL(打包的基路径)
    //因为本地开发都是基于localhost根路径访问的
    //部署到后台后,后台并不是基于根路径访问的(比如部署在app/admin文件夹下),所以会造成静态资源找不到
    //如果你的应用被部署在localhost/app/admin/xxx
    //则设置 publicPath为'/app/admin/'
    publicPath: '/app/admin/',
    //打包目录(npm run build)
    outputDir: 'dist',
    //放置生成的静态资源(js、css、img、fonts)的目录
    assetsDir: 'static',
    //lintOnSave: process.env.NODE_ENV === 'development',//(可选择false)
    //lintOnSave:是否在开发环境下通过 eslint- loader在每次保存时检查代码。
    //这个值会在 @vue/cli-plugin-eslint 被安装之后生效
    // ESLint 通过 .eslintrc文件配置
    // 在生产构建时禁用 eslint- loader,配置如下：
    // lintOnSave: process.env.NODE_ENV !== 'production'
    //设置不生成生产环境的 source map文件,加速生产环境构建
    productionSourceMap: false,
    devServer: {
        port: 9527,
        open: true,
        //设置让浏览器 overlay 同时显示警告和错误
        // overlay: {
        //     warnings: true,
        //     errors: true
        // },
        //http://localhost:9527/xxx==请求==>http://bufantec.com(另一台主机地址)
        //协议相同,域名不同,端口不同==>所以是跨域请求
        //通过webpack的devServer.proxy代理实现突破跨域
        //在浏览器Network下观察,发送的请求由http://bufantec.com/xxx变为(代理)http://localhost:9527/xxx
        //实现了请求的协议,域名,端口与本地保持一致,从而突破跨域
        //跨域仅仅需要在开发时需要用,打包给后台,后台部署在同一主机下,不存在跨域问题
        proxy: {
            //正则匹配拦截以/api开头的请求,会自动拼接为完整的url,不需要再配置baseURL
            '^/api': {
                //target:需要跨域的API地址
                target: 'http://bufantec.com',
                //changeOrigin为true让target参数是域名
                //将主机头的来源更改为目标URL
                changeOrigin: true,
                //是否代理websocket
                // ws: true,
                //是否验证SSL证书,设置后支持https协议的代理
                //可以使用无效证书的后端服务器
                secure: false,
                // 重写目标的url路径
                // pathRewrite: {
                // '更改前的路径':'更改后的路径'
                //     '^/api':'^/xxx'
                // }

            },
            '^/user': {
                target: 'https://api.zhubaba.cn',
                changeOrigin: true,
                secure: false,
            }
        }

    }

}
