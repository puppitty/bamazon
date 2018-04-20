// Displays Inventory Table for bamazon js programs
Table = require('cli-table');
var displayTable = function() {

    this.table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Stock Quantity'],
    });

    this.displayInventoryTable = function(res) {
    	this.res = res;
	    for (var i=0; i <this.res.length; i++) {
	        this.table.push(
	            [this.res[i].itemId, this.res[i].product_name, '$'+ this.res[i].price, this.res[i].stock_qty] );
	    }
    	console.log('\n' + this.table.toString());
	};
}
module.exports = displayTable;