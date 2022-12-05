let mysyuppindata;
let Hsw = 0;
let now;
window.onload = function () {
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

function mein1() {
    document.getElementById("history").style.display = "none";
    document.getElementById("none").style.display = "block";
    Hsw = 0;
}

function mein2() {
    document.getElementById("history").style.display = "block";
    document.getElementById("none").style.display = "none";
}

function change() {
    document.getElementById("history").style.display = "none";
    document.getElementById("none").style.display = "block";
}

function syuppin() {
    const formElements = document.forms['postshouhin'];
    //↓base64(画像を文字へ変換)
    const uploadImage = document.querySelector('#image')
    const file = uploadImage.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
        imagetxt = event.currentTarget.result;
        //↓ajaxでPHPと通信
        if (Hsw == 0) {
            //ajaxでPHPに送信するための配列作成
            let data = {
                a: formElements.elements['syouhin'].value,
                b: formElements.elements['kategori'].value,
                c: formElements.elements['bunrui'].value,
                d: formElements.elements['size'].value,
                e: formElements.elements['nedan'].value,
                f: formElements.elements['tokucyou'].value,
                g: imagetxt
            }
            $.ajax({
                    type: "post", //送信の通信だと定義
                    url: "../PHP/Ueda.php?Hsw=true", //送信先のリンク
                    data: data, //送信するデータを定義
                })
                .success(function (data) {
                    //通信に成功
                    console.log(data);
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    //通信に失敗
                    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                    console.log("textStatus     : " + textStatus);
                    console.log("errorThrown    : " + errorThrown.message);
                });
        } else if (Hsw == 1) {
            let data = {
                A: formElements.elements['syouhin'].value,
                b: formElements.elements['kategori'].value,
                c: formElements.elements['bunrui'].value,
                d: formElements.elements['size'].value,
                e: formElements.elements['nedan'].value,
                f: formElements.elements['tokucyou'].value,
                g: imagetxt
            }
            //↓ajaxでPHPと通信
            $.ajax({
                    type: "post", //送信の通信だと定義
                    url: "../PHP/Ueda.php", //送信先のリンク
                    data: data, //送信するデータを定義
                })
                .success(function (data) {
                    //通信に成功
                    console.log(data);
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    //通信に失敗
                    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                    console.log("textStatus     : " + textStatus);
                    console.log("errorThrown    : " + errorThrown.message);
                    //PHPのエラーではなくDBのエラーをどうするか
                });
        }
    }
    reader.readAsDataURL(file);
    //↑base64終了
}

function sakujyo(a) {

    $.ajax({
            url: `PHP/itoyama.php/?sakujyo=${a}&timestamp=${new Date().getTime()}`
        })
        .success(function (message) {
            alert(message);
            mysyuppindata.splice(a);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest : " + XMLHttpRequest.status);
            console.log("textStatus     : " + textStatus);
            console.log("errorThrown    : " + errorThrown.message);
        });
}
const mysyuppin = () => {
    //データを入れる
    let list = document.getElementById("history");
    for (let i = 0; i < mysyuppindata.length; i++) {
        let ele = document.createElement("div");
        ele.id = 'nana';
        list.appendChild(ele);
        let nana = document.getElementById("nana");

        ele = document.createElement("div");
        ele.className = 'hrap';
        nana.appendChild(ele);
        hrap = document.getElementsByClassName("hrap")[i];

        ele = document.createElement("p");
        ele.className = 'gazou';
        hrap.appendChild(ele);

        ele = document.createElement("img");
        ele.src = mysyuppindata[i].item_image;
        ele.width = "100";
        let tag = document.getElementsByClassName("gazou")[i];
        tag.appendChild(ele);

        ele = document.createElement("p");
        ele.className = 'furaito';
        ele.textContent = '商品名：' + mysyuppindata[i].item_name;
        hrap.appendChild(ele);

        ele = document.createElement("p");
        ele.className = 'kane';
        ele.textContent = '値段：￥' + mysyuppindata[i].item_money;
        hrap.appendChild(ele);

        ele = document.createElement("p");
        ele.className = 'elu';
        ele.textContent = 'サイズ：' + mysyuppindata[i].item_size;
        hrap.appendChild(ele);

        ele = document.createElement("button");
        ele.className = "hensyu";
        ele.textContent = "編集";
        ele.onclick = function () {
            changedata(i);
        };
        hrap.appendChild(ele);

        ele = document.createElement("button");
        ele.className = "sakujyo";
        ele.textContent = "削除";
        ele.onclick = function () {
            sakujyo(i);
        };
        hrap.appendChild(ele);
    }
}

const changedata = (a) => {
    document.getElementById("syouhin").value = mysyuppindata[a].item_name;
    document.getElementById("bun").value = mysyuppindata[a].item_class;
    document.getElementById("ka").value = mysyuppindata[a].category_id;
    document.getElementById("sa").value = mysyuppindata[a].item_size;
    document.getElementById("ne").value = mysyuppindata[a].item_money;
    document.getElementById("to").value = mysyuppindata[a].item_feature;

    document.getElementById("history").style.display = "none";
    document.getElementById("none").style.display = "block";
    Hsw = 1;
    now = a;
    console.log(Hsw+" "+now);
}