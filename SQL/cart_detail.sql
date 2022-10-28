CREATE TABLE cart_detail(
    cart_detail_id   INT     AUTO_INCREMENT,
    cart_id        INT     NOT NULL,
    user_id        INT     NOT NULL,
    PRIMARY KEY (cart_detail_id,cart_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
);

INSERT INTO cart_detail (cart_detail_id,cart_id,user_id) VALUE
(1,1,1),
(2,1,1),
(3,1,1),
(4,2,3),
(5,2,3),
(6,3,1),
(7,2,3),
(8,3,3);