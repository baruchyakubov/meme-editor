'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }, { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] }, { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] }, { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] }, { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] }, { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] }
    , { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] }, { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] }, { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
{ id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] }, { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] }, { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] }
    , { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] }, { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] }, { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] }];
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'LOL',
            size: 40,
            align: 'left',
            color: 'white',
            posY: 60,
            posX: 0
        },

        {
            txt: 'hello there!',
            size: 40,
            align: 'left',
            color: 'white',
            posY: 440,
            posX: 0
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
    gMeme.lines[gMeme.selectedLineIdx].txt = text
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

function setLineIdx() {
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 1
    else gMeme.selectedLineIdx = 0
}