'use strict'

let gElCanvas
let gCtx
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

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

function renderMeme(isDownload=false) {
    const meme = getMeme()
    const imgs = getImgs()

    const elImg = new Image()
    elImg.src = imgs[meme.selectedImgId].url

    // elImg.onload = () => {
        drawImage(elImg)
        meme.lines.forEach((line, index) => {
            const yPos = calculateYPosition(index, meme.lines.length)
            drawText(line, yPos)
            if (index === meme.selectedLineIdx) {
                if (!isDownload) {
                    drawSelectedFrame(line, yPos)
                }
            }
        })
    // }
    gElCanvas.addEventListener('click', selectLine)

    if (meme.lines.length === 0) resetEditorStyle()
}

function selectLine(ev) {
    const meme = getMeme()
    gStartPos = getEvPos(ev)
    
    meme.lines.forEach((line, index) => {
        
        if (gStartPos.x >= line.pos.x - (line.textWidth / 2) && 
            gStartPos.x <= line.pos.x + (line.textWidth / 2) && 
            gStartPos.y >= line.pos.y - (line.textHeight / 2) && 
            gStartPos.y <= line.pos.y + (line.textHeight / 2) ) {
                meme.selectedLineIdx = index
                renderMeme()
        }
    })
    
}

function cleanSelectedFrame() {
    const meme = getMeme()

    meme.lines.forEach((line, index) => {
        const yPos = calculateYPosition(index, meme.lines.length)
        if (index === meme.selectedLineIdx) {
            drawSelectedFrame(line, yPos)
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
    const xPos = (!line.pos) ? (gElCanvas.width / 2) : line.pos.x
    const fontFamily = line.fontFamily || 'Arial'
    
    gCtx.font = 'bold ' + textSize + 'px ' + fontFamily
    gCtx.strokeStyle = line.outlineColor || '#000000'
    gCtx.fillStyle = line.fillColor || '#FFFFFF'
    gCtx.textAlign = 'center'
    
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
    var xPos = line.pos.x
    
    var frameX = xPos - textWidth / 2 - 5
    var frameY = yPos - textHeight + 5
    var frameWidth = textWidth + 10
    var frameHeight = textHeight + 10
    
    gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
    
    updateEditorStyle(line)
    
}

function updateEditorStyle(line) {
    const txtInput = document.querySelector('.txt')
    txtInput.value = line.txt
    
    const elOutlineColorInput = document.querySelector('[name="outlineColor"]')
    const elOutlineColor = document.querySelector('.fa-brush')
    
    if (!line.outlineColor) line.outlineColor = '#000000'
    elOutlineColorInput.value = line.outlineColor
    elOutlineColor.style.color = elOutlineColorInput.value
    
    const elFillColorInput = document.querySelector('[name="fillColor"]')
    const elFillColor = document.querySelector('.fa-fill-drip')
    
    if (!line.fillColor) line.fillColor = '#ffffff'
    elFillColorInput.value = line.fillColor
    elFillColor.style.color = elFillColorInput.value
    
    if (!line.fontFamily) line.fontFamily = 'Arial'
    const elFontFamilyInput = document.querySelector('.font-family');
    elFontFamilyInput.value = line.fontFamily

}

function resetEditorStyle() {
    document.querySelector('.txt').value = ''
    document.querySelector('.fa-brush').style.color = '#000000'
    document.querySelector('.fa-fill-drip').style.color = '#ffffff'

    document.querySelector('.font-family').value = 'Ariel'
    
}

function onAddTxt(elTxt) {
    const txt = elTxt.value
    setLineTxt(txt)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    renderMeme(true)
    elLink.href = '#'       // Clear the link
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-img'
    renderMeme()
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

function onSetAlignment(align) {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    let newXPos
    
    if (align === 'left') {
        newXPos = selectedLine.textWidth / 2 + 10
    } else if (align === 'right') {
        newXPos = gElCanvas.width - selectedLine.textWidth / 2 - 10
    } else {
        newXPos = gElCanvas.width / 2
    }

    selectedLine.pos.x = newXPos
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

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSetFontFamily(elSelectedFont) {
    setFontFamily(elSelectedFont.value)
    renderMeme()
}

function getEvPos(ev) {

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()         // Prevent triggering the mouse events
        ev = ev.changedTouches[0]   // Gets the first touch point

        return {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }

    } else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}






