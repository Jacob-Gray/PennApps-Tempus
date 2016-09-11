var express = require('express');
var router = express.Router();
var https = require('https');





var fun =  { send_sms: function(message){
var data = JSON.stringify({
 api_key: '29d25b32',
 api_secret: '6cfb16e32e946f1f',
 to: '16476084904',
 from: '12693014077',
 text: message
});
console.log('Sending Message');
var options = {
 host: 'rest.nexmo.com',
 path: '/sms/json',
 port: 443,
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(data)
 }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
 res.on('data', function(chunk){
   responseData += chunk;
 });

 res.on('end', function(){
   console.log(JSON.parse(responseData));
 });
});
}
}






module.exports = fun;