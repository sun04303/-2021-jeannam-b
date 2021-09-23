let code = [], product = []

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