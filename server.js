const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`; 
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append to log file');
		}
	});
	next();
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// })


/*
app.get('/', (req, res) => {
	//res.send('<h1>hello express</h1>');
	res.send({
		name: 'Erik',
		likes: [
			'hiking',
			'kayaking'
		]
	})
});
*/

app.get('/about', (req, res) => {
	//res.send('<h1>about file</h1>');
	res.render('about.hbs', {
		pageTitle: 'About Page',
		//currentYear: new Date().getFullYear()
	});
});

app.get('/', (req, res) => {
	//res.send('<h1>about file</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hi, turd!',
		//currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Blöd gelaufen'
	});
});



app.listen(3000, () => {
	console.log('server is up on port 3000');
});