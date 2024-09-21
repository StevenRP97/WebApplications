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
app.get('/', (req, res)=>{ // GET endpoint to get all assignments from AssignmentTable
  const dbQuery = `SELECT * FROM AssignmentTable LIMIT 0, 1000;`
  connecting.query(dbQuery, (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

app.get('/assign', (req, res)=>{ // GET endpoint to get the specified assignment from AssignmentTable
  const {AssetTag, UserID, AssignID, SearchBy} = req.body;
  let SearchColumn, inputData = ""

  switch(SearchBy){
    case 0:
      SearchColumn = "UserID"
      inputData = UserID
      break;
    case 1:
      SearchColumn = "AssetTag"
      inputData = AssetTag
      break;
    case 2:
      SearchColumn = "AssignID"
      inputData = AssignID
  }

  const dbQuery = `SELECT * FROM AssignmentTable WHERE ${SearchColumn} = ?;`
  connecting.query(dbQuery, [inputData], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
 })
})

app.post('/assign', (req, res)=>{ // POST endpoint to insert new assignment into AssignmentTable
  const {UserID, AssetTag, AssignDate, IsActive} = req.body;

  let dbQuery = 'SELECT * FROM AssignmentTable WHERE AssetTag = ? AND IsActive = true'
  connecting.query(dbQuery, [AssetTag], (err, result)=>{
    if (err) {return res.status(500).json({error: err.message})}

    if(result.length > 0){return res.status(400).send('This asset tag already exists')}

    dbQuery = `INSERT INTO AssignmentTable (UserID, AssetTag, AssignDate, IsActive) VALUES(?, ?, ?, ?);`
    connecting.query(dbQuery, [UserID, AssetTag, AssignDate, IsActive], (err, result)=>{
      if (err) {
        return res.status(500).json({error: err.message})
      }res.json(result);
    })
  })
})

app.patch('/assign', (req, res)=>{ // PATCH endpoint to update the status of an assignment in AssignmentTable
  const {AssetTag, UserID, AssignID, SearchBy, IsActive} = req.body;
  let SearchColumn,  SearchValue= ""

  switch(SearchBy){
    case 0:
      SearchColumn = "UserID"      
      SearchValue = UserID
      break;
    case 1:
      SearchColumn = "AssetTag"
      SearchValue = AssetTag
      break;
    case 2:
      SearchColumn = "AssignID"
      SearchValue = AssignID
      
  }  const dbQuery = `UPDATE AssignmentTable SET IsActive = ? WHERE ${SearchColumn} = ?;`
  connecting.query(dbQuery, [!IsActive, SearchValue], (err, result)=>{
    if (err) {
      return res.status(500).json({error: err.message})
    }res.json(result);
  })
})

// Declaration of the listening thing (I don't remember the name of it xd) 
const port = 3002;
app.listen(port, () =>{
  console.log(`Successfully listening in port ${port}`)
})

