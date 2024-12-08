const express = require('express');


const app = express()


app.use('/', (req, res) => {
  res.send("Sever is running");
});

app.listen(1414, console.log("Server start port 1414"))