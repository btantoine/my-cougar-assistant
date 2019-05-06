# my cougar assistant

## How to create a database

install mysql
- sudo apt-get update
- sudo apt-get install mysql-server

Start the mysql service
- systemctl start mysql

Start the mysqlshell (if needed)
- /usr/bin/mysql -u root -p

## How to connect to the dataBase
Open the server.js file

Change this :
```
// Create connection
const db = mysql.createConnection({
    host: "",
    user: "",
    password: ""
});
```

- npm install (install all dependencies)
- node server.js (start the server)
