//Setup enviroment
require('dotenv').config()
const port = process.env.PORT;
const apiKey = process.env.APIKEY;
const apiSecret = process.env.APISECRET;
const appId = process.env.APPID;

//START NGROK
var spawn = require('child_process').spawn;
var prc = spawn('ngrok',  ['http','--log=stdout',port]);

//noinspection JSUnresolvedFunction
prc.stdout.setEncoding('utf8');
prc.stdout.on('data', function (data) {
    var str = data.toString()
    var lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
});

prc.on('close', function (code) {
  console.log('ngrok was terminated')
  console.log('process exit code ' + code);
});

//GET THE URL
console.log("waiting for ngrok to start..")
setTimeout(function(){ 
const fetch = require('node-fetch')
fetch('http://localhost:4040/api/tunnels')
  .then(res => res.json())
  .then(json => json.tunnels.find(tunnel => tunnel.proto === 'https'))
  .then(secureTunnel => changeAppWebhooks(secureTunnel.public_url))
  .catch(err => {
    if (err.code === 'ECONNREFUSED') {
      return console.error("Looks like you're not running ngrok.");
    }
    console.error(err);
  })
},3000);


//UPDATE VONAGE API
function changeAppWebhooks(ip) {
  console.log(ip);

  const Nexmo = require('nexmo');
  const nexmo = new Nexmo({
      apiKey: apiKey,
      apiSecret: apiSecret,
      applicationId: appId,
      privateKey: './private.key'
  });

  const params = {
    "name": "My Application",
      "capabilities": {
        "messages": {
          "webhooks": {
            "inbound_url": {
              "address": ip + "/inbound",
              "http_method": "POST"
            },
            "status_url": {
              "address": ip + "/status",
              "http_method": "POST"
            }
          }
        },
      }
    }

  nexmo.applications.update(appId, params, (err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log('app updated')
      console.log('press ctrl-c to stop')
    }
  })
}

// var exec = require('child_process').exec;
// exec('pwd', function callback(error, stdout, stderr){
//     // result
// });

// var exec = require('child_process').exec;
// exec('node bgService.js &');

// var spawn = require('child_process').spawn;
// spawn('node', ['bgService.js'], {
//     detached: true
// });