<script setup>
    import {
        nextTick,
        ref,
        watch,
        defineProps
    } from 'vue';
    import playerjs from '../js/player.js';
    import anime from 'animejs/lib/anime.es.js'

    /**
     * 整个控键在上或在下
     * 有以下值
     * 
     * bottom 在下
     * toBottom 要求往下
     * top 在上
     * toTop 要求往下
     * 
     * 当格式为 to**时会自动切换
     */
    const playerShowingState = ref('bottom') 

    defineProps({
        data: Object,
        appstate: Object
    })

    //定义一些常用控键，无需频繁获取元素
    let playerDom, miniPlayerControlDom, leftSideDom, coverDom, playerControlDom,
        playerControlVolumeDom,coverPlaceHolderDom
    const logFinished = {
        func: () => {}
    }
    nextTick(() => {
        coverPlaceHolderDom = document.querySelector('.coverPlaceHolder')
        playerDom = document.querySelector('.player')
        miniPlayerControlDom = document.querySelector('.miniPlayerControl')
        coverDom = document.querySelector('.cover')
        leftSideDom = document.querySelector('.leftSide')
        playerControlDom = document.querySelector('.playerControl'),
            playerControlVolumeDom = document.querySelector('.playerControl .volume')
    })

    // 设置一个设置css的工具，无需频繁写一些内容
    function setCss(dom, info) {
        for (const key in info) {
            dom.style.setProperty(key, info[key])
            console.log('dom.style.setProperty(' + key + ',' + info[key] + ')');
        }
    }

    // 监听部件动画，做出对应动画
    watch(playerShowingState, async (newState, oldState) => {
        let playerShowingStateChangeAnimation = anime.timeline({
            easing: 'spring(1, 80, 13, 0.2) ',
            autoplay: false,
        })

        switch (newState) {
            case 'toTop': // 要求向上

                playerShowingStateChangeAnimation.add({ // 控制整体向上
                    targets: playerDom,
                    height: '100%',
                    'padding-top': '60px',
                    'padding-left': '24px',
                    'padding-bottom': '24px',
                    'padding-right': '24px',
                }, 0)

                playerShowingStateChangeAnimation.add({ // 控制小控键淡出
                    targets: miniPlayerControlDom,
                    translateX: ['0vw', '100vw'],
                    duration: 300,
                    opacity: 0,
                    easing: 'cubicBezier(.5, .05, .1, .3)'
                }, 0)

                playerShowingStateChangeAnimation.add({ // 控制专辑图片放大
                    targets: coverDom,
                    height: [coverDom.offsetHeight,coverPlaceHolderDom.offsetHeight],
                }, 0)
                playerShowingStateChangeAnimation.add({ // 控制隐藏内容变透明
                    targets: playerControlDom,
                    opacity: 1,
                }, 200)
                playerShowingStateChangeAnimation.play();

                playerShowingState.value = 'top'
                setTimeout(() => {
                    setCss(playerControlVolumeDom,{
                        width: coverPlaceHolderDom.offsetHeight+'px' // 绑定控键与图片展示宽度相同
                    })
                }, 0);
                break;

            case 'toBottom':

                playerShowingStateChangeAnimation.add({
                    'padding-top': '12px',
                    'padding-left': '12px',
                    'padding-bottom': '12px',
                    'padding-right': '12px',


                    targets: playerDom,
                    height: [playerDom.offsetHeight, '80px']
                }, 0)
                playerShowingStateChangeAnimation.add({
                    targets: miniPlayerControlDom,
                    translateX: ['100vw', '0vw'],
                    opacity: 1,
                    duration: 300,
                    easing: 'cubicBezier(.5, .05, .1, .3)'

                }, 0)
                coverDom

                playerShowingStateChangeAnimation.add({
                    targets: coverDom,
                    height: [coverDom.offsetHeight,'56px'],
                }, 0)
                playerShowingStateChangeAnimation.add({
                    targets: playerControlDom,
                    opacity: 0
                }, 0)
                setTimeout(() => {
                    

                }, 0);
                playerShowingState.value = 'bottom'
                playerShowingStateChangeAnimation.play();

                break;

        }
    })

    function changePlayerState() {
        switch (playerShowingState.value) {
            case 'top' || 'toToping':
                playerShowingState.value = 'toBottom'
                break;

            case 'bottom' || 'toBottoming':
                playerShowingState.value = 'toTop'
                break;

            default:
                break;
        }
    }

    function formTime(sec) { //秒数转化为mm:ss
        let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
        let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
        return min + ':' + s
      }
</script>

<template>
    <div class="player" ref="player">
        <div class="leftSide">
            <div @click="changePlayerState" class="cover">
                <i class="bi bi-music-note"></i>
            </div>
            <div class="miniPlayerControl">
                <div class="info">
                    <div class="title">{{ data.title }}</div>
                    <div class="artist"><a v-for="(item, index) in data.artist "
                            :key="index">{{ (index !=0)?'&':'' +  item }}</a></div>
                </div>
                <div class="control">
                    <div><i class="bi bi-skip-start-fill"></i></div>
                    <div><i class="bi bi-play-fill bigger"></i></div>
                    <div><i class="bi bi-skip-end-fill"></i></div>
                </div>
            </div>
            <div class="playerControl">
                <div class="leftside">
                    <div class="coverPlaceHolder cover">
                        <i class="bi bi-music-note"></i>
                    </div>
                    <div class="volume">
                        <div class="info">
                            <div class="title">{{ data.title }}</div>
                            <div class="artist"><a v-for="(item, index) in data.artist "
                                    :key="index">{{ (index !=0)?'&':'' +  item }}</a></div>
                        </div>
                        <div class="progressRow">
                            <div class="duration">
                                <div class="progress"></div>
                            </div>
                            <div class="time">
                                <span>{{ formTime(data.cur) }}</span>
                                <span>{{ formTime(data.dur) }}</span>
                            </div>
                        </div>
                        <div class="control">
                            <div @click="this.$emit('changePlayMode')" class="smaller"><i :class="'bi bi-'+data.playmode"></i></div>
                            <div><i class="bi bi-skip-start-fill"></i></div>
                            <div><i class="bi bi-play-fill bigger"></i></div>
                            <div><i class="bi bi-skip-end-fill"></i></div>
                            <div class="small"><i class="bi bi-volume-up-fill"></i></div>
                        </div>
                        <div class="control">
                            <div class="small"><i class="bi bi-list-ul"></i></div>     
                            <div class="smaller"><i :class="'bi '+(appstate.isfullscreen == true)?'bi-fullscreen':'bi-fullscreen-exit'"></i></div>
                            <div class="small"><i class="bi bi-justify-left"></i></div>
                        </div>
                        
                    </div>
                </div>

                <div class="rightside">
                    <div class="lyric">
                        <div>
                            <h1>哈咯</h1>
                            <h2>hello</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .player {
        position: fixed;
        display: block;
        height: 80px;
        width: 100%;
        background-color: #ddd;
        bottom: 0;
        left: 0;
        box-shadow: 0px 0px 3px #0005;
        right: 0;
        box-sizing: border-box;
        padding: 12px;
        z-index: 200;
    }

    .leftSide {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        gap: 10px;
    }

    .cover {
        /* background-color: ; */
        height: 100%;
        width: fit-content;
        float: left;
        background-color: #e5e5e5;
        position: relative;
        border-radius: 7px;
        /* width: fit-content; */
        aspect-ratio: 1 / 1;
        box-shadow: 0px 0px 3px #0005;
        z-index: 1;

    }

    .cover .bi.bi-music-note {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #0005;
        font-size: 24px;
    }

    .miniPlayerControl {
        display: flex;
        flex: 1;
        max-height: 56px;
        min-width: calc(100vw - 90px);
    }

    .miniPlayerControl .title {
        /* font-weight: 00; */
        font-size: 18px;
        margin-top: 4px;
    }

    .miniPlayerControl .artist {
        color: #0008;
    }

    .miniPlayerControl .info {
        flex: 1;
    }

    .miniPlayerControl .control {
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 28px;
    }

    .control * {
        cursor: pointer;
    }

    .miniPlayerControl .control .bigger {
        font-size: 42px;
        padding-left: 5px
    }

    .playerControl {
        position: absolute;
        top: -12px;
        left: -12px;
        z-index: 0;
        height: calc(100vh - 60px);
        width: 100vw;
        gap: 30px;
        display: flex;
        padding: 12px;
        box-sizing: border-box;
        opacity: 0;
    }

    .leftside{
        display: flex;
        flex-direction: column;
        color: #000b;
        gap: 20px;
        width: fit-content;
    }
    .leftSide .coverPlaceHolder{
        opacity: 0;
        flex: 1;
        height: auto;
    }
    .leftSide .volume{
        display: flex;
        gap: 15px; 
        flex-direction: column;
    }
    
    .volume .info .title{
        font-size: 20px;
        font-weight: bold;
    }
    .volume>.control{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 28px;
        align-items: center;
    }
    .duration{
        height: 13px;
        border-radius: 9px;
        box-shadow: 0 1px 5px #0001;
        background-color: #0002;
        position: relative;
        margin-bottom: 3px;
    }
    .time{
        color: #0005;
        display: flex;
        font-size: 2px;
        justify-content: space-between;
    }
    .volume .control .bigger {
        font-size: 42px;
    }
    .volume .control .smaller{
        font-size: 22px;
    }
    .volume .control .small{
        font-size: 24px;
    }
</style>