//変更ボタンがクリックされたときの処理
// let henbtn = document.getElementById('henkoubtn');
// henbtn.addEventListener('click',function(){
    function henkou(){

    //↓性別の値を取得
    let elements = document.getElementsByName('sei');
    let len = elements.length;
    let checkValue = '';

    for (let i = 0; i < len; i++){
        if (elements.item(i).checked){
            checkValue = elements.item(i).value;
        }
    }   

    //↓セレクトボックスの値を取得
    const sele1 = document.form1.select1;
    const num = sele1.selectedIndex;//値(数値)を取得
    const str = sele1.options[num].value;// 値(数値)から値(value値)を取得

    //↓　ajaxでPHPに送信するための配列作成
    let data = {
        id:sessionStorage.getItem('id'),
        name:document.getElementById('user_name1').value,
        sin:document.getElementById('user_sintyou1').value,
        tai:document.getElementById('user_taiju1').value,
        gen:checkValue,
        buy:str,
        add:document.getElementById('user_jusyo1').value,
    }

    //↓ajaxでPHPと通信
    $.ajax({
        type: "post",   //送信の通信だと定義
        url: "PHP/itoyama.php",    //送信先のリンク
        data: data,     //送信するデータを定義
    })

    .success(function(res) {
        console.log(res);
        location.href = 'home.html';
        alert("プロフィール変更完了");
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}