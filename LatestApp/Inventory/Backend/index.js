import express from "express";
import mysql from "mysql2";

const app = express();

// Declaration of connection variable and connection with database
const connecting = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'0123456789',
  database:'InventoryDB'

})

connecting.connect((err)=>{
  if (err) throw err;
  console.log('La conexión a la base de datos fue exitosa, reverendo malnacido. ')
})

app.get('/inventory', (req, res)=>{
  const dbQuery = 'SELECT * FROM AssetTable LIMIT 0, 1000;'
  connecting.query(dbQuery, (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }
    res.json(result);
  })

})

app.post('/inventory', (req, res)=>{
  const dbQuery = `INSERT INTO InventoryDB.AssetTable (Name, Description, AssetTag, CreationDate, IsActive) VALUES(?, ?, ?, ?, ?);`
  connecting.query(dbQuery, [], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }
    res.json(result);
  })

})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log("This test should work")
})
