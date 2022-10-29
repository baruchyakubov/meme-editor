'use strict'
let gElCanvas
let gCtx
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gIsDrag = false
let gIsTagged = true
let gIsCircleDrag = false
let gStartPos

function onInit() {
    var keywords = getKeyWordSizes()
    setKeyWordSizes(keywords)
    var lang = getLang()
    document.querySelector('.lan').value = lang
    onSetLang(lang)
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
        if (window.innerWidth < 941) return
        resizeCanvas()
        setFirstLinesPos()
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
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    if (gIsArcClicked) {
        gIsCircleDrag = true
        document.querySelector('canvas').style.cursor = 'grabbing'
        gStartPos = pos
        return
    }
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
    if (!gIsDrag && !gIsCircleDrag) return
    const pos = getEvPos(ev)
    if (gIsCircleDrag) {
        if (pos.x > gStartPos.x && gMeme.lines[gMeme.selectedLineIdx].size < 80) {
            gMeme.lines[gMeme.selectedLineIdx].size += 10
        } else if (pos.x < gStartPos.x && gMeme.lines[gMeme.selectedLineIdx].size > 20) {
            gMeme.lines[gMeme.selectedLineIdx].size -= 10
        }
        renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
        return
    }
    gMeme.lines[gMeme.selectedLineIdx].posX = pos.x
    gMeme.lines[gMeme.selectedLineIdx].posY = pos.y
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}
function onUp() {
    gIsArcClicked = false
    gIsCircleDrag = false
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


function onReturnToGallery(elGallery){
    elGallery.classList.add('clicked')
    document.querySelector('.gallery').classList.remove('closed')
    document.querySelector('.editor').classList.add('closed')
}


function showMeme(id) {
    document.querySelector('.Gallery').classList.remove('clicked')
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
    drawArc(line.posX + lineWidth / 2, line.posY)
}

function drawArc(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].posArc = { x, y: y + 10 }
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.arc(x, y + 10, 5, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = 'yellow'
    gCtx.fill()
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
    if(gMeme.lines[gMeme.selectedLineIdx].size > 80) return 
    increaseFontSize()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onDecreaseFontSize() {
    if(gMeme.lines[gMeme.selectedLineIdx].size < 20) return 
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

function onSetFilterByClick(elKeyWord) {
    var value = elKeyWord.value 
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

function onSetLang(lang) {
    setLang(lang)
    setDirection(lang)
    doTrans()
}

function setDirection(lang) {
    if (lang === 'he'){
        document.body.classList.add('rtl')
        document.querySelector('.navigation-menu').classList.add('rtl')
    } 
    else{
        document.body.classList.remove('rtl')
        document.querySelector('.navigation-menu').classList.remove('rtl')
    }
}




