<script>
    import topBar from './components/topBar.vue'
    import rightBlock from './components/rightBlock.vue'
    import leftBar from './components/leftBar.vue'
    import player from './components/player.vue'


    let lastResizeTime = Date.now()
    // 定义窗口大小改变事件
    window.addEventListener("resize",(event)=>{
        lastResizeTime = event.timeStamp
        setTimeout(() => {
            if(lastResizeTime == event.timeStamp){
                for (let index = 0; index < resizeDoList.length; index++) {
                    try {
                        resizeDoList[index]();
                    } catch (error) {
                        console.log('注册的resizeEvent执行失败',error);
                    }
                    
                }
            }
        }, 200);
    })
    let resizeDoList = [

    ]
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
                    artist: ['选择您的音乐'],
                    dur: 300,
                    cur: 20,
                    playmode: 'repeat' // shuffle 随机播放 repeat 列表重复 reapeat-1 重复播放一个
                },
                appstate: {
                    isfullscreen: false
                }
            }
        },
        methods:{
            changePlayMode() {
                switch (this.player.playmode) {
                    case 'repeat':
                        this.player.playmode = 'repeat-1'
                        
                        break;
                    case 'repeat-1':
                        this.player.playmode = 'shuffle'
                        
                        break;
                    case 'shuffle':
                        this.player.playmode = 'repeat'
                        
                        break;
                
                    default:
                        break;
                }
                
            },
            registerResizeEvent(func){
                resizeDoList.push(func)
            }
        }
    }
</script>

<template>
<topBar :leftBarState="leftBarState"></topBar>
<div class="bottom">
    <leftBar @leftBarChange="(newState)=>{leftBarState = newState}"></leftBar>
    <rightBlock></rightBlock> 
    <player @registerResizeEvent="registerResizeEvent" @changePlayMode="changePlayMode" :appstate="appstate" :data="player"></player>
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
