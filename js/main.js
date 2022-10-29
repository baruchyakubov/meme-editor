'use strict'
let gElCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gIsDrag = false
let gIsTagged = true

function onInit() {
    var keywords = getKeyWordSizes()
    setKeyWordSizes(keywords)
    renderGallery()
}

function setKeyWordSizes(keywords) {
    if (keywords[0].size < 33) document.querySelector('.funny').style.fontSize = `${keywords[0].size}px`
    if (keywords[1].size < 33) document.querySelector('.cute').style.fontSize = `${keywords[1].size}px`
    if (keywords[2].size < 33) document.querySelector('.aqward').style.fontSize = `${keywords[2].size}px`
    if (keywords[3].size < 33) document.querySelector('.animal').style.fontSize = `${keywords[3].size}px`
    if (keywords[4].size < 33) document.querySelector('.bad').style.fontSize = `${keywords[4].size}px`
}

function addListener() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        if(window.innerWidth <= 941) return
        setFirstLinesPos()
        resizeCanvas()
        renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}



function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('Im from onDown')
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    document.querySelector('.line').value = gMeme.lines[gMeme.selectedLineIdx].txt
    gIsTagged = true
    gIsDrag = true
    document.querySelector('canvas').style.cursor = 'grabbing'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
function onMove(ev) {
    if (!gIsDrag) return
    const pos = getEvPos(ev)
    gMeme.lines[gMeme.selectedLineIdx].posX = pos.x
    gMeme.lines[gMeme.selectedLineIdx].posY = pos.y
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}
function onUp() {
    gIsDrag = false
    document.querySelector('canvas').style.cursor = 'grab'
}

function renderGallery() {
    var elImages = document.querySelector('.images-container')
    var images = getImg().map(image => {
        return `<img onclick="showMeme(${image.id})" class="image" src=${image.url}>`
    })
    elImages.innerHTML = images.join('')
}





function showMeme(id) {
    document.querySelector('.gallery').classList.add('closed')
    document.querySelector('.editor').classList.remove('closed')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    setFirstLinesPos()
    var imageUrl = getMeme(id).img
    var lines = getMeme(id).lines
    document.querySelector('.line').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme(imageUrl, lines)
    addListener()
}

function setFirstLinesPos() {
    gMeme.lines[0].posX = gElCanvas.width / 2
    gMeme.lines[1].posX = gElCanvas.width / 2
    gMeme.lines[0].posY = gElCanvas.height / 9
    gMeme.lines[1].posY = gElCanvas.height - gElCanvas.height / 10
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function renderMeme(img, lines) {
    const elImg = new Image()
    elImg.src = img
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            drawText(line, idx)
        })
    }
}

function drawText(line, idx) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = 'center'
    if (gMeme.selectedLineIdx === idx && gIsTagged === true) drawRect(line)
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.fillText(line.txt, line.posX, line.posY)
    gCtx.strokeText(line.txt, line.posX, line.posY)
}

function drawRect(line) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'blue'
    var lineWidth = gCtx.measureText(line.txt).width
    gCtx.strokeRect(line.posX - lineWidth / 2, line.posY - line.size, lineWidth, line.size + 10)
    gCtx.fillStyle = 'rgba(0,0,200,0)'
    gCtx.fillRect(line.posX - lineWidth / 2, line.posY - line.size, lineWidth, line.size + 10)
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onSetColor(color) {
    setColor(color)
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onSetLineIdx() {
    gIsTagged = true
    setLineIdx()
    document.querySelector('.line').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function showMenu() {
    if (document.querySelector('.navigation-menu').classList.contains('opened')) document.querySelector('.navigation-menu').classList.remove('opened')
    else document.querySelector('.navigation-menu').classList.add('opened')
}

function onDownload(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onShare() {
    uploadImg()
}

function onSetFont(font) {
    setLineFont(font)
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onAddLine() {
    addLine()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onDeleteLine() {
    deleteLine()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onSetFilterByClick(value) {
    onChangeKeywordSize(value)
    setFilterByClick(value)
    renderGallery()
}

function onChangeKeywordSize(value) {
    changeKeywordSize(value)
    setKeyWordSizes(gKeyWords)
}

function onSetFilterByTxt(value) {
    setFilterByTxt(value)
    renderGallery()
}




