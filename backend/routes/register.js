var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;



/* GET home page. */
router.post('/', function(req, res, next) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  console.log(password);
  console.log(name);

      MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.collection('users').findOne({"_id": email}, function(err, document) {
    if(document){
      res.send('Email already registered');
    }
    else{
      db.collection('users').insert({"_id": email,"password":password,"name":name}, function(err, result) {
    if(!err){
      console.log('Record Inserted');
      res.send('Successfully Registered');
    }
  });
    }
  db.close();
});
    
  
}
});
    });

        
        


module.exports = router;
