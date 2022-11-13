// main.js

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('force_high_performance_gpu')

// 加载NeteaseCloudMusicAPI
const NeteaseCloudMusicApi = require('./app.js')

NeteaseCloudMusicApi.start()

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "BlurLyric",
    icon:"src/icon/iconx256.ico",
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#00000000',symbolColor: 'black'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })
  // 打开开发工具

  mainWindow.webContents.loadURL('http://localhost:18775/')
}


  // 这段程序将会在 Electron 结束初始化
  // 和创建浏览器窗口的时候调用
  // 部分 API 在 ready 事件触发后才能使用。
  app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })


