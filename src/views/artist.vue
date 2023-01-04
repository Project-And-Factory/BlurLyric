<script>
    import analyze from 'rgbaster'
    import Color from 'color'
    import reTools from '../network/getData'
    import app from '../main.js'
    var time = new Date().getTime()

    async function picColor(url) {
        return await analyze(url + '?param=24y24', {
            ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']
        })
    }

    export default {
        name: 'artist',
        data() {
            return {
                app,
                page: {
                    id: this.$route.query.id,
                    colorResult: [{
                        color: '#bbb'
                    }, ],
                    textColor: '#000',
                    artistData: {
                        artist: {
                            picUrl: ''
                        }
                    },
                    mvs: []
                }
            }
        },
        async created() {
            this.requestData()
        },
        methods: {
            setTracks(num, track) {
                app.changeTrack({
                    tracks: track || this.page.artistData.hotSongs,
                    num: num
                })
            },
            playTheOnce(i, track) {
                let tempTime = new Date().getTime()
                if ((tempTime - time) < 500) {
                    time = tempTime - 1000
                    this.setTracks(i, track)

                }
                time = tempTime

            },
            async requestData() {
                let appcache = app.cacheData('artist' + this.page.id)
                if (appcache != undefined) {
                    this.page = appcache
                    return
                } else {
                    await reTools.getData('/artists', {
                        id: this.page.id
                    }).then(res => {
                        this.page.artistData = res
                    })

                    await reTools.getData('/artist/mv', {
                        id: this.page.id
                    }).then(res => {
                        this.page.mvs = res.mvs
                    })

                    await picColor(this.page.artistData.artist.picUrl).then(result => {
                        this.page.colorResult = result
                    })
                    let data = Color(this.page.colorResult[0].color).object()
                    this.page.textColor = (data.r * 0.299 + data.g * 0.587 + data.b * 0.114) > 186 ? '#000000' :
                        '#FFFFFF'

                    app.cacheData('artist' + this.page.id, this.page)

                }
            }
        },
        watch: {
            $route: {
                handler: async function (newVal) {
                    if (newVal.name == 'artist') {
                        this.page = {
                            id: this.$route.query.id,
                            colorResult: [{
                                color: '#bbb'
                            }, ],
                            textColor: '#000',
                            artistData: {
                                artist: {
                                    picUrl: ''
                                }
                            },
                            mvs: []
                        }
                        await this.requestData()
                    }
                },
                deep: true
            }
        }
    }
</script>

<template>
    <div class="card card-artist"
        v-bind:style="'--theme-color:' + page.colorResult[0].color + ';--theme-color2:' + page.textColor + ';--imgSrc:' + page.artistData.artist.picUrl + ';'">
        <img class="card-img" :src="this.page.artistData.artist.picUrl + '?param=512y512'" alt="">
        <img class="card-img blur" :src="this.page.artistData.artist.picUrl + '?param=512y512'" alt="">
        <div>
            <h1 class="title">{{this.page.artistData.artist.name}}</h1>
            <h2 :style="'color:'+page.textColor+'80;'" class="title">
                {{this.page.artistData.artist.briefDesc}}
            </h2>
        </div>
    </div>
    <div class="artist girdIndex">
        <div>
            <h2 style="display: flex;justify-items: center;gap: 10px;">热门单曲 <a class="linkbox"><a style="display:block"
                        @click="playTheOnce(0,page.artistData.hotSongs)">
                        <svg style="transform: scale(1.6);" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path
                                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                            </path>
                        </svg>播放</a></a></h2>
            <div class="track" style="clear:left">
                <div class="tracks" @click="playTheOnce(i,page.artistData.hotSongs)" :muid="item.id"
                    v-for="(item,i) in page.artistData.hotSongs" :key="item.id">
                    <div class="infor">
                        <div class="num">{{i}}</div>
                        <div class="trackTitle">
                            <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i"
                                    style="color: rgba(44,62,80,0.5)">
                                    {{alia}} </a></h1>
                            <h2 class="artistNames"><a v-for="(name) in item.ar" :key="name.id" @click="this.$router.push({
            name: 'artist',
            query: {
              id: name.id
            }
          })"> {{name.name}}</a></h2>
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
        <div>
            <h2 v-if="page.mvs[0]">MV</h2>
            <div v-if="page.mvs[0]" class="mvTracks">
                <div @click="this.$router.push({
            name: 'video',
            query: {
              id: item.id,
              type: 'mv'
            }
          })" v-for="(item,i) in page.mvs" :key="i.id" class="mvTrack">
                    <img :src="item.imgurl+'?param=356y200'" loading="lazy" :alt="'音乐'+item.name+'的MV'">
                    <div class="mvTitle">{{item.name}}</div>
                    <div class="mvTime">{{app.formTime(item.duration * 0.001)}}</div>

                </div>
            </div>
            <!--h2>专辑</h2-->

        </div>
    </div>
</template>
<style>
    .card-artist {
        height: fit-content;
        border-radius: calc(1vh + 1.2vw);
        background-color: var(--theme-color);
        color: var(--theme-color2);
        padding: calc(.8vh + 1vw);
        position: relative;
        display: flex;
        font-size: calc(.8vh + 1vw);
        overflow: hidden;
        margin-bottom: calc(.8vh * 2 + 1vw * 2);
    }

    .card-img {
        z-index: 2;
    }

    .card-img,
    .card-artist .blur {
        height: calc(8vh + 10vw);
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        margin-right: 20px;
    }

    .card-artist .blur {
        position: absolute;
        filter: blur(calc(1.6vh + 2vw));
        z-index: 1;
    }

    .card .title,
    .artist {
        margin: .4em 0;
    }

    .card h2.title {
        font-size: 1em;
        font-weight: lighter;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    .artist.girdIndex {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: calc(1vh + 1.2vw);
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .artist.girdIndex>div {
        background-color: white;
        border-radius: calc(1vh + 1.2vw);
        padding: 10px;
        overflow: hidden;
    }

    .artist.girdIndex>div>h2 {
        margin: .3em 0;
    }

    @media (max-width: 650px) {
        .artist.girdIndex {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: calc(1vh + 1.2vw);
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        .artist.girdIndex .track {
            height: calc(10 * calc(var(--minplayerHeight) + 18px));
            overflow: hidden;
        }


    }
</style>