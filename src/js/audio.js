
export default {
    play,
    pause
}

function play() {
    document.querySelector('#audio').addEventListener('canplay', function () {
        document.querySelector('#audio').play();
    })
    document.querySelector('#audio').addEventListener('loadeddata', function () {
        if (document.querySelector('#audio').readyState >= 2) {
            document.querySelector('#audio').play();
        }
    })
    if (document.querySelector('#audio').readyState >= 2) {
        document.querySelector('#audio').play();
    }
}

function pause() {
    document.querySelector('#audio').pause()
}