import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
const port = 3000;
app.use(cors());

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'0123456789',
    database:'contact_form_db'
})

connection.connect((err) => {
    if(err){
        console.log('Papu, hay un error en la conexión, el cual es el siguiente: ' + err.stack)
    }
    console.log('Conexión exitosa, malnacido')
})

app.get('/main', (req, res) => {
    const sqlQuery = 'SELECT * FROM pruebaDeTabla';

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    }); 
})

app.post('/contacts', (req, res) => {    
const sqlQuery = "insert into pruebaDeTabla (name, description) values(?, ?);";

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
})

app.delete('/bye', (req, res) => {
    const sqlQuery = "delete * from pruebaDeTabla where name = '?'; ";
    
        connection.query(sqlQuery, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
    
            res.json(results);
        });
    })

app.listen(port, () =>{
  
    console.log("It works, you piece of shit")
})