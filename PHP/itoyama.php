<?php
    class itoyama{
        private function dbConnect(){
            $pdo = new PDO('mysql:host=localhost;dbname=webdb;charset=utf8','webuser','abccsd2');
            return $pdo;
        }

        public function putuser($mail,$name,$pass,$juu){
            $pdo=$this->dbConnect();
            $sql = "INSERT INTO user_mst(user_mail,user_name,user_password,user_address)VALUES(?,?,?,?)";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1,$_POST['mail'],PDO::PARAM_STR);
            $ps->bindValue(2,$_POST['mei'],PDO::PARAM_STR);
            $ps->bindValue(3,password_hash($_POST['pass'],PASSWORD_DEFAULT),PDO::PARAM_STR);
            $ps->bindValue(4,$_POST['juusyo'],PDO::PARAM_STR);
            $ps->execute();
        }

        public function loginhandan($mail,$pass){
            $pdo=$this->dbConnect();
            $sql = "SELECT * FROM user_mst WHERE user_mail = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1,$mail,PDO::PARAM_STR);
            $ps->execute();
            $data = $ps->fetchAll();

            if($data == false){
                return $hyouzi = "<h2>メールアドレスまたはパスワードが違います。</h2>";
            }

            foreach($data as $row){
                if($row['user_mail'] == $_POST['mail']){
                    if(password_verify($pass,$row['user_password']) == true){
                            return $hyouzi= "<h2>ログイン成功！ようこそ".$row['user_name']."さん!</h2>";
                        }
                }
            }
        }
    }
?>