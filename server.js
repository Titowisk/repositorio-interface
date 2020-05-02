const express = require('express');
const axios = require('axios');

const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('./static'));

app.listen(3000, function () {
    console.log('servidor rodando na porta 3000');
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index.ejs');
});

var postUri = 'http://localhost:3001/api/products';
app.post('/createProduct', function (req, res) {
    axios
        .post(postUri, {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
        })
        .then(function (response) {
            console.log(response.data);
            res.redirect('/');
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get('/productList', function (req, res) {
    axios
        .get('http://localhost:3001/api/products')
        .then(function (response) {
            // handle success
            console.log(response);
            res.render('productList.ejs', {data: response.data.docs});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});
