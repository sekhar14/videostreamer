const express = require('express');
const bodyParser = require('body-parser');
const videos = require('./routes/route');
const path = require('path');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));
app.use('/videos',videos);
app.use(express.static(path.join(__dirname, '/client/build' )));


app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen("8080", () => {
    console.log("server running at http://localhost:8080")
})