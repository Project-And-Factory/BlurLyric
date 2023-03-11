<script>
            // import app from '../main.js'
            import config from '../js/config.js'

            // import anime from 'animejs/lib/anime.es.js';
    export default{
        data(){
            return{
                anime: undefined,
                config
            }
        },
        created(){
        },
        methods:{

        },
        props: {
            imgSrc: Object,
            mainDisplay: Object,
            dynamic: Boolean
        },
        watch: {
            mainDisplay(newVal){
                // if(newVal != 'buttom'){
                //     if(this.anime = undefined){
                //         this.anime = anime({
                //             targets: '.player-background',
                //             rotate:[
                //                 {
                //                     value: '180deg',
                //                     duration: 60 * 1000
                //                 },
                //                 {
                //                     value: '360deg',
                //                     duration: 60 * 1000
                //                 }
                //             ],
                //             easing: 'linear',
                //             loop: true
                //         })
                //     }
                //     this.anime.play()
                // } else {
                //     this.anime.pause()
                // }
                // console.log(anime);
            }
        }
        
    }
    

</script>

<template>
    <div v-if="(mainDisplay != 'buttom')"  v-bind:class="['player-background',(mainDisplay,config.setting().config.useAnimeBackground == true)?'dyn':'']">
      <div :style="{
        backgroundImage: 'url(' + imgSrc + '?param=128y128'+')',
      }">
        
      </div>
      <div :style="{
        backgroundImage: 'url(' + imgSrc + '?param=128y128'+')',
      }">
        
    </div>
      </div>
</template>

<style>

</style>