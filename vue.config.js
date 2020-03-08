const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const debug = process.env.NODE_ENV !== 'production'
module.exports = {
    publicPath: '/', // 根域上下文目录
    outputDir: process.env.outputDir, // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        externals: {
            'vue': 'Vue',
            'axios': 'axios',
            'vue-i18n': 'VueI18n',
            'echarts': 'echarts',
            // "element-ui": "ELEMENT",
            'vuex': 'Vuex',
            'vue-router': 'VueRouter'
        },
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },

    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    devServer: {
        host: 'localhost',
        port: 10003
    },

}