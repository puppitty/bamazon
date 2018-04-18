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

// Manager version shows options with Switch / Case solutions for
// View Products for Sale
// View Low Inventory
// Add to inventory
// Add New Product
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewInv();
        break;

      case "View Low Inventory":
        lowInv();
        break;

      case "Add to Inventory":
        addQty();
        break;

      case "Add New Product":
        newProduct();
        break;
      }
    });
}

// View Inventory Function
function viewInv() {
  connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
    if (err) throw err;
    console.log(res);
    prompt();
  });
}

// Rest of code needs updating

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
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

