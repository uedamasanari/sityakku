CREATE TABLE users(
    user_id      INT           AUTO_INCREMENT,
    user_mail    VARCHAR(100)  NOT NULL,
    user_pass    VARCHAR(30)   NOT NULL   ,
    user_height  INT           ,
    user_weight  INT           ,
    user_gender  CHAR(1)       ,
    user_buy     VARCHAR(15),
    user_address VARCHAR(100),
    PRIMARY KEY (user_id)
);

INSERT INTO users (user_id,user_mail,user_pass,user_height,user_weight,user_gender,user_buy,user_address) VALUE
(1,'ueda@gmail.com','ueda','170','65','男','代引','福岡県福岡市'),
(2,'akashi@gmail.com','akashi','175','50','男','クレジットカード','福岡県福岡市'),
(3,'itoyama@gmail.com','itoyama','165','40','女','代引','福岡県福岡市'),
(4,'oyamada@gmail.com','oyamada','180','70','男','代引','福岡県福岡市'),
(5,'nonaka@gmail.com','nonaka','175','65','男','クレジットカード','福岡県福岡市'),
(6,'baba@gmail.com','baba','165','60','男','代引','福岡県福岡市'),
(7,'yamashita@gmail.com','yamashita','170','65','男','代引','福岡県福岡市');