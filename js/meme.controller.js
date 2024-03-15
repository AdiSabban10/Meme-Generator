'use strict'

let gElCanvas
let gCtx

renderMeme()

function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const elImg = new Image()
    // elImg.src = 'img/5.jpg'
    elImg.src = gImgs[0].url
    
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



