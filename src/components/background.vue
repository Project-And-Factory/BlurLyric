<script>
            import config from '../js/config.js'

    export default{
        data(){
            return{
                anime: undefined,
                config,
                position:[
                  {},
                  {},
                  {},
                  {}
                ],
                dynFunctionRunning:false
            }
        },
        created(){
          this.position = []
            for (let i = 0; i < 4; i++) {
              this.position.push({
                '--random-x': (Math.random() * 100) + '%',
                '--random-y':(Math.random() * 100) + '%'
              })
            }
            setTimeout(() => {

            if(this.dynFunctionRunning ==false&&this.mainDisplay!='buttom'&&config.setting().config.useAnimeBackground){
                  this.random()
            }
          },3000)

        },
        methods:{
          random(){
            this.dynFunctionRunning = true
            this.position = []
            for (let i = 0; i < this.$refs.block.length + 1; i++) {
              this.position.push({
                '--random-x': (Math.random() * 100) + '%',
                '--random-y':(Math.random() * 100) + '%'
              })
            }
            setTimeout(() => {
              if(this.mainDisplay!='buttom'&&config.setting().config.useAnimeBackground){
                this.random()
              } else {
                this.dynFunctionRunning =false
              }
            }, 6*1000);
          }
        },
        props: {
            imgSrc: Object,
            mainDisplay: Object,
            colorData: Object,
            dynamic: Boolean
        },
        watch: {
            mainDisplay:{
              handler: function (newVal,oldVal) {
                    if(this.dynFunctionRunning == false&&newVal!='buttom'&&config.setting().config.useAnimeBackground){
                      this.$nextTick(()=>{
                        this.random()
                      })
                    }
                },
                deep: true
            }
        }
        
    }
    

</script>

<template>
    <div  v-if="(mainDisplay != 'buttom')" :style="{background: (colorData)?colorData[0].color:null}"  v-bind:class="['player-background',(mainDisplay,config.setting().config.useAnimeBackground == true)?'dyn':'']">
      <!-- {{ colorData }} -->
      <div v-for="n in 4" ref="block" :style="{
        backgroundImage: 'url(' + imgSrc + '?param=128y128'+')',
        ...position[n]
      }">
        
    </div>
      </div>
</template>

<style>

</style>