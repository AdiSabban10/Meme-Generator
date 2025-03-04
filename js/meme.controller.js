'use strict'

let gElCanvas
let gCtx
let gStartPos
let gIsDragging = false

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']


function renderEditor() {
    gElCanvas = document.querySelector('.canvas-editor')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    addListeners()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme(isDownloadOrShare=false) {
    const meme = getMeme()
    const imgs = getImgs()

    const elImg = new Image()
    elImg.src = imgs[meme.selectedImgId].url

    // elImg.onload = () => {
        drawImage(elImg)
        meme.lines.forEach((line, index) => {
            drawText(line, gCtx)
            if (index === meme.selectedLineIdx) {
                if (!isDownloadOrShare) {
                    drawSelectedFrame(line)
                }
            }
        })
    // }
    gElCanvas.addEventListener('click', onSelectLine)
    gElCanvas.addEventListener('touchstart', onSelectLine)

    if (meme.lines.length === 0) resetEditorStyle()
}

function onSelectLine(ev) {
    gStartPos = getEvPos(ev)
    selectLine(gStartPos)
    renderMeme()
    const elTxt = document.querySelector('.txt');
    elTxt.focus()
    
}

function drawImage(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(line, ctx) {
    const txt = line.txt
    const textSize = line.size
    const xPos = (!line.pos) ? (gElCanvas.width / 2) : line.pos.x
    const yPos = (!line.pos) ? (gElCanvas.height / 2) : line.pos.y
    const fontFamily = line.fontFamily || 'Arial'
    
    ctx.font = 'bold ' + textSize + 'px ' + fontFamily
    ctx.strokeStyle = line.outlineColor || '#000000'
    ctx.fillStyle = line.fillColor || '#FFFFFF'
    ctx.textAlign = 'center'
    
    const textWidth = ctx.measureText(txt).width
    const textHeight = textSize
    
    const adjustedPos = { x: xPos, y: yPos }
    keepLocation(line, adjustedPos, textWidth, textHeight)
    
    ctx.fillText(txt, adjustedPos.x, adjustedPos.y)
    ctx.strokeText(txt, adjustedPos.x, adjustedPos.y)
}

function drawSelectedFrame(line) {
    gCtx.strokeStyle = 'black'
    var textWidth = gCtx.measureText(line.txt).width
    var textHeight = line.size
    var xPos = line.pos.x
    var yPos = line.pos.y
    
    var frameX = xPos - textWidth / 2 - 5
    var frameY = yPos - textHeight + 5
    var frameWidth = textWidth + 10
    var frameHeight = textHeight + 10
    
    gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
    
    updateEditorStyle(line)
    
}

function updateEditorStyle(line) {
    const txtInput = document.querySelector('.txt')
    txtInput.value = line.txt
    
    const elOutlineColorInput = document.querySelector('[name="outlineColor"]')
    const elOutlineColor = document.querySelector('.fa-brush')
    
    if (!line.outlineColor) line.outlineColor = '#000000'
    elOutlineColorInput.value = line.outlineColor
    elOutlineColor.style.color = elOutlineColorInput.value
    
    const elFillColorInput = document.querySelector('[name="fillColor"]')
    const elFillColor = document.querySelector('.fa-fill-drip')
    
    if (!line.fillColor) line.fillColor = '#ffffff'
    elFillColorInput.value = line.fillColor
    elFillColor.style.color = elFillColorInput.value
    
    if (!line.fontFamily) line.fontFamily = 'Arial'
    const elFontFamilyInput = document.querySelector('.font-family');
    elFontFamilyInput.value = line.fontFamily

}

function resetEditorStyle() {
    document.querySelector('.txt').value = ''
    document.querySelector('.fa-brush').style.color = '#000000'
    document.querySelector('.fa-fill-drip').style.color = '#ffffff'
    document.querySelector('.font-family').value = 'Ariel'
}

function onChangeTxt(elTxt) {
    const txt = elTxt.value
    changeLineTxt(txt)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    renderMeme(true)
    elLink.href = '#'    
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-img'
    renderMeme()
}

function onSetOutlineColor(elColor) {
    const color = elColor.value

    document.querySelector('.fa-brush').style.color = color

    setOutlineColor(color)
    renderMeme()
}

function onSetFillColor(elColor) {
    const color = elColor.value

    document.querySelector('.fa-fill-drip').style.color = color

    setFillColor(color)
    renderMeme()
}

function onUpdateLineSize(dir) {
    updateLineSize(dir)
    renderMeme()
}

function onSetAlignment(align) {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    let newXPos
    
    if (align === 'left') {
        newXPos = selectedLine.textWidth / 2 + 10
    } else if (align === 'right') {
        newXPos = gElCanvas.width - selectedLine.textWidth / 2 - 10
    } else {
        newXPos = gElCanvas.width / 2
    }

    selectedLine.pos.x = newXPos
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSetFontFamily(elSelectedFont) {
    setFontFamily(elSelectedFont.value)
    renderMeme()
}

function getEvPos(ev) {

    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault()         

        const touch = ev.changedTouches[0] 
        const rect = ev.target.getBoundingClientRect() 
        
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        }

    } else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gStartPos = getEvPos(ev)
    
    if (!isTxtClicked(gStartPos)) return
    
    gIsDragging = true
}

function onMove(ev) {
    if (gIsDragging) {
        const newPos = getEvPos(ev)
        const meme = getMeme()
        const selectedLine = meme.lines[meme.selectedLineIdx]

        selectedLine.pos.x = newPos.x
        selectedLine.pos.y = newPos.y
        
        gStartPos = newPos
        renderMeme()
    }
}

function onUp() {
    gIsDragging = false
}

function showSaved() {
    togglePages('.saved-page')
    hideNav()

    const savedMemes = getSavedMemes()
    renderSavedMemes(savedMemes)
    
}

function onSaveMeme() {
    renderMeme(true)
    const dataUrl = gElCanvas.toDataURL()

    saveMeme(dataUrl)
    const saveMsg = document.querySelector('.save-msg')
    saveMsg.classList.remove('hidden')
    setTimeout(() => {
        saveMsg.classList.add('hidden')
    }, 3000)

    renderMeme()
}


function renderSavedMemes(savedMemes) {
    const savedContainer = document.querySelector('.saved-container')

    var strHtmls = savedMemes.map((savedMeme, index) => `
        <article class="saved-meme">
            <img src="${savedMeme.dataUrl}"
            onclick="onMemeSelect(${index})">
            <button class="delete-seved-meme" 
                onclick="toggleModal(${index}, 1)">
                <i class="fa-solid fa-trash"></i>
            </button> 
            <div class="modal hidden">
                <p>Are you sure you want to delete the meme?</p>
                <div class="modal-buttons">
                    <button class="confirm-delete" 
                        onclick="onDeleteSavedMeme(${index}, true)">Yes
                    </button>
                    <button class="cancel-delete" 
                        onclick="onDeleteSavedMeme(${index}, false)">No
                    </button>
                </div>
            </div>
        </article>
    `)

    savedContainer.innerHTML = strHtmls.join('')

}

function onMemeSelect(index) {
    const savedMemes = getSavedMemes()
    const selectedMeme = savedMemes[index]

    togglePages('.editor-page')
    setMeme(selectedMeme)
    
    renderEditor()
    
}

function toggleModal(index ,dir) {
    const elModal = document.querySelectorAll('.modal')[index]
    if (dir === 1) elModal.classList.remove('hidden')
    if (dir === -1) elModal.classList.add('hidden')
}

function onDeleteSavedMeme(index, canBeDeleted) {
    if (canBeDeleted) deleteMeme(index)
    toggleModal(index, -1)
}

function onShareMeme() {
    renderMeme(true)
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
    renderMeme()
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}





