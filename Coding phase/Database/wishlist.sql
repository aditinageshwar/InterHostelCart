CREATE TABLE IF NOT EXISTS wishlist (
    itemNO INT,
    buyerId INT,

    FOREIGN KEY (buyerId) REFERENCES userTable(userID),
    FOREIGN KEY (itemNO) REFERENCES item(itemNO)
);

-- INSERT INTO wishlist (itemNO, buyerId) VALUES 
-- (19, 4),
-- (18, 7),
-- (14, 3),
-- (11, 10),
-- (24, 1);

SELECT * FROM wishlist;