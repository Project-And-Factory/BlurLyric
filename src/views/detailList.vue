<template>

    <div class="dlTopLab" style="user-select:none">
        <img :src="page.pic" alt="" srcset="">
        <img :src="page.pic" alt="" srcset="">

        <div class="dlTopLab-TitleLab">
            <h2>{{this.page.title}}</h2>
            <p>List by{{' '+page.creater.nickname}} <br>
            </p>
            <a>最后更新于 {{page.lastUpdae}}</a>
            <p v-if="page.res.playlist != undefined ">
                {{page.res.playlist.description}}
            </p>
            <div class="linkbox" style="flex-direction: row;flex-wrap: wrap;display: flex;">
                <a style="user-select:none" @click="playThisPage()">
                    <svg style="transform: scale(1.6) " xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                        </path>
                    </svg>
                    播放歌单
                </a>

                <!--下载-->
                <a style="user-select:none" @click="downloadThisPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-download" viewBox="0 0 16 16">
                        <path
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path
                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                </a>
                <!--收藏-->

                <a style="user-select:none" @click="collection(this.page.id)">
                    <svg v-if="app.data.myMusicList.find((item)=>{return item.id == this.page.id}) == undefined"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg style="color:var(--color-theme);"
                        v-if="app.data.myMusicList.find((item)=>{return item.id == this.page.id}) != undefined"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                </a>

            </div>
        </div>
    </div>

    <h2>歌曲列表<a v-if="page.track[0]" style="font-size:0.7em;color: rgba(0,0,0,.5)">{{'  '+page.track.length}}首</a></h2>
    <div v-bind:style="'user-select:none;min-height:calc(var(--minplayerHeight) + 18px * '+page.track.length+')'"
        class="track playlist">
        <div class="tracks" :muid="item.id" v-for="(item,i) in page.track" :key="item.id" >
            <!--显示样式-->
            <div  @click="playTheOnce(i)">
                <div  class="num">{{i}}</div>
                <div class="trackTitle">
                    <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i" style="color: rgba(44,62,80,0.5)">
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
</template>

<script>
    import reTools from '../network/getData'
    import app from '../main.js'
    import audioNetease from '../js/audioNetease.js'
    import message from '../js/message.js'

    export default {
        name: 'detailList',
        data() {
            return {
                app,
                page: {
                    id: this.$route.query.id,
                    pic: '',
                    title: 'xxxxxx',
                    content: '',
                    creater: 'xxx',
                    trackIds: '',
                    lastUpdae: '',
                    aRtrackIds: [],
                    track: [],
                    res: {}
                }
            }
        },
        async created() {
            this.loadDeailList()
        },
        methods: {
            collection(id) {
                reTools.getData('/playlist/subscribe', {
                    id: id,
                    t: 1
                }).then(() => {
                    app.myPlayList()
                    message.create('添加成功')
                })
            },
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
                this.setTracks(i)
            },
            async downloadThisPage() {
                for (let i = 0; i < this.page.track.length; i++) {
                    let id = this.page.track[i].id
                    audioNetease.requireURL(id).then(async (data) => {
                        console.log(data.song[data.song.use].url);
                        let response = await fetch(data.song[data.song.use].url)
                        let blob = await response.blob();
                        let objectUrl = window.URL.createObjectURL(blob);

                        let a = document.createElement("a");
                        a.href = objectUrl;
                        let name = ''
                        for (let num in this.page.track[i].ar) {
                            name += this.page.track[i].ar[num].name;
                            if (this.page.track[i].ar.length - num > 1) {
                                name += '&'
                            }
                        }
                        a.download = this.page.track[i].name + ' - ' + name + '.mp3';
                        a.click();
                        a.remove()
                    })


                }
            },
            loadDeailList() {
                let appcache = app.cacheData('playlist' + this.page.id)
                if (appcache != undefined) {
                    this.page = appcache
                    return
                } else {
                    reTools.getData('/playlist/detail', {
                        id: this.$route.query.id,
                        timetamp: (Number(new Date()))
                    }).then(
                        r => {
                            console.log(r);
                            this.page.res = r
                            this.page.pic = r.playlist.coverImgUrl;
                            this.page.title = r.playlist.name;
                            this.page.content = r.playlist.description
                            this.page.creater = r.playlist.creator
                            this.page.trackIds = r.playlist.trackIds
                            let trackIDList = ''
                            this.page.lastUpdae = new Date(this.page.res.playlist.updateTime).toLocaleString()
                            for (const num in this.page.trackIds) {
                                trackIDList += this.page.trackIds[num].id
                                this.page.aRtrackIds.push(this.page.trackIds[num].id)
                                if (num < this.page.trackIds.length - 1) {
                                    trackIDList += ','
                                }
                            }
                            this.page['trackIdsContent'] = trackIDList
                            reTools.getData('/song/detail', {
                                ids: trackIDList,
                                timetamp: (Number(new Date()))
                            }).then(res => {
                                this.page.track = res.songs
                                app.cacheData('playlist' + this.page.id, this.page)

                            })

                        }
                    )
                }
            }
        },
        watch: {
            $route: {
                handler: function (newVal) {
                    if (this.$route.name == 'DetaiList') {
                        this.page.id = newVal.query.id
                        this.loadDeailList()
                    }
                },
                deep: true
            }
        }

    }
</script>

<style>
    .dlTopLab {
        height: fit-content;
        padding-bottom: 20px;
        display: flex;
        gap: 30px;
        position: relative;
    }

    .dlTopLab>img {
        border-radius: 7px;
        --img-size: 240px;
        aspect-ratio: 1/1;
    }

    .dlTopLab>img:nth-child(1) {
        position: absolute;
        filter: blur(12px);
        z-index: -1;
        height: calc(var(--img-size) - 20px);
        margin: 15px 10px 0 10px;
    }

    .dlTopLab>img:nth-child(2) {
        height: var(--img-size);
        border-radius: 7%;
    }

    .dlTopLab-TitleLab>h2 {
        font-size: 2.2em;
        color: black;
        margin: 0.5em 0;
        font-weight: bold;
    }

    .dlTopLab-TitleLab {
        font-size: 13px;
        color: #888;



    }

    .dlTopLab-TitleLab>* {
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
    }

    .dlTopLab-TitleLab>p:nth-child(2) {
        color: black;
        font-size: 1.08em;
        margin: 0;
        -webkit-line-clamp: 4;
    }

    *>.dlTopLab-TitleLab>div {
        display: block;
        overflow: visible;
        margin-top: 1em;
    }

    *>.dlTopLab-TitleLab>div.linkbox>a {
        font-size: 14px;
        width: fit-content;
        height: fit-content;
        padding: 9px;
        display: flex;
        gap: 4px;
    }

    @media (max-width: 700px) {
        .dlTopLab>img {
            border-radius: 7px;
            --img-size: 130px;
        }

        .dlTopLab-TitleLab {
            font-size: 9px;
            color: #888;
        }

        .dlTopLab {
            gap: 20px;
        }

        div.dlTopLab>div>p:nth-child(4) {
            display: none;
        }
    }
</style>