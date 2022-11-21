// preload.js

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
      electronBar = document.createElement('style')
      electronBar.type = "text/css"
      document.body.appendChild(electronBar)
      electronBar.appendChild(document.createTextNode(".electron-control{display:block !important}"))
  })