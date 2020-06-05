const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const token = '0f157557d81fea2e299a3e93f39306d7'
	const url = `http://api.weatherstack.com/current?access_key=${token}&query=${latitude},${longitude}`
	request({ url, json: true}, (error, { body } = {}) => {
		if(error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			//const current = body.current;
			const { temperature, humidity } = body.current
			callback(undefined, {
				description: body.current.weather_descriptions[0],
				temperature,
				humidity
			})
		}
	})
}

module.exports = forecast