let list = []

fetch('./resource/js/store_location.json')
.then(res => res.json())
.then(data => list = data)

$('.view').on('click', e => {
    list.forEach(item => {
        if(item.store == e.target.parentNode.childNodes[1].innerHTML) {
            console.log(item)
        }
    })

    $('#mapModal').modal('show')
})