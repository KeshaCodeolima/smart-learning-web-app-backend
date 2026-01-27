const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const collaction = require('../DBConnection/dbconnectionschema');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    collaction.findOne({ username: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (error, response) => {
                    if (response) {
                        res.json({
                            message: 'Successful Login',
                            user: {
                                username: user.username,
                                email: user.email,
                                name: user.name
                            }
                        });
                    } else {
                        res.json('login error')
                    }
                })
            } else {
                res.json('no data found')
            }
        })
});

module.exports = router;