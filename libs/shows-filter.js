var drmStatus = true;
var minEpisodeCount = 0;

var filterShows = function (shows) {
	var filteredShows = [];
	for (var show in shows) {
		if (shows[show].drm === drmStatus && shows[show].episodeCount > minEpisodeCount) {
			filteredShows.push({
				image : shows[show].image.showImage,
				slug : shows[show].slug,
				title : shows[show].title
			});
		}
	}
	return filteredShows;
};

module.exports.filter = filterShows;
