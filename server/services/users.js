/**
 * Copyright (C) Yangee
 */

/**
* Required
*/
const bcrypt = require('bcrypt');
const i18n = require('i18n');

const config = require('../config/config');
const userModel = require('../../models/user');
const userLoguedModel = require('../../models/userLogued');
const jwt = require('../helpers/jwt');

/**
 * Inserta un usuario
 * @param {User} call El usuario a insertar
 * @param {function(Error, User)} callback El usuario agregado o el error
 */
async function UserInsert(call, callback) {
    try {
        let usr = new userModel({
            user: call.request.user,
            password: bcrypt.hashSync(call.request.password, config.saltRounds),
            email: call.request.email,
        });
        await usr.save();
        callback(null, usr);
    } catch (error) {
        callback(error);
    }
}

/**
 * Lista todos los usuarios
 * @param {} _ El primer parámetro vacío
 * @param {function(Error, User)} callback La lista de los usuarios o el error
 */
async function UsersList(call, callback) {
    // Valida el token
    jwt.validateJWT(call, true, true, (err, _) => {if (err) {callback(err);}});

    try {
        let usrs = await userModel.find();
        callback(null, { users: usrs });
    } catch (error) {
        callback(error);
    }
}

/**
 * Login de usuario
 * @param {UserLogin} call El usuario a loguear
 * @param {function(Error, User)} callback El usuario logueado o el error
 */
async function UserLogin(call, callback) {
    // Valida el token
    jwt.validateJWT(call, false, false, (err, _) => { if (err) { callback(err); } });

    var err = new Error();

    if (!call.request.user || !call.request.password) {
        err.message = i18n.__('EmptyUserAndPassMessage');
        err.name = config.solutionErrorName;
        callback(err);
    }

    try {
        let usr = await userModel.findOne({ 'user': call.request.user });

        if (usr && bcrypt.compareSync(call.request.password, usr.password)) {
            let usrLogued = new userLoguedModel({
                user: usr.user,
                email: usr.email,
                token: jwt.generateJWT(usr),
            });

            callback(null, usrLogued);
        } else {
            err.message = i18n.__('AccessDenied');
            err.name = config.solutionErrorName;
            callback(err);
        }
    } catch (error) {
        callback(error);
    }
}

module.exports = {
    UserInsert,
    UsersList,
    UserLogin
}
