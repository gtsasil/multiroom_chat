// importar modulo do framework express
var express = require('express');

// importar o modulo consign
var consign = require('consign');

// importar body-parser
var bodyParser = require('body-parser');

// importar express validator. Middleware
var expressValidator = require('express-validator');

//iniciar projeto do express
var app = express();
//========================================================

// setar as variaveis 'view engine' e 'view express'
app.set('view engine', 'ejs');
app.set('views', './app/views');

//========================================================
// configurar middleware express.static
app.use(express.static('./app/public'));

//configurar middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

// configurar o middleware express-validator
app.use(expressValidator());
//========================================================
// afetuar autoload das 'routes','module' e 'controllers'
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app)//todos os modulos carregados pelo 'consign' serao inseridos dentro de 'app'

module.exports = app;