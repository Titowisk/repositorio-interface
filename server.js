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

/** ======================================
 * CREATE
 * =======================================
 */
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
            watch: req.body.watch,
            star: req.body.star,
            fork: req.body.fork,
            usedby: req.body.usedby,
            issues: req.body.issues,
            pullRequests: req.body.pullRequests,
        })
        .then(function (response) {
            console.log(response.data);
            res.redirect('/productList');
        })
        .catch(function (error) {
            console.log(error);
        });
});

/** ======================================
 * Get All
 * =======================================
 */
app.get('/productList', function (req, res) {
    axios
        .get('http://localhost:3001/api/products')
        .then(function (response) {
            // handle success
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


/** ======================================
 * Get by Id
 * =======================================
 */
app.get('/productDetail/:id', function (req, res) {
    axios
        .get(`http://localhost:3001/api/products/${req.params.id}`)
        .then(function (response) {
            // handle success
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

/** ======================================
 * Update
 * =======================================
 */
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
            watch: req.body.watch,
            star: req.body.star,
            fork: req.body.fork,
            usedby: req.body.usedby,
            issues: req.body.issues,
            pullRequests: req.body.pullRequests,
        })
        .then(function (response) {
            res.redirect('/productList');
        })
        .catch(function (error) {
            console.log(error);
        });
});

/** ======================================
 * DELETE
 * =======================================
 */
app.get('/productRemove/:id', function (req, res) {
    axios
        .delete(`http://localhost:3001/api/products/${req.params.id}`)
        .then(function (response) {
            // handle success
            res.redirect('/productList');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

// https://stackoverflow.com/questions/18629327/adding-css-file-to-ejs
// https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
// https://stackoverflow.com/questions/9838216/using-ejs-how-do-i-insert-a-value-if-it-exists

