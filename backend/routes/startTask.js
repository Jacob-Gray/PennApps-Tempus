var express = require('express');
var router = express.Router();
var http = require('http').Server(router);
//var io = require('socket.io')(http);

var MongoClient = require('mongodb').MongoClient;

/*io.on('connection', function(socket){
  console.log('a user connected');
});*/

router.post('/', function(req, res) {
  if(req.session && req.session.username){
  	console.log(req.session.username);
  	var email = req.session.username;
    var task = req.body.task;
    var start = req.body.start;
    var schedule = req.body.schedule;
	MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
//     db.collection('schedules').find({"_id":email,"schedule.name": schedule}).count(function(err,document){
//         if(document != 0){
//           db.collection('schedules').update({"_id":email, "schedule.name": schedule, "schedule[0].tasks.name":task},{$set:{"schedule.0.tasks.$.startDate": start}},{upsert:true});
//         res.send('Added actual start successfully');
//         }
//         else{
//           res.send('No schedule to start task');
//         }

//     });
//   }
// });

   var cursor =  db.collection('schedules').find({"_id":email});
   cursor.nextObject(function(err, item) {
        if(item != null){
          cursor.rewind();

        
   cursor.nextObject( function(err, documents){
          console.log(documents);
          var schedules = documents.schedule;
          console.log(schedules);
          var i = 0;
          for (i = 0; i < schedules.length; i++) {
            if (schedules[i].name === schedule) {
              break;
            }
          }
          var queryField = "schedule." + i + ".tasks.$.startDate"; 
          var find= "schedule." + i + ".tasks.name";
          var query = {};
          query[queryField] = new Date(start);
          console.log(query);
          var findQuery = {};
          findQuery["_id"] = email;
          findQuery[find] = task; 
          console.log(findQuery);
          db.collection('schedules').update(findQuery,{$set: query},{upsert:true});
          res.send('Started task successfully');
        });
        }
        else{
          res.send('No schedule to start task');
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
