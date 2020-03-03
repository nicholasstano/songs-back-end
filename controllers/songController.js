const express = require('express');
const router = express.Router();

let Song = require('../models/songs')

// => localhost:4000/employees/
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

module.exports = router