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
        title: 'Enroll New User/Patient',
        UserID: '',
        FirstName: '',
        LastName: '',
        MiddleName: '',
        DateOfBirth: '',
        Gender: '',
        Age: '',
        MaritalStatus: '',
        Height: '',
        Weight: '',
        UserType: '',
        DateEnrolled: '',
        Address: '',
        PhoneNumber: '',
        AltPhone: '',
        Email: '',
        County: '',
        SubCounty: '',
        Ward: '',
        Village: '',
        NokName: '',
        NokEmail: '',
        NokAddress: '',
        Relationship: ''        
    })
})
app.post('/add', function(req, res, next){    
    req.assert('UserID', 'Empty field detected').notEmpty() 
    req.assert('FirstName', 'Empty field detected').notEmpty()          
    req.assert('LastName', 'Empty field detected').notEmpty() 
    req.assert('MiddleName', 'Empty field detected').notEmpty() 
    req.assert('DateOfBirth', 'Empty field detected').notEmpty() 
    req.assert('Gender', 'Empty field detected').notEmpty()
    req.assert('Age', 'Empty field detected').notEmpty()  
    req.assert('MaritalStatus', 'Empty field detected').notEmpty() 
    req.assert('Height', 'Empty field detected').notEmpty()  
    req.assert('Weight', 'Empty field detected').notEmpty()
    req.assert('UserType', 'Empty field detected').notEmpty()
    req.assert('DateEnrolled', 'Empty field detected').notEmpty()  
    req.assert('Address', 'Empty field detected').notEmpty()    
    req.assert('PhoneNumber', 'Empty field detected').notEmpty()
    req.assert('AltPhone', 'Empty field detected').notEmpty()          
    req.assert('Email', 'valid email is required').isEmail() 
    req.assert('County', 'Empty field detected').notEmpty()          
    req.assert('SubCounty', 'Empty field detected').notEmpty()
    req.assert('Ward', 'Empty field detected').notEmpty() 
    req.assert('Village', 'Empty field detected').notEmpty()                
    req.assert('NokName', 'Empty field detected').notEmpty()          
    req.assert('NokEmail', 'valid email is required').isEmail() 
    req.assert('NokAddress', 'Empty field detected').notEmpty()          
    req.assert('Relationship', 'Empty field detected').notEmpty()  
    var errors = req.validationErrors()
    if( !errors ) {   
        //secure user input
        var user = {
            UserID: req.sanitize('UserID').escape().trim(),
            FirstName: req.sanitize('FirstName').escape().trim(),
            LastName: req.sanitize('LastName').escape().trim(),
            MiddleName: req.sanitize('MiddleName').escape().trim(),
            DateOfBirth: req.sanitize('DateOfBirth').escape().trim(),
            Gender: req.sanitize('Gender').escape().trim(),
            Age: req.sanitize('Age').escape().trim(),
            MaritalStatus: req.sanitize('MaritalStatus').escape().trim(),
            Height: req.sanitize('Height').escape().trim(),
            Weight: req.sanitize('Weight').escape().trim(),
            UserType: req.sanitize('UserType').escape().trim(),
            DateEnrolled: req.sanitize('DateEnrolled').escape().trim()
        }
        var contact = {
            UserID: req.sanitize('UserID').escape().trim(),
            Address: req.sanitize('Address').escape().trim(),
            PhoneNumber: req.sanitize('PhoneNumber').escape().trim(),
            AltPhone: req.sanitize('AltPhone').escape().trim(),
            Email: req.sanitize('Email').escape().trim(),
            County: req.sanitize('County').escape().trim(),
            SubCounty: req.sanitize('SubCounty').escape().trim(),
            Ward: req.sanitize('Ward').escape().trim(),
            Village: req.sanitize('Village').escape().trim()
        }
        var nextofkin = {
            NokName: req.sanitize('NokName').escape().trim(),
            NokEmail: req.sanitize('NokEmail').escape().trim(),
            NokAddress: req.sanitize('NokAddress').escape().trim(),
            Relationship: req.sanitize('Relationship').escape().trim(),
            UserID: req.sanitize('UserID').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO `palladium_users` SET ?', user, function(err, result) {
                if (err) {
                    req.flash('error', err)
                    
                    // show form with user input
                    res.render('user/add', {
                        title: 'Enroll New User/Patient',
                        UserID: user.UserID,
                        FirstName: user.FirstName,
                        LastName: user.LastName, 
                        MiddleName: user.MiddleName, 
                        DateOfBirth: user.DateOfBirth, 
                        Gender: user.Gender, 
                        Age: user.Age, 
                        MaritalStatus: user.MaritalStatus, 
                        Height: user.Height, 
                        Weight: user.Weight, 
                        UserType: user.UserType, 
                        DateEnrolled: user.DateEnrolled               
                    })
                } else {                
                    req.flash('success', 'Added successfully!')
                    // show form for another entry
                    res.render('user/add', {
                        title: 'Enroll New User/Patient',
                        UserID: '',
                        FirstName: '',
                        LastName: '', 
                        MiddleName: '', 
                        DateOfBirth: '', 
                        Gender: '', 
                        Age: '', 
                        MaritalStatus: '', 
                        Height: '', 
                        Weight: '', 
                        UserType: '', 
                        DateEnrolled:''                       
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