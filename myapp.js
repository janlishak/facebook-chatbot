// setup enviroment variables
require('dotenv').config()
const host = process.env.HOST;
const databaseFile = process.env.DATABASEFILE;
const port = process.env.PORT;
const apiKey = process.env.APIKEY;
const apiSecret = process.env.APISECRET;
const appId = process.env.APPID;

//Setup Libs
const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//FOR DEBUG
app.use(function (req, res, next) {
    console.log("#################################################################");
    console.log(req.body)
    console.log("#################################################################");
    next()
  })

// Webhooks
app.post('/inbound', (req, res) =>{
    console.log("this");
    console.log(req.body);
    res.status(200).end();
})

app.post('/status', (req, res) =>{
    console.log(req.body);
    res.status(200).end();
})

app.put('*',function (req, res) {
    console.log("Got request at unknown PUT url.")
    console.log(req.body);
    res.status(200).end();
    });

app.put('*',function (req, res) {
    console.log("Got request at unknown PUT url.")
    console.log(req.body);
    res.status(200).end();
    });

app.post('*',function (req, res) {
    console.log("Got request at unknown POST url.")
    console.log(req.body);
    res.status(200).end();
    });

console.log('starting to listen on port ' + port)
app.listen(port)
