import app from "../main.js";
var config = {
    offset: 0,
    now: 0,
    beformainDisplay: 'buttom',
    load() {
        this.tap = document.querySelector('.player-Mini-Title');
        this.elm = document.querySelector('#player')
        this.otherElm.playerMini = document.getElementsByClassName('player-Mini')[0]

        let mouseDownEvent = (event) => {
            document.querySelector("#player > div.player-Mini").style.zIndex = 99
            document.querySelector("#player > div.player-Mini").style.pointerEvents = 'none'

            let thisClick = event
            if (event.changedTouches) {
                thisClick = event.changedTouches[0]
            }
            this.beformainDisplay = app.data.player.uiDisplay.mainDisplay

            app.data.player.uiDisplay.mainDisplay = 'watting'

            document.querySelector('#player').style.transition = 'none'
            let boxPosition = this.elm.getBoundingClientRect();
            this.size = app.getWindowInfo();

            this.offset = thisClick.clientY - boxPosition.y
            let remove = (removeevent) => {
                let removeClick = removeevent
                if (removeevent.changedTouches) {
                    removeClick = removeevent.changedTouches[0]
                }
                changeProgress(thisClick)


                document.onmousemove = null;
                document.ontouchmove = null
                document.onmouseup = null;
                document.ontouchcancel = null;
                document.ontouchend = null



                document.querySelector('#player').style.transition = ''
                if (removeClick && thisClick.clientY - removeClick.clientY > 100) {
                    this.beformainDisplay = app.mainDisplayChange('top')
            document.querySelector("#player > div.player-Mini").style.zIndex = -1

                } else if (removeClick && thisClick.clientY - removeClick.clientY < -100) {
                document.querySelector("#player > div.player-Mini").style.zIndex = 99
                    this.beformainDisplay = app.mainDisplayChange('buttom')
                } else if (thisClick.clientY - removeClick.clientY != 0) {
                    app.mainDisplayChange(this.beformainDisplay)
                } else {
                    app.data.player.uiDisplay.mainDisplay = this.beformainDisplay
                }
            if(this.beformainDisplay == 'top'){
                document.querySelector("#player > div.player-Mini").style.zIndex = -1
            } else {
                // document.querySelector("#player > div.player-Mini").style.zIndex = 99
            }
            document.querySelector("#player > div.player-Mini").style.pointerEvents = 'auto'


            }
            let move = (event) => {
                if (event.buttons != 1 && !event.changedTouches) {
                    remove
                } else {
                    let thisClick = event
                    if (event.changedTouches) {
                        thisClick = event.changedTouches[0]
                    }
                    changeProgress(thisClick)

                }

            }
            document.onmousemove = move;
            document.ontouchmove = move
            document.onmouseup = remove;
            document.ontouchcancel = remove;
            document.ontouchend = remove
        }
        this.tap.onmousedown = mouseDownEvent;
        this.tap.ontouchstart = mouseDownEvent;
        document.querySelector('.player-Title.displayTop').onmousedown = mouseDownEvent;
        document.querySelector('.player-Title.displayTop').ontouchstart = mouseDownEvent;
        document.querySelector('.left-sideImage').onmousedown = mouseDownEvent;
        document.querySelector('.left-sideImage').ontouchstart = mouseDownEvent
        document.querySelector('.player-Title.displayTop').onmousedown = mouseDownEvent;
        document.querySelector('.player-Title.displayTop').ontouchstart = mouseDownEvent;
        document.querySelector('.player-Title.lowWidthDisplay').onmousedown = mouseDownEvent;
        document.querySelector('.player-Title.lowWidthDisplay').ontouchstart = mouseDownEvent;

    },
    tap: '',
    elm: '',
    otherElm: {
        playerMini: ''
    },
    size: '',
}


function changeProgress(event) {

    let top = (event.clientY - config.offset);
    let cacheMaxTop = config.size.bodyHeight - config.otherElm.playerMini.offsetHeight

    let persent = top / cacheMaxTop
    config.otherElm.playerMini.style.opacity = persent.toFixed(2)
    if (top < 0) top = 0
    if (top > cacheMaxTop) top = cacheMaxTop

    config.now = top
    config.elm.style.top = top + 'px'

}
export default config