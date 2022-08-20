<template>

    <div v-if="page.res.playlist != undefined " class="dlTopLab" style="user-select:none">
        <img :src="page.pic" alt="" srcset="">
        <img :src="page.pic" alt="" srcset="">

        <div class="dlTopLab-TitleLab">
            <h2>{{this.page.title}}</h2>
            <p>List by{{' '+page.creater.nickname}} <br>
            </p>
            <a>最后更新于 {{page.lastUpdae}}</a>
            <p>
                {{page.res.playlist.description}}
            </p>
            <div class="linkbox">
                <a style="user-select:none" @click="playThisPage()">
                    <svg style="transform: scale(1.6) " xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                        </path>
                    </svg>
                    播放歌单
                </a>

            </div>
        </div>
    </div>
    <h2>歌曲列表<a v-if="page.track[0]" style="font-size:0.7em;color: rgba(0,0,0,.5)">{{'  '+page.track.length}}首</a></h2>
    <div class="track playlist" style="user-select:none">
        <div v-bind:class="'tracks ' + (item.id == this.$parent.$parent.$parent.id )"  v-for="(item,i) in page.track" :key="item.id">
            <!--显示样式-->
            <div>
                <div @click="playTheOnce(i)" class="trackIMG">
            
                    <img
                    v-lazy="item.al.picUrl +'?param=192y192'" alt="" srcset="">
                    <img
                    v-lazy="item.al.picUrl +'?param=192y192'" alt="" srcset="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                    </svg>
                </div>
                <div class="trackTitle">
                    <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i" style="color: rgba(44,62,80,0.5)">
                            {{alia}} </a></h1>
                    <h2><a v-for="(name) in item.ar" :key="name.id"> {{name.name}}</a></h2>

                </div>
            </div>

            <div class="linkbox bigger">
                <a @click="musicListMore(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
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
</template>

<script>
    import reTools from '../network/getData'
    export default {
        name: 'detailList',
        data() {
            return {
                page: {
                    id: this.$route.query.id,
                    pic: '../icon/icon.svg',
                    title: 'BLurlyric Loding',
                    content: '',
                    creater: 'Loding',
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
            setTracks(num) {
                this.$parent.$parent.$parent.changeTrack({
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
            loadDeailList() {

                reTools.getData('/playlist/detail', {
                    id: this.page.id,
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
                        reTools.getData('/song/detail', {
                            ids: trackIDList,
                            timetamp: (Number(new Date()))
                        }).then(res => {
                            this.page.track = res.songs

                        })

                    }
                )

            }
        },
        watch: {
            $route: {
                handler: function (newVal) {
                    this.page.id = newVal.query.id
                    this.loadDeailList()

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
        --img-size: 240px
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
        div.dlTopLab > div > p:nth-child(4){
            display: none;
        }
    }
</style>