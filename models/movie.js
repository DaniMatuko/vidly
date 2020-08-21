const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');


// schema
const movieSchema = {
    title: String,
    // to embedd a document i need to set a property name and the value will be a schema of the document
    // if i only want a few properties of the embedded document, i should set the value to a *new* mongoose schema (like i did in the rental model) 
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate: Number
};

// model
const Movie = mongoose.model('Movie', movieSchema);

// validation
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3),
        genre: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };

    return Joi.validate(movie, schema, { abortEarly: false });
}

// export
exports.Movie = Movie;
exports.validateMovie = validateMovie;