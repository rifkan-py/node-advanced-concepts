const express = require('express')

const app = express()

app.get("/", () => {
  res.send("<h1>Hello, World!</h1>")
})

app.listen(8000, () => console.log("server is listening on port 8000"))
