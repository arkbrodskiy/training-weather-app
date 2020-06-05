const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defin paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))




app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ark'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Ark'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		name: 'Ark'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.location) {
		return res.send({
			error: "Location must be provided"
		})
	}
	geocode(req.query.location, (error, { latitude, longitude, placeName} = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, { description, temperature, humidity } = {}) => {
			if (error) {
				return console.log('Error: ', error)
			}
			res.send({
				'location provided': req.query.location,
				'location found' : placeName,
				weather: description,
				temperature,
				humidity
			})
		})
	})
	
})

app.get('/help/*', (req, res) => {
	res.render('notFound', {
		title: 'Oops!',
		message: 'Sorry, help article not found',
		name: 'Ark'
	})
})

app.get('*', (req, res) => {
	res.render('notFound', {
		title: 'Oops!',
		message: 'Sorry, page not found',
		name: 'Ark'
	})
})





app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})