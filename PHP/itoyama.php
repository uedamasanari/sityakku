<?php
    class Itoyama{
        private function dbConnect(){
            $pdo = new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','kanako','2101003');
            return $pdo;
        }

            //お気に入り
            public function okiniiri($item){
                $pdo = $this->dbConnect();
                $sql = "INSERT INTO favorite (item_id,user_id) VALUES(?,?)";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->bindValue(2,$_SESSION['user'],PDO::PARAM_INT);
                $ps->execute();
            }

            //お気に入り商品取り消し  itemをゲットする場所はどこから？？
            public function favoritesakujo($item){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM favorite WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,POD::PARAM_INT);
                $ps->execute();
            }
            //カート商品取り消し
            public function cartsakujo($item){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM cart_detail WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,POD::PARAM_INT);
                $ps->execute();
            }
            //出品商品取り消し
            public function syuppinsakujo($item){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM settlement_detail WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,POD::PARAM_INT);
                $ps->execute();
            }

            //ログイン
            public function login($mail,$pass){
                $pdo=$this->dbConnect();
                $sql = "SELECT * FROM users WHERE user_mail = ? AND user_pass = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$mail,PDO::PARAM_STR);
                $ps->bindValue(2,$pass,PDO::PARAM_STR);
                $ps->execute();
                $data = $ps->fetchAll();
                    foreach($data as $row){
                        $_SESSION['user'] =$row['user_id'];
                        header("Location:../home.html");
                    }
                    if(count($data)==0){
                        header("Location:../toroku.html");
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

            //支払い方法作成
            public function shiharai(){
                $pdo = $this->dbConnect();
                $sql = "SELECT * FROM users WHERE user_id = ?";
                $ps = $pdo ->prepare($sql);
                $ps->bindValue(1,$_SESSION['user'],PDO::PARAM_INT);
                $ps->execute();
                return $ps;
            }

            //プロフィール編集
            public function prohenkou(){
                $pdo = $this->dbConnect();
                $sql = "SELECT * FROM users WHERE user_id = ?";
                $ps = $pdo -> prepare($sql);
                $ps->bindValue(1,$_SESSION['user'],PDO::PARAM_INT);
                $ps->execute();
                return $ps;
            }

         }
?>