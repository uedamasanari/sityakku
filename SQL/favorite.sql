CREATE TABLE favorite(
    favorite_id    INT        AUTO_INCREMENT,
    item_id        INT        NOT NULL,
    user_id        INT        NOT NULL,
    PRIMARY KEY (favorite_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);
INSERT INTO favorite (favorite_id,item_id,user_id) VALUE
(1,2,1),
(2,3,5),
(3,1,4),
(4,8,3),
(5,11,7),
(6,4,2),
(7,5,6);