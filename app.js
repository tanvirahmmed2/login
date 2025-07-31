
const exprees= require("express")
const cors =require("cors")
const ejs= require('ejs')
const app=exprees()


app.set("view engine", "ejs")
app.use(cors())
app.use(exprees.urlencoded({extended: true}))
app.use(exprees.json())


//home route
app.get("/",(req,res)=>{
    res.render("index")
})

//user register : get then post

app.get("/register", (req,res)=>{
    res.render("register")
})



app.post("/register", (req,res)=>{
    try {
        res.status(200).send("user is created")
    } catch (error) {
        res.status(500).send(error.message)
    }
})


//login page
app.get("/login",(req,res)=>{
    res.render("login")
})




//profile 
app.get("/profile", (req,res)=>{
    res.render("profile")
})






//logout
app.get("/logout", (req,res)=>{
    res.redirect("/")
})
























module.exports= app