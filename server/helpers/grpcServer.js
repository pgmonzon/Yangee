/**
 * Copyright (C) Yangee
 */

/**
* Required
*/
const config = require('../config/config');
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var options = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true };
var packageDefinition = protoLoader.loadSync(config.proto_path, options);
var proto = grpc.loadPackageDefinition(packageDefinition);
const users = require('../services/users');

/**
 * Devuelve un nuevo server gRPC con las funciones y los
 * métodos que sirve
 * @return {server} el nuevo server
 */
function getServer() {
    var server = new grpc.Server();
    server.addService(proto.YngServices.service, {
      /**
       * Usuarios
       */
      UserInsert: users.UserInsert,
      UsersList: users.UsersList,
      UserLogin: users.UserLogin
    });
    return server;
}

exports.getServer = getServer;