/* PSUEDOCODE */

/* Require MySQL & Inquirer */
var inquirer = require("inquirer");
var mysql = require("mysql");


/* Create a connection to the DB */
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "terabyte55",
  database: "bamazon_Db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

// Print out inventory
function start() {
  connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
    if (err) throw err;
    console.log(res);
    prompt();
  });
}

function prompt() {
  inquirer
    .prompt({
      name: "inputID",
      type: "input",
      message: "Please enter the Item ID"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}


