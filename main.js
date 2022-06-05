// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const NeteaseCloudMusicApi = require('./app.js')


// 加载NeteaseCloudMusicAPI
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

  // 加载 index.html
  mainWindow.webContents.loadURL('http://localhost:18775/')

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
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
