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
            let chkx = 65
            let chky = 120

            let drawX = 20
            let drawY = 78

            let circleX = 163

            viewctx.drawImage(cardImg, 0, 0)

            outer : for(let i = 0; i < 2; i++) {
                for(let j = 0; j < 4; j++) {
                    if(viewctx.getImageData(chkx, chky, 1, 1).data[0] == 176) {
                        viewctx.drawImage(mark, drawX, drawY)
                        drawCircle(circleX, '#0f0')
                        break outer
                    }

                    chkx+=103
                    drawX+=103
                    circleX += 15
                }

                chkx = 65
                drawX = 120
                chky = 215
                drawY = 173
            }
        }

        cardImg.src = event.target.result
    }

    reader.readAsDataURL(e.target.files[0])
})

function drawCircle (x, color) {
    viewctx.beginPath();
    viewctx.arc(x, 271, 3, 0, Math.PI*2)
    viewctx.stroke();
    viewctx.fillStyle = color
    viewctx.fill()
}