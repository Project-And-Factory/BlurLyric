import app from "../App.vue";
var founding = false

var data

    function setProgressBar(){
        let elems = document.querySelectorAll('.box-progressbar')

        for(let i = 0; i < elems.length; i++) {

            let element = elems[i]
            
            elems[i].onclick = (event)=>{changeProgress(event,element)}
            elems[i].onmousedown =(event)=>{
                changeProgress(event,element)
                data.canChange = true;
            }
            document.querySelector('#player').onmouseup = ()=>{
                data.canChange = false;
            }
            document.querySelector('#player').onmousemove = (event)=>{
                if(data.canChange == true && event.buttons == 1) changeProgress(event,element)
            }


        }
    }
    function load(audioELement) {
        data=null;
        data = {
            audio: audioELement || document.querySelector('audio'),
            elms: [],
            canChange: false
        }
        
        loopProgressElement()
    }
    function loopProgressElement() {
        if(founding == true) return
        let func = ()=> {
            let tempelms = document.querySelectorAll('.box-progressbar')
            if (tempelms.length == data.elms.length) {
                setProgressBar()
            }
            data.elms = tempelms
            setTimeout(() => {
                func()
            }, 10000);
        }
        func()

        founding = true
    }
    function changeProgress(event,box) {

        let    boxPosition = box.getBoundingClientRect();


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
        load
    }