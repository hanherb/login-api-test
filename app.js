var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./route.js');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, navPlugin');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Access-Control-Allow-Headers, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', route);

app.use(express.static(__dirname + '/public',{ redirect : false }));

var server = app.listen(3000, function () {
  var port = server.address().port;
  var address = server.address().address;

    console.log('App listening at port:', address + port);
});