const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var options = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true };
var packageDefinition = protoLoader.loadSync('proto/yng.proto', options);
var proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.YngServices('localhost:50050', grpc.credentials.createInsecure());

client.UserInsert({
    user: "patricio10",
    password: "laser",
    email: "pgmonzon@gmail.com"
}, (error, response) => {
    if (!error) {
        console.log("Response Insert User: ", response.user)
    }
    else {
        console.log("Error Insert User: ", error.message);
    }
});
