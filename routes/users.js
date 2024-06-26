// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const path = require('path');
//login
const bcrypt = require('bcryptjs');
//register
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.post('/submit_registration', async (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    res.send('User registered successfully');
});

//login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    res.send('Logged in successfully');
});

module.exports = router;