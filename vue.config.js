module.exports = {
    devServer: {
        port:3001,
        open:true,
        proxy: {
            "/api": {
              target: "http://182.92.128.115/",
            }
          }
    },
    lintOnSave: false
}