const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/in', (req, res) =>{
    console.log(req.body);
    res.status(200).end();
})

app.post('/st', (req, res) =>{
    console.log(req.body);
    res.status(200).end();
})

app.listen(4000)
