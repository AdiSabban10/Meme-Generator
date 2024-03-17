'use strict'

let gElCanvas
let gCtx


function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    const meme = getMeme()
    const imgs = getImgs()
    
    const elImg = new Image()
    elImg.src = imgs[meme.selectedImgId].url
    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        
        const txt = meme.lines[0].txt
        const textSize = meme.lines[0].size
        gCtx.font = 'bold ' + textSize + 'px Arial'
        gCtx.strokeStyle = meme.lines[0].outlineColor
        gCtx.fillStyle = meme.lines[0].fillColor
        gCtx.textAlign = 'center'
        gCtx.fillText(txt, gElCanvas.width / 2, 40)
        gCtx.strokeText(txt, gElCanvas.width / 2, 40)
    }
}


function onAddTxt(elTxt) {
    const txt = elTxt.value
    setLineTxt(txt)
    renderMeme()
}

function onDownloadCanvas(elLink) {
	elLink.href = '#'       // Clear the link
	const dataUrl = gElCanvas.toDataURL()

	elLink.href = dataUrl
	elLink.download = 'my-img'
}

function onSetOutlineColor(elColor){
    const color = elColor.value

    document.querySelector('.fa-brush').style.color = color
    
    setOutlineColor(color)
    renderMeme()
}

function onSetFillColor(elColor){
    const color = elColor.value
    
    document.querySelector('.fa-fill-drip').style.color = color
    
    setFillColor(color)
    renderMeme()
}

function onUpdateLineSize(dir) {
    updateLineSize(dir)
    renderMeme()
}




