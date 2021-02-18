const express = require('express')
const router = express.Router();
let arrayProducts = [{ "id": 1, "title": "iPhone 11 64 GB (Product)Red", "price": 159000, "thumbnail": "https://raw.githubusercontent.com/rubeneggel72/Entrega11-pug/main/img/img-001.jpg" },
{ "id": 3, "title": "iPhone 12 64 GB azul", "price": 200000, "thumbnail": "https://raw.githubusercontent.com/rubeneggel72/Entrega11-pug/main/img/img-002.jpg" },
{ "id": 4, "title": "iPhone XR 64 GB negro", "price": 139000, "thumbnail": "https://raw.githubusercontent.com/rubeneggel72/Entrega11-pug/main/img/img-003.jpg" },
{ "id": 5, "title": "iPhone XR 64 GB negro", "price": 139000, "thumbnail": "https://raw.githubusercontent.com/rubeneggel72/Entrega11-pug/main/img/img-004.jpg" },
]

router.get('/productos/vista', (req, res) => {
    console.log(arrayProducts)
    res.render('index.pug', { products: arrayProducts });
});

router.get('/productos', (req, res) => {
    if (arrayProducts.length > 0) {
        res.send(arrayProducts);
    }
    else {
        res.send({ error: 'No hay products cargados' });
    }
})

router.get('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let idx = getindex(id)
    let product = arrayProducts[idx]
    if (product != undefined) {
        res.send(product);
        return
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
    res.send(JSON.stringify(product));
})

router.post('/productos', (req, res) => {
    var id = 1
    if (arrayProducts.length > 0) {
        id = arrayProducts[arrayProducts.length - 1].id + 1
    }
    req.body.id = id
    arrayProducts.push(req.body)
    res.send(req.body);
})

router.put('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let idx = getindex(id)
    let product = arrayProducts[idx]
    if (product != undefined) {
        req.body.id = id
        arrayProducts[idx] = req.body
        res.send(req.body);
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
})

router.delete('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let idx = getindex(id)
    let product = arrayProducts[idx]

    if (product != undefined) {
        arrayProducts.splice(idx, 1);
        res.send(product);
        return
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
})






function getindex(id) {
    var index = -1;
    arrayProducts.filter(function (producto, i) {
        if (producto.id === id) {
            index = i;
        }
    });
    return index;
}

module.exports = router