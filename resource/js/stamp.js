let code = [], product = []
let cardName

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let cardImage = new Image()
cardImage.src = './resource/img/stamp/stamp.png'
cardImage.onload = () => {ctx.drawImage(cardImage, 0, 0)}

fetch('./resource/js/code.json')
.then(res => res.json())
.then(data => {
    code = data
    console.log(code)
})

fetch('./resource/js/product.json')
.then(res => res.json())
.then(data => {
    product = data
    console.log(product)
})

$('.downOpen').on('click', e => {
    $('#download').modal('show')
})

$('.card-d').on('click', e => {
    cardName = $('#cardName').val()
    if(cardName) {
        ctx.fillText(cardName, 365, 20)
        document.querySelector('.card-d').href = canvas.toDataURL()
        $('#download').modal('hide')
    } else {
        e.preventDefault()
        alert('이름을 입력해주세요')
    }
})

$('.cardOpen').on('click', e => {
    if(code.indexOf($('.codeInput').val()) == -1) {
        alert('잘못된 코드입니다.')
        $('.codeInput').val('')
        return
    }

    $('#stampCard').modal('show')
})