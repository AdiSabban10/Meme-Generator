'use strict'

let gElCanvas
let gCtx

function renderEditor() {
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
        drawImage(elImg)
        meme.lines.forEach((line, index) => {
            const yPos = calculateYPosition(index, meme.lines.length)
            drawText(line, yPos)
            if (index === meme.selectedLineIdx) {
                drawSelectedFrame(line, yPos)
            }
        })
    }
    gElCanvas.addEventListener('click', selectLine)
}

function selectLine(event) {
    const mouseX = event.offsetX
    const mouseY = event.offsetY
    const meme = getMeme()

    meme.lines.forEach((line, index) => {
        const frameX = line.pos.x - line.textWidth / 2 - 10
        const frameY = line.pos.y - line.textHeight + 5
        const frameWidth = line.textWidth + 20
        const frameHeight = line.textHeight + 10

        if (mouseX >= frameX &&
            mouseX <= frameX + frameWidth &&
            mouseY >= frameY &&
            mouseY <= frameY + frameHeight) {
            meme.selectedLineIdx = index
            renderMeme()
        }
    })
}

function calculateYPosition(index, totalLines) {
    return (index + 1) * (gElCanvas.height / (totalLines + 1))
}

function drawImage(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(line, yPos) {
    const txt = line.txt
    const textSize = line.size
    const xPos = line.xPos || gElCanvas.width / 2
    const align = line.align || 'center'

    gCtx.font = 'bold ' + textSize + 'px Arial'
    gCtx.strokeStyle = line.outlineColor
    gCtx.fillStyle = line.fillColor
    gCtx.textAlign = align

    const textWidth = gCtx.measureText(txt).width
    const textHeight = textSize

    const adjustedPos = { x: xPos, y: yPos }
    keepLocation(line, adjustedPos, textWidth, textHeight)

    gCtx.fillText(txt, adjustedPos.x, adjustedPos.y)
    gCtx.strokeText(txt, adjustedPos.x, adjustedPos.y)
}

function drawSelectedFrame(line, yPos) {
    gCtx.strokeStyle = 'black'
    var textWidth = gCtx.measureText(line.txt).width
    var textHeight = line.size
    var xPos = line.xPos || gElCanvas.width / 2

    var frameX = xPos - textWidth / 2 - 10
    var frameY = yPos - textHeight + 5
    var frameWidth = textWidth + 20
    var frameHeight = textHeight + 10

    gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
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

function onSetOutlineColor(elColor) {
    const color = elColor.value

    document.querySelector('.fa-brush').style.color = color

    setOutlineColor(color)
    renderMeme()
}

function onSetFillColor(elColor) {
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





