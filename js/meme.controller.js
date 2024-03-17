'use strict'

let gElCanvas
let gCtx


function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    const gMeme = getMeme()
    
    const elImg = new Image()
    elImg.src = gImgs[gMeme.selectedImgId].url
    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        
        const txt = gMeme.lines[0].txt
        const textSize = gMeme.lines[0].size
        gCtx.font = 'bold ' + textSize + 'px Arial'
        gCtx.fillStyle = gMeme.lines[0].color
        gCtx.textAlign = 'center'
        gCtx.fillText(txt, gElCanvas.width / 2, 40)
    }
}


function onAddTxt(elTxt) {
    const txt = elTxt.value
    setLineTxt(txt)
    renderMeme()
}



