var express = require('express')
var app = express()
 
//GET ALL USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT palladium_users.`UserID`, CONCAT(`FirstName`,' ', `LastName`, ' ', `MiddleName`) as Name, `DateOfBirth`, `Gender`, `Age`, `MaritalStatus`, `Height`, `Weight`, `DateEnrolled`, `PhoneNumber`, `Email` FROM `palladium_users`, `palladium_contact_information` WHERE palladium_users.UserID = palladium_contact_information.UserID AND palladium_users.IsDisabled = 0 AND palladium_users.IsDeleted = 0",function(err, rows, fields) {
            if (err) {
                req.flash('error', err)
                res.render('user/list', {
                    title: 'Enrolled Users', 
                    data: ''
                })
            } else {
                res.render('user/list', {
                    title: 'Enrolled Users', 
                    data: rows
                })
            }
        })
    })
})
//GET ALL USER OF TYPE = patient
app.get('/patient', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT palladium_users.`UserID`, CONCAT(`FirstName`,' ', `LastName`, ' ', `MiddleName`) as Name, `DateOfBirth`, `Gender`, `Age`, `MaritalStatus`, `Height`, `Weight`, `DateEnrolled` FROM `palladium_users` WHERE UserType = 1 AND palladium_users.IsDisabled = 0 AND palladium_users.IsDeleted = 0",function(err, rows, fields) {
            if (err) {
                req.flash('error', err)
                res.render('user/patient', {
                    title: 'Patients', 
                    data: ''
                })
            } else {
                res.render('user/patient', {
                    title: 'Patients', 
                    data: rows
                })
            }
        })
    })
})
//GET ARCHIVES
app.get('/archives', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT palladium_users.`UserID`, CONCAT(`FirstName`,' ', `LastName`, ' ', `MiddleName`) as Name, `DateOfBirth`, `Gender`, `Age`, `MaritalStatus`, `Height`, `Weight`, `DeletedOn` FROM `palladium_users` WHERE UserType = 1 AND palladium_users.IsDisabled = 0 AND palladium_users.IsDeleted = 1",function(err, rows, fields) {
            if (err) {
                req.flash('error', err)
                res.render('user/archives', {
                    title: 'Archives', 
                    data: ''
                })
            } else {
                res.render('user/archives', {
                    title: 'Archives', 
                    data: rows
                })
            }
        })
    })
})
//GET PATIENT'S NEXT OF KIN
app.get('/nextofkin', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT  palladium_nextofkin.EntryID,palladium_users.`UserID`, CONCAT(`FirstName`,' ', `LastName`, ' ', `MiddleName`) as Name,`NokName`,`NokEmail`,`NokAddress`,`Relationship` FROM palladium_users,palladium_nextofkin WHERE palladium_users.UserID = palladium_nextofkin.UserID AND palladium_users.UserType = 1 AND palladium_nextofkin.IsDisabled = 0 AND palladium_nextofkin.IsDeleted = 0 GROUP BY palladium_users.UserID",function(err, rows, fields) {
            if (err) {
                req.flash('error', err)
                res.render('user/nextofkin', {
                    title: 'Patients Next of Kin', 
                    data: ''
                })
            } else {
                res.render('user/nextofkin', {
                    title: 'Patients Next of Kin', 
                    result: rows
                })
            }
        })
    })
})
//GET PATIENT'S CONTACT INFO
app.get('/contact', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT  palladium_contact_information.EntryID, CONCAT(`FirstName`,' ', `LastName`, ' ', `MiddleName`) as Name, palladium_contact_information.`UserID`,`Address`,`PhoneNumber`,`AltPhone`,`Email`,`County`,`SubCounty`,`Ward`,`Village` FROM palladium_users,palladium_contact_information WHERE palladium_users.UserID = palladium_contact_information.UserID AND palladium_users.UserType = 1 GROUP BY palladium_users.UserID",function(err, rows, fields) {
            if (err) {
                req.flash('error', err)
                res.render('user/contact', {
                    title: 'Patients Contact Information', 
                    result: ''
                })
            } else {
                res.render('user/contact', {
                    title: 'Patients Contact Information', 
                    result: rows
                })
            }
        })
    })
})
// DISPLAY ADD NEW FORM
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
//POST ADD NEW SQL COMMAND - bio, contact, next of kin
app.post('/add', function(req, res, next){    
    req.assert('UserID', 'User ID required').notEmpty() 
    req.assert('FirstName', 'First name required').notEmpty()          
    req.assert('LastName', 'Last name required').notEmpty() 
    req.assert('MiddleName', 'middle name required').notEmpty() 
    req.assert('DateOfBirth', 'DOB required').notEmpty() 
    req.assert('Gender', 'Gender required').notEmpty()
    req.assert('Age', 'Age required').notEmpty()  
    req.assert('MaritalStatus', 'Status required').notEmpty() 
    req.assert('Height', 'Health required').notEmpty()  
    req.assert('Weight', 'Weight required').notEmpty()
    req.assert('UserType', 'User type required').notEmpty()
    req.assert('Address', 'Address required').notEmpty()    
    req.assert('PhoneNumber', 'Tel required').notEmpty()
    req.assert('AltPhone', 'Phone2 required').notEmpty()          
    req.assert('Email', 'Email valid email is required').isEmail() 
    req.assert('County', 'County required').notEmpty()          
    req.assert('SubCounty', 'Subcounty required').notEmpty()
    req.assert('Ward', 'Ward required').notEmpty() 
    req.assert('Village', 'Village required').notEmpty()                
    req.assert('NokName', 'Next of kin name required').notEmpty()          
    req.assert('NokEmail', 'Next of kin email is required').isEmail() 
    req.assert('NokAddress', 'Next of kin address required').notEmpty()          
    req.assert('Relationship', 'Relationship required').notEmpty()  
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
            UserType: req.sanitize('UserType').escape().trim()
            // DateEnrolled: req.sanitize('DateEnrolled').escape
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
            }),
            //add contact info
            conn.query('INSERT INTO `palladium_contact_information` SET ?', contact, function(err, result) {
                if (err) {
                    req.flash('error', err)
                    
                    // show form with user input
                    res.render('user/add', {
                        title: 'Enroll New User/Patient',
                        Address: contact.Address,
                        PhoneNumber: contact.PhoneNumber,
                        AltPhone: contact.AltPhone,
                        Email: contact.Email,
                        County: contact.County,
                        SubCounty: contact.SubCounty,
                        Ward: contact.Ward,
                        Village: contact.Village
                    })
                } else {                
                    req.flash('success', 'Added successfully!')
                    // show form for another entry
                    res.render('user/add', {
                        title: 'Enroll New User/Patient',
                        Address: '',
                        PhoneNumber: '',
                        AltPhone: '', 
                        Email: '', 
                        County: '', 
                        SubCounty: '', 
                        Ward: '', 
                        Village: ''                     
                    })
                }
            }),
             //add next of kin
             conn.query('INSERT INTO `palladium_nextofkin` SET ?', nextofkin, function(err, result) {
                if (err) {
                    req.flash('error', err)
                    
                    // show form with user input
                    res.render('user/add', {
                        title: 'Enroll New User/Patient',
                        NokName: nextofkin.NokName,
                        NokEmail: nextofkin.NokEmail,
                        NokAddress: nextofkin.NokAddress,
                        Relationship: nextofkin.Relationship,
                        UserID: nextofkin.UserID
                    })
                } else {                
                    req.flash('success', 'Added successfully!')
                    // show form for another entry
                    res.render('user/add', {
                        title: 'Enroll New User/Patient',
                        NokName: '',
                        NokEmail: '',
                        NokAddress: '', 
                        Relationship: '', 
                        UserID: ''                   
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
            title: 'Enroll New User/Patient',
            UserID: req.body.UserID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            MiddleName: req.body.MiddleName,
            DateOfBirth: req.body.DateOfBirth,
            Gender: req.body.Gender,
            Age: req.body.Age,
            MaritalStatus: req.body.MaritalStatus,
            Height: req.body.Height,
            Weight: req.body.Weight,
            UserType: req.body.UserType,
            Address: req.body.Address,
            PhoneNumber: req.body.PhoneNumber,
            AltPhone: req.body.AltPhone,
            Email: req.body.Email,
            County: req.body.County,
            SubCounty: req.body.SubCounty,
            Ward: req.body.Ward,
            Village: req.body.Village,
            NokName: req.body.NokName,
            NokEmail: req.body.NokEmail,
            NokAddress: req.body.NokAddress,
            Relationship: req.body.Relationship

        })
    }
})
//DISPLAY UPDATE FORM - USER
app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM palladium_users WHERE UserID = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
            
            if (rows.length <= 0) {
                req.flash('error', '404 - Zero Entries found with ID = ' + req.params.id)
                res.redirect('/patients')
            }
            else { 
                res.render('user/edit', {
                    title: 'Manage System Users', 
                    UserID: rows[0].UserID,
                    FirstName: rows[0].FirstName,
                    LastName: rows[0].LastName,
                    MiddleName: rows[0].MiddleName, 
                    DateOfBirth: rows[0].DateOfBirth,
                    Gender: rows[0].Gender,
                    Age: rows[0].Age,
                    MaritalStatus: rows[0].MaritalStatus,
                    Height: rows[0].Height,
                    Weight: rows[0].Weight,
                    UserType: rows[0].UserType,
                    MaritalStatus: rows[0].MaritalStatus                        
                })
            }            
        })
    })
})
// UPDATE FORM - NEXT OF KIN
app.get('/editnok/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM `palladium_nextofkin` WHERE `EntryID` = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
            
            if (rows.length <= 0) {
                req.flash('error', '404 - Zero Entries found with ID = ' + req.params.id)
                res.redirect('/patients')
            }
            else { 
                res.render('user/editnok', {
                    title: 'Manage System Users Next of Kin', 
                    EntryID: rows[0].EntryID,
                    NokName: rows[0].NokName,
                    NokEmail: rows[0].NokEmail,
                    NokAddress: rows[0].NokAddress, 
                    Relationship: rows[0].Relationship                       
                })
            }            
        })
    })
})
//POST UPDATE SQL COMMAND
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('UserID', 'User ID required').notEmpty() 
    req.assert('FirstName', 'First name required').notEmpty()          
    req.assert('LastName', 'Last name required').notEmpty() 
    req.assert('MiddleName', 'middle name required').notEmpty() 
    req.assert('DateOfBirth', 'DOB required').notEmpty() 
    req.assert('Gender', 'Gender required').notEmpty()
    req.assert('Age', 'Age required').notEmpty()  
    req.assert('MaritalStatus', 'Status required').notEmpty() 
    req.assert('Height', 'Health required').notEmpty()  
    req.assert('Weight', 'Weight required').notEmpty()
    req.assert('UserType', 'User type required').notEmpty() 
    var errors = req.validationErrors()
    if( !errors ) {   

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
            UserType: req.sanitize('UserType').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE palladium_users SET ? WHERE UserID = ' + req.params.id, user, function(err, result) {
                if (err) {
                    req.flash('error', err)
                    res.render('user/edit', {
                        title: 'Manage System Users',
                        UserID: req.params.id,
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        MiddleName: req.body.MiddleName,
                        DateOfBirth: req.body.DateOfBirth,
                        Gender: req.body.Gender,
                        Age: req.body.Age,
                        MaritalStatus: req.body.MaritalStatus,
                        Height: req.body.Height,
                        Weight: req.body.Weight,
                        UserType: req.body.UserType
                    })
                } else {
                    req.flash('success', 'Changes Commited!')
                    res.render('user/edit', {
                        title: 'Manage System Users',
                        UserID: req.params.id,
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        MiddleName: req.body.MiddleName,
                        DateOfBirth: req.body.DateOfBirth,
                        Gender: req.body.Gender,
                        Age: req.body.Age,
                        MaritalStatus: req.body.MaritalStatus,
                        Height: req.body.Height,
                        Weight: req.body.Weight,
                        UserType: req.body.UserType
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
        res.render('user/edit', { 
            title: 'Manage System Users',            
            UserID: req.params.id,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            MiddleName: req.body.MiddleName,
            DateOfBirth: req.body.DateOfBirth,
            Gender: req.body.Gender,
            Age: req.body.Age,
            MaritalStatus: req.body.MaritalStatus,
            Height: req.body.Height,
            Weight: req.body.Weight,
            UserType: req.body.UserType
        })
    }
})
//POST UPDATE FOR NEXT OF KIN   
app.put('/editnok/(:id)', function(req, res, next) {
    req.assert('EntryID', 'User ID required').notEmpty() 
    req.assert('NokName', 'Name required').notEmpty()          
    req.assert('NokEmail', 'Valid email required').isEmail() 
    req.assert('NokAddress', 'Address required').notEmpty() 
    req.assert('Relationship', 'Field required').notEmpty() 
    var errors = req.validationErrors()
    if( !errors ) {   

        var user = {
            EntryID: req.sanitize('EntryID').escape().trim(),
            NokName: req.sanitize('NokName').escape().trim(),
            NokEmail: req.sanitize('NokEmail').escape().trim(),
            NokAddress: req.sanitize('NokAddress').escape().trim(),
            Relationship: req.sanitize('Relationship').escape().trim()
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE `palladium_nextofkin` SET ? WHERE EntryID = ' + req.params.id, user, function(err, result) {
                if (err) {
                    req.flash('error', err)
                    res.render('user/editnok', {
                        title: 'Manage System Users Next of Kin',
                        EntryID: req.params.id,
                        NokName: req.body.NokName,
                        NokEmail: req.body.NokEmail,
                        NokAddress: req.body.NokAddress,
                        Relationship: req.body.Relationship
                    })
                } else {
                    req.flash('success', 'Changes Commited!')
                    res.render('user/editnok', {
                        title: 'Manage System Users Next of Kin',
                        EntryID: req.params.id,
                        NokName: req.body.NokName,
                        NokEmail: req.body.NokEmail,
                        NokAddress: req.body.NokAddress,
                        Relationship: req.body.Relationship
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
        res.render('user/editnok', { 
            title: 'Manage System Users Next of Kin',
            EntryID: req.params.id,
            NokName: req.body.NokName,
            NokEmail: req.body.NokEmail,
            NokAddress: req.body.NokAddress,
            Relationship: req.body.Relationship
        })
    }
})
//SET USER DELETE FLAG TO 0
app.delete('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
    
    req.getConnection(function(error, conn) {
        conn.query('UPDATE `palladium_users` SET `IsDeleted`= 1,`DeletedOn`= NOW() WHERE `UserID` = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/patients')
            } else {
                req.flash('success', req.params.id + ' Sent to trash!')
                // redirect to users list page
                res.redirect('/patients')
            }
        })
    })
})
 
module.exports = app