<h1 align="center"><img src="https://blurlyric.app/favicon.svg" alt="img" style="zoom:3%;" />BlurLyric</h1>

<p align="center"><i>一款简单、美观且用户友好的网易云音乐第三方播放器。</i></p>

<p align="center"><a href="README.md">English</a> | 简体中文</p>

## 许可证

[![FOSSA 状态](https://app.fossa.com/api/projects/git%2Bgithub.com%2FProject-And-Factory%2FBlurLyric.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FProject-And-Factory%2FBlurLyric?ref=badge_large)

## 快速开始

我们建议使用 [官方网站](https://web.blurlyric.app/) 进行快速体验。请注意，谨防不熟悉的链接，以防止账户或隐私被盗。

## 浏览器支持

| 浏览器             | 支持     |
| ----------------- | -------- |
| Apple Safari      | ✅       |
| Microsoft Edge    | ✅       |
| Google Chrome     | ✅       |
| Mozilla Firefox   | ✅       |
| Internet Explorer | ❌       |

## 功能

BlurLyric 独立开发了一个歌词滚动算法，实现了几乎零延迟和超快的反馈。响应式布局使得 BlurLyric 在不同分辨率的屏幕上具有强大的适应能力。持续优化和不断迭代的性能改进，确保在各种设备环境下运行流畅稳定。模仿 Spotify 的跨流播放使得切换歌曲更加自然。

# 用户指南

## 下载最新版本

请先登录 GitHub，然后在最新的 [Workflow](https://github.com/gozaoo/BlurLyric/actions/workflows/node.js.yml) 中下载新版本。

## 下载稳定版本

已发布的稳定构建版本可直接在 [Releases](https://github.com/gozaoo/BlurLyric2.0/releases) 页面下载，但不推荐从此位置下载，因为更新频率较低。

## 初始化

在进行任何操作之前，请执行以下步骤。

```
npm install
```

## 在线部署

在命令行界面中输入以下命令以进行在线部署：

```
node .\blurlyric\onlyonweb
```

端口可以在 `vite.config.js` 中进行修改。

## 手动构建可执行文件

在命令行中输入以下命令以手动构建可执行文件，输出将位于 `out` 文件夹中：

```
npm run build
```

```
npm run make
```

## 服务器

反向代理配置（以 Nginx 为例）

以下是服务器反向代理配置（以 Nginx 为例）：

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
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## 帮助我们

您的捐赠将帮助我们支付 [在线服务](https://web.blurlyric.app/) 的运营成本，并支持我们的开发工作。感谢您使用我们的产品。如果您认为我们的产品有用，请点击 Star 按钮。

### 有好的想法吗？

如果您有任何好的建议、参考设计或开源代码，请随时通过 Pull requests 与我们分享。如果您是 UI 设计专家，但不懂编程，您可以提交 Issue，或将您的想法或设计发送至 [2261129603@qq.com](mailto:2261129603@qq.com) 或 [master@pafworld.top](mailto:master@pafworld.top)，或加入 [Telegram](https://t.me/pafnetwork) 群组。我们欢迎您的参与。

### 特别感谢以下项目为我们提供灵感、参考设计和核心代码：

- [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [qier222/YesPlayMusic](https://github.com/qier222/YesPlayMusic)
- [LyricEase](https://apps.microsoft.com/store/detail/lyricease/9N1MKDF0F4GT?hl=zh-cn&gl=CN)
- [Apple Music](https://www.apple.com/apple-music/)
- [Spotify](https://www.spotify.com/)
- [JetBrains](https://www.jetbrains.com/)
- [Cloudflare](https://www.cloudflare.com/)
- 
