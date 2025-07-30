DROP TABLE IF EXISTS soldHistory;

CREATE TABLE soldHistory (
    transactionID VARCHAR(50) PRIMARY KEY,
    itemNO INT NOT NULL,
    sellerId INT NOT NULL,
    soldPrice INT,
    soldDate DATE NOT NULL,

    FOREIGN KEY (sellerId) REFERENCES userTable(userID),
    FOREIGN KEY (itemNO) REFERENCES item(itemNO)
);

INSERT INTO soldHistory (transactionID, itemNO, sellerId, soldPrice, soldDate) VALUES
	('abcd1234xyz',11,1,400,'2024-04-15'),
	('abcd216xyz',12,3,150,'2024-04-10'),
	('abcd219xyz',11,2,5500,'2024-06-20'),
	('abdc123xyz',13,4,130,'2024-05-15');

SELECT * FROM soldHistory;  