const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

let Songs = require('../models/songs')

//get all the songs
// => localhost:4000/songs/
router.get('/', (req, res) => {
    Songs.find((err, songs) => {
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
    Songs.findById(requestedId, (err, song) => {
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
    Songs.findByIdAndUpdate(req.params.id, { $set: song }, { new: true }, (err, song) => {
        if (!err) {
            res.send(song);
        }
        else {
            console.log('Error in Song Update :' + JSON.stringify(err, undefined, 2));
        }
    })

    router.delete('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id: ${req.params.id}`)
        Songs.findByIdAndRemove(req.params.id, (err, song) => {
            if (!err) {
                res.send(song);
            }
            else {
                console.log(err)
                console.log('Error in Song Delete :' + JSON.stringify(err, undefined, 2));
            }
        })
    })

})

module.exports = router