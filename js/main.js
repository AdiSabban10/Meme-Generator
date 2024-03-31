'use strict'

function onInit() {
    togglePages('.gallery-page')
    renderGallery()
}

function togglePages(visiblePageClass) {
    const allPages = ['.gallery-page', '.saved-page', '.editor-page']
    allPages.forEach(page => {
        const pageElement = document.querySelector(page)
        if (page === visiblePageClass) {
            pageElement.classList.remove('hidden')
        } else {
            pageElement.classList.add('hidden')
        }
    })
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function hideNav() {
    document.body.classList.remove('menu-open')
}


