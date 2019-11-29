//
// (C) Yangee
// 

// Required
const config = require('./config/config');
global.Mongoose = require('mongoose');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const employeeDBServices = require('../db/employees');
const userDBServices = require('../db/users');

// Database connect
Mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(db => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error'));

// gRPC
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}
const packageDefinition = protoLoader.loadSync('proto/yng.proto', options);
const proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.YngServices.service, {
    // Employees
    EmployeesList(call, callback) {
        employeeDBServices.list(callback);
    },
    EmployeeInsert(call, callback) {
        let emp = new employeeDBServices({
            employee_id: call.request.employee_id,
            name: call.request.name,
            email: call.request.email,
        });
        emp.add(callback);
    },

    // Users
    UsersList(call, callback) {
        userDBServices.list(callback);
    },
    UserInsert(call, callback) {
        let usr = new userDBServices({
            user: call.request.user,
            password: call.request.password,
            email: call.request.email,
        });
        usr.add(callback);
    },
})

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('');
console.log('-------------------------------------------')
console.log('Yangee gRPC server:', '0.0.0.0:50050');