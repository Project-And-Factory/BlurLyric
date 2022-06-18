// onlyOnWeb.js
const path = require('path')


/**
 * 修改端口和服务器请在vite.config.js内修改
 */
// 加载vite
const { createServer } = require('vite')

;(async () => {
  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: path.join(__dirname, 'vite.config.js'),
    root: __dirname,
  })
  await server.listen()

  server.printUrls()
})()


// 加载NeteaseCloudMusicAPI
const NeteaseCloudMusicApi = require('./app.js')

NeteaseCloudMusicApi.start()