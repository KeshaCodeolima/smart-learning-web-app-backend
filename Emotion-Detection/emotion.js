const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/predict', async(req,res)=>{
    try{
        const {image} = req.body;

        const response = await axios.post('http://127.0.0.1:8000/predict',{image:image});
        res.json(response.data);
    }catch(err){
        console.error("ML Server Error: ", err.message);
        res.status(500).json({label:"Error"})
    }
});

module.exports = router;