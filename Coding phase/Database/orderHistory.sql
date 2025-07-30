DROP TABLE IF EXISTS orderHistory;

CREATE TABLE orderHistory (
    itemNO INT,
    buyerId INT,
    sellerId INT,
    orderDate DATE NOT NULL,
    status VARCHAR(10) NOT NULL,

    FOREIGN KEY (sellerId) REFERENCES usertable(userID),
    FOREIGN KEY (buyerId) REFERENCES usertable(userID),
    FOREIGN KEY (itemNO) REFERENCES item(itemNO)
);

INSERT INTO orderHistory (buyerId, itemNO, sellerId, orderDate, status) VALUES
(1, 50, 2, STR_TO_DATE('02/03/24', '%m/%d/%y'), 'Done'),
(3, 51, 4, STR_TO_DATE('03/04/24', '%m/%d/%y'), 'Done'),
(7, 52, 8, STR_TO_DATE('04/05/24', '%m/%d/%y'), 'UnDone'),
(9, 53, 10, STR_TO_DATE('05/06/24', '%m/%d/%y'), 'Done'),
(10, 52, 8, STR_TO_DATE('06/07/24', '%m/%d/%y'), 'Done');

SELECT * FROM orderHistory;

ALTER TABLE orderhistory ADD COLUMN totalamount DECIMAL(10,2);