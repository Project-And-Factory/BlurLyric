<template>
  <h1>发现广场</h1>

  <h1>排行榜</h1>
  <div v-if="hotList[0]" class="rankingsTrack">
    <div v-for="(item,i) in hotList" :key="item.id" class="rankingsTracks">
      <div @click="this.$router.push({name:'detail',query:{id:item.id }})" class="title">{{item.title}}</div>
      <div v-bind:style="'user-select:none;max-height:calc(var(--minplayerHeight) + 18px * '+10+')'"
        class="track hotList">
        <div class="tracks" :muid="playlist.id" v-for="(playlist,i) in item.track" :key="item.id">
          <!--显示样式-->
          <div @click="playTheOnce(item.track,i)">
            <div class="trackTitle">
              <h1>{{playlist.name}} <a v-for="(alia,i) in playlist.alia" :key="i" style="color: rgba(44,62,80,0.5)">
                  {{alia}} </a></h1>
              <h2><a v-for="(name) in playlist.ar" :key="name.id"> {{name.name}}</a></h2>

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
      </div>
    </div>
  </div>

  <div v-if="Pl.length >= 2">
    <h1 style="width: fit-content ">推荐歌单</h1>
    <div class="PLtrack personalized">
      <div class="Pltracks" v-for="(item,i) in Pl" :key="item.id">
        <img @click="this.$router.push({name:'detail',query:{id:item.id }})" v-lazy="item.picUrl + '?param=500y500)'"
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
      let 歌单列表 = app.cacheData('personalized')
      if (歌单列表 == undefined) {
        app.cacheData('personalized', this.personalized())
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
        app.changeTrack({
          tracks: track,
          num: i
        })

      },
      personalized() {
        reTools.getData('/personalized', {
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
    padding: 3px 6px 3px 0;
    --minplayerHeight: 46px
  }

  .hotList div.tracks .trackTitle {
    font-size: 13px;
  }
</style>