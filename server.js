const express = require('express');
// http://handlebarsjs.com/
// Win Powershell command to access enviroment variables:
// Get-ChildItem Env:
// gitbash command to access enviroment variables:
// env


//used in heroku
const port = process.env.PORT || 3000;

const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log' , log +'\n', (err) =>{
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

/*
app.get('/', (req, res) =>{
    // res.send('<h1>Hello Express!</h1>');7
    res.send({
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});
*/

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home Page'
    });
});


app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'projects',
        message: 'Portfolio page here.'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

