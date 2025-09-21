
// nova-breadcrumb.js
window.NovaBreadcrumb = (function(){
  function el(tag, cls, txt){
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(txt!=null) e.textContent = txt;
    return e;
  }
  function render(steps, activeIndex){
    const root = document.getElementById('nova-breadcrumb');
    if(!root) return;
    root.innerHTML='';
    steps.forEach((label, i)=>{
      const c = el('div', 'crumb'+(i===activeIndex?' active':''));
      const dot = el('span','dot');
      const txt = el('span','label', label);
      c.appendChild(dot); c.appendChild(txt);
      root.appendChild(c);
      if(i<steps.length-1){
        root.appendChild(el('span','sep','›'));
      }
    });
  }
  return { render };
})();
