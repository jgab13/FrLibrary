/* server.js - Express server*/
'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

// Setting up a static directory for the files in /pub
// using Express middleware.
// Don't put anything in /pub that you don't want the public to have access to!
app.use(express.static(path.join(__dirname, '/pub')))

// Let's make some express 'routes'
// Express has something called a Router, which 
// takes specific HTTP requests and handles them
// based on the HTTP method and URL

// Let's make a route for an HTTP GET request to the 
// 'root' of our app (i.e. top level domain '/')

app.get('/', (req, res) => {
	// sending a string
	res.send('This should be the root route!')

	// sending some HTML
	res.send('<h1>This should be the root route!</h1>')
})

// Error codes
// app.get('/problem', (req, res) => {
	// You can indicate a status code to send back
	// by default it is 200, but it's up to you
	// if you want to send something
	// res.status(500).send('There was a problem on the server')

	// don't send nonsense status codes like this one:
	//res.status(867).send('There was a problem on the server')
// })

// Sending some JSON
// app.get('/someJSON', (req, res) => {
// 	// object converted to JSON string
// 	res.send({
// 		name: 'John',
// 		year: 3,
// 		courses: ['csc309', 'csc301']
// 	})
// })

// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.

