const grpc = require('grpc');
const createMeta = require('grpc-create-metadata');
var protoLoader = require('@grpc/proto-loader');
var options = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true };
var packageDefinition = protoLoader.loadSync('proto/yng.proto', options);
var proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.YngServices('localhost:50050', grpc.credentials.createInsecure());

const meta = createMeta({
    authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZmE5MzM0YjI5ODA4M2JmYzJmYTMxMiIsInVzZXIiOiJwYXRyaWNpbzM0IiwiZW1haWwiOiJwZ21vbnpvbkBnbWFpbC5jb20ifSwiaWF0IjoxNTc3MzEyOTE5LCJleHAiOjE1NzczNTYxMTl9.QLUrZS6gm7Fxz2RErpi1ZfCzha5yh6XsmQBDrEkyqt9eQhM6RU23cHM-LWG5V6Wv1wBYm3Ernr7U0BXuXwg8Tw',
    locale: 'es'
});

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
*/
client.UsersList({}, meta, (error, response) => {
    if (!error) {
        console.log("Response List Users: ", response)
    }
    else {
        console.log("Error List Users: ", error.details);
    }
});
/*
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
*/
