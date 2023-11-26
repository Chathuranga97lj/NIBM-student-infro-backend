const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// register user
router.post('/register', async (req, res) => {
    let user = new User({
        userName: req.body.userName,
        passwordHash: bcrypt.hashSync(req.body.password, 10)
    });

    user = await user.save();

    if(!user){
        return res.status(404).send('The user cannot be created!');
    }

    res.send(user);
});


// login shed owner
router.post('/login', async (req, res) => {
    // check user name
    const user = await User.findOne({userName: req.body.userName});
    const secret = process.env.secret;

    if(!user){
        return res.status(400).send('The Shed owner is not found');
    }

    // check password
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId: user.id,
            },
            secret,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).send({user: user.userName, token: token});

    } else {
        res.status(400).send('Password is Wrong !');
    }
})

module.exports = router;