# blurlyric

## 如何安装此工具？
```
npm install
```
## 如何修改其NeteaseMusicAPI地址？
> 依次进入blurlyric/src/network/request.js内，修改第六行为
```
        baseURL: '你的',
```
如果您把构建放入NeteaseMusicAPI的public内，请留空，如下：
```
        baseURL: '',
```

### 将其启动
```
npm run dev
```

### 构建它
```
yarn build
```

如何使用构建呢？
放入<a herf="https://github.com/Binaryify/NeteaseCloudMusicApi">Binaryify-NeteaseCloudMusicApi</a>的public文件夹内即可使用。
注意：请修改NeteaseMusicAPI地址为空再构建然后放入public，否自无法找到api服务器

### Lints and fixes files
```
yarn lint
```

