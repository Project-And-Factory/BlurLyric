<script>
    import app from '../main.js'


    export default{
        data(){
            return{
                isdisplay: false,
                app:{formTime:app.formTime},
                height: 66
            }
        },
        methods:{
            check(){
                if(!this.$refs) return false
                this.isdisplay = ( this.height * this.i < app.state.scrollDisplayOffsetTop) && ( this.height * (this.i+1) > app.state.scrollTop - app.state.scrollHeight)
            }
        },
        props: {
            item: Object,
            i:Number,
            state: Object
        },
        watch:{
            state: {
                handler: function (newVal,oldVal) {
                    this.height= this.$refs.mytrack.offsetHeight
                    this.check()
                },
                deep: true
            }
        },
        created(){
            this.$nextTick(()=>{
                this.check()
            })
        }
    }

</script>

<template>
        <div ref="mytrack" class="tracks" >
            <div v-if="isdisplay"  class="infor">
                <div class="num">{{i + 1}}</div>
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
                <div class="trackAl" >
                    <div @click="this.$router.push({
            name: 'album',
            query: {
              id: item.al.id
            }
          })">{{ item.al.name}}</div>
                </div>
            </div>
            <div v-if="isdisplay" class="linkbox bigger">
                <a @click="app.pushTrack(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </a>
            </div>
            <div v-if="isdisplay" class="time">
                {{ app.formTime(Number((item.dt * 0.001).toFixed(0))) }}
            </div>
        </div>
</template>