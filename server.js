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

app.get('/productDetail/:id', function (req, res) {
    axios
        .get(`http://localhost:3001/api/products/${req.params.id}`)
        .then(function (response) {
            // handle success
            console.log(response);
            res.render('productDetail.ejs', {product: response.data});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

app.get('/productEdit/:id', function (req, res) {
    axios
        .get(`http://localhost:3001/api/products/${req.params.id}`)
        .then(function (response) {
            // handle success
            res.render('productEdit.ejs', {product: response.data});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});


app.post('/update/:id', function (req, res) {
    var updateUri = `http://localhost:3001/api/products/${req.params.id}`
    console.log(req.body)
    axios
        .put(updateUri, {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
        })
        .then(function (response) {
            // console.log(response.data);
            res.redirect('/');
        })
        .catch(function (error) {
            console.log(error);
        });
});


// https://stackoverflow.com/questions/18629327/adding-css-file-to-ejs
// https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
