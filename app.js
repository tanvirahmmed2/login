
const exprees = require("express")
const cors = require("cors")
const ejs = require('ejs')
const app = exprees()
const bcrypt = require("bcrypt")
const saltRounds = 10

const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")

require("./config/config")
require("./config/passport")
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL

const User = require("./model/user.model")

app.set("view engine", "ejs")
app.use(cors())
app.use(exprees.urlencoded({ extended: true }))
app.use(exprees.json())

//session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        collectionName: "session"
    }),
    //   cookie: { secure: true }
})
)

app.use(passport.initialize())
app.use(passport.session())


//home route
app.get("/", (req, res) => {
    res.render("index")
})

//user register : get then post

app.get("/register", (req, res) => {
    res.render("register")
})



app.post("/register", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) return res.status(400).send("user already exists")

        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const newUser = new User({
                username: req.body.username,
                password: hash,
            })


            await newUser.save()


            res.status(200).redirect("/login")
        });



    } catch (error) {
        res.status(500).send(error.message)
    }
})

const checkLogin=(req,res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile")
    }
    next()
}
//login page
app.get("/login", checkLogin, (req, res) => {
    res.render("login")
})

//login post
app.post('/login',
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        successRedirect: "/profile" })

);



//profile protected
app.get("/profile", (req, res) => {
    if(req.isAuthenticated()){
       return res.render("profile")
    }
    res.redirect("/login")
})






//logout
app.get("/logout", (req, res) => {
    try {
        req.logOut((err)=>{
            if(err){
                return next(err)
            }
            res.redirect("/")
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
})
























module.exports = app