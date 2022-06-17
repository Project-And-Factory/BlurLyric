@@ -1,66 +0,0 @@
# Blurlyric

快速体验：<br>
<a herf="https://alphamusic.pafworld.top/">(推荐)咸鸽 - https://alphamusic.pafworld.top/</a><br>
<br>
<a herf="https://music.imgugu.ink/">咕咕咕鸽awa(qq:2493237147) - https://music.imgugu.ink/</a>><br>
感谢上方跑起并且提供在线服务的网友

## 使用说明
### 小提示：Releases中的server.zip中的blurlyric/src/network/request.js>[7]baseURL: '*URL*' *URL*为localhost:3000, 而build.zip是留空构建的，也就是说，您直接在开发环境中，运行server和NeteaseCloudMusicApi即可快速使用，不需要特别设置，并且您可以把build.zip解压后，与NeteaseCloudMusicApi/public文件夹替换，就可以通过NeteaseCloudMusicApi的服务进入BlurLyric服务

### 普通用户
首次安装： 进入文件夹，使用命令行输入
```
npm install
```
正常使用
```
npm run el:serve
```

### 用于开发环境
下载源码后，进入blurlyric工作目录
首次使用需输入
```
npm install
```
运行开发服务则需要使用
```
npm run dev
```
运行构建方法
```
npm run build
```
构建后文件在dist内
* 注意! 使用构建前请先确认您的NeteaseMusicAPI服务地址为 http://abc.abc/ 则需要进入blurlyric/src/network/request.js内，修改第六行为
```
        baseURL: 'http://abc.abc/',
        //若您构建后是放入NeteaseMusicAPI的public文件夹内，请设置为空！
        
```
### 用于项目实际
首先搭建<a herf="https://github.com/Binaryify/NeteaseCloudMusicApi">Binaryify-NeteaseCloudMusicApi</a>
将NeteaseCloudMusicApi解压后，进入其工作目录，输入
```
npm install
//这是第一次安装时安装模块使用的，后续不需要
node app
//默认将启动在http://localhost:3000/,您可以去NeteaseCloudMusicApi/server.js修改。
```
然后将blurlyric构建的文件放入NeteaseCloudMusicApi/public内即可

> 注意：
> 请正确填写blurlyric/src/network/request.js的baseURL地址：
> 不要把blurlyric覆盖在NeteaseCloudMusicApi，内，他俩是分开运行的
> 在运行blurlyric开发环境的同时，也要运行NeteaseCloudMusicApi，否则无法运行
> 如果您将Blurlyric的构建运行在例如http://abc.abc/music/的目录，请前往blurlyric/vite.config.js中修改第九行
```
base: './'
//为
base: './music/'
```

当然，如果你还是不行，我在有空的时候可以帮您搭建服务哦~
我的qq: 2261129603

## 帮助我
有什么用？ 您捐助的钱会部分用于<a herf="https://alphamusic.pafworld.top/">咸鸽 - https://alphamusic.pafworld.top/</a><br>在线服务的费用开销，当然，也有部分被我拿去买快乐水了！XD 。总之呢，非常感谢您的使用，如果您觉得我做的产品好用可以点一下右上角的星（Star）,如果可以，也可以用您的一块钱捐助我哦~谢谢你<br>
<img style="width: 200px" src="https://gozaoo.github.io/image/zfbSK.jpg">
<img style="width: 200px" src="https://gozaoo.github.io/image/wxSK.png"><br>

捐赠名单：
（暂无）

谢谢你们。
