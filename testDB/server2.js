const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Select posts
app.get('/api/getOpenningTimeOfficeInfo', (req, res) => {
    let sql = 'SELECT * FROM table';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

app.listen('8080', () => {
    console.log('Server started on port 8080');
});