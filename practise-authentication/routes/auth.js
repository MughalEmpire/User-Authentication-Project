const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('./models/User');

//Registering a user 
router.post('/register', async(req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = user.findOne({email});
        if(user) return res.status(400).json({message: "User already exist!"});

        user = new user({email, password, username});
        await user.save();

        const payload = {userId: user._id};
       const token = jwt.sign(payload, process.env.JWT_SECRET, {expires: '1hr'});
        res.json({token});
    } catch (error) {
        console.log('Error: error.message!');
        res.status(500).send('Server Error');
    }
});


// Login a new user
router.post('/login', async(req, res) => {
const {email, password} = req.body;

try {
    let user = await user.findOne({email});
    if(!user) return res.status(500).json({message: "Invalid Credentials!"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(500).json({message: "Invalid Credentials!"});

    const payload = {userId: user._id};
    const token = jwt.sign(payload, process.JWT_SECRET, {expires: '1hr'});
    res.json({token});
} catch (error) {
    console.log('Error: error message!');
    res.send('Server Error');
}
});

module.exports = router;