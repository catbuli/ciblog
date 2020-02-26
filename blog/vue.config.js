// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']


module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
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
                target: process.env.VUE_APP_URL, //API本地服务器的地址
                // ws: true, //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {
                    //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
        //在本地服务器开启gzip，线上服务器都支持gzip不需要设置
        // before(app) {
        //     app.get(/.*.(js)$/, (req, res, next) => {
        //         req.url = req.url + '.gz';
        //         res.set('Content-Encoding', 'gzip');
        //         next();
        //     })
        // }
    },
    // webpack配置
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //匹配文件名
                threshold: 10240, //对10K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets: false, //是否删除源文件
            })
        ]
    },
    //打包位置
    outputDir: 'C:/Users/Administrator/Desktop/share/ciblog',
};