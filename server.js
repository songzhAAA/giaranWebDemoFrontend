/**
 * Created by szh on 20/04/2017.
 */
var express = require('express');
var path = require('path');
var hbs = require('hbs');
var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(path.join(__dirname, 'public')));



app.get('/recommendation',function (req, res) {
    res.render(path.join(__dirname, 'public/Recommendation.html'));
});
app.get('/try',function (req, res) {
    res.render(path.join(__dirname, 'public/TryProduct.html'));
});
app.get('/mobile', function (req, res) {
    res.render(path.join(__dirname, 'public/GiaranMobileDemo.html'));
});
app.listen(3000,function () {
    console.log('Listening on 3000');
});