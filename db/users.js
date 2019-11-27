let userModel = require('../models/user')
let User = class {
    constructor(payload) {
        this.payload = payload;
    }

    add(cb) {
        new userModel(this.payload).save(cb);
    }
};
module.exports = User;