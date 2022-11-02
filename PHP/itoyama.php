<?php
    class Itoyama{
        private function dbConnect(){
            $pdo = new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','kanako','2101003');
            return $pdo;
        }

        // if(isset($_SESSION['mail'])==true &&isset($_SESSION['pass']) == true){

        //     header('Location:');
    
        // }

        public function tameshi($mail,$pass){
            $pdo = $this->dbConnect();
            $sql = "SELECT * FROM users WHERE user_mail = ? AND user_pass = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1,$mail,PDO::PARAM_STR);
            $ps->bindValue(2,$pass,PDO::PARAM_STR);
            $ps->execute();
            $result = $ps->fetchAll();
            if($result == null){
                return $hyouzi =  "一致しません。";
            }else{
                foreach($result as $row){
                        return $hyouzi =  $row['user_id'];
                }
            }
        }
        //ログイン
        public function login($mail,$pass){
            $pdo=$this->dbConnect();
            $sql = "SELECT * FROM users WHERE user_mail = ? AND user_pass = ?";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1,$mail,PDO::PARAM_STR);
            $ps->bindValue(2,$pass,PDO::PARAM_STR);
            $data = $ps->execute();
            if($data == null){
                return $hyouzi = "メールアドレスまたはパスワードが一致しません";
            }else{
                    return $hyouzi = "ログイン成功";
            }
        }

        //新規登録
        public function shinki($mail,$pass){
            $pdo=$this->dbConnect();
            $sql = "INSERT INTO users (user_mail,user_pass)VALUE(?,?)";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1,$mail,PDO::PARAM_STR);
            $ps->bindValue(2,$pass,PDO::PARAM_STR);
            $ps->execute();
            
        }

        //お気に入り
        public function okiniiri($item,$user){
            $pdo = $this->dbConnect();
            $sql = "INSERT INTO favorite (item_id,user_id) VALUES(?,?)";
            $ps = $pdo->prepare($sql);
            $ps->bindValue(1,$item,PDO::PARAM_INT);
            $ps->bindValue(2,$user,PDO::PARAM_INT);
            $ps->execute();
        }

        //商品取り消し
        public function sakujo(){
            $pdo = $this->dbConnect();
            $sql = "DELETE FROM ";
        }
    }
?>