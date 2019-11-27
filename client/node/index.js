const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
//console.log("proto path : ", protoPath)
const proto = grpc.load({ root: protoPath, file: 'yng.proto' });

//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.yangee.YngServices('localhost:50050', grpc.credentials.createInsecure());

client.EmployeeInsert({
    employee_id: parseInt(Math.random() * 1000000),
    name: "Amulya Kashyap",
    email: "amulyakashyap09@gmail.com"
}, (error, response) => {
    if (
        !error
    ) {
        console.log("Response : ", response)
    }
    else {
        console.log("Error:", error.message);
    }
});

client.EmployeesList({}, (error, response) => {
    if (!error) {
        console.log("Response : ", response)
    }
    else {
        console.log("Error:", error.message);
    }
});

client.UserInsert({
    user: "patricio",
    password: "laser",
    email: "pgmonzon@gmail.com"
}, (error, response) => {
    if (
        !error
    ) {
        console.log("Response : ", response)
    }
    else {
        console.log("Error:", error.message);
    }
});

client.UsersList({}, (error, response) => {
    if (!error) {
        console.log("Response : ", response)
    }
    else {
        console.log("Error:", error.message);
    }
});
