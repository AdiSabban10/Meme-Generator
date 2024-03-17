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
                }
            ]
        }


function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId - 1
    // console.log('gMeme:', gMeme)
    
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
    
}

function setOutlineColor(color) {
    gMeme.lines[0].outlineColor = color
}

function setFillColor(color) {
    gMeme.lines[0].fillColor = color
}

function updateLineSize(dir) {
    if (dir === -1 && gMeme.lines[0].size <= 20 ||
        dir === 1 && gMeme.lines[0].size >= 100){
        return
    }
    
    gMeme.lines[0].size += (10 * dir)
}