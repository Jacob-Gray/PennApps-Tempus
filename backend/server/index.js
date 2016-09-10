var express = require('express');
var app = express();

app.get("/", function(req, res){
    res.send("test")
})

var server = app.listen(3333, function () {
  console.log(server.address())
})
