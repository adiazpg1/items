var request = require("request");
const express = require("express");
var cheerio = require("cheerio");
var cors = require("cors");
var bodyParser = require("body-parser");


const app = express();
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}


var categorias = {
    'Combos Mother': 59,
    'Mother AMD': 26,
    'Mother Intel': 49,
    'Placa AMD': 62,
    'Placa Nvidia': 6,
    'Monitores': 5,
    'Consolas': 64,
    'Almacenamiento': 16,
    'Memoria RAM': 15,
    'Auriculares': 8,
    'Mouse PAD': 38,
    'Teclado': 39,
    'Mouses': 2
};


var listaItems = [];

for (let item in categorias) {
    let fullUrl = 'https://compragamer.com/index.php?seccion=3&cate=' + categorias[item] + '&nro_max=1000';

    request(fullUrl, function (err, response, html) {

        if (!err) {
            var $ = cheerio.load(html);
            var result = $('ul.products').children();

            result.each(function (index) {

                let nombre = result.eq(index).children().eq(1).children().find('a').text();
                let precio = result.eq(index).children().eq(1).children().eq(1).find('span').text();
                var srcImg = "https://compragamer.com/"+ result.eq(index).children().eq(0).children().attr('src');
                var link = "https://compragamer.com/" + result.eq(0).children().eq(1).find('a').attr('href');
                let producto = {};

                producto.nombre = nombre;
                producto.precio = precio;
                producto.categorias = item;
                producto.srcImg = srcImg;
                producto.link = link;
                console.log(link);
                console.log(srcImg)
                
                listaItems.push(producto);
            })
            console.log(item);

        } else {
            console.log("Error en la categoria: " + categorias[item])
        }
    })
}

app.route('/api/compragamer/items').get((req, res) => {
    res.send({
        listaItems
    })
});


app.listen(8084, () => {
    console.log("Server started")
    console.log(listaItems);
});