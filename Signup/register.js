const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const collaction = require('../DBConnection/dbconnectionschema');

router.post('/register',(req, res)=>{
    const{name,email,username,password}=req.body;
    bcrypt.hash(password,10)
    .then(hash=>{
        collaction.create({name,email,username,password:hash})
        .then(user => res.json('Successful'))
        .catch(err=> res.json('register fail'))
    })
    .catch(error=>console.log(error))
});

module.exports = router;