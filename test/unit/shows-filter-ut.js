var showsFilter = require("./../../libs/shows-filter")
	describe('Unit Testing - Shows Filter', function () {

		it('should filter shows with drm=true and episodeCount>0', function (done) {
			//Arrange
			var show = {drm : true,	episodeCount : 3,slug : "slug",	image : {showImage : "Image"}}
			//Act
			var filteredShows = showsFilter.filter([show]);
			//Assert
			filteredShows.length.should.equal(1);
			done();
		});

		it('should not filter show with drm=false and episodeCount>0', function (done) {
			//Arrange
			var show = {drm : false,episodeCount : 3,slug : "slug",	image : {showImage : "Image"}}
			//Act
			var filteredShows = showsFilter.filter([show]);
			//Assert
			filteredShows.length.should.equal(0);
			done();
		});

		it('should not filter show with drm=true and episodeCount<0', function (done) {
			//Arrange
			var show = {drm : true,	episodeCount : 0, slug : "slug",image : {showImage : "Image"}}
			//Act
			var filteredShows = showsFilter.filter([show]);
			//Assert
			filteredShows.length.should.equal(0);
			done();
		});

		it('should return title, slug, and image information', function (done) {
			//Arrange
			var show = {drm : true,episodeCount : 2,title : "title",slug : "slug",image : {showImage : "Image"}	}
			//Act
			var filteredShows = showsFilter.filter([show]);
			//Assert
			filteredShows[0].image.should.equal(show.image.showImage);
			filteredShows[0].title.should.equal(show.title);
			filteredShows[0].slug.should.equal(show.slug);
			done();
		});

	});
