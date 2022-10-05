<template>
  <h1>个性推荐</h1>
  <h2 style="display:flex;gap: 10px">今日日推 <a @click="setTracks(app.data.recommendSongs,0)" class="linkbox"><a>播放</a></a></h2>
  <div class="dailySongsSongsFall-row">
    <div class="dailySongsSongsFall-Sco">
      <div class="dailySongsSongsFall-gird">

                <div class="tracks" :muid="item.id" v-for="(item,i) in app.data.recommendSongs" :key="item.id">
                    <!--显示样式-->
                    <div @click="setTracks(app.data.recommendSongs,i)">
                        <div class="trackIMG">

                            <img v-lazy="item.al.picUrl +'?param=192y192'" alt="" srcset="">
                        </div>
                        <div class="trackTitle">
                            <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i"
                                    style="color: rgba(44,62,80,0.5)">
                                    {{alia}} </a></h1>
                            <h2><a v-for="(name) in item.ar" :key="name.id"> {{name.name}}</a></h2>

                        </div>
                    </div>

                    <div class="linkbox bigger">
                        <a @click="app.pushTrack(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
    </div>
  </div>
</template>
<script>
  import app from "../main.js";
  export default {
    name: 'dailySongs',
    data() {
      return {
        app,
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
            app.changeTrack({tracks: track,num : num})
        },
    },
  }
</script>
<style>
  .dailySongsSongsFall-row{
    display:grid;
    background-color: #fff;
    border-radius: 13px;
    padding: 10px;
    
    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .dailySongsSongsFall-Sco{
    position: relative;
      overflow-y: hidden;
      overflow-x: auto;

      border-radius: 13px;


  }
  .dailySongsSongsFall-gird{
    display:flex;
    height: inherit;
    max-height: inherit;
    overflow: hidden;
    flex-direction: row;
    width: max-content;
    border-radius: 13px;
     max-width: calc(7 * 400px);
    gap: 8px;
    padding: 0 0 5px 0;
    flex-wrap: wrap;
  }

    .dailySongsSongsFall-gird>.tracks{
        /* position: relative; */
        /* background-color: #00000008; */
        border-radius: 11px;
        height: 48px;
        display: flex;
        max-width: calc(var(--paddingIndex-MaxWidth) / 1);
        justify-content: space-between;
        max-width: fit-content;
        flex-direction: row;
        
    }


</style>