
DROP TABLE IF EXISTS familymember CASCADE;
CREATE TABLE familymember(
   idfamilymember serial NOT NULL PRIMARY KEY,
   familymember_name VARCHAR(45) NOT NULL, 
   familymember_username VARCHAR(45) NOT NULL,
   familymember_pass VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS expenses CASCADE;
CREATE TABLE expenses(
   idexpenses serial NOT NULL PRIMARY KEY,
   expenses_description TEXT NOT NULL,
   expenses_amount DECIMAL(6,2) NOT NULL,
   expenses_date DATE NOT NULL,
   familymember_idfamilymember INT NOT NULL,
   FOREIGN KEY (familymember_idfamilymember)
      REFERENCES familymember(idfamilymember)
);

DROP TABLE IF EXISTS incomes CASCADE;
CREATE TABLE incomes (
   idincomes serial NOT NULL PRIMARY KEY,
   incomes_description TEXT NOT NULL,
   incomes_amount DECIMAL(6,2) NOT NULL,
   incomes_date DATE NOT NULL,
   familymember_idfamilymember INT NOT NULL,
   FOREIGN KEY (familymember_idfamilymember)
      REFERENCES familymember(idfamilymember)
);

INSERT INTO familymember
(familymember_name,
 familymember_username,
 familymember_pass)
VALUES
('Eduardo',
 'eh',
 'ehq');

 INSERT INTO expenses(
    expenses_description,
    expenses_amount,
    expenses_date,
    familymember_idfamilymember
 )
 VALUES
 (
     'groceries for lunch',
     12.5,
     '2020-11-28',
     1
 );