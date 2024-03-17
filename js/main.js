'use strict'

function onInit() {
    document.querySelector('.gallery-page').classList.remove('hidden')
    document.querySelector('.editor-page').classList.add('hidden')
    renderGallery()
    // renderMeme()
}