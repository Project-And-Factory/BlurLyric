<template>
  <h1>个性推荐</h1>
  <h2 style="display:flex;gap: 10px">今日日推 <a @click="setTracks(data.recommendSongs,0)" class="linkbox"><a>播放</a></a></h2>
  <div class="dailySongsSongsFall-row">
    <div class="dailySongsSongsFall-Sco">
      <div v-bind:class="'dailySongsSongsFall-gird ' + this.$parent.$parent.$parent.data.player.uiDisplay.mainDisplay">
                <div  v-bind:class="'tracks ' + (item.id == this.$parent.$parent.$parent.id )"  v-for="(item,i) in data.recommendSongs" :key="item.id">
                    <!--显示样式-->
                        <div @click="setTracks(data.recommendSongs,i)">
                            <img class="track-img" alt="" v-lazy="item.al.picUrl + '?param=84y84)'" srcset="">
                            <div class="trackTitle">
                                <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i" style="color: rgba(44,62,80,0.5)"> {{alia}} </a></h1>
                                <h2><a v-for="(name) in item.ar" :key="name.id"> {{name.name}}</a></h2>
                            </div>
                        </div>

                        <div class="linkbox bigger">
                            <a v-if="(this.$parent.$parent.$parent.data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) != -1)" style="color:red;user-select:none" @click="this.$parent.$parent.$parent.loveMusic(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                            </a>
                            <a v-if="(this.$parent.$parent.$parent.data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) == -1)" style="user-select:none" @click="this.$parent.$parent.$parent.loveMusic(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>  
                            </a>
                        </div>
                </div>
            </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'dailySongs',
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
        setTracks(track,num){
            this.$parent.$parent.$parent.changeTrack({tracks: track,num : num})
        },
    },
  }
</script>
<style>
  .dailySongsSongsFall-row{
    display:grid;
    height: 310px;
    background-color: #fff;
    border-radius: 13px;
    padding: 10px;
    
    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .dailySongsSongsFall-Sco{
    position: absolute;
      overflow-y: hidden;
      overflow-x: auto;
      width:calc(100% -20px);
      top: 10px;
      left: 10px;
      right: 10px;
      border-radius: 13px;
      bottom: 10px;

  }
  .dailySongsSongsFall-gird{
    grid-template-columns: repeat(auto-fill, [col-start] 300px [col-end]);
    display:grid;
    width: calc(7 * 400px);
    gap: 12px;
  }

    .dailySongsSongsFall-gird>.tracks{
        position: relative;
        background-color: #00000008;
        border-radius: 11px;
        height: 48px;
        display: flex;
        max-width: calc(var(--paddingIndex-MaxWidth) / 1);
        justify-content: space-between;
        --thispadding: 8px;
        padding: 8px;
        min-width: 276px;
        flex-direction: row;
        
    }
    div.dailySongsSongsFall-gird>.tracks.true{
        background-image: linear-gradient(to right,#00000008,#0000ff08);
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1){
        display: flex;
        width: 100%;
        gap: 8px;
        overflow: hidden;
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.trackTitle{
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.trackTitle>*{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.trackTitle>h1>a{
        font-size: 0.8em;
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.trackTitle>h2>a{
        margin: 0 1em 0 0;
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.track-img{
    user-select: none;

    height: 48px;
    width:48px;
    min-height:48px;
    min-width: 48px;
    border-radius: 9px;

    }
        .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.trackTitle>h1{
        font-size: 15px;
        margin: 5px 0 0 0;
       
    }
    .dailySongsSongsFall-gird>.tracks> div:nth-child(1)>.trackTitle>h2{
        font-size: 10px;
        margin: 2px 0 0 0;
    }
</style>