'use strict'

var gMeme = {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'example',
                size: 50,
                outlineColor: 'black',
                fillColor: 'white',
            }, {
                txt: 'adi',
                size: 40,
                outlineColor: 'black',
                fillColor: 'white',
            },{
                txt: 'sabban',
                size: 50,
                outlineColor: 'black',
                fillColor: 'white',
            }
        ]
    }


function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId - 1
}

function setLineTxt(txt) {
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
        txt: 'New Line',
        size: 30,
        outlineColor: 'black',
        fillColor: 'white',
    }

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

function keepLocation(line, pos, textWidth, textHeight) {
    const align = line.align || 'center'
    
    let adjustedXPos = pos.x
    if (align === 'right') {
        adjustedXPos -= textWidth
    } else if (align === 'left') {
        adjustedXPos += textWidth
    }
    line.pos = pos
    line.pos.x = adjustedXPos
    line.textWidth = textWidth
    line.textHeight = textHeight
}