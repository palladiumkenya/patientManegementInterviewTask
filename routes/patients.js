var express = require('express')
var app = express()
 
// get users - patients filter
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT palladium_users.`UserID`, CONCAT(`FirstName`,' ', `LastName`, ' ', `MiddleName`) as Name, `DateOfBirth`, `Gender`, `Age`, `MaritalStatus`, `Height`, `Weight`, `DateEnrolled`, `PhoneNumber`, `Email` FROM `palladium_users`, `palladium_contact_information` WHERE palladium_users.UserID = palladium_contact_information.UserID AND palladium_users.IsDisabled = 0 AND palladium_users.IsDeleted = 0",function(err, rows, fields) {
            if (err) {
                req.flash('error', err)
                res.render('user/list', {
                    title: 'User List', 
                    data: ''
                })
            } else {
                res.render('user/list', {
                    title: 'Enrolled Patients', 
                    data: rows
                })
            }
        })
    })
})
 
// new user form
app.get('/add', function(req, res, next){    
    res.render('user/add', {
        title: 'Create New User',
        name: '',
        age: '',
        email: ''        
    })
})
 
app.post('/add', function(req, res, next){    
    req.assert('name', 'Name is required').notEmpty()          
    req.assert('age', 'Age is required').notEmpty()             
    req.assert('email', 'A valid email is required').isEmail() 
    var errors = req.validationErrors()
    if( !errors ) {   
        //clean some inputs- security matters!
        var user = {
            name: req.sanitize('name').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO users SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        name: user.name,
                        age: user.age,
                        email: user.email                    
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/add', {
                        title: 'Add New User',
                        name: '',
                        age: '',
                        email: ''                    
                    })
                }
            })
        })
    }
    else {   
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        res.render('user/add', { 
            title: 'Add New User',
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
    }
})
 
// edit user
app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with id = ' + req.params.id)
                res.redirect('/users')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/edit', {
                    title: 'Edit User', 
                    //data: rows[0],
                    id: rows[0].id,
                    name: rows[0].name,
                    age: rows[0].age,
                    email: rows[0].email                    
                })
            }            
        })
    })
})
 
// post edit
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()           
    req.assert('age', 'Age is required').notEmpty()             
    req.assert('email', 'A valid email is required').isEmail() 
 
    var errors = req.validationErrors()
    
    if( !errors ) {   

        var user = {
            name: req.sanitize('name').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/edit', {
                        title: 'Edit User',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/edit', { 
            title: 'Edit User',            
            id: req.params.id, 
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
    }
})
 
// delete == switch user's delete flag to 1
app.delete('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
    
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/users')
            } else {
                req.flash('success', 'User deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/users')
            }
        })
    })
})
 
module.exports = app