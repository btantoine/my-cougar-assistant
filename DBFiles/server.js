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

//Select classes for that day.
app.get('/api/getClassInfo/:libelle', (req, res) => {
    let sql = 'SELECT '+ req.params.libelle +' FROM Classes WHERE ' + req.params.libelle + ' IS NOT NULL';
    // console.log(JSON.stringify(sql));
    let day = req.params.libelle;
    console.log(day);
    var result = "";
    let query = db.query(sql, (err, results) => {
        // console.log(result);
        if(err) throw err;
        results.forEach(function(element) {
            console.log(JSON.stringify(day));
            switch(JSON.stringify(day))
            {
                case "\"Monday\"":
                    console.log(element.Monday);
                    result += " " + element.Monday;
                    break;
                case "\"Tuesday\"":
                    console.log(element.Tuesday);
                    result += " " + element.Tuesday;
                    break;
                case "\"Wednesday\"":
                    console.log(element.Wednesday);
                    result += " " + element.Wednesday;
                    break;
                case "\"Thursday\"":
                    console.log(element.Thursday);
                    result += " " + element.Thursday;
                    break;
                case "\"Friday\"":
                    console.log(element.Friday);
                    result += " " + element.Friday;
                    break;
            }
            
        });
        // console.log(result);
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

// Select the next event
app.get('/api/getNextEventInfo', (req, res) => {
    let sql = 'SELECT * FROM Events';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results[0].Description);
    });
});

app.listen('8080', () => {
    console.log('Server started on port 8080');
});