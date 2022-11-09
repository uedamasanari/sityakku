CREATE TABLE cart(
    cart_id      INT     AUTO_INCREMENT,
    user_id      INT     NOT NULL,
    PRIMARY KEY (cart_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO cart (cart_id,user_id) VALUE
(1,1),
(2,5),
(3,4),
(4,3),
(5,7),
(6,2),
(7,6);