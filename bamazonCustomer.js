/* PSUEDOCODE */

/* Require MySQL, Inquirer, Cli-table */
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

var displayTable = require("./tableBuilder.js")


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
// Connect to the database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

// Display inventory in table
var start = function () {
  var display = new displayTable();
  connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
    if (err) throw err;
    display.displayInventoryTable(res)
    prompt();
  });
}

// Ask Customer what they want to purchase and how many
var prompt = function () {
  inquirer.prompt([{
        name: "inputID",
        type: "input",
        message: "Please enter the Item ID",
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?",
      }
    ])

    // Check valid inputID and quantity
    // If enough inventory, places order and shows customer total cost. If not send message "Insufficient quantity"

    .then(function (answer) {

      connection.query("SELECT itemId, product_name, stock_qty, price, product_sales FROM products WHERE ?", {
        // Validate itemID here
          itemId: answer.inputID
        },
        // Display purchase choice
        function (err, res) {
          if (err) throw err;
          
          // validate quantity is  a number
          console.log("\n You would like to buy " + answer.quantity + " " + res[0].product_name + ": " + " at $" + res[0].price + " each");

          // Check to see if there is enough inventory
          if (res[0].stock_qty >= answer.quantity) {

            // There is enough inventory
            var remainingQty = res[0].stock_qty - answer.quantity;

            // Calculate total cost
            var cost = res[0].price * answer.quantity;
            console.log("\n Order complete!  Your total is $ " + cost.toFixed(2) + "\n");

            // Add to product_sales and update record     
            var product_total = parseInt(res[0].product_sales) + cost;
                   
            connection.query("UPDATE products SET ? WHERE ?", [{
              stock_qty: remainingQty,
              product_sales: product_total
            },
            {
              itemId: answer.inputID
            }],
            function (err, res) {});          
            contPrompt();

          } else {
            // Not enough inventory
            console.log("\n Sorry, there is not enough inventory to fulfill your order! \n");
            contPrompt();
          }
        })
    });
}

// Continue Shopping?
var contPrompt = function () {
  inquirer.prompt({
    name: "continue",
    type: "list",
    message: "\n Would you like to continue shopping?",
    choices: ["Yes", "No"]
  }).then(function (answer) {
    switch (answer.continue) {
      case 'Yes':
        prompt();
        break;
      case 'No':
        connection.end();
        break;
    }
  })
};