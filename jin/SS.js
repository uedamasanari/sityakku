function mein1(){
    document.getElementById("history").style.display ="none";
    document.getElementById("none").style.display ="block";
}
function mein2(){
    document.getElementById("history").style.display ="block";
    document.getElementById("none").style.display ="none";
}
function change(){
    document.getElementById("history").style.display ="none";
    document.getElementById("none").style.display ="block";
}
function syuppin(){
const formElements = document.forms['postshouhin'];
//↓base64(画像を文字へ変換)
const uploadImage = document.querySelector('#image')
const file = uploadImage.files[0]
const reader = new FileReader()
reader.onload = (event) => {
    imagetxt = event.currentTarget.result;
    
    //ajaxでPHPに送信するための配列作成
    let data = {
        a:formElements.elements['syouhin'].value,
        b:formElements.elements['kategori'].value,
        c:formElements.elements['bunrui'].value ,
        d:formElements.elements['size'].value ,
        e:formElements.elements['nedan'].value ,
        f:formElements.elements['tokucyou'].value,
        g:imagetxt
    }
    //↓ajaxでPHPと通信
    $.ajax({
        type: "post",   //送信の通信だと定義
        url: "../PHP/Ueda.php",    //送信先のリンク
        data: data,     //送信するデータを定義
    })
    .success(function(data) {
        //通信に成功
        console.log(data);
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        //通信に失敗
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
reader.readAsDataURL(file);
//↑base64終了
}
function sakujyo() {

    $.ajax({
            url: "PHP/itoyama.php/?sakujyo=13&timestamp=${new Date().getTime()}"
        })
        .success(function (message) {
            alert(message);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });
}