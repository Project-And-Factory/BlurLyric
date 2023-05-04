import app from '../main'
export default  {
    create(tap,elm, func) {
        let position = elm.getBoundingClientRect()


        let infor = {
            top: position.top,
            left: position.left,
            offset: {
                top: position.top - tap.offsetHeight,
                left: position.left
            },
            clickOffset: {
                top: 0,
                left: 0,
            },
            onclickIng: false
        }
        let events = {
            down: (e) => {
                e.preventDefault();
                infor.clickOffset.left = e.layerX;
                infor.clickOffset.top = e.layerY;
                document.addEventListener('mousemove', events.move)
                document.addEventListener('mouseup', events.up)
                document.body.onselectstart = document.body.ondrag = function () {
                    return false
                }
            },
            move: (e) => {
                e.preventDefault();
                if (e.buttons != 1) {
                document.removeEventListener('mousemove', events.move)
                document.removeEventListener('mouseup', events.up)
                // document.body.onselectstart = document.body.ondrag = function () {
                //     return true
                // }    
                return
            }

                infor.offset.top = e.clientY - infor.clickOffset.top;
                infor.offset.left = e.clientX - infor.clickOffset.left;
                if (infor.offset.top < 0) infor.offset.top = 0
                if (infor.offset.left < 0) infor.offset.left = 0

                elm.style.top = infor.offset.top + 'px'
                elm.style.left = infor.offset.left + 'px'
            },
            up: (e) => {
        document.removeEventListener('mousemove', events.move)
        document.removeEventListener('mouseup', events.up)
        document.body.onselectstart = document.body.ondrag = function () {
                    return true
                }
            }
        }

        tap.addEventListener('mousedown', events.down)

        tap.ontouchstart = events.down
        document.ontouchmove = events.move
        document.ontouchend = events.up

        func()
    },
    /**
     * 
     * @param {track} item 
     */
    trackElm(item){

    },
    musicPanel:{
        display(event){
            let box = document.querySelector('#musicPanel')
            box.style.display = (box.style.display == 'none')?'block': 'none'
                box.style.left = event.x + 'px'
                box.style.top = event.y + 'px'

        },
        volume:{
            mousedown(e){
                let changeProgress=(a,b)=>{
                    if(a<0) a = 0

                    let progress = (a/b)

                    if(progress>1) progress = 1
                    app.audio.volume = progress
                    app.state.volume = progress

                }
                document.querySelector('body').style.userSelect = 'none'
                let box = document.querySelector('#musicPanel #volum'),
                boxPosition = box.getBoundingClientRect()
                changeProgress(e.offsetX,boxPosition.width)

                let mousemove = (event)=>{
                    if (event.buttons == 1) {
                        changeProgress(event.x-boxPosition.x,boxPosition.width)
                    } else {
                        up()
                    }
                }

                let up = ()=>{
                    document.removeEventListener('mousemove',mousemove)
                    document.removeEventListener('mouseup',up)
                    document.querySelector('body').style.userSelect = ''
                }


                document.addEventListener('mousemove',mousemove)
                document.addEventListener('mouseup',up)

            }
        }
    }
}