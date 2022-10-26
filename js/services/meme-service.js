'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'left',
            color: 'white',
            posY:40
        },

        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'left',
            color: 'white',
            posY:440
        }
    ]
}
var gMemeImg

function getMeme(id) {
    var gMemeImg = gImgs.find(image => {
        return image.id === id
    })
    gMeme.selectedImgId = id
    return { img: gMemeImg.url, lines: gMeme.lines }
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function getImg() {
    return gImgs
}



function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color
}

function getFontSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function setLineIdx(){
   if(gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 1
   else gMeme.selectedLineIdx = 0
}