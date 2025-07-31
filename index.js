require("dotenv").config()
const exprees= require("express")





const PORT=process.env.PORT || 4000
const app= exprees()


app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})