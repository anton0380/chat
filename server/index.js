var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    favicon = require('serve-favicon'),
    server;

app.use(favicon(__dirname + '/public/images/actinidia.ico'));
app.use("/actinidia.jpg", express.static(__dirname + '/public/images/actinidia.jpg'));

app.disable('x-powered-by');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.route('/entry')
    .get(function(req, res){
        // вывот формы входа
        console.log(1);
        res.render('entry');
    })
    .post(function(req, res){
        console.log(req.body);
        var data = req.body;
        if (data.login && data.password) {
            // обработка входа
        }
        res.redirect('/');
    });

app.get('/:page?', function(req, res) {
    //res.send('Не известная страница!');
    console.log(req.params);
    var page = req.params.page;
    console.log(page);
    res.render('undefined');
});

server = app.listen(80, function(){
    console.log('Listening on port 80');
});
