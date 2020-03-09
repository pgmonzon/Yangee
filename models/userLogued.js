const Schema = Mongoose.Schema;

let userLogued = new Schema({
    "user": { type: String, required: true, unique: true },
    "email": { type: String, required: true },
    "token": { type: String},
}, { strict: true });

module.exports = Mongoose.model('usersLogued', userLogued);