<template>

  <div style="margin-bottom:60px;flex-direction: column;display:flex;text-align: center;align-items: center;"
    v-if="!app.data.user.account || app.data.user.profile == undefined">
    <h2 class="tl-title" style="margin:0;padding: 8px;">Blurlyric | 未登录</h2>
    <p>登录体验更佳。当然，您也可以先体验一下</p>
    <input style="text-align: center;" placeholder="回车搜索" v-on:keydown.enter="this.$parent.$parent.$parent.search"
      id="searchInputTemp">

    <div class="linkbox bigger">

      <router-link :to="{path:'/loginUser'}">点击我去登录</router-link>
    </div>
  </div>

  <div v-if="app.data.user.account && app.data.user.profile" class="topBlock">
    <div class="topBlockPicture">
      <img height="100%" v-bind:src="app.data.user.profile.avatarUrl" alt="" srcset="">
    </div>
    <div class="topBlockText">
      <h2>{{app.data.user.profile.nickname}}</h2>
      <h1>的音乐库</h1>

    </div>
    <div class="topBlockRightButtom">
      <div class="linkbox bigger">
        <a style="user-select:none" @click="loginOut()"><svg xmlns="http://www.w3.org/2000/svg"
            style="position: absolute;height: calc(100% - 16px);top: 50%;transform: translate(0%,-50%);"
            fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
            <path fill-rule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
          </svg><a style="padding-left:22px">退出登录</a></a>
      </div>
    </div>

  </div>
  <div></div>
  <div class="muLib-MainBox">
    <!--我喜欢的Block-->
    <div v-if="app.data.user.account && app.data.user.profile"
      @click="this.$router.push({name:'detail',query:{id:app.data.myMusicList[0].id }})" style=";
;background-color:#5080ff;overflow:hidden; ">
      <p style="user-select:none ;position: relative;box-shadow: rgb(80 128 255) 0px 9px 14px 7px;z-index: 5;">我喜欢的
      </p>

    </div>

    <!--
            
            我喜欢的Block End
            
            
            -->
    <div @click="this.$router.push({name:'dailySongs'})" style=" color: #666;;
;background-color:#eeeeee ;overflow:hidden; ">

      <p style="user-select:none ;position: relative;z-index: 5;">个性推荐
      </p>
      <p
        style="user-select:none ;position: absolute;right: -1vw;bottom: -1vw;color:#00000005;font-size: 12vw;;z-index: 1;">
        Daily
      </p>
    </div>

    <!--

        私人FM
 
    -->
    <div v-bind:class="(app.data.user.profile == null) + ' personalFMCard'"
      v-if="app.data.musicListInfor&&app.data.musicListInfor.personalFM.tracks[app.data.musicListInfor.personalFM.trackNum]"
      style="background-color: #666">
      <div class="thisImg">
        <img
          v-bind:src="app.data.musicListInfor.personalFM.tracks[app.data.musicListInfor.personalFM.trackNum].al.picUrl  +'?param=512y512'"
          alt="" srcset="">
        <img
          v-bind:src="app.data.musicListInfor.personalFM.tracks[app.data.musicListInfor.personalFM.trackNum].al.picUrl  +'?param=512y512'"
          alt="" srcset="">
      </div>
      <div class="personalbackground"
        v-bind:style="'background-image:url(' + app.data.musicListInfor.personalFM.tracks[app.data.musicListInfor.personalFM.trackNum].album.picUrl  +'?param=512y512)'"
        alt="" srcset="">
      </div>
      <div class="Text">
        <p style="margin-top: 0;">
          <div style="color: #eee;font-size: 0.75em">为您推荐 <a
              style="font-size: 0.8em;height: inherit;justify-items: center;">- 私人FM</a></div>
          {{ app.data.musicListInfor.personalFM.tracks[app.data.musicListInfor.personalFM.trackNum].name}}
        </p>
        <div @click="this.$parent.$parent.$parent.usePersonalFM()" class="playButtom"></div>
      </div>

    </div>


  </div>


  <div v-if="app.data.myMusicList[0] != undefined">
    <h1>我收藏的歌单</h1>
    <div class="PLtrack">
      <div class="Pltracks" 
        v-for="(item,i) in app.data.myMusicList" :key="item.id">
        <div class="PlButtom">
          <a @click="removePl(item.id,i)">
          <svg xmlns=" http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
            viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </a>
        </div>
        <img @click="this.$router.push({name:'detail',query:{id:item.id }})" v-lazy="item.coverImgUrl + '?param=500y500)'" v-bind:alt="item.name">
        <div class="PlTrTitle">
          <h1>{{item.name}}</h1>
          <h2>by {{item.creator.nickname}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import cookies from 'js-cookie'
  import reTools from '../network/getData'
  import message from '../js/message.js'
  import app from '../main.js'

  export default {
    name: 'muLib',
    data() {
      return {
        app,
        myData: {}
      }
    },

    watch: {
      data: function (val) {
        this.data = val
      }
    },
    methods: {
      loginOut() {
        reTools.getData('/logout', {})
        document.cookie = ''
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);

        if (keys) {

          for (var i = keys.length; i--;)

            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()

        }
        location.reload()
      },
      removePl(id,i){
        if(i==0) {
          message.create('不可以删除 我喜欢的 歌单')
          return
        }
        reTools.getData('/playlist/subscribe',{id:id,t:2})
        message.create('已删除 '+app.data.myMusicList[i].name+' 歌单\n')

        app.data.myMusicList.splice(i,1)

      }
    },
  }
</script>
<style>
  /* 

    顶部头像方块

*/
  .topBlock {
    display: flex;
    height: 6em;
    padding: 10px 0;
    gap: 15px;
  }

  .topBlockPicture {
    height: 6em;
  }

  .topBlockPicture>img {
    height: 6em;
    border-radius: 50%;

  }

  .topBlockRightButtom {
    display: flex;
    text-align: right;
    margin-inline-start: auto;
  }

  .topBlockText>* {
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }

  .topBlockText h2 {
    margin: 5px 0;
    font-size: 1.6em;

  }

  .topBlockText h1 {
    margin: 13px 0;
    font-size: 2.3em;

  }

  @media (max-width:750px) {
    .topBlock {
      display: flex;
      height: 5em;
      padding: 5px 0;
      gap: 8px;
    }

    .topBlockPicture {
      height: 5em;
    }

    .topBlockPicture>img {
      height: 5em;
      border-radius: 50%;

    }

    .topBlockText h2 {
      margin: 5px 0;
      font-size: 1.3em;
    }

    .topBlockText h1 {
      margin: 13px 0;
      font-size: 1.8em;

    }
  }

  @media (max-width:500px) {
    .topBlock {
      display: flex;
      height: 4em;
      padding: 3px 0;
      gap: 5px;

    }

    .topBlockPicture>img {
      height: 4em;

    }

    .topBlockPicture {
      height: 4em;
    }



    .topBlockText h2 {
      margin: 5px 0;
      font-size: 1em;

    }

    .topBlockText h1 {
      margin: 7px 0;
      font-size: 1.4em;

    }

    .linkbox.bigger>a {
      font-weight: bold;
      font-size: 14px;
      color: #2c3e50;
      text-decoration: none;
      padding: 6px 8px;
    }
  }

  /* 

    END：顶部头像方块
    start：中部模块
*/
  .muLib-MainBox {
    padding: 10px 0;
    height: max-content;
    display: grid;
    gap: 3vw;
    grid-template-columns: repeat(2, 1fr);
  }

  .muLib-MainBox>div {
    position: relative;
    font-size: 28px;
    border-radius: 1.2em;
    color: white;
    padding: 20px 30px;
    height: calc(8vh + 5vw);
  }

  .muLib-MainBox>div>p {
    margin: 5px 0;
  }

  @media (max-width: 450px) {
    .muLib-MainBox {

      grid-template-columns: repeat(1, 1fr);
    }

    .muLib-MainBox>div {
      font-size: 24px;
    }
  }

  @media (max-width: 550px) {
    .muLib-MainBox>div>p {
      font-size: 20px;


    }
  }

  .muLib-MainBox>div.personalFMCard {
    z-index: 0;
    grid-column-start: 1;
    grid-column-end: 3;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    overflow: hidden;

  }

  .muLib-MainBox>div.personalFMCard.true {
    grid-column: auto;

  }

  .personalFMCard>.thisImg>img {
    height: 100%;
    border-radius: 17px;
  }

  .personalFMCard>.thisImg {
    height: inherit;
    position: relative;
  }

  .personalFMCard>.thisImg>img:nth-child(1) {
    position: absolute;
    z-index: -1;
    left: 1.0vmax;
    top: 2vmax;
    aspect-ratio: 1/1;
    height: calc(100% - 2vmax);
    filter: blur(1.4vmax);
  }

  div.personalFMCard>div.personalbackground {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    filter: saturate(0%);
    opacity: 0.05;
    background-position: 100% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;

  }

  .personalFMCard>.Text {
    font-size: calc(calc(8vh + 5vw) * 0.25);
  }
</style>