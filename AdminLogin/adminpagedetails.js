const express = require("express");
const router = express.Router();
const User = require("../DBConnection/dbconnectionschema");

router.get("/all-users", async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server error");
    }
});

module.exports = router;