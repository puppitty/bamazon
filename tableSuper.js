// Displays Inventory Table for bamazon js programs for Supervisor
superTable = require('cli-table');
var displaySuper = function() {

    this.table = new superTable({
        head: ['Dept ID', 'Department Name', 'Overhead Costs', 'Product Sales', "Total Profit"],
    });

    this.displaySuperTable = function(res) {
    	this.res = res;
	    for (var i=0; i <this.res.length; i++) {
	        this.table.push(
	            [this.res[i].itemId, this.res[i].dept_name, '$'+ this.res[i].overheadcost] );
	    }
    	console.log('\n' + this.table.toString());
	};
}
module.exports = displaySuper;