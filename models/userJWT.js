const Schema = Mongoose.Schema;

let userJWT = new Schema({
    "_id": { type: String, required: true},
    "user": { type: String, required: true, unique: true },
    "email": { type: String, required: true },
}, { strict: true });

module.exports = Mongoose.model('usersJWT', userJWT);