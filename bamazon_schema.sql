DROP DATABASE IF EXISTS bamazon_Db;
CREATE database bamazon_Db;

USE bamazon_Db;

CREATE TABLE products (
  itemId INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_qty INT(10) NULL,
  PRIMARY KEY (itemId)
);

SELECT * FROM products;