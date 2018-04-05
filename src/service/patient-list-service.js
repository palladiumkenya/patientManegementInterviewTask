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
    createContaacts:createContaacts,
    createLocation:createLocation
};

module.exports = def;

function getPatientById(patientId) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('p.voided')
            .from('palladium.person', 'p')
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

function getPatient(patientId) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.select()
            .field('p.person_id')
            .field('p.name')
            .field('p.gender')
            .field('loc.sub_county')
            .field('loc.county')
            .field('loc.ward')
            .field('con.alternative_phone_number')
            .field('con.phone_number')
            .field('con.email_address')
            .field('p.voided')
            .from('palladium.person', 'p')
            .join('palladium.patient','pat', 'p.person_id = pat.patient_id')
            .join('palladium.location','loc', 'p.person_id = loc.person_id')
            .join('palladium.contacts','con', 'p.person_id = con.person_id')
            .where('p.person_id = ?', patientId)
            .where('pat.voided = ?', 0)
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

function voidPatient(PatientId) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.update()
            .table('palladium.patient')
            .set('voided', 1)
            .set('date_voided', squel.fval('NOW()'))
            .set('voided_by', getCurrentUserIdSquel())
            .where('report_store_id = ?', PatientId)
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

function createPerson(newPerson) {
    return new Promise(function (resolve, reject) {
      //  var requiredFieldsCheck = hasRequireReportStoreFields(newPerson);

        /*if (!requiredFieldsCheck.isValid) {
            return reject(requiredFieldsCheck);
        }*/
            /*validateCreatePayload(newPerson)
                .then(function (validationStatus) {
                    if (validationStatus.isValid === false) {
                        reject(validationStatus);
                    } else*/
                        {
                          //  console.log('newPerson=====', newPerson);
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
                                    createPatient(results)
                                        .then((res) =>{
                                            resolve( res);
                                        });
                                    console.log('results',results);

                                })
                                .catch((error) => {
                                    reject(error)
                                });

                    }

               // });
    });
}
function createPatient(newPatient) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();
        var query = squel.insert()
            .into('palladium.patient')
            .set('patient_id', newPatient.insertId)
            .set('date_created', squel.fval('NOW()'))
            .set('voided', 0)
            .set('creator', getCurrentUserIdSquel())
            .toString();
        runner.executeQuery(query)
            .then((results) => {
                createEnrollment(newPatient)
                    .then((res)=>{
                        resolve( res);
                    });

            })
            .catch((error) => {
                reject(error)
            });



    });

}


function createContaacts(newContacts) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.insert()
            .into('palladium.contacts')
            .set('person_id', newContacts.person_id)
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
function createLocation(newlocation) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();

        var query = squel.insert()
            .into('palladium.location')
            .set('patient_id', newlocation.person_id)
            .set('sub_county', newlocation.sub_county)
            .set('county', newlocation.county)
            .set('ward', newlocation.ward)
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
function createEnrollment(newEnrollment) {
    return new Promise(function (resolve, reject) {
        var runner = getSqlRunner();
        var query = squel.insert()
            .into('palladium.enrollment')
            .set('patient_id', newEnrollment.insertId)
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

function hasRequireReportStoreFields(createPersonPayload) {
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






