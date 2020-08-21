const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer, validateCustomer } = require('../models/customer');
const auth = require('../middleware/auth');


// get all customers
router.get('/', async(req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

// post customer
router.post('/', auth, async(req, res) => {
    // validate customer
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // build a customer schema object
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    // save customer
    customer = await customer.save();

    res.send(customer);

});

// update customer
router.put('/:id', auth, async(req, res) => {
    // validate customer
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // update customer
    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true }); // option set to true -> returns the updated object

    res.send(customer);
});


// remove customer
router.delete('/:id', auth, async(req, res) => {
    // remover customer
    let customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(400).send('The customer ID was not found');

    res.send(customer);
});




module.exports = router;