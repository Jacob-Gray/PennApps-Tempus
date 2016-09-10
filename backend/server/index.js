var express = require('express');
var app = express();

app.get('/users/:name', function (req, res) {
   res.send('Hello '+ req.params.name + "!");
})

app.get("/", function(req, res){
    res.send("test")
})

var server = app.listen(process.env.PORT, function () {

console.log("LISTENING")
})
