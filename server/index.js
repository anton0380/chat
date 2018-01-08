var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    favicon = require('serve-favicon'),
    server;

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017/test", function(err, db){
    if(err){
        return console.log(err);
    }
    // взаимодействие с базой данных
    db.close();
});

// для отладки
var store = {
    logged: false
}

app.use(favicon(__dirname + '/public/images/actinidia.ico'));
app.use("/actinidia.jpg", express.static(__dirname + '/public/images/actinidia.jpg'));
app.use("/styles.css", express.static(__dirname + '/css/styles.css'));

app.disable('x-powered-by');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// авторизация пользователя
app.route('/entry')
    .get(function(req, res){
        // вывот формы входа
        console.log(1);
        res.render('entry', Object.assign({selected: 'entry'},store));
    })
    .post(function(req, res){
        console.log(req.body);
        var data = req.body;
        if (data.login && data.password) {
            // обработка входа
        }
        res.redirect('/');
    });

// регистрация нового пользователя
app.route('/reg')
    .get(function(req, res){
        // вывот формы регистрации
        console.log(1);
        res.render('reg', Object.assign({selected: 'reg'},store));
    })
    .post(function(req, res){
        console.log(req.body);
        var data = req.body;
        if (data.login && data.password) {
            // обработка регистрации
        }
        res.redirect('/');
    });

// здесь главная страница
app.route('/home')
    .get(function(req, res){
        // вывот главной страницы
        res.render('home', Object.assign({selected: 'home'},store));
    })
    .post(function(req, res){
        console.log(req.body);
        var data = req.body;
        if (data.login && data.password) {
            // обработка данных ввода
        }
        res.redirect('/');
    });

app.get('/:page?', function(req, res) {
    //res.send('Не известная страница!');
    console.log(req.params);
    var page = req.params.page;
    console.log(page);
    if (page == 'about') {
        res.render('about', Object.assign({selected: 'about'},store));
        return;
    }
    res.render('undefined', store);
});

server = app.listen(80, function(){
    console.log('Listening on port 80');
});
