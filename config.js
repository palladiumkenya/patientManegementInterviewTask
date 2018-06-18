/*
name: config.js
role: db server config settings
author: @theambidextrous
*/
var config = {
    database: {
        host:      'localhost',     
        user:       'palladiumke',         
        password: 'palladiumke',        
        port:       3306,       
        db:       'palladiumke'      
    },
    server: {
        host: '127.0.0.1',
        port: '8080' //set this to your local env port
    }
}
 
module.exports = config