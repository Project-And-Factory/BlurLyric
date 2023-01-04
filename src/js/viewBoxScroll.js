async function lunch() {
    let elbox = document.querySelector('.scrollBox')
    let el = document.querySelector('.viewBox')
    config.elbox = elbox
    config.el = el

    /**
     * 开始绑定
     */

    config.scrollY = 0

    var timeout = 0
    /**
     * 滚轮
     */
     let giveOffset = () => {
        let elHeight = -el.offsetHeight + elbox.clientHeight - 100

        // if(config.scrollY == elHeight || config.scrollY == 0) return
        if (config.scrollY > 0) {
            config.scrollY = 0
        }

        if (config.scrollY < elHeight) {
            config.scrollY = elHeight
        }

        el.style.transform = "translateY(" + config.scrollY + "px)"

    }
    let wheelChange = (event) => {
        //取消原本的行为
        event.preventDefault();
        config.scrollY -= event.deltaY
        let nowTime = new Date().getTime()

        if((nowTime - timeout) < 64){
            //小于4帧数，节约看情况
            setTimeout(() => {
                //若在四帧内的滚动过了，那就不叠加
                if(timeout>nowTime){

                } else {
                //若在四帧内的滚动没过，那就叠加一次
                    giveOffset()
                    timeout=nowTime
                }
            }, 100);
        } else {

            //大于4帧，直接运算
            giveOffset()
            timeout=nowTime
        }
    }
    if (config.firstLoad == false) {
        elbox.addEventListener('wheel', wheelChange)
        config.firstLoad = true
    }

    el.style.transform = "translateY(" + config.scrollY + "px)"
}
var lastnewpagetimeout = new Date()
async function onNewPage() {

    if (config.firstLoad == false) await lunch()

    config.el.setAttribute('anime',true)

    config.scrollY = 0
    config.el.style.transform = "translateY(" + config.scrollY + "px)"

    let temptime = new Date()
    lastnewpagetimeout = temptime

    setTimeout(() => {
        if(lastnewpagetimeout == temptime) config.el.setAttribute('anime',false)
        

    }, 500);
}
var config = {
    elbox: document.querySelector('.scrollBox'),
    el: document.querySelector('.viewBox'),
    firstLoad: false,
    scrollY: 0
}

export default {
    lunch,
    config,
    onNewPage
}

function bind() {

}