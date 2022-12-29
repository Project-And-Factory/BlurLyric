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
            <input v-model="item.bolean" type="checkbox" @change="item.func(item)">
            <div class="slider round"></div>
          </label>
        </div>
        <hr style="background-color: #00000020;height: 1px;border: none;" v-if="(i != this.settingButton.length -1)">

      </div>
      <div class="" v-if="item.type == 'tap'">
        <div class="setline">
          <div class="text">
            <span>{{item.text}}</span>
          </div>

        </div>
        <div class="setline">

          <div class="text">{{item.config.min}}
          </div>
          <input style="display:block;text-align: center;width: 100px;" v-on:keydown="this.pushData"
            v-model="config.setting.config.lyricSet.dur" id="searchInput">

          <div class="text">{{item.config.max}}
          </div>
        </div>
        <div @click="item.clickFunc"
          v-bind:style="('--height:calc(0.6vh + 0.3vw);--musicProgressPercent:' + (new Number(config.setting.config.lyricSet.dur) + item.config.offset)/1000)"
          class="box-progressbar">
          <div id="progress"></div>
          <div id="pointer"></div>
        </div>
        <hr style="background-color: #00000020;height: 1px;border: none;" v-if="(i != this.settingButton.length -1)">

      </div>
      <h2 v-if="item.type == 'h2'" class="settingText">{{item.text}}</h2>
      <div v-if="item.type == 'text'">{{item.text}}</div>

    </div>

    <h1>About | 关于</h1>
    <h2>隐私政策</h2>
    <p>正在写</p>
    <h2>Staff | 参与人员</h2>
    <p>作者: Doge(ss15278205751@foxmail.com)<br>
      其他维护者：咸鸽(网络服务器，master@pafworld.top) (非实时更新)
    </p>
    <h2>此软件</h2>
    <p>官网：blurlyric.app | https://gozaoo.github.io/blurlyric/<br>
      仓库地址: https://github.com/gozaoo/BlurLyric2.0 <br>
      灵感来源/学习项目：Binaryify/NeteaseCloudMusicApi；qier222/YesPlayMusic；LyricEase；Apple Music
    </p>
    <h2>
      帮助此项目
    </h2>
    方法1：帮助开发，如果您有能力解决或有新功能，可以在GitHub上将您的代码pull上来，或者是加入开发组，联系作者即可 <br>
    方法2：动力的来源是快乐，如果您有经济能力的话可以赞助我们一下，我们将会拿来升级服务器<a style="text-decoration: line-through">，也有可能被我们拿去花掉啦！</a>

    <div class="linkbox">
      <a @click="displayQrCode = !displayQrCode">
        <div v-if="!displayQrCode">显示收款码</div>
        <div v-if="displayQrCode">隐藏收款码</div>
      </a>
    </div>
    <div v-if="displayQrCode">
      一定要慎重花钱喔，理性赞助\(￣︶￣*\)) <br>
      <img style="width: 200px;" src="https://gozaoo.github.io/img/z.jpg" alt="" srcset="">
      <img style="width: 200px;" src="https://gozaoo.github.io/img/w.jpg" alt="" srcset=""><br>
      一元也是爱ヽ(✿ﾟ▽ﾟ)ノ<a style="color:red"> ❤</a>
    </div>
  </div>

</template>

<script>
  import configjs from '../js/config.js'
  let config = configjs.setting.config
  var setting = {
    name: 'setting',
    data() {
      return {
        displayQrCode: false,
        settingButton: {
          text1: {
            text: '显示',
            type: 'h2',
          },
          animeFontSize: {
            text: '在 歌词 中使用全局动态字体大小',
            type: 'line',
            bolean: config.lyricSet.animeFontSize,
            func: (item) => {
              config.lyricSet.animeFontSize = item.bolean
              this.upload()
            }
          },
          useBlur: {
            text: '在 歌词 中使用模糊字体',
            type: 'line',
            bolean: config.lyricSet.funcBlur,
            func: (item) => {
              config.lyricSet.funcBlur = item.bolean
              this.upload()
            }
          },
          useDelay: {
            text: '在 歌词 中使用延迟特效',
            type: 'line',
            bolean: config.lyricSet.funcDelay,
            func: (item) => {
              config.lyricSet.funcDelay = item.bolean
              this.upload()
            }
          }
        },
        config
      }

    },
    created() {
      console.log(this.config);
    },
    methods: {
      upload() {
        configjs.methods.editconfig((r) => {
          return this.config
        })
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