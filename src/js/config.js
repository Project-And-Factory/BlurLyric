// import { set } from 'animejs'
import cookies from 'js-cookie'
import reTools from '../network/getData'
import app from '../main'

var setting = {
    id: '0',
    config: {
        configVersion: '1.7',
        lyricSet: {
            dur: 450,
            text: '最高',
            funcBlur: true,
            funcDelay: true,
            animeFontSize: false,
            maxfps: false
            

        },
        useAnimeBackground: false,
        useTransitionNextMusic: false
    },
    playList:{
        num: 0,
        tracks: []
    }
}

let cache = []

var methods = {
    lunch() {

        if (cookies.get('blurlyricid') == undefined) {
            this.createUser()
        } else {
            this.refuseConfig()
        }
    },
    getconfig(cmd,func){
        if(cmd = 'keepListenning'){
            cache.push(func)
        }
        return (  JSON.parse(localStorage.getItem("blurlyricConfig")) || (setting))
    },
    async refuseConfig() {
        reTools.getData('/blurlyric/getUser', {
            id: cookies.get('blurlyricid')
        }).then(r => {
            // console.log(r);
            if (r.data.code != 400 && r.data.config.config.configVersion != setting.config.configVersion) {
                this.createUser()
                return
            }
            if (r.data.code == 400 || setting.config == undefined) {
                this.createUser()
                return
            }

            localStorage.setItem("blurlyricConfig", JSON.stringify(r.data.config));
            setting.config = r.data.config.config
            // if(r.data.config.playList.tracks.length>1){
            //     app.changeTrack({
            //         num:r.data.config.playList.num,
            //         tracks:r.data.config.playList.tracks
            //     })
            // }
            
        })
    },
    async createUser() {
        reTools.getData('/blurlyric/createUser').then(res => {
            cookies.set('blurlyricid', res.data.id, {
                expires: new Date(2040, 0, 1)
            })
            setting.id = res.data.id
            this.pushingconfig('force')
        })
    },
    pushingconfig(value) {
        reTools.getData('/blurlyric/writeUser', {
            id: cookies.get('blurlyricid'),
            res: (value == 'force')?(setting):this.getconfig().config,
            // playList: setting.playList
        })
        // reTools.postData('/blurlyric/writeUserPlaylist', {
        //     id: cookies.get('blurlyricid'),
        //     playList: setting.playList
        // },{
        //     "Content-Type":"application/json"
        // })
    },
    editconfig(func) {
        let nowsetting = this.getconfig()
        setting.config = func(nowsetting)
        localStorage.setItem("blurlyricConfig",JSON.stringify(setting))
        for (let index = 0; index < cache.length; index++) {
            const func = cache[index];
            if( isFunction(func)) func(setting)
        }
        this.pushingconfig(setting.config)
    },
    
    editPlaylist(func) {
        let nowsetting = this.getconfig()
        setting.playList = func(nowsetting.playList)
        localStorage.setItem("blurlyricConfig",JSON.stringify(setting))

        this.pushingconfig()
    }
}
function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]'
}
var settingTemperture = {
    lyricSet: {
        funcBlur: {
            true: function (i, lyricNum) {
                //return ''
                let offset = i - lyricNum
                if (offset == 0) return 'blur(0vh)';
                let value = (0.7 - (0.5 ** Math.abs(offset)))
                if(value<0.5){
                    return 'blur(' + value + 'vh)'
                }else{
                    return 'blur(' + 0.5 + 'vh)'
                }
                
                
            },
            false: () => {
                return ''
            }
        },
        funcDelay: {
            true: (offset) => {
                if (offset < -2 || offset > 7) return 0
                return 50 * (offset + 2);
                // return Math.floor(64 * ((offset - 1) * (0.9 ** Math.abs(offset -3))));
            },
            false: (offset) => {
                return 22 * offset
            }
        }
    }
}

export default {
    
    setting:methods.getconfig,
    methods,
    settingTemperture,
}