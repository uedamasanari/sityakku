<?php

    require 'PHP/itoyama.php';

    $dbmg = new Itoyama();
    if(isset($_POST['mail'])){
        login();
    }else if(isset($_POST['mail1'])){
        newtoroku();
    }
    function login(){
        $dbmg = new Itoyama();
        $tameshi = $dbmg->tameshi($_POST['mail'],$_POST['pass']);
        $roguin = $dbmg->login($_POST['mail'],$_POST['pass']);
        echo $tameshi ;
        echo $roguin;
    }
    function newtoroku(){
        $dbmg = new Itoyama();
        $shinki = $dbmg->shinki($_POST['mail1'],$_POST['pass1']);
    }

    function okiniiri(){
        $dbmg = new Itoyama();
        $favorite = $dbmg->okiniiri();
    }
    
?>