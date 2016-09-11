var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.post('/', function(req, res) {
  if(req.session && req.session.username){
  	console.log(req.session.username);
  	var email = req.session.username;
  	//var task = req.body.task;
  	//console.log(task);
	MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.collection('schedules').find({"_id":email,"tasks":{$exists: true}},{"_id":0,"tasks":1}).toArray(function(err, document) {
  	if(!document){
  		//console.log(document);
  		res.send('No tasks in your profile')
	}
	else{
    console.log(document)
				res.send(document);
	}
  });
}
});
}
  else{
  	res.send('Must be logged in to perform this action');
  }
});



        // Close the DB


module.exports = router;
