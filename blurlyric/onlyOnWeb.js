// onlyOnWeb.js
const path = require('path')


/**
 * 修改端口和服务器请在vite.config.js内修改
 */
// 加载vite
const vite = require('vite')
vite.build()

// 加载NeteaseCloudMusicAPI
const NeteaseCloudMusicApi = require('../app.js')

NeteaseCloudMusicApi.start()