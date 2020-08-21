const mongoose = require('mongoose');

module.exports = function() {
    // Connect to DB
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to DB...'))
        .catch((err) => console.error('connection error: ', err.message));

}