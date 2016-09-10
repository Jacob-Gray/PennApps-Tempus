var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.post('/', function(req, res) {
  if(req.session && req.session.username){
  	console.log(req.session.username);
  	var email = req.session.username;
  	var task = req.body.task;
  	//console.log(task);
	MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.collection('schedules').find({"_id":email,"tasks.name":task}).count(function(err, document) {
  	if(document != 0){
  		//console.log(document);
  		res.send('Task by this name already created. Use it to create schedule')
	}
	else{
		db.collection('schedules').update({"_id":email}, { $addToSet:{"tasks":{"name": task}}},{upsert:true});
			
				res.send('Added tag successfully');		
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
