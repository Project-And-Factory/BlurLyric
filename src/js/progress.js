import app from "../App.vue";
var founding = false

var data

function setProgressBar() {
    let elems = document.querySelectorAll('#audioProgress')

    for (let i = 0; i < elems.length; i++) {

        let element = elems[i]

        elems[i].onclick = (event) => {
            changeProgress(event, element)
        }
        elems[i].onmousedown = (event) => {
            event.preventDefault();
            changeProgress(event, element)
            data.canChange = true;
            document.onmouseup = () => {
                event.preventDefault();
                data.canChange = false;
                document.onmouseup = function (){}
                document.onmousemove = function (){}
            }
            document.onmousemove = (event) => {
                event.preventDefault();
                if (data.canChange == true && event.buttons == 1) changeProgress(event, element)
            }
        }



    }
}

function load(audioELement) {
    data = null;
    data = {
        audio: audioELement || document.querySelector('audio'),
        elms: [],
        canChange: false
    }

    bind()
}

function bind() {
    let tempelms = document.querySelectorAll('#audioProgress')
    if (tempelms.length == data.elms.length) {
        setProgressBar()
    }
    data.elms = tempelms

}

function changeProgress(event, box) {

    let boxPosition = box.getBoundingClientRect();


    let tempData = {
        percent: (event.x - boxPosition.x) / boxPosition.width
    }
    if (tempData.percent < 0) tempData.percent = 0

    box.style = '--musicProgressPercent:' + (tempData.percent)
    changeMusicTimeOfProgress(tempData.percent)

}

function changeMusicTimeOfProgress(percent) {
    if (!data.audio) {
        return
    }
    data.audio.currentTime = data.audio.duration * percent
}


export default {
    data,
    load,
    bind
}