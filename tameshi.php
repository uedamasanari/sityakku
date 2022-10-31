<?php

    $pdo = new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','kanako','2101003');

    $sql = "SELECT * FROM users WHERE user_mail = ? AND user_pass = ?";

    $ps = $pdo->prepare($sql);

    $ps->bindValue(1,$_POST['mail'],PDO::PARAM_STR);

    $ps->bindValue(2,$_POST['pass'],PDO::PARAM_STR);

    $ps->execute();

    $result = $ps->fetchAll();

    if($result == null){
        echo "一致しません。";
    }else{
        foreach($result as $row){
            echo $row['user_id'];
        }
    }

?>