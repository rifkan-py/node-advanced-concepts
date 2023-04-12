const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt')

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




app.use(middleware2)

// 1st middleware2 will execute
// and then actual middleware will execute
// after that controller middleware will execute

app.get("/", middleware, (req, res) => {
  const {user} = req
  res.render("index.ejs", {name: "Rifkan"})
})

app.get("/login", middleware, (req, res) => {
  const {user} = req
  res.render("login.ejs", {name: "Rifkan"})
})

app.post("/login", (req, res) => {

})

app.post("/register", async (req, res) => {
  try {

    if(req.body.email && req.body.password && req.body.confirm_password) {
      if(req.body.password !== req.body.confirm_password) {
        throw new Error("Passwords do not match")
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect("/login")
    } else {
      throw new Error("all the fields are required")
    }
  } catch(error) {
    res.redirect("/register")
  }

  console.log(users)
})

app.get("/register", middleware, (req, res) => {
  const {user} = req
  res.render("register.ejs", {name: "Rifkan"})
})

function errorHandler(error, req, res, next) {
  console.log(error)
  if(error) return res.send("Please try again.")
}

app.use(errorHandler)


app.listen(8000, () => console.log("server is listening on port 8000"))
