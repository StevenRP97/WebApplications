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

// Endpoints for CRUD interaction with database 
app.get('/', (req, res)=>{ // GET endpoint to get all assets from AssetTable
  const dbQuery = 'SELECT * FROM AssetTable LIMIT 0, 1000;'
  connecting.query(dbQuery, (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.get('/inventory', (req, res)=>{ // GET endpoint to get all assets from AssetTable
 const {AssetTag} = req.body;
 const dbQuery = 'SELECT * FROM AssetTable WHERE AssetTag = ?;'
  connecting.query(dbQuery, [AssetTag], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.post('/inventory', (req, res)=>{ // POST endpoint to insert new asset into AssetTable
  const {Name, Description, AssetTag, CreationDate, IsActive} = req.body;
  const dbQuery = `INSERT INTO InventoryDB.AssetTable (Name, Description, AssetTag, CreationDate, IsActive) VALUES(?, ?, ?, ?, ?);`
  connecting.query(dbQuery, [Name, Description, AssetTag, CreationDate, IsActive], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.put('/inventory', (req, res)=>{ // PUT endpoint to update assets in AssetTable 
  const {Name, Description, CreationDate, AssetTag} = req.body;
  const dbQuery = `UPDATE AssetTable SET Name = ?, Description = ?, CreationDate = ? WHERE (AssetTag = ?);`
  connecting.query(dbQuery, [Name, Description, CreationDate, AssetTag], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.patch('/inventory', (req, res)=>{ // PATCH endpoint to update active status of an asset in AssetTable 
  const {Name, Description, CreationDate, IsActive, AssetTag} = req.body;
  const dbQuery = `UPDATE AssetTable SET IsActive = ? WHERE (AssetTag = ?);`
  connecting.query(dbQuery, [IsActive, AssetTag], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.delete('/inventory', (req, res)=>{ // DELETE endpoint to remove assets from AssetTable
  const {AssetTag} = req.body;
  const dbQuery = `DELETE FROM AssetTable WHERE (AssetTag = ?);`
  connecting.query(dbQuery, [AssetTag], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

// Validation 


// Declaration of the listening thing (I don't remember the name of it xd) 
const port = 3000;
app.listen(port, () =>{
  console.log(`Successfully listening in port ${port}`)
})

