const request = require('request')

const geocode = (location, callback) => {
	const token = 'pk.eyJ1IjoiYXJrdmlrIiwiYSI6ImNrYXh6OGxpMDA1NW0yeHJ4eGUyMmtxcTAifQ.W-ZEFQYs8v2I2JpOLiIawQ'
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}&limit=1`;
	request({ url, json: true }, (error, { body } = {}) => {
		if(error) {
			callback('Unable to connect to geocoding service', undefined);
		} else if (body.features.length === 0){
			callback('Could not get coordinates. Please try different location', undefined);
		 } else {
			const center = body.features[0].center;
			const placeName = body.features[0].place_name
			callback(undefined, {
				placeName,
				latitude: center[1],
				longitude: center[0]
			})
		}
	});
}

module.exports = geocode