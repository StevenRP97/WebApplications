import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";

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
app.get('/inventory', (req, res)=>{ // GET endpoint to get all assets from AssetTable
  const dbQuery = 'SELECT * FROM AssetTable LIMIT 0, 1000;'
  connecting.query(dbQuery, (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }
    res.json(result);
  })
})

app.post('/inventory', (req, res)=>{ // POST endpoint to insert new asset into AssetTable
  console.log('Successfully into the endpoint')
  const {Name, Description, AssetTag, CreationDate, IsActive} = req.body;
  console.log('These are the input requests: ', Name, Description, AssetTag, CreationDate, IsActive )
  const dbQuery = `INSERT INTO InventoryDB.AssetTable (Name, Description, AssetTag, CreationDate, IsActive) VALUES(?, ?, ?, ?, ?);`
  connecting.query(dbQuery, [Name, Description, AssetTag, CreationDate, IsActive], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }
    return res.json(result);
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Successfully listening in port ${port}`)
})
