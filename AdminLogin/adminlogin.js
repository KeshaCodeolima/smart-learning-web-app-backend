const express = require("express");
const router = express.Router();
const User = require("../DBConnection/adminschema");
const bcrypt = require("bcrypt");

router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json("Invalid password");

    res.json({
      message: "Admin login successful",
      admin: {
        id:user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;