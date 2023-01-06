<template>
  <h1>发现广场</h1>

  <h1>排行榜</h1>
  <div v-if="hotList[0]" class="rankingsTrack">
    <div v-for="(item,i) in hotList" :key="item.id" class="rankingsTracks">
      <div @click="this.$router.push({name:'detail',query:{id:item.id }})" class="title">{{item.title}}</div>
      <div v-bind:style="'user-select:none;max-height:calc(var(--minplayerHeight) + 18px * '+10+')'"
        class="track hotList">
        <div @click="playTheOnce(item.track,i)" class="tracks" :muid="playlist.id" v-for="(playlist,i) in item.track.slice(0,20)" :key="item.id">
          <!--显示样式-->
          <div class="infor">
            <div class="num">{{i}}</div>
            <div class="trackTitle">
              <h1>{{playlist.name}} <a v-for="(alia,i) in playlist.alia" :key="i">
                  {{alia}} </a></h1>
              <h2 class="artistNames"><a v-for="(name) in playlist.ar" :key="name.id"  @click="this.$router.push({
            name: 'artist',
            query: {
              id: name.id
            }
          })"> {{name.name}}</a></h2>
            </div>
          </div>

          <div class="linkbox bigger">
            <a @click="app.pushTrack(playlist)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"
                viewBox="0 0 16 16">
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </a>
          </div>
        </div>
        <a @click="this.$router.push({name:'detail',query:{id:item.id }})">更多请前往详情页查看</a>
      </div>
    </div>
  </div>

  <div v-if="Pl.length >= 2">
    <h1 style="width: fit-content ">推荐歌单</h1>
    <div class="PLtrack personalized">
      <div class="Pltracks" v-for="(item,i) in Pl" :key="item.id">
        <img @click="this.$router.push({name:'detail',query:{id:item.id }})" loading='lazy' :src="item.picUrl + '?param=500y500)'"
          v-bind:alt="item.name">
        <div class="PlTrTitle">
          <h1>{{item.name}}</h1>
          <h2 v-if="item.creator">by {{item.creator.nickname}}</h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src
  import reTools from "../network/getData.js";
  import app from "../main.js";
  var time = new Date().getTime()


  export default {
    name: 'muFound',
    data() {
      return {
        app,
        hotList: [

        ],
        Pl: []
      }
    },
    created() {
      let personalized = app.cacheData('personalized')
      if (personalized == undefined) {
        this.personalized().then(r=>{
          app.cacheData('personalized', r)
        })
      }

      //排行榜
      let 榜单ID = [3778678, 180106, 60198, 19723756]
      榜单ID.map(x => {

        this.getDetail(x).then(r => {
          this.hotList.push(r)

        })
        return x
      })


    },
    methods: {
      playTheOnce(track, i) {
        let tempTime = new Date().getTime()
                if ((tempTime - time)<500){
                    time = tempTime - 1000
                    app.changeTrack({
          tracks: track,
          num: i
        })

                }
                time = tempTime


      },
      async personalized() {
        await reTools.getData('/personalized', {
            timetamp: (Number(new Date())),
          limit: 10
        }).then(r => {
          this.Pl = r.result
          return r.result
        })
      },
      async getDetail(id) {
        let data = app.cacheData('playlist' + id)
        if (data == undefined) {
          data = {
            id: id,
            pic: '',
            title: '',
            content: '',
            creater: 'Loding',
            trackIds: '',
            lastUpdae: '',
            aRtrackIds: [],
            track: [],
            res: {}
          }
          await reTools.getData('/playlist/detail', {
            id: id,
            timetamp: (Number(new Date()))
          }).then(
            async (r) => {
              data.res = r
              data.pic = r.playlist.coverImgUrl;
              data.title = r.playlist.name;
              data.content = r.playlist.description
              data.creater = r.playlist.creator
              data.trackIds = r.playlist.trackIds
              let trackIDList = ''
              data.lastUpdae = new Date(data.res.playlist.updateTime).toLocaleString()
              for (const num in data.trackIds) {
                trackIDList += data.trackIds[num].id
                data.aRtrackIds.push(data.trackIds[num].id)
                if (num < data.trackIds.length - 1) {
                  trackIDList += ','
                }
              }
              data['trackIdsContent'] = trackIDList
              await reTools.getData('/song/detail', {
                ids: trackIDList,
                timetamp: (Number(new Date()))
              }).then(async (res) => {
                data.track = res.songs
                app.cacheData('playlist' + id, data)
              })
            }
          )
        }
        return data

      }

    }
  }
</script>

<style>
  /* .PLtrack.personalized {
    grid-template-rows: 1fr;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  } */

  .rankingsTrack {
    overflow: auto;
    height: fit-content;
    display: flex;
    flex-direction: row;
    gap: 15px;
    border-radius: 17px;

  }

  .rankingsTracks {
    position: relative;
    background-color: white;
    max-width: 240px;
    min-width: 240px;

    padding: 10px;
    border-radius: 17px;
    overflow: hidden;
    margin-bottom: 10px;

  }

  .rankingsTracks>.title {
    font-size: 1.1rem;
    margin-left: 0.3em;
    margin-bottom: .4em;
    cursor: pointer;
    width: fit-content;
    position: relative;
  }
 .rankingsTrack .hotList>a{
  color: #00000050;
  cursor: pointer;
 }

  .rankingsTracks>.title:hover::before {
    display: block;
  }

  .rankingsTracks>.title::before {
    content: '';
    width: 100%;
    display: none;

    height: 0.3em;
    background-color: #0080ff30;
    bottom: 0.3em;
    border-radius: 2em;
    position: absolute;
  }

  .track.hotList {
    background-color: #00000005;
    border-radius: 15px;
    overflow-y: auto;
    padding: 6px;

  }

  .track.hotList::-webkit-scrollbar {
    display: none;
  }

  div.track.hotList>div {
    padding: 3px 6px 3px 0px;
    --minplayerHeight: 46px 
  }
@media (max-width: 600px) {
  div.track.hotList>div {
    padding: 3px 6px;
    --minplayerHeight: 36px 
  }
}
  .hotList div.tracks .trackTitle {
    font-size: 13px;
  }
</style>