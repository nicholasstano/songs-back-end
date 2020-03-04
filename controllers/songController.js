const express = require('express');
const router = express.Router();

let Song = require('../models/songs')

// => localhost:4000/songs/
router.get('/', (req, res) => {
    Song.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retreiving Songs:' + JSON.stringify(err, undefined, 2));
        }
    });
})

router.post('/', (req, res) => {
    var song = new Song({
        rank: req.body.rank,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album
    })
    song.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Song Save :' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router