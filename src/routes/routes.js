
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
                path: '/save/patient-data',
                config: {
              //  auth: 'simple',
                    plugins: {},
                handler: function (request, reply) {

                    var payload = request.payload;
                    patientList.createPerson(payload)
                        .then(function (newReportStore) {
                             payload['person_id'] = newReportStore.insertId;
                            console.log('request.payload===', newReportStore);
                            patientList.createContaacts(payload)
                                .then(function(contacts) {
                                    patientList.createLocation(payload)
                                        .then(function(location){
                                            reply(location);

                                        });


                                });

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
            method: 'GET',
            path: '/patient/{id}',
            config: {
               // auth: 'simple',
                plugins: {},
                handler: function (request, reply) {
                    var requestParams = request.params['id'];
                    patientList.getPatient(requestParams)
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
];

return routes;
}();