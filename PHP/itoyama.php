<?php
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
$itoyama = new Itoyama();

if(isset($_POST['mail'])){

    $itoyama->login($_POST['mail'],$_POST['pass']);

}else if(isset($_GET['profile'])){

    $itoyama->prohenkou($_GET['user_id']);

}else if(isset($_GET['pro']){

    $itoyama->pro($_GET['user_id']);

})


    class Itoyama{
        private function dbConnect(){
            $pdo = new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','sityakku','sityakku');
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
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->execute();
            }
            //カート商品取り消し
            public function cartsakujo($item){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM cart_detail WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->execute();
            }
            //出品商品取り消し
            public function syuppinsakujo($item){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM settlement_detail WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->execute();
            }

            //ログイン
            public function login($mail,$pass){
                $pdo=$this->dbConnect();
                $sql = "SELECT * FROM users WHERE user_mail = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$mail,PDO::PARAM_STR);
                //$ps->bindValue(2,$pass,PDO::PARAM_STR);
                $ps->execute();
                $data = $ps->fetchAll();
                $dataarray=array();
                    foreach($data as $row){
                        if($pass == $row['user_pass']){
                            array_push($dataarray,array(
                                'state' => '成功',
                                'user_id' => $row['user_id']
                            ));
                        }else{
                            array_push($dataarray,array(
                                'state' => '失敗',
                                'er' => 1
                            ));
                        }
                    }
                    if(count($data)==0){
                        array_push($dataarray,array(
                            'state' => '失敗',
                            'er' => 2
                        ));
                    }
                    $json_array = json_encode($dataarray);
                    print $json_array;
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

            //プロフィール情報
            public function prohenkou($id1){
                $pdo = $this->dbConnect();
                $sql = "SELECT * FROM users WHERE user_id = ?";
                $ps = $pdo ->prepare($sql);
                $ps->bindValue(1,$id1,PDO::PARAM_INT);
                $ps->execute();
                $sea = $ps->fetchAll();
                $data = array();
                foreach ($sea as $row) {
                    array_push($data, array(
                        'user_name' => $row['user_name'],
                        'user_height' => $row['user_height'],
                        'user_weight' => $row['user_weight'],
                        'user_gender' => $row['user_gender'],
                        'user_buy' => $row['user_buy'],
                        'user_address' => $row['user_address']
                    ));
                }
                $json_array = json_encode($data);
                print $json_array;
            }

            //プロフィールアップデート
            public function pro($id,$name,$hei,$wei,$gen,$buy,$add){
                $pdo = $this->dbConnect();
                $sql = "UPDATE";
            }

         }
?>