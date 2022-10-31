<?php

    require 'PHP/itoyama.php';

    $dbmg = new Itoyama();
   // $tameshi = $dbmg->tameshi($_POST['mail'],$_POST['pass']);
    //$roguin = $dbmg->login($_POST['mail'],$_POST['pass']);
       // echo $tameshi ;
        //echo $roguin;
    $shinki = $dbmg->shinki($_POST['mail1'],$_POST['pass1']);
?>