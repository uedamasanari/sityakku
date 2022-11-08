
<?php
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
$ueda = new Ueda();
if(isset($_GET['login'])){
    $ueda->loginfunk();
}else if(isset($_GET['youfuku'])){
    $ueda->SelectYoufuku();
}else if(isset($_POST['a'])){
    $ueda->InsertSyohin(1,$_POST['b'],$_POST['a'],$_POST['c'],$_POST['d'],$_POST['e'],$_POST['f'],$_POST['g'],$_POST['g'],date('Y-m-d H:i:s',strtotime("now")));
    $json_array = json_encode("送信完了しました！");
    print $json_array;
}else if(isset($_GET['mysyuppin'])){
    $ueda->SelectMysyuppin($_GET['user_id']);
}else if(isset($_POST['A'])){
    $ueda->UpdataSyohin($_POST['b'],$_POST['A'],$_POST['c'],$_POST['d'],$_POST['e'],$_POST['f'],$_POST['g'],$_POST['g'],date('Y-m-d H:i:s',strtotime("now")),13);
    $json_array = json_encode("送信完了しました！");
    echo $json_array;
}

class Ueda{
    private function dbConnect(){
        $pdo=new PDO('mysql:host=localhost;dbname=sityakku;charset=utf8','ueda','!3qWaHSRi9Bse5m[');
        return $pdo;
    }
    function loginfunk(){
    //データベースからユーザ情報を取得
        $pdo = $this->dbConnect();
        $sql = 'SELECT user_name FROM users';
        $ps = $pdo->prepare($sql);
        $ps->execute();
        $search = $ps->fetchAll();

        $data = array();

        foreach ($search as $row) {
            array_push($data, array('username' => $row['user_name']));
        }
        $json_array = json_encode($data);
        print $json_array;
    }
    function SelectYoufuku(){
        $pdo = $this->dbConnect();
        $sql = 'SELECT * FROM items';
        $ps = $pdo->prepare($sql);
        $ps->execute();
        $search = $ps->fetchAll();

        $data = array();

        foreach ($search as $row) {
            array_push($data, array(
                'item_id' => $row['item_id'],
                'user_id' => $row['user_id'],
                'category_id' => $row['category_id'],
                'item_name' => $row['item_name'],
                'item_class' => $row['item_class'],
                'item_size' => $row['item_size'],
                'item_money' => $row['item_money'],
                'item_feature' => $row['item_feature'],
                'item_image' => $row['item_image'],
                'item_fitting' => $row['item_fitting'],
                'item_time' => $row['item_time']
            ));
        }
        $json_array = json_encode($data);
        print $json_array;
    }
    public function InsertSyohin($user_id,$category_id,$item_name,$item_class,$item_size,$item_money,$item_feature,$item_image,$item_fitting,$item_tiem){
        $pdo = $this->dbConnect();
        $sql = "INSERT INTO items (user_id,category_id,item_name,item_class,item_size,item_money,item_feature,item_image,item_fitting,item_time) VALUES(?,?,?,?,?,?,?,?,?,?)";
        $ps = $pdo->prepare($sql);
        $ps->bindValue(1,$user_id,PDO::PARAM_INT);
        $ps->bindValue(2,$category_id,PDO::PARAM_INT);
        $ps->bindValue(3,$item_name,PDO::PARAM_STR);
        $ps->bindValue(4,$item_class,PDO::PARAM_STR);
        $ps->bindValue(5,$item_size,PDO::PARAM_STR);
        $ps->bindValue(6,$item_money,PDO::PARAM_INT);
        $ps->bindValue(7,$item_feature,PDO::PARAM_STR);
        $ps->bindValue(8,$item_image,PDO::PARAM_STR);
        $ps->bindValue(9,$item_fitting,PDO::PARAM_STR);
        $ps->bindValue(10,$item_tiem,PDO::PARAM_STR);
        $ps->execute();
        
    }
    function SelectMysyuppin($user_id){
        $pdo = $this->dbConnect();
        $sql = 'SELECT * FROM items WHERE user_id=?';
        $ps = $pdo->prepare($sql);
        $ps->bindValue(1,$user_id,PDO::PARAM_INT);
        $ps->execute();
        $search = $ps->fetchAll();

        $data = array();

        foreach ($search as $row) {
            array_push($data, array(
                'item_id' => $row['item_id'],
                'user_id' => $row['user_id'],
                'category_id' => $row['category_id'],
                'item_name' => $row['item_name'],
                'item_class' => $row['item_class'],
                'item_size' => $row['item_size'],
                'item_money' => $row['item_money'],
                'item_feature' => $row['item_feature'],
                'item_image' => $row['item_image'],
                'item_fitting' => $row['item_fitting'],
                'item_time' => $row['item_time']
            ));
        }
        $json_array = json_encode($data);
        print $json_array;
    }
    public function UpdataSyohin($category_id,$item_name,$item_class,$item_size,$item_money,$item_feature,$item_image,$item_fitting,$item_tiem,$item_id){
        $pdo = $this->dbConnect();
        $sql = "UPDATE items SET category_id=?,item_name=?,item_class=?,item_size=?,item_money=?,item_feature=?,item_image=?,item_fitting=?,item_time=? WHERE item_id = ?";
        $ps = $pdo->prepare($sql);
        $ps->bindValue(1,$category_id,PDO::PARAM_INT);
        $ps->bindValue(2,$item_name,PDO::PARAM_STR);
        $ps->bindValue(3,$item_class,PDO::PARAM_STR);
        $ps->bindValue(4,$item_size,PDO::PARAM_STR);
        $ps->bindValue(5,$item_money,PDO::PARAM_INT);
        $ps->bindValue(6,$item_feature,PDO::PARAM_STR);
        $ps->bindValue(7,$item_image,PDO::PARAM_STR);
        $ps->bindValue(8,$item_fitting,PDO::PARAM_STR);
        $ps->bindValue(9,$item_tiem,PDO::PARAM_STR);
        $ps->bindValue(10,$item_id,PDO::PARAM_INT);
        $ps->execute();
        
    }
}