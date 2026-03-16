const express = require('express');
const router = express.Router();
const User = require('../DBConnection/dbconnectionschema');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.post('/sendemail', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json('email not Found')
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:3000/resetpassword/${token}`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kulasekarakeshan41@gmail.com",
            pass: "sqec jkhk oldb atpz"
        }
    });

    await transporter.sendMail({
        from: "kulasekarakeshan41@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `<p>Click this link to reset password:</p>
               <a href="${resetLink}">${resetLink}</a>`
    });
    res.json("email send successfully");
})

router.post("/resetpassword/:token", async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: { $gt: Date.now() }
    });
    if (!user) {
        return res.json("invalid token");
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    user.password = hashedpassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json("password updated");
});

module.exports = router;