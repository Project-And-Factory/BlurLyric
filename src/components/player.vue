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


    let playerDom, miniPlayerControlDom
    const logFinished = {
        func: () => {}
    }
    nextTick(() => {
        playerDom = document.querySelector('.player')
        miniPlayerControlDom = document.querySelector('.miniPlayerControl')
    })

    watch(playerShowingState, async (newState, oldState) => {
        let playerShowingStateChangeAnimation = anime.timeline({
            easing: 'spring(1, 80, 13, 0.2) ',
            autoplay: false,
        })

        switch (newState) {
            case 'toTop':

                playerShowingStateChangeAnimation.add({
                    targets: playerDom,
                    height: '100%'
                }, 0)
                
                playerShowingStateChangeAnimation.add({
                    targets: miniPlayerControlDom,
                    translateX: ['0vw','100vw'],
                    duration: 300,
                    opacity: 0,
                    easing: 'cubicBezier(.5, .05, .1, .3)'

                }, 0)
                playerShowingState.value = 'top'

                playerShowingStateChangeAnimation.play();
                break;

            case 'toBottom':

                playerShowingStateChangeAnimation.add({
                    targets: playerDom,
                    height: [playerDom.offsetHeight, '80px']
                }, 0)
                playerShowingStateChangeAnimation.add({
                    targets: miniPlayerControlDom,
                    translateX: ['100vw','0vw'],
                    opacity: 1,
                    duration: 300,
                    easing: 'cubicBezier(.5, .05, .1, .3)'
                    
                }, 0)

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
                    <div class="artist"><a v-for="(item, index) in data.artist " :key="index" >{{ (index !=0)?'&':'' +  item }}</a></div>
                </div>    
                <div class="control">
                    <div><i class="bi bi-play-fill"></i></div>
                    <div><i class="bi bi-caret-right-fill"></i></div>
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
    .miniPlayerControl{
        display: flex;
        flex: 1;
    }
    .miniPlayerControl .title{
        /* font-weight: 00; */
        font-size: 18px;
        margin-top: 4px;
    }
    .miniPlayerControl .artist{
        color: #0008;
    }
    .info{
        flex: 1;
    }
</style>