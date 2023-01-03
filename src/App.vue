<template>
  <!--audio v-bind:src="data.player.now.musicUrl[data.player.musicCache[id].song].url"
    @pause='state.playing=false' @play='state.playing=true' @ended="finishPlay" ref="audio" id="audio"
    @timeupdate="getCurr" @canplay="showLong"></audio-->

  <!--图片预缓存
    
    作用：使背景图片提前加载实现渐变
    -->
  <div style="visibility: hidden;height: 0px;width: 0px;overflow: hidden;">
    <img v-if="data.player.tracks[data.player.trackNum + 1]"
      v-bind:src="data.player.tracks[data.player.trackNum + 1].al.picUrl + '?param=128y128'" alt="" srcset="">
    <img v-if="data.player.tracks[data.player.trackNum + 2]"
      v-bind:src="data.player.tracks[data.player.trackNum + 2].al.picUrl + '?param=128y128'" alt="" srcset="">

    <img v-if="data.player.tracks[data.player.trackNum - 1]"
      v-bind:src="data.player.tracks[data.player.trackNum - 1].al.picUrl + '?param=128y128'" alt="" srcset="">
  </div>

  <!--左侧导航栏-->
  <div v-if="data.player.uiDisplay.mainDisplay != 'top'" v-bind:class="'leftlab ' + data.ui.leftSideWidth">
    <div class="linkbox" style="flex-direction: row;flex-wrap: wrap;display: flex;">
      <!--返回按钮-->
      <a @click="this.$router.go(-1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg><a>返回</a> </a>
      <hr style="color:#00000050;width:100%;margin: 2px 0;">
      <a alt="显示侧边栏" @click="
          this.data.ui.leftSideWidth = (this.data.ui.leftSideWidth == 'iconWithText')?'icon':'iconWithText'
      "><svg v-if="data.ui.leftSideWidth =='icon'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="currentColor" class="bi bi-pin-angle" viewBox="0 0 16 16">
          <path
            d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z" />
        </svg><svg v-if="data.ui.leftSideWidth == 'iconWithText'" xmlns="http://www.w3.org/2000/svg" width="16"
          height="16" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
          <path
            d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z" />
        </svg><a>显示侧边栏</a></a>


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
      <router-link :to="{path:'/found'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-broadcast"
          viewBox="0 0 16 16">
          <path
            d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
        </svg><a>发现广场</a>
      </router-link>
      <router-link :to="{path:'/setting'}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
          <path
            d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
        </svg><a>设置&关于</a></router-link>

        <hr style="color:#00000050;width:100%;margin: 2px 0">

        <router-link :to="{path:'/playingList'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
  <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
  <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
  <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
  <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
</svg><a>播放列表</a>
      </router-link>
      <!-- <a @click="electron.app.quit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
          <path
            d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
        </svg><a>退出</a></a> -->
    </div>
  </div>
  <!--右侧导航栏-->
  <div class="rightrow">
    <!--顶部logo及导航（viewBox）-->
    <div class="ROWTOPtitle">
      <div class="tl-title">BlurLyric</div>
      <div class="linkbox">
        <!--返回按钮-->
        <a @click="this.$router.go(-1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg></a>
        <a alt="显示侧边栏" @click="
          this.data.ui.leftSideWidth = (this.data.ui.leftSideWidth == 'iconWithText')?'icon':'iconWithText'
      ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection"
            viewBox="0 0 16 16">
            <path
              d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
          </svg>
        </a>
      </div>
      <input placeholder="搜索框" v-on:keydown.enter="search" id="searchInput">
      <div v-if="(data.player.uiDisplay.mainDisplay != 'top')" class="dragBar"></div>

    </div>
    <div class="viewBox">
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

          <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl +'?param=1024y1024'" alt="" srcset="">
          <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl +'?param=1024y1024'" alt="" srcset="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
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
        <a v-if="state.random != true && data.musicListInfor.personalFM.use == false" @click="upMusic()"
          class="minWidthUnneed player-Mini-Contorl-normal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-skip-start" viewBox="0 0 16 16">
            <path
              d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
            =</svg>
        </a>
        <!--私人-不喜欢-->
        <a @click="notLovePerFm()" v-if="data.musicListInfor.personalFM.use == true"
          class="minWidthUnneed player-Mini-Contorl-normal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
            viewBox="0 0 16 16">
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </a>

        <!--播放按键-->
        <a class="player-Mini-Contorl-normal elm-play" @click="plays()">
          <!--未播放样式-->
          <svg v-if="( state.playing == false && audio.readyState >= 2)" xmlns="http://www.w3.org/2000/svg"
            class="bi bi-play-fill" viewBox="0 0 16 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
          <!--正播放样式-->
          <svg v-if="( state.playing != false && audio.readyState >= 2)" xmlns="http://www.w3.org/2000/svg"
            class="bi bi-pause-fill" viewBox="0 0 16 16">
            <path
              d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
          </svg>
          <svg  v-if="( audio.readyState < 2 )" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
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
      <!--
	v-bind:style="'background-image:url('+ data.player.tracks[data.player.trackNum].al.picUrl +')'"
	'--color1:' + 	data.player.uiDisplay.color[0]+ ';' + 
	-->
    </div>
    <div v-if="(data.player.uiDisplay.mainDisplay != 'buttom') && config.setting.config.useBlurBackground"
      v-bind:style="'background-image:url(' + data.player.tracks[data.player.trackNum].al.picUrl + '?param=128y128'+') '"
      v-bind:class="'player-background ' + data.player.uiDisplay.mainDisplay"></div>
    <!--
        主UI界面
      -->
    <!--控制界面按钮-->
    <div class="playertopbar">
      <div v-if="(data.player.uiDisplay.mainDisplay != 'buttom')" class="electron-control">
        <div class="dragBar">
          <div class="dragbarLine"></div>
        </div>
      </div>
      <svg @click="mainDisplayChange()" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        class="na-bottonBiggerHover bi bi-chevron-down contorlPlayerButtom" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>


      <div class="player-Title displayTop">
        <h1>{{data.player.tracks[data.player.trackNum].name}} <a
            v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
            style="color: rgba(44,62,80,0.5);font-size: 0.8em;"> {{alia}}</a><a
            style="font-size: 0.7em;background-color: #00000010;padding: 0 0.3em;border-radius: .3em;"
            v-if="(data.player.musicCache[id]&&data.player.musicCache[id].song.br >= 900000)">FLAC</a></h1>
        <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar" :key="item.id" class="artistText" @click="this.$router.push({
            name: 'artist',
            query: {
              id: item.id
            }
          })">{{item.name}}
          </a><a>&nbsp;-&nbsp;
            {{data.player.tracks[data.player.trackNum].al.name}}
          </a></h2>
      </div>
      <div class="contorlPage lowWidthDisplay">
        <a @click="data.player.uiDisplay.playerSelec = 'song';getWindowInfo()"
          :style="(data.player.uiDisplay.playerSelec == 'song')?'color: black;':''">歌曲</a>

        <a @click="data.player.uiDisplay.playerSelec = 'lyric';getWindowInfo()"
          :style="(data.player.uiDisplay.playerSelec == 'lyric')?'color: black;':''">歌词</a>


      </div>

    </div>
    <!--display-->
    <div v-bind:class="data.player.uiDisplay.playerSelec + ' playerDisplayOutBox'"
      v-bind:style="'display:' + data.player.uiDisplay.displayPlayBox">
      <div class="left-side playerIndexSide">

        <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl + '?param=128y128'"
          class="ImageBlurBackground">

        <!--图像-->
        <!--加载图像-->
        <div class="left-sideImage">
          <!--前台图像-->
          <div
            v-bind:style="'background-image: url(' + data.player.tracks[data.player.trackNum].al.picUrl + '?param=1000y1000),url(' + data.player.tracks[data.player.trackNum].al.picUrl + '?param=128y128)'">

          </div>
          <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl + '?param=1000y1000'" importance="high">
        </div>


        <div class="player-Title lowWidthDisplay">
          <h1>{{data.player.tracks[data.player.trackNum].name}} <a
              v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
              style="color: rgba(44,62,80,0.5);font-size: 0.8em;"> {{alia}}</a><a
              style="font-size: 0.7em;background-color: #00000010;padding: 0 0.3em;border-radius: .3em;"
              v-if="data.player.musicCache[id]&&(data.player.musicCache[id].song.br >= 900000)">FLAC</a></h1>
          <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar" :key="item.id" class="artistText" @click="this.$router.push({
            name: 'artist',
            query: {
              id: item.id
            }
          })">{{item.name}}
            </a><a>&nbsp;-&nbsp;
              {{data.player.tracks[data.player.trackNum].al.name}}
            </a></h2>
          <div style="display: block;"
            v-if="this.data.player.musicCache[this.id]&&this.data.player.musicCache[this.id].lyric.ms[this.data.player.uiDisplay.LineNum]&&data.player.uiDisplay.playerSelec == 'song'">
            {{this.data.player.musicCache[this.id].lyric.ms[this.data.player.uiDisplay.LineNum].c}}
            <div v-if="(this.data.player.musicCache[id].lyric.tran == true)">
              {{this.data.player.musicCache[this.id].lyric.ms[this.data.player.uiDisplay.LineNum].tranC}}</div>
          </div>
        </div>
        <!--进度条-->
        <div class="musicContorlCurrTime">

          <div id="audioProgress" v-bind:style="'--musicProgressPercent:' + data.player.uiDisplay.progress"
            class="box-progressbar">
            <div id="progress"></div>
            <div id="pointer"></div>
          </div>
          <div style="display:flex;justify-content: space-between ">
            <div>{{formTime(data.player.uiDisplay.currTime)}}</div>
            <div>{{formTime(data.player.uiDisplay.duration)}}</div>
          </div>
        </div>
        <!--播放按键-->
        <!--
        电脑版
      -->
        <div class="linkbox heightWidthDisplay">
          <!--上一曲-->
          <a v-if="state.random != true && data.musicListInfor.personalFM.use == false" @click="upMusic()">
            <svg xmlns="http://www.w3.org/2000/svg" style="height: 3.2vh; width: 3.2vh" fill="currentColor"
              class="bi bi-skip-start" viewBox="0 0 16 16">
              <path
                d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
              =</svg>
          </a>
          <!--私人-不喜欢-->
          <a @click="notLovePerFm()" v-if="data.musicListInfor.personalFM.use == true"
            class="minWidthUnneed player-Mini-Contorl-normal">
            <svg xmlns="http://www.w3.org/2000/svg" style="height: 3.2vh; width: 3.2vh" fill="currentColor"
              class="bi bi-trash" viewBox="0 0 16 16">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </a>

          <!--播放按键-->
          <a @click="plays()">
            <!--未播放样式-->
            <svg v-if="( state.playing == false && audio.readyState >= 2)" xmlns="http://www.w3.org/2000/svg"
              style="height: 4.5vh; width: 4.5vh" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <!--正播放样式-->
            <svg v-if="( state.playing != false && audio.readyState >= 2)" xmlns="http://www.w3.org/2000/svg"
              style="height: 4.5vh; width: 4.5vh" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
              <path
                d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
            <svg style="height: 4.5vh; width: 4.5vh" v-if="( audio.readyState < 2 )" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </a>
          <!--下一曲/随机-->
          <a @click="nextMusic()">
            <svg style="height: 3vh; width: 3vh" v-if="state.random == true" t="1657019671848" class="icon"
              viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2140" width="1024"
              height="1024">
              <path
                d="M336 73.6l406.4 412.8c12.8 12.8 12.8 38.4 0 51.2L336 950.4c-12.8 12.8-35.2 12.8-51.2 0l-3.2-3.2c-12.8-12.8-12.8-38.4 0-51.2l377.6-384L281.6 131.2c-12.8-12.8-12.8-38.4 0-51.2l3.2-3.2c16-16 38.4-16 51.2-3.2z"
                p-id="2141"></path>
            </svg>
            <svg v-if="state.random != true" xmlns="http://www.w3.org/2000/svg" style="height: 3.2vh; width: 3.2vh"
              fill="currentColor" class="bi bi-skip-end" viewBox="0 0 16 16">
              <path
                d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
            </svg>
          </a>


        </div>
        <div class="linkbox playerLeftLink heightWidthDisplay">
          <a @click="loveMusic()">
            <svg style="color:red;user-select:none;height: 2.8vh; width: 2.8vh"
              v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(id) != -1)" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
            <svg v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(id) == -1)"
              style="user-select:none;height: 2.8vh; width: 2.8vh" xmlns="http://www.w3.org/2000/svg" width="20"
              height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>


          </a>
          <a @click="nextMusicEventControl()">
            <svg style="height: 3vh; width: 3vh" v-if="state.random == true" t="1657018045660" class="icon"
              viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1704" width="1024"
              height="1024">
              <path
                d="M844.8 665.6c-6.4-6.4-16-12.8-25.6-9.6-19.2 0-35.2 16-35.2 35.2 0 9.6 6.4 19.2 12.8 25.6l41.6 41.6c-44.8-6.4-86.4-22.4-121.6-51.2-3.2 0-3.2-3.2-6.4-6.4L332.8 304C268.8 233.6 192 195.2 99.2 195.2c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32c73.6 0 134.4 32 182.4 86.4l384 400 6.4 6.4c48 38.4 108.8 64 172.8 70.4l-48 44.8c-9.6 6.4-16 19.2-16 28.8 0 19.2 19.2 35.2 38.4 32 9.6 0 19.2-6.4 25.6-12.8l99.2-92.8c16-16 16-41.6 0-57.6l-99.2-102.4z m-3.2-556.8c-12.8-16-32-19.2-48-6.4-9.6 6.4-12.8 16-12.8 25.6 0 12.8 3.2 22.4 16 28.8l41.6 41.6c-73.6 9.6-140.8 38.4-192 89.6l-115.2 118.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 16 9.6 25.6 9.6s19.2-3.2 25.6-9.6l112-118.4c41.6-38.4 92.8-64 147.2-70.4l-44.8 44.8c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 32 35.2 9.6 0 19.2-3.2 28.8-9.6L950.4 256c12.8-12.8 12.8-35.2 0-48l-108.8-99.2m-438.4 448c-9.6 0-19.2 3.2-25.6 9.6l-118.4 121.6c-48 44.8-96 67.2-160 67.2H96c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32h3.2c83.2 0 147.2-32 211.2-86.4l121.6-124.8c6.4-6.4 9.6-12.8 9.6-22.4 0-9.6-3.2-16-9.6-22.4-9.6-6.4-19.2-9.6-28.8-9.6z"
                p-id="1705"></path>
            </svg>
            <svg style="height: 3vh; width: 3vh" v-if="audio.loop == true" t="1657018656868" class="icon"
              viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1849" width="1024"
              height="1024">
              <path
                d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z"
                p-id="1850"></path>
              <path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="1851"></path>
            </svg>
            <svg style="height: 3vh; width: 3vh" v-if="audio.loop == false && state.random == false" t="1657018716268"
              class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1995"
              width="1024" height="1024">
              <path
                d="M694.4 854.4H195.2l48 44.8c9.6 6.4 16 16 16 28.8-3.2 19.2-19.2 32-38.4 32-9.6 0-22.4-6.4-28.8-12.8l-108.8-96c-12.8-12.8-16-35.2 0-48L192 704c6.4-6.4 19.2-9.6 28.8-9.6 19.2 0 35.2 16 35.2 35.2 0 9.6-6.4 19.2-12.8 25.6l-41.6 38.4h496c112 0 198.4-89.6 198.4-198.4v-86.4c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 140.8-118.4 259.2-265.6 259.2zM329.6 169.6h496l-48-44.8c-9.6-6.4-16-16-16-28.8 3.2-19.2 19.2-32 38.4-32 9.6 0 22.4 6.4 28.8 12.8l108.8 96c12.8 12.8 16 35.2 0 48L832 320c-6.4 6.4-19.2 9.6-28.8 9.6-19.2 0-35.2-16-35.2-35.2 0-9.6 6.4-19.2 12.8-25.6l41.6-38.4H326.4C217.6 233.6 128 323.2 128 435.2v89.6c0 19.2-12.8 32-32 32s-32-12.8-32-32v-86.4C64 288 182.4 169.6 329.6 169.6z"
                p-id="1996"></path>
            </svg>
          </a>
          <!--下一曲-->
          <a @click="tapElm.musicPanel.display">
            <svg style="height: 3vh; width: 3vh" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
            </svg>
          </a>


        </div>
        <!--
        手机版按键
      -->
        <div class="lowWidthDisplay playerButton">
          <div style="height: 54px;" class="buttonline">
            <a @click="loveMusic()">
              <svg style="height: 2.3vh;aspect-ratio: 1/1;color:red;user-select:none"
                v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(id) != -1)" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>
              <svg v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(id) == -1)"
                style="height: 2.3vh;aspect-ratio: 1/1;user-select:none;" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>


            </a>
            <!--上一曲-->
            <a v-if="state.random != true && data.musicListInfor.personalFM.use == false" @click="upMusic()">
              <svg xmlns="http://www.w3.org/2000/svg" style="height: 3.8vh;aspect-ratio: 1/1" fill="currentColor"
                class="bi bi-skip-start" viewBox="0 0 16 16">
                <path
                  d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
                =</svg>
            </a>
            <!--私人-不喜欢-->
            <a @click="notLovePerFm()" v-if="data.musicListInfor.personalFM.use == true"
              class="minWidthUnneed player-Mini-Contorl-normal">
              <svg xmlns="http://www.w3.org/2000/svg" style="height: 3.8vh;aspect-ratio: 1/1" fill="currentColor"
                class="bi bi-trash" viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </a>

            <!--播放键-->
            <a style="color: black;height: inherit;;aspect-ratio: 1/1" @click="plays()">
              <svg v-if="( state.playing == false && audio.readyState >= 2)" style="height: inherit;aspect-ratio: 1/1;"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-circle-fill"
                viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
              <svg v-if="( state.playing == true && audio.readyState >= 2)" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
              </svg>
            <svg v-if="( audio.readyState < 2 )" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            </a>
            <!--下一曲/随机-->
            <a @click="nextMusic()">
              <svg style="height: 3.8vh;aspect-ratio: 1/1" v-if="state.random == true" t="1657019671848" class="icon"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M336 73.6l406.4 412.8c12.8 12.8 12.8 38.4 0 51.2L336 950.4c-12.8 12.8-35.2 12.8-51.2 0l-3.2-3.2c-12.8-12.8-12.8-38.4 0-51.2l377.6-384L281.6 131.2c-12.8-12.8-12.8-38.4 0-51.2l3.2-3.2c16-16 38.4-16 51.2-3.2z"
                  p-id="2141"></path>
              </svg>
              <svg v-if="state.random != true" xmlns="http://www.w3.org/2000/svg"
                style="height: 3.8vh;aspect-ratio: 1/1" fill="currentColor" class="bi bi-skip-end" viewBox="0 0 16 16">
                <path
                  d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4zM5 4.633 10.804 8 5 11.367V4.633z" />
              </svg>
            </a>

            <!--调整音乐播放方法-->
            <a style="color: black;height: fit-content;aspect-ratio: 1/1" @click="nextMusicEventControl()">
              <svg style="height: 2.5vh; width: 2.5vh" v-if="state.random == true" t="1657018045660" class="icon"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1704" width="1024"
                height="1024">
                <path
                  d="M844.8 665.6c-6.4-6.4-16-12.8-25.6-9.6-19.2 0-35.2 16-35.2 35.2 0 9.6 6.4 19.2 12.8 25.6l41.6 41.6c-44.8-6.4-86.4-22.4-121.6-51.2-3.2 0-3.2-3.2-6.4-6.4L332.8 304C268.8 233.6 192 195.2 99.2 195.2c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32c73.6 0 134.4 32 182.4 86.4l384 400 6.4 6.4c48 38.4 108.8 64 172.8 70.4l-48 44.8c-9.6 6.4-16 19.2-16 28.8 0 19.2 19.2 35.2 38.4 32 9.6 0 19.2-6.4 25.6-12.8l99.2-92.8c16-16 16-41.6 0-57.6l-99.2-102.4z m-3.2-556.8c-12.8-16-32-19.2-48-6.4-9.6 6.4-12.8 16-12.8 25.6 0 12.8 3.2 22.4 16 28.8l41.6 41.6c-73.6 9.6-140.8 38.4-192 89.6l-115.2 118.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 16 9.6 25.6 9.6s19.2-3.2 25.6-9.6l112-118.4c41.6-38.4 92.8-64 147.2-70.4l-44.8 44.8c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 32 35.2 9.6 0 19.2-3.2 28.8-9.6L950.4 256c12.8-12.8 12.8-35.2 0-48l-108.8-99.2m-438.4 448c-9.6 0-19.2 3.2-25.6 9.6l-118.4 121.6c-48 44.8-96 67.2-160 67.2H96c-19.2 0-35.2 16-35.2 35.2s16 32 35.2 32h3.2c83.2 0 147.2-32 211.2-86.4l121.6-124.8c6.4-6.4 9.6-12.8 9.6-22.4 0-9.6-3.2-16-9.6-22.4-9.6-6.4-19.2-9.6-28.8-9.6z"
                  p-id="1705"></path>
              </svg>
              <svg style="height: 2.5vh; width: 2.5vh" v-if="audio.loop == true" t="1657018656868" class="icon"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1849" width="1024"
                height="1024">
                <path
                  d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z"
                  p-id="1850"></path>
                <path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="1851"></path>
              </svg>
              <svg style="height: 2.5vh; width: 2.5vh" v-if="audio.loop == false && state.random == false"
                t="1657018716268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1995" width="1024" height="1024">
                <path
                  d="M694.4 854.4H195.2l48 44.8c9.6 6.4 16 16 16 28.8-3.2 19.2-19.2 32-38.4 32-9.6 0-22.4-6.4-28.8-12.8l-108.8-96c-12.8-12.8-16-35.2 0-48L192 704c6.4-6.4 19.2-9.6 28.8-9.6 19.2 0 35.2 16 35.2 35.2 0 9.6-6.4 19.2-12.8 25.6l-41.6 38.4h496c112 0 198.4-89.6 198.4-198.4v-86.4c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 140.8-118.4 259.2-265.6 259.2zM329.6 169.6h496l-48-44.8c-9.6-6.4-16-16-16-28.8 3.2-19.2 19.2-32 38.4-32 9.6 0 22.4 6.4 28.8 12.8l108.8 96c12.8 12.8 16 35.2 0 48L832 320c-6.4 6.4-19.2 9.6-28.8 9.6-19.2 0-35.2-16-35.2-35.2 0-9.6 6.4-19.2 12.8-25.6l41.6-38.4H326.4C217.6 233.6 128 323.2 128 435.2v89.6c0 19.2-12.8 32-32 32s-32-12.8-32-32v-86.4C64 288 182.4 169.6 329.6 169.6z"
                  p-id="1996"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="right-side playerIndexSide">

        <div id="lyric">
          <ul id="lyrics" :style="'--dur:'+config.setting.config.lyricSet.dur +  'ms'" ref="lyricBox"
            v-if="data.player.musicCache[id]">
            <li @click="audio.currentTime = item.t" v-for="(item) in this.data.player.musicCache[id].lyric.ms"
              v-bind:key="item.t">
              <h1>{{item.c}}</h1>
              <h2 v-if="(state.useTran == true&&this.data.player.musicCache[id].lyric.tran == true)">{{item.tranC}}</h2>
              <!-- <div>{{formTime(parseInt(item.t))}}</div> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div id="messageLab">
  </div>

  <!--漂浮按钮区-->
  <div id="fixedButtom">
    <!--主音乐控制面板-->
    <div id="musicPanel" style="display:none">
      <!--操控点-->
      <div class="tap">
          <div class="tapInner"></div>

      </div>
      <!--按钮-->
      <div class="others">

        <!--音量条-->
        <div v-bind:style="'--progressPercent:' + (state.volume / 1)" id="volum"
          v-on:mousedown="tapElm.musicPanel.volume.mousedown"
        class="progressElm">
          <div class="Color"></div>
          <div class="Icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-volume-down-fill" viewBox="0 0 16 16">
                <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"/>
              </svg>
            </div>
        </div>
        <div class="gridbuttom">
          <div @click="audioNetease.downloadID(this.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-download" viewBox="0 0 16 16">
                <path
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path
                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </div>
          <div v-bind:style="'background:'+((state.useTran == true)?'var(--color-theme-alpha);color:#00000040':'#00000010')" @click="state.useTran = !state.useTran;lyricSet(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import reTools from './network/getData'
  import config from './js/config.js'

  import audioNetease from './js/audioNetease.js'
  import audioListener from './js/audioListener.js'
  import progress from './js/progress.js'
  import anime from 'animejs/lib/anime.es.js';
  import message from './js/message.js'
  import playerElmContorl from './js/playerElm.js'
  import main from './main.js'
  import tapElm from './js/tapElm.js'

  import './style.css'
  import './fixelButtom.css'
  import './naturalUI.css'
  import './message.css'


  var bodyHeight, bodyWidth,
    transitionning = false,
    usingLowWidhtMedi, lastTime = 0
  window.addEventListener('resize', getWindowInfo)

  function getWindowInfo() {
    let CachebodyHeight = document.documentElement.clientHeight
    let CachebodyWidth = document.documentElement.clientWidth
    if (document.querySelector('div.left-sideImage > img')) document.querySelector("div.left-side").style =
      '--height:' + document.querySelector('div.left-sideImage > img').getBoundingClientRect().height + 'px'
    let tempTime = new Date();
    lastTime = tempTime
    setTimeout(() => {
      if (lastTime != tempTime) return
      let CbodyHeight = document.documentElement.clientHeight
      let CbodyWidth = document.documentElement.clientWidth
      if (CachebodyHeight == CbodyHeight && CachebodyWidth == CbodyWidth) {
        bodyHeight = document.documentElement.clientHeight
        bodyWidth = document.documentElement.clientWidth
      }
      usingLowWidhtMedi = (bodyHeight * 1.1 >= bodyWidth)
      //处理歌词界面使模糊背景的定位与图片一致
      let player = document.querySelector('#player'),
        playertopbar = document.querySelector('.playertopbar')

      if (player && playertopbar) {
        document.querySelector('.playerDisplayOutBox').setAttribute('style', '--playertopbarHeight:' + playertopbar
          .getBoundingClientRect().height + 'px');
      }
      main.lyricSet(true)

      if (document.querySelector('div.left-sideImage > img')) document.querySelector("div.left-side").style =
        '--height:' + document.querySelector('div.left-sideImage > img').getBoundingClientRect().height + 'px'
    }, 200)
    return {
      bodyHeight,
      bodyWidth
    }
  }
  var vueApp = {
    data() {
      return {
        config,
        audio: document.createElement('audio'),
        state: {
          playing: false,
          random: false,
          lyricTransitionTime: null,
          volume: 1,
          useTran: true
        },
        id: 0,
        cache: {
          loadFuncGetCurr: false
        },
        data: {
          user: {},
          player: {
            musicCache: {
              '0': {
                song: {},
                lyric: {
                  ms: []
                },
                hex: {}
              }
            },
            uiDisplay: {
              SideDisplaySet: '',
              displayPlayBox: 'flex',
              mainDisplay: 'buttom',
              duration: 0,
              realCurrTime: 0,
              currTime: 0,
              maxProgressWidth: '0px',
              progress: 0,
              LineNum: 0,
              lineNoTop: 0,
              lineLazyLoaddelay: 0,
              color: [],
              beautifuller: false,
              playerSelec: 'song'
            },
            trackNum: 0,
            tracks: [{
              "name": "",
              "id": 0,
              "ar": [{
                "id": 0,
                "name": "",
                "tns": [],
                "alias": []
              }],
              "alia": [],
              "al": {
                "id": 0,
                "name": "",
                "picUrl": "/src/assets/icon.png",
                "tns": [],
                "pic_str": "0",
                "pic": 0
              },
              "cp": 1416336,
              "mv": 10977779,
            }]
          },
          ui: {
            leftSideWidth: 'icon',
            fixedButtom: [],
            lyricAnime: null,
            lyricRunning: false,
          },
          recommendSongs: [],
          myMusicList: [],
          musicListInfor: {
            myLove: {
              data: {},
              aRtrackIds: [],
              display: {
                lyric: '',

              }
            },
            personalFM: {
              use: false,
              trackNum: 0,
              tracks: [],
            }
          },
        },
        tapElm,
        audioNetease
      }
    },

    created() {
      audioNetease.requirePersonalFM().then(r => {
        this.data.musicListInfor.personalFM.tracks = r
      })

      this.loginInfor();
      this.lyricSet()
      bodyHeight = document.documentElement.clientHeight
      bodyWidth = document.documentElement.clientWidth

      audioListener.listen(this.audio)

      this.audio.addEventListener('loadeddata', () => {
        if (this.audio.readyState >= 2) {
          this.data.player.uiDisplay.duration = Math.floor(this.audio.duration)
        }
      })
      document.querySelector('#LoadingText').innerHTML = "加载用户数据中"
    },
    watch: {
      id: {
        async handler(newid, oldId) {
          getWindowInfo()
          this.audio.src = ''
          if (oldId == undefined) return false
          var Data = {
            song: {},
            lyric: {},
          }
          // 让全局中正在播放的音乐赋予高亮显示
          if (!this.cache.playingStyle) {
            this.cache['playingStyle'] = document.createElement('style')
            this.cache.playingStyle.type = "text/css"
            document.body.appendChild(this.cache['playingStyle'])
          }
          this.cache.playingStyle.innerHTML = null
          this.cache.playingStyle.appendChild(document.createTextNode(".tracks[muid=\"" + newid +
            "\"]{border-radius: calc(var(--minplayerHeight) * 0.2);background-color: #0080ff15;}"))

          //如果无法找到缓存最终的信息
          if (this.data.player.musicCache[newid] == undefined) {
            Data = await audioNetease.requireId(newid);
            this.data.player.musicCache[newid] = Data
          } else //找到了缓存好的信息
          {
            Data = this.data.player.musicCache[newid]
          }
          if (this.id == newid && this.audio.src != Data.song.src) {
            this.audio.pause()
            this.audio.src = Data.song.src
            this.play()
          }

          
        reTools.getData('/scrobble', {
          id: newid,
          sourceid: this.data.player.tracks.find((item)=>{return item.id == newid}).al.id,
          timetamp:  (Number(new Date()))
        })
          let artist = ''
          if ((this.data.musicListInfor.personalFM.use == true) && (this.data.player.tracks.length - this.data.player
            .trackNum < 3)) {
          this.getPersonalFM()
        }
          for (let num = 0; num < this.data.player.tracks[this.data.player.trackNum].ar.length; num++) {
            artist += this.data.player.tracks[this.data.player.trackNum].ar[num].name
            if (num != this.data.player.tracks[this.data.player.trackNum].ar.length - 1) {
              artist += '&'
            }
          }
          document.title = this.data.player.tracks[this.data.player.trackNum].name + ' - ' + artist

          let witchIs = [-1, 0, 1, 2]
          for (let index = 0; index < witchIs.length; index++) {
            let thisMusic = this.data.player.tracks[(this.data.player.trackNum + witchIs[index])]
            if (thisMusic != undefined && this.data.player.musicCache[thisMusic.id] == undefined) {
              this.data.player.musicCache[thisMusic.id] = await audioNetease.requireId(thisMusic.id)
            }
          }
        }
      },
    },
    methods: {
      getWindowInfo,
      cacheData(link, data) {
        if (link == undefined) {
          return undefined
        }
        if (data != undefined) {
          this.cache[link] = data
        }
        return this.cache[link]
      },
      usePersonalFM() {
        this.getCurr()
        progress.load(this.audio)

        let personalFMData = this.data.musicListInfor.personalFM

        this.data.musicListInfor.personalFM.use = true
        this.refusePersonalFM()
        this.id = personalFMData.tracks[personalFMData.trackNum].id
        this.plays()
        document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight) - 18px)'
      },
      getPersonalFM() {
        this.data.musicListInfor.personalFM.use = true
        audioNetease.requirePersonalFM().then(r => {
          for (let i = 0; i < r.length; i++) {
            this.data.musicListInfor.personalFM.tracks.push(r[i])
          }
          this.data.player.tracks = this.data.musicListInfor.personalFM.tracks
        })


      },
      notLovePerFm(propId) {
        let id = propId || this.id
        reTools.getData('/fm_trash', {
          id: id
        }).then(() => {

          let index = this.data.musicListInfor.personalFM.tracks.findIndex(i => i.id == id)
          message.create('已将 ' + this.data.musicListInfor.personalFM.tracks[index].name + ' 移入私人电台垃圾桶')

          this.data.musicListInfor.personalFM.tracks.splice(index, 1)
          this.data.player.tracks = this.data.musicListInfor.personalFM.tracks
          this.id = this.data.musicListInfor.personalFM.tracks[index].id

        })
      },
      refusePersonalFM() {
        let personalFMData = this.data.musicListInfor.personalFM
        this.data.player.trackNum = personalFMData.trackNum;
        this.data.player.tracks = personalFMData.tracks
      },

      musicListMore(item) {

        this.data.ui.fixedButtom.push({
          type: 'music',
          id: item.id,
          data: item

        })
      },
      async loginInfor() {
        await reTools.getData('/login/status', {
          timetamp: (Number(new Date()))
        }).then(r => {
          console.log(r)

          if (r.data && r.data.account && r.data.account.tokenVersion >= 3) {
            this.data.user = r.data

            this.myPlayList()
            //自动签到
            reTools.getData('/daily_signin', {
              type: 0
            });
            reTools.getData('/daily_signin', {
              type: 1
            })

            reTools.getData('/recommend/songs').then(r => {
              this.data.recommendSongs = r.data.dailySongs
            })
          }
          playerElmContorl.load()
      tapElm.create(document.querySelector('#musicPanel>.tap'),document.querySelector('#musicPanel'),()=>{})

          document.querySelector('#LoadingText').innerHTML = ""
          let 渐变消失LOGO界面 = anime({
            targets: document.querySelector('#Loading'),
            opacity: 0,
            duration: 1000,
            easing: 'cubicBezier(.3, .5, .2, 1)',

          })
          渐变消失LOGO界面.finished.then(function () {
            document.querySelector('#Loading').style.zIndex = -1;
          });

        })
        config.methods.lunch()
      },

      myPlayList() {
        reTools.getData('/user/playlist', {
          uid: this.data.user.account.id,
          timetamp: (Number(new Date()))

        }).then(r => {
          this.data.myMusicList = r.playlist
        })
      },
      formTime(sec) { //秒数转化为mm:ss
        let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
        let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
        return min + ':' + s
      },
      async lyricSet(force, type) {

        if (this.$refs.lyricBox && this.state.playing ==
          true && this.data.player.uiDisplay.mainDisplay != 'buttom' && this.data.player.musicCache[this.id]) {
          let lyrics = this.$refs.lyricBox,
            lis = lyrics.getElementsByTagName('li'),
            currTime = this.data.player.uiDisplay.realCurrTime,
            //找到歌词的行数
            lyricNum = this.data.player.musicCache[this.id].lyric.ms.findIndex(obj => obj.t >= (currTime + 0.6)) - 1

          //对于
          if (lis.length > 0 && lyricNum == -2) lyricNum = this.data.player.musicCache[this.id].lyric.ms.length - 1
          /**
           * 条件：（当歌词行数变化 或 被强制执行）同时要满足 歌词存在时再执行
           */
          if (((this.data.player.uiDisplay.LineNum != lyricNum) || (force == true)) && lis[lyricNum]) {

            //记录此时的歌词行数，防止重复计算
            this.data.player.uiDisplay.LineNum = lyricNum
            if (this.data.player.uiDisplay.playerSelec == 'lyric' || usingLowWidhtMedi == false) { //歌词高亮设置
              /**
               * 是否显示来节省资源
               * 
               * + 通过减少元素渲染节省资源
               * 
               * 返回 是否重要去渲染 的布尔值
               */
              var isDisplay = (el, i) => {
                let offset = i - lyricNum
                if (offset < -2) {
                  el.style.visibility = 'hidden';
                  el.style.display = 'block'
                  return false
                } else if (offset > 7) {
                  el.style.display = 'none';
                  return false
                } else {
                  el.style.display = 'block'
                  el.style.visibility = 'visible';
                  return true
                }

              }


              var fontSizeFunc = (el, i, needFocus) => {
                if (config.setting.config.lyricSet.animeFontSize == false) {
                  if (i == lyricNum) {
                    el.setAttribute('lyricFocus', true)

                  } else if (i > lyricNum && el.getAttribute('lyricFocus') != false) {
                    el.setAttribute('lyricFocus', false)
                  }

                  return '1' //(i==lyricNum)?'1.05em':'1em'
                };
                let offset = Math.abs(i - lyricNum)
                if (!needFocus) {
                  return '1'
                }
                return 0.94 - ( 0.09 * offset)
              }

              // 要平移的Y值
              var translateY = -lis[lyricNum].offsetTop + (bodyHeight * 0.15),
                translateYContent = "translateY(" + translateY + "px)"

              let dur
              if (force == true && type != 'tran') {
                dur = '0';
              } else {
                dur = config.setting.config.lyricSet.dur + 'ms'
              }
              //对元素赋值
              for (let i = 0; i < lis.length; i++) {
                let element = lis[i]
                let needFocus = isDisplay(element, i),
                  color

                if (needFocus == true) {
                  element.style.transition = "all " + dur + " cubic-Bezier(.3, .5, .2, 1) " + config
                    .settingTemperture.lyricSet.funcDelay[config.setting.config.lyricSet
                      .funcDelay](i - lyricNum) + "ms"

                    element.style.filter = config.settingTemperture.lyricSet.funcBlur[config.setting.config
                      .lyricSet
                      .funcBlur](i, lyricNum)

                  color = (i == lyricNum) ? 'rgb(0,0,0,0.7)' : ('rgb(0,0,0,' + (0.4 * (0.6 ** Math.abs(i -
                    lyricNum))) + ')')

                  setTimeout(() => {
                    lyricTransitionClean(element)
                  }, new Number(config.setting.config.lyricSet.dur) + 200);
                } else {
                  color = 'rgb(0,0,0,0)'
                  element.style.filter = ''
                  element.style.transition = 'none'
                }

                element.style.transform = translateYContent + ((i == lyricNum) ? " scale(1)" : ((config.setting
                  .config
                  .lyricSet
                  .animeFontSize == true) ? (
                   'scale(' +fontSizeFunc(element, i, needFocus)+')') : 'scale(0.85)'))
                element.style.color = color



                this.state.lyricTransitionTime = Date.now()


              }

              let lyricTransitionClean = (elm) => {
                if ((Date.now() - this.state.lyricTransitionTime) > 800)
                  elm.style.transition = ''
              }

            }

          }

        }
      },
      async getCurr() {
        //音频进度转换
        let cur = this.audio.currentTime,
          parseCurrTime = parseInt(cur)
        this.data.player.uiDisplay.realCurrTime = cur
        this.data.player.uiDisplay.currTime = parseCurrTime
        let progress = parseCurrTime / this.data.player.uiDisplay.duration

        if (transitionning != true) this.data.player.uiDisplay.progress = progress

        //音频过度事件触发
        if (this.data.player.uiDisplay.duration - cur <= 10.5 && this.data.player.uiDisplay.duration != 0 && this.audio.loop != true)
          this.transitionNextMusic()

        this.lyricSet()
        setTimeout(() => this.getCurr(), 100)
      },
      async transitionNextMusic(times) {
        transitionning = true
        let oldAudio = this.audio,
          newAudio = document.createElement("audio")
        // oldAudio.removeEventListener('loadeddata',loadeddataFunction)
        audioListener.listen(newAudio)
        let numb, id, NextMusicCache

        if (this.state.random == true) {
          numb = Math.floor(Math.random() * this.data.player.tracks.length)
          this.data.player.musicCache[this.data.player.tracks[numb].id] = await audioNetease.requireId(this.data
            .player.tracks[numb].id)
        } else {
          if (this.data.player.tracks.length == this.data.player.trackNum + 1 || this.audio == true) {
            return
          }
          numb = this.data.player.trackNum + 1
        }
        id = this.data.player.tracks[numb].id

        if ((this.data.musicListInfor.personalFM.use == true) && (this.data.player.tracks.length - this.data
            .player
            .trackNum < 3)) {

          this.getPersonalFM()
        }
        //设置音频
        NextMusicCache = this.data.player.musicCache[id]
        newAudio.src = NextMusicCache.song[NextMusicCache.song.use].url;
        newAudio.volume = 0
        newAudio.currentTime = 0
        progress.load(newAudio)
        //播放新的音频
        newAudio.addEventListener('canplay', () => {
          newAudio.play();
        })
        let loadeddataFunction = () => {
          if (newAudio.readyState < 2) return

          this.data.player.uiDisplay.duration = Math.floor(this.audio.duration)
          newAudio.play();
          transitionning = true

          let progressAnime = anime({
            targets: this.data.player.uiDisplay,
            duration: time / 10,
            easing: 'cubicBezier(.3, .5, .2, 1)',
            progress: () => {
              return time / 10000 / this.data.player.uiDisplay.duration
            },

          })

          progressAnime.finished.then(() => {
            transitionning = false
          });
        }
        newAudio.addEventListener('loadeddata', loadeddataFunction)
        if (newAudio.readyState >= 2) loadeddataFunction

        this.id = id,
          this.data.player.uiDisplay.LineNum
        this.data.player.trackNum = numb
        this['audio'] = newAudio
        let time = times || 1000 * (oldAudio.duration - oldAudio.currentTime);

        anime({
          targets: newAudio,
          duration: time,
          volume: 1 * this.state.volume,
          easing: 'linear'
        })
        anime({
          targets: oldAudio,
          duration: time,
          volume: 0,
          easing: 'linear'
        })

        setTimeout(
          () => {

            if (this.data.musicListInfor.personalFM.use == true) this.data.musicListInfor.personalFM.trackNum =
              numb
            if ((this.data.musicListInfor.personalFM.use == true) && (this.data.player.tracks.length - this.data
                .player
                .trackNum < 3)) {
              this.getPersonalFM()
            }

            //上传听歌记录

            oldAudio.pause()
            oldAudio.remove()



            setTimeout(() => {
              this.state.playing = true
            }, 100);
            newAudio.removeEventListener('loadeddata', loadeddataFunction)
            oldAudio.removeEventListener('loadeddata', loadeddataFunction)


          }, time);
      },
      showLong() { //音频加载成功后改变进度
        this.data.player.uiDisplay.duration = parseInt(this.audio.duration)
      },
      plays() { //播放暂停控制

        if (this.state.playing == true) {
          this.audio.pause()
        } else this.play()
      },
      play() {

        this.audio.addEventListener('canplay', () => {
          this.audio.play()
        })
        this.audio.addEventListener('loadeddata', () => {

          if (this.audio.readyState >= 2) {
            this.data.player.uiDisplay.duration = Math.floor(this.audio.duration)
            this.audio.play()
          }
        })
        if (this.audio.readyState >= 2) {
          this.data.player.uiDisplay.duration = Math.floor(this.audio.duration)
          this.audio.play()
        }
      },
      nextMusic() {

        //上传听歌记录

        this.data.player.uiDisplay.LineNum = 0
        this.audio.currentTime = 0
        if (this.state.random == true) {
          this.data.player.trackNum = Math.floor(Math.random() * this.data.player.tracks.length)
          this.id = this.data.player.tracks[this.data.player.trackNum].id
          this.play()
        } else if (this.data.player.tracks.length != this.data.player.trackNum + 1) { //保证不是最后一首
          this.data.player.trackNum++
          this.id = this.data.player.tracks[this.data.player.trackNum].id
          this.play()

        }
        this.lyricSet(true)
        if (this.data.musicListInfor.personalFM.use == true) this.data.musicListInfor.personalFM.trackNum = this.data
          .player.trackNum
      },

      upMusic() {
        if (this.data.player.trackNum != 0) {
          this.data.player.trackNum--
          this.data.player.uiDisplay.LineNum = 0
          this.id = this.data.player.tracks[this.data.player.trackNum].id
          this.play()
        }
      },
      mainDisplayChange(type) {
        //settimeout为动画之后的事件，方便优化
        this.getWindowInfo()
        let playerMini = document.querySelector('.player-Mini')

        if (this.data.player.uiDisplay.mainDisplay == 'buttom' || type == 'top') {
          playerMini.style.transition = "all .5s cubic-bezier(.3, .45, .2, .95)"

          document.getElementById('player').style.top = '0px';
          this.data.player.uiDisplay.mainDisplay = 'watting'
          playerMini.style.opacity = 0
          setTimeout(() => {
            this.data.player.uiDisplay.mainDisplay = 'top';
            playerMini.style.transition = "none"

            playerMini.style.zIndex = -1;
          }, 500);
          return 'top'
        } else {
          document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight) - 18px)'
          this.data.player.uiDisplay.mainDisplay = 'watting'
          playerMini.style.transition = "all .5s cubic-bezier(.3, .45, .2, .95)"
          playerMini.style.opacity = 1
          playerMini.style.zIndex = 99;

          setTimeout(() => {

            this.data.player.uiDisplay.mainDisplay = 'buttom';
            playerMini.style.transition = "none"

            playerMini.style.zIndex = 99;
          }, 500);
          return 'buttom'

        }

      },
      changeTrack(data) { //接受router的数据
        progress.load(this.audio)
        this.getCurr()
        this.data.musicListInfor.personalFM.use = false

        if (this.data.player.tracks == data.tracks && this.data.player.trackNum == data.num) {
          return '重复请求'
        } else {

          this.id = data.tracks[data.num].id
          this.data.player.tracks = data.tracks
          this.data.player.trackNum = data.num
          this.plays()
          document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight) - 18px)'

        }

      },
      pushTrack(data) { //接受router的数据
        if (this.data.player.tracks[0].id == 0) {
          this.changeTrack({
            num: 0,
            tracks: [data]
          })
        } else {
          this.data.player.tracks.push(data)
        }
        message.create('成功增加歌曲' + data.name + '至播放列表末尾')
      },
      refuseTrack() {
        if (this.data.player.tracks[0].name == '') {} else {
          if (this.id == 0 && this.data.player.trackNum == 0) {
            this.id = this.data.player.tracks[0].id
            this.data.player.trackNum = 0
            this.plays()
            document.getElementById('player').style.top = 'calc(100% - var(--minplayerHeight) - 18px)'


          }
        }
      },
      nextMusicEventControl(type) {
        switch (type) {
          case 'loop':
            this.audio.loop = true
            this.state.random = false

            break;
          case 'list':
            this.state.random = false
            this.audio.loop = false
            break;
          case 'random':
            this.state.random = true
            this.audio.loop = false
            break;

          default:
            if (this.audio.loop == false && this.state.random == false) {
              this.audio.loop = true
            } else if (this.audio.loop == true) {
              this.state.random = true
              this.audio.loop = false
            } else if (this.state.random == true) {
              this.state.random = false
              this.audio.loop = false
            }
            break;
        }
      },
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
      search(text) {
        let value
        if (document.getElementById('searchInputTemp')) {
          value = document.getElementById('searchInputTemp').value || document.getElementById('searchInput').value
        }

        value = document.getElementById('searchInput').value
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
      leftBarSet() {
        if (this.data.ui.leftSideWidth == 'icon') {
          this.data.ui.leftSideWidth = 'iconWithText'
        } else {
          this.data.ui.leftSideWidth = 'icon'
        }
      },
      setTimeout
    }
  }
  export default vueApp
</script>