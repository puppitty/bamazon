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
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
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
    // console.log(res);
    prompt();
  });
}

// Add Quantity (Needs to be updated)
// Request item #
// Prompt additional quantity
// update database with new quantity (Look at ice cream app)
function addQty() {
  connection.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;
    inquirer.prompt([{
      name: "inputId",
      type: "input",
      message: " Enter the Item ID: ",

    }, {
      name: "quantity",
      type: "input",
      message: " Enter quantity you wish to add: ",

    }]).then(function (answer) {

      connection.query('SELECT * FROM products WHERE ?', {
        itemId: answer.id
      }, function (err, res) {
        itemQuantity = res[0].stock_qty + parseInt(answer.quantity);

        connection.query("UPDATE products SET ? WHERE ?", [{
          stock_qty: itemQuantity
        }, {
          itemId: answer.id
        }], function (err, res) {});

        connection.query('SELECT * FROM products WHERE ?', {
          ItemID: answer.id
        }, function (err, res) {
          console.log('\n The Stock Quantity was updated- see Inventory Table\n');
          displayMgr(res);
          // promptManager();
          prompt();
        });

      });
    });

    // console.log(res);
    // prompt();
  });
};

// Add New item (Needs to be updated)
// Request item #
// Prompt for name of product
// Prompt for Department
// Prompt for inventory
// update database with new product (Look at ice cream app)
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
}]).then(function(answer) {
    connection.query("INSERT INTO products SET ?", {
        product_name: answer.productName,
        dept_name: answer.deptName,
        price: answer.price,
        stock_qty: answer.quantity
    }, function(err, res) {
        console.log('\n  The new product was added - See the Inventory Table\n');
            connection.query('SELECT * FROM products', function(err, results){  
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
  var display = new displayTable();
  display.displayInventoryTable(res);
}
// Rest of code needs updating

// function prompt() {
//   inquirer
//     .prompt([{
//       name: "inputID",
//       type: "input",
//       message: "Please enter the Item ID"
//     },
//     {
//       name: "quantity",
//       type: "input",
//       message: "How many units would you like to buy?"
//     },
//     ])
//     // Then needs to be updated to compare requested quantity against available quantity. If yes, place order, show custoemr total cost. if not send message "Insufficient quantity"
//     .then(function(answer) {
//       var query = "SELECT position, song, year FROM top5000 WHERE ?";
//       connection.query(query, { artist: answer.artist }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }