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
            }, {
                txt: 'adi',
                size: 40,
                outlineColor: '#000000',
                fillColor: '#ffffff',
            },{
                txt: 'sabban',
                size: 50,
                outlineColor: '#000000',
                fillColor: '#ffffff',
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
        // outlineColor: '#000000',
        // fillColor: '#FFFFFF',
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

function deleteLine() {
    if (gMeme.lines.length === 0) return
    
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
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


