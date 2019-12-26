/**
 * Copyright (C) Yangee
 */

/**
 * Required
 */
const config = require('../config/config');
global.Mongoose = require('mongoose');
const i18n = require('i18n');

/**
 * Establece la conexión con MongoDB usando moongoose
 */
function connect() {
    Mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        .then(db => console.log(i18n.__('MongoDBConnected')))
        .catch(err => console.error(i18n.__('MongoDBError')));
}

exports.connect = connect;