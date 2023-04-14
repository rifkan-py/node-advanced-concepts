const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth")

const app = express()

const users = []

app.set("view-engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: "some-secret",
  resave: false,
  saveUninitialized: false
}))

function middleware(req, res, next) {
  
  req.user = "rifkan"
  next()
}

function middleware2(req, res, next) {
  console.log("This is running from middleware 2")
  next()
}

passport.use(new GoogleStrategy({
  // passport options
}, () => {
  // passport callback functions
}))




app.use(middleware2)

// 1st middleware2 will execute
// and then actual middleware will execute
// after that controller middleware will execute

app.get("/", middleware, (req, res) => {
  const {user} = req
  res.setHeader("set-cookie", ["name=rifkan"])
  res.render("index.ejs", {name: "Rifkan"})
})

app.get("/login", middleware, (req, res) => {
  const {user} = req
  res.render("login.ejs", {name: "Rifkan"})
})

app.get("/register", middleware, (req, res) => {
  const {user} = req
  res.render("register.ejs", {name: "Rifkan"})
})

app.get("/google", (req, res) => {
  // handle passport oauth logic
})

function errorHandler(error, req, res, next) {
  console.log(error)
  if(error) return res.send("Please try again.")
}

app.use(errorHandler)


app.listen(8000, () => console.log("server is listening on port 8000"))
