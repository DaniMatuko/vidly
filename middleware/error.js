const winston = require('winston');
require('winston-mongodb');



// creating a logger
// in this case i log to 3 loactaions , the console , the logfile and mogodb (to 'log' document which created when a log is happening)
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' }),
        new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', metaKey: "meta" }) // <-- { metaKey: "meta" } just makes sure the field is saved under the name 'meta' in the database, probably not necessary.
    ]
});

module.exports = function(err, req, res, next) {
    logger.error(err.message, {
        meta: {
            message: err.message,
            name: err.name,
            stack: err.stack
        }
    });

    res.status(500).send('Something failed.');
};