/**
 * Copyright (C) Yangee
 */

/**
* Required
*/
const userModel = require('../../models/user');

/**
 * Inserta un usuario
 * @param call El usuario a insertar
 * @return El usuario agregado o el error
 */
async function UserInsert(call, callback) {
    try {
        let usr = new userModel({
            user: call.request.user,
            password: call.request.password,
            email: call.request.email,
        });
        await usr.save();
        callback(null, { usr });
    } catch (error) {
        callback(error);
    }
}

/**
 * Lista los usuarios
 * @return La lista de todos los usuarios
 */
async function UsersList(_, callback) {
    let usrs = await userModel.find();
    callback(null, { usrs: usrs });
}

module.exports = {
    UserInsert,
    UsersList
}
