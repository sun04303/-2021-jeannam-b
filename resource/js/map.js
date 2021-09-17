let list = []
let canvas = document.querySelector('#mapCanvas')
let ctx = canvas.getContext('2d')

let copyCanvas = document.querySelector('#mapCopy')
let ctx1 = copyCanvas.getContext('2d')

let multiply = 1
let state = false

fetch('./resource/js/store_location.json')
.then(res => res.json())
.then(data => list = data)

let map1 = new Image()
let map2 = new Image()
let map3 = new Image()
let map4 = new Image()
map1.src = './resource/img/map/1/1.jpg'
map1.onload = () => {
    ctx.drawImage(map1, 0, 0);
    ctx1.drawImage(canvas, 0, 0)
}

$('.view').on('click', e => {
    list.forEach(item => {
        if(item.store == e.target.parentNode.childNodes[1].innerHTML) {
            console.log(item)
        }
    })

    $('#mapModal').modal('show')
})

canvas.addEventListener('wheel', e => {

    let chk = multiply

    if(e.deltaY > 0 && multiply < 3) {
        multiply++
    } else if(e.deltaY < 0 && multiply > 1) {
        multiply--
    }

    if(multiply == chk) return

    canvas.width = multiply == 1 ? 1100 : multiply == 2 ? 2200 : 4400
    canvas.height = multiply == 1 ? 1100 : multiply == 2 ? 2200 : 4400

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.style.top = 0
    canvas.style.left = 0

    switch (multiply) {
        case 1:
            map1.src = './resource/img/map/1/1.jpg'
            map1.onload = () => {ctx.drawImage(map1, 0, 0);}
            
            ctx1.drawImage(canvas, 0, 0)
            break;
    
        case 2:
            map1.src = './resource/img/map/2/2-1.jpg'
            map1.onload = () => {ctx.drawImage(map1, 0, 0);}

            map2.src = './resource/img/map/2/2-2.jpg'
            map2.onload = () => {ctx.drawImage(map2, 1100, 0);}

            map3.src = './resource/img/map/2/2-3.jpg'
            map3.onload = () => {ctx.drawImage(map3, 0, 1100);}

            map4.src = './resource/img/map/2/2-4.jpg'
            map4.onload = () => {ctx.drawImage(map4, 1100, 1100);}

            ctx1.drawImage(canvas, 0, 0)
            break;

        case 3:
            map1.src = './resource/img/map/3/3-1.jpg'
            map1.onload = () => {ctx.drawImage(map1, 0, 0);}

            map2.src = './resource/img/map/3/3-2.jpg'
            map2.onload = () => {ctx.drawImage(map2, 1100, 0);}

            map3.src = './resource/img/map/3/3-3.jpg'
            map3.onload = () => {ctx.drawImage(map3, 2200, 0);}

            map4.src = './resource/img/map/3/3-4.jpg'
            map4.onload = () => {ctx.drawImage(map4, 3300, 0);}

            let map5 = new Image()
            map5.src = './resource/img/map/3/3-5.jpg'
            map5.onload = () => {ctx.drawImage(map5, 0, 1100);}

            let map6 = new Image()
            map6.src = './resource/img/map/3/3-6.jpg'
            map6.onload = () => {ctx.drawImage(map6, 1100, 1100);}

            let map7 = new Image()
            map7.src = './resource/img/map/3/3-7.jpg'
            map7.onload = () => {ctx.drawImage(map7, 2200, 1100);}

            let map8 = new Image()
            map8.src = './resource/img/map/3/3-8.jpg'
            map8.onload = () => {ctx.drawImage(map8, 3300, 1100);}

            let map9 = new Image()
            map9.src = './resource/img/map/3/3-9.jpg'
            map9.onload = () => {ctx.drawImage(map9, 0, 2200);}

            let map10 = new Image()
            map10.src = './resource/img/map/3/3-10.jpg'
            map10.onload = () => {ctx.drawImage(map10, 1100, 2200);}

            let map11 = new Image()
            map11.src = './resource/img/map/3/3-11.jpg'
            map11.onload = () => {ctx.drawImage(map11, 2200, 2200);}

            let map12 = new Image()
            map12.src = './resource/img/map/3/3-12.jpg'
            map12.onload = () => {ctx.drawImage(map12, 3300, 2200);}

            let map13 = new Image()
            map13.src = './resource/img/map/3/3-13.jpg'
            map13.onload = () => {ctx.drawImage(map13, 0, 3300);}

            let map14 = new Image()
            map14.src = './resource/img/map/3/3-14.jpg'
            map14.onload = () => {ctx.drawImage(map14, 1100, 3300);}

            let map15 = new Image()
            map15.src = './resource/img/map/3/3-15.jpg'
            map15.onload = () => {ctx.drawImage(map15, 2200, 3300);}

            let map16 = new Image()
            map16.src = './resource/img/map/3/3-16.jpg'
            map16.onload = () => {ctx.drawImage(map16, 3300, 3300);}
            
            ctx1.drawImage(canvas, 0, 0)
            break;

        default:
            break;
    }
})

canvas.addEventListener('contextmenu', e => {
    copyCanvas.style.zIndex = 1
})

copyCanvas.addEventListener('wheel', e => {copyCanvas.style.zIndex = 0})
copyCanvas.addEventListener('mousedown', e => {copyCanvas.style.zIndex = 0})

function drag(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    el.onmousedown = dragMouseDown
    
    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragE
        document.onmousemove = eDrag
    }
    
    function eDrag(e) {
        e = e || window.event
        e.preventDefault()

        let max = multiply == 1 ? 0 : multiply == 2 ? 1100 : 3300

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        if(el.offsetTop - pos2 < 0 && el.offsetTop - pos2 > -max)
            el.style.top = (el.offsetTop - pos2) + "px"

        if(el.offsetLeft - pos1 < 0 && el.offsetLeft - pos1 > -max)
            el.style.left = (el.offsetLeft - pos1) + "px"

        Math.abs(el.style.left.split('px')[0])
        ctx1.drawImage(canvas, Math.abs(el.style.left.split('px')[0]), 0, 0, 0)
    }
    
    function closeDragE() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

drag(canvas)