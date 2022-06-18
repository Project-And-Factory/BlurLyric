// main.js

const { app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('force_high_performance_gpu')


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

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })
  // 打开开发工具
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.loadURL('http://localhost:18776/')


}


  // 这段程序将会在 Electron 结束初始化
  // 和创建浏览器窗口的时候调用
  // 部分 API 在 ready 事件触发后才能使用。
  app.whenReady().then(() => {
    createWindow()


    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })


