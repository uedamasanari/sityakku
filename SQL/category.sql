CREATE TABLE category(
    category_id        INT             AUTO_INCREMENT,
    category_name      VARCHAR(30)    NOT NULL,
    PRIMARY KEY (category_id)
);

INSERT INTO category (category_id,category_name) VALUE
(1,'トップス'),
(2,'ボトムス'),
(3,'指輪'),
(4,'ネックレス');