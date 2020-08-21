const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
    process.on('unhandledRejection', (ex) => {
        console.log('I Got unhandledRejection!! ' + ex);
        winston.error('msg->' + ex.message, ex);
        process.exit(1);
    });


}