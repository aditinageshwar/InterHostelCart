CREATE TABLE IF NOT EXISTS orderHistory (
    itemName VARCHAR(40) NOT NULL,
    itemDescription VARCHAR(255),
    itemPhotoURL VARCHAR(500),
    buyerId INT,
    sellerId INT,
    orderDate DATE NOT NULL,
    status VARCHAR(10) NOT NULL,

    FOREIGN KEY (sellerId) REFERENCES usertable(userID),
    FOREIGN KEY (buyerId) REFERENCES usertable(userID)
);

-- INSERT INTO orderHistory (buyerId, itemName, itemDescription, itemPhotoURL, sellerId, orderDate, status) VALUES
-- (3, 'Induction Cooktop','2 months old, black color, fast heating, very good condition','https://images.olx.com.pk/thumbnails/498026235-800x600.jpeg', 4, STR_TO_DATE('03/04/24', '%m/%d/%y'), 'Done'),
-- (9, 'Tennis Racket','6 months old, white and blue color, good condition, lightly used with no damage','https://i.pinimg.com/originals/b0/2a/01/b02a0141b36ede22d59ec2bfce421418.jpg', 3, STR_TO_DATE('05/06/24', '%m/%d/%y'), 'Done');

SELECT * FROM orderHistory;

-- ALTER TABLE orderhistory ADD COLUMN totalamount DECIMAL(10,2);
-- UPDATE orderHistory SET totalamount = 2500 WHERE itemName = 'Induction Cooktop';
-- UPDATE orderHistory SET totalamount = 1500 WHERE itemName = 'Tennis Racket';