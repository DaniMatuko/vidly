const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    isAdmin: Boolean
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivateKey);
    return token;
};

const User = mongoose.model('User', userSchema);


function validateUser(user) {
    // install 'joi-objectid' packge to use objectId()
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(255).required(),
        isAdmin: Joi.optional()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;