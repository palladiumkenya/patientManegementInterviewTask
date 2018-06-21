/*
name: main.js
role: load all dependancies for our interview app
author: @theambidextrous
*/
var express = require('express')
var app = express()
var mysql = require('mysql')
/**
 * summoned the db connector
 */ 
var myConnection  = require('express-myconnection')
/**
 * load server meta
 */ 
var config = require('./config')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port, 
    database: config.database.db
}
/**
 * reach out to storage;
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'))
 
/**
 * summoned the templating view engine
 */ 
app.set('view engine', 'ejs')
 
/**
 * routing
 */ 
var index = require('./routes/index')
var patients = require('./routes/patients')
var users = require('./routes/users')
 
/**
 * Form Validator engine
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())
 
 
var bodyParser = require('body-parser')
/**
 * URL encoding of body content
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
 
/**
 * enable HTTP verbs such as PUT or DELETE 
 */ 
var methodOverride = require('method-override')
 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
/**
 * show flash messages/notifications e.g added successfully, deleted failed etc
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
app.use(cookieParser('j.o the great'))
app.use(session({ 
    secret: 'j.o the great',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())
 //routing
app.use('/', index)
app.use('/patients', patients)
app.use('/api/v0/users', users)
 
app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})