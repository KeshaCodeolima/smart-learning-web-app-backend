const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/email-send', async (req, res) => {

    const {name, email, subject, message} = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kulasekarakeshan41@gmail.com",
            pass: "sqec jkhk oldb atpz"
        }
    });
    await transporter.sendMail({
        from: email,
        to: "kulasekarakeshan41@gmail.com",
        subject: subject,
        html: `<p>This Email from the ${name}.</p>
               <p>${message}</p>`
    });
    res.json('Email send successful')
});

module.exports = router;