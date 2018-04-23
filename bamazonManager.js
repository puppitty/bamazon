/* Require MySQL & Inquirer */
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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  prompt();
});

// Manager version shows options with Switch / Case solutions for
// View Products for Sale
// View Low Inventory
// Add to inventory
// Add New Product
var prompt = function () {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?\n",
      choices: [
        "View Products for Sale",
        new inquirer.Separator("=================================="),
        "View Low Inventory",
        new inquirer.Separator("=================================="),
        "Add to Inventory",
        new inquirer.Separator("=================================="),
        "Add New Product",
        new inquirer.Separator("==================================")
      ]
    })
    .then(function (answer) {
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

var viewInv = function () {
  var display = new displayTable();
  connection.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;
    display.displayInventoryTable(res)
    prompt();
  });
}


// Display Low Inventory items
// SELECT * FROM bamazon_db.products WHERE stock_qty <10;
// Needs to list all items with inventory count lower than 5
function lowInv() {
  connection.query("SELECT * FROM products WHERE stock_qty < 5", function (err, res) {
    if (err) throw err;
    console.log("\n Products with inventory less than 5:\n")
    displayMgr(res);

    prompt();
  });
}

// Add Quantity
// Request item #
// Prompt additional quantity
// update database with new quantity 
function addQty() {
  // Ask Item ID
  inquirer.prompt([{
    name: "inputId",
    type: "input",
    message: " Enter the Item ID: ",
    // Ask quantity to be added
  }, {
    name: "quantity",
    type: "input",
    message: " Enter quantity you wish to add: ",

  }]).then(function (answer) {

    // Update database, find correct item
    connection.query("SELECT itemId, product_name, stock_qty, price FROM products WHERE ?", {
      itemId: answer.inputId
    }, function (err, res) {

      // Add new inventory to existing inventory
      itemQuantity = parseInt(res[0].stock_qty) + parseInt(answer.quantity);
      connection.query("UPDATE products SET ? WHERE ?", [{
        stock_qty: itemQuantity
      }, {
        itemId: answer.id
      }], function (err, res) {});

      connection.query('SELECT * FROM products WHERE ?', {
        ItemID: answer.inputId
      }, function (err, res) {
        console.log('\n The Stock Quantity was updated');
        // Dispaly updated inventory
        displayMgr(res);

        prompt();
      });

    });
  });
};;

// Add New inventory item

function newProduct() {
  inquirer.prompt([{
    name: "productName",
    type: "input",
    message: " Enter the product name: ",
  }, {
    name: "deptName",
    type: "input",
    message: " Enter the department name: ",
  }, {
    name: "price",
    type: "input",
    message: " Enter the selling price: ",
  }, {
    name: "quantity",
    type: "input",
    message: " Enter the quantity: ",

    // Update database
  }]).then(function (answer) {
    connection.query("INSERT INTO products SET ?", {
      product_name: answer.productName,
      dept_name: answer.deptName,
      price: answer.price,
      stock_qty: answer.quantity
    }, function (err, res) {
      console.log('\n  The new product was added');
      connection.query('SELECT * FROM products', function (err, results) {
        // Display updated Inventory table
        displayMgr(results);
        prompt();
      });
    });
  });
}
// Display inventory table 
var displayMgr = function (res) {
  var display = new displayTable();
  display.displayInventoryTable(res);
}