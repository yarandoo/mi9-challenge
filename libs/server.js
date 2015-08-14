var express = require('express');
var bodyParser = require('body-parser');
var showsFilter = require('./shows-filter');
var status = require('http-status');

var createServer = function (port) {
	var app = express();

	app.use(bodyParser.json());

	app.use(function (err, req, res, next) {
		res.status(status.BAD_REQUEST).send({
			error : "Could not decode request: JSON parsing failed"
		})
	});

	app.post('/', function (req, res) {
		var shows = req.body.payload;
		res.json({
			response : showsFilter.filter(shows)
		});
	});

	return app.listen(port, function () {});
}

module.exports = createServer;
