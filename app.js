const express = require('express')
const session = require('express-session')

const app = express()

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




app.use(middleware2)

// 1st middleware2 will execute
// and then actual middleware will execute
// after that controller middleware will execute

app.get("/", middleware, (req, res) => {
  const {user} = req
  req.session.viewCount = req.session.viewCount++ || 1
  res.send(`<h1>Hello, World! ${user} </h1> <br /> <h4>session value ${req.sessionID}<h4>`)
})

function errorHandler(error, req, res, next) {
  if(error) return res.send("Please try again.")
}


app.listen(8000, () => console.log("server is listening on port 8000"))
