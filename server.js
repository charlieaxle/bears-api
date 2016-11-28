var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./models/bear.js');

mongoose.connect('mongodb://localhost:27017/test');

var app = express();

app.use(bodyParser.urlencoded({extended	: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	console.log('something is happening');
	next();
});


router.get('/', function(req,res){
	res.json({message:'Testing'});
});	

router.route('/bears').post(function(req,res){
		
		var newbear =  new Bear();
		newbear.name = req.body.name;

		
		newbear.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json({message: 'Bear created'});
		});
	});

router.route('/bears').get(function(req,res){
		Bear.find(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

router.route('/bears/:bear_id').get(function(req,res){
	
	Bear.findById(req.params.bear_id, function(err, data){
		if (err) throw err;
		res.json(data);
	});
});


router.route('/bears/:bear_id').put(function(req, res){
	Bear.findById(req.params.bear_id, function(err, data){
		if (err) throw err;
		data.name = req.body.name;
		data.save(function(err){
			if (err) throw err;
			res.json({message: 'Bear Name Updated'});
		});
	})	
});

router.route('/bears/:bear_id').delete(function(req, res){
	
	Bear.findById(req.params.bear_id, function(err, data){
		if (err) throw err;
		data.remove(function(err){
			if (err) throw err;
			res.json({message: 'Bear deleted'});
		});
		data.save(function(err){
			if (err) throw err;
		});
	});	

});

app.use('/api',router);

app.listen(port, "0.0.0.0");
console.log('Listening on port '+port);


