'use strict'
let gElCanvas
let gCtx


function onInit() {
    renderGallery()
}

function renderGallery() {
    var elImages = document.querySelector('.images-container')
    var images = getImg().map (image => {
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
    var imageUrl = getMeme(id).img
    var lines = getMeme(id).lines
    renderMeme(imageUrl, lines)
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).line)
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
    // gCtx.beginPath()
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xEnd,yEnd
        lines.forEach(line => {
            drawText(line.txt, gElCanvas.width / 2, line.posY) 
        })
        // drawText(line, gElCanvas.width / 2, 40)
        // drawText(line, gElCanvas.width / 2, 440)
    }
}

function drawText(text, x, y) {
    console.log(text);
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = getColor()
    gCtx.font = `${getFontSize()}px Arial`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onSetColor(color){
    console.log(color);
    setColor(color)
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onIncreaseFontSize(){
    increaseFontSize()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onDecreaseFontSize(){
    decreaseFontSize()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}

function onSetLineIdx(){
    setLineIdx()
    renderMeme(getMeme(gMeme.selectedImgId).img, getMeme(gMeme.selectedImgId).lines)
}




// function drawRect() {
//     gCtx.strokeStyle = 'black'
//     gCtx.strokeRect(x, y, 150, 300)
//     gCtx.fillStyle = 'orange'
//     gCtx.fillRect(x, y, 150, 150)
// }