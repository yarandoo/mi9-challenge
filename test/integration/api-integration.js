var server = require("./../../libs/server");
var request = require('supertest');
var status = require('http-status');

describe('Integration Testing - Shows Filter', function () {
	var app;

	before(function () {
		app = server(5000);
	});

	after(function () {
		app.close();
	});

	it('with drm=true and episodeCount>0 returns one show', function (done) {
		var show = {drm : true,episodeCount : 3,slug : "slug",image : {	showImage : "Image"},title : "title"};		
		var invalidShow = {	drm : false,episodeCount : 0};
		
		request(app).post('/').send({
			payload : [show, invalidShow]
		})	
		.expect(status.OK)
		.expect({
			response : [{
					title : show.title,
					image : show.image.showImage,
					slug : show.slug
				}
			]
		})
		.end(function (err, res) {
			var result = JSON.parse(res.text);
			if (err)
				return done(err);
			done()

		});
	});

	it('with invalid json returns a 400 and error key with appropiate message', function (done) {
		request(app).post('/')
		.send('{"invalid"}')
		.type('json')
		.expect(status.BAD_REQUEST)
		.expect({
			error : "Could not decode request: JSON parsing failed"
		})
		.end(function (err, res) {
			
			if (err)
				return done(err);
			done()
		});
	});

});
