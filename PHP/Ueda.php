<?php
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
$ueda = new Ueda();
if(isset($_GET['sw'])==true){
    if($_GET['sw']==1){
        $ueda->loginfunk();
    }
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
}

    // class Ueda{
    //     //タグの絞り込みを判定する変数
    //     public $tagsw="";
    //     private function dbConnect(){
    //         $pdo=new PDO('mysql:host=localhost;dbname=csslabo;charset=utf8','ueda','!3qWaHSRi9Bse5m[');
    //         return $pdo;
    //     }
    //     //ホーム画面のタイムライン
    //     public function GetTimeline(){
    //         $pdo = $this->dbConnect();
    //         $sql = "SELECT * FROM css_tbl ORDER BY css_like DESC";
    //         $ps = $pdo->prepare($sql);
    //         $ps->execute();
    //         $this->tagsw="";//タグの絞り込みを無しにする
    //         return $ps;
    //     }
    //     public function GetUsername($id){
    //         $pdo = $this->dbConnect();
    //         $sql = "SELECT user_name FROM user_tbl WHERE user_id = $id";
    //         $ps = $pdo->prepare($sql);
    //         $ps->execute();
    //         return $ps;
    //     }
    //     //ホーム画面のいいね
    //     public function UpdateGood($id){
    //         $pdo = $this->dbConnect();
    //         $sql = "UPDATE css_tbl SET css_like = css_like + 1 WHERE css_id = ?";
    //         $ps = $pdo->prepare($sql);
    //         $ps->bindValue(1,$id,PDO::PARAM_INT);
    //         $ps->execute();
    //     }
    //     //ホーム画面のコメント
    //     public function GetComment($id){
    //         $pdo = $this->dbConnect();
    //         $sql = "SELECT comment FROM comment_tbl WHERE css_id = ?";
    //         $ps = $pdo->prepare($sql);
    //         $ps->bindValue(1,$id,PDO::PARAM_INT);
    //         $ps->execute();
    //         return $ps;
    //     }
    //     //ホーム画面の検索
    //     public function GetSearch($cssname){
    //         $pdo = $this->dbConnect();
    //         $sql = "SELECT * FROM css_tbl WHERE css_name LIKE ?";
    //         $ps = $pdo->prepare($sql);
    //         $ps->bindValue(1,'%'.$cssname.'%',PDO::PARAM_STR);
    //         $ps->execute();
    //         return $ps;
    //     }
    //     //ホーム画面の絞り込み
    //     public function GetTag($tag){
    //         $pdo = $this->dbConnect();
    //         $sql = "SELECT * FROM css_tbl WHERE css_tag = ? ORDER BY css_like DESC";
    //         $ps = $pdo->prepare($sql);
    //         $ps->bindValue(1,$tag,PDO::PARAM_STR);
    //         $ps->execute();
    //         return $ps;
    //     }
    //     //ホーム画面のいいね昇順
    //     public function GetAsc(){
    //         $pdo = $this->dbConnect();
    //         //タグの絞り込みがあるかどうか
    //         if($this->tagsw!=""){
    //             $sql = "SELECT * FROM css_tbl WHERE css_tag = ? ORDER BY css_like";
    //             $ps = $pdo->prepare($sql);
    //             $ps->bindValue(1,$this->tagsw,PDO::PARAM_STR);
    //         }else{
    //             $sql = "SELECT * FROM css_tbl ORDER BY css_like";
    //             $ps = $pdo->prepare($sql);
    //         }
    //         $ps->execute();
    //         return $ps;
    //     }
    //     //ホーム画面のいいね降順
    //     public function GetDesc(){
    //         $pdo = $this->dbConnect();
    //         if($this->tagsw!=""){
    //             $sql = "SELECT * FROM css_tbl WHERE css_tag = ? ORDER BY css_like DESC";
    //             $ps = $pdo->prepare($sql);
    //             $ps->bindValue(1,$this->tagsw,PDO::PARAM_STR);
    //         }else{
    //             $sql = "SELECT * FROM css_tbl ORDER BY css_like DESC";
    //             $ps = $pdo->prepare($sql);
    //         }
    //         $ps->execute();
    //         return $ps;
    //     }

    //     //ホーム画面のお気に入り
    //     public function InsertStar($cssid,$userid){
    //         $pdo = $this->dbConnect();
    //         $sql = "INSERT INTO bookmark_tbl (user_id,css_id) VALUES(?,?)";
    //         $ps = $pdo->prepare($sql);
    //         $ps->bindValue(1,$userid,PDO::PARAM_INT);
    //         $ps->bindValue(2,$cssid,PDO::PARAM_STR);
    //         $ps->execute();
    //     }

    //     //投稿画面の投稿
    //     public function InsertCss($id,$name,$img,$Hcode,$Ccode,$tag,$info){
    //         $pdo = $this->dbConnect();
    //         $sql = "INSERT INTO css_tbl (creater_id,css_name,css_img,css_Hcode,css_Ccode,css_tag,css_info,css_like) VALUES(?,?,?,?,?,?,?,0)";
    //         $ps = $pdo->prepare($sql);
    //         $ps->bindValue(1,$id,PDO::PARAM_INT);
    //         $ps->bindValue(2,$name,PDO::PARAM_STR);
    //         $ps->bindValue(3,$img,PDO::PARAM_STR);
    //         $ps->bindValue(4,$Hcode,PDO::PARAM_STR);
    //         $ps->bindValue(5,$Ccode,PDO::PARAM_STR);
    //         $ps->bindValue(6,$tag,PDO::PARAM_STR);
    //         $ps->bindValue(7,$info,PDO::PARAM_STR);
    //         $ps->execute();
    //     }
    // }
?>