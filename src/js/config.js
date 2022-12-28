import cookies from 'js-cookie'
import reTools from '../network/getData'


let setting = {
    id: '0',
    config: {
        configVersion: '1.3',
        lyricSet: {
            dur: 600,
            text: '最高',
            funcBlur: true,
            funcDelay: true,
            animeFontSize: false
        },
        useBlurBackground: true

    }
}

let methods = {
    lunch() {

        console.log(cookies.get('blurlyricid'))
        if (cookies.get('blurlyricid') == undefined) {
            this.createUser()
        } else {
            this.refuseConfig()
        }
    },
    refuseConfig() {
        reTools.getData('/blurlyric/getUser', {
            id: cookies.get('blurlyricid')
        }).then(r => {
        console.log(r);

            if (r.data.code != 400 && r.data.config.configVersion != setting.config.configVersion) {
                setting.id = r.data.id
                this.pushingconfig()
                return
            }
            if (r.data.code == 400 || setting.config == undefined) {
                this.createUser()
            }

            setting = r.data
            console.log(setting);

        })
    },
    createUser(){
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
            res: setting.config
        })
    },
    editconfig(func) {
        setting.config = func(setting.config)
        this.pushingconfig()
    }
}

let  settingTemperture = {
        lyricSet: {
            funcBlur: {
                true: function (i, lyricNum) {
                    //return ''
                    let offset = i - lyricNum
                    if (offset == 0) return 'blur(0vh)';
                    return 'blur(' + (0.7 - (0.5 ** Math.abs(offset))) + 'vh)'
                },
                false: () => {
                    return ''
                }
            },
            funcDelay: {
                true: (offset) => {
                    if (offset < -2 || offset > 7) return 0
                    return 0.066 * setting.config.lyricSet.dur * offset * (0.93 ** Math.abs(offset));
                    //  return 0;
                },
                false:(offset)=>{
                    return 10 * offset
                }
            }
        }
    }
export default {
    setting,
    methods,
    settingTemperture
}