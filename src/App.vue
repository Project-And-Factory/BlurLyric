<template>
  <audio v-bind:loop="data.player.loop" v-bind:src="data.player.now.musicUrl" @pause='data.player.playing=false'
    @play='data.player.playing=true' @ended="finishPlay" ref="audio" id="audio" @timeupdate="getCurr"
    @canplay="showLong"></audio>
  <div v-bind:class="'leftlab ' + data.ui.leftSideWidth + ' ' + data.player.uiDisplay.mainDisplay">
    <div v-if="data.player.tracks[data.player.trackNum + 1] && data.player.tracks[data.player.trackNum - 1]" style="display: none;">
      <img v-bind:src="data.player.tracks[data.player.trackNum + 1].al.picUrl" alt="" srcset="">
      <img v-bind:src="data.player.tracks[data.player.trackNum - 1].al.picUrl" alt="" srcset="">
    
    </div>

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
  <div v-bind:class="'rightrow ' + data.player.uiDisplay.mainDisplay">
    <div class="ROWTOPtitle">
      <div class="tl-title">BlurLyric</div>
      <input placeholder="搜索框" v-on:keydown.enter="search" type="none" id="searchInput">
    </div>
    <div class="viewBox">
      <div class="opes" v-bind:class="this.$route.name" v-if="(!data.user.account)">
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
      <div @click="mainDisplayChange()">
        <img
          style="display:inline-block;user-select: none;border-radius: 13px;height: var(--minplayerHeight);width:var(--minplayerHeight);"
          v-lazy="data.player.tracks[data.player.trackNum].al.picUrl +'?param=48y48'" alt="" srcset="">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" fill="currentColor" class="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </a>
        <a @click="loveMusic()"
          v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) == -1)"
          style="user-select:none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" fill="currentColor" class="bi bi-heart"
            viewBox="0 0 16 16">
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </a>
        <!--上一曲-->
        <a class="minWidthUnneed" @click="upMusic()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-start"
            viewBox="0 0 16 16">
            <path
              d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
            =</svg>
        </a>

        <!--播放按键-->
        <a @click="plays()">
          <!--未播放样式-->
          <svg v-if="( data.player.playing == false )" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path
              d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
          <!--正播放样式-->
          <svg v-if="( data.player.playing != false )" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
            <path
              d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
          </svg>
        </a>
        <!--下一曲-->
        <a @click="nextMusic()">
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
    <div v-if="(data.player.uiDisplay.mainDisplay != 'buttom')">
      <div class="playerUIControl-Buttom">
        <svg @click="mainDisplayChange()" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
          class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
        </svg>
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

    </div>
    <!--display-->
    <div v-bind:class="data.player.uiDisplay.SideDisplaySet">
      <div class="playerDisplayOutBox" v-bind:style="'display:' + data.player.uiDisplay.displayPlayBox">
        <div class="left-side playerIndexSide">
          <div>
            <!--图像-->
            <div class="left-sideImage">
              <img v-bind:src="data.player.tracks[data.player.trackNum].al.picUrl" alt="">
              <div v-bind:style="'background-image: url(' + data.player.tracks[data.player.trackNum].al.picUrl + ')'"
                class="sideImageCard">
                <div class="acrylicEffect sideImageCardDorpBlur">



                </div>
              </div>
            </div>
            <!--标题条-->
            <div class="player-left-centerrow">
              <div class="player-Title">
                <h1>{{data.player.tracks[data.player.trackNum].name}} <a
                    v-for="(alia,i) in data.player.tracks[data.player.trackNum].alia" :key="i"
                    style="color: rgba(44,62,80,0.5);font-size: 0.8em;"> {{alia}}</a></h1>
                <h2><a v-for="item in data.player.tracks[data.player.trackNum].ar" :key="item.id">{{item.name}}
                  </a><a>&nbsp;-&nbsp;
                    {{data.player.tracks[data.player.trackNum].al.name}}
                  </a></h2>
              </div>
              <!--div>
                            loop
                            <svg t="1651279392939" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3177" width="200" height="200"><path d="M606.896 387.536H408c-92.784 0-168 75.216-168 168 0 92.8 75.216 168 168 168h224c87.2 0 158.88-66.416 167.2-151.424l0.16-1.808a16 16 0 0 1 15.936-14.768h17.344a14.832 14.832 0 0 1 14.784 15.904c-8.144 111.872-101.472 200.096-215.424 200.096h-224c-119.296 0-216-96.704-216-216s96.704-216 216-216h194.144l-29.456-29.456a16 16 0 0 1-4.688-11.312v-28.304a14.464 14.464 0 0 1 24.688-10.24l97.824 97.824a11.136 11.136 0 0 1 0 15.744l-97.824 97.808a14.464 14.464 0 0 1-24.688-10.24v-28.288a16 16 0 0 1 4.688-11.312l34.208-34.224z" p-id="3178"></path></svg>
                            
                            random
                            <svg t="1651279427177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3316" width="200" height="200"><path d="M740.144 325.536l-31.456-31.456a16 16 0 0 1-4.688-11.312v-28.304a14.464 14.464 0 0 1 24.688-10.24l97.824 97.824a11.136 11.136 0 0 1 0 15.744l-97.824 97.808a14.464 14.464 0 0 1-24.688-10.24v-28.288a16 16 0 0 1 4.688-11.312l32.224-32.224h-42.464c-91.2 0-162.864 78.304-162.56 184 2.4 133.68-89.68 232-210.4 232H224a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h101.504c93.328 0 164.32-75.808 162.384-183.504v-0.432c-0.368-131.328 91.84-232.064 210.56-232.064h41.696z m-41.696 416H768a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-69.552c-47.376 0-90.56-16.064-125.28-43.696a13.296 13.296 0 0 1 2.096-22.192l19.68-10.304a16 16 0 0 1 16.592 1.072c3.232 2.256 5.92 4.032 8.048 5.312a151.84 151.84 0 0 0 78.88 21.808z m-288.16-343.744a132.4 132.4 0 0 0-7.936-4.832c-22.672-12.56-48.752-19.424-76.848-19.424H224a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h101.504c41.44 0 79.52 11.584 111.568 32.24 0.96 0.608 2 1.312 3.136 2.08a16 16 0 0 1 1.856 24.864l-12.112 11.36a16 16 0 0 1-19.68 1.712z" p-id="3317"></path></svg>
                            
                            musiclist
                            <svg t="1651279461997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3455" width="200" height="200"><path d="M717.12 394.88v12.592h-0.32v218.656h-48v-48h0.32V397.616a11.248 11.248 0 0 1-0.08-1.28v-36.864h48v34.752l0.08 0.64zM648.528 748.8h-68.256a85.328 85.328 0 1 1 0-170.672h88.848V397.616a11.248 11.248 0 0 1-0.08-1.28V336a48 48 0 0 1 48-48h71.232a48 48 0 0 1 48 48v23.472a48 48 0 0 1-48 48H716.8v273.056a68.272 68.272 0 0 1-68.272 68.272z m-67.2-122.704a37.344 37.344 0 0 0 0 74.688h71.504a16 16 0 0 0 16-16V626.08h-87.488zM716.912 336v23.568h71.36V336h-71.36z m-529.76-48H580.88c6.16 0 11.136 4.976 11.136 11.136v25.728A11.136 11.136 0 0 1 580.88 336H187.136A11.136 11.136 0 0 1 176 324.864v-25.728c0-6.16 4.976-11.136 11.136-11.136zM580.88 464c-15.84 0-29.328 9.984-34.56 24 5.232 14.016 18.72 24 34.56 24H187.136c15.84 0 29.328-9.984 34.56-24a36.88 36.88 0 0 0-34.56-24h393.728z m-393.728 0H580.88c6.16 0 11.136 4.976 11.136 11.136v25.728A11.136 11.136 0 0 1 580.88 512H187.136A11.136 11.136 0 0 1 176 500.864v-25.728c0-6.16 4.976-11.136 11.136-11.136z m0 192H404.88c6.16 0 11.136 4.976 11.136 11.136v25.728A11.136 11.136 0 0 1 404.88 704H187.136A11.136 11.136 0 0 1 176 692.864v-25.728c0-6.16 4.976-11.136 11.136-11.136z" p-id="3456"></path></svg>

                            more
                            <svg t="1651279495720" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3594" width="200" height="200"><path d="M321.488 546.992a33.488 33.488 0 1 1 0-66.992 33.488 33.488 0 0 1 0 66.992z m194.784 0a33.488 33.488 0 1 1 0-66.992 33.488 33.488 0 0 1 0 66.992z m194.784 0a33.488 33.488 0 1 1 0-66.992 33.488 33.488 0 0 1 0 66.992z" p-id="3595"></path></svg>
                            
                            download
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>
                            
                            </div-->
              <div class="linkbox">
                <!--喜欢按钮-->
                <a @click="loveMusic()" style="user-select:none">
                  <svg style="color:red; height: 2.8vh; height: 2.8vh;"
                    v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) != -1)"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                  <svg
                    v-if="(data.musicListInfor.myLove.aRtrackIds.indexOf(data.player.tracks[data.player.trackNum].id) == -1)"
                    xmlns="http://www.w3.org/2000/svg" style="height: 2.8vh; height: 2.8vh;" fill="currentColor"
                    class="bi bi-heart" viewBox="0 0 16 16">
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>

                </a>
                <!--下载按钮-->
              </div>
            </div>

            <!--进度条-->
            <div class="musicContorlCurrTime">
              <div>{{formTime(data.player.uiDisplay.currTime)}}</div>
              <div class="mCside">
                <div v-bind:style="'--progress:' + data.player.uiDisplay.progress" class="continueBar"></div>
              </div>
              <div>{{formTime(data.player.uiDisplay.duration)}}</div>
            </div>
            <!--播放按键-->
            <div class="linkbox">
              <!--上一曲-->
              <a @click="upMusic()">
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
        </div>
        <div class="right-side playerIndexSide">

          <div id="lyric">
            <div id="lyricGunDong">
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
    </div>
  </div>
</template>
<script>
  import reTools from './network/getData'
  import './style.css'

  var bodyHeight = document.documentElement.clientHeight
  var bodyWidth = document.documentElement.clientWidth
  window.addEventListener('resize', getWindowInfo)

  function getWindowInfo() {
    bodyHeight = document.documentElement.clientHeight
    bodyWidth = document.documentElement.clientWidth

  }

  export default {
    data() {
      return {
        id: 0,
        data: {
          user: {},


          player: {
            loop: false,
            playing: false,
            uiDisplay: {
              SideDisplaySet: '',
              displayPlayBox: 'grid',
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
            leftSideWidth: 'icon'
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
      loginInfor() {
        reTools.getData('/login/status', {
          timetamp: (Number(new Date()))
        }).then(r => {
          this.data.user = r.data
          if (this.data.user.account) {
            this.myPlayList()
            reTools.getData('/recommend/songs').then(r => {
              this.data.recommendSongs = r.data.dailySongs
              console.log(this.data.recommendSongs);
            })
          }
        })
      },
      myPlayList() {
        reTools.getData('/user/playlist', {
          uid: this.data.user.profile.userId
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
        }, 50);
        if (this.data.player.playing == true && this.data.player.uiDisplay.mainDisplay != 'buttom') {

          let lyrics = document.getElementById('lyrics')

          let lis = lyrics.getElementsByTagName("li")
          let currTime = document.querySelector('#audio').currentTime

          if (lis.length == 0) {
            return
          }
          let lyricNum = -1;
          for (let num in this.data.player.now.oLRC.ms) {
            if (this.data.player.now.oLRC.ms[num].t <= currTime + 0.6) {
              lyricNum++
            }
          }
          if (this.data.player.uiDisplay.LineNum != lyricNum) {
            this.data.player.uiDisplay.LineNum = lyricNum

            //歌词高亮设置
            if (lis[lyricNum - 1]) lis[lyricNum - 1].className = 'lineHeight-1'

            if (lis[lyricNum]) lis[lyricNum].className = 'lineHeight'

            if (lis[lyricNum + 1]) lis[lyricNum + 1].className = 'lineHeight--1'
            if (lis[lyricNum + 2]) lis[lyricNum + 2].className = 'lineHeight--2'

            for (let num = 0; num < lis.length; num++) {
              if (num != lyricNum && num != (lyricNum - 1) && num != (lyricNum + 1) && num != (lyricNum + 2) && lis[
                  num]) {
                lis[num].className = ''
              }
            }
            let lineNoTop = 0;
            for (let i = 0; i <= lyricNum; i++) {
              lineNoTop += lis[i].offsetHeight;
            }
            let lineNoTopPX
            if (bodyHeight >= bodyWidth) {
              lineNoTopPX = ((bodyHeight / 2.25) - lineNoTop)
            } else {
              lineNoTopPX = ((bodyHeight / 2) - lineNoTop)
            }
            if (document.querySelector('#lyricGunDong')) {
              document.querySelector('#lyricGunDong').style.transform = 'translateY(' + lineNoTopPX + 'px)'
            }
            this.data.player.uiDisplay.lyricTopPx = lineNoTopPX + 'px'
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
          document.querySelector('#audio').pause();
          this.data.player.playing = false;
          this.data.player.trackNum++
          this.id = this.data.player.tracks[this.data.player.trackNum].id
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
</script>