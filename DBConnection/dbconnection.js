const mongoose = require('mongoose');

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOODBURI);
        console.log("DB Connection Successfully");
    }catch (error){
        console.log("MongoDB Connection failed: ", error.message);
        process.exit(1)
    }
};
module.exports = connectionDB
