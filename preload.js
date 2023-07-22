// preload.js

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
const { ipcRenderer ,contextBridge} = require('electron')


window.addEventListener('DOMContentLoaded', () => {
      electronBar = document.createElement('style')
      electronBar.type = "text/css"
      
      electronBar.appendChild(document.createTextNode(".electron-control{display:block !important} .windowControlBar{z-index:100 !important}"))
      document.body.appendChild(electronBar)
    })

  contextBridge.exposeInMainWorld('electronAPI',{
    min:()=>{
    //   mainWindow.minimize()
    ipcRenderer.send('min')
    },
    close:()=>{
        ipcRenderer.send('close')

    },
    max:()=>{
        ipcRenderer.send('max')
  }})