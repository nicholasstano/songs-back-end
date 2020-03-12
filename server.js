const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000;
var songController = require('./controllers/songController.js')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/songs', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB Databse Connection Established Successfully.");
})

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})
app.use("/songs", songController)