// // Q2 Mapping:
// User(
//     id PK,
//     email,
//     firstName,
//     lastName,
//     role,
//     password
// )

// UserPhone(
//     userId FK REFERENCES User(id),
//     phone,
//     PRIMARY KEY(userId, phone)
// )

// Product(
//     id PK,
//     name,
//     stock,
//     price,
//     isDeleted,
//     userId FK REFERENCES User(id)
// )

// Q3 :

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "retail_store",
});

connection.connect((err) => {
  if (err) console.log({ err });
  else console.log("Database Connected");
});

const createProducts = `CREATE TABLE products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT ,
    ProductName VARCHAR(250) ,
    Price DECIMAL(10,2),
    StockQuantity INT,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES suppliers(SupplierID) 
)`;

const createSuppliers = `CREATE TABLE suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(250) NOT NULL,
    ContactNumber VARCHAR(20)
)`;

const createSales = `CREATE TABLE sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT,
    QuantitySold INT NOT NULL,
    SaleDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
)`;

// connection.execute(createSuppliers, (err) => {
//   if (err) console.log({ err });
//   else console.log("Table suppliers created");
// });

// connection.execute(createProducts, (err) => {
//   if (err) console.log({ err });
//   else console.log("Table products created");
// });
// connection.execute(createSales, (err) => {
//   if (err) console.log({ err });
//   else console.log("Table sales created");
// });

const Q2 = `ALTER TABLE products
ADD Category VARCHAR(100)`;

// connection.execute(Q2, (err) => {
//   if (err) console.log({ err });
//   else console.log("Column category added");
// });

const Q3 = `ALTER TABLE products
DROP COLUMN Category `;

// connection.execute(Q3, (err) => {
//   if (err) console.log({ err });
//   else console.log("Column category deleted");
// });

const Q4 = `ALTER TABLE suppliers
MODIFY COLUMN ContactNumber VARCHAR(15);`;

// connection.execute(Q4, (err) => {
//   if (err) console.log({ err });
//   else console.log("Column ContactNumber modified");
// });

const Q5 = `ALTER TABLE Products
MODIFY COLUMN ProductName VARCHAR(255) NOT NULL;`;

// connection.execute(Q5, (err) => {
//   if (err) console.log({ err });
//   else console.log("Column ProductName modified");
// });

const Q6_a = `INSERT INTO suppliers (SupplierName,ContactNumber)
VALUES ('FreshFoods', '01001234567')`;

// connection.execute(Q6_a, (err) => {
//   if (err) console.log({ err });
//   else console.log("supplier inserted");
// });

const Q6_b = `INSERT INTO products (ProductName, Price, StockQuantity, SupplierID)
VALUES
('Milk', 15.00, 50, 1),
('Bread', 10.00, 30, 1),
('Eggs', 20.00, 40, 1);`;

// connection.execute(Q6_b, (err) => {
//   if (err) console.log({ err });
//   else console.log("products inserted");
// });

const Q6_c = `INSERT INTO sales (ProductID, QuantitySold, SaleDate)
VALUES (1,2,"2025-05-20")`;

// connection.execute(Q6_c, (err) => {
//   if (err) console.log({ err });
//   else console.log("record inserted in sales");
// });

const Q7 = `UPDATE products
SET Price = 25.00
WHERE ProductName = 'Bread';`;

// connection.execute(Q7, (err) => {
//   if (err) console.log({ err });
//   else console.log("Bread price updated");
// });

const Q8 = `DELETE FROM products
WHERE ProductName = "Eggs"`;

// connection.execute(Q8, (err) => {
//   if (err) console.log({ err });
//   else console.log("Eggs deleted");
// });

const Q9 = `SELECT 
    p.ProductName,
    SUM(s.QuantitySold) AS TotalQuantitySold
FROM Products p
JOIN Sales s ON p.ProductID = s.ProductID
GROUP BY p.ProductID`;

// connection.execute(Q9, (err,result) => {
//   if (err) console.log({ err });
//   else console.log({result});
// });

const Q10 = `SELECT *
FROM products
ORDER BY StockQuantity DESC
LIMIT 1`;

// connection.execute(Q10, (err, result) => {
//   if (err) console.log({ err });
//   else console.log({ result });
// });

const Q11 = `SELECT *
FROM suppliers
WHERE SupplierName LIKE 'F%'`;

// connection.execute(Q11, (err, result) => {
//   if (err) console.log({ err });
//   else console.log({ result });
// });

const Q12 = `SELECT p.*
FROM products p
LEFT JOIN sales s
ON p.ProductID = s.ProductID
WHERE s.ProductID IS NULL`;

// connection.execute(Q12, (err, result) => {
//   if (err) console.log({ err });
//   else console.log({ result });
// });

const Q13 = `SELECT
    p.ProductName,
    s.QuantitySold,
    s.SaleDate
FROM sales s
JOIN products p
ON s.ProductID = p.ProductID`;

// connection.execute(Q13, (err, result) => {
//   if (err) console.log({ err });
//   else console.log({ result });
// });

const Q14_1 = `CREATE USER 'store_manager'@'localhost'
IDENTIFIED BY '123456'`;

// connection.execute(Q14_1, (err, result) => {
//   if (err) console.log({ err });
//   else console.log("user created");
// });

const Q14_2 = `GRANT SELECT, INSERT, UPDATE
ON retail_store.*
TO 'store_manager'@'localhost'`;

// connection.execute(Q14_2, (err, result) => {
//   if (err) console.log({ err });
//   else console.log("permission updated");
// });

const Q15 = `REVOKE UPDATE
ON retail_store.*
FROM 'store_manager'@'localhost'`;

// connection.execute(Q15, (err, result) => {
//   if (err) console.log({ err });
//   else console.log("Done");"
// });

const Q16 = `GRANT DELETE
ON retail_store.sales
TO 'store_manager'@'localhost'`;

// connection.execute(Q16, (err, result) => {
//   if (err) console.log({ err });
//   else console.log({ result });
// });
