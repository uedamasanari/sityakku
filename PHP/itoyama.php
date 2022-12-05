<?php
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
$itoyama = new Itoyama();

if(isset($_POST['mail'])){

    $itoyama->login($_POST['mail'],$_POST['pass']);

}else if(isset($_GET['profile'])){

    $itoyama->prohenkou($_GET['user_id']);

}else if(isset($_POST['sin'])){

    $itoyama->pro($_POST['name'],$_POST['sin'],$_POST['tai'],$_POST['gen'],$_POST['buy'],$_POST['add'],$_POST['id']);

}else if(isset($_GET['cart'])){

    $itoyama->cart($_GET['id']);

}else if(isset($_GET['cartsakujo'])){

    $itoyama->cartsakujo($_GET['id'].$_GET['itemid']);

}else if(isset($_GET['favo'])){

    $itoyama->okiniiri($_get['id'],$_GET['itemid']);
}


    class Itoyama{
        private function dbConnect(){
            $pdo = new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','sityakku','sityakku');
            return $pdo;
        }

            //カートのお気に入り追加
            public function okiniiri($id,$item){
                $pdo = $this->dbConnect();
                $sql = "INSERT INTO favorite (user_id,item_id) VALUES(?,?)";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$id,PDO::PARAM_INT);
                $ps->bindValue(2,$item,PDO::PARAM_INT);
                $ps->execute();

            }

            //お気に入り商品取り消し  itemをゲットする場所はどこから？？
            public function favoritesakujo($id,$item){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM favorite WHERE user_id = ? AND  item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$id,PDO::PARAM_INT);
                $ps->bindValue(2,$item,PDO::PARAM_INT);
                $ps->execute();
                $data = array();
                    array_push($data, array(
                        'state' => "成功"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }
            
            //カート商品取り消し
            public function cartsakujo($itemid){
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM cart_detail WHERE item_id =?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$itemid,PDO::PARAM_INT);
                $ps->execute();
                $sea = $ps->fetchAll();
                $data = array();
                    array_push($data, array(
                        'state' => "成功"
                    ));

                
                $json_array = json_encode($data);
                print $json_array;
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
            public function pro($name,$hei,$wei,$gen,$buy,$add,$id){
                $pdo = $this->dbConnect();
                $sql = "UPDATE users SET user_name = ?,user_height = ?,user_weight = ?,user_gender = ?,user_buy = ?,user_address = ? WHERE user_id = ?";
                $ps = $pdo -> prepare($sql);//sqlまではphpで成功確認済み
                $ps->bindValue(1,$name,PDO::PARAM_STR);
                $ps->bindValue(2,$hei,PDO::PARAM_INT);
                $ps->bindValue(3,$wei,PDO::PARAM_INT);
                $ps->bindValue(4,$gen,PDO::PARAM_STR);
                $ps->bindValue(5,$buy,PDO::PARAM_STR);
                $ps->bindValue(6,$add,PDO::PARAM_STR);
                $ps->bindValue(7,$id,PDO::PARAM_INT);
                $ps->execute();
                $sea = $ps->fetchAll();
                $data = array();
                array_push($data,array(
                    'state' =>'成功'
                ));
                
                
                $json_array = json_encode($data);
                print $json_array;
            }

            //カート表示
            public function cart($id){
                $pdo = $this->dbConnect();
                $sql = "SELECT * FROM items WHERE item_id IN(SELECT item_id FROM cart_detail WHERE cart_id IN  (SELECT cart_id FROM cart WHERE user_id = ?))";
                $ps = $pdo -> prepare($sql);
                $ps->bindValue(1,$id,PDO::PARAM_INT);
                $ps->execute();
                $search = $ps->fetchAll();
                $data = array();
                foreach ($search as $row) {
                    array_push($data, array(
                        'item_id' => $row['item_id'],
                        'user_id' => $row['user_id'],
                        'item_name' => $row['item_name'],
                        'item_money' => $row['item_money'],
                        'item_image' => $row['item_image']
                    ));
                }
                $json_array = json_encode($data);
                print $json_array;
            }

         }
?>