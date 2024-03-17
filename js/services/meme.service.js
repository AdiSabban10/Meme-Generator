'use strict'

var gMeme = {
            selectedImgId: 4,
            selectedLineIdx: 0,
            lines: [
                {
                    txt: 'example',
                    size: 20,
                    color: 'red'
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