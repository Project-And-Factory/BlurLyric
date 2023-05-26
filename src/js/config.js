// import { set } from 'animejs'
import cookies from 'js-cookie'
import reTools from '../network/getData'


var setting = {
    id: '0',
    config: {
        configVersion: '1.6',
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
    }
}

var methods = {
    lunch() {

        if (cookies.get('blurlyricid') == undefined) {
            this.createUser()
        } else {
            this.refuseConfig()
        }
    },
    getconfig(){
        return (JSON.parse(localStorage.getItem("blurlyricConfig"))||(setting))
    },
    async refuseConfig() {
        reTools.getData('/blurlyric/getUser', {
            id: cookies.get('blurlyricid')
        }).then(r => {

            if (r.data.code != 400 && r.data.config.configVersion != setting.config.configVersion) {
                this.createUser()
                return
            }
            if (r.data.code == 400 || setting.config == undefined) {
                this.createUser()
                return
            }

            localStorage.setItem("blurlyricConfig", JSON.stringify(r.data));
        })
    },
    async createUser() {
        reTools.getData('/blurlyric/createUser').then(res => {
            cookies.set('blurlyricid', res.data.id, {
                expires: new Date(2040, 0, 1)
            })
            setting.id = res.data.id
            this.pushingconfig()
        })
    },
    pushingconfig() {
        reTools.getData('/blurlyric/writeUser', {
            id: cookies.get('blurlyricid'),
            res: this.getconfig().config
        })
    },
    editconfig(func) {
        let nowsetting = this.getconfig()
        setting.config = func(nowsetting)
        localStorage.setItem("blurlyricConfig",JSON.stringify(setting))

        this.pushingconfig()
    }
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
                return 52 * (offset + 2);
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