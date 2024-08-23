const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0123456789',
    database: 'contact_form_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Tests of endpoints
app.get('/about', (req, res) =>{
    res.send("<h1> El endpoint sirve</h1>")
});

// Handle form submission
console.log("It's being used")
app.post("/submit-form", (req, res) => {
    console.log("It's being used x2")
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    console.log("It's being used x3")

    db.query(query, [name, email, message], (err, result) => {
        if (err) throw err;
        res.send('Form submission successful!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
