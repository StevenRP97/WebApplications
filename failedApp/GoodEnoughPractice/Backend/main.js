const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users');

const app = express();

app.get("/main", (req,res)=>{
  var appending = '';
  for (let i = 0; i > users.length; i++){
    appending = appending + ``;
  }
  var xd = ``
  res.send('<h1>These are the employees</h1' + appending);
})

app.post('/users', (req, res) => {
  console.log("XD")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
