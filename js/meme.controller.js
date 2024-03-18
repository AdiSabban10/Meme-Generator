'use strict'

let gElCanvas
let gCtx

function  renderEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    const meme = getMeme()
    const imgs = getImgs()
    
    const elImg = new Image()
    elImg.src = imgs[meme.selectedImgId].url
    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        
        meme.lines.forEach((line, index) => {
            const txt = line.txt
            const textSize = line.size
            gCtx.font = 'bold ' + textSize + 'px Arial'
            gCtx.strokeStyle = line.outlineColor
            gCtx.fillStyle = line.fillColor
            gCtx.textAlign = 'center'
            
            const yPos = (index + 1) * (gElCanvas.height / (meme.lines.length + 1))
            
            gCtx.fillText(txt, gElCanvas.width / 2, yPos)
            gCtx.strokeText(txt, gElCanvas.width / 2, yPos)
            
            if (index === meme.selectedLineIdx) {
                gCtx.strokeStyle = 'black'
                var textWidth = gCtx.measureText(line.txt).width
                var textHeight = textSize

                var frameX = (gElCanvas.width - textWidth) / 2 - 10
                var frameY =  yPos - textHeight + 5
                var frameWidth = textWidth + 20
                var frameHeight = textHeight + 10
    
                gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
            }
        })
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

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()   
}





