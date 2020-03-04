const express = require('express');
const router = express.Router();

let Song = require('../models/songs')

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

// => localhost:4000/songs
router.post('/', (req, res) => {
    let song = new Song(req.body);
    song.save()
        .then(song => {
            res.status(200).json({ 'song': 'song added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new song failed');
        })
})

module.exports = router