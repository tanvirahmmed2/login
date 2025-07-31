const mongoose= require("mongoose")
require("dotenv").config()

const MONGO_URL= process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("db is connected")
})
.catch((error)=>{
    console.log(error.message)
})