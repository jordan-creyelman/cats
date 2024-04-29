// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const bodyParser = require('body-parser');
const {router: adminRoutes,adminBro} = require('./admin');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myproject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
//
// current user
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  // mettre curent user partot
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
  });
  //
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
//login
app.get('/login', (req, res) => {
    res.render('login');
  });
//
// deconnecter

//
// Use routes
app.use('/', usersRoutes);
app.use(adminBro.options.rootPath, adminRoutes);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
