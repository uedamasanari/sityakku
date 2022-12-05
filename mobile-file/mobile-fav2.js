
function senia(){
window.setTimeout( seni,800 );
function seni(){
    location = 'mobile-home.html';
}
}

function senib(){
    window.setTimeout( senii,800 );
    function senii(){
        location = 'mobile-fav.html';
    }
    }

    function senic(){
        window.setTimeout( senii,800 );
        function senii(){
            location = 'mobile-profile.html';
        }
        }


function Readfunc1(){
    var obj = document.getElementById("readonly1");
    if(obj.readOnly == true){
      obj.readOnly = false; 
    }else{
      obj.readOnly = true; 
    }
  }
  function Readfunc2(){
      var obj = document.getElementById("readonly2");
      if(obj.readOnly == true){
        obj.readOnly = false; 
      }else{
        obj.readOnly = true; 
      }
    }
    function Readfunc3(){
      var obj = document.getElementById("readonly3");
      if(obj.readOnly == true){
        obj.readOnly = false; 
      }else{
        obj.readOnly = true; 
      }
    }
    function Readfunc4(){
      var obj = document.getElementById("readonly4");
      if(obj.readOnly == true){
        obj.readOnly = false; 
      }else{
        obj.readOnly = true; 
      }
    }
  function Checkfunc1(){
    if(document.getElementById("checkread1").disabled === true){
      // disabled属性を削除
      document.getElementById("checkread1").removeAttribute("disabled");
  }else{
      // disabled属性を設定
      document.getElementById("checkread1").setAttribute("disabled", true);
  }
  }
  
  function Checkfunc2(){
  if(document.getElementById("checkread2").disabled === true){
      // disabled属性を削除
      document.getElementById("checkread2").removeAttribute("disabled");
  }else{
      // disabled属性を設定
      document.getElementById("checkread2").setAttribute("disabled", true);
  }
  }
  function Selectd(){
      if(document.getElementById("selectt").disabled === true){
          // disabled属性を削除
          document.getElementById("selectt").removeAttribute("disabled");
      }else{
          // disabled属性を設定
          document.getElementById("selectt").setAttribute("disabled", true);
      }
      }