// app.js
const express = require('express');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', usersRoutes);
app.use(adminBro.options.rootPath, adminRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
