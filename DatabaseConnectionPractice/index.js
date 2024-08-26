import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0123456789',
    database: 'contact_form_db'
})

// Holiii

connection.connect((err) => {
    if (err) {
        console.log('Papu, hay un error en la conexión, el cual es el siguiente: ' + err.stack)
    }
    console.log('Conexión exitosa, malnacido')
})

app.get('/main', (req, res) => {
    console.log("Esto es una prueba del endpoint get ")
    const sqlQuery = 'SELECT * FROM pruebaDeTabla';

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
})

app.post('/contacts', (req, res) => {
    const name = req.name;
    const description = req.description;
    console.log('Esto es una prueba de los parámetros: ' , name, description)

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    const sqlQuery = `INSERT INTO contacts (name, description) VALUES (${name}, ${description})`;
    // const sqlQuery = 'INSERT INTO contacts (name, description) VALUES ( ' + name + ',' + description + ')';

    connection.query(sqlQuery, [name, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: 'Contact added successfully!',
            contactId: result.insertId
        });
    });
}); 

// app.delete('/bye', (req, res) => {
//     const sqlQuery = "delete * from pruebaDeTabla where name = '?'; ";

//         connection.query(sqlQuery, (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }

//             res.json(results);
//         });
//     })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});     