const Schema = Mongoose.Schema;

let user = new Schema({
    "user": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "email": { type: String, required: true },
}, { strict: true });

module.exports = Mongoose.model('users', user);