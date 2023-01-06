<template>
    <!--默认显示 将要播放-->
    <div v-if="displayType == 0">
        <div v-if="app.data.player.tracks[0].id != 0">
            <h1 style="font-size:1.5rem">当前正播放</h1>
            <div class="tracks" :muid="app.data.player.tracks[app.data.player.trackNum].id">
                <!--显示样式-->
                <div  class="infor">
                    <div class="trackTitle">
                        <h1>{{app.data.player.tracks[app.data.player.trackNum].name}} <a v-for="(alia,i) in app.data.player.tracks[app.data.player.trackNum].alia" :key="i">
                                {{alia}} </a></h1>
                                <h2 class="artistNames"><a v-for="(name) in app.data.player.tracks[app.data.player.trackNum].ar" :key="name.id"> {{name.name}}</a></h2>

                    </div>
                    <div class="trackAl">
                    <div>
                        
                        {{ app.data.player.tracks[app.data.player.trackNum].al.name }}
                    </div>
                </div>

                </div>
                <div class="linkbox bigger">
                    <a @click="clean(app.data.player.trackNum)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </a>
                </div>


            </div>
            <br>
            <div class="linkbox">
                <a @click="displayType++">查看整个列表</a>
            </div>
            <h1 style="font-size:1.5rem;font-weight:bolder;">接下来播放</h1>
            <div  
                class="track playlist">
                <div @click="playTheOnce(app.data.player.trackNum + i + 1)"  class="tracks" :muid="item.id" v-for="(item,i) in app.data.player.tracks.slice(app.data.player.trackNum + 1, app.data.player.trackNum + 21)" :key="item.id">
                    <!--显示样式-->
                    <div class="infor">
                        <div class="trackTitle">
                            <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i"
                                   >
                                    {{alia}} </a></h1>
                                    <h2 class="artistNames"><a v-for="(name) in item.ar" :key="name.id" @click="this.$router.push({
            name: 'artist',
            query: {
              id: name.id
            }
        })"> {{name.name}}</a></h2>
                        </div>
                        <div class="trackAl">
                    <div>{{ item.al.name }}</div>
                </div>
                    </div>
                    <div class="linkbox bigger">
                        <a @click="clean(app.data.player.trackNum + 1+i)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-x" viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </a>
                        <a @click="upGo(app.data.player.tracks,app.data.player.trackNum + 1+i)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </a>
                        <a @click="downGo(app.data.player.tracks,app.data.player.trackNum + 1+i)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                            </svg>
                        </a>
                    </div>
                    <div class="time" v-if="item.dt !=  undefined ">
                        {{ app.formTime(Number((item.dt * 0.001).toFixed(0))) }}
                    </div>

                </div>
            </div>
            <br>
            <div class="linkbox">
                <a @click="displayType++">查看整个列表</a>
            </div>
        </div>
        <div v-if="app.data.player.tracks[0].id == 0">
            <h1>您的播放列表没有任何音乐，快去点歌吧</h1>
        </div>
    </div>
    <div v-if="displayType == 1">
        <h1 style="font-size:1.75rem">您正在播放的列表<a v-if="app.data.player.tracks[0].id != 0"
                style="font-size:0.7em;color: rgba(0,0,0,.5)">{{'  '+app.data.player.tracks.length}}首</a></h1>
        <div v-if="app.data.player.tracks[0].id != 0"
             
            class="track playlist">
            <div class="linkbox">
                <a @click="cleanAll()" style="align-items:center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                    清除所有
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
                <a @click="displayType--">恢复将要播放样式</a>

            </div>
            <br>
            <div class="tracks" :muid="item.id" v-for="(item,i) in app.data.player.tracks" :key="item.id">
                <!--显示样式-->
                <div @click="playTheOnce(i)" class="infor">
                    <div class="num">{{i}}</div>
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
                    <div class="trackAl">
                    <div>{{ item.al.name }}</div>
                </div>
                </div>
                <div class="linkbox bigger">
                    <a @click="clean(i)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </a>
                    <a @click="upGo(app.data.player.tracks,i)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </a>
                    <a @click="downGo(app.data.player.tracks,i)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                        </svg>
                    </a>
                </div>
                <div class="time">
                    {{ app.formTime(Number((item.dt * 0.001).toFixed(0))) }}
                </div>

            </div>
        </div>
        <div v-if="app.data.player.tracks[0].id == 0">
            <p>您的播放列表没有任何音乐，快去点歌吧</p>
        </div>
    </div>
</template>

<script>
    import reTools from '../network/getData'
    import app from '../main.js'
    import message from '../js/message.js'
    var time = new Date().getTime()

    export default {
        name: 'playingList',
        data() {
            return {
                app,
                displayType: 0
            }
        },
        async created() {
            // this.loadDeailList()
        },
        methods: {
            setTracks(num) {
                app.data.player.trackNum = num
                app.id = app.data.player.tracks[num].id
            },
            playTheOnce(i) {
                let tempTime = new Date().getTime()
                if ((tempTime - time)<500){
                    time = tempTime - 1000
                    this.setTracks(i)

                }
                time = tempTime
            },
            async downloadThisPage() {
                for (let i = 0; i < app.data.player.tracks.length; i++) {
                    let id = app.data.player.tracks[i].id
                    audioNetease.requireURL(id).then(async (data) => {
                        console.log(data.song[data.song.use].url);
                        let response = await fetch(data.song[data.song.use].url)
                        let blob = await response.blob();
                        let objectUrl = window.URL.createObjectURL(blob);

                        let a = document.createElement("a");
                        a.href = objectUrl;
                        let name = ''
                        for (let num in app.data.player.tracks[i].ar) {
                            name += app.data.player.tracks[i].ar[num].name;
                            if (app.data.player.tracks[i].ar.length - num > 1) {
                                name += '&'
                            }
                        }
                        a.download = app.data.player.tracks[i].name + ' - ' + name + '.mp3';
                        a.click();
                        a.remove()
                    })


                }
            },

            downGo(array, index) {
                if (index === array.length - 1) return false
                // 将上下个数组元素值替换为当前元素值，并将被替换的元素值赋值给当前元素
                array[index] = array.splice(index + 1, 1, array[index])[0]
                app.data.player.tracks = array
                app.id = app.data.player.tracks[app.data.player.trackNum].id
                message.create('操作成功 ' + (index + 1) + ' 处音乐下移一处')
            },
            upGo(array, index) {
                if (index === 0) return false
                // 将上一个数组元素值替换为当前元素值，并将被替换的元素值赋值给当前元素
                array[index] = array.splice(index - 1, 1, array[index])[0]
                app.data.player.tracks = array
                app.id = app.data.player.tracks[app.data.player.trackNum].id
                message.create('操作成功 ' + (index + 1) + ' 处音乐上移一处')

            },
            toFirst(array, index) {
                if (index === 0) return false
                // 删除当前数组元素，并将被删除的值添加到数组开头
                array.unshift(array.splice(index, 1)[0])
                app.data.player.tracks = array
            },
            clean(index) {
                app.data.player.tracks.splice(index, 1)
                if (app.data.player.trackNum > index) {
                    app.data.player.trackNum--
                }
                if (app.data.player.trackNum == index) {
                    app.id = app.data.player.tracks[app.data.player.trackNum].id
                }
                message.create('删除成功 ' + (index + 1) + ' 处音乐删除')

            },
            cleanAll() {

                app.data.player.tracks = [{
                    "name": "",
                    "id": 0,
                    "ar": [{
                        "id": 0,
                        "name": "",
                        "tns": [],
                        "alias": []
                    }],
                    "alia": [],
                    "al": {
                        "id": 0,
                        "name": "",
                        "picUrl": "/src/assets/icon.png",
                        "tns": [],
                        "pic_str": "0",
                        "pic": 0
                    },
                    "cp": 1416336,
                    "mv": 10977779,
                }];
                app.data.player.trackNum = 0;;
                document.getElementById('player').style.top = '100%'
                app.audio.pause()
                message.create('操作成功 请快去选择音乐吧')

            }
        },
        watch: {
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
        filter: blur(2rem);
        z-index: -1;
        height: calc(var(--img-size) - 30px);
        margin: 20px 10px 0 10px;
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

    @media (max-width:460px) {
        .dlTopLab {
            flex-direction: column;
            align-items: center;
            text-align: center;
            /* justify-content: center; */
        }

        .dlTopLab>img {
            border-radius: 7px;
            --img-size: 200px;
        }

        .dlTopLab-TitleLab .linkbox {
            justify-content: center;
        }
    }
</style>