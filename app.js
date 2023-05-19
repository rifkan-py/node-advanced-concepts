const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/connectDB')

const app = express()

app.set("view-engine", "ejs")
app.use(express.urlencoded({extended: false}))

// home route
app.get("/", (req, res) => {
  res.render("index.ejs")
})

//login route
app.get("/login", (req, res) => {
  res.render("login.ejs")
})

//register route
app.get("/register", (req, res) => {
  res.render("register.ejs")
})

//error handler middleware
app.use(errorHandler)


// database connection
connectDB()


app.listen(8000, () => console.log("server is listening on port 8000"));
