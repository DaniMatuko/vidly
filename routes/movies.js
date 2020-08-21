const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');


// get all movies
router.get('/', async(req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

// post movie
router.post('/', auth, async(req, res) => {
    // validate movie input
    const { error } = validateMovie(req.body);
    //console.log(error);
    if (error) return res.status(400).send(error.details.map(err => err.message.trim()));

    // validate id
    let genre = await Genre.findById(req.body.genre);
    if (!genre) return res.status(400).send('Invalid genre');

    // build a movie schema object
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    // save movie

    movie = await movie.save();

    res.send(movie);

});

// update movie
router.put('/:id', auth, async(req, res) => {
    // validate movie
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // validate id
    let genre = await Genre.findById(req.body.genre);
    if (!genre) return res.status(400).send('Invalid genre');

    // update movie
    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true }); // option set to true -> returns the updated object

    res.send(movie);
});

// remove movie
router.delete('/:id', auth, async(req, res) => {

    // remove movie
    let movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(400).send('The movie ID was not found');

    res.send(movie);
});

module.exports = router;