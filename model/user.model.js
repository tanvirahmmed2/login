const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    // password: {
    //     type: String,
    //     require: true,

    // },
    googleId: {
        type: String
    }
})


const User= mongoose.model("User", userSchema)

module.exports= User