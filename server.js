var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var allowedOrigins = ["http://localhost:3000", "https://happily-ever-after.herokuapp.com/"]

var app = express();
app.use(function(req, res, next) {
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Origin",
        origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function(req, res) {
    res.send('Hello World!')
});


es = require('./elasticSearchConnect');
login = require('./login')
login(app);
es(app);
app.listen(process.env.PORT || 4000)

