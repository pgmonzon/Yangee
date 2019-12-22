const grpc = require('grpc');
const createMeta = require('grpc-create-metadata');
var protoLoader = require('@grpc/proto-loader');
var options = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true };
var packageDefinition = protoLoader.loadSync('proto/yng.proto', options);
var proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.YngServices('localhost:50050', grpc.credentials.createInsecure());

const meta = createMeta({
    authorization: 'Bearer: 1234567890'
});

console.dir(meta.getMap());

/*
client.UserInsert({
    user: "patricio34",
    password: "laser",
    email: "pgmonzon@gmail.com"
}, (error, response) => {
    if (!error) {
        console.log("Response Insert User: ", response)
    }
    else {
        console.log("Error Insert User: ", error.details);
    }
});

client.UsersList({}, (error, response) => {
    if (!error) {
        console.log("Response List Users: ", response)
    }
    else {
        console.log("Error List Users: ", error.details);
    }
});
*/
client.UserLogin({
    user: "patricio34",
    password: "laser"
}, meta, function(error, response) {
    if (!error) {
        console.log("Login User: ", response)
    }
    else {
        console.log("Error Login: ", error.details);
    }
});