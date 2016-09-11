var express = require('express');
var router = express.Router();
var http = require('http').Server(router);
var nexmo = require('./sms-api.js');
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
          var timeout = 0;
          for (i = 0; i < schedules.length; i++) {
            if (schedules[i].name === schedule) {
              var timeTasks = schedules[i].tasks;
              for(var j in timeTasks){
                if(timeTasks[j].name === task){
                  timeout = parseInt((timeTasks[j].end - timeTasks[j].start)*60*60*1000);
                  break;
                }
              }
              break;
            }
          }
          var queryField = "schedule." + i + ".tasks.$.startDate"; 
          var find= "schedule." + i + ".tasks.name";
          var findEnd = "schedule." + i + ".tasks.endDate";
          var findSms = "schedule." + i + ".tasks.sms";
          var query = {};
          query[queryField] = start;
          console.log(query);
          var findQuery = {};
          findQuery["_id"] = email;
          findQuery[find] = task; 
          console.log(findQuery);
          db.collection('schedules').update(findQuery,{$set: query},{upsert:true});
          //
          //
          //db.collection('schedules').findOne({"_id":email,"schedule.")
          console.log('Setting Timeout to:'+ timeout);
          setTimeout(function(){
            console.log('TImer Called');
            console.log('Checking if the entry has ended');
            findQuery[findEnd] = {"$exists":true};
            var cursor = db.collection('schedules').find(findQuery);
            cursor.nextObject(function(err, item) {
              if(item != null){
                console.log('Task is completed on time');
                }
                else{
                  console.log('Entry Not ended on time');
                  // delete findQuery[findEnd];
                  // console.log(findQuery);
                  //var projection = {"_id":0,}
                  var new_cursor = db.collection('schedules').find({"_id":email,"tasks.name":task});
                  new_cursor.nextObject(function(err,item){
                    console.log(item);
                    var allTasks = item.tasks;
                    for(var l in allTasks){
                      if(allTasks[l].name === task && allTasks[l].sms === 'true'){
                        console.log("End date not present and sms enabled. Send Message");
                      nexmo.send_sms('Hi '+ email +' Your task ' + task+ ' exceeded your planned time');
                      }
                      else{
                        console.log('Sms disabled.');
                      }
                    }
                    
                  })

                }
              
                
              
            });
          }, 30000);

          //
          //

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
