'use strict'

var gMeme = {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Add text here',
                size: 40,
                outlineColor: '#000000',
                fillColor: '#ffffff',
            }
        ]
}
var gMemes

function getMeme() {
    return gMeme
}

function resetMeme() {
    gMeme = {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Add text here',
                size: 40,
                outlineColor: '#000000',
                fillColor: '#ffffff',
            }
        ]
    }
 
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId - 1
}

function setLineTxt(txt) {
    if(gMeme.lines.length === 0) return
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txt = txt
    
}
    
function setOutlineColor(color) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].outlineColor = color
}

function setFillColor(color) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].fillColor = color
}

function updateLineSize(dir) {
    const idx = gMeme.selectedLineIdx
    if (dir === -1 && gMeme.lines[idx].size <= 20 ||
        dir === 1 && gMeme.lines[idx].size >= 100){
        return
    }
    
    gMeme.lines[idx].size += (10 * dir)
}

function addLine() {
    const newLine = {
        txt: 'Add text here',
        size: 30,
    }
    if (gMeme.lines.length === 0) gMeme.selectedLineIdx = 0

    gMeme.lines.push(newLine)
}

function switchLine() {
    const totalLines = gMeme.lines.length
    if (totalLines === 0) return

    gMeme.selectedLineIdx++

    if (gMeme.selectedLineIdx >= totalLines) {
        gMeme.selectedLineIdx = 0
    }
}

function deleteLine() {
    if (gMeme.lines.length === 0) return
    
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }

}

function setFontFamily(font) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].fontFamily = font
}

function keepLocation(line, pos, textWidth, textHeight) {
    line.pos = pos
    line.textWidth = textWidth
    line.textHeight = textHeight
}

function isTxtClicked(clickedPos) {
    const { pos, textWidth, textHeight } = gMeme.lines[gMeme.selectedLineIdx]
    
    return (clickedPos.x >= pos.x - (textWidth / 2) && 
           clickedPos.x <= pos.x + (textWidth / 2) && 
           clickedPos.y >= pos.y - (textHeight / 2) && 
           clickedPos.y <= pos.y + (textHeight / 2))
}

function selectLine(clickedPos) {
    gMeme.lines.forEach((line, index) => {
        if (clickedPos.x >= line.pos.x - (line.textWidth / 2) && 
            clickedPos.x <= line.pos.x + (line.textWidth / 2) && 
            clickedPos.y >= line.pos.y - (line.textHeight / 2) && 
            clickedPos.y <= line.pos.y + (line.textHeight / 2) ) {
                gMeme.selectedLineIdx = index
            }
        })
}

function saveMeme(){
    const savedMemes = loadFromStorage('savedMemes') || []

    savedMemes.push(gMeme)
    saveToStorage('savedMemes', savedMemes)
    console.log('savedMemes:', savedMemes)
}

function getMemes(){
    gMemes = loadFromStorage('savedMemes') || []
    return gMemes
}





