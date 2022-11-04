let reslogin={};
let resyoufuku={};

function hyouji(){
    axios             //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
    .get("http://localhost/Web/sityakku/PHP/Ueda.php/?login=true&timestamp=${new Date().getTime()}")
    .then((response) => {
        reslogin=response.data;
        console.log(reslogin);
    })
    .catch((error) => console.log(error));
}
function youfuku(){
    axios             //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
    .get("http://localhost/Web/sityakku/PHP/Ueda.php/?youfuku=true&timestamp=${new Date().getTime()}")
    .then((response) => {
        resyoufuku=response.data;
        console.log(resyoufuku);
    })
    .catch((error) => console.log(error));
}
function syuppin(){
    const formElements = document.forms['postshouhin'];
    let syouhin = formElements.elements['syouhin'].value;
    let bunrui = formElements.elements['example1'].value; 
    let kategori = formElements.elements['example2'].value; 
    let size = formElements.elements['example3'].value; 
    let nedan = formElements.elements['nedan'].value; 
    let tokutyou = formElements.elements['tokucyou'].value;
    
}