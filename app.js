const express = require('express')
const session = require('express-session')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/connectDB')

const app = express()

app.set("view-engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: "some-secret",
  resave: false,
  saveUninitialized: false
}))

// home route
app.get("/", middleware, (req, res) => {
  res.setHeader("set-cookie", ["name=rifkan"])
  res.render("index.ejs", {name: "Rifkan"})
})

//login route
app.get("/login", middleware, (req, res) => {
  res.render("login.ejs", {name: "Rifkan"})
})

//register route
app.get("/register", middleware, (req, res) => {
  res.render("register.ejs", {name: "Rifkan"})
})

//error handler middleware
app.use(errorHandler)


// database connection
connectDB()


app.listen(8000, () => console.log("server is listening on port 8000"))
