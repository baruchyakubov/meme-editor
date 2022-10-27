'use strict'
let gElCanvas
let gCtx
let gIsUpload = false

function onInit() {
    renderGallery()
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
    gMeme.lines[0].posX = gElCanvas.width / 2
    gMeme.lines[1].posX = gElCanvas.width / 2
    resizeCanvas()
    var imageUrl = getMeme(id).img
    var lines = getMeme(id).lines
    document.querySelector('.line').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme(imageUrl, lines)
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
    //   })
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
    console.log(line.txt);
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = 'center'
    if (gMeme.selectedLineIdx === idx && !gIsUpload) drawRect(line)
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
    console.log(color);
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
    setLineIdx()
    document.querySelector('.line').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function showMenu() {
    if (document.querySelector('.navigation-menu').classList.contains('opened')) document.querySelector('.navigation-menu').classList.remove('opened')
    else document.querySelector('.navigation-menu').classList.add('opened')
}

function onDownload(elLink){
    gIsUpload = true
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    gIsUpload = false
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}
function onShare(){
    gIsUpload = true
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
    uploadImg()
    gIsUpload = false
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}




