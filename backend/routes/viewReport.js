var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//var MongoClient = require('mongoose');
var dateFormat = require('dateformat');


router.post('/', function(req, res) {
  if(req.session && req.session.username){
  	var email = req.session.username;

    var startDate = new Date();

startDate.setSeconds(00);
startDate.setHours(00);
startDate.setMinutes(00);

var dateMidnight = new Date(startDate);
dateMidnight.setHours(23);
dateMidnight.setMinutes(59);
dateMidnight.setSeconds(59);
  	console.log(startDate);
  	console.log(dateMidnight);
    //startDate = dateFormat(startDate,"yyyy-mm-ddThh:MM:ssZ");
    //console.log(startDate);
	MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
    //db.collection('schedules').find({"_id":email,"schedules":{$exists: true},"schedules.start":{"$gt":startDate,"$lt":dateMidnight}}).toArray(function(err, document) {
      // db.collection('schedules').find({"_id":email,"schedule.tasks": {$elemMatch: {start: {"$gt":startDate,"$lt":dateMidnight} } }}).toArray(function(err, document) {
      db.collection('schedules').find({"_id":email}).toArray(function(err, document) {
  	if(!document){
  		//console.log(document);
  		res.send('No schedule today')
	}
	else{
    var finalJsonObject =[];
    console.log("-------------------------------------------------")
    console.log(document)
    var sendit = false;
        document.forEach(function(entry){
          if(entry.schedule){
            sendit = true;
          console.log(entry)
          console.log(entry.schedule[0].tasks);
          var tasks = entry.schedule[0].tasks;
          for(var task in tasks){
            console.log("hours:")
            var plannedHours = tasks[task].end - tasks[task].start;
            console.log(plannedHours);
            var actualHours = tasks[task].endDate - tasks[task].startDate;
            console.log(tasks[task].task)
            //console.log(actualHours);
            if(actualHours==0) actualHours = 1;
            finalJsonObject.push({"name":tasks[task].task,"plannedHours":plannedHours,"actualHours":1});
          }
        }
        })
				if(sendit) res.send(finalJsonObject);
	}
  });
}
});
}
  else{
  	res.send('Must be logged in to perform this action');
  }
});

//db.schedules.find({"_id":email,"schedules":{$exists: true},"schedules.start":new Date("2016-09-10T12:00:00Z")});
//db.schedules.find({"_id":"bxu@gmail.com","schedule.tasks": {$elemMatch: {start: new Date("2016-09-10T12:00:00Z")} } });

        // Close the DB


module.exports = router;
