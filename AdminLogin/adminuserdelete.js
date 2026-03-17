const express = require('express');
const router = express.Router();
const User = require('../DBConnection/dbconnectionschema');

router.delete('/delete-user/:id', async(req,res)=>{
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.json({message:'User delete successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }
})
module.exports=router;