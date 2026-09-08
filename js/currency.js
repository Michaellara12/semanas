/* Pesos enteros: presentación es-CO, valor numérico separado para los modelos. */
(function(){
 'use strict';
 const S=window.SEMANAS=window.SEMANAS||{},selector='input[data-currency="COP"]',ready=new WeakSet();
 const format=value=>Number(value).toLocaleString('es-CO',{maximumFractionDigits:0});
 function parse(value){
  const digits=String(value).trim().replace(/^(?:COP\s*\$?|\$)\s*/i,'').replace(/[.\s]/g,'');
  if(!/^\d+$/.test(digits))return NaN;
  const n=Number(digits);return Number.isSafeInteger(n)?n:NaN;
 }
 function validate(el){
  el.setCustomValidity('');
  if(el.value==='')return;
  const n=parse(el.value);
  if(!Number.isFinite(n)){el.setCustomValidity('Escriba pesos enteros, por ejemplo 2.500.000.');return;}
  const probe=document.createElement('input');probe.type='number';
  for(const attr of ['min','max','step'])if(el.hasAttribute(attr))probe.setAttribute(attr,el.getAttribute(attr));
  const initial=parse(el.defaultValue);if(Number.isFinite(initial))probe.defaultValue=String(initial);
  probe.value=String(n);if(!probe.validity.valid)el.setCustomValidity(probe.validationMessage);
 }
 function paint(el,caret=false){
  const n=parse(el.value),position=el.selectionStart??el.value.length;
  const count=(el.value.slice(0,position).match(/\d/g)||[]).length;
  if(Number.isFinite(n)){
   el.value=format(n);
   if(caret){let at=0,seen=0;while(at<el.value.length&&seen<count){if(/\d/.test(el.value[at]))seen++;at++;}el.setSelectionRange(at,at);}
  }
  validate(el);
 }
 function setup(el){
  if(ready.has(el))return;ready.add(el);
  el.type='text';el.inputMode='numeric';el.spellcheck=false;paint(el);
 }
 function init(root=document){
  if(root.matches?.(selector))setup(root);
  root.querySelectorAll?.(selector).forEach(setup);
 }
 S.Money={parse,format,read:el=>parse(el.value),set:(el,value)=>{setup(el);el.value=value==null?'':String(value);paint(el);},init};
 document.addEventListener('input',event=>{const el=event.target;if(el.matches?.(selector)){setup(el);paint(el,document.activeElement===el);}},true);
 // Borrar junto a un punto elimina el dígito contiguo, no un separador que reaparece.
 document.addEventListener('beforeinput',event=>{
  const el=event.target;if(!el.matches?.(selector)||el.selectionStart!==el.selectionEnd)return;
  const p=el.selectionStart,back=event.inputType==='deleteContentBackward',forward=event.inputType==='deleteContentForward';
  if((back&&el.value[p-1]==='.')||(forward&&el.value[p]==='.')){
   event.preventDefault();const start=back?p-2:p,end=back?p:p+2;
   el.setRangeText('',Math.max(0,start),end,'start');el.dispatchEvent(new Event('input',{bubbles:true}));
  }
 },true);
 document.addEventListener('change',event=>{if(event.target.matches?.(selector))paint(event.target);},true);
 init();
 new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)init(node);}))).observe(document.documentElement,{childList:true,subtree:true});
})();
