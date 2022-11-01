let results={};
window.onload = function(){
    axios             //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
    .get("http://localhost/Web/sityakku/PHP/Ueda.php/?sw=1&timestamp=${new Date().getTime()}")
    .then((response) => (results = response.data))
    .catch((error) => console.log(error));
}
function hyouji(){
    console.log(results);
}