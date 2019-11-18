//
// (C) Yangee
// 

const grpc = require('grpc');
global.Mongoose = require('mongoose');
Mongoose.connect('mongodb://yngRldd:laser1962@198.100.45.12:27017/yangeeReloaded');

const proto = grpc.load('proto/employees.proto');
const server = new grpc.Server();
const employeeServices = require('../db/employees')

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.employees.EmployeesService.service, {

    List(call, callback) {
        employeeServices.list(callback);
    },

    get(call, callback) {
        let payload = {
            criteria: {
                employee_id: call.request.employee_id
            },
            projections: {
                _id: 0, __v: 0
            },
            options: {
                lean: true
            }
        };
        let emp = new employeeServices(payload);
        emp.fetch(callback);
    },

    Insert(call, callback) {
        let emp = new employeeServices({
            employee_id: call.request.employee_id,
            name: call.request.name,
            email: call.request.email,
        });
        emp.add(callback);
    },
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');