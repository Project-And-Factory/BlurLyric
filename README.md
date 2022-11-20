<div>

## <img  style="width: 64px;float: left;padding-right: 0.5em " src="https://github.com/gozaoo/gozaoo.github.io/blob/main/blurlyric/BlurLyric.png"> 
### <a style= "font-size: 2em">Blurlyric</a>

</div>

### 一款简单、高颜值、持续优化性能的第三方网易云音乐播放器

### **官方网站:**  
[blurlyric.app](https://blurlyric.app)

## 特色
支持使用unblock netease music从其他音源播放（完善中），简单、高颜值。<br>
自制歌词计算方法，实现0时延超快反馈和视觉效果更加流畅的歌词。<br>
交叉串流播放，实现歌曲与歌曲之间淡入淡出无缝切换的效果。<br>
以及通过响应式布局，赋予BlurLyric多种分辨率屏幕的强适配能力.

快速体验：<br>
<a herf="https://web.blurlyric.app/">(推荐)官方 - https://web.blurlyric.app/</a><br>
请警惕陌生链接，小心账户或隐私被盗取！！

# 使用说明
## 最新版本下载
请先登录github后
再点击 <a herf="https://web.blurlyric.app/">https://github.com/gozaoo/BlurLyric/actions/workflows/node.js.yml</a>中的最新的工作流中下载新版本

## 稳定版下载

可直接在[Releases](https://github.com/gozaoo/BlurLyric2.0/releases)页面下载已发行的稳定构建版本。（不建议从此处下载，因为不经常更新。）


##

## 使用GUI界面运行
**需要先安装npm为依赖**

首次安装： 进入文件夹，使用命令行输入
```
npm install
```
正常使用
```
npm run test
```
或双击 运行.bat 运行

## 服务器运行
> Tips:服务器运行可以使用server分支中无electron模块的版本。
```
node onlyOnWeb
```
即可，地址 http://localhost:18776/ ，可在vite.config.js修改端口

## 手动构建可执行文件
使用命令行输入
```
npm run build
npm run make
```
即可，输出在out中


## 服务器反向代理配置：
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
    proxy_http_version 1.1;`
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
# 反向代理相关配置结束
```


当然，如果你还是不行，我在有空的时候可以帮您搭建服务哦~
我的qq: 2261129603

## 帮助我们
有什么用？ 您捐助的钱会部分用于<a herf="https://web.blurlyric.app/">咸鸽 - https://web.blurlyric.app/</a><br>在线服务的费用开销，当然，也有部分被我拿去买快乐水了！XD 。总之呢，非常感谢您的使用，如果您觉得我做的产品好用可以点一下右上角的星（Star）,如果可以，也可以用您的一块钱捐助我哦~谢谢你<br>
<img style="width: 200px" src="https://github.com/gozaoo/gozaoo.github.io/blob/main/image/zfbSK.jpg">
<img style="width: 200px" src="https://github.com/gozaoo/gozaoo.github.io/blob/main/image/wxSK.png"><br>

### 什么？你有很好的点子？！！
UI改进，代码效率提高等等，都可以提交至Pull requests! 如果您是有棒的UI设计，但是不会写代码，您可以发送您的想法/设计至我的邮箱 2261129603@qq.com!

### 提供灵感、参考设计、用于核心部分的开源代码来源
https://github.com/Binaryify/NeteaseCloudMusicApi<br>
https://github.com/qier222/YesPlayMusic<br>
LyricEase（https://apps.microsoft.com/store/detail/lyricease/9N1MKDF0F4GT?hl=zh-cn&gl=CN）<br>
Apple Music<br>
Spotify

捐赠名单：不按顺序排名 <br>
微信:*央


