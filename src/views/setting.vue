<template>
  <div class="setting">
    <h1>Setting | 设置</h1>
    <div v-for="(item, i) in this.settingButton" :key="'setting'+i">
      <div class="" v-if="item.type == 'line'">
        <div class="setline">
          <div class="text">
            <span>{{item.text}}</span>
          </div>
          <label class="switch">
            <input v-model="item.bolean" type="checkbox" @change="item.func(i)">
            <div class="slider round"></div>
          </label>
        </div>
          <hr style="background-color: #00000020;height: 1px;border: none;" v-if="(i != this.settingButton.length -1)">

      </div>

      <h2 v-if="item.type == 'h2'" class="settingText">{{item.text}}</h2>
      <div v-if="item.type == 'text'">{{item.text}}</div>

   </div>

    <h1>About | 关于</h1>
    <h2>隐私政策</h2>
    <h3>Blurlyric(以下简称：该程序)本身不收集任何信息</h3>
    <p>但如果您正在访问运行该程序的在线服务，您的以下信息可能会被服务提供方收集以及访问:</p>
    <p>有关您计算机以及网络的信息，包括您的IP地址、Session Cookie，UA(用户代理)等；</p>
    <p>有关您访问和使用服务的信息，包括流量来源、访问时间、访问的歌曲ID、歌单ID、错误日志和URL路径；</p>
    <p>您在使用服务时生成的信息，包括您使用的时间、频率和环境。</p>
    <p>您发送给服务提供方的任何其他个人信息。</p>
    <h3>我的账户与密码安全吗?</h3>
    <p>根据该程序的设计，如果在线服务提供方使用TLS(传输层安全性协议)加密了你的连接，</p>
    <p>或你在本地运行该程序</p>
    <p>那么你的账户与密码就是安全的，因为它全程加密地被直接发送到网易云音乐的认证服务器。</p>
    <h3>你们是否披露任何信息?</h3>
    <p>由于该程序是不收集任何信息的开源项目，我们无法向任何个人或组织披露任何敏感信息。</p>
    <p>根据该程序的设计，任何例如专辑封面、媒体、歌词等资源直接向网易云音乐的服务器请求，没有任何中继连接。</p>
    <p>在线服务的提供方可能会披露收集的信息，但他们无法得知您的任何敏感信息（如：账户名等）</p>
    <p>这与Blurlyric也没有关系</p>
    <h3>Cookie的使用</h3>
    <p>Blurlyric使用Cookies向用户提供更好的体验，Cookies是一种会被保存在使用者电脑磁盘中的简要文档，</p>
    <p>用以追踪、保存及存储使用者和互动信息。</p>
    <p>如果您不希望Cookies被存入自己的电脑磁盘中，您需要采取必要步骤来阻止本地及在线服务提供方的Cookies。</p>
    <p>Blurlyric开发者无法获取您的cookies</p>
    <h3>更改与修订</h3>
    <p>如果我们决定更改隐私政策，我们会更新以下的隐私政策条款修改日期。</p>
    <p>条款版本：V2022.1.0</p>
    <p>修订日期：2022年8月29日</p>
    <h2>Staff | 参与人员</h2>
    <p>作者: Doge(ss15278205751@foxmail.com)<br>
      其他维护者：咸鸽(网络服务器，master@pafworld.top) (非实时更新)
    </p>
    <h2>此软件</h2>
    <p>官网：blurlyric.app  |  https://gozaoo.github.io/blurlyric/<br>
      仓库地址: https://github.com/gozaoo/BlurLyric2.0 <br>
      灵感来源/学习项目：Binaryify/NeteaseCloudMusicApi；qier222/YesPlayMusic；LyricEase；Apple Music；Spotify
    </p>
    <h2>
      帮助此项目
    </h2>
    方法1：帮助开发，如果您有能力解决或有新功能，可以在GitHub上将您的代码pull上来，或者是加入开发组，联系作者即可 <br>
    方法2：动力的来源是快乐，如果您有经济能力的话可以赞助我们一下，我们将会拿来升级服务器<a style="text-decoration: line-through">，也有可能被我们拿去花掉啦！</a>
    <img src="https://gozaoo.github.io/img/z.jpg" alt="" srcset="">
  <img src="https://gozaoo.github.io/img/w.jpg" alt="" srcset="">
  </div>

</template>

<script>
  import app from '../App.vue'

  var setting = {
    name: 'setting',
    data() {
      return {
        settingButton: [{
          text: '显示',
          type: 'h2',
        }, {
          text: '在 歌词 中使用动态字体大小',
          type: 'line',
          bolean: this.$parent.$parent.$parent.data.setting.config.lyricSet.animeFontSize,
          func: this.lyricFontSize
        }, {
          text: '暂无其他，请等待更新',
          type: 'text'
        }] 
      }
    },
    methods: {
      lyricFontSize(i){
          setTimeout(() => {
            if (this.settingButton[i].bolean == true){
              this.$parent.$parent.$parent.editconfig((data) => {
                data.lyricSet.animeFontSize = true
                return data
              })
            } else {
              this.$parent.$parent.$parent.editconfig((data) => {
                data.lyricSet.animeFontSize = false
                return data
              })

            }
          }, 100);
      }
    }
  };
  export default setting
</script>

<style>
  .setline {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    padding: 0.3em 0;
    align-items: center;
  }

  .switch {
    --width: 3em;
    width: var(--width);
    --height: 1.5em;
    --space: 0.2em;
    height: var(--height);
    position: relative;
    display: inline-block;
  }

  .setting input {
    display: none;
  }

  .round {
    border-radius: 0.75em;
  }

  .slider {
    background: rgb(220, 235, 255);

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all .4s;
    cursor: pointer;
  }

  .slider:after {
    content: '';
    width: calc(var(--height) - calc(2 * var(--space)));
    height: calc(var(--height) - calc(2 * var(--space)));
    display: block;
    border-radius: 50%;
    background-color: rgb(100%, 100%, 100%);
    position: absolute;
    top: var(--space);
    left: var(--space);
    transition: all .3s;
  }

  .setting input:checked+.slider {
    background: rgb(220, 235, 255);
  }

  .setting input:checked+.slider:after {
    background-color: rgb(0, 128, 255);

  }

  .setting input:checked+.slider:after {
    left: calc(var(--width) - var(--space));
    transform: translateX(-100%);
  }
</style>

<!--!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>



    </body>
</html-->