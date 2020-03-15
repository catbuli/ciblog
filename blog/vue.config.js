// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']


module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/pages/index/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        admin: {
            // page 的入口
            entry: 'src/pages/admin/admin.js',
            // 模板来源
            template: 'public/admin.html',
            // 在 dist/index.html 的输出
            filename: 'admin.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'admin Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },
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
    // outputDir: 'C:/wamp64/www',
};