const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

const app = express()

app.set("view-engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: "some-secret",
  resave: false,
  saveUninitialized: false
}))

app.get("/", middleware, (req, res) => {
  res.setHeader("set-cookie", ["name=rifkan"])
  res.render("index.ejs", {name: "Rifkan"})
})

app.get("/login", middleware, (req, res) => {
  res.render("login.ejs", {name: "Rifkan"})
})

app.get("/register", middleware, (req, res) => {
  res.render("register.ejs", {name: "Rifkan"})
})


function errorHandler(error, req, res, next) {
  console.log(error)
  if(error) return res.send("Please try again.")
}

app.use(errorHandler)



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('database is connected successful'))
  .catch(error => console.log(error))


app.listen(8000, () => console.log("server is listening on port 8000"))
