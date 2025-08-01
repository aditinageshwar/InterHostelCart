SET sql_mode = '';

CREATE TABLE IF NOT EXISTS usertable (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emailID VARCHAR(30) UNIQUE NOT NULL,
    hostelNo INT NOT NULL,
    roomNo INT NOT NULL,
    userName VARCHAR(30) NOT NULL,
    userDOB DATE NOT NULL,
    userPhoneNo BIGINT UNIQUE NOT NULL,
    userPassword VARCHAR(100) NOT NULL,
    userDept VARCHAR(30) NOT NULL,
    userCourse VARCHAR(30) NOT NULL
);

SELECT * FROM usertable;

-- INSERT INTO usertable (emailID, hostelNo, roomNo, userName, userDOB, userPhoneNo, userPassword, userDept, userCourse) VALUES
--     ('2320403123@stu.manit.ac.in', 9, 32, 'Manjit Kumbhakar', '2003-03-17', 9641431720, 'I am Handsome', 'MBC', 'MCA'),
--     ('2320403216@stu.manit.ac.in', 7, 36, 'Shruti Gupta', '2001-07-03', 9477199210, '$2b$10$uQZh0hzuS2q85LivoLCmJ.oWCxlsgvccIqwRdQ5OFxxZxqy6pL5Z.', 'MBC', 'MCA'),
--     ('2320403223@stu.manit.ac.in', 7, 50, 'Aditi Nageshwar', '2001-10-15', 9340520507, '$2b$10$CrlkOE2uM8vLSSlJfXJbquL2DrEBA3TVSrB67uVP3OO3DvX3swpPO', 'MBC', 'MCA'),
--     ('2320403219@stu.manit.ac.in', 9, 26, 'Rishav Chakraborty', '2000-10-23', 7063676294, '$2b$10$aVgGbnjkK7sW0zPILUqdg.lLnW30QjdTE3dNzrGM745STZTIZ8r3K', 'MBC', 'MCA'),
--     ('2320403205@stu.manit.ac.in', 9, 9004, 'Ayush Gupta', '2003-05-17', 8923124304, '$2b$10$zTDITFg2aeobPcHaV4MYxOUXhros91fXIIA22aMJXHOw/V3.GE7uK', 'MBC', 'MCA'),
--     ('2320403206@stu.manit.ac.in', 9, 9005, 'Karan', '2002-10-26', 9399356355, '$2b$10$792eAqhX8ThSnHjE19bjduQ3F6.HnQw4oYlgwhl6IV2qHH.tHgCUe', 'ME', 'B.Tech'),
--     ('2320403208@stu.manit.ac.in', 9, 9025, 'Risu Kumar Gupta', '2001-01-01', 9798571703, '$2b$10$fWliGXZFY2IoWupL2hV60eGY1DKu27OGy/iNYO9fGcVCgSTS/YO0W', 'MBC', 'MCA'),
--     ('2320403209@stu.manit.ac.in', 9, 9007, 'Mohit Paliwal', '2003-09-20', 9395856355, '$2b$10$LK4pfGqpOvuWyFBWUpA6IevdVudlnN8f3ze.tnqPu51FwHKgJDdQC', 'MBC', 'MCA'),
--     ('2320403210@stu.manit.ac.in', 9, 9024, 'Vikas Nayma', '2001-10-03', 9795271703, '$2b$10$XiRvpumoVQUDsStea9yY8.qOJwKTD2chXuZaeiOqm/L5OhyRn1Dra', 'MBC', 'MCA'),
--     ('2320403203@stu.manit.ac.in', 9, 9003, 'Atul Tondon', '2002-10-26', 9399356356, '$2b$10$navf43KKi33pajLilowkIuB1.Gusr1kBcCw.0SOPglUb5zc3Sf2kq', 'ME', 'B.Tech');
    

-- ALTER TABLE usertable ADD COLUMN reported boolean;

-- UPDATE usertable SET reported = FALSE;

-- ALTER TABLE usertable ADD COLUMN profileImage VARCHAR(65535);
