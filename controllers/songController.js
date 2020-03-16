const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

let Song = require('../models/songs')

//get all the songs
// => localhost:4000/songs/
router.route('/').get((req, res) => {
    Song.find((err, songs) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(songs)
        }
    })
})

//get individual song
// => localhost:4000/songs/:id
router.route('/:id').get((req, res) => {
    Song.findOne({ _id: req.params.id }, (err, song) => {
        if (!err) {
            res.json(song)
        }
        else {
            res.status(404).json({ message: 'No Song With Id' })
        }
    })
})
//Create
// => localhost:4000/songs
router.route('/').post((req, res) => {
    let song = new Song(req.body);
    song.save()
        .then(song => {
            res.status(200).json({ 'song': song });
        })
        .catch(err => {
            res.status(400).send('adding new song failed');
        })
})
//Update
router.route('/:id').put((req, res, next) => {
    Song.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})
//Delete
router.route('/:id').delete((req, res, next) => {
    Song.deleteOne({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ 'id': req.params.id })
        }
    })
})

module.exports = router