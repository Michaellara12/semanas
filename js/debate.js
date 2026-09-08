/* Un ejemplo aritmético, deliberadamente separado del motor actuarial. */
(function(){
 const S=window.SEMANAS;
 S.initDebate=()=>{
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
