   SET FOREIGN_KEY_CHECKS = 0;
   DROP TABLE IF EXISTS item;
   SET FOREIGN_KEY_CHECKS = 1;

   SET sql_mode = '';

   CREATE TABLE item (
    itemNO INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sellerId INT,
    itemName VARCHAR(40) NOT NULL,
    itemPrice INT NOT NULL,
    itemDescription VARCHAR(255),
    itemTags VARCHAR(30) NOT NULL,
    listingDate DATE NOT NULL,
    reportflag BOOLEAN,
    itemVisit INT,
    itemPhotoURL VARCHAR(500),
    gender VARCHAR(10),
    
    FOREIGN KEY (sellerId) REFERENCES usertable(userID)
);


INSERT INTO item (sellerId,itemName,itemPrice,itemDescription,itemTags,listingDate,reportflag,itemVisit,itemPhotoURL,gender) VALUES
	(1,'TP-Link Router 2.4GHz',500,'6 months old, in very good condition, white in color','Electronics','2024-03-04',false,1,'https://www.highspeedinternet.com/app/uploads/2022/11/tp-link-archer-ax20-front-shot-706x472.jpg','heshe'),
	(2,'Havells Air Cooler',2000,'6 months old, in very good condition, white in color','Electronics','2024-02-03',false,9,'https://5.imimg.com/data5/SELLER/Default/2022/7/KD/PI/AD/101886860/whatsapp-image-2022-07-03-at-7-04-47-pm-500x500.jpeg','heshe'),
	(4,'Laptop',10990,'High-performance laptop for professional use','Electronics','2019-05-08',false,92,'https://laptopmall.pk/storage/media/azPcsWE8PlfqkZkYRVlXdZ9I0BJu7mwpBGPm8Fzf.jpg','heshe'),
	(5,'Camera',1600,'DSLR camera with 4K recording capabilities','Electronics','2023-12-12',false,75,'http://www.isell.sg/uploads/product_cover/3bb2db91e6002a0195a9c85cb16593d0.JPG','heshe'),
	(6,'Gaming Console',800,'Next-gen gaming console for immersive gaming','Electronics','2024-02-02',false,11,'https://media.karousell.com/media/photos/products/2017/03/28/second_hand_xbox_360_console_set_1490691295_58a83806.jpg','he'),
	(7,'Tablet',2000,'Lightweight tablet for on-the-go productivity','Electronics','2024-01-03',false,25,'https://tse4.mm.bing.net/th/id/OIP.oRzD4xN9pjWasq-kWsVt9AHaJ4?pid=Api&P=0&h=180','heshe'),
	(8,'Fitness Tracker',200,'Track your fitness goals with this smart band','Accessories, Electronics, Sport','2024-03-02',false,19,'https://ireland.apollo.olxcdn.com/v1/files/lmpe5rsohzg6-PL/image;s=393x699','heshe'),
	(9,'Blue T-shirt',200,'A comfortable blue cotton t-shirt','Accessories','2024-03-04',false,5,'https://img.freepik.com/premium-photo/stylish-blue-tshirt-marketing_882186-5246.jpg','he'),
	(10,'Samsung Mobile',5000,'Brand new mobile with 128GB storage','Electronics','2024-03-05',false,3,'https://ireland.apollo.olxcdn.com/v1/files/q3ofeuy5izf01-UA/image;s=750x1000','heshe');


INSERT INTO item (sellerId,itemName,itemPrice,itemDescription,itemTags,listingDate,reportflag,itemVisit,itemPhotoURL,gender) VALUES
	 (1,'Leather Wallet',135,'Brown leather handbag with multiple card slots','Accessories','2024-04-05',false,7,'https://dillibazar.co.in/wp-content/uploads/Gucci-Handbags-India.jpg','she'),
	 (2,'Wireless Mouse',315,'Ergonomic design, compatible with all devices','Electronics','2024-03-05',false,2,'https://frankfurt.apollo.olxcdn.com/v1/files/fdjdmvxhw5do2-BG/image;s=906x680','heshe'),
	 (3,'Floral Dress',449,'Elegant floral pattern dress suitable for parties','Accessories','2024-06-06',false,10,'https://image.made-in-china.com/2f0j00CrQkTiMPuEqY/Bale-Packing-Mixed-Sizes-Color-Lady-Summer-Clothing-Women-Used-Dress-Second-Hand-Clothes.jpg','she'),
	 (4,'Coffee Mug',120,'Voyager, Janeway coffee mug','Accessories','2024-07-12',false,2,'https://www.yourprops.com/movieprops/default/yp63051dc1e58116.22688161/Star-Trek-Voyager-Janeway-coffee-mug-1.jpg','she'),
	 (1,'Pen holder',50,'3D printed, white in color','Stationary','2024-09-24',false,0,'https://i.redd.it/been-loving-this-3d-printed-pen-holder-v0-7wu9biys5ztb1.jpg?s=957a3025c8edc0806696cc1c4b7009bf8663f6d7','heshe'),
     (5, 'Portable Bluetooth Speaker', 1000, '5 months old, red color, clear sound, great condition', 'Electronics', '2024-02-15', false, 5, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQlu2kgWAXavuqWSxqnJD-_2UpsELULVUv5-_WCCiiyOpuuCtpEBhrmCaleomt5BPGiVesg1VLVgRrE3nxyq4xvtp2u77DxiEl_86ccRZqvocRvBJGXAQ', 'heshe'),
     (6, 'Power Bank', 600, '7 months old, gray color, reliable, very good condition', 'Electronics', '2024-03-01', false, 6, 'https://media.istockphoto.com/id/1126642401/photo/power-bank-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=FMMhXxZql2guHigJvPDsi6S5Bp_QT6OsfZnD6kqcc3U=', 'heshe'),
     (7, 'LED Desk Lamp', 500, '3 months old, white color, adjustable brightness', 'Electronics', '2024-05-10', false, 7, 'https://i5.walmartimages.com/asr/c16f30a6-d661-46d5-9fba-4d60d0cf1a5c.86fb2b28f5849ef6c62f000070ab11e2.jpeg', 'heshe'),
     (8, 'LAN Wire', 80, '10 months old, light gray color, 5 meter long, high speed, good condition', 'Electronics', '2024-02-20', false, 8, 'https://www.hostelbucket.com/assets/uploads/2024/12/WhatsApp-Image-2024-12-15-at-17.08.39_4fe66ae1.jpg', 'heshe'),
     (9, 'Electric Kettle', 500, 'philips, 6 months old, silver color, quick-boiling, excellent condition', 'Electronics', '2024-03-03', false, 9, 'https://media.karousell.com/media/photos/products/2022/5/13/philips_17l_electric_kettle_1652484456_a8563f45.jpg', 'heshe'),
     (10, 'USB Flash Drive', 400, '8 months old, blue color, ample storage, good condition', 'Electronics', '2024-03-05', false, 10, 'https://www.buydig.com/shop/product-image.aspx?size=500&picId=254897', 'he'),
	 (6, 'Induction Cooktop', 2500, '2 months old, black color, fast heating, very good condition', 'Electronics', '2024-04-01', false, 6, 'https://images.olx.com.pk/thumbnails/498026235-800x600.jpeg', 'he');


INSERT INTO item (sellerId, itemName, itemPrice, itemDescription, itemTags, listingDate, reportflag, itemVisit, itemPhotoURL, gender) VALUES
(1, 'Notebook', 50, '3 months old, blue cover, lightly used', 'Stationary', '2024-04-01', false, 1, 'https://media.istockphoto.com/id/149402372/photo/notebook.jpg?s=612x612&w=0&k=20&c=aGoLZSVt9IXBiO_bsJqvP9pjiyVJ7cETmSZm5fKjdUI=', 'heshe'),
(2, 'Calculator', 200, '6 months old, CASIO FX-991ES black color, excellent condition', 'Electronics,Stationary', '2024-04-02', false, 2, 'https://img.drz.lazcdn.com/g/kf/S835c75bac89e404a89fca54ed95ae217l.jpg_720x720q80.jpg', 'heshe'),
(6, 'Stapler', 70, '6 months old, black color, lightly used', 'Stationary', '2024-04-06', false, 6, 'https://cdn01.pinkoi.com/product/n77s5dwP/0/800x0.jpg', 'heshe'),
(8, 'Folder Set', 150, '2 months old, black color, fully intact', 'Stationary', '2024-04-08', false, 8, 'https://cdn11.bigcommerce.com/s-2nt4eo0lpn/images/stencil/532x532/products/117/420/choir-anthem-open-800__42047.1545972756.jpg?c=2', 'heshe'),
(9, 'Geometry Set', 50, '5 months old, transparent color, no scratches', 'Stationary', '2024-04-09', false, 9, 'https://images-na.ssl-images-amazon.com/images/I/91RDMN31moL._SX679_.jpg', 'heshe'),
(10, 'Sticky Notes', 20, '1 month old, yellow packed, good adhesive', 'Stationary', '2024-04-10', false, 10, 'https://cf.shopee.co.id/file/9e8f4dbe05874a6894f7b8d77e0fbd17', 'heshe'),
(3, 'Whiteboard', 200, '3 months old, 2x3 feet size, good condition', 'Stationary', '2024-04-03', false, 3, 'https://wafilife-media.wafilife.com/uploads/2024/07/Small-White-Board.jpg', 'heshe');


INSERT INTO item (sellerId, itemName, itemPrice, itemDescription, itemTags, listingDate, reportflag, itemVisit, itemPhotoURL, gender) VALUES
(1, 'Bicycle', 3000, '10 months old, blue color, well-maintained, smooth ride', 'Vehicle', '2024-03-04', false, 1, 'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/Fw4AAOSwunBa5THt/$_86.JPG', 'he'),
(2, 'Electric Scooter', 15000, '8 months old, Okinawa white color, excellent battery life, great condition', 'Electronics,Vehicle', '2024-04-03', false, 2, 'https://tse2.mm.bing.net/th/id/OIP.rYazriVVnltmwy1-uzS4JwHaFQ?pid=Api&P=0&h=180', 'she'),
(5, 'Motorcycle', 25000, '15 months old, black color, fully serviced, reliable condition', 'Vehicle', '2024-02-15', false, 5, 'https://tse1.mm.bing.net/th/id/OIP.xHLO0SmD74zUr2yapAerTgAAAA?pid=Api&P=0&h=180', 'he'),
(6, 'Helmet', 500, '3 months old, black color, like new, excellent condition', 'Accessories, Vehicle,', '2024-03-01', false, 6, 'https://used.com.ph/uploads/images/5de4e1e746d7c.jpg', 'he');

INSERT INTO item (sellerId, itemName, itemPrice, itemDescription, itemTags, listingDate, reportflag, itemVisit, itemPhotoURL, gender) VALUES
(1, 'Tennis Racket', 1500, '6 months old, white and blue color, good condition, lightly used with no damage', 'Sport', '2024-03-04', false, 1, 'https://i.pinimg.com/originals/b0/2a/01/b02a0141b36ede22d59ec2bfce421418.jpg', 'heshe'),
(3, 'Football', 1200, '1 year old, white and black color, good condition, some wear but still very functional', 'Sport', '2024-03-04', false, 3, 'https://tse4.mm.bing.net/th/id/OIP.G0POAl8hmvBMUjiQE3tchAHaEK?pid=Api&P=0&h=180', 'he'),
(6, 'Cricket Bat', 2000, '7 months old, wooden color, good condition, slight marks from use but no cracks', 'Sport', '2024-03-01', false, 6, 'https://tse2.mm.bing.net/th/id/OIP.0EoMfG8Vud5FAtHjno2gYgAAAA?pid=Api&P=0&h=180', 'he'),
(7, 'Yoga Mat', 500, '9 months old, purple color, excellent condition, minimal wear, non-slip surface', 'Sport', '2024-05-10', false, 7, 'https://ireland.apollo.olxcdn.com/v1/files/jo7mbfm0j515-PT/image;s=4096x3072', 'heshe'),
(9, 'Skipping Rope', 200, '3 months old, navy blue color, very good condition, lightly used, adjustable length', 'Sport', '2024-03-03', false, 9, 'https://ireland.apollo.olxcdn.com/v1/files/jbrrnbqbmrrm3-UA/image;s=756x1008', 'heshe');

INSERT INTO item (sellerId, itemName, itemPrice, itemDescription, itemTags, listingDate, reportflag, itemVisit, itemPhotoURL, gender) VALUES
(1, 'Watch', 2500, '1 year old, black color, good condition, lightly used, minor scratches on the strap', 'Accessories', '2024-01-10', false, 1, 'http://www.idexonline.com/image_bank/NewsRoom_FullArticle/jewelry/rolex%20genereic%2022.jpg', 'he'),
(3, 'Backpack', 1200, '8 months old, Wildcraft blue and white color, very good condition, no tears, spacious', 'Accessories', '2024-02-20', false, 3, 'http://5.imimg.com/data5/ANDROID/Default/2022/6/GC/UD/MR/13210508/product-jpeg.jpg', 'heshe'),
(5, 'Hat', 300, '6 months old, black color, excellent condition, hardly worn', 'Accessories', '2024-02-25', false, 5, 'https://tse3.mm.bing.net/th/id/OIP.xqOpNPv3NfVwgIfE2QttUwHaHa?pid=Api&P=0&h=180', 'he');

SELECT * FROM item;