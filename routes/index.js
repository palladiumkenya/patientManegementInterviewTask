/*
name: index.js
role: landing page for our interview app - Simplest landing page - empty landing page
author: @theambidextrous
*/
var express = require('express')
var app = express()
app.get('/', function(req, res) {
    // dig into EJS temp engine to retrieve our index view.
    res.render('index', {title: 'Patients Management App | Palladium Group KE'})
})
module.exports = app;