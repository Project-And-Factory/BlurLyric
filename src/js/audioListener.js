export default {
    listen,
}

import app from '../main.js'

function listen(elm) {
    if(config.elm != null){
        config.elm.removeEventListener("playing", playing);
        config.elm.removeEventListener("pause", pause);
        config.elm.removeEventListener('loadeddata',  loadeddata)
        config.elm=null
    }
    config.elm = elm
    elm.addEventListener("playing", playing);
    elm.addEventListener('loadeddata',  loadeddata)
    elm.addEventListener("pause", pause);
}

function playing(){
    app.state.playing = true;
    app.lyricSet(true)
}

function pause(){
    app.state.playing = false;
    if (document.getElementById('lyrics'))
        anime({
        targets: document.getElementById('lyrics').getElementsByTagName("li"),
        filter: 'blur(0vh)',
        color: 'rgb(0, 0, 0, .15)',
        duration: 500,
        easing: 'cubicBezier(.3, .5, .2, 1)'
    })
}

function loadeddata(){
    if (config.elm.readyState >= 2) {
        app.data.player.uiDisplay.duration = Math.floor(config.elm.duration)
      }
}
var config = {
    elm: null
}