module.exports = {
    devServer: {
        open: true,
        // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
        proxy: {
            '/api': {
                target: 'http://1.116.64.64:5004/api2/',
                changeOrigin: true,
                pathRewrite: {// 请求路径重写
                    '^/api': ''//重写请求路径
                }
            }
        }
    }
}
