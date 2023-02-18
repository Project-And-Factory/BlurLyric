<script>

    export default{
        data(){
            return{}
        },
        methods:{

        },
        props: {
            lyric: Object,
            audio: Object
        }
    }

</script>

<template>
    <div id="lyric">
        <ul id="lyrics" :style="'--dur:'+config.setting().config.lyricSet.dur +  'ms'" ref="lyricBox"
            v-if="data.player.musicCache[id]">
            <li @click="audio.currentTime = item.t" v-for="(item) in this.data.player.musicCache[id].lyric.ms"
            v-bind:key="item.t">
            <h1>{{item.c}}</h1>
            <h2 v-if="(state.lyricUse !=false&&item[state.lyricUse+'C'] != undefined)">{{item[state.lyricUse+'C']}}</h2>
            <!-- <div>{{formTime(parseInt(item.t))}}</div> -->
            </li>
        </ul>
    </div>
</template>