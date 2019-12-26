/**
 * Copyright (C) Yangee
 */

/**
* Required
*/
const jwt = require('jsonwebtoken');
const fs = require('fs');
const i18n = require('i18n');

const config = require('../config/config');
const userJWTModel = require('../../models/userJWT');

/**
 * Devuelve el JWT generado
 * @param {User} call El usuario para el cual generar el token
 * @return {token} el JWT generado
 */
function generateJWT(call) {
    var userJWT = new userJWTModel({
        _id: call._id,
        user: call.user,
        email: call.email
    });

    const payload = {
        user: userJWT
    }
    const signOptions = {
        expiresIn: config.expireIn,
        algorithm: config.algorithm
    }

    var cert = fs.readFileSync(config.privatePathKey);
    const token = jwt.sign(payload, { key: cert, passphrase: config.keyPassphrase}, signOptions);

    return token;
}

/**
 * Valida el token recibido
 * @param {call} call La call con el token que se va a validar
 * @param {boolean} authentication Valida el token
 * @param {boolean} autorization Valida si tiene permiso 
 * @param {function(Error, Valid)} callback Si es válido o el error
 */
function validateJWT(call, authentication, autorization, callback) {
    var err = new Error();
    var token = call.metadata._internal_repr.authorization.toString();
    var locale = call.metadata._internal_repr.locale.toString();
    var cert = fs.readFileSync(config.publicPathKey);

    // Establece el lenguaje
    if (locale) {
        i18n.setLocale(locale);
    }

    // Si authentication y autorization == false
    if (!authentication && !autorization) {
        callback(null, true);
    } else {
        // Si autorizaion == true, authentication debe ser == false
        if (autorization && !authentication) {
            err.message = i18n.__('AuthenticationRequired');
            err.name = config.solutionErrorName;
            callback(err);
        } else {
            // Verifico la authentication
            jwt.verify(token, cert, function (error, decoded) {
                if (error) {
                    err.message = i18n.__('InvalidToken');
                    err.name = config.solutionErrorName;
                    callback(err);
                } else {
                    if (autorization) {
                        // Hacer aca la autorización por rol
                        if (true) {
                            process.env['USER_LOGUED'] = decoded.user;
                            callback(null,true);
                        } else {
                            err.message = i18n.__('PermissionRequired');
                            err.name = config.solutionErrorName;
                            callback(err);
                        }
                    } else {
                        process.env['USER_LOGUED'] = decoded.user;
                        callback(null, true);
                    }
                }
            });
        }
    }

    callback(null, true);
}

module.exports = {
    generateJWT,
    validateJWT
}
