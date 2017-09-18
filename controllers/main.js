var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/sc', ['budgets']);
var Promise = require('bluebird'); 


function getBudgets(data){
	return new Promise((resolve, reject)=>{

		Promise.fromNode((callback)=>{
			db.collection("budgets").find({},callback)
		})
		.then(items=>{
			data.items = items;
			resolve(data);		
		})
		.catch(err=>{
			res.send({error: true});
		});

	})
}



module.exports.set = (function (app) {
	
	app.get('/budgets', function (req, res) {
		getBudgets({})
		.then(data=>{
		    res.send(data.items);	
		});
	});

	app.post('/budget', function (req, res) {			
		db.collection("budgets").save(req.body, function(err, data) {									
			if(!err){
				res.send(req.body);
			}
		});
	});

	app.delete('/delete_budget/:id', function (req, res) {

		db.collection("budgets").remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, data) {						
			if(!err){
				res.send({delete: true});
			}
		});
	});

	app.put('/budget_update/:id', function (req, res) {			
		db.collection("budgets").save(req.body, function(err, data) {									
			if(!err){
				res.send(req.body);
			}
		});
	});


	// // List the database collections available
	// app.get('/getdbcols', function (req, res) {

	// 	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

	// 		db.collection().toArray(function(err, items) {
	// 			var out = {bad:'BAD'};
	// 			if (err == null)
	// 			{
	// 				out = items;
	// 			}
	// 			res.send(out);
	// 			db.close();
	// 		});

	// 	});

	// });

	// app.get('/getdb', function (req, res) {

	// 	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

	// 		var col = db.collection('courses');
			
	// 		col.insertMany(
	// 			[
	// 				{
	// 					courseName: 'Literature',
	// 					courseCode: 'ENG-302',
	// 					courseDescription: 'This is a super cool course, reading and stuff',
	// 					coursePrerequisites: ['ENG-101', 'ENG-210']
	// 				},
	// 				{
	// 					courseName: 'Math',
	// 					courseCode: 'MATH-201',
	// 					courseDescription: 'This is a super cool course, algebra and stuff',
	// 					coursePrerequisites: ['MATH-101']
	// 				},
	// 				{
	// 					courseName: 'Physics',
	// 					courseCode: 'PHY-405',
	// 					courseDescription: 'This is a super cool course, heat and stuff',
	// 					coursePrerequisites: ['PHY-103', 'PHY-312']
	// 				}
	// 			]);

	// 		col.find().toArray(function(err, items) {
	// 			var out = {bad:'BAD'};
	// 			if (err == null)
	// 			{
	// 				out = items;
	// 			}
	// 			res.send(out);
	// 			db.close();
	// 		});

	// 	});

	// });

	// app.get('/user_profile', function (req, res) {

	// 	res.send({
	// 	    fname: "eddie",
	// 	    lname: "butler",
	// 	    email: "ebutler@gmail.com",
	// 	    title: "Software Dude"
	// 	});

	// });


	// app.put('/user_profile/:id', function (req, res) {

	// 	res.send({
	// 	    fname: req.body.fname,
	// 	    lname: "villar",
	// 	    email: "v@gmail.com",
	// 	    title: "Software Dude"
	// 	});

	// });

})