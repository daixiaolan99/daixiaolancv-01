// 轻量交互：平滑滚动（现代浏览器）
document.addEventListener('click', function(e){
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href');
  if(id.length===1) return;
  const dest = document.querySelector(id);
  if(dest){
    e.preventDefault();
    dest.scrollIntoView({behavior:'smooth',block:'start'});
    history.replaceState(null,'',id);
  }
});
