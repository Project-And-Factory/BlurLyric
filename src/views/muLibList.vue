<template>
  <div v-if="data.user.account && data.user.profile">
    <div class="topBlock">
      <div class="topBlockPicture">
        <img height="100%" v-bind:src="data.user.profile.avatarUrl" alt="" srcset="">
      </div>
      <div class="topBlockText">
        <h2>{{data.user.profile.nickname}}</h2>
        <h1>的音乐库</h1>

      </div>
      <div class="topBlockRightButtom">
        <div class="linkbox bigger">
          <a style="user-select:none" @click="loginOut()"><svg xmlns="http://www.w3.org/2000/svg"
              style="position: absolute;height: calc(1em + 3px);width:height: calc(1em + 3px)" fill="currentColor"
              class="bi bi-box-arrow-right" viewBox="0 0 16 16">
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
      <div @click="this.$router.push({name:'detail',query:{id:data.myMusicList[0].id }})"
        style="height: 7em;background-color:#5080ff;overflow:hidden; ">
        <div class="playButtom"></div>
        <p style="user-select:none ;position: relative;box-shadow: rgb(80 128 255) 0px 9px 14px 7px;z-index: 5;">我喜欢的
        </p>
        <div style="position: relative;font-size: 14px;top: 13em;box-shadow: rgb(80 128 255) -4px -20px 20px 15px;">
        </div>
        <p style="user-select:none;font-size:14px;color:#ffffff90;z-index: 3"
          v-html="data.musicListInfor.myLove.display.lyric"></p>
      </div>

      <!--
            
            我喜欢的Block End
            
            
            -->
      <div @click="this.$router.push({name:'dailySongs'})"
        style=" color: #666;height: 7em;background-color:#eeeeee ;overflow:hidden; ">

        <p style="user-select:none ;position: relative;z-index: 5;">个性推荐
        </p>
        <p style="user-select:none ;position: absolute;right: -1vw;bottom: -1vw;color:#00000005;font-size: 12vw;;z-index: 1;">Daily
        </p>
      </div>
    </div>

  </div>

</template>
<script>
  import reTools from '../network/getData'
  export default {
    name: 'muLib',
    props: ['data'],
    data() {
      return {
        futherData: {

        },
        myData: {}
      }
    },

    watch: {
      data: function (val) {
        this.futherData = val
      }
    },
    methods: {
      loginOut() {
        reTools.getData('/logout', {})
        location.reload()

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

.topBlockText>*{
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
</style>