CREATE TABLE settlement(
    settlement_id      INT          AUTO_INCREMENT,
    user_id            INT          NOT NULL,
    settlement_buy     VARCHAR(15)  NOT NULL,
    settlement_address VARCHAR(100) NOT NULL,
    settlement_time    VARCHAR(100) NOT NULL ,
    settlement_item1   VARCHAR(100),
    settlement_item2   VARCHAR(100),
    settlement_item3   VARCHAR(100),
    settlement_item4   VARCHAR(100),
    PRIMARY KEY (settlement_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);