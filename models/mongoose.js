require('dotenv').config();
const MONGO_URL =process.env.MONGO_URL;

const mongoose = require('mongoose');

mongoose.connect(MONGO_URL);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user',userSchema);