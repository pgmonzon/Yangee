let userModel = require('../models/user')
let User = class {
    constructor(payload) {
        this.payload = payload;
    }

    static list(cb) {
        const criteria = {};
        const projections = {
            _id: 0,
            __v: 0
        };
        const options = {
            lean: true
        };
        userModel.find(criteria, projections, options, cb);
    }

    add(cb) {
        new userModel(this.payload).save(cb);
    }
};
module.exports = User;