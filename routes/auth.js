// const config = require('config');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// using POST request to login
router.post('/', async(req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    // password authentication 
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send('Invalid email or password');

    // generate a token
    const token = user.generateAuthToken();

    res.send(token);
});


function validateLogin(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(255).required()
    };
    return Joi.validate(req, schema);
}


module.exports = router;