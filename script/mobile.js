

var tabs = document.getElementsByClassName('nav-item');
var activeEl = tabs[0];

function select(el){
  activeEl.classList.remove('active');
  activeEl = el;
  // document.body.style.background = activeEl.dataset.color;
  activeEl.classList.add('active');
}

select(activeEl);
// autoplay
// var iter = 0;
// setInterval(() => {
//   iter = ++iter >= tabs.length ? 0: iter; 
//   select(tabs[iter]); 
// }, 1500);


