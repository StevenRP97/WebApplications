// Declaration of imports and global variables
import express from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json());

// Declaration of connection variable and connection with database
const connecting = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'0123456789',
  database:'InventoryDB'
})

connecting.connect((err)=>{
  if (err) throw err;
  console.log('Successfully connected to database')
})

// Declaration of all the endpoints 
app.get('/', (req, res)=>{ // GET endpoint to get all users from UserTable
  const dbQuery = 'SELECT * FROM UserTable LIMIT 0, 1000;'
  connecting.query(dbQuery, (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.get('/user', (req, res)=>{ // GET endpoint to get specific users from UserTable
 const {ID} = req.body;
 const dbQuery = 'SELECT * FROM UserTable WHERE ID = ?;'
  connecting.query(dbQuery, [ID], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.post('/user', (req, res)=>{ // POST endpoint to insert new users into UserTable
  const {Name, LastName, Email, ID, IsActive} = req.body;
  const dbQuery = `INSERT INTO UserTable (Name, LastName, Email, ID, IsActive) VALUES(?, ?, ?, ?, ?);`
  connecting.query(dbQuery, [Name, LastName, Email, ID, IsActive], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.put('/user', (req, res)=>{ // PUT endpoint to update users in UserTable 
  const {Name, LastName, Email, ID} = req.body;
  const dbQuery = `UPDATE UserTable SET Name = ?, LastName = ?, Email = ? WHERE (ID = ?);`
  connecting.query(dbQuery, [Name, LastName, Email, ID], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

// Declaration of the listening thing (I don't remember the name of it xd) 
const port = 3001;
app.listen(port, () =>{
  console.log(`Successfully listening in port ${port}`)
})

