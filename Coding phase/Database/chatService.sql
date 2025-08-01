CREATE TABLE IF NOT EXISTS chatService (
    messageID SERIAL PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    itemNO INT NOT NULL,
    messageTime TIMESTAMP NOT NULL,
    messageContent VARCHAR(200) NOT NULL,
    report BOOLEAN NOT NULL,

    FOREIGN KEY (senderId) REFERENCES userTable(userID),
    FOREIGN KEY (receiverId) REFERENCES userTable(userID),
    FOREIGN KEY (itemNO) REFERENCES item(itemNO)
);

-- INSERT INTO chatService (senderId, receiverId,itemNO, messageTime, messageContent, report) VALUES
-- 	(1,2,11,'2024-04-21 12:00:00','Hi rishav this side! How you doing?',false),
-- 	(3,4,12,'2024-04-21 12:21:00','report me',true),
-- 	(7,8,13,'2024-04-21 03:02:00','I like yours :-)',false),
-- 	(9,6,14,'2024-04-19 10:21:00','How far are we?',false),
-- 	(10,5,15,'2024-04-21 11:21:00','lets do it!',false);
	
-- ALTER TABLE chatservice MODIFY COLUMN messageContent TEXT;

-- ALTER TABLE chatservice ADD COLUMN room VARCHAR(200);