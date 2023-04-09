const express = require('express')

const app = express()

function middleware(req, res, next) {
  req.user = "rifkan"
  next()
}

app.get("/", middleware, (req, res) => {
  const {user} = req
  res.send(`<h1>Hello, World! ${user} </h1>`)
})



app.listen(8000, () => console.log("server is listening on port 8000"))
