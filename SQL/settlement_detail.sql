CREATE TABLE settlement_detail(
    settlement_detail_id      INT      AUTO_INCREMENT,
    settlement_id             INT      NOT NULL,
<<<<<<< Updated upstream
    item_id                   INT      NOT NULL,
    PRIMARY KEY (settlement_detail_id)
=======
    item_name                   INT      NOT NULL,
    PRIMARY KEY (settlement_detail_id,settlement_id),
    FOREIGN KEY (settlement_id) REFERENCES settlement(settlement_id),
>>>>>>> Stashed changes
);