<template>
        
    <div class="dlTopLab" style="user-select:none">
        <img :src="page.pic" alt=""  srcset="">
        <div class="dlTopLab-TitleLab">
            <h2>{{this.page.title}}</h2>
            <h3>by{{' '+page.creater.nickname}}</h3>
            <div class="linkbox bigger">
                <a style="user-select:none" @click="playThisPage()">
                    <svg style="transform: scale(1.6) " xmlns="http://www.w3.org/2000/svg" width="24" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg>
                </a>
            </div>
        </div>
    </div>
<h2>歌曲列表<a v-if="page.track[0]" style="font-size:0.7em;color: rgba(0,0,0,.5)">{{'  '+page.track.length}}首</a></h2>
        <div v-if="this.$parent.$parent.data.player.uiDisplay.mainDisplay != top" class="track playlist" style="user-select:none">
                <div  v-bind:class="'tracks ' + (item.id == this.$parent.$parent.id )"  v-for="(item,i) in page.track" :key="item.id">
                    <!--显示样式-->
                        <div @click="playTheOnce(i)">
                            <img class="track-img" alt="" v-lazy="item.al.picUrl + '?param=84y84)'" srcset="">
                            <div class="trackTitle">
                                <h1>{{item.name}} <a v-for="(alia,i) in item.alia" :key="i" style="color: rgba(44,62,80,0.5)"> {{alia}} </a></h1>
                                <h2><a v-for="(name) in item.ar" :key="name.id"> {{name.name}}</a></h2>
                            </div>
                        </div>

                        <div class="linkbox bigger">
                            <a v-if="(this.$parent.$parent.data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) != -1)" style="color:red;user-select:none" @click="this.$parent.$parent.loveMusic(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                            </a>
                            <a v-if="(this.$parent.$parent.data.musicListInfor.myLove.aRtrackIds.indexOf(item.id) == -1)" style="user-select:none" @click="this.$parent.$parent.loveMusic(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>  
                            </a>
                        </div>
                </div>
            </div>
</template>

<script>
import reTools from '../network/getData'
export default {
    name: 'detailList',
    data() {
        return {
            page:{
                id: this.$route.query.id ,
                pic: '',
                title: '稍等',
                content: '',
                creater: '',
                trackIds:'',
                aRtrackIds:[],
                track:[]
            }
        }
    },
    async created() {
        this.loadDeailList()
    },
    methods: {
        setTracks(num){
            this.$parent.$parent.changeTrack({tracks: this.page.track,num : num})
        },
        playThisPage(){
            this.setTracks(0)
        },
        playTheOnce(i){
            this.setTracks(i)
        },
        loadDeailList(){

            reTools.getData('/playlist/detail',{id:this.page.id,timetamp: (Number(new Date()))}).then(
                r=>{
                    this.page.pic = r.playlist.coverImgUrl;
                    this.page.title = r.playlist.name;
                    this.page.content = r.playlist.description
                    this.page.creater = r.playlist.creator
                    this.page.trackIds = r.playlist.trackIds
                    let trackIDList = ''

                    for (const num in this.page.trackIds) {
                        trackIDList += this.page.trackIds[num].id
                        this.page.aRtrackIds.push(this.page.trackIds[num].id)
                        if (num < this.page.trackIds.length - 1) {
                        trackIDList += ','
                        
                        }
                    }
                    reTools.getData('/song/detail',{ids:trackIDList,timetamp: (Number(new Date()))}).then(res=>{
                        this.page.track =res.songs
                    })

                }
            )
    
        }
    },
    watch:{
        $route:{
            handler: function (newVal){
                this.page.id = newVal.query.id
                this.loadDeailList()
                
            },
            deep: true
        }
    }

}
</script>

<style>

    @media (min-width: 950px) {
        .dlTopLab{
            --height: 250px;
            height: 250px;
            border-radius: 2vw;
            padding: 2vh 0 0 0;
            background: none;
            gap: 2vw;
            color: black;
        }
        .dlTopLab>img{
            height: var(--height);
            border-radius: 2vw;
        }
        .dlTopLab-TitleLab{

        }
        .dlTopLab-TitleLab>h2{
            font-size: 2.2em;
            color: black;
        }
        .dlTopLab-TitleLab>h3{
            font-size: 1em;
            margin-top: 2em;
            color: rgb(100,100,100);
        }
        .dlTopLab-TitleLab>.linkbox.bigger{
            position: absolute;
            top: 98%;
            overflow: visible;
            transform: translate(0,-100%);
        }
        .dlTopLab-TitleLab>.linkbox.bigger>a{
            background: rgba(230,230,230);
        }
    }
    .dlTopLab{
        display: flex;
        gap: 15px;
        padding: 15px;
        margin-bottom: 50px;
        border-radius: 1.25em ;height: 7em;background-color:#5080ff;overflow:hidden; 
    }
    .dlTopLab-TitleLab{
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100vw - calc(-7em - calc(-100px - calc(calc(0px - var(--paddingIndex)) - var(--paddingIndex)))));
    }
    .dlTopLab-TitleLab>*{
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 4px 0;
        color: white;
    }
        .dlTopLab-TitleLab>h3{
        color: #ffffff9a;
    }
    @media (max-width: 500px) {
        .dlTopLab-TitleLab > h2 {
            font-size: 1.15em;
            display: -webkit-box;
            --webkit-box-orient: vertical;
            --webkit-line-clamp: 2;
            text-overflow: clip;
            white-space: normal;
        }
        .dlTopLab-TitleLab > h3{
            font-size: 0.9em;
        }
        div.dlTopLab > .dlTopLab-TitleLab > .linkbox.bigger > a{
            padding: 5px 10px;
        }
    }

    .dlTopLab-TitleLab>.linkbox.bigger>a{
        margin-top: 3px;
        background-color: rgba(255, 255, 255, 0.8);
        
    }
    .track.playlist{
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
    }
    .track.playlist>.tracks{
        position: relative;
        background-image: linear-gradient(to right,#d1d1d1,#e5e5e5);
        border-radius: 11px;
        height: 48px;
        display: flex;
        max-width: calc(var(--paddingIndex-MaxWidth) / 1);
        justify-content: space-between;
        --thispadding: 8px;
        padding: 8px;
        flex-direction: row;
    }
    div.track.playlist>.tracks.true{
        background-image: linear-gradient(to right,#d1d1d1,#b8b5df);
    }
    .track.playlist>.tracks> div:nth-child(1){
        display: flex;
        width: 100%;
        gap: 8px;
        overflow: hidden;
    }
    .track.playlist>.tracks> div:nth-child(1)>.trackTitle{
    }
    .track.playlist>.tracks> div:nth-child(1)>.trackTitle>*{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .track.playlist>.tracks> div:nth-child(1)>.trackTitle>h1>a{
        font-size: 0.8em;
    }
    .track.playlist>.tracks> div:nth-child(1)>.trackTitle>h2>a{
        margin: 0 1em 0 0;
    }
    .track.playlist>.tracks> div:nth-child(1)>.track-img{
    user-select: none;

    height: 48px;
    width:48px;
    min-height:48px;
    min-width: 48px;
    border-radius: 9px;

    }
        .track.playlist>.tracks> div:nth-child(1)>.trackTitle>h1{
        font-size: 15px;
        margin: 5px 0 0 0;
       
    }
    .track.playlist>.tracks> div:nth-child(1)>.trackTitle>h2{
        font-size: 10px;
        margin: 2px 0 0 0;
    }
    @media (min-width: 950px) {
        .dlTopLab{
            --height: 250px;
            height: 250px;
            border-radius: 2vw;
            padding: 2vh 0 0 0;
            background: none;
            gap: 2vw;
            color: black;
        }
        .dlTopLab>img{
            height: var(--height);
            border-radius: 2vw;
        }
        .dlTopLab-TitleLab{

        }
        .dlTopLab-TitleLab>h2{
            font-size: 2.2em;
            color: black;
        }
        .dlTopLab-TitleLab>h3{
            font-size: 1em;
            margin-top: 2em;
            color: rgb(100,100,100);
        }
        .dlTopLab-TitleLab>.linkbox.bigger{
            position: absolute;
            top: 98%;
            overflow: visible;
            transform: translate(0,-100%);
        }
        .dlTopLab-TitleLab>.linkbox.bigger>a{
            background: rgba(230,230,230);
        }
    }
</style>