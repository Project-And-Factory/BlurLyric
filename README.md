# Blurlyric

快速体验：<br>
<a herf="https://alphamusic.pafworld.top/">(推荐)咸鸽 - https://alphamusic.pafworld.top/</a><br>
<br>
<a herf="https://music.imgugu.ink/">咕咕咕鸽awa(qq:2493237147) - https://music.imgugu.ink/</a>><br>
感谢上方跑起并且提供在线服务的网友

# 使用说明
## 正常用户
首次安装： 进入文件夹，使用命令行输入
```
npm install
```
正常使用
```
npm run el:serve
```

## 服务器运行
```
node onlyOnWeb
```
即可，地址 http://localhost:18776/ ，可以在vite.config.js修改

## 服务器反向代理配置：

在main.js中，修改第四行config.onWebServer改为true即,
```
var config = {
  onWebServer: false
}
//改成
var config = {
  onWebServer: true
}

```
 然后通过Nginx配置反向代理即可
```
# 反向代理相关配置开始
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
# 反向代理相关配置结束
```


当然，如果你还是不行，我在有空的时候可以帮您搭建服务哦~
我的qq: 2261129603

## 帮助我
有什么用？ 您捐助的钱会部分用于<a herf="https://alphamusic.pafworld.top/">咸鸽 - https://alphamusic.pafworld.top/</a><br>在线服务的费用开销，当然，也有部分被我拿去买快乐水了！XD 。总之呢，非常感谢您的使用，如果您觉得我做的产品好用可以点一下右上角的星（Star）,如果可以，也可以用您的一块钱捐助我哦~谢谢你<br>
<img style="width: 200px" src="https://gozaoo.github.io/image/zfbSK.jpg">
<img style="width: 200px" src="https://gozaoo.github.io/image/wxSK.png"><br>

捐赠名单：
（暂无）

### 什么？你有很好的点子？！！
UI改进，代码效率提高等等，都可以提交至Pull requests! 如果您是有棒的UI设计，但是不会写代码，您可以发送您的想法/设计至我的邮箱 2261129603@qq.com!

### 灵感/用于核心部分的开源代码来源
https://github.com/Binaryify/NeteaseCloudMusicApi<br>
https://github.com/qier222/YesPlayMusic<br>
LyricEase（https://apps.microsoft.com/store/detail/lyricease/9N1MKDF0F4GT?hl=zh-cn&gl=CN）<br>
Apple Music