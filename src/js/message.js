var config = {
    spawn(message){
        if(document.querySelector('#messageLab')){
            let doc = document,
            newElm = doc.createElement('div');
            newElm.innerText    = message;
            doc.querySelector('#messageLab').appendChild(newElm);
            setTimeout(()=>{newElm.parentNode.removeChild(newElm)},6000)
        }
    }
}

export default config