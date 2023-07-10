// onlyOnWeb.js
const console = require('console')
const path = require('path')


/**
 * 修改端口和服务器请在vite.config.js内修改
 */
// 加载vite
// 加载vite
const { createServer ,build} = require('vite')
var loadURL = 'http://localhost:18776/'

 async function viteLuncher(){
  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: path.join(__dirname, '../vite.config.js'),
    root:path.join(__dirname, '../') ,
  })
  
  server.listen().then(()=>{
    server.printUrls()

  })
  build()

}  

viteLuncher()

// 加载NeteaseCloudMusicAPI
const NeteaseCloudMusicApi = require('../app.js')

NeteaseCloudMusicApi.start()

var welcome = "==========================\nBlurLyric (开发模式 development mode)\n\n开发服务器启动在|dev server on: "+loadURL+"\napi服务器启动在|api server on: https://localhost:18775/\n\n=========================="
console.log(welcome)
