var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;





/* GET home page. */
router.post('/', function(req, res) {
  if(req.session && req.session.username){
  	//console.log(req.session.username);
  	var email = req.session.username;
  	var task = req.body.task;
  	//console.log(task);
	MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.collection('schedules').find({"_id":email,"tasks.name":task}).count( function(err, document) {
  	if(document != 0){
  		db.collection('schedules').update({"_id":email},{$pull:{"tasks":{"name":task}}},false,true);
      res.send('Removed the task');
	}
	else{
		res.send('No such task ');
  }
  });
 /* var cursor = db.collection('schedules').find({"_id":email,"tasks.name":task});
  console.log(cursor.count);
  if(!cursor.hasNext() ){
    res.send('No such task');
  }
*/
}
//db.close();
});
}

  else{
  	res.send('Must be logged in to perform this action');
  }
});



        // Close the DB
        

module.exports = router;
