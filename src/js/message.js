import anime from 'animejs/lib/anime.es.js';

var config = {
    create(message){
        if(document.querySelector('#messageLab')){
            let doc = document,
            newElm = doc.createElement('div');
            newElm.innerText    = message;
            doc.querySelector('#messageLab').appendChild(newElm);
            newElm.style.animation = 'spawn 6s cubicBezier(.3, .5, .2, 1)';
            newElm.style.transform = 'translateY(30%) scale(1.05)';
            let animation = anime.timeline({
                easing: 'cubicBezier(.3, .5, .2, 1)',
                duration: 400,
            })
            animation.add({ 
                targets: newElm,
                opacity: 1,
                translateY: '0%',
                scale: 1
            }).add({
                targets: newElm,
                opacity: 0,
                translateY: '-30%',
                scale: 0.95
            },5000).finished.then(()=>{
                newElm.parentNode.removeChild(newElm)
            })

        }
    }
}

export default config