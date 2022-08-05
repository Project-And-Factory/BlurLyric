    var data

    function load() {

        data = {
            audio: document.querySelector('audio'),
            progress: document.querySelector('.box-progressbar'),
            canChange: false
        }
        data.progress.onclick = function(event){changeProgress(event)}
        data.progress.onmousedown =function (event) {
            changeProgress(event)
            data.canChange = true;
        }
        document.querySelector('#player').onmouseup = function () {
            data.canChange = false;
        }
        document.querySelector('#player').onmousemove = function (event) {
            if(data.canChange == true) changeProgress(event)
        }

        function changeProgress(event) {
            let box = data.progress,
                boxPosition = box.getBoundingClientRect();


                let tempData = {
                    percent: (event.x - boxPosition.x) / boxPosition.width
                }
                if (tempData.percent < 0) tempData.percent = 0

                document.querySelector('.box-progressbar').style = '--musicProgressPercent:' + (tempData.percent)
                changeMusicTimeOfProgress(tempData.percent)

        }
    }


    function changeMusicTimeOfProgress(percent) {
        data.audio.currentTime = data.audio.duration * percent
    }
    export default {
        data,
        load
    }