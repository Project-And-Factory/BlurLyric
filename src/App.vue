<script>
    import topBar from './components/topBar.vue'
    import rightBlock from './components/rightBlock.vue'
    import leftBar from './components/leftBar.vue'
    import player from './components/player.vue'



    export default {
        name: 'app',
        components: {
            topBar,
            leftBar,
            rightBlock,
            player
        },
        data() {
            return {
                leftBarState: 'short',
                player: {
                    audio: document.createElement('audio'),
                    img: 'c',
                    title: 'BlurLyric',
                    artist: ['选择您的音乐']
                    
                },
            }
        },
    }
</script>

<template>
<topBar :leftBarState="leftBarState"></topBar>
<div class="bottom">
    <leftBar @leftBarChange="(newState)=>{leftBarState = newState}"></leftBar>
    <rightBlock></rightBlock> 
    <player :data="player"></player>
</div>


</template>

<style scoped>
    .bottom{
        margin-top: 5px;
        display: flex;
        height: calc(100vh - 38px - 10px);
        width: calc(100% + 14px);
        margin-left: -7px;
    }
</style>
