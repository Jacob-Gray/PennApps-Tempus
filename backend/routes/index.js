var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;



function getConnection(){

}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;
	console.log(email);
	console.log(password);
		MongoClient.connect("mongodb://localhost:27017/timetracker", function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.collection('users').findOne({"_id": email}, function(err, document) {
  	if(document.password === password){
  		req.session.username = email;
		res.render( 'index' , {title: document.name});
	}
	
});
db.close();
        // Close the DB
        
  }
});   
});

module.exports = router;
