CREATE TABLE cart_detail(
    cart_detail_id   INT     AUTO_INCREMENT,
    cart_id        INT     NOT NULL,
    item_id        INT     NOT NULL,
    PRIMARY KEY (cart_detail_id,cart_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
);

INSERT INTO cart_detail (cart_detail_id,cart_id,item_id) VALUE
(1,1,1),
(2,1,2),
(3,1,3),
(4,2,4),
(5,2,5),
(6,3,6),
(7,2,7),
(8,3,8);