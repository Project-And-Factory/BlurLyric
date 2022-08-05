    var data

    function load() {

        data = {
            audio: document.querySelector('audio'),
            progress: document.querySelector('.box-progressbar'),
            canChange: false
        }

        data.progress.onmousedown = function () {
            data.canChange = true;
            console.log('can change');
        }
        document.onmouseup = function () {
            data.canChange = false;
            console.log('not can change');
        }
        document.onmousemove = function (event) {
            changeProgress(event)
        }

        function changeProgress(event) {
            let box = data.progress,
                boxPosition = box.getBoundingClientRect();

            if (box && data.canChange == true) {
                let tempData = {
                    percent: (event.x - boxPosition.x) / boxPosition.width
                }
                if (tempData.percent < 0) tempData.percent = 0

                document.querySelector('.box-progressbar').style = '--musicProgressPercent:' + (tempData.percent)
                changeMusicTimeOfProgress(tempData.percent)
            }
        }
    }


    function changeMusicTimeOfProgress(percent) {
        data.audio.currentTime = data.audio.duration * percent
        data.audio.play()
    }
    export default {
        data,
        load
    }