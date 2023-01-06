<template>
  <h2><a style="font-size:1.5em">{{ new Date().getDate() }}</a>
    <a>/{{(new Date().getMonth() + 1)}} <br>今日日推</a>

  </h2> <a @click="app.changeTrack({tracks: app.data.recommendSongs.data.dailySongs,num : 0})"
    class="linkbox"><a>播放全部</a></a><br>
  <div style="clean: both" class="track" v-if="app.data.recommendSongs.data">
    <div @click="setTracks(app.data.recommendSongs.data.dailySongs,i)" class="tracks" :muid="item.id"
      v-for="(item,i) in app.data.recommendSongs.data.dailySongs" :key="item.id">
      <div class="infor">
        <div class="trackIMG">

          <img loading='lazy' :src="item.al.picUrl +'?param=96y96'" alt="" srcset="">
        </div>
        <div class="trackTitle">
          <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i">
              {{alia}} </a></h1>
          <h2 class="artistNames"><a v-for="(name) in item.ar" :key="name.id" @click="this.$router.push({
            name: 'artist',
            query: {
              id: name.id
            }
          })"> {{name.name}}</a></h2>

        </div>
        <div v-if="app.data.recommendSongs.data.recommendReasons.find((reason)=>{return reason.songId == item.id})"
          class="trackAl">
          {{ app.data.recommendSongs.data.recommendReasons.find((reason)=>{return reason.songId == item.id}).reason  }}
        </div>
      </div>
      <div class="linkbox bigger">
        <a @click="app.pushTrack(item)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"
            viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </a>
      </div>
      <div class="time">
        {{ app.formTime(Number((item.dt * 0.001).toFixed(0))) }}
      </div>
    </div>
  </div>
</template>
<script>
  import app from "../main.js";
  var time = new Date().getTime()

  export default {
    name: 'dailySongs',
    data() {
      return {
        app,
        myData: {}
      }
    },
    methods: {
      setTracks(track, num) {
        let tempTime = new Date().getTime()
        if ((tempTime - time) < 500) {
          time = tempTime - 1000
          app.changeTrack({
            tracks: track,
            num: num
          })
        }
        time = tempTime
      },
    },
    created() {
      setTimeout(() => {
        console.log(app.data.recommendSongs);
      }, 2 * 1000);
    }
  }
</script>
<style>
  .dailySongsSongsFall-row {
    display: grid;
    background-color: #fff;
    border-radius: 13px;
    padding: 10px;

    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .dailySongsSongsFall-Sco {
    position: relative;
    overflow-y: hidden;
    overflow-x: auto;

    border-radius: 13px;


  }

  .dailySongsSongsFall-gird {
    display: flex;
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

  .dailySongsSongsFall-gird>.tracks {
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