/**
 * Copyright (C) Yangee
 */

/**
 * Required
 */
const mongo = require('./helpers/mongo');
const grpc = require('grpc');
const grpcServer = require('./helpers/grpcServer');

/**
 * Conecta la base de datos Mongo
 */
mongo.connect();

/**
 * gRPC configuración del server
 */
var server = grpcServer.getServer();
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

/**
 * Arranca el server
 */
server.start();
console.log('');
console.log('-------------------------------------------')
console.log('Yangee gRPC server:', '0.0.0.0:50050');