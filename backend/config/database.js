const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("Database Connected Successfully")})
    .catch((error)=>{
        console.log("There is some problem in Database Connection");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;