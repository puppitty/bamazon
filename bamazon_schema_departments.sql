USE bamazon_Db;

CREATE TABLE departments (
  deptId INT AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(100) NOT NULL,
  overheadcosts DECIMAL(10,2) NULL,
  PRIMARY KEY (itemId)
);

SELECT * FROM departments;

INSERT INTO departments (dept_name, overheadcosts)
VALUES
("Electronics", 25000), 
("Printer", 50000), 
("Scanner", 10000), 
("AIO", 5000), 
("Furniture", 7500), 
("Audio", 7000), 
("Tools", 5000);

SELECT * FROM departments;