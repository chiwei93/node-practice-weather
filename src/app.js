const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setting view engine
app.set('view engine', 'hbs');

//customizing the path to the views folder
app.set('views', viewsPath);

//setting partials
hbs.registerPartials(partialsPath);

//express.static() - telling express where to get the static files
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.status(200).render('index', {
    title: 'Weather',
    name: 'Michael',
  });
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    title: 'About Us',
    name: 'Michael',
  });
});

app.get('/help', (req, res) => {
  res.status(200).render('help', {
    title: 'Help',
    message: 'Welcome to the help page',
    name: 'Michael',
  });
});

app.get('/products', (req, res) => {
  console.log(req.query);

  res.send({
    product: [],
  });
});

app.get('/weather', async (req, res) => {
  try {
    if (!req.query.address) {
      throw new Error('Please provide an address!');
    }

    const coordinates = await geocode(req.query.address);

    const result = await forecast(coordinates);

    res.status(200).json({
      address: req.query.address,
      location: result.location,
      forecast: result.forecast,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      error: err.message,
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'help article not found',
    name: 'Michael',
    title: '404',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'page not found',
    name: 'Michael',
    title: '404',
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
