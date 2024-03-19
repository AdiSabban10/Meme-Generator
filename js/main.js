'use strict'

function onInit() {
    document.querySelector('.gallery-page').classList.remove('hidden')
    document.querySelector('.editor-page').classList.add('hidden')
    renderGallery()

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function hideNav() {
    document.body.classList.remove('menu-open')
}


