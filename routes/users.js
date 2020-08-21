const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');



// get all users
router.get('/', async(req, res) => {
    const users = await User.find();
    res.send(users);
});

// get a single user
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password'); // req.user => we added the user object from the jwt to the request in auth middleware
    res.send(user);
});

// using POST request to register a user 
router.post('/', async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check if a user with the same email already exsist
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registred');

    /*  user = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
     }); */

    // create the moadal object with lodash (shorter way)
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

    // hash the password before saving the user in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;


    user = await user.save();
    // i don't want to send password to the client , so i send the specific properties

    /*  res.send({
         user: user.name,
         email: user.email
     }); */

    // send the token in the header if you want to stay logged in
    const token = user.generateAuthToken();

    // or use lodash  (shorter way)
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email'])); // parameters are ('modal object',[property1,property2...])
});


module.exports = router;