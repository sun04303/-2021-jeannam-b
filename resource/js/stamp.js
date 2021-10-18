let code = [], product = []
let cardName

let gcanvas = document.querySelector("#graph")
let colors = []

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

    for(let item in product) {
        colors.push("#" + Math.floor(Math.random() * 16777215).toString(16))
    }

    console.log(product)

    let myPieChart = new PieChart({
        canvas:gcanvas,
        data:product,
        color:colors
    })
    
    myPieChart.draw()
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

// 스탬프 찍기

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

$('#cardSelect').on('click', async e => {
    e.preventDefault()
    open()
})

async function open() {
    [fileHandle] = await window.showOpenFilePicker()
    let fileData = await fileHandle.getFile()

    let reader = new FileReader()

    reader.onload = event => {
        let cardImage = new Image()

        cardImage.onload = () => {
            let chkx = 65
            let chky = 120

            let drawX = 20
            let drawY = 78

            let circleX = 163

            viewctx.drawImage(cardImage, 0, 0)

            outer : for(let i = 0; i < 2; i++) {
                for(let j = 0; j < 4; j++) {
                    if(viewctx.getImageData(chkx, chky, 1, 1).data[0] == 176) {
                        viewctx.drawImage(mark, drawX, drawY)
                        drawCircle(circleX, '#0f0')
                        save(fileData)
                        break outer
                    }

                    chkx+=103
                    drawX+=103
                    circleX += 15
                }

                chkx = 65
                drawX = 20
                chky = 215
                drawY = 173
            }
        }

        cardImage.src = event.target.result
    }

    reader.readAsDataURL(fileData)
}

async function save(data) {
    $('#stampCard').modal('hide')

    let newFile
    view.toBlob((blob => {
        newFile = new File([blob], data.name, {type: blob.type})
    }))

    let stream = await fileHandle.createWritable()
    await stream.write(newFile)
    await stream.close()
    await location.reload()
}

function drawCircle (x, color) {
    viewctx.beginPath();
    viewctx.arc(x, 271, 3, 0, Math.PI*2)
    viewctx.stroke();
    viewctx.fillStyle = color
    viewctx.fill()
}

// 상품 뽑기

function drawPieSlice(ctx, cX, cY, radius, sA, eA, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(cX, cY)
    ctx.arc(cX, cY, radius, sA, eA)
    ctx.closePath()
    ctx.fill()
}

let PieChart = function(option) {
    this.option = option
    this.canvas = option.canvas
    this.ctx = this.canvas.getContext("2d")
    this.color = option.color

    this.draw = () => {
        let totalValue = this.option.data.length
        let colorIndex = 0
        let startAngle = 0
        let sliceAngle = 2 * Math.PI * 1 / totalValue

        for(categ in this.option.data) {

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2, this.canvas.height/2),
                startAngle,
                startAngle + sliceAngle,
                this.color[colorIndex%this.color.length]
            )

            startAngle += sliceAngle
            colorIndex += 1
        }

        startAngle = 0

        for(categ in this.option.data) {
            let pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2)*1.4
            let labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(startAngle + sliceAngle / 2)
            let labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(startAngle + sliceAngle / 2)

            this.ctx.fillStyle = "#fff"
            this.ctx.textAlign="center"
            this.ctx.font = "bold 20px Arial"
            this.ctx.fillText(this.option.data[categ], labelX, labelY)
            
            startAngle += sliceAngle
        }
    }
}

gcanvas.addEventListener('click', e => {
    let arc = Math.PI / (product.length / 2);
    let rotateCnt = 360*4 + (Math.random() * (359 - 0) + 0)
    e.target.style.transform += `rotate(${rotateCnt}deg)`

    console.log(product[Math.floor((360 - rotateCnt % 360) / (arc * 180 / Math.PI))])
})