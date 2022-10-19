CREATE DATABASE api;
USE api;

CREATE TABLE producto(
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
description VARCHAR(40),
price INT,
count INT
);

SELECT * FROM producto;

INSERT INTO producto (description,price,count) VALUES ("Bebi",15,200);
INSERT INTO producto (description,price,count) VALUES ("Chettos ",15,100);
INSERT INTO producto (description,price,count) VALUES ("Coca-cola",32,500);
INSERT INTO producto (description,price,count) VALUES ("Emperador",10,700);
INSERT INTO producto (description,price,count) VALUES ("Yogurt",18,280);



