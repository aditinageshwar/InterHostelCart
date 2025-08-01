SELECT * FROM usertable WHERE USERID IN 
(SELECT sellerId FROM item WHERE itemPrice > 500);

SELECT * FROM item WHERE sellerId IN 
(SELECT USERID FROM usertable WHERE userName LIKE 'R%');

SELECT * FROM transaction WHERE soldDate BETWEEN '01/02/24' AND '28/02/24';

SELECT * FROM item WHERE itemNO IN 
(SELECT itemNO FROM soldHistory WHERE sellerId = 2);

SELECT * FROM item WHERE itemNO IN 
(SELECT itemNO FROM orderHistory GROUP BY itemNO HAVING COUNT(*) > 1);  

SELECT * FROM chatService WHERE messageId = 2;


SELECT i.itemName, i.itemDescription, u.userName
FROM wishList w
JOIN item i ON w.itemNO = i.itemNO
JOIN userTable u ON i.sellerID = u.userID
WHERE w.buyerID = 3;                                 /* find name and description of item and username who is selling that item which is present in wishlist of user with buyerid=3 */


SELECT * FROM chatService
WHERE receiverId > 1
ORDER BY messageTime;


SELECT sellerId, itemNo, COUNT(*) AS soldcount
FROM soldHistory
GROUP BY sellerId, itemNo
HAVING COUNT(*) > 1;


SELECT * FROM usertable WHERE USERID IN 
(SELECT sellerId FROM item WHERE itemPrice > 500);


SELECT sellerId, COUNT(*) AS itemCount
FROM soldHistory
GROUP BY sellerId
HAVING COUNT(*) > 1;

SELECT * FROM item WHERE itemTags LIKE '%Electronics%' OR itemTags LIKE '%Clothing%';

SELECT DISTINCT buyerId
FROM transaction
WHERE itemNO IN (SELECT itemNO FROM item WHERE sellerID = 1);