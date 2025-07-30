DROP TABLE IF EXISTS transaction;

CREATE TABLE transaction (
    tranid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemNO INT,
    sellerId INT,
    buyerId INT,
    soldprice INT NOT NULL,
    solddate DATE NOT NULL,
    itemStatus BOOLEAN NOT NULL,

    FOREIGN KEY (itemNO) REFERENCES item(itemNO),
    FOREIGN KEY (sellerId) REFERENCES usertable(userID),
    FOREIGN KEY (buyerId) REFERENCES usertable(userID)
);

INSERT INTO transaction (itemNO, sellerId, buyerId, soldprice, solddate, itemstatus) VALUES
(20, 1, 2, 400, STR_TO_DATE('24/03/04', '%y/%m/%d'), TRUE),
(11, 3, 4, 1000, STR_TO_DATE('24/02/17', '%y/%m/%d'), TRUE),
(12, 7, 8, 100, STR_TO_DATE('24/04/17', '%y/%m/%d'), TRUE),
(13, 9, 10, 200, STR_TO_DATE('24/05/17', '%y/%m/%d'), TRUE),
(14, 10, 2, 300, STR_TO_DATE('24/06/17', '%y/%m/%d'), TRUE),
(15, 1, 3, 150, STR_TO_DATE('24/07/17', '%y/%m/%d'), TRUE),
(16, 2, 4, 250, STR_TO_DATE('24/08/17', '%y/%m/%d'), TRUE),
(17, 7, 9, 350, STR_TO_DATE('24/09/17', '%y/%m/%d'), TRUE),
(18, 8, 10, 450, STR_TO_DATE('24/10/17', '%y/%m/%d'), TRUE),
(19, 9, 1, 550, STR_TO_DATE('24/11/17', '%y/%m/%d'), TRUE),
(20, 2, 3, 650, STR_TO_DATE('24/12/17', '%y/%m/%d'), TRUE);

SELECT * FROM transaction;