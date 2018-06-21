
/*jshint -W003, -W098, -W117, -W026 */
"use strict";
var patientList = require('./../service/patient-list-service');
var winston = require('winston');
var path = require('path');
var _ = require('lodash');
var Boom = require('boom');

module.exports = function () {

    var routes = [
            {
                method: 'POST',
                path: '/save-patient-data',
                config: {
              //  auth: 'simple',
                    plugins: {},
                handler: function (request, reply) {

                    var payload = request.payload;
                    patientList.createPerson(payload)
                        .then(function (newReportStore) {
                             payload['person_id'] = newReportStore.insertId;
                            //patientList.createContacts(payload)
                               // .then(function(contacts) {
                                  //  patientList.createLocation(payload)
                                  //      .then(function(location){
                                            reply(newReportStore);

                                    //    });


                              //  });

                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply(error);
                                //Boom.create(500, 'Internal server error.', error)
                            }
                        });
                },
                description: "Create a patient details",
                    notes: "Api endpoint that creates patients",
                    tags: ['api']
                }
            },
        {
            method: 'POST',
            path: '/save-next-of-kin-data/{patientId}',
            config: {
                //  auth: 'simple',
                plugins: {},
                handler: function (request, reply) {

                    var payload = request.payload;
                    var patientId = request.params['patientId'];
                    patientList.createNextOfAsPerson(patientId,payload)
                        .then(function (newReportStore) {
                            payload['person_id'] = newReportStore.insertId;
                            patientList.createContacts(newReportStore.insertId,payload)
                                .then((con) =>{
                                    patientList.createNextOfKin(patientId,payload)
                                        .then(function(data) {
                                            reply(data);
                                        });
                                })


                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply(error);
                                //Boom.create(500, 'Internal server error.', error)
                            }
                        });
                },
                description: "Create a patient details",
                notes: "Api endpoint that creates patients",
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/patient-data/{id}',
            config: {
           // auth: 'simple',
                plugins: {},
            handler: function (request, reply) {
                var requestParams = request.params['id'];
                patientList.getPatientById(requestParams)
                    .then(function (reportStore) {
                        if (reportStore === null) {
                            reply(Boom.notFound('Resource does not exist'));
                        } else {
                            reply(reportStore);
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                        //reply( error);
                    });
            },
            description: "Get a given patient details",
                notes: "Api endpoint that returns patient based on the patient id",
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/enroll-next-of-kin-as-patient/{personId}',
            config: {
                //  auth: 'simple',
                plugins: {},
                handler: function (request, reply) {

                    var payload = request.payload;
                    var personId = request.params['personId'];
                    patientList.createPatient(personId,payload)
                        .then(function (newReportStore) {
                            reply(newReportStore);

                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply(error);
                                //Boom.create(500, 'Internal server error.', error)
                            }
                        });
                },
                description: "Create a patient details",
                notes: "Api endpoint that creates patients",
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/patient-next-of-kin-list/{patientId}',
            config: {
                // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    var requestParams = request.params['patientId'];
                    patientList.getListOfPatientNextOfKin(requestParams)
                        .then(function (reportStore) {
                            if (reportStore === null) {
                                reply(Boom.notFound('Resource does not exist'));
                            } else {
                                reply(reportStore);
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                            //reply( error);
                        });
                },
                description: "Get a given patient details",
                notes: "Api endpoint that returns patient based on the patient id",
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/update-person/{personId}',
            config: {
               // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    var personId = request.params['personId'];

                    var payload = request.payload;
                    patientList.updatePerson(personId,payload)
                        .then(function (person) {
                            reply(person);
                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply(error);
                            }
                        });
                },
                description: "updates person bio demographics",
                notes: "Api endpoint that updates person demographics",
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/update-location/{personId}',
            config: {
               // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    var personId = request.params['personId'];

                    var payload = request.payload;
                    patientList.updateLocation(personId,payload)
                        .then(function (location) {
                            reply(location);
                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply( error);
                            }
                        });
                },
                description: "Updates patient location details",
                notes: "Api endpoint that updates location details",
                tags: ['api']
            }

        },
        {
            method: 'POST',
            path: '/update-contacts/{personId}',
            config: {
              //  auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    var personId = request.params['personId'];

                    var payload = request.payload;
                    patientList.updateContacts(personId,payload)
                        .then(function (contact) {
                            reply(contact);
                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply(error);
                            }
                        });
                },
                description: "Updates contact details of a patient",
                notes: "Api endpoint that update patient contacts",
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/void-patient/{personId}',
            config: {
                // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    console.log('request===',request);
                    var personId = request.params['personId'];

                    var payload = request.payload;
                    patientList.voidPatient(personId)
                        .then(function (location) {
                            reply(location);
                        })
                        .catch(function (error) {
                            if (error && error.isValid === false) {
                                reply(Boom.badRequest('Validation errors:' + JSON.stringify(error)));
                            } else {
                                console.error(error);
                                reply( error);
                            }
                        });
                },
                description: "Updates patient location details",
                notes: "Api endpoint that updates location details",
                tags: ['api']
            }

        },
        {
            method: 'GET',
            path: '/patient',
            config: {
               // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    var requestParams = request.query['person_id'];
                    var requestName = request.query['name'];
                    console.log('personId',requestParams);
                    console.log('personId',requestName);
                        patientList.getPatient(requestParams,requestName)
                            .then(function (reportStore) {
                                if (reportStore === null) {
                                    reply(Boom.notFound('Resource does not exist'));
                                } else {
                                    reply(reportStore);
                                }
                            })
                            .catch(function (error) {
                                reply(error);
                            });

                },
                description: "Get particular patient details",
                notes: "Api endpoint that returns patient details based on the patient id",
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/patient-by-name',
            config: {
                // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    console.log('request',request.query);
                       var requestName = request.query['name'];
                    patientList.searchPatientbyName(requestName)
                        .then(function (reportStore) {
                            if (reportStore === null) {
                                reply(Boom.notFound('Resource does not exist'));
                            } else {
                                reply(reportStore);
                            }
                        })
                        .catch(function (error) {
                            reply(error);
                        });
                },
                description: "Get particular patient details",
                notes: "Api endpoint that returns patient details based on the patient id",
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/patient-all-patients',
            config: {
                // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    console.log('===reply',reply, request)
                   // var requestParams = request.query['person_id'];
                  //  var requestName = request.query['name'];
                    patientList.getAllPatients()
                        .then(function (reportStore) {
                            if (reportStore === null) {
                                reply(Boom.notFound('Resource does not exist'));
                            } else {
                                reply(reportStore);
                            }
                        })
                        .catch(function (error) {
                            reply(error);
                        });

                },
                description: "Get all patient details",
                notes: "Api endpoint that returns all patient details based on the patient id",
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/list-of-voided-patients',
            config: {
                // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    console.log('vrequest', reply );
                    patientList.getVoidedPatients()
                        .then(function (res) {
                            if (res === null) {
                                reply(Boom.notFound('Resource does not exist'));
                            } else {
                                reply(res);
                            }
                        })
                        .catch(function (error) {
                            reply(error);
                        });

                },
                description: "Get all patient details",
                notes: "Api endpoint that returns all patient details based on the patient id",
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/patient-by-age-cohorts',
            config: {
                // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    console.log('===reply',reply, request)
                     var requestParams = request.query['startAge'];
                      var endAge = request.query['endAge'];
                    patientList.getPatientsByAgeCohort(requestParams,endAge)
                        .then(function (reportStore) {
                            if (reportStore === null) {
                                reply(Boom.notFound('Resource does not exist'));
                            } else {
                                reply(reportStore);
                            }
                        })
                        .catch(function (error) {
                            reply(error);
                        });

                },
                description: "Get all patient details",
                notes: "Api endpoint that returns all patient details based on the patient id",
                tags: ['api']
            }
        },
];

return routes;
}();