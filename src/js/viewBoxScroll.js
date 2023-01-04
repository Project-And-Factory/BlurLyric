async function lunch() {
    let elbox = document.querySelector('.scrollBox')
    let el = document.querySelector('.viewBox')
    config.elbox = elbox
    config.el = el

    /**
     * 开始绑定
     */

    config.scrollY = 0
    /**
     * 滚轮
     */
    let wheelChange = (event) => {
        event.preventDefault();
        config.scrollY -= event.deltaY

        if (config.scrollY > 0) {
            config.scrollY = 0
        }

        let elHeight = -el.offsetHeight + elbox.clientHeight - 100
        if (config.scrollY < elHeight) {
            config.scrollY = elHeight
        }
        el.style.transform = "translateY(" + config.scrollY + "px)"
    }
    if (config.firstLoad == false) {
        elbox.addEventListener('wheel', wheelChange)
        config.firstLoad = true
    }

    el.style.transform = "translateY(" + config.scrollY + "px)"
}

async function onNewPage() {
    if (config.firstLoad == false) await lunch()

    config.el.setAttribute('anime',true)

    config.scrollY = 0
    config.el.style.transform = "translateY(" + config.scrollY + "px)"


    setTimeout(() => {
        config.el.setAttribute('anime',false)

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