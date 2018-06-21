/*jshint -W003, -W097, -W117, -W026 */
'use strict';

var Promise = require('bluebird');
var squel = require('squel');
var _ = require('underscore');
var moment = require('moment');
var config = require('../config/config');
var connection = require('../connection/mysql-connection-service');
import QueryService from '../connection/query.service';


var def = {
    getPatientById: getPatientById,
    voidPatient: voidPatient,
    updateContacts: updateContacts,
    createPerson: createPerson,
    updatePerson:updatePerson,
    updateLocation: updateLocation,
    getPatient:getPatient,
    createContacts:createContacts,
    createLocation:createLocation,
    createNextOfAsPerson:createNextOfAsPerson,
    searchPatientbyName:searchPatientbyName,
    createNextOfKin:createNextOfKin,
    getVoidedPatients: getVoidedPatients,
    createPatient:createPatient,
    getListOfPatientNextOfKin:getListOfPatientNextOfKin,
    getAllPatients:getAllPatients,
    getPatientsByAgeCohort:getPatientsByAgeCohort
};

module.exports = def;

function getPatientById(patientId) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('p.birth_date')
            .field('YEAR(CURDATE()) - YEAR(p.birth_date)','age')
            .field('loc.sub_county')
            .field('loc.county')
            .field('loc.ward')
            .field('loc.village')
            .field('con.alternative_phone_number')
            .field('con.phone_number')
            .field('con.email_address')
            .from('palladium.person', 'p')
            .left_outer_join('palladium.location','loc', 'p.person_id = loc.patient_id')
            .left_outer_join('palladium.contacts','con', 'p.person_id = con.person_id')
            .where('p.person_id = ?', patientId)
            .toString();
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}
function getAllPatients() {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('p.birth_date')
            .field('YEAR(CURDATE()) - YEAR(p.birth_date)','age')
            .field('loc.sub_county')
            .field('loc.county')
            .field('loc.ward')
            .field('loc.village')
            .field('con.alternative_phone_number')
            .field('con.phone_number')
            .field('con.email_address')
            .from('palladium.person', 'p')
            .join('palladium.patient','pt', 'p.person_id = pt.patient_id')
            .left_outer_join('palladium.location','loc', 'p.person_id = loc.patient_id')
            .left_outer_join('palladium.contacts','con', 'p.person_id = con.person_id')
            .where('pt.voided = ?', 0)
            .toString();
        console.log('querryyyy',query);
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}
function getPatientsByAgeCohort(startAge, endAge) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('p.birth_date')
            .field('YEAR(CURDATE()) - YEAR(p.birth_date)','age')
            .field('loc.sub_county')
            .field('loc.county')
            .field('loc.ward')
            .field('loc.village')
            .field('con.alternative_phone_number')
            .field('con.phone_number')
            .field('con.email_address')
            .from('palladium.person', 'p')
            .join('palladium.patient','pt', 'p.person_id = pt.patient_id')
            .left_outer_join('palladium.location','loc', 'p.person_id = loc.patient_id')
            .left_outer_join('palladium.contacts','con', 'p.person_id = con.person_id')
            .where('YEAR(CURDATE()) - YEAR(p.birth_date) <= ?', endAge)
            .where('YEAR(CURDATE()) - YEAR(p.birth_date) >= ?', startAge)
            .where('pt.voided = ?', 0)
            .toString();
        console.log('querryyyy',query);
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}
function createNextOfAsPerson(id,payload) {
    return new Promise(function (resolve, reject) {

        {
            var runner = getSqlRunner();
            var query = squel.insert()
                .into('palladium.person')
                .set('name', payload.name)
                .set('birth_date',payload.birth_date)
                .set('gender', payload.gender)
                .set('date_created', squel.fval('NOW()'))
                .set('creator', getCurrentUserIdSquel())
                .set('voided', 0)
                .toString();
            runner.executeQuery(query)
                .then((results) => {
                resolve( results);

                })
                .catch((error) => {
                    reject(error)
                });

        }


    });

}

function getVoidedPatients() {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('t1.patient_id')
            .field('t1.date_voided')
            .field('t2.person_id')
            .field('t2.name')
            .field('t2.gender')
            .field('t2.birth_date')
            .field('YEAR(CURDATE()) - YEAR(t2.birth_date)','age')
            .from('palladium.patient', 't1')
            .join('palladium.person','t2', 't1.patient_id = t2.person_id')
            .where('t1.voided = ?', 1)
            .toString();
        console.log('query===',query)
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}
function getListOfPatientNextOfKin(patientId) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('t1.patient_id')
            .field('t1.next_of_kin_id')
            .field('t2.person_id')
            .field('t2.name')
            .field('t2.gender')
            .field('t2.birth_date')
            .field('YEAR(CURDATE()) - YEAR(t2.birth_date)','age')
            .field('t3.phone_number')
            .field('t4.patient_id','nexKinIsPatient')
            .from('palladium.nextOfKin', 't1')
            .join('palladium.person','t2', 't1.next_of_kin_id = t2.person_id')
            .left_outer_join('palladium.contacts','t3', 't2.person_id = t3.person_id')
            .left_outer_join('palladium.patient','t4', 't2.person_id = t4.patient_id')
            .where('t1.patient_id = ?', patientId)
            .toString();
        console.log('nextofKinquery',query);
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}

function getPersonIdSquel() {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('MAX(person_id)')
            .from('palladium.person')
            .toString()
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });
    });
}

function getPatient(patientId, name) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('p.birth_date')
            .field('YEAR(CURDATE()) - YEAR(p.birth_date)','age')
            .field('pat.patient_id')
            .field('loc.sub_county')
            .field('loc.county')
            .field('loc.ward')
            .field('loc.village')
            .field('con.alternative_phone_number')
            .field('con.phone_number')
            .field('con.email_address')
           // .field('p.voided')
            .from('palladium.patient','pat') //'palladium.person', 'p'
            .join('palladium.person', 'p', 'pat.patient_id = p.person_id')
            .left_outer_join('palladium.location','loc', 'p.person_id = loc.patient_id')
            .left_outer_join('palladium.contacts','con', 'p.person_id = con.person_id')
            .where(
                squel.expr()
                    .or('p.name  like ?', '%'+name + '%')
                    .or('p.person_id  like ?', '%'+patientId + '%')
            )
            .where('pat.voided = ?', 0)
            .toString();
        console.log('query',query);
        runner.executeQuery(query)
            .then((results) => {
          //      console.log('results',results);
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}

function searchPatientbyName(name) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('p.birth_date')
            .field('YEAR(CURDATE()) - YEAR(p.birth_date)','age')
            .field('loc.sub_county')
            .field('loc.county')
            .field('loc.ward')
            .field('loc.village')
            .field('con.alternative_phone_number')
            .field('con.phone_number')
            .field('con.email_address')
            // .field('p.voided')
            .from('palladium.person', 'p')
            // .join('palladium.patient','pat', 'p.person_id = pat.patient_id')
            .left_outer_join('palladium.location','loc', 'p.person_id = loc.patient_id')
            .left_outer_join('palladium.contacts','con', 'p.person_id = con.person_id')
            .where('p.name = ?', name)
            // .where('pat.voided = ?', 0)
            .toString();
        // console.log('query',query);
        runner.executeQuery(query)
            .then((results) => {
                //      console.log('results',results);
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}

function voidPatient(PatientId) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.update()
            .table('palladium.patient')
            .set('voided', 1)
            .set('date_voided', squel.fval('NOW()'))
            .set('voided_by', getCurrentUserIdSquel())
            .where('patient_id = ?', PatientId)
            .toString();
        console.log('querryyy',query);
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });
}

function createPerson(newPerson) {
    return new Promise(function (resolve, reject) {

        {
            var runner = getSqlRunner();
                var query = squel.insert()
                    .into('palladium.person')
                    .set('name', newPerson.name)
                    .set('birth_date',newPerson.birth_date)
                    .set('gender', newPerson.gender)
                    .set('date_created', squel.fval('NOW()'))
                    .set('creator', getCurrentUserIdSquel())
                    .set('voided', 0)
                    .toString();



            runner.executeQuery(query)
                .then((results) => {
                    createContacts(results.insertId,newPerson)
                        .then((con) => {

                            createPatient(results.insertId,newPerson)
                                .then((res) => {
                                    createLocation(results.insertId,newPerson)
                                        .then((loc) =>{
                                            console.log('con---===',loc);
                                            resolve( loc);
                                        });

                                });


                            resolve( con);


                        })
                })
                .catch((error) => {
                    reject(error)
                });

    }


    });
}
function createPatient(newPatient, payload) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();
        var query = squel.insert()
            .into('palladium.patient')
            .set('patient_id', newPatient)
            .set('date_created', squel.fval('NOW()'))
            .set('voided', 0)
            .set('creator', getCurrentUserIdSquel())
            .toString();
        runner.executeQuery(query)
            .then((results) => {
                createEnrollment(newPatient, payload)
                    .then((res)=>{
                        resolve( res);
                    });

            })
            .catch((error) => {
                reject(error)
            });



    });

}


function createContacts(personId,newContacts) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.insert()
            .into('palladium.contacts')
            .set('person_id', personId)
            .set('phone_number', newContacts.phone_number)
            .set('alternative_phone_number', newContacts.alternative_phone_number)
            .set('email_address', newContacts.email_address)
            .set('voided', 0)
            .set('date_created', squel.fval('NOW()'))
            .set('creator', getCurrentUserIdSquel())
            .toString();
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });


    });

}
function createLocation(personId,newlocation) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.insert()
            .into('palladium.location')
            .set('patient_id', personId)
            .set('sub_county', newlocation.sub_county)
            .set('county', newlocation.county)
            .set('ward', newlocation.ward)
            .set('village', newlocation.village)
            .set('voided', 0)
            .set('date_created', squel.fval('NOW()'))
            .set('creator', getCurrentUserIdSquel())
            .toString();
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });

    });

}
function createEnrollment(newEnrollment, payload) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();
        var query = squel.insert()
            .into('palladium.enrollment')
            .set('patient_id', newEnrollment)
            .set('date_of_enrollement', payload.date_of_enrollement)
            .set('voided', 0)
            .set('date_created', squel.fval('NOW()'))
            .set('creator', getCurrentUserIdSquel())
            .toString();
        runner.executeQuery(query)
            .then((results) => {
                resolve( results);
            })
            .catch((error) => {
                reject(error)
            });



    });

}

function createNextOfKin(id,payload) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();
        var query = squel.insert()
            .into('palladium.nextOfKin')
            .set('patient_id', id)
            .set('next_of_kin_id',payload.person_id)
            .set('voided', 0)
            .set('date_created', squel.fval('NOW()'))
            .set('creator', getCurrentUserIdSquel())
            .toString();
        runner.executeQuery(query)
            .then((results) => {
               // createNextOfAsPerson(payload)
                  //  .then((res) => {
                        resolve( results);
                    //})

            })
            .catch((error) => {
                reject(error)
            });



    });

}

function updatePerson(personId, newPersonData) {
    return new Promise(function (resolve, reject) {
        validateUpdatePayload(newPersonData)
            .then(function (validationStatus) {
                if (validationStatus.isValid === false) {
                    reject(validationStatus);
                } else {

                    var runner = getSqlRunner();
                    var query = squel.update()
                        .table('palladium.person')
                        .set('name', newPersonData.name)
                        .set('gender', newPersonData.gender)
                        .set('birth_date', newPersonData.birth_date)
                        .set('date_changed', squel.fval('NOW()'))
                        .set('changed_by', getCurrentUserIdSquel())
                        .where('person_id = ?', personId)
                        .toString();
                    runner.executeQuery(query)
                        .then((results) => {
                            resolve( results);
                        })
                        .catch((error) => {
                            reject(error)
                        });


                }

            });
    });
}

function updateLocation(personId, newLocationData) {
    return new Promise(function (resolve, reject) {
        validateUpdatePayload(newLocationData)
            .then(function (validationStatus) {
                if (validationStatus.isValid === false) {
                    reject(validationStatus);
                } else {
                    var runner = getSqlRunner();
                    var query = squel.update()
                        .table('palladium.location')
                        .set('sub_county', newLocationData.sub_county)
                        .set('county', newLocationData.county)
                        .set('ward', newLocationData.ward)
                        .set('village', newLocationData.village)
                        .set('date_changed', squel.fval('NOW()'))
                        .set('changed_by', getCurrentUserIdSquel())
                        .where('patient_id = ?', personId)
                        .toString();
                    runner.executeQuery(query)
                        .then((results) => {
                            resolve( results);
                        })
                        .catch((error) => {
                            reject(error)
                        });


                }

            });
    });
}

function updateContacts(personId, newContact) {
    return new Promise(function (resolve, reject) {
        validateUpdatePayload(newContact)
            .then(function (validationStatus) {
                if (validationStatus.isValid === false) {
                    reject(validationStatus);
                } else {
                    var runner = getSqlRunner();

                    var query = squel.update()
                        .table('palladium.contacts')
                        .set('phone_number', newContact.phone_number)
                        .set('email_address', newContact.email_address)
                        .set('alternative_phone_number', newContact.alternative_phone_number)
                        .set('date_changed', squel.fval('NOW()'))
                        .set('changed_by', getCurrentUserIdSquel())
                        .where('person_id = ?', personId)
                        .toString();
                    runner.executeQuery(query)
                        .then((results) => {
                            resolve( results);
                        })
                        .catch((error) => {
                            reject(error)
                        });

                }

            });
    });
}




function getCurrentUserIdSquel() {
    return squel.select().field('MAX(user_id)')
        .from('palladium.users').where('user_id = ?', 233);
}

function getPersonIdSquel() {
    return squel.select().field('MAX(person_id)')
        .from('palladium.person')
}


function validateUpdatePayload(createPersonPayload) {
    return new Promise(function (resolve, reject) {
        var validationErrors = {
            isValid: true,
            errors: []
        };

        resolve(validationErrors);
    });
}

function validateCreatePayload(createPersonPayload) {
    return new Promise(function (resolve, reject) {
        var validationErrors = {
            isValid: true,
            errors: []
        };

        if (!createPersonPayload.name) {
            validationErrors.isValid = false;
            validationErrors.errors.push({
                field: 'name',
                error: 'name does not exist.'
            });
        }

        if (validationErrors.errors.length > 1) {
            return resolve(validationErrors);
        }
    });
}


function getSqlRunner() {
    return new QueryService();
}

function hasRequireFields(createPersonPayload) {
    var validationResult = {
        isValid: true,
        errors: []
    };
    if (_.isEmpty(createPersonPayload.name)) {
        validationResult.isValid = false;
        validationResult.errors.push({
            field: 'name',
            message: 'name is required'
        });
    }

    if (_.isEmpty(createPersonPayload.gender)) {
        validationResult.isValid = false;
        validationResult.errors.push({
            field: 'gender',
            message: 'gender is required'
        });
    }

    return validationResult;
}






