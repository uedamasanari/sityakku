let mysyuppindata;
window.onload = function(){
    $.ajax({
        url: "../PHP/Ueda.php/?mysyuppin=true&user_id=1&timestamp=${new Date().getTime()}"
    })
    .success(function (res) {
        console.log(res);
        mysyuppindata = res;
        mysyuppin();
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
    });
}
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
const mysyuppin=()=>{
    //データを入れる
    let list = document.getElementById("history");
    for (let i = 0; i < mysyuppindata.length; i++) {
            let ele = document.createElement("p");
            ele.className = 'gazou';
            list.appendChild(ele);

            ele = document.createElement("img");
            ele.src = mysyuppindata[i].item_image;
            ele.width = "100";
            let tag = document.getElementsByClassName("gazou")[i];
            tag.appendChild(ele);
            
            ele = document.createElement("p");
            ele.className = 'furaito';
            ele.textContent = '商品名：'+mysyuppindata[i].item_name;
            list.appendChild(ele);

            ele = document.createElement("p");
            ele.className = 'kane';
            ele.textContent = '値段：￥'+mysyuppindata[i].item_money;
            list.appendChild(ele);

            ele = document.createElement("p");
            ele.className = 'elu';
            ele.textContent = 'サイズ：'+mysyuppindata[i].item_size;
            list.appendChild(ele);

            ele = document.createElement("button");
            ele.className="hensyu";
            ele.textContent="編集";
            ele.onclick = function () {
                change(i);
            };
            list.appendChild(ele);

            ele = document.createElement("button");
            ele.className="sakujyo";
            ele.textContent="削除";
            ele.onclick = function () {
                saku(i);
            };
            list.appendChild(ele);
    }
}
mysyuppindata.splice(i);
const change=()=>{
    
}