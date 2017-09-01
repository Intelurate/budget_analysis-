var fs = require('fs');

module.exports.set = function (app) {
	
	app.get('/css/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/' + file);
		stream.pipe(res);
	});


	app.get('/css/:path/:file', function (req, res) {
		var file = req.params.file;
		var path = req.params.path;
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/css/' + path + '/' + file);
		stream.pipe(res);
	});

	app.get('/scripts/:bundle', function (req, res) {
		var bundle = req.params.bundle;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/scripts/' + bundle);
		stream.pipe(res);
	});


	app.get('/fonts/:file', function (req, res) {
		var file = req.params.file;
		var stream = fs.createReadStream('./html/fonts/' + file);
		stream.pipe(res);
	});

	app.get('/font_styles1', function (req, res) {
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/old-style.css');
		stream.pipe(res);
	});

	app.get('/font_styles2', function (req, res) {
		res.setHeader('Content-Type', 'text/css');
		var stream = fs.createReadStream('./html/style.css');
		stream.pipe(res);
	});	

	app.get('/img/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/img/' + file);
		stream.pipe(res);
	});

	app.get('/images/:file', function (req, res) {
		var file = req.params.file;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./images/' + file);
		stream.pipe(res);
	});	

	app.get('/img/:path/:file', function (req, res) {
		var file = req.params.file;
		var path = req.params.path;
		res.setHeader('Content-Type', '');
		var stream = fs.createReadStream('./html/img/' + path + "/" + file);
		stream.pipe(res);
	});

	app.get('/*', function (req, res) {
		res.setHeader('Content-Type', 'text/html');
		var stream = fs.createReadStream('./html/index.html');
		stream.pipe(res);
	});

}