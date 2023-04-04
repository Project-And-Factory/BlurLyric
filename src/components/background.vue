<script>
            // import app from '../main.js'
            import config from '../js/config.js'

            // import anime from 'animejs/lib/anime.es.js';
    export default{
        data(){
            return{
                anime: undefined,
                config,
                // app
            }
        },
        created(){
        },
        methods:{

        },
        props: {
            imgSrc: Object,
            mainDisplay: Object,
            colorData: Object,
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
    <div  v-if="(mainDisplay != 'buttom')" :style="{background: (colorData)?colorData[0].color:null}"  v-bind:class="['player-background',(mainDisplay,config.setting().config.useAnimeBackground == true)?'dyn':'']">
      <!-- {{ colorData }} -->
      <div :style="{
        backgroundImage: 'url(' + imgSrc + '?param=128y128'+')',
      }">
        
      </div>
      <div :style="{
        backgroundImage: 'url(' + imgSrc + '?param=128y128'+')',
      }">
        
    </div>
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