var express = require('express');
var router = express.Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);

var MongoClient = require('mongodb').MongoClient;

io.on('connection', function(socket){
  console.log('a user connected');
});

router.post('/', function(req, res) {
  if(req.session && req.session.username){
  	console.log(req.session.username);
  	var email = req.session.username;
  	var scheduleName = req.body.name;
    var length = req.body.length;
    var tasksString = req.body.tasks;
    var tasks = JSON.parse(tasksString);
    console.log(tasks);
    var startDate = req.body.start;
    var endDate = req.body.end;
  	//console.log(task);
	MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {

  if(!err) {
    console.log("We are connected");
    db.collection('schedules').find({"_id":email,"schedule.name": scheduleName}).count(function(err,document){
        if(document == 0){
          db.collection('schedules').update({"_id":email}, { $addToSet:{"schedule":{"name":scheduleName,"length":length,"tasks":tasks}}},{upsert:true});
        res.send('Added schedule successfully');
        }
        else{
          res.send('Already have schedule by this name');
        }
    })
				
	}
  });
}
  else{
  	res.send('Must be logged in to perform this action');
  }
});

/*tasks:[{name:cricket},{name:swimming}]
create schedule : [{name:cricket,start:start,end:end}]

tasks:[{}{}]

schedule: [{
  name: something
  lenght: 20
tasks:[{name:"",start:,end:},{}]
}
{
name:
length:

}]*/


        // Close the DB
        

module.exports = router;
