'use strict'
const gTrans = {
    'logo': {
        en: 'MEME EDITOR',
        he: 'עורך מימס'
    },
    'gallery': {
        en: 'Gaellry',
        he: 'גלריה'
    },
    'about': {
        en: 'About',
        he: 'אודות'
    },
    'search': {
        en: 'Search',
        he: 'חיפוש'
    },
    'download': {
        en: 'Download',
        he: 'הורד'
    },
    'share': {
        en: 'Share on facebook',
        he: 'שתף בפייסבוק'
    },
    'funny': {
        en: 'FUNNY',
        he: 'מצחיק'
    },
    'cute': {
        en: 'CUTE',
        he: 'חמוד'
    },
    'aqward': {
        en: 'AQWARD',
        he: 'מוזר'
    },
    'animal': {
        en: 'ANIMALS',
        he: 'בעלי חיים'
    },
    'bad': {
        en: 'BAD',
        he: 'רע'
    }
}

let gCurrLang

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(lang) {
    gCurrLang = lang
    saveToStorage('language' , gCurrLang)
}
