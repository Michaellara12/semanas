/* Cinco cuentas para aprender: unidades visibles, escenarios independientes.
   Las tasas legales se mantienen fijas; un umbral distinto de 2,3 es hipotético. */
(function(root){
  'use strict';
  const S=root.SEMANAS=root.SEMANAS||{};
  const N=(v,d=2)=>Number(v).toLocaleString('es-CO',{maximumFractionDigits:d});
  const money=v=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(v);
  const defaults={split:{w:4,u:2.3},contribution:{w:4,u:2.3},share:{a:1,b:2,c:10,u:2.3},pension:{w:5,u:2.3,n:1300},fund:{b:10,r:4.3,g:3,s:1,p:1.5}};
  function calculate(kind,v){
    if(kind==='fund'){
      const adjustment=v.b*(v.r-v.g)/100, available=Math.max(0,v.b+adjustment+v.s);
      const paid=Math.min(v.p,available);
      return {adjustment,available,paid,balance:available-paid,gap:v.p-paid};
    }
    if(kind==='share'){
      const wages=[v.a,v.b,v.c], capped=wages.map(w=>Math.min(w,v.u));
      const total=wages.reduce((a,b)=>a+b,0), publicTotal=capped.reduce((a,b)=>a+b,0);
      return {wages,capped,total,publicTotal,moneyShare:total?100*publicTotal/total:0,peopleShare:100*wages.filter(w=>w<=v.u).length/3};
    }
    const publicBase=Math.min(v.w,v.u), personalBase=Math.max(0,v.w-v.u);
    if(kind==='split')return {publicBase,personalBase};
    if(kind==='contribution')return {publicBase,personalBase,total:v.w*.16,employee:v.w*.04,employer:v.w*.12,publicAmount:publicBase*.16,personalAmount:personalBase*.16,credited:personalBase*.132};
    const blocks=Math.max(0,Math.floor((v.n-1300)/50)),rate=Math.min(80,65.5-.5*publicBase+1.5*blocks),eligible=v.n>=1300;
    return {publicBase,blocks,rate,eligible,missing:Math.max(0,1300-v.n),payment:eligible?Math.max(1,publicBase*rate/100):0};
  }
  const term=(key,label)=>`<button type="button" class="term math-term" data-t="${key}">${label}</button>`;
  const inputs={
    w:['Ingreso para la cuenta',1,25,.1,'salarios mínimos'],u:['Umbral del escenario',1,4,.1,'salarios mínimos'],
    a:['Ingreso de Ana',1,25,.1,'salarios mínimos'],b:['Ingreso de Bruno',1,25,.1,'salarios mínimos'],c:['Ingreso de Camila',1,25,.1,'salarios mínimos'],
    n:['Semanas cotizadas',0,2300,1,'semanas']
  };
  const fundInputs={b:['Ahorro al empezar',0,20,.1,'% del PIB'],r:['Rendimiento real',0,8,.1,'% anual'],g:['Crecimiento de la economía',0,6,.1,'% anual'],s:['Dinero que entra',0,5,.1,'% del PIB'],p:['Pagos previstos',0,5,.1,'% del PIB']};
  const lessons=[
    {id:'split',title:'Un ingreso, dos destinos',color:'cyan',say:'Primero separamos el ingreso sobre el que se aporta. Hasta el límite va al componente público; solo lo que lo supera va al componente de ahorro individual.',try:'Suba el ingreso y observe cuándo aparece la segunda parte.',scope:'Aquí se divide el ingreso base de cotización (IBC), no se envía todo el sueldo al sistema. El aporte se calcula en el siguiente paso.',source:'ley2381',locator:'Artículos 19 y 20',
      formula:String.raw`B_{\mathrm{público}}=\min(w,uS)\qquad B_{\mathrm{individual}}=\max(0,w-uS)`,symbols:`w es el ingreso base; S es un salario mínimo y u es el umbral. ${term('math-min','min: elegir el menor')} limita la primera parte. ${term('math-max','max: elegir el mayor')} evita que la segunda sea negativa.`},
    {id:'contribution',title:'De cada 100 pesos, se aportan 16',color:'yellow',say:'El aporte ordinario equivale al 16 % del ingreso base. Para un empleado, 4 puntos los paga él y 12 su empleador. Después, ese aporte se reparte entre los dos componentes.',try:'Cambie el ingreso. Luego mueva solo el umbral: cambia el destino, pero no el aporte total.',scope:'Ejemplo de empleado: no incluye aportes adicionales al Fondo de Solidaridad Pensional. El independiente asume el 16 % de su IBC. El dinero enviado al componente individual no se abona íntegro al saldo personal: 13,2 puntos de esa base alimentan la cuenta; los demás tienen destinos del artículo 23.',source:'ley2381',locator:'Artículos 20, 21 y 23',
      formula:String.raw`C_{\mathrm{público}}=0{,}16 B_{\mathrm{público}}\qquad C_{\mathrm{individual}}=0{,}16 B_{\mathrm{individual}}`,symbols:`C es el aporte y B la parte del ingreso que corresponde a cada componente. ${term('math-percent','0,16 significa 16 de cada 100')}. Es el aporte conjunto; no es todo un descuento al empleado.`},
    {id:'share',title:'Contar personas no es contar dinero',color:'peri',say:'Tres personas pueden aportar cantidades muy distintas. Para saber qué parte del dinero queda bajo el umbral, sumamos los pedazos que llegan al componente público y los comparamos con el ingreso total.',try:'Aumente el ingreso de Camila: su parte pública tiene un límite, pero el total del grupo sigue creciendo.',scope:'Este grupo de tres personas es inventado para explicar la cuenta. Su resultado no representa a Colombia. El 66 % citado por el CARF corresponde a su distribución de cotizaciones y sus supuestos, no a este ejemplo.',source:'carf24u',page:12,
      formula:String.raw`s(u)=100\,\frac{\sum_i\min(w_i,uS)}{\sum_i w_i}`,symbols:`${term('math-sum','Σ significa sumar todas las personas')}. Arriba sumamos las bases públicas; abajo, los ingresos completos. ${term('math-ratio','Dividir compara una parte con el total')}; multiplicar por 100 lo expresa en porcentaje.`},
    {id:'pension',title:'Una parte de su ingreso se vuelve mesada',color:'cyan',say:'La cuenta toma una base de ingreso y calcula qué porcentaje de ella se reconoce cada mes. Las semanas extra pueden aumentar ese porcentaje, en grupos completos de 50.',try:'Pruebe 1.349 y 1.350 semanas: el aumento aparece al completar el grupo de 50.',scope:'Ejemplo acotado: hombre de 62 años, sujeto al nuevo sistema, sin transición, requisito de 1.300 semanas. El IBL resume los ingresos usados para liquidar; no es necesariamente el último sueldo. Se muestra solo el componente público, en pesos de 2026; no incluye la renta del ahorro individual ni verifica todos los requisitos de una pensión.',source:'ley2381',locator:'Artículos 32 y 33',
      formula:String.raw`b=\min(\mathrm{IBL}/S,u)\qquad k=\max\left(0,\left\lfloor\frac{n-1300}{50}\right\rfloor\right)\qquad r=\min(80,65{,}5-0{,}5b+1{,}5k)\qquad M=S\max(1,br/100)`,symbols:`b es la base pública en salarios mínimos; n son semanas; k son ${term('math-block','grupos completos de 50 semanas adicionales')}; r es el porcentaje reconocido. M es la mesada pública, con piso de un mínimo cuando se cumplen los requisitos del ejemplo.`},
    {id:'fund',title:'Lo que entra, lo que sale y lo que queda',color:'yellow',say:'Piense en una alcancía: empieza con un ahorro, recibe rendimientos y nuevos ingresos, y hace pagos. Aquí medimos su tamaño frente al tamaño de la economía.',try:'Suba los pagos o baje las entradas. Si el ahorro no alcanza, verá cuánto queda sin cubrir.',scope:'Ejercicio de un solo año, con valores inventados. Usa la aproximación del modelo, r − g, para ajustar el saldo frente al PIB. No proyecta una fecha de agotamiento ni aplica el calendario completo de entradas y pagos del Fondo.',source:'carf24u',page:19,
      formula:String.raw`B_{t+1}\approx B_t(1+r_{\mathrm{real}}-g)+S_t-P_t`,symbols:`B es el saldo; r es el rendimiento real; g es el crecimiento real; S son entradas y P pagos. ${term('math-gdp','% del PIB: comparar el ahorro con la economía')}. En la fórmula, 4,3 % se escribe 0,043. Si no alcanza, el simulador deja el saldo en cero y separa los pagos pendientes.`}
  ];
  function init(){
    const host=root.document.getElementById('u-formulas');if(!host)return;
    const art=root.document.getElementById('math-art');
    const minimum=root.Models.smmlv(2026);
    Object.assign(S.GLOSARIO,{
      'math-min':{t:'min: elegir el menor',d:'Compare las cantidades y conserve la más pequeña. Sirve para poner un techo a una cuenta.',e:'min(4; 2,3) da 2,3. min(1; 2,3) da 1.'},
      'math-max':{t:'max: elegir el mayor',d:'Compare las cantidades y conserve la más grande. Con cero como opción, impide un resultado negativo.',e:'max(0; 1 − 2,3) da 0. No hay ingreso por encima del umbral.'},
      'math-percent':{t:'Porcentaje: una parte de cada 100',d:'El símbolo % dice cuántas partes tomamos de cada cien. Para calcularlo, dividimos ese número entre 100 y multiplicamos por la cantidad inicial.',e:'16 % de $1.000 es 16 ÷ 100 × $1.000 = $160. El 16 % no significa 16 pesos fijos.'},
      'math-sum':{t:'Σ: sumar un grupo',d:'Esta letra griega, sigma, es una instrucción corta: repita la cuenta para cada persona y sume los resultados. La i identifica a cada persona.',e:'Con bases públicas de 1, 2 y 2,3 mínimos: Σ = 1 + 2 + 2,3 = 5,3 mínimos.'},
      'math-ratio':{t:'Comparar una parte con el total',d:'Dividir la parte entre el total dice qué fracción representa. Multiplique por 100 si quiere verla como porcentaje.',e:'5,3 de un total de 13 equivalen a 5,3 ÷ 13 × 100 = 40,77 %. El total debe ser mayor que cero.'},
      'math-block':{t:'Grupos completos de semanas',d:'Las marcas ⌊ ⌋ indican que se conserva la parte entera de una división. En este ejemplo solo cuentan grupos completos de 50 semanas por encima de 1.300.',e:'Con 1.349 semanas, sobran 49: todavía hay cero grupos. Con 1.350, sobra un grupo de 50 y se suman 1,5 puntos al porcentaje, sujeto al tope.',k:'ley2381'},
      'math-gdp':{t:'% del PIB: una regla para comparar tamaños',d:'El PIB mide la producción de la economía durante un año. Un ahorro de 10 % del PIB tiene un tamaño equivalente a 10 pesos por cada 100 pesos de esa producción. No es una tasa de rentabilidad.',e:'Si el saldo equivale al 10 % del PIB y el ajuste r − g es 1 %, el ajuste agrega 0,1 puntos del PIB: 10 × 0,01. No agrega un punto entero.',i:['r y g son porcentajes anuales. Saldo, entradas y pagos se expresan como porcentajes del PIB.','El factor exacto, con las mismas convenciones, sería (1 + r) ÷ (1 + g). Aquí usamos 1 + r − g como aproximación didáctica.']}
    });
    host.className='math-lessons';
    host.innerHTML=lessons.map((l,i)=>{
      const img=art.content.querySelector(`[data-art="${l.id}"]`).outerHTML;
      const fields=Object.keys(defaults[l.id]).map(key=>{
        let [label,min,max,step,unit]=(l.id==='fund'?fundInputs:inputs)[key];
        if(key==='w')label=l.id==='pension'?'Ingreso base de liquidación (IBL)':'Ingreso base de cotización (IBC)';
        const id=`math-${l.id}-${key}`,value=defaults[l.id][key];
        return `<div class="math-control"><label for="${id}">${label} <small>${unit}</small></label><div class="math-inputs"><input type="range" id="${id}" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}"><input type="number" aria-label="${label}, ${unit}: valor exacto" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}" inputmode="decimal"></div></div>`;
      }).join('');
      return `<li class="math-lesson c-${l.color}" data-math="${l.id}"><header><span class="math-number">CUENTA 0${i+1}</span><h3>${l.title}</h3><p>${l.say}</p></header><div class="math-visual"><div class="math-art">${img}</div><div class="math-flow" data-flow></div></div><div class="math-play"><div class="math-play-heading"><h4>Pruebe con otros valores</h4><button type="button" class="btn small" data-reset>Restablecer ejemplo</button></div><p>${l.try}</p><p class="math-note">${l.id==='fund'?term('math-gdp','¿Qué significa % del PIB?'):l.id==='share'?term('math-ratio','¿Cómo se obtiene un porcentaje?'):l.id==='pension'?term('ibl','¿Qué es el IBL?'):term('ibc','¿Qué es el ingreso base?')} ${l.id==='contribution'?term('math-percent','¿Cómo se calcula el 16 %?'):''}</p><div class="math-controls">${fields}</div>${l.id!=='fund'?`<p class="math-note">${term('umbral','¿Qué es el umbral?')} El texto de la ley fija 2,3 mínimos. Otros valores son escenarios hipotéticos.${l.id!=='share'?` Un mínimo en este ejercicio = ${money(minimum)} (2026).`:''}</p>`:''}<div class="math-result callout peri" role="status" aria-live="polite" aria-atomic="true" data-result></div></div><details class="math-detail"><summary>Ver la fórmula y entender sus símbolos</summary><div class="formula-box math">\\[${l.formula}\\]</div><p>${l.symbols}</p></details><footer><p>${l.scope}</p><a class="cite" data-ref="${l.source}" ${l.page?`data-page="${l.page}"`:''} ${l.locator?`data-locator="${l.locator}"`:''}></a></footer></li>`;
    }).join('');
    const stage=(title,value,desc,color='cyan')=>`<div class="math-stage c-${color}"><span>${title}</span><strong>${value}</strong><small>${desc}</small></div>`;
    host.querySelectorAll('[data-math]').forEach(card=>{
      const kind=card.dataset.math,v={...defaults[kind]};
      const draw=()=>{
        const r=calculate(kind,v),units=n=>`${N(n)} mínimos`,cash=n=>money(n*minimum);
        let flow='',result='';
        if(kind==='split'){
          flow=stage('1 · Su ingreso base',units(v.w),cash(v.w),'yellow')+stage('2 · Parte pública',units(r.publicBase),'Hasta el límite: '+cash(r.publicBase))+stage('3 · Parte individual',units(r.personalBase),'Solo el exceso: '+cash(r.personalBase),'peri');
          result=`${units(r.publicBase)} + ${units(r.personalBase)} = ${units(v.w)}. ${r.personalBase?'El ingreso supera el umbral: hay dos destinos.':'No supera el umbral: toda la base corresponde al componente público.'}`;
        }else if(kind==='contribution'){
          flow=stage('1 · Empleado · 4 %',cash(r.employee),'Parte del aporte que paga usted','yellow')+stage('2 · Empleador · 12 %',cash(r.employer),'Parte que paga su empleador')+stage('3 · Aporte conjunto · 16 %',cash(r.total),'La suma de ambos aportes','peri');
          result=`Del aporte conjunto: ${cash(r.publicAmount)} van al componente público y ${cash(r.personalAmount)} al individual. De esta última suma, ${cash(r.credited)} se abonan al saldo personal (13,2 % de la base individual).`;
        }else if(kind==='share'){
          flow=r.wages.map((w,i)=>stage(['Ana','Bruno','Camila'][i],units(w),`<span class="math-bar" aria-hidden="true"><span style="width:${100*r.capped[i]/w}%"></span></span>${units(r.capped[i])} bajo el umbral`)).join('');
          result=`Dinero bajo el umbral: ${N(r.publicTotal)} ÷ ${N(r.total)} × 100 = ${N(r.moneyShare)} %. Personas con todo su ingreso bajo el umbral: ${N(r.peopleShare)} %. Son dos preguntas distintas.`;
        }else if(kind==='pension'){
          flow=stage('1 · Base pública',units(r.publicBase),cash(r.publicBase),'yellow')+stage('2 · Porcentaje reconocido',`${N(r.rate)} %`,`${r.blocks} grupos completos de 50 semanas extra`)+stage('3 · Mesada pública',r.eligible?cash(r.payment):'Faltan semanas',r.eligible?'Por mes; aplica el piso de un mínimo':`${N(r.missing)} para llegar a 1.300`,'peri');
          result=r.eligible?`De un IBL de ${cash(v.w)}, esta cuenta usa ${cash(r.publicBase)} de base pública. ${cash(r.publicBase)} × ${N(r.rate)} % = ${cash(r.publicBase*r.rate/100)}. ${r.publicBase*r.rate/100<1?'Se aplica el piso de un mínimo: '+cash(1)+'.':'Esa es la mesada pública del ejemplo.'}`:`Con ${N(v.n)} semanas no se cumple el requisito de este ejemplo. No se muestra una mesada como si ya existiera el derecho.`;
        }else{
          flow=stage('1 · Ahorro inicial',`${N(v.b)} % del PIB`,'El saldo al empezar','yellow')+stage('2 · Ajuste y entradas',`${N(r.adjustment+v.s)} puntos`,`Ajuste: ${N(r.adjustment)} · Entradas: ${N(v.s)}`)+stage('3 · Pagos cubiertos',`${N(r.paid)} % del PIB`,`Previstos: ${N(v.p)} % del PIB`,'peri')+stage('4 · Ahorro final',`${N(r.balance)} % del PIB`,'Después de los pagos');
          result=`${N(v.b)} + (${N(r.adjustment)}) + ${N(v.s)} − ${N(r.paid)} = ${N(r.balance)} % del PIB. ${r.gap>0?`No alcanza: quedan pagos por ${N(r.gap)} % del PIB sin cubrir con este fondo.`:'El fondo cubre todos los pagos previstos de este ejemplo.'}`;
        }
        card.querySelector('[data-flow]').innerHTML=flow;
        card.querySelector('[data-result]').textContent=result;
      };
      card.addEventListener('input',event=>{
        const el=event.target;if(!el.matches('input[data-key]'))return;
        if(el.value===''||!el.validity.valid)return;
        v[el.dataset.key]=Number(el.value);
        card.querySelectorAll(`input[data-key="${el.dataset.key}"]`).forEach(other=>{if(other!==el)other.value=el.value;});draw();
      });
      card.addEventListener('change',event=>{
        const el=event.target;if(!el.matches('input[data-key]'))return;
        if(!el.validity.valid||el.value==='')el.value=v[el.dataset.key];
      });
      card.querySelector('[data-reset]').addEventListener('click',()=>{Object.assign(v,defaults[kind]);card.querySelectorAll('input[data-key]').forEach(el=>{el.value=v[el.dataset.key];});draw();});
      draw();
    });
  }
  S.MathLab={calculate,defaults,init};
  if(typeof module!=='undefined')module.exports=S.MathLab;
})(typeof window!=='undefined'?window:globalThis);
