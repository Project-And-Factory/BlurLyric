<template>
  <audio v-bind:loop="data.player.loop" v-bind:src="data.player.now.musicUrl" @pause='data.player.playing=false'
    @play='data.player.playing=true' @ended="finishPlay" ref="audio" id="audio" @timeupdate="getCurr"
    @canplay="showLong"></audio>
    
    <!--图片预缓存
    
    作用：使背景图片提前加载实现渐变
    -->
    <div v-if="data.player.tracks[data.player.trackNum + 1] && data.player.tracks[data.player.trackNum - 1]" style="display: none;">
      <img v-bind:src="data.player.tracks[data.player.trackNum + 1].al.picUrl" alt="" srcset="">
      <img v-bind:src="data.player.tracks[data.player.trackNum - 1].al.picUrl" alt="" srcset="">
    </div>

  <!--左侧导航栏-->
  <div v-bind:class="'leftlab ' + data.ui.leftSideWidth + ' ' + data.player.uiDisplay.mainDisplay">
    <div class="linkbox">
      <!--返回按钮-->
      <a @click="this.$router.go(-1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg><a>返回</a> </a>
      <hr style="color:#00000050;width:100%;margin: 2px 0;">
        <a alt="显示描述" @click="leftBarSet()"><svg v-if="data.ui.leftSideWidth =='icon'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle" viewBox="0 0 16 16">
  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z"/>
</svg><svg v-if="data.ui.leftSideWidth == 'iconWithText'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
</svg><a>显示描述</a></a>
        

      <hr style="color:#00000050;width:100%;margin: 2px 0">
      <!--主页-->
      <router-link id="link-musicLib-me" :to="{path:'/'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
          <path fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg>
        <a>我</a></router-link>
      <router-link id="link-musicLib" :to="{path:'/'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
          <path fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg><a>音乐库</a></router-link>
      <router-link :to="{path:'/found'}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg><a>发现</a></router-link>
    </div>
  </div>
  <!--右侧导航栏-->
  <div v-bind:class="'rightrow ' + data.player.uiDisplay.mainDisplay">
    <!--顶部logo及导航（viewBox）-->
    <div class="ROWTOPtitle">
      <div class="tl-title">BlurLyric</div>
      <input placeholder="搜索框" v-on:keydown.enter="search" type="none" id="searchInput">
      <div class="dragBar"></div>

    </div>
    <div class="viewBox">
      <div class="opes" v-bind:class="this.$route.name" v-if="!data.user.account || data.user.profile == undefined">
        <h2>您似乎还 没有登录<br>点击登录来获取最佳体验</h2>
        <div class="linkbox bigger">

          <router-link @changetrack="changeTrack" :to="{path:'/loginUser'}">去登录</router-link>
        </div>
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :data="data" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :data="data" />
    </div>
  </div>

  <div id="player">
    <!--迷你控制器-->
    <div class="player-Mini">
      <div>
        <div @click="mainDisplayChange()" class="player-Mini-img">
          
          <img
          v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl +'?param=48y48'" alt="" srcset="">
          <img
          v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl +'?param=48y48'" alt="" srcset="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
        </div>

        <div class="player-Mini-Title">
          <h1>{{data.player.tracks[data.player.trackNum].name}} <a
              v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
              style="color: rgba(44,62,80,0.5)"> {{alia}}</a></h1>
          <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar" :key="item.id">{{item.name}} </a>
          </h2>
        </div>
      </div>
      <div class="player-Mini-Contorl">
        <!--播放按键-->
        <!--喜欢按钮-->
        <a @click="loveMusic()"
          v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) != -1)"
          style="color:red;user-select:none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="currentColor" class="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </a>
        <a @click="loveMusic()"
          v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) == -1)"
          style="user-select:none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-heart"
            viewBox="0 0 16 16">
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </a>
        <!--上一曲-->
        <a v-if="data.player.random != true" class="minWidthUnneed player-Mini-Contorl-normal" @click="upMusic()">
          <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-skip-start"
            viewBox="0 0 16 16">
            <path
              d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
            =</svg>
        </a>

        <!--播放按键-->
        <a class="player-Mini-Contorl-normal elm-play" @click="plays()">
          <!--未播放样式-->
          <svg v-if="( data.player.playing == false )" xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
          <!--正播放样式-->
          <svg v-if="( data.player.playing != false )" xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
            <path
              d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
          </svg>
        </a>
        <!--下一曲-->
        <a class="player-Mini-Contorl-normal" @click="nextMusic()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-end"
            viewBox="0 0 16 16">
            <path
              d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
          </svg>
        </a>


      </div>
    </div>
    <div v-bind:style="'background-image:url('+ data.player.tracks[data.player.trackNum].al.picUrl +')'"
      v-if="data.player.uiDisplay.mainDisplay != 'buttom'"
      v-bind:class="'player-background ' + data.player.uiDisplay.mainDisplay"></div>
    <!--
        主UI界面
      -->
    <!--控制界面按钮-->
    <div class="playertopbar" v-if="(data.player.uiDisplay.mainDisplay != 'buttom')">
      <div class="electron-control">
        <div class="dragBar"></div>
      </div>
      <svg  @click="mainDisplayChange()" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-chevron-down contorlPlayerButtom" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>


        <div class="player-Title">
                <h1>{{data.player.tracks[data.player.trackNum].name}} <a
                    v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
                    style="color: rgba(44,62,80,0.5);font-size: 0.8em;"> {{alia}}</a></h1>
                <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar" :key="item.id">{{item.name}}
                  </a><a>&nbsp;-&nbsp;
                    {{data.player.tracks[data.player.trackNum].al.name}}
                  </a></h2>
        </div>
        <!--
      <div class="musicTitle">
        
        <svg @click="data.player.uiDisplay.SideDisplaySet = 'onlyLeft'" xmlns="http://www.w3.org/2000/svg" width="28"
          height="32" fill="currentColor" class="bi bi-file-richtext" viewBox="0 0 16 16">
          <path
            d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
          <path
            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
        </svg>
        
        <svg @click="data.player.uiDisplay.SideDisplaySet = ''" xmlns="http://www.w3.org/2000/svg" width="25"
          height="32" fill="currentColor" class="bi bi-grid-1x2" viewBox="0 0 16 16">
          <path
            d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-5z" />
        </svg>
        <svg @click="data.player.uiDisplay.SideDisplaySet = 'onlylyric'" xmlns="http://www.w3.org/2000/svg" width="32"
          height="32" fill="currentColor" class="bi bi-text-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
        </svg>
      </div>
        -->

    </div>
    <!--display-->
      <div v-bind:class="data.player.uiDisplay.SideDisplaySet + ' playerDisplayOutBox'" v-bind:style="'display:' + data.player.uiDisplay.displayPlayBox">
        <div class="left-side playerIndexSide">
          
            <!--图像-->
            <div class="left-sideImage">
              <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl" alt="">
              <div v-bind:style="'background-image: url(' + data.player.tracks[data.player.trackNum].al.picUrl + ')'"
                class="sideImageCard">
                <div class="acrylicEffect sideImageCardDorpBlur">
                </div>
              </div>
            </div>
 

            <!--进度条-->
            <div class="musicContorlCurrTime">
              <div class="mCside">
                <div v-bind:style="'--progress:' + data.player.uiDisplay.progress" class="continueBar"></div>
              </div>
              <div style="display:flex;justify-content: space-between "><div>{{formTime(data.player.uiDisplay.currTime)}}</div>
              <div>{{formTime(data.player.uiDisplay.duration)}}</div></div>
            </div>
            <!--播放按键-->
            <div class="linkbox">
              <!--上一曲-->
              <a v-if="data.player.random != true" @click="upMusic()">
                <svg xmlns="http://www.w3.org/2000/svg" style="height: 3.2vh; width: 3.2vh" fill="currentColor"
                  class="bi bi-skip-start" viewBox="0 0 16 16">
                  <path
                    d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
                  =</svg>
              </a>

              <!--播放按键-->
              <a @click="plays()">
                <!--未播放样式-->
                <svg v-if="( data.player.playing == false )" xmlns="http://www.w3.org/2000/svg"
                  style="height: 4.5vh; width: 4.5vh" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
                <!--正播放样式-->
                <svg v-if="( data.player.playing != false )" xmlns="http://www.w3.org/2000/svg"
                  style="height: 4.5vh; width: 4.5vh" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                  <path
                    d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                </svg>
              </a>
              <!--下一曲/随机-->
              <a @click="nextMusic()">
                <svg style="height: 3vh; width: 3vh" v-if="data.player.random == true" t="1657019671848" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2140" width="1024" height="1024"><path d="M336 73.6l406.4 412.8c12.8 12.8 12.8 38.4 0 51.2L336 950.4c-12.8 12.8-35.2 12.8-51.2 0l-3.2-3.2c-12.8-12.8-12.8-38.4 0-51.2l377.6-384L281.6 131.2c-12.8-12.8-12.8-38.4 0-51.2l3.2-3.2c16-16 38.4-16 51.2-3.2z" p-id="2141"></path></svg>
                <svg v-if="data.player.random != true" xmlns="http://www.w3.org/2000/svg" style="height: 3.2vh; width: 3.2vh" fill="currentColor"
                  class="bi bi-skip-end" viewBox="0 0 16 16">
                  <path
                    d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
                </svg>
              </a>


            </div>
            <div class="playerLeftLink">
            <a  @click="loveMusic()">
              <svg style="color:red;user-select:none;height: 2.8vh; width: 2.8vh" v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(id) != -1)" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-heart-fill"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>
              <svg  v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(id) == -1)"
              style="user-select:none;height: 2.8vh; width: 2.8vh" xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-heart"
                viewBox="0 0 16 16">
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>

              
            </a>
            <a @click="nextMusicEventControl()">
              <svg style="height: 3vh; width: 3vh" v-if="data.player.random == true" t="1657018045660" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1704" width="1024" height="1024"><path d="M844.8 665.6c-6.4-6.4-16-12.8-25.6-9.6-19.2 0-35.2 16-35.2 35.2 0 9.6 6.4 19.2 12.8 25.6l41.6 41.6c-44.8-6.4-86.4-22.4-121.6-51.2-3.2 0-3.2-3.2-6.4-6.4L332.8 304C268.8 233.6 192 195.2 99.2 195.2c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32c73.6 0 134.4 32 182.4 86.4l384 400 6.4 6.4c48 38.4 108.8 64 172.8 70.4l-48 44.8c-9.6 6.4-16 19.2-16 28.8 0 19.2 19.2 35.2 38.4 32 9.6 0 19.2-6.4 25.6-12.8l99.2-92.8c16-16 16-41.6 0-57.6l-99.2-102.4z m-3.2-556.8c-12.8-16-32-19.2-48-6.4-9.6 6.4-12.8 16-12.8 25.6 0 12.8 3.2 22.4 16 28.8l41.6 41.6c-73.6 9.6-140.8 38.4-192 89.6l-115.2 118.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 16 9.6 25.6 9.6s19.2-3.2 25.6-9.6l112-118.4c41.6-38.4 92.8-64 147.2-70.4l-44.8 44.8c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 32 35.2 9.6 0 19.2-3.2 28.8-9.6L950.4 256c12.8-12.8 12.8-35.2 0-48l-108.8-99.2m-438.4 448c-9.6 0-19.2 3.2-25.6 9.6l-118.4 121.6c-48 44.8-96 67.2-160 67.2H96c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32h3.2c83.2 0 147.2-32 211.2-86.4l121.6-124.8c6.4-6.4 9.6-12.8 9.6-22.4 0-9.6-3.2-16-9.6-22.4-9.6-6.4-19.2-9.6-28.8-9.6z" p-id="1705"></path></svg>
              <svg style="height: 3vh; width: 3vh" v-if="data.player.loop == true" t="1657018656868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1849" width="1024" height="1024"><path d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z" p-id="1850"></path><path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="1851"></path></svg>
              <svg style="height: 3vh; width: 3vh" v-if="data.player.loop == false && data.player.random == false" t="1657018716268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1995" width="1024" height="1024"><path d="M694.4 854.4H195.2l48 44.8c9.6 6.4 16 16 16 28.8-3.2 19.2-19.2 32-38.4 32-9.6 0-22.4-6.4-28.8-12.8l-108.8-96c-12.8-12.8-16-35.2 0-48L192 704c6.4-6.4 19.2-9.6 28.8-9.6 19.2 0 35.2 16 35.2 35.2 0 9.6-6.4 19.2-12.8 25.6l-41.6 38.4h496c112 0 198.4-89.6 198.4-198.4v-86.4c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 140.8-118.4 259.2-265.6 259.2zM329.6 169.6h496l-48-44.8c-9.6-6.4-16-16-16-28.8 3.2-19.2 19.2-32 38.4-32 9.6 0 22.4 6.4 28.8 12.8l108.8 96c12.8 12.8 16 35.2 0 48L832 320c-6.4 6.4-19.2 9.6-28.8 9.6-19.2 0-35.2-16-35.2-35.2 0-9.6 6.4-19.2 12.8-25.6l41.6-38.4H326.4C217.6 233.6 128 323.2 128 435.2v89.6c0 19.2-12.8 32-32 32s-32-12.8-32-32v-86.4C64 288 182.4 169.6 329.6 169.6z" p-id="1996"></path></svg>
            </a>
              <!--下一曲-->
              <a @click="nextMusic()">
                <svg xmlns="http://www.w3.org/2000/svg" style="height: 3.2vh; width: 3.2vh" fill="currentColor"
                  class="bi bi-skip-end" viewBox="0 0 16 16">
                  <path
                    d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
                </svg>
              </a>


            </div>
          </div>

        <div class="right-side playerIndexSide">

          <div id="lyric">
              <ul id="lyrics" v-if="(data.player.now.oLRC.tran == true)">
                <li @click="$refs.audio.currentTime = item.t" v-for="(item) in data.player.now.oLRC.ms"
                  v-bind:key="item.t">
                  <h1>{{item.c}}</h1>
                  <h2>{{item.tranC}}</h2>
                  <div>{{formTime(parseInt(item.t))}}</div>
                </li>
              </ul>
              <ul id="lyrics" v-if="(data.player.now.oLRC.tran == false)">
                <li @click="$refs.audio.currentTime = item.t" v-for="item in data.player.now.oLRC.ms"
                  v-bind:key="item.t">
                  <h1>{{item.c}}</h1>
                  <div>{{formTime(parseInt(item.t))}}</div>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="messageLab">

    </div>
    <div id="fixedButtom">
      <div v-for="item in data.ui.fixedButtom" v-bind:key="item.type+item.id">
        
        <a @click="loveMusic()">
          <svg style="color:red;user-select:none" v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) != -1)" xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="currentColor" class="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
          <svg  v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) == -1)"
          style="user-select:none" xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-heart"
            viewBox="0 0 16 16">
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
          <a v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) != -1)">取消喜欢</a>
          <a v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) == -1)">喜欢该曲</a>
          
        </a>
        <a @click="data.player.tracks.push(item.data);refuseTrack()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"/>
          </svg>
          加入播放列表
        </a>
      </div>
      </div>
</template>
<script>
  import reTools from './network/getData'
  import './style.css'
  import './fixelButtom.css'

  

  var bodyHeight = document.documentElement.clientHeight
  var bodyWidth = document.documentElement.clientWidth
  window.addEventListener('resize', getWindowInfo)

  function getWindowInfo() {
    bodyHeight = document.documentElement.clientHeight
    bodyWidth = document.documentElement.clientWidth
    document.querySelector('#fixedButtom').innerHTML = ''
  }

  export default {
    data() {
      return {
        id: 0,
        data: {
          user: {},


          player: {
            loop: false,
            random: false,
            playing: false,
            uiDisplay: {
              SideDisplaySet: '',
              displayPlayBox: 'flex',
              mainDisplay: 'buttom',
              duration: 0,
              realCurrTime: 0,
              currTime: 0,
              maxProgressWidth: '0px',
              progress: 0,
              LineNum: 0
            },
            now: {
              musicUrl: '',
              oLRC: {
                offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
                ms: [], //歌词数组{t:时间,c:歌词}
                tran: false
              },

            },
            trackNum: 0,
            tracks: [{
              "name": "",
              "id": 0,
              "pst": 0,
              "t": 0,
              "ar": [{
                "id": 0,
                "name": "",
                "tns": [],
                "alias": []
              }],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "",
              "fee": 8,
              "v": 4,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 0,
                "name": "",
                "picUrl": "/icon.svg",
                "tns": [],
                "pic_str": "0",
                "pic": 0
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
          ui:{
            leftSideWidth: 'icon',
            fixedButtom: [

            ]
          }
          ,
          recommendSongs: [],
          myMusicList: {

          },
          musicListInfor: {
            myLove: {
              data: {},
              aRtrackIds: [],
              display: {
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
      bodyWidth = document.documentElement.clientWidth

    },
    watch: {
      id: {
        async handler(newid, oldId) {
          if (oldId == undefined) {
            return 0
          }
          //同步音乐文件
          reTools.getData('/song/url', {
            id: newid
          }).then(r => {
            if (this.id == r.data[0].id) {
              this.data.player.now.musicUrl = r.data[0].url;
            }

          })
          //同步音乐歌词
          reTools.getData('/lyric', {
            id: newid
          }).then(r => {
            if (r.lrc.lyric && r.tlyric) {
              this.setcreateLrcObj(r.lrc.lyric, r.tlyric.lyric).then(r => {
                this.data.player.now.oLRC = r
              })
            } else {
              this.setcreateLrcObj(r.lrc.lyric).then(r => {
                this.data.player.now.oLRC = r
              })
            }

          })
        }
      }
    },
    methods: {
      
      musicListMore(item){
        
        this.data.ui.fixedButtom.push({
          type:'music',
          id: item.id,
          data: item
          
        })
      },
      loginInfor() {
        reTools.getData('/login/status', {
          timetamp: (Number(new Date()))
        }).then(r => {
          this.data.user = r.data
          if (this.data.user.account) {
            this.myPlayList()
            reTools.getData('/recommend/songs').then(r => {
              this.data.recommendSongs = r.data.dailySongs
            })
          }
        })
      },
      myPlayList() {
        reTools.getData('/user/playlist', {
          uid: this.data.user.account.id
        }).then(r => {
          this.data.myMusicList = r.playlist

          reTools.getData('/playlist/detail', {
            id: this.data.myMusicList[0].id
          }).then(r => {
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
            let randomID = this.data.musicListInfor.myLove.data.playlist.tracks[Math.round(Math.random() * this
              .data.musicListInfor.myLove.data.playlist.tracks.length)].id
            reTools.getData('/lyric', {
              id: randomID
            }).then(r => {
              let ms = this.Lrcsplit(r.lrc.lyric)
              let content = '';
              let counts = 0
              getSomeLyric: for (const num in ms) {
                if (ms[num].t > 30) {
                  content += ms[num].c + '<br>';
                }
                counts++
                if (counts == 12) break getSomeLyric
              }
              this.data.musicListInfor.myLove.display.lyric = content;
            })
          })
        })
      },
      async setcreateLrcObj(lrc, tran) {

        let oLRC = {
          offset: -200, //时间补偿值，单位毫秒，用于调整歌词整体位置
          ms: [], //歌词数组{t:时间,c:歌词}
          tran: false
        }
        let norLRC = this.Lrcsplit(lrc);
        let tranLRC
        if (tran) {
          tranLRC = this.Lrcsplit(tran)
          for (let num in norLRC) {

            let obj = tranLRC.find(o => o.t == norLRC[num].t)






            
            //如果能找到对应的翻译歌词
            if (obj) {
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
      Lrcsplit(lrc) {
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
            if (content == '') {
              continue
            }
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
      },
      formTime(sec) { //秒数转化为mm:ss
        let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
        let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
        return min + ':' + s
      },
      async lyricSet() {
        setTimeout(() => {
          this.lyricSet()
        }, 60);
        if (this.data.player.playing == true && this.data.player.uiDisplay.mainDisplay != 'buttom') {


          let lyrics = document.getElementById('lyrics')

          let lis = lyrics.getElementsByTagName("li")
          let currTime = document.querySelector('#audio').currentTime

          if (lis.length == 0) return
          let lyricNum;
          for(let i = 0; (this.data.player.now.oLRC.ms.length > i && this.data.player.now.oLRC.ms[i].t <= (currTime + 0.6)); i++){
            lyricNum = i
          }
          if (this.data.player.uiDisplay.LineNum != lyricNum) {


            this.data.player.uiDisplay.LineNum = lyricNum

            for (let num = 0; num < lis.length; num++) {

                lis[num].className = ''
            }
            //歌词高亮设置
            if (lis[lyricNum - 1]) lis[lyricNum - 1].className = 'lineHeight-1'

            if (lis[lyricNum]) lis[lyricNum].className = 'lineHeight'

            if (lis[lyricNum + 1]) lis[lyricNum + 1].className = 'lineHeight--1'
            if (lis[lyricNum + 2]) lis[lyricNum + 2].className = 'lineHeight--2'


            let lineNoTop = 0;
            for (let i = 0; i <= lyricNum; i++) {
              lineNoTop += lis[i].offsetHeight - 0.3;
            }

            if (document.querySelector('#lyrics')) {
              document.querySelector('#lyrics').style.transform = 'translateY(' + ((bodyHeight / 2.25) - lineNoTop) + 'px)'
            }

            //LazyLoad 歌词条懒加载


          }

        }
      },
      async getCurr() { //音频进度转换

        let currTime
        let cur
        if (document.querySelector('#audio')) {
          cur = document.querySelector('#audio').currentTime
          currTime = parseInt(cur)
        } else {
          return 0
        }
        this.data.player.uiDisplay.realCurrTime = cur
        this.data.player.uiDisplay.currTime = currTime
        this.data.player.uiDisplay.progress = cur / this.data.player.uiDisplay.duration
        //开始设置歌词
        //枚举获得歌词高度

        //for (let num = 0; num < lyrics.length; num++) {

        //}
      },
      showLong() { //音频加载成功后改变进度
        this.data.player.uiDisplay.duration = parseInt(this.$refs.audio.duration)
      },
      changeLong() {
        let ct = this.progress * this.duration / 100
        if (!isNaN(ct)) {
          this.$refs.audio.currentTime = ct
        }

      },
      plays() { //播放暂停控制

        if (this.data.player.playing == true) {
          document.querySelector('#audio').pause()
        } else if (this.data.player.playing == false) {


          document.querySelector('#audio').addEventListener('canplay', function () {
            document.querySelector('#audio').play();
          })
          document.querySelector('#audio').addEventListener('loadeddata', function () {
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
      nextMusic() {
        if (this.data.player.tracks.length != this.data.player.trackNum + 1) {
          if (this.data.player.random == false) {
            this.data.player.trackNum++
            this.id = this.data.player.tracks[this.data.player.trackNum].id
          }
          if (this.data.player.random == true) {
            this.data.player.trackNum = Math.floor(Math.random() * this.data.player.tracks.length)
            this.id = this.data.player.tracks[this.data.player.trackNum].id
          }
          setTimeout(() => {
            this.plays()
          }, 150);
        }
      },
      upMusic() {

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
      finishPlay() {
        if (document.querySelector('#audio').loop == false) {
          this.data.player.playing = false;
          document.querySelector('#audio').pause();
          this.nextMusic()
        }
      },
      mainDisplayChange() {
        //settimeout为动画之后的事件，方便优化
        if (this.data.player.uiDisplay.mainDisplay == 'buttom') {
          document.getElementById('player').style.top = 'calc(0px - var(--minplayerHeight))';
          this.data.player.uiDisplay.mainDisplay = 'watting'
          setTimeout(() => {
            this.data.player.uiDisplay.mainDisplay = 'top'
          }, .5 * 1000);
        } else {
          document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight))'
          this.data.player.uiDisplay.mainDisplay = 'watting'
          setTimeout(() => {
            this.data.player.uiDisplay.mainDisplay = 'buttom'
          }, .5 * 1000);
        }

      },
      /**
       * data: {
       *    tracks: []
       *    num: 0
       * }
       */
      changeTrack(data) { //接受router的数据
        if (this.data.player.tracks == data.tracks && this.data.player.trackNum == data.num) {
          return '重复请求'
        } else {
          document.querySelector('#audio').pause();
          this.data.player.playing = false;
          this.id = data.tracks[data.num].id
          this.data.player.tracks = data.tracks
          this.data.player.trackNum = data.num
          this.plays()
          document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight))'

        }

      },
      refuseTrack(){
        if (this.data.player.tracks[0].name == '') {
        } else {
          if (this.id == 0 && this.data.player.trackNum == 0 ) {
            this.id = this.data.player.tracks[0].id
          this.data.player.trackNum = 0
          this.plays()
          document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight))'


          }
        }
      },
      nextMusicEventControl(type){
        switch (type) {
          case 'loop':
            this.data.player.loop = true
              this.data.player.random = false

            break;
          case 'list':
              this.data.player.random = false
              this.data.player.loop = false
            break;
          case 'random':
            this.data.player.random = true
              this.data.player.loop = false
            break;
        
          default:
            if (this.data.player.loop == false && this.data.player.random == false) {
              this.data.player.loop = true
            } else if (this.data.player.loop == true) {
              this.data.player.random = true
              this.data.player.loop = false
            } else if (this.data.player.random == true) {
              this.data.player.random = false
              this.data.player.loop = false
            }
            break;
        }
      }
      ,
      async loveMusic(id) {
        let RealID
        if (id != undefined) {
          RealID = id
        } else {
          RealID = this.data.player.tracks[this.data.player.trackNum].id
        }
        if (this.data.musicListInfor.myLove.aRtrackIds.indexOf(RealID) != -1) {
          reTools.getData('/like', {
            id: RealID,
            like: false,
            timetamp: (Number(new Date()))
          }).then(() => {
            for (const num in this.data.musicListInfor.myLove.aRtrackIds) {
              if (this.data.musicListInfor.myLove.aRtrackIds[num] == RealID) {
                this.data.musicListInfor.myLove.aRtrackIds.splice(num, 1)
                break
              }
            }
            this.refuseMyLove()
          })
        } else {
          reTools.getData('/like', {
            id: RealID,
            like: true,
            timetamp: (Number(new Date()))

          }).then(() => {
            this.data.musicListInfor.myLove.aRtrackIds.push(RealID)
            this.refuseMyLove()
          })
        }
      },


      refuseMyLove() {
        reTools.getData('/playlist/detail', {
          id: this.data.myMusicList[0].id,
          timetamp: (Number(new Date()))
        }).then(r => {
          this.data.musicListInfor.myLove.data = r
          let aRtrackIds = []
          for (let number in r.privileges) {
            aRtrackIds.push(r.privileges[number].id)
          }
          this.data.musicListInfor.myLove.aRtrackIds = aRtrackIds;
        })
      },
      search() {
        let value = document.getElementById('searchInput').value
        if (this.$route.name != 'search') {
          this.$router.push({
            name: 'search',
            query: {
              q: value
            }
          })
        } else {
          this.$router.push({
            name: 'search',
            query: {
              q: value
            }
          })
        }

      },
      leftBarSet(){
        if (this.data.ui.leftSideWidth == 'icon') {
          this.data.ui.leftSideWidth = 'iconWithText'
        } else {
          this.data.ui.leftSideWidth = 'icon'
        }
      }
    }
  }
function lyricLazyLoad() {
  let selector = 'ul#lyrics>li'
  let elms = document.querySelectorAll(selector)
  for(let i = 0,len = elms.length; i < len; i++){
      elms[i].style.display = 'block'
      if(!_isShow(elms[i])){
        elms[i].style.display = 'none'
      }
  }
  setTimeout(() => {
    lyricLazyLoad()
  }, 1000);
}
lyricLazyLoad()

function _isShow(el){//判断img是否出现在可视窗口
    let coords = el.getBoundingClientRect();
    return (coords.left >= 0 && coords.left >= 0 && coords.top) <= (document.documentElement.clientHeight || window.innerHeight) + parseInt(bodyHeight * 0.6);
};

</script>