/* Un ejemplo aritmético, deliberadamente separado del motor actuarial. */
(function(){
 const S=window.SEMANAS;
 function initDisclosureMotion(){
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.debate-topic').forEach(topic=>{
   if(topic.dataset.motionReady)return;
   topic.dataset.motionReady='true';
   const summary=topic.querySelector('summary'),body=topic.querySelector('.debate-body');
   let animation=null,expanded=topic.open;
   summary.addEventListener('click',event=>{
    if(event.target.closest('a,button,input,.term'))return;
    event.preventDefault();
    if(!animation)expanded=topic.open;
    expanded=!expanded;
    const wasOpen=topic.open,currentHeight=wasOpen?body.getBoundingClientRect().height:0;
    const padding=getComputedStyle(body),fromTop=wasOpen?padding.paddingTop:'0px',fromBottom=wasOpen?padding.paddingBottom:'0px',fromOpacity=wasOpen?padding.opacity:'0';
    if(animation){animation.cancel();animation=null;}
    topic.toggleAttribute('data-collapsing',!expanded);
    if(reduced.matches||!body.animate){topic.open=expanded;topic.removeAttribute('data-collapsing');body.classList.remove('is-animating');return;}
    topic.open=true;
    const natural=getComputedStyle(body),toTop=natural.paddingTop,toBottom=natural.paddingBottom;
    const targetHeight=body.getBoundingClientRect().height;
    body.classList.add('is-animating');
    animation=body.animate([
     {height:currentHeight+'px',paddingTop:fromTop,paddingBottom:fromBottom,opacity:fromOpacity},
     {height:(expanded?targetHeight:0)+'px',paddingTop:expanded?toTop:'0px',paddingBottom:expanded?toBottom:'0px',opacity:expanded?1:0}
    ],{duration:360,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    animation.onfinish=()=>{topic.open=expanded;animation.cancel();animation=null;body.classList.remove('is-animating');topic.removeAttribute('data-collapsing');};
   });
  });
 }
 S.initDebate=()=>{
  initDisclosureMotion();
  const capital=document.getElementById('debate-capital'),mensual=document.getElementById('debate-mensual');
  if(!capital||!mensual)return;
  const pesos=x=>'$'+Math.round(x).toLocaleString('es-CO'),num=x=>x.toLocaleString('es-CO',{maximumFractionDigits:1});
  let values=[24000000,200000];
  function draw(){
   const [c,m]=values,months=c/m;
   document.querySelector('[data-debate-capital]').textContent=pesos(c);
   document.querySelector('[data-debate-mensual]').textContent=pesos(m);
   document.querySelector('[data-debate-meses]').textContent=num(months)+' meses';
   document.getElementById('debate-cuenta-result').textContent=`${num(months)} meses son ${num(months/12)} años. La renta vitalicia continúa mientras viva la persona. Sumar lo mismo no equivale a tener el mismo valor financiero.`;
  }
  [capital,mensual].forEach((el,i)=>{
   el.addEventListener('input',()=>{if(el.value!==''&&el.validity.valid){values[i]=Number(el.value);draw();}});
   el.addEventListener('change',()=>{if(el.value===''||!el.validity.valid)el.value=values[i];});
  });
  draw();
 };
})();
