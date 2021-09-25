let code = [], product = []
let cardName

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let mark = new Image()
mark.src = './resource/img/stamp/mark.png'

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
    let cardImage = new Image()
    cardImage.src = './resource/img/stamp/stamp.png'
    cardImage.onload = () => {ctx.drawImage(cardImage, 0, 0)}
})

$('.card-d').on('click', e => {
    cardName = $('#cardName').val()
    if(cardName) {
        ctx.fillStyle = '#fff'
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

let view = document.querySelector('.stampview')
let viewctx = view.getContext('2d')

$('#cardSelect').on('change', e => {
    let reader = new FileReader()
    reader.onload = event => {
        let cardImg = new Image()

        cardImg.onload = () => {
            viewctx.drawImage(cardImg, 0, 0)

            console.log(viewctx.getImageData(10, 78, 1, 1))
            console.log(viewctx.getImageData(70, 78, 1, 1))

            viewctx.drawImage(mark, 20, 78) // x = 20 + 103, y = 78, 173
            viewctx.drawImage(mark, 123, 78)
            viewctx.drawImage(mark, 226, 78)
            viewctx.drawImage(mark, 20, 173)

            drawCircle(163, '#f00')
            drawCircle(178, '#0f0')
        }

        cardImg.src = event.target.result
    }

    reader.readAsDataURL(e.target.files[0])
})

function drawCircle (x, color) {
    viewctx.beginPath();
    viewctx.arc(x, 271, 3, 0, Math.PI*2) // 첫 번째 163
    viewctx.stroke();
    viewctx.fillStyle = color
    viewctx.fill()
}