/* Require MySQL & Inquirer */
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

// Need to use join command. Might need to include table builder within this file.

var displaySuper = require("./tableSuper.js")

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
      message: "What would you like to do?",
      choices: [
        "View Products Sales by Department",
        "Add New Department"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products Sales by Department":
          viewDept();
          break;

        case "Add New Department":
          newProduct();
          break;
      }
    });
}
// View Inventory Function

var viewDept = function () {
  var display = new displaySuper();
  connection.query("SELECT * FROM departments;", function (err, res) {
    if (err) throw err;
    display.displaySuperTable(res)
    prompt();
  });
}



// Add New item (Needs to be updated)
// Request item #
// Prompt for name of product
// Prompt for Department
// Prompt for inventory
// update database with new product (Look at ice cream app)
function newProduct() {
  inquirer.prompt([{
    name: "deptName",
    type: "input",
    message: " Enter the department name: ",
  }, {
    name: "overhead",
    type: "input",
    message: " Enter Overhead Costs: ",

  }]).then(function (answer) {
    connection.query("INSERT INTO products SET ?", {
      dept_name: answer.deptName,
      overheadcost: answer.overhead,

    }, function (err, res) {
      console.log('\n  The new Department was added - See the Inventory Table\n');
      connection.query('SELECT * FROM departments', function (err, results) {
        displayMgr(results);
        prompt();
      });
    });
  });
}
//   connection.query("SELECT * FROM bamazon_db.products;", function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     prompt();
//   });
// };

var displayMgr = function (res) {
  var display = new displaySuper();
  display.displaySuperTable(res);
}