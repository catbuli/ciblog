module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 博客↑
    // 打包取消map文件
    productionSourceMap: false,
    devServer: {
        open: true, //是否自动弹出浏览器页面
        https: false,
        hotOnly: false,
        port: '8020',
        proxy: {
            '/api': {
                target: process.env.VUE_APP_URL, //API服务器的地址
                // ws: true, //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {
                    //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        }
    },
    //打包位置
    outputDir: 'C:/Users/Administrator/Desktop/share/ciblog',
};