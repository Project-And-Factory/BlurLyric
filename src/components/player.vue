<script setup>
    import {
        nextTick,
        ref,
        watch,
        defineProps
    } from 'vue';
    import playerjs from '../js/player.js';
    import anime from 'animejs/lib/anime.es.js'


    const playerShowingState = ref('bottom')
    defineProps({
        data: Object
    })


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

    function setCss(dom, info) {
        for (const key in info) {
            dom.style.setProperty(key, info[key])
            console.log('dom.style.setProperty(' + key + ',' + info[key] + ')');
        }
    }
    watch(playerShowingState, async (newState, oldState) => {
        let playerShowingStateChangeAnimation = anime.timeline({
            easing: 'spring(1, 80, 13, 0.2) ',
            autoplay: false,
        })

        switch (newState) {
            case 'toTop':

                playerShowingStateChangeAnimation.add({
                    targets: playerDom,
                    height: '100%',
                    'padding-top': '60px'
                }, 0)

                playerShowingStateChangeAnimation.add({
                    targets: miniPlayerControlDom,
                    translateX: ['0vw', '100vw'],
                    duration: 300,
                    opacity: 0,
                    easing: 'cubicBezier(.3, .5, 1, .2)'
                }, 0)

                playerShowingStateChangeAnimation.add({
                    targets: coverDom,
                    height: [coverDom.offsetHeight,coverPlaceHolderDom.offsetHeight],
                }, 0)
                playerShowingStateChangeAnimation.add({
                    targets: playerControlDom,
                    opacity: 1
                }, 0)
                playerShowingStateChangeAnimation.play();

                // playerShowingStateChangeAnimation.add({
                //         targets: playerControlDom,
                //         'padding-top': ['0px',playerControlVolumeDom.offsetHeight]
                //     },0)
                playerShowingState.value = 'top'
                setTimeout(() => {
                    setCss(playerControlVolumeDom,{
                        width: coverPlaceHolderDom.offsetHeight+'px'
                    })
                }, 100);
                break;

            case 'toBottom':

                playerShowingStateChangeAnimation.add({
                    'padding-top': '12px',
                    targets: playerDom,
                    height: [playerDom.offsetHeight, '80px']
                }, 0)
                playerShowingStateChangeAnimation.add({
                    targets: miniPlayerControlDom,
                    translateX: ['100vw', '0vw'],
                    opacity: 1,
                    duration: 300,
                    easing: 'cubicBezier(.3, .5, 1, .2)'

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

                            </div>
                        </div>
                        <div class="control">
                            <div><i class="bi bi-skip-start-fill"></i></div>
                            <div><i class="bi bi-play-fill bigger"></i></div>
                            <div><i class="bi bi-skip-end-fill"></i></div>
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

    .control>* {
        cursor: pointer;
    }

    .miniPlayerControl .control .bigger {
        font-size: 42px;
    }

    .playerControl {
        position: absolute;
        top: -12px;
        left: -12px;
        pointer-events: none;
        height: calc(100vh - 60px);
        width: 100vw;
        display: flex;
        padding: 12px;
        box-sizing: border-box;
        opacity: 0;
    }

    .leftside{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: fit-content;
    }
    .leftSide .coverPlaceHolder{
        opacity: 0;
    }
    .leftSide .volume{
        display: flex;
        gap: 20px; 
        flex-direction: column;
    }
    
    .volume .info .title{
        font-size: 22px;
    }
    .volume>.control{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 28px;
    }
</style>