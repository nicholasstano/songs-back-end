const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Song = ({
    rank: { type: Number },
    current_rank: { type: Number },
    title: { type: String },
    artist: { type: String },
    album: { type: String },
})

module.exports = mongoose.model("Song", Song)