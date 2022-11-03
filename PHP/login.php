<?php

    session_start();
    require 'itoyama.php';
    
    if(isset($_SESSION['user'])==true){

        header('Location:../home.html');

    }else{
        login();
    }

    function login(){
        $dbmg = new Itoyama();
        $dbmg->login($_POST['mail'],$_POST['pass']);
        //$tameshi = $dbmg->tameshi($_POST['mail'],$_POST['pass']);
        //echo $tameshi ;
    }
    
?>