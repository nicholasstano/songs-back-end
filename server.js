const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000;
var songController = require('./controllers/songController.js')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/songs', { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB Databse Connection Established Successfully.");
})

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})
app.use("/songs", songController)

// var unirest = require("unirest");

// var req = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/search");

// req.query({
//     "q": "search"
// });

// req.headers({
//     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     "x-rapidapi-key": "7d26b11e9fmsh70206a9d62dc8f9p15e225jsn5334110e63bb"
// });


// req.end(function (res) {
//     if (res.error) throw new Error(res.error);

//     console.log(res.body);
// });