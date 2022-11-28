var tabs = document.getElementsByClassName('nav-item');
var activeEl = tabs[3];

function select(el){
  activeEl.classList.remove('active');
  activeEl = el;
  // document.body.style.background = activeEl.dataset.color;
  activeEl.classList.add('active');
}

select(activeEl);