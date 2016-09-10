var express = require('express');
var app = express();

app.get("/", function(req, res){
    res.send("Whate")
});

var server = app.listen(9999, function () {
  console.log("listening on")
  console.log(server.address())
});
