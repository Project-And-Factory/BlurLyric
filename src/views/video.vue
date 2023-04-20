<script>
    import reTools from '../network/getData'
    import app from '../main.js'
    import Plyr from 'plyr'
    import '../plyr.css'

    export default {
        name: 'video',
        data() {
            return {
                page: {
                    id: this.$route.query.id,
                    type: this.$route.query.type,
                    detail: {},
                    url: ''
                },
                player: null
            }
        },
        async created() {
            this.requestData()
        },
        methods: {

            async requestData() {
                let appcache = app.cacheData('mv' + this.page.id)
                if (appcache != undefined) {
                    this.page = appcache
                    return
                } else {
                    await reTools.getData('/' + this.page.type + '/detail', {
                        [(this.page.type == 'mv') ? "mvid" : "id"]: this.page.id
                    }).then(res => {
                        this.page.detail = res
                    })


                    await reTools.getData('/' + this.page.type + '/url', {
                        id: this.page.id
                    }).then(res => {
                        this.page.url = (this.page.type == 'mv') ? res.data.url : res.urls[0].url

                        if (this.page.type == 'mv') {
                            this.player = new Plyr("#video", {
                                title: this.page.detail.data.name,
                                sources: [
                                    {src: this.page.url
                                    }
                                ]
                            })
                        } else {
                            this.player = new Plyr("#video", {
                                title: this.page.detail.data.title,
                                sources: [
                                    {src: this.page.url
                                    }
                                ]
                            })
                        }
                    })

                    app.cacheData('mv' + this.page.id, this.page)
                }

            }
        },
        watch: {
            $route: {
                handler: function (newVal) {
                    if (this.$route.name == 'mv') {
                        this.page.id = newVal.query.id
                        this.page.type = newVal.query.type

                        this.requestData()
                    }
                },
                deep: true
            },
        }
    }
</script>

<template>
    <h1 v-if="page.detail.data" style="margin:.3em 0;">{{(this.page.type == 'mv')?page.detail.data.name:page.detail.data.title}}</h1>
    <div v-if="(this.page.type == 'video')" style="color:#777;margin:0 0 .7em 0">by {{page.detail.data.creator.nickname}}</div>
<<<<<<< Updated upstream
    <div class="container" v-if="(this.page.type == 'mv')&&page.detail.data">
        <div style="float: left;">创作者:</div>
            <a @click="this.$router.push({
                name: 'artist',
                query: {
                id: item.id
                }
            })" v-for="(item) in page.detail.data.artists" style="color:#777;margin:0 0 .7em 0" class="artistText" :key="item.id">
                    {{item.name}}
            </a>
        </div>

=======
    
    <div class="creater" v-if="(this.page.type == 'mv')&&page.detail.data">
        创作者：
        <div>
            <div @click="this.$router.push({
            name: 'artist',
            query: {
              id: item.id
            }
          })" v-for="(item) in page.detail.data.artists" style="color:#777;margin:0 0 .7em 0" class="artistText" :key="item.id">
                {{item.name}}
        </div>
        </div>
    </div>

        
    
    
>>>>>>> Stashed changes
    <div style="clear:both;overflow: hidden;margin-top: 1em;border-radius: calc(1vw + .8vh);">
    <video   :src="this.page.url" id="video"></video>
</div>
</template>
<style scoped>
<<<<<<< Updated upstream
.container {
    float: left;
}
</style>
=======
    .creater>*{
        float: left;
    }
    </style>
>>>>>>> Stashed changes
