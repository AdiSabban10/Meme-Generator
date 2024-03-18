'use strict'


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
    document.querySelector('.gallery-page').classList.add('hidden')
    document.querySelector('.editor-page').classList.remove('hidden')
    
    setImg(imgId)
    
    renderEditor()
}