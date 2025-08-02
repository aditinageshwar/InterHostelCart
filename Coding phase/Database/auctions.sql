SET sql_mode = '';

CREATE TABLE IF NOT EXISTS auctions (
  auctionId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  itemNO INT NOT NULL,
  startingBid DECIMAL(10, 2) NOT NULL,
  endTime DATETIME NOT NULL,
  
  FOREIGN KEY (itemNO) REFERENCES item(itemNO)
);

SELECT * FROM auctions;