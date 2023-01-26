import Tesseract from 'tesseract.js'

function recogniseText(filepath) {
    cy.get('canvas').then((canvas) => {
        const canvasUrl = canvas[0].toDataURL('image/png')
        Tesseract.recognize(canvasUrl, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {            
            console.log('Recognised text:\n' + text)
        })
    })
}

export { recogniseText }