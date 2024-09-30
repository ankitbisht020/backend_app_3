const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/backend_app_3');

const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    caption: { type: String, required: true},
    imageurl: { type: String, required: true },
    userid: { type: String ,required: true},
    createat:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('posts',userSchema);