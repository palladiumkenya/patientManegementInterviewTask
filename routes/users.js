var express = require('express')
var app = express()
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query("SELECT * FROM palladium_users ",function(err, rows, fields) {
			if(err){
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
			}else{
				res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));
			}
		})
	})
})

module.exports = app
