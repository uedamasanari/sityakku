<?php
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
$itoyama = new Itoyama();

if(isset($_POST['mail'])){

    $itoyama->login($_POST['mail'],$_POST['pass']);//ログイン処理

}else if(isset($_GET['profile'])){

    $itoyama->prohenkou($_GET['user_id']);//プロフィール変更処理

}else if(isset($_POST['sin'])){

    $itoyama->pro($_POST['name'],$_POST['sin'],$_POST['tai'],$_POST['gen'],$_POST['buy'],$_POST['add'],$_POST['id']);//新規登録処理

}else if(isset($_GET['cart'])){

    $itoyama->cart($_GET['id']);//カートの中を全表示処理

}else if(isset($_GET['cartsakujo'])){

    $itoyama->cartsakujo($_GET['id'],$_GET['itemid']);//カートの中の削除する処理

}else if(isset($_GET['favo'])){

    $itoyama->okiniiri($_GET['favoid'],$_GET['id']);//カートの中のお気に入りへ追加する処理

}else if(isset($_GET['sakujyo'])){

    $itoyama->syuppinsakujo($_GET['sakujyo']);
    $json_array = json_encode("削除成功");
    print $json_array;
    
}else if(isset($_POST['shinkimail'])){

    $itoyama->shinki($_POST['shinkimail'],$_POST['shinkipass']);
}else if(isset($_GET['cartadd'])){
    $itoyama->carttuika($_GET['cartadd_user_id'],$_GET['cartadd']);

}else if(isset($_GET['cartallsaku'])){

    $itoyama->cart_allsaku($_GET['id']);

}else if(isset($_POST['address1'])){

    $itoyama->kessai($_POST['kid'],$_POST['buy'],$_POST['address1']);

}else if(isset($_POST['kid1'])){

    $itoyama->kessai_syousai1($_GET['kid1'],$_GET['iid1']);

}else if(isset($_POST['kid2'])){

    $itoyama->kessai_syousai2($_GET['kid2'],$_GET['iid1'],$_GET['iid2']);

}else if(isset($_POST['kid3'])){

    $itoyama->kessai_syousai3($_GET['kid3'],$_GET['iid1'],$_GET['iid2'],$_GET['iid3']);

}else if(isset($_POST['kid4'])){

    $itoyama->kessai_syousai4($_GET['kid4'],$_GET['iid1'],$_GET['iid2'],$_GET['iid3'],$_GET['iid4']);

}else if(isset($_POST['sa3'])){

    $itoyama->cart_saku3($_GET['kid3'],$_GET['iid1'],$_GET['iid2'],$_GET['iid3']);
}


    class Itoyama{
        private function dbConnect(){
            $pdo = new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','sityakku','sityakku');
            return $pdo;
        }

            //カートのお気に入り追加
            public function okiniiri($item,$id){
                $pdo = $this->dbConnect();
                $sql = "SELECT * FROM favorite WHERE user_id = ? AND item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->bindValue(2,$id,PDO::PARAM_INT);
                $ps->execute();
                foreach($ps->fetchAll() as $row){
                }
                if($ps-> rowCount() > 0){
                    $data = array();
                    array_push($data, array(
                        'state' => "error",
                        'message' => "既に登録されています"
                    ));
                    $json_array = json_encode($data);
                    print $json_array;
                }else{
                    $sql = "INSERT INTO favorite (user_id,item_id) VALUES(?,?)";
                    $ps = $pdo->prepare($sql);
                    $ps->bindValue(1,$id,PDO::PARAM_INT);
                    $ps->bindValue(2,$item,PDO::PARAM_INT);
                    $ps->execute();
                    $data = array();
                    array_push($data, array(
                        'state' => "success",
                        'message' => "お気に入りに登録しました！"
                    ));
                    $json_array = json_encode($data);
                    print $json_array;
                }

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
            public function cartsakujo($id,$itemid){
                $pdo = $this->dbConnect();
                $sql = "SELECT cart_id FROM cart WHERE user_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$id,PDO::PARAM_INT);
                $ps->execute();
                $sea1 = $ps->fetchAll();
                $sql2 = "DELETE FROM cart_detail WHERE cart_id = ? AND item_id = ?";
                $ps2 = $pdo->prepare($sql2);
                $ps2->bindValue(1,$sea1,PDO::PARAM_INT);
                $ps2->bindValue(2,$itemid,PDO::PARAM_INT);
                $ps2->execute();
                $sea2 = $ps2->fetchAll();
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
                $sql = "DELETE FROM cart_detail WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->execute();
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM favorite WHERE item_id = ?";
                $ps = $pdo->prepare($sql);
                $ps->bindValue(1,$item,PDO::PARAM_INT);
                $ps->execute();
                $pdo = $this->dbConnect();
                $sql = "DELETE FROM items WHERE item_id = ?";
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
                $sql1 = "SELECT * FROM users WHERE user_mail = ?";
                $ps = $pdo->prepare($sql1);
                $ps->bindValue(1,$mail,PDO::PARAM_STR);
                $ps->execute();
                $sele = $ps->fetchAll();
                $hai = array();
                if($sele == null){
                    $sql2 = "INSERT INTO users (user_mail,user_pass)VALUE(?,?)";
                    $ps = $pdo->prepare($sql2);
                    $ps->bindValue(1,$mail,PDO::PARAM_STR);
                    $ps->bindValue(2,$pass,PDO::PARAM_STR);
                    $ps->execute();  
                    array_push($hai,array(
                        'state'=>'成功'
                    ));
                }else{
                    array_push($hai,array(
                        'state'=>'失敗'
                    ));
                }
                $json_array = json_encode($hai);
                    print $json_array;
                
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

            //商品をカートに追加する処理
            function carttuika($userid,$itemid){
                $pdo = $this->dbConnect();
                $sql = "SELECT cart_id FROM cart WHERE user_id = ?";
                $ps = $pdo ->prepare($sql);
                $ps->bindValue(1,$userid,PDO::PARAM_INT);
                $ps->execute();
                $res = $ps->fetchAll();
                if($ps-> rowCount() > 0){
                    $sql = "SELECT cart_detail_id FROM cart_detail WHERE cart_id = ?";
                    $ps = $pdo ->prepare($sql);
                    $ps->bindValue(1,$res[0]['cart_id'],PDO::PARAM_INT);
                    $ps->execute();
                    if($ps-> rowCount() > 3){
                        $data = array();
                        array_push($data, array(
                            'state' => "error",
                            'message' => "申し訳ございません。１回に購入できる数量は４点までです。"
                        ));
                        $json_array = json_encode($data);
                        print $json_array;
                    }else{
                        $sql1 = "SELECT cart_id FROM cart WHERE user_id = ?";
                        $ps1 = $pdo ->prepare($sql1);
                        $ps1->bindValue(1,$userid,PDO::PARAM_INT);
                        $ps1->execute();
                        $dat = $ps1->fetchAll();
                        $sql2 = "INSERT INTO cart_detail(cart_id,item_id)VALUES(?,?)";
                        $ps2 = $pdo ->prepare($sql2);
                        $ps2->bindValue(1,$dat[0]['cart_id'],PDO::PARAM_INT);
                        $ps2->bindValue(2,$itemid,PDO::PARAM_INT);
                        $ps2->execute();
                        $data = array();
                        array_push($data, array(
                            'state' => "success",
                            'message' => "カートに追加しました"
                        ));
                        $json_array = json_encode($data);
                        print $json_array;
                    }
                }else{
                    $pdo = $this->dbConnect();
                    $sql = "INSERT INTO cart (user_id) VALUES(?)";
                    $ps = $pdo ->prepare($sql);
                    $ps->bindValue(1,$userid,PDO::PARAM_INT);
                    $ps->execute();
                    $sql1 = "SELECT cart_id FROM cart WHERE user_id = ?";
                    $ps1 = $pdo ->prepare($sql1);
                    $ps1->bindValue(1,$userid,PDO::PARAM_INT);
                    $ps1->execute();
                    $dat = $ps1->fetchAll();
                    $sql2 = "INSERT INTO cart_detail(cart_id,item_id)VALUES(?,?)";
                    $ps2 = $pdo ->prepare($sql2);
                    $ps2->bindValue(1,$dat[0]['cart_id'],PDO::PARAM_INT);
                    $ps2->bindValue(2,$itemid,PDO::PARAM_INT);
                    $ps2->execute();
                    $data = array();
                    array_push($data, array(
                        'state' => "success",
                        'message' => "カートに追加しました"
                    ));
                    $json_array = json_encode($data);
                    print $json_array;
                }
            }

            //カートの削除1
            function cart_saku1($id,$itemid1){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT cart_id FROM cart WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$id,PDO::PARAM_INT);
                $ps1->execute();
                $cartid = $ps1->fetchAll();
                $sql2 = "DELETE FROM cart_detail WHERE cart_id = ? AND item_id = ?";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$cartid,PDO::PARAM_INT);
                $ps2->bindValue(2,$itemid1,PDO::PARAM_INT);
                $ps2->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "カートを削除しました"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            //カートの削除2
            function cart_saku2($id){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT cart_id FROM cart WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$id,PDO::PARAM_INT);
                $ps1->execute();
                $cartid = $ps1->fetchAll();
                $sql2 = "DELETE FROM cart_detail WHERE cart_id = ?";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$cartid,PDO::PARAM_INT);
                $ps2->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "カートに追加しました"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            //カートの削除3
            function cart_saku3($id,$i1,$i2,$i3){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT cart_id FROM cart WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$id,PDO::PARAM_INT);
                $ps1->execute();
                $cartid = $ps1->fetchAll();
                $sql2 = "DELETE FROM cart_detail WHERE cart_id = ? AND item_id = ?";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$cartid,PDO::PARAM_INT);
                $ps2->bindValue(2,$i1,PDO::PARAM_INT);
                $ps2->execute();
                $sql3 = "DELETE FROM cart_detail WHERE cart_id = ? AND item_id = ?";
                $ps3 = $pdo ->prepare($sql3);
                $ps3->bindValue(1,$cartid,PDO::PARAM_INT);
                $ps3->bindValue(2,$i2,PDO::PARAM_INT);
                $ps3->execute();
                $sql4 = "DELETE FROM cart_detail WHERE cart_id = ? AND item_id = ?";
                $ps4 = $pdo ->prepare($sql4);
                $ps4->bindValue(1,$cartid,PDO::PARAM_INT);
                $ps4->bindValue(2,$i3,PDO::PARAM_INT);
                $ps4->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "カートを削除しました"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            //カートの削除4
            function cart_saku4($id){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT cart_id FROM cart WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$id,PDO::PARAM_INT);
                $ps1->execute();
                $cartid = $ps1->fetchAll();
                $sql2 = "DELETE FROM cart_detail WHERE cart_id = ?";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$cartid,PDO::PARAM_INT);
                $ps2->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "カートに追加しました"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            //決済に追加する処理
            function kessai($uid,$buy,$add,$time){
                $pdo = $this->dbConnect();
                    $sql2 = "INSERT INTO settlement(user_id,settlement_buy,settlement_address)VALUE(?,?,?)";
                    $ps2 = $pdo ->prepare($sql2);
                    $ps2->bindValue(1,$uid,PDO::PARAM_INT);
                    $ps2->bindValue(2,$buy,PDO::PARAM_STR);
                    $ps2->bindValue(3,$add,PDO::PARAM_STR);
                    //$ps2->bindValue(4,$time,PDO::PARAM_STR);

                    $ps2->execute();
                    $data = array();
                    array_push($data, array(
                        'message' => "決済追加完了"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            function kessai_syousai1($kid,$i1){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT settlement_id FROM settlement WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$kid,PDO::PARAM_INT);
                $ps1->execute();
                $keid = $ps1->fetchAll();
                $sql2 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$keid,PDO::PARAM_INT);
                $ps2->bindValue(2,$i1,PDO::PARAM_INT);
                $ps2->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "決済詳細追加完了1"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            function kessai_syousai2($kid,$i1,$i2){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT settlement_id FROM settlement WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$kid,PDO::PARAM_INT);
                $ps1->execute();
                $keid = $ps1->fetchAll();
                $sql2 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$keid,PDO::PARAM_INT);
                $ps2->bindValue(2,$i1,PDO::PARAM_INT);
                $ps2->execute();
                $sql3 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps3 = $pdo ->prepare($sql3);
                $ps3->bindValue(1,$keid,PDO::PARAM_INT);
                $ps3->bindValue(2,$i2,PDO::PARAM_INT);
                $ps3->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "決済詳細追加完了1"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            function kessai_syousai3($kid,$i1,$i2,$i3){
                    $pdo = $this->dbConnect();

                     $sql = "SELECT settlement_id FROM settlement WHERE user_id = ?";
                     $ps = $pdo->prepare($sql);
                     $ps->bindValue(1,$kid,PDO::PARAM_INT);
                     $ps->execute();
                     $uid = $ps->fecthAll();

                    $tui1 = "INSERT INTO settlement_detail (settlement_id,item_id)VALUE(?,?)";
                    $ps1 = $pdo->prepare($tui1);
                    $ps1->bindValue(1,$uid,PDO::PARAM_INT);
                    $ps1->bindValue(2,$i1,PDO::PARAM_INT);
                    $ps1->execute();

                    $tui2 = "INSERT INTO settlement_detail (settlement_id,item_id)VALUE(?,?)";
                    $ps2 = $pdo->prepare($tui2);
                    $ps2->bindValue(1,$uid,PDO::PARAM_INT);
                    $ps2->bindValue(2,$i2,PDO::PARAM_INT);
                    $ps2->execute();

                    $tui3 = "INSERT INTO settlement_detail (settlement_id,item_id)VALUE(?,?)";
                    $ps3 = $pdo->prepare($tui3);
                    $ps3->bindValue(1,$uid,PDO::PARAM_INT);
                    $ps3->bindValue(2,$i3,PDO::PARAM_INT);
                    $ps3->execute();
                

                //$sql1 = "SELECT settlement_id FROM settlement_detail WHERE settlement_id IN(SELECT settlement_id FROM settlement WHERE user_id = ?)";
                // $ps1 = $pdo ->prepare($sql1);
                // $ps1->bindValue(1,$kid,PDO::PARAM_INT);
                // $ps1->execute();
                // $keid = $ps1->fetchAll();
                // if($keid == null){
                //     $tui = "INSERT INTO settlement_detail SELECT settlement_id FROM settlement WHERE user_id = ?";
                //     $ps22 = $pdo ->prepare($tui);
                //     $ps22->bindValue(1,$kid,PDO::PARAM_INT);
                //     $ps22->execute();
                // }
                // $sql2 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                // $ps2 = $pdo ->prepare($sql2);
                // $ps2->bindValue(1,$row,PDO::PARAM_INT);
                // $ps2->bindValue(2,$i1,PDO::PARAM_INT);
                // $ps2->execute();
                
                // $sql3 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                // $ps3 = $pdo ->prepare($sql3);
                // $ps3->bindValue(1,$keid,PDO::PARAM_INT);
                // $ps3->bindValue(2,$i2,PDO::PARAM_INT);
                // $ps3->execute();
                // $sql4 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                // $ps4 = $pdo ->prepare($sql4);
                // $ps4->bindValue(1,$keid,PDO::PARAM_INT);
                // $ps4->bindValue(2,$i3,PDO::PARAM_INT);
                // $ps4->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "決済詳細追加完了1"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

            function kessai_syousai4($kid,$i1,$i2,$i3,$i4){
                $pdo = $this->dbConnect();
                $sql1 = "SELECT settlement_id FROM settlement WHERE user_id = ?";
                $ps1 = $pdo ->prepare($sql1);
                $ps1->bindValue(1,$kid,PDO::PARAM_INT);
                $ps1->execute();
                $keid = $ps1->fetchAll();
                $sql2 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps2 = $pdo ->prepare($sql2);
                $ps2->bindValue(1,$keid,PDO::PARAM_INT);
                $ps2->bindValue(2,$i1,PDO::PARAM_INT);
                $ps2->execute();
                $sql3 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps3 = $pdo ->prepare($sql3);
                $ps3->bindValue(1,$keid,PDO::PARAM_INT);
                $ps3->bindValue(2,$i2,PDO::PARAM_INT);
                $ps3->execute();
                $sql4 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps4 = $pdo ->prepare($sql4);
                $ps4->bindValue(1,$keid,PDO::PARAM_INT);
                $ps4->bindValue(2,$i3,PDO::PARAM_INT);
                $ps4->execute();
                $sql5 = "INSERT INTO settlement_detail(settlement_id,item_id) VALUES(?,?)";
                $ps5 = $pdo ->prepare($sql5);
                $ps5->bindValue(1,$keid,PDO::PARAM_INT);
                $ps5->bindValue(2,$i4,PDO::PARAM_INT);
                $ps5->execute();
                $data = array();
                    array_push($data, array(
                        'message' => "決済詳細追加完了1"
                    ));
                $json_array = json_encode($data);
                print $json_array;
            }

         }
?>