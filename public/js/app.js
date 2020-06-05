const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgError = document.querySelector('#message-error')
const msgWeather = document.querySelector('#message-weather')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const place = search.value
	const url = `/weather?location=${place}`
	msgError.textContent = "loading weather..."
	msgWeather.textContent = ''
	fetch(url).then(( response ) => {
	response.json().then(( data ) => {
		if (data.error) {
			return msgError.textContent = data.error
		}
		msgError.textContent = data['location found']
		msgWeather.textContent = `Weather is ${data.weather}. Temperature is ${data.temperature} degrees Celcius, humidity is ${data.humidity}%`
	}).catch((error) => {
		msgError.textContent = error
	})
}).catch(( error ) => {
	msgError.textContent = error
})
})