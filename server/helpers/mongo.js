/**
 * Copyright (C) Yangee
 */

/**
 * Required
 */
const config = require('../config/config');
global.Mongoose = require('mongoose');

/**
 * Establece la conexión con MongoDB usando moongoose
 */
function connect() {
    Mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        .then(db => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB error'));
}

exports.connect = connect;