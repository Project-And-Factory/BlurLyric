<h1 align="center"><img src="https://github.com/Project-And-Factory/BlurLyric/blob/main/src/assets/icon.png?raw=true" alt="img" style="zoom:3%;" />BlurLyric</h1>

<p align="center"><i>A simple, beautiful, and user-friendly third-party player for NetEase Cloud Music</i></p>

<p align="center"><a href="README.md">English</a> | <a href="README_CN.md">简体中文</a></p>

## License Scan

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FProject-And-Factory%2FBlurLyric.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FProject-And-Factory%2FBlurLyric?ref=badge_large)

## Quick Start

We recommend using the official website for a quick experience: https://web.blurlyric.app/ Please be wary of unfamiliar links to prevent theft of your account or privacy.

## Browser Support

| Browser           | Support  |
| -----------------| -------- |
| Apple Safari      | ✅       |
| Microsoft Edge    | ✅       |
| Google Chrome     | ✅       |
| Mozilla Firefox   | ✅       |
| Internet Explorer | ❌       |

## Features

BlurLyric independently developed a lyric scrolling algorithm, achieving almost zero delay and ultra-fast feedback. Responsive layout gives BlurLyric strong adaptation capabilities on screens with various resolutions. Continuous optimization and constant iteration of performance improvements ensure smooth and stable operation on various device environments. The cross-stream playback of songs, imitating Spotify, makes switching between songs more natural.

# User Guide

## Download the Latest Version

Please log in to GitHub first, and then download the new version in the latest workflow: https://github.com/gozaoo/BlurLyric/actions/workflows/node.js.yml

## Download the Stable Version

The stable build version that has been released can be downloaded directly on the [Releases](https://github.com/gozaoo/BlurLyric2.0/releases) page, but downloading from this location is not recommended because it is not updated frequently.

## Initialization

Please perform this step before any operation.
```
npm install
```

## Online Deployment

Enter the following command in the CLI to deploy online:

```
node .\blurlyric\onlyonweb
```

The port can be modified in `vite.config.js`.

## Manual Building of Executable Files

Enter the following command in the command line to manually build executable files, which will be output in `out`:

```
npm run build
```

```
npm run make
```

## Server Reverse Proxy Configuration (using Nginx as an Example)

The following is the configuration for server reverse proxy (using Nginx as an example):

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

## Help Us

Your donation will help us pay for the operating costs of the online service at <a herf="https://web.blurlyric.app/">https://web.blurlyric.app/</a> and support our development. Thank you for using our product. If you think our product is useful, please click the "Star"

### Do you have any good ideas?

If you have any good suggestions, reference designs, or open-source code, please feel free to share with us through Pull requests. If you are a UI design expert but do not know how to code, you can submit an issue, or you can send your ideas or designs to [2261129603@qq.com](mailto:2261129603@qq.com) or [master@pafworld.top](mailto:master@pafworld.top), or join the [Telegram](https://t.me/pafnetwork) group. We welcome your participation.

### Thanks to the following projects for providing us with inspiration, reference designs and core code:

- [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [qier222/YesPlayMusic](https://github.com/qier222/YesPlayMusic)
- [LyricEase](https://apps.microsoft.com/store/detail/lyricease/9N1MKDF0F4GT?hl=zh-cn&gl=CN)
- [Apple Music](https://www.apple.com/apple-music/)
- [Spotify](https://www.spotify.com/)
