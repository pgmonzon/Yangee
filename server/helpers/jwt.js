/**
 * Copyright (C) Yangee
 */

/**
* Required
*/
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('../config/config');

/**
 * Devuelve el JWT generado
 * @param {User} call El usuario para el cual generar el token
 * @return { token} el JWT generado
 */
function generateJWT(call) {
    const payload = {
        user: call
    }
    const signOptions = {
        expiresIn: config.expireIn,
        algorithm: config.algorithm
    }

    var cert = fs.readFileSync(config.privatePathKey);
    const token = jwt.sign(payload, { key: cert, passphrase: config.keyPassphrase}, signOptions);

    return token;
}

exports.generateJWT = generateJWT;