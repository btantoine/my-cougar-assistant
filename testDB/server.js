//https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu/
const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
    let sql = 'Use DBMCC;';
    let query = db.query(sql, (err, results) => {
    });
});

const app = express();

// Select the hour of a building
app.get('/api/getOpenningTimeBuildingInfo/:libelle', (req, res) => {
    let sql = 'SELECT * FROM Building';
    var result = "";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        results.forEach(function(element) {
            if (element.Name.toUpperCase() == req.params.libelle.toUpperCase())
                result = element.Hours;
          });
        res.send(result);
    });
});

// Select the location of a building
app.get('/api/getLocationBuildingInfo/:libelle', (req, res) => {
    let sql = 'SELECT * FROM Building';
    var result = "";
    let query = db.query(sql, (err, results) => {
        console.log("ici");
        if(err) throw err;
        results.forEach(function(element) {
            if (element.Name.toUpperCase() == req.params.libelle.toUpperCase())
                result = element.Location;
          });
        res.send(result);
    });
});

app.listen('8080', () => {
    console.log('Server started on port 8080');
});