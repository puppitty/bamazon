/* Require MySQL & Inquirer */
var inquirer = require("inquirer");
var mysql = require("mysql");
var superTable = require('cli-table');

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

// Supervisor questions 
var prompt = function () {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products Sales by Department",
        new inquirer.Separator("=================================="),
        "Add New Department"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products Sales by Department":
          viewDept();
          break;

        case "Add New Department":
          newDept();
          break;
      }
    });
}
// View Inventory Function
// Not working - check code

var viewDept = function () {
  var display = new displaySuper();
  connection.query("SELECT * FROM departments;", function (err, res) {
    if (err) throw err;
    display.displaySuperTable(res)
    prompt();
  });
}



// Add New department (Not getting to database)

function newDept() {
  inquirer.prompt([{
    name: "deptName",
    type: "input",
    message: " Enter the department name: ",
  }, {
    name: "overhead",
    type: "input",
    message: " Enter Overhead Costs: ",

  }]).then(function (answer) {
    connection.query("INSERT INTO departments SET ?", {
      dept_name: answer.deptName,
      overheadcost: answer.overhead,

    }, function (err, res) {

      connection.query('SELECT * FROM departments', function (err, results) {
        
        console.log('\n  The new Department was added.');
        // displaySuper(results);
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

var displaySuper = function (res) {
  var display = new displaySuper();
  display.displaySuperTable(res);
}