const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Song = ({
    rank: { type: Number },
    title: { type: String },
    artist: { type: String },
    album: { type: String },
    sample: { type: String }
})

module.exports = mongoose.model("Song", Song)