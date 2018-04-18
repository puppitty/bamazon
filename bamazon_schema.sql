DROP DATABASE IF EXISTS bamazon_Db;
CREATE database bamazon_Db;

USE bamazon_Db;

CREATE TABLE products (
  itemId INT NOT NULL,
  product_name VARCHAR(100) NULL,
  dept_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_qty INT(10) NULL,
  PRIMARY KEY (itemId)
);

SELECT * FROM products;