const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

let Song = require('../models/songs')

//get all the songs
// => localhost:4000/songs/
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    let requestedId = req.params.id;
    Song.findById(requestedId, (err, song) => {
        if (!err) {
            res.json(song)
        }
        else {
            res.status(404).json({ message: 'No Song With Id' })
        }
    })
})

//add a new song
// => localhost:4000/songs
router.post('/', (req, res) => {
    let song = new Song(req.body);
    song.save()
        .then(song => {
            res.status(200).json({ 'song': song });
        })
        .catch(err => {
            res.status(400).send('adding new song failed');
        })
})

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    var song = {
        rank: req.body.rank,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        sample: req.body.sample
    }
    Song.updateOne({ _id: req.params.id }, { $set: song }, { new: true }, (err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            console.log('Error in Song Update :' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.route('/:id').delete((req, res, next) => {
    Song.deleteOne({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router