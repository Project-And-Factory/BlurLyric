<template>
    <h1>搜索“<a>{{page.q}}</a>”的结果</h1>

    <div class="row-two search">
        <div>
            <h2 v-if="page.track != []">歌曲列表<a v-if="page.track != []"
                    style="font-size:0.7em;color: rgba(0,0,0,.5)">{{'  '+page.track.length}}首</a></h2>
            <div v-if="page.track != []" class="search track" style="user-select:none">
                <div @click="playTheOnce(i)" class="tracks" :muid="item.id" v-for="(item,i) in page.track" :key="item.id">
                    <!--显示样式-->
                    <div class="infor">
                        <div class="trackIMG">
                            <img loading='lazy' :src="item.al.picUrl +'?param=96y96'" alt="" srcset="">
                        </div>
                        <div class="trackTitle">
                            <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i"
                                   >
                                    {{alia}} </a></h1>
                                    <h2 class="artistNames"><a v-for="(name) in item.ar" :key="name.id"  @click="this.$router.push({
            name: 'artist',
            query: {
              id: name.id
            }
          })"> {{name.name}}</a></h2>

                        </div>
                    </div>

                    <div class="linkbox bigger">
                        <a @click="this.$parent.$parent.$parent.pushTrack(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                        <!--a v-if="(this.$parent.$parent.$parent.data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) != -1)"
                    style="color:red;user-select:none" @click="this.$parent.$parent.$parent.loveMusic(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /></svg>
                </!--a>
                <a-- v-if="(this.$parent.$parent.$parent.data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) == -1)"
                    style="user-select:none" @click="this.$parent.$parent.$parent.loveMusic(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                </a-->
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h2 v-if="page.ar.result">歌手<a style="font-size:0.7em;color: rgba(0,0,0,.5)" v-if="page.ar.result">
                    {{'  '+page.ar.result.artistCount}}</a></h2>
            <div class="ARtrack" v-if="page.ar.result">
                <div @click="this.$router.push({
            name: 'artist',
            query: {
              id: item.id
            }
          })" v-for="(item) in page.ar.result.artists" :key="item.id">

                    <div class="ARImg" :style="'background-image: url(\'' +item.picUrl + '?param=500y500\')'"
                        v-bind:alt="item.name"></div>
                    <div class="ARTrTitle">
                        {{item.name}}
                    </div>
                </div>
            </div>

            <h2>MV</h2>
            <div class="mvTracks">
                <div @click="this.$router.push({
            name: 'video',
            query: {
              id: item.id,
              type: 'mv'
            }
          })" v-for="(item,i) in page.mvs" :key="i.id" class="mvTrack">
                    <img :src="item.cover+'?param=356y200'" loading="lazy" :alt="'音乐'+item.name+'的MV'">
                    <div class="mvTitle">{{item.name}}</div>
                    <div class="mvTime">{{app.formTime(item.duration * 0.001)}}</div>
                </div>
            </div>
            <h2 v-if="page.PLtrack[0] && page.playlist.result">歌单<a
                    style="font-size:0.7em;color: rgba(0,0,0,.5)">{{'  '+page.playlist.result.playlistCount}}个</a></h2>
            <div v-if="page.PLtrack[0] && page.playlist.result" class="PLtrack">
                <div @click="this.$router.push({name:'detail',query:{id:item.id }})" v-for="(item) in page.PLtrack"
                    :key="item.id">
                    <img loading='lazy' :src="item.coverImgUrl + '?param=500y500'" v-bind:alt="item.name">
                    <div class="PlTrTitle">
                        <h1>{{item.name}}</h1>
                        <h2>by {{item.creator.nickname}}</h2>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import reTools from '../network/getData'
    var time = new Date().getTime()
    import app from '../main.js'
    export default {
        name: 'searchList',
        data() {
            return {
                app,
                page: {
                    q: this.$route.query.q,
                    pic: '',
                    title: '稍等',
                    content: '',
                    creater: '',
                    trackIds: '',
                    aRtrackIds: [],
                    track: [],
                    mvs: [],
                    playlist: {},
                    PLtrack: [],
                    ar: {}
                }
            }
        },
        async created() {
            this.requestData()
        },
        methods: {
            setTracks(num) {
                app.changeTrack({
                    tracks: this.page.track,
                    num: num
                })
            },
            playThisPage() {
                this.setTracks(0)
            },
            playTheOnce(i) {
                let tempTime = new Date().getTime()
                if ((tempTime - time)<500){
                    time = tempTime - 1000
                    this.setTracks(i)

                }
                time = tempTime
            },
            requestData() {
                let appcache = app.cacheData('search' + this.page.q)
                if (appcache != undefined) {
                    this.page = appcache
                    return
                } else {
                    reTools.getData('/search', {
                        keywords: this.$route.query.q,
                        type: 1,
                        limit: 35
                    }).then(

                        r => {
                            this.page.trackIds = r.result.songs
                            let trackIDList = ''

                            for (const num in this.page.trackIds) {
                                trackIDList += this.page.trackIds[num].id
                                this.page.aRtrackIds.push(this.page.trackIds[num].id)
                                if (num < this.page.trackIds.length - 1) {
                                    trackIDList += ','

                                }
                            }
                            reTools.getData('/song/detail', {
                                ids: trackIDList
                            }).then(res => {
                                this.page.track = res.songs
                            })
                        })
                    reTools.getData('/search', {
                        type: 1004,
                        keywords: this.page.q,
                    }).then(r => {
                        this.page.mvs = r.result.mvs
                    })
                    reTools.getData('/search', {
                        type: 1000,
                        keywords: this.page.q,
                        limit: 100
                    }).then(r => {
                        this.page.playlist = r
                        this.page.PLtrack = r.result.playlists
                        app.cacheData('search' + this.page.q, this.page)

                    })

                    reTools.getData('/search', {
                        type: 100,
                        keywords: this.page.q
                    }).then(r => {
                        this.page.ar = r
                    })
                }
            }
        },
        watch: {
            $route: {
                handler: function (newVal) {
                    if (this.$route.name == 'search') {

                        this.page.q = newVal.query.q
                        this.requestData()
                    }
                },
                deep: true
            }
        }
    }
</script>

<style>
    #app>div.rightrow>div.viewBox>div>div:nth-child(1) {}

    .search .track {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    div.search .track.true {
        background-image: linear-gradient(to right, #00000008, #0000ff08);
    }

    .search .track>div:nth-child(1) {
        display: flex;
        width: 100%;
        gap: 8px;
        overflow: hidden;
    }

    .search .track>div:nth-child(1)>.trackTitle {}

    .search .track>div:nth-child(1)>.trackTitle>* {
        white-space: nowrap;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
    }

    .search .track>div:nth-child(1)>.trackTitle>h1>a {
        font-size: 0.8em;
    }

    .search .track>div:nth-child(1)>.track-img {
        user-select: none;

        height: 42px;
        width: 42px;
        min-height: 42px;
        min-width: 42px;
        border-radius: 9px;
        background-position: 50% 50%;
        background-size: cover;
        background-image: url("https://p1.music.126.net/P99uc1Hqzkj2QE1UMehuHQ==/109951167197634217.jpg?param=96y96");
    }

    .search .track>div:nth-child(1)>.trackTitle>h1 {
        font-size: 15px;
        margin: 5px 0 0 0;

    }

    .search .track>div:nth-child(1)>.trackTitle>h2 {
        font-size: 10px;
        margin: 2px 0 0 0;
    }

    .search .track>div:nth-child(1)>.trackTitle>h2>a {
        margin: 0 1em 0 0;
    }

    @media (max-width: 500px) {
        .dlTopLab-TitleLab {}

        .dlTopLab-TitleLab>h2 {
            font-size: 1.15em;
            display: -webkit-box;
            --webkit-box-orient: vertical;
            --webkit-line-clamp: 2;
            text-overflow: clip;
            white-space: normal;
        }

        .dlTopLab-TitleLab>h3 {
            font-size: 0.9em;
        }

        div.dlTopLab>.dlTopLab-TitleLab>.linkbox.bigger>a {
            padding: 5px 10px;
        }

        .search .track {
            max-height: 50vh;
            border-radius: 8px;
        }

        .search .track {
            position: relative;
            border-radius: 9px;
            display: flex;
        }

    }

    .dlTopLab-TitleLab>.linkbox.bigger>a {
        margin-top: 3px;
        background-color: rgba(255, 255, 255, 0.8);

    }

    .row-two {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .row-two>* {
        overflow: hidden;
    }

    .PLtrack .search {
        display: grid;
        --repeat: 2;
        overflow: hidden;
        --gapver: 20px;
        grid-template-columns: repeat(auto-fit, minmax(200px, calc(50% - var(--gapver))));

        gap: var(--gapver);
        flex-direction: row;
        font-size: 16px;
    }

    @media (max-width:650px) {
        .row-two {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: var(--paddingIndex-MaxWidth);
            max-width: var(--paddingIndex-MaxWidth);
        }

        div.viewBox>div>div:nth-child(1)>.track {
            overflow-y: auto;
            border-radius: 11px;
            max-height: 50vh;
            border-radius: 8px;
        }

    }

    @media (max-width: 500px) {
        .PLtrack {
            width: var(--paddingIndex-MaxWidth);
        }

        .PLtrack>div {
            width: calc(calc(var(--paddingIndex-MaxWidth) / var(--repeat)) - calc(calc(var(--repeat) - 1) * var(--gapver)));
        }

        .PLtrack>div>img {
            width: 100%;
            border-radius: 2.5vw;
        }
    }

    @media (min-width:1300px) {
        .PLtrack {
            --repeat: 3;

        }
    }

    @media (min-width:1650px) {
        .PLtrack {
            --repeat: 3;
        }
    }

    .ARtrack {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        width: calc(var(--paddingIndex-MaxWidth) / 2);
        padding: 0 0 10px 0px;
        color: rgba(50, 50, 50, 1);
    }

    .ARImg {
        height: 15vh;
        width: 15vh;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

    }

    .ARtrack::-webkit-scrollbar {
        height: 8px;
    }

    .ARTrTitle {
        margin-top: .8em;
        font-size: 1em;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    @media (max-width: 500px) {
        .ARtrack {
            width: var(--paddingIndex-MaxWidth);
        }
    }
</style>