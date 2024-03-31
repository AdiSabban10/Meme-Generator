'use strict'

function showGallery() {
    onInit()
    hideNav()
    setMeme()
}

function renderGallery() {
   var strHtmls = gImgs.map(img => `
        <article class="img">
            <img src="${img.url}" 
            alt="Image ${img.id}"
            onclick="onImgSelect(${img.id})">
        </article> 
        `)

   document.querySelector('.gallery-container').innerHTML = strHtmls.join('')

}

function onImgSelect(imgId) {
    togglePages('.editor-page')
    setImg(imgId)
    renderEditor()
}