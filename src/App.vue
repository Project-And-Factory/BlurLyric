<template>
    <audio v-bind:src="data.player.now.musicUrl" @pause='data.player.playing=false' @play='data.player.playing=true'
        @ended="finishPlay" ref="audio" id="audio" @timeupdate="getCurr" @canplay="showLong"></audio>
    <div class="toplab">
        <div class="tl-title">BlurLyric</div>
        <div class="linkbox">
            <router-link id="link-musicLib-me" :to="{path:'/'}">我</router-link>
            <router-link id="link-musicLib" :to="{path:'/'}">音乐库</router-link>
            <router-link :to="{path:'/found'}">发现</router-link>
        </div>
        <input placeholder="搜索框" v-on:keydown.enter="search" type="none" id="searchInput">
    </div>

    <div class="viewBox">
        <div class="opes" v-bind:class="this.$route.name" v-if="(!data.user.account)">
            <h2>您似乎还 没有登录<br>点击登录来获取最佳体验</h2>
            <div class="linkbox bigger">

                <router-link @changetrack="changeTrack" :to="{path:'/loginUser'}">去登录</router-link>
            </div>
        </div>

        <router-view :data="data" />
    </div>
    <div id="player">
        <!--迷你控制器-->
        <div class="player-Mini">
            <div @click="mainDisplayChange()">
                <img style="display:inline-block;user-select: none;border-radius: 13px;height: var(--minplayerHeight);width:var(--minplayerHeight);"
                    v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl +'?param=48y48'" alt="" srcset="">
                <div class="player-Mini-Title">
                    <h1>{{data.player.tracks[data.player.trackNum].name}} <a
                            v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
                            style="color: rgba(44,62,80,0.5)"> {{alia}}</a></h1>
                    <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar" :key="item.id">{{item.name}} </a>
                    </h2>
                </div>
            </div>
            <div class="linkbox">
                <!--播放按键-->
                <!--喜欢按钮-->
                <a @click="loveMusic()"
                    v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) != -1)"
                    style="color:red;user-select:none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /></svg>
                </a>
                <a @click="loveMusic()"
                    v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) == -1)"
                    style="user-select:none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                </a>
                <!--上一曲-->
                <a class="minWidthUnneed" @click="upMusic()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-skip-start" viewBox="0 0 16 16">
                        <path
                            d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
                        =</svg>
                </a>

                <!--播放按键-->
                <a @click="plays()">
                    <!--未播放样式-->
                    <svg v-if="( data.player.playing == false )" xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                    <!--正播放样式-->
                    <svg v-if="( data.player.playing != false )" xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                        </svg>
                </a>
                <!--下一曲-->
                <a @click="nextMusic()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-skip-end" viewBox="0 0 16 16">
                        <path
                            d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
                        </svg>
                </a>


            </div>
        </div>
        <div v-bind:style="'background-image:url('+ data.player.tracks[data.player.trackNum].al.picUrl +')'"
            v-if="data.player.uiDisplay.mainDisplay != buttom" class="player-background"></div>
        <!--
        主UI界面
      -->
        <!--控制界面按钮-->
        <div v-if="(data.player.uiDisplay.mainDisplay != 'buttom')">
            <div @click="mainDisplayChange()" class="playerUIControl-Buttom">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
              </svg>
            </div>
        </div>
        <!--display-->
        <div>
            <div class="playerDisplayOutBox" v-bind:style="'display:' + data.player.uiDisplay.displayPlayBox">
                <div class="left-side playerIndexSide">
                    <div>
                        <!--图像-->
                        <div class="left-sideImage">
                            <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl" alt="">
                            <div v-bind:style="'background-image: url(' + data.player.tracks[data.player.trackNum].al.picUrl + ')'" class="sideImageCard">
                              <div class="sideImageCardDorpBlur">
                                <a>
                                  {{data.player.tracks[data.player.trackNum].al.name}}
                                </a>
                                <!--喜欢按钮-->
                                <a @click="loveMusic()"
                                    v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) != -1)"
                                    style="padding: 8px 10px 6px 10px;color:red;user-select:none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                </a>
                                <a @click="loveMusic()"
                                    v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) == -1)"
                                    style="padding: 8px 10px 6px 10px;user-select:none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-heart" viewBox="0 0 16 16">
                                        <path
                                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                        </svg>
                                </a>
                                <!--下载按钮-->
                                <a v-bind:href="data.player.now.musicUrl" v-bind:download="data.player.tracks[data.player.trackNum].name"
                                    style="padding: 8px 10px 6px 10px;user-select:none">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                  </svg>
                                </a>

                              </div>
                            </div>
                        </div>
                        <!--标题条-->
                        <div class="player-Title">
                            <h1>{{data.player.tracks[data.player.trackNum].name}} <a
                                    v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
                                    style="color: rgba(44,62,80,0.5)"> {{alia}}</a></h1>
                            <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar"
                                    :key="item.id">{{item.name}} </a></h2>
                        </div>
                        <!--进度条-->
                        <div class="musicContorlCurrTime"
                            style="flex-direction: row; margin-top: 15px; display: flex; gap: 10px;align-items: center; justify-content: space-between;">
                            <div>{{formTime(data.player.uiDisplay.currTime)}}</div>
                            <div class="mCside"></div>
                            <div>{{formTime(data.player.uiDisplay.duration)}}</div>
                        </div>
                        <!--播放按键-->
                        <div class="linkbox">
                            <!--上一曲-->
                            <a @click="upMusic()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    class="bi bi-skip-start" viewBox="0 0 16 16">
                                    <path
                                        d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
                                    =</svg>
                            </a>

                            <!--播放按键-->
                            <a @click="plays()">
                                <!--未播放样式-->
                                <svg v-if="( data.player.playing == false )" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" fill="currentColor" class="bi bi-play-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>
                                <!--正播放样式-->
                                <svg v-if="( data.player.playing != false )" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" fill="currentColor" class="bi bi-pause-fill"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                                    </svg>
                            </a>
                            <!--下一曲-->
                            <a @click="nextMusic()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    class="bi bi-skip-end" viewBox="0 0 16 16">
                                    <path
                                        d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
                                    </svg>
                            </a>


                        </div>
                    </div>
                </div>
                <div class="right-side playerIndexSide">

                    <div id="lyric">
                        <div id="lyricGunDong">
                            <ul id="lyrics" v-if="(data.player.now.oLRC.tran == true)">
                                <li @click="$refs.audio.currentTime = item.t" v-for="(item) in data.player.now.oLRC.ms" v-bind:key="item.t">
                                    <h1>{{item.c}}</h1>
                                    <h2>{{item.tranC}}</h2>
                                    <div>{{formTime(parseInt(item.t))}}</div>
                                </li>
                            </ul>
                            <ul id="lyrics" v-if="(data.player.now.oLRC.tran == false)">
                                <li @click="$refs.audio.currentTime = item.t" v-for="item in data.player.now.oLRC.ms" v-bind:key="item.t">
                                    <h1>{{item.c}}</h1>
                                    <div>{{formTime(parseInt(item.t))}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import reTools from './network/getData'
import './style.css'

var bodyHeight = document.documentElement.clientHeight
window.addEventListener('resize', getWindowInfo)
function getWindowInfo() {
  bodyHeight = document.documentElement.clientHeight
console.log(bodyHeight);

}
 
export default {
  data() {
    return {
      id: 0,
      data: {
        user:{},
        
        
        player:{
          playing: false,
          uiDisplay: {
              displayPlayBox: 'grid',
              mainDisplay: 'buttom',
              duration:0,
              realCurrTime: 0,
              currTime:0,
              progress:0,
              LineNum: 0
            },
          now:{
            musicUrl: '',
            oLRC:{
              offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
              ms: [], //歌词数组{t:时间,c:歌词}
              tran: false
            },
            
          },
          trackNum: 0,
          tracks:[
{
    "name": "群青",
    "id": 1472480890,
    "pst": 0,
    "t": 0,
    "ar": [
        {
            "id": 33927412,
            "name": "YOASOBI",
            "tns": [],
            "alias": []
        }
    ],
    "alia": [
        "BOURBON波路梦「帆船mini巧克力饼干」新CM曲"
    ],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 4,
    "crbt": null,
    "cf": "",
    "al": {
        "id": 94214994,
        "name": "群青",
        "picUrl": "https://p2.music.126.net/sF9I_mKMVNtsCD-ZXzfV_A==/109951165251958014.jpg",
        "tns": [],
        "pic_str": "109951165251958014",
        "pic": 109951165251958020
    },
    "dt": 248444,
    "h": {
        "br": 320000,
        "fid": 0,
        "size": 9939885,
        "vd": -78226
    },
    "m": {
        "br": 192000,
        "fid": 0,
        "size": 5963949,
        "vd": -75675
    },
    "l": {
        "br": 128000,
        "fid": 0,
        "size": 3975981,
        "vd": -74111
    },
    "a": null,
    "cd": "01",
    "no": 1,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 270336,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 4,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 1416336,
    "mv": 10977779,
    "publishTime": 1598889600000

  }]
        },
        myMusicList:{
          
        },
        musicListInfor:{
          myLove:{
            data:{},
            aRtrackIds:[],
            display:{
              lyric: '',
              
            }
          }
        }
      }
    }
  },

  created() {
    this.loginInfor();
    this.lyricSet()
    bodyHeight = document.documentElement.clientHeight
  }
  ,
  watch: {
    id:{
      async handler(newid,oldId){
        if (oldId == undefined) {
          return 0
        }
        //同步音乐文件
        reTools.getData('/song/url',{id:newid}).then(r=>{
          this.data.player.now.musicUrl = r.data[0].url;
        })
        //同步音乐歌词
        reTools.getData('/lyric',{id: newid}).then(r=>{
          if (r.lrc.lyric && r.tlyric) {
            this.setcreateLrcObj(r.lrc.lyric,r.tlyric.lyric).then(r=>{
              this.data.player.now.oLRC = r
            })
          } else {
            this.setcreateLrcObj(r.lrc.lyric).then(r=>{
              this.data.player.now.oLRC = r
            })
          }
          
        })
      }
    }
  }
  ,
  methods: {
    loginInfor(){
      reTools.getData('/login/status', {
        timetamp: (Number(new Date()))
      }).then(r=>{
        this.data.user = r.data
        if (this.data.user.account) {
          this.myPlayList()
        }
      })
    },
    myPlayList(){
      reTools.getData('/user/playlist',{uid: this.data.user.profile.userId}).then(r=>{
        this.data.myMusicList = r.playlist
        
        reTools.getData('/playlist/detail',{id: this.data.myMusicList[0].id}).then(r=>{
        this.data.musicListInfor.myLove.data = r
        let aRtrackIds = []
        for (let number in r.privileges) {
          aRtrackIds.push(r.privileges[number].id)
        }
        this.data.musicListInfor.myLove.aRtrackIds = aRtrackIds;
        /**
         * 数据同步完成
         * 开始随机歌词语句
        */
        let randomID= this.data.musicListInfor.myLove.data.playlist.tracks[Math.round(Math.random()*this.data.musicListInfor.myLove.data.playlist.tracks.length)].id
        reTools.getData('/lyric',{id:randomID}).then(r=>{
          let ms = this.setcreateLrcObj(r.lrc.lyric).ms
          let content = '';
          let counts = 0
          getSomeLyric:for (const num in ms) {
              if (ms[num].t>30) {
                content += ms[num].c+ '<br>';
              }
              counts++
              if (counts == 12) break getSomeLyric
          }
          this.data.musicListInfor.myLove.display.lyric = content;
        })
        })
      })
    },
    async setcreateLrcObj(lrc,tran) {
      
      let oLRC={
        offset: -200, //时间补偿值，单位毫秒，用于调整歌词整体位置
        ms: [] ,//歌词数组{t:时间,c:歌词}
        tran: false
      }
      let norLRC = this.Lrcsplit(lrc);
      let tranLRC
      if (tran) {
        tranLRC = this.Lrcsplit(tran)
        for(let num in norLRC){
          let obj = tranLRC.find(o=>o.t == norLRC[num].t)
          if (obj) {
            console.log(obj);
          }
          //如果能找到对应的翻译歌词
          if (obj){
            if (!obj.t) {
              obj.t = 0
            }
            //插入tranContent
            oLRC.ms.push({ //对象{t:时间,c:歌词}加入ms数组
              t: norLRC[num].t,
              c: norLRC[num].c,
              tranC: obj.c
            })
          
          } else {
            //无法找到，原文照抄
            oLRC.ms.push({ //对象{t:时间,c:歌词}加入ms数组
              t: norLRC[num].t,
              c: norLRC[num].c,
              tranC: ''
            })
          }


          
        }
        oLRC.tran = true
      } else {
        oLRC.ms = this.Lrcsplit(lrc)
      }
      
      
      oLRC.ms.sort(function (a, b) { //按时间顺序排序
        return a.t - b.t;
      });
      return oLRC;
      
    
    },
    //格式化歌词文件
    Lrcsplit(lrc){
      let lrcs = lrc.split('\n');


      let olrcms = [];
      for (let i in lrcs) { //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
        let s = t.split(":"); //分离:前后文字
        if (isNaN(parseInt(s[0]))) { //不是数值
          for (let i in lrcs) {
            if (i != "ms" && i == s[0].toLowerCase()) {
              lrcs[i] = s[1];
            }
          }
        } else { //是数值
          let arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
          
          let start = 0;
          for (let k in arr) {
            start += arr[k].length; //计算歌词位置
          }

          var content = lrcs[i].substring(start); //获取歌词内容
          for (let k in arr) {
            let t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
            let s = t.split(":"); //分离:前后文字
            if ((parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3) == 0) {
              continue
            }
            olrcms.push({ //对象{t:时间,c:歌词}加入ms数组
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content
            });

          }
        }
      }
      return olrcms
    }
    ,
    formTime(sec){ //秒数转化为mm:ss
      let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
      let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
      return min + ':' + s
    },
    async lyricSet(){
      setTimeout(()=>{this.lyricSet()}, 50);
      if (this.data.player.playing == true && this.data.player.uiDisplay.displayPlayBox != 'buttom') {
        
      let lyrics = document.getElementById('lyrics')

      let lis = lyrics.getElementsByTagName("li")
      let currTime
      if (document.querySelector('#audio')) {
         currTime = parseInt(document.querySelector('#audio').currentTime)
      } else {
        return 0
      }

      if (lis.length == 0) {
        return
      }
      let lyricNum = -1;
      for (let num in this.data.player.now.oLRC.ms) {
        if (this.data.player.now.oLRC.ms[num].t <= currTime+0.6 ) {
          lyricNum ++
        }
      }
      if (this.data.player.uiDisplay.LineNum != lyricNum){
        this.data.player.uiDisplay.LineNum = lyricNum

        if (lis[lyricNum]) {
          lis[lyricNum].className = 'lineHeight'
        }
        for (let num = 0 ;num < lis.length; num++) {
          if (num != lyricNum && lis[num]) {
            lis[num].className = ''
          }
        }
        this.data.player.uiDisplay.LineNum = lyricNum
        let lineNoTop = 0;
        for (let i = 0; i <= lyricNum; i++) {
          lineNoTop += lis[i].clientHeight + 8;
          if (i==lyricNum) {
            lineNoTop += -0.5 * (lis[i].clientHeight + 8);
          }
        }
        let lineNoTopPX = ((bodyHeight/2)-lineNoTop)
        if (document.querySelector('#lyricGunDong')) {
          document.querySelector('#lyricGunDong').style.transform= 'translateY(' + lineNoTopPX + 'px)'
        }
        this.data.player.uiDisplay.lyricTopPx = lineNoTopPX + 'px'
        }

      }
    }
    ,
    async getCurr(){//音频进度转换

      let currTime
      if (document.querySelector('#audio')) {
         currTime = parseInt(document.querySelector('#audio').currentTime)
      } else {
        return 0
      }
      this.data.player.uiDisplay.realCurrTime =currTime
      this.data.player.uiDisplay.currTime = currTime
      this.data.player.uiDisplay.progress = this.curr / this.duration * 100
      //开始设置歌词
      //枚举获得歌词高度

      //for (let num = 0; num < lyrics.length; num++) {

      //}
    },
    showLong(){//音频加载成功后改变进度
      this.data.player.uiDisplay.duration = parseInt(this.$refs.audio.duration)
    },
    changeLong(){
        let ct = this.progress * this.duration / 100
        if (!isNaN(ct)) {
            this.$refs.audio.currentTime = ct
        }
 
      },
    plays() { //播放暂停控制

      if (this.data.player.playing == true) {
        document.querySelector('#audio').pause()
      } else if (this.data.player.playing == false) {
        

          document.querySelector('#audio').addEventListener('canplay',function () {
            document.querySelector('#audio').play();
          })
          document.querySelector('#audio').addEventListener('loadeddata', function() {
              if (document.querySelector('#audio').readyState >= 2) {
                  document.querySelector('#audio').play();
              }
            })
          if (document.querySelector('#audio').readyState >= 2) {
            document.querySelector('#audio').play();
          }
      }
            
          
      // this.is_stop=!this.is_stop

    },
    nextMusic(){
      
      if (this.data.player.tracks.length != this.data.player.trackNum+1) {
        document.querySelector('#audio').pause();
        this.data.player.playing = false;
        this.data.player.trackNum++
        this.id = this.data.player.tracks[this.data.player.trackNum].id
        setTimeout(() => {
          this.plays()
        }, 150);
      }
    },
    upMusic(){
      
      if (this.data.player.trackNum != 0) {
        document.querySelector('#audio').pause();
        this.data.player.playing = false;
        this.data.player.trackNum--
        this.id = this.data.player.tracks[this.data.player.trackNum].id
        setTimeout(() => {
          this.plays()
        }, 150);
      }
    },
    finishPlay(){
      if (document.querySelector('#audio').loop != false) {
         if (this.data.player.tracks.length > this.data.player.trackNum) {
          this.nextMusic()
         }
      }
    }
    ,
    mainDisplayChange(){
      //settimeout为动画之后的事件，方便优化
      if (this.data.player.uiDisplay.mainDisplay == 'buttom') {
        document.getElementById('player').style.top = 'calc(0px - var(--minplayerHeight))';
        this.data.player.uiDisplay.mainDisplay ='watting'
        setTimeout(() => {
          this.data.player.uiDisplay.mainDisplay = 'top' 
        }, .5 * 1000);
      } else {
        document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight))'
        this.data.player.uiDisplay.mainDisplay = 'watting'
        setTimeout(() => {
          this.data.player.uiDisplay.mainDisplay ='buttom' 
        }, .5 * 1000);
      }

    },
    /**
     * data: {
     *    tracks: []
     *    num: 0
     * }
     */
    changeTrack(data){ //接受router的数据
      if (this.data.player.tracks == data.tracks&&this.data.player.trackNum == data.num) {
        return '重复请求'
      } else{
      document.querySelector('#audio').pause();
      this.data.player.playing = false;
      this.id = data.tracks[data.num].id
      this.data.player.tracks = data.tracks
      this.data.player.trackNum = data.num
      this.plays()
      document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight))'

      }

    },
    async loveMusic(id){
      let RealID
      if (id != undefined ) {
        RealID = id
      } else{
        RealID = this.data.player.tracks[this.data.player.trackNum].id
      }
      if (this.data.musicListInfor.myLove.aRtrackIds.indexOf(RealID) != -1) {
        reTools.getData('/like',{
          id: RealID,
          like: false,timetamp: (Number(new Date()))
        }).then(()=>{
          for (const num in this.data.musicListInfor.myLove.aRtrackIds) {
            if (this.data.musicListInfor.myLove.aRtrackIds[num] == RealID) {
              this.data.musicListInfor.myLove.aRtrackIds.splice(num,1)
              break
            }
          }
          this.refuseMyLove()
        })} else {
        reTools.getData('/like',{
          id: RealID,
          like: true,timetamp: (Number(new Date()))
          
        }).then(()=>{
          this.data.musicListInfor.myLove.aRtrackIds.push(RealID)
          this.refuseMyLove()
        })
        }
      },
      

    refuseMyLove(){
        reTools.getData('/playlist/detail',{id: this.data.myMusicList[0].id,timetamp: (Number(new Date()))}).then(r=>{
        this.data.musicListInfor.myLove.data = r
        let aRtrackIds = []
        for (let number in r.privileges) {
          aRtrackIds.push(r.privileges[number].id)
        }
        this.data.musicListInfor.myLove.aRtrackIds = aRtrackIds;
        })
    },
    search(){
      let value = document.getElementById('searchInput').value
      console.log(value);
      if (this.$route.name != 'search') {
        this.$router.push({name:'search',query:{q: value }})
      } else {
        this.$router.push({name:'search',query:{q: value }})
      }

    },
  }}



</script>