<h1 align="center"><img src="https://blurlyric.app/favicon.svg" alt="img" style="zoom:3%;" />BlurLyric</h1>

<p align="center"><i>简单、高颜值、好用的 网易云第三方播放器</i></p>

## License Scan

[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FProject-And-Factory%2FBlurLyric.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FProject-And-Factory%2FBlurLyric?ref=badge_large)

## 快速体验

推荐使用官方网站进行快速体验：https://web.blurlyric.app/，请注意警惕陌生链接，以免账户或隐私被盗取。

## 浏览器支持

| 浏览器            | 支持情况 |
| ----------------- | -------- |
| Apple Safari      | ✅        |
| Microsoft Edge    | ✅        |
| Google Chrome     | ✅        |
| Mozilla Firefox   | ✅        |
| Internet Explorer | ❌        |

## 特色

Blurlyric 自主编写了歌词滚动算法，实现了几乎 0 时延的超快反馈。通过响应式布局，赋予 Blurlyric 在各种分辨率屏幕下的强适配能力。持续优化和不断更迭的性能优化，力求在各种设备环境下流畅稳定运行。模仿 Spotify 的交叉串流播放，歌曲与歌曲之间切换更加自然。

# 使用说明

## 最新版本下载

请先登录 GitHub，然后在最新的工作流中下载新版本：https://github.com/gozaoo/BlurLyric/actions/workflows/node.js.yml

## 稳定版下载

可直接在 [Releases](https://github.com/gozaoo/BlurLyric2.0/releases) 页面下载已发行的稳定构建版本，但不建议从此处下载，因为这里不经常更新。

## 在线部署

在命令行中输入以下命令，即可在线部署：

```
Copy code
node .\blurlyric\onlyonweb
```

在 `vite.config.js` 中可修改端口。

## 手动构建可执行文件

在命令行中输入以下命令，即可手动构建可执行文件，输出在 `out` 中：

```
arduinoCopy codenpm run build
npm run make
```

## 服务器反向代理配置（以 Nginx 为例）

以下为服务器反向代理的配置（以 Nginx 为例）：

```
location / {
    proxy_pass http://127.0.0.1:18776;
    proxy_set_header Host $host:$server_port;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    add_header X-Cache $upstream_cache_status;

    proxy_connect_timeout 30s;
    proxy_read_timeout 86400s;
    proxy_send_timeout 30s;
    proxy_http_version 1.1;`
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## 帮助我们

您的捐赠将有助于我们支付 <a herf="https://web.blurlyric.app/">https://web.blurlyric.app/</a> 在线服务的运营费用，同时也支持我们的开发。感谢您的使用。如果您认为我们的产品好用，请在右上角点一下星星（Star）以表示支持。如果您愿意，您还可以捐赠一块钱，我们会非常感激。 <img style="width: 200px" src="https://github.com/gozaoo/gozaoo.github.io/blob/main/image/zfbSK.jpg"> <img style="width: 200px" src="https://github.com/gozaoo/gozaoo.github.io/blob/main/image/wxSK.png">

### 您有很好的想法吗？

如果您有任何好的建议、参考设计或者开源代码，欢迎通过Pull requests与我们分享。如果您是UI设计大师但不会写代码，您可以提出issue，也可以将您的想法或设计发送至邮箱[2261129603@qq.com](mailto:2261129603@qq.com)或[master@pafworld.top](mailto:master@pafworld.top)或加入[Telegram](https://t.me/pafnetwork)群，我们非常欢迎您的参与。

### 感谢以下开源项目为我们提供的灵感、参考设计和核心代码：

- [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [qier222/YesPlayMusic](https://github.com/qier222/YesPlayMusic)
- [LyricEase](https://apps.microsoft.com/store/detail/lyricease/9N1MKDF0F4GT?hl=zh-cn&gl=CN)
- [Apple Music](https://www.apple.com/apple-music/)
- [Spotify](https://www.spotify.com/)
