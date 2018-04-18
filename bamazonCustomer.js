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
    .prompt([{
      name: "inputID",
      type: "input",
      message: "Please enter the Item ID"
    },
    {
      name: "quantity",
      type: "input",
      message: "How many units would you like to buy?"
    },
    ])
    // Then needs to be updated to compare requested quantity against available quantity. If yes, place order, show custoemr total cost. if not send message "Insufficient quantity"

    .then(function(answer) {
      var query = "SELECT itemID, stock_qty FROM products WHERE ?";
      connection.query(query, { itemID: answer.inputID }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}


