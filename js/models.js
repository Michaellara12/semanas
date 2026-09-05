/* =====================================================================
   SEMANAS · models.js — motor actuarial, financiero y demográfico.
   Todo el código es determinista y auditable. Cada función documenta sus
   supuestos. Unidades: pesos constantes (reales) salvo indicación.
   ===================================================================== */
(function(){
  const D = (typeof window!=="undefined" && window.SEMANAS && window.SEMANAS.DATA) || (typeof SEMANAS!=="undefined" ? SEMANAS.DATA : null);
  const SM = D ? D.smmlv : {2026:1750905};
  const IPC = D ? D.ipc : {};
  const CURRENT_YEAR = 2026;

  const M = {};
  M.smmlv = (y)=> SM[y] || SM[CURRENT_YEAR];
  M.CURRENT_YEAR = CURRENT_YEAR;

  /* ---------- 1. Mortalidad: Gompertz–Makeham μ(x) = A + B·c^x ----------
     Calibrada por sexo para reproducir la esperanza de vida a los 65 años
     implícita en las proyecciones DANE 2025 (≈16 años hombres, ≈19,3 mujeres).
     Referencia normativa para cálculos oficiales: tablas RV08 (Res. 1555/2010 SFC). */
  const MORT = { M:{A:0.0006, c:1.098}, F:{A:0.0004, c:1.104} };
  /* Dos calibraciones: población general (DANE) y rentistas (aprox. RV08: +2,2 años a los 65,
     porque quienes compran rentas vitalicias viven más que el promedio: selección adversa). */
  const TARGETS = { poblacional:{M:16.0, F:19.3}, rentistas:{M:18.2, F:21.5} };
  let mortMode = "rentistas";
  function survivalFrom0(x, p){ /* S(x) = exp(-A x - B/ln c (c^x - 1)) */
    return Math.exp(-p.A*x - p.B/Math.log(p.c)*(Math.pow(p.c,x)-1));
  }
  function ex(x, p){ /* esperanza de vida completa a la edad x por integración numérica hasta 115 años */
    const Sx=survivalFrom0(x,p); let e=0; for(let t=0.5;t<=115-x;t+=1){ e+= survivalFrom0(x+t,p)/Sx; } return e+0.5;
  }
  function calibrate(sex, target){ const p=MORT[sex]; let lo=1e-8, hi=1e-2; for(let i=0;i<70;i++){ const mid=Math.sqrt(lo*hi); p.B=mid; const e=ex(65,p); if(e>target) lo=mid; else hi=mid; } p.B=Math.sqrt(lo*hi); }
  M.setMortality = function(mode){ mortMode = TARGETS[mode]? mode : "rentistas"; calibrate("M", TARGETS[mortMode].M); calibrate("F", TARGETS[mortMode].F); return mortMode; };
  /* Tabla poblacional fija para la proyección demográfica (independiente del modo de rentas) */
  const MORT_POP = { M:{A:0.0006, c:1.098}, F:{A:0.0004, c:1.104} };
  (function(){ ["M","F"].forEach(sx=>{ const p=MORT_POP[sx]; let lo=1e-8, hi=1e-2; for(let i=0;i<70;i++){ const mid=Math.sqrt(lo*hi); p.B=mid; if(ex(65,p)>TARGETS.poblacional[sx]) lo=mid; else hi=mid; } p.B=Math.sqrt(lo*hi); }); })();
  M.setMortality("rentistas");
  M.mortality = MORT; M.mortalityPop = MORT_POP; M.mortalityMode = ()=>mortMode; M.mortalityTargets = TARGETS;
  M.lifeExpectancy = (x, sex)=> ex(x, MORT[sex]);
  M.tpx = (x, t, sex)=> survivalFrom0(x+t, MORT[sex])/survivalFrom0(x, MORT[sex]);

  /* ---------- 2. Rentas vitalicias ----------
     ä_x (anual, anticipada) = Σ v^t · t p_x.  Aproximación mensual ä^(12) ≈ ä − 11/24.
     Colombia paga 13 mesadas: mesada = Capital / (13 · ä^(12)_x).
     El factor de beneficiario (sobrevivencia) encarece la renta; se modela con un
     recargo paramétrico (por defecto 15 %), consistente con la práctica del mercado. */
  M.annuityDue = function(x, sex, i){ let a=0; for(let t=0;t<=115-x;t++){ a+= Math.pow(1+i,-t)*M.tpx(x,t,sex); } return a; };
  /* Renta conjunta de último sobreviviente (pensión de sobrevivientes del 100 % al cónyuge):
     ä_xy(último) = Σ v^t (tp_x + tp_y − tp_x·tp_y). Cónyuge por defecto: 5 años menor (mujer) si el titular es hombre;
     5 años mayor (hombre) si la titular es mujer (supuesto estándar, cf. Farné & Nieto 2017). */
  M.annuityJoint = function(x, sx, y, sy, i){ let a=0; for(let t=0;t<=115-Math.min(x,y);t++){ const v=Math.pow(1+i,-t); const px=M.tpx(x,t,sx), py=M.tpx(y,t,sy); a+= v*(px+py-px*py); } return a; };
  M.annuityFactor = function(x, sex, i, beneficiario){ if(!beneficiario) return M.annuityDue(x,sex,i)-11/24; const sy = sex==="M"?"F":"M"; const y = sex==="M"? x-5 : x+5; return M.annuityJoint(x,sex,y,sy,i)-11/24; };
  /* g = crecimiento real esperado de la mesada (deslizamiento del salario mínimo para pensiones de 1 SMLMV).
     La tasa efectiva de descuento es (1+i)/(1+g) − 1. */
  M.rentaVitalicia = function(capital, x, sex, i, beneficiario, g){ const ie=(1+i)/(1+(g||0))-1; return capital / (13 * M.annuityFactor(x,sex,ie,beneficiario)); };
  M.capitalParaRenta = function(mesada, x, sex, i, beneficiario, g){ const ie=(1+i)/(1+(g||0))-1; return mesada*13*M.annuityFactor(x,sex,ie,beneficiario); };

  /* ---------- 3. Reglas de Ley 100 / Ley 797 (RPM) ---------- */
  M.edadPension = (sex)=> sex==="F"?57:62;
  M.ley100RPM = function({sex, edad, semanas, ibl, smmlv}){
    smmlv = smmlv||M.smmlv(CURRENT_YEAR); const req=1300; const edadReq=M.edadPension(sex);
    const s = ibl/smmlv; const base = 65.5 - 0.5*s;                     /* art. 10 Ley 797 */
    const extra = Math.max(0, Math.floor((semanas-req)/50))*1.5;
    const cap = Math.min(80, Math.max(70.5, 80.5 - 0.5*s));              /* «entre el 80 y el 70,5 %» */
    const tasa = Math.min(cap, base+extra);
    const elegible = edad>=edadReq && semanas>=req;
    const mesada = elegible? Math.min(25*smmlv, Math.max(smmlv, ibl*tasa/100)) : 0;
    return {elegible, edadReq, semanasReq:req, s, tasaBase:base, tasaExtra:extra, tasa, cap, mesada, faltanSemanas:Math.max(0,req-semanas), faltanEdad:Math.max(0,edadReq-edad)};
  };
  /* Indemnización sustitutiva (Decreto 1730/2001): IS = SBC · SC · PPC
     SBC = salario base semanal actualizado; SC = semanas; PPC = promedio ponderado de la tasa de cotización. */
  M.indemnizacionSustitutiva = function({ibcMensual, semanas, tasa}){ tasa=tasa||0.16; return ibcMensual*12/52*semanas*tasa; };

  /* ---------- 4. Acumulación en cuenta individual (RAIS / CCAI) ----------
     Aporte mensual = share·IBC (RAIS: 11,5 de 16 puntos a la cuenta; CCAI: 13,2 de 16).
     Capital en pesos constantes con rendimiento real r y crecimiento salarial real g. */
  M.acumular = function({ibcMensual, semanas, r, g, share, yearsToRetire}){
    r = r==null?0.04:r; g=g||0.0; share=share==null?0.115:share; const meses=Math.round(semanas*7/30.4375);
    const rm=Math.pow(1+r,1/12)-1, gm=Math.pow(1+g,1/12)-1; let cap=0, ibc=ibcMensual;
    for(let m=0;m<meses;m++){ cap = cap*(1+rm) + share*ibc; ibc*= (1+gm); }
    if(yearsToRetire) cap*= Math.pow(1+r, yearsToRetire);
    return cap;
  };

  /* ---------- 5. Ley 2381 de 2024 ---------- */
  M.semanasMujer = function(anio){ if(anio<=2024) return 1300; if(anio>=2036) return 1000; return 1300-25*(anio-2024); }; /* art. 32 */
  M.transicion = function(sex, semanasAl2027){ const umbral= sex==="F"?750:900; return {enTransicion: semanasAl2027>=umbral, umbral}; }; /* art. 75 */
  M.ley2381 = function({sex, edad, semanas, ibl, smmlv, anio, saldoCCAI, iTecnica, beneficiario, hijos, umbralSM}){
    smmlv=smmlv||M.smmlv(CURRENT_YEAR); anio=anio||2027; iTecnica=iTecnica==null?0.03:iTecnica;
    const edadReq=M.edadPension(sex); let req = sex==="F"? M.semanasMujer(anio):1300;
    let reqHijos=req; if(sex==="F" && hijos>0){ reqHijos=Math.max(850, req-50*Math.min(3,hijos)); } /* art. 36 (devuelto a la Cámara) */
    /* umbralSM: el umbral del art. 24 en SMLMV. La ley lo fija en 2,3; se deja
       como parámetro para poder simular los otros valores que se debatieron. */
    const umbral=(umbralSM==null?2.3:umbralSM)*smmlv; const iblCPM=Math.min(ibl, umbral); const s=iblCPM/smmlv;
    const base=65.5-0.5*s; const extra=Math.max(0,Math.floor((semanas-req)/50))*1.5; const tasa=Math.min(80, base+extra);
    const elegible = edad>=edadReq && semanas>=req; const elegibleConHijos = edad>=edadReq && semanas>=reqHijos;
    const mesadaCPM = (elegible||elegibleConHijos)? Math.max(smmlv, iblCPM*tasa/100) : 0;
    const rentaCCAI = (elegible||elegibleConHijos) && saldoCCAI>0 ? M.rentaVitalicia(saldoCCAI, Math.max(edad,edadReq), sex, iTecnica, beneficiario) : 0;
    /* prestación anticipada (art. 37): >1000 semanas, 62 M / 65 H, antes de 2036 */
    const edadAnt = sex==="F"?62:65; const anticipada = !elegible && semanas>1000 && edad>=edadAnt && anio<2036;
    let prestAnticipada=0, descuento=0; if(anticipada){ prestAnticipada = Math.max(smmlv, iblCPM*base/100)*(semanas/req); descuento = 0.16*iblCPM; }
    return {elegible, elegibleConHijos, edadReq, semanasReq:req, semanasReqHijos:reqHijos, umbral, iblCPM, s, tasaBase:base, tasaExtra:extra, tasa, mesadaCPM, rentaCCAI, total:mesadaCPM+rentaCCAI, anticipada, prestAnticipada, descuento, faltanSemanas:Math.max(0,req-semanas), faltanEdad:Math.max(0,edadReq-edad)};
  };
  /* Pilar semicontributivo (art. 18): renta vitalicia a los 65 H / 60 M.
     capital = cotizaciones al CPM indexadas (IPC) [+3 % real anual y subsidio 20 % H / 30 % M si NO es elegible al Pilar Solidario]
     + saldo CCAI. Tope: 80 % del SMLMV. Supuestos: contribuciones uniformes en el tiempo; tasa de cotización = tasaCot. */
  M.semicontributivo = function({sex, semanas, ibcMensual, smmlv, pobre, tasaCot, gapAnios, iTecnica, saldoCCAI, anio}){
    smmlv=smmlv||M.smmlv(CURRENT_YEAR); tasaCot=tasaCot==null?0.16:tasaCot; gapAnios=gapAnios||0; iTecnica=iTecnica==null?0.03:iTecnica; saldoCCAI=saldoCCAI||0; anio=anio||2027;
    const maxSem = (sex==="M" && anio>=2036)? 1300 : 1000;
    const aplica = semanas>=300 && semanas<maxSem;
    const T=semanas/52; const cotizaciones = ibcMensual*12/52*semanas*tasaCot;         /* valor presente con IPC (pesos constantes) */
    const dur = T/2 + gapAnios;                                                        /* duración media de cada aporte hasta la renta */
    let capital = cotizaciones; if(!pobre){ capital = cotizaciones*Math.pow(1.03,dur); capital*= (sex==="F"?1.30:1.20); }
    capital += saldoCCAI;
    const edadRenta = sex==="F"?60:65; const renta = M.rentaVitalicia(capital, edadRenta, sex, iTecnica, false);
    const tope=0.8*smmlv; return {aplica, maxSem, cotizaciones, capital, edadRenta, renta:Math.min(renta,tope), rentaSinTope:renta, tope, topado: renta>tope, esperanzaVida: M.lifeExpectancy(edadRenta,sex)};
  };

  /* ---------- 6. Historia laboral (derecho de petición) ----------
     Texto: una línea por período "AAAA-MM-DD, AAAA-MM-DD, IBC" (IBC en pesos nominales del período).
     Devuelve semanas, IBL últimos 10 años (indexado con IPC a pesos de CURRENT_YEAR) e IBL de toda la vida. */
  M.parseHistoria = function(text){
    const rows = text.split(/\n+/).map(l=>l.trim()).filter(l=>l && !l.startsWith("#"));
    const per=[]; const errores=[];
    rows.forEach((l,i)=>{ const parts=l.split(/[,;\t]+/).map(x=>x.trim()); if(parts.length<3){ errores.push(`Línea ${i+1}: se esperaban 3 columnas`); return; }
      const a=new Date(parts[0]), b=new Date(parts[1]); const ibc=parseFloat(parts[2].replace(/[^\d.]/g,""));
      if(isNaN(a)||isNaN(b)||isNaN(ibc)||b<a){ errores.push(`Línea ${i+1}: fecha o IBC inválido`); return; }
      per.push({a,b,ibc}); });
    per.sort((x,y)=>x.a-y.a);
    let dias=0; per.forEach(p=>{ dias+= Math.round((p.b-p.a)/86400000)+1; });
    const semanas = dias/7;
    /* factor de indexación: producto de (1+IPC) desde el año del aporte hasta CURRENT_YEAR-1 */
    const idx = (year)=>{ let f=1; for(let y=year;y<CURRENT_YEAR;y++){ f*= 1+((IPC[y]||4)/100); } return f; };
    const promedio = (desde)=>{ let sw=0, sd=0; per.forEach(p=>{ const a=new Date(Math.max(p.a, desde)); if(a>p.b) return; const d=Math.round((p.b-a)/86400000)+1; sw+= p.ibc*idx(a.getFullYear())*d; sd+=d; }); return sd? sw/sd : 0; };
    const fin = per.length? per[per.length-1].b : new Date();
    const desde10 = new Date(fin); desde10.setFullYear(desde10.getFullYear()-10);
    const ibl10 = promedio(desde10), iblVida = promedio(new Date(1900,0,1));
    const ultimo = per.length? per[per.length-1].ibc*idx(per[per.length-1].b.getFullYear()) : 0;
    return {periodos:per, semanas, dias, ibl10, iblVida, ibl:Math.max(ibl10, iblVida), ultimoIBC:ultimo, errores, inicio: per.length?per[0].a:null, fin: per.length?fin:null};
  };

  /* ---------- 7. Monte Carlo de rendimientos (lognormal) ---------- */
  function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  function randn(rng){ let u=0,v=0; while(u===0) u=rng(); while(v===0) v=rng(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
  M.monteCarlo = function({ibcMensual, anios, share, mu, sigma, n, seed, g}){
    n=n||2000; const rng=mulberry32(seed||42); g=g||0; const out=[]; const meses=Math.round(anios*12);
    const muM = Math.log(1+mu)/12 - 0.5*Math.pow(sigma,2)/12, sM = sigma/Math.sqrt(12); const gm=Math.pow(1+g,1/12)-1;
    for(let k=0;k<n;k++){ let cap=0, ibc=ibcMensual; for(let m=0;m<meses;m++){ const ret=Math.exp(muM + sM*randn(rng))-1; cap=cap*(1+ret)+share*ibc; ibc*=(1+gm);} out.push(cap); }
    out.sort((a,b)=>a-b); const q=p=>out[Math.min(n-1,Math.floor(p*n))];
    return {caps:out, p5:q(0.05), p25:q(0.25), p50:q(0.5), p75:q(0.75), p95:q(0.95), mean: out.reduce((a,b)=>a+b,0)/n};
  };

  /* ---------- 8. Proyección demográfica por componentes (edad simple) ----------
     Población inicial 2025 = 53,0 M distribuida con anclas suavizadas y reescalada a los
     grandes grupos DANE (0–14: 22,6 %; 15–64: 67,3 %; 65+: 10,1 %). Fecundidad por edad con
     forma tipo beta (pico 27 años), TGF paramétrica; mortalidad Gompertz–Makeham por sexo
     calibrada a e0 (74 H / 80 M) con mejora anual; migración neta paramétrica. */
  function buildInitial(){
    const anchors=[[0,0.62],[5,0.78],[10,0.86],[14,0.88],[20,0.86],[30,0.82],[40,0.76],[50,0.66],[60,0.50],[65,0.40],[70,0.30],[80,0.14],[90,0.04],[100,0.003]];
    const pop=[]; for(let a=0;a<=100;a++){ let j=0; while(j<anchors.length-2 && anchors[j+1][0]<a) j++; const [a0,v0]=anchors[j],[a1,v1]=anchors[j+1]; pop.push(v0+(v1-v0)*(a-a0)/(a1-a0)); }
    const total=53.0, shares=[[0,14,0.226],[15,64,0.673],[65,100,0.101]];
    shares.forEach(([lo,hi,sh])=>{ let s=0; for(let a=lo;a<=hi;a++) s+=pop[a]; const k= total*sh/s; for(let a=lo;a<=hi;a++) pop[a]*=k; });
    return pop.map(v=>v*1e6);
  }
  function fertilityShape(){ const f=[]; for(let a=0;a<=100;a++){ if(a<15||a>49){ f.push(0); continue;} const x=(a-15)/35; f.push(Math.pow(x,2.0)*Math.pow(1-x,3.2)); } const s=f.reduce((a,b)=>a+b,0); return f.map(v=>v/s); }
  const FSHAPE=fertilityShape();
  function qx(a, sex, improv, year){ const p=MORT_POP[sex]; const S=(x)=>survivalFrom0(x,p); let q=1-S(a+1)/S(a); q*=Math.pow(1-improv, year-2025); return Math.min(0.95,q); }
  M.proyectar = function({tgf, tgfFinal, mejoraMort, migracion, hasta}){
    tgf=tgf==null?1.18:tgf; tgfFinal=tgfFinal==null?tgf:tgfFinal; mejoraMort=mejoraMort==null?0.012:mejoraMort; migracion=migracion==null?40000:migracion; hasta=hasta||2070;
    const mig0=migracion;
    const init=buildInitial(); let m=init.map(v=>v*0.49), f=init.map(v=>v*0.51); const rows=[];
    for(let y=2025;y<=hasta;y++){
      const tot=m.reduce((a,b)=>a+b,0)+f.reduce((a,b)=>a+b,0);
      let n014=0,n1564=0,n65=0; for(let a=0;a<=100;a++){ const v=m[a]+f[a]; if(a<15) n014+=v; else if(a<65) n1564+=v; else n65+=v; }
      const t=(y-2025)/(hasta-2025); const tgfY=tgf+(tgfFinal-tgf)*t;
      rows.push({y, total:tot, p014:n014/tot*100, p1564:n1564/tot*100, p65:n65/tot*100, dep:(n014+n65)/n1564*100, depMayores:n65/n1564*100, depInfantil:n014/n1564*100, envejecimiento:n65/n014*100, trabajadoresPorMayor:n1564/n65, tgf:tgfY});
      /* nacimientos */ let births=0; for(let a=15;a<=49;a++) births+= f[a]*tgfY*FSHAPE[a];
      const nm=new Array(101).fill(0), nf=new Array(101).fill(0);
      for(let a=0;a<100;a++){ nm[a+1]=m[a]*(1-qx(a,"M",mejoraMort,y)); nf[a+1]=f[a]*(1-qx(a,"F",mejoraMort,y)); }
      nm[100]+=m[100]*(1-qx(100,"M",mejoraMort,y)); nf[100]+=f[100]*(1-qx(100,"F",mejoraMort,y));
      nm[0]=births*0.512*(1-qx(0,"M",mejoraMort,y)); nf[0]=births*0.488*(1-qx(0,"F",mejoraMort,y));
      /* migración neta distribuida 18–45, decreciente (convergencia al promedio histórico, supuesto DANE) */
      const mig = mig0*Math.exp(-(y-2025)/15); if(mig){ for(let a=18;a<=45;a++){ nm[a]+=mig*0.5/28; nf[a]+=mig*0.5/28; } }
      m=nm; f=nf;
    }
    return rows;
  };
  M.piramide = function(){ const init=buildInitial(); const g=[]; for(let a=0;a<=95;a+=5){ let s=0; for(let k=a;k<Math.min(101,a+5);k++) s+=init[k]; g.push({label:a>=95?"95+":`${a}-${a+4}`, m:s*0.49/1e6, f:s*0.51/1e6}); } return g; };

  /* ---------- 9. Fondo de Ahorro del Pilar Contributivo: modelo reducido de flujos ----------
     Unidades: % del PIB. Calibrado para reproducir las trayectorias publicadas por el CARF (jun 2024):
     necesidades de Colpensiones 3,0 % (2025) → 4,9 % (2065); ingresos del fondo 0,6 % → 1,2 % (2051) → 0,1 % (2100);
     agotamiento en 2062 (escenario base) con rendimiento real 4,3 % (promedio TES 20 años).
     Parámetros: umbral (SMLMV), rReal (rendimiento), gPIB (crecimiento real), cotizBase (cotizaciones potenciales al CPM, % PIB),
     shockCotiz (multiplicador de la base de cotización, p. ej. por automatización o formalización), generacional (subcuentas). */
  M.shareUmbral = function(u){ /* fracción de la masa de cotizaciones por ingresos ≤ umbral; 2,3 → 66 % (CARF) */
    const pts=[[1,0.40],[1.6,0.55],[2.3,0.66],[3,0.72],[4,0.80],[10,0.95],[25,1.0]]; if(u<=1) return 0.40; for(let i=0;i<pts.length-1;i++){ if(u<=pts[i+1][0]){ const [a,va]=pts[i],[b,vb]=pts[i+1]; return va+(vb-va)*(u-a)/(b-a);} } return 1; };
  M.fapc = function(p){
    p=Object.assign({umbral:2.3, rReal:0.043, gPIB:0.03, cotizBase:3.5, shockCotiz:1.0, generacional:false, hasta:2100, inicio:2027, ramp:2058, rampWidth:8, elast:1.3}, p||{});
    const cap=(y)=> y<=2028?1.8: y<=2035?1.6: y<=2040?1.4: y<=2050?1.2:1.0;         /* art. 24: uso máximo de cotizaciones para mesadas */
    const sh=M.shareUmbral(p.umbral), sh0=M.shareUmbral(2.3);
    const rows=[]; let B=0; let agot=null; let vpnTransf=0;
    for(let y=p.inicio; y<=p.hasta; y++){
      const t=y-2025;
      const w = Math.exp(-Math.pow(t/70,2.2));                                                  /* erosión demográfica de la masa de cotizantes (menos población activa) */
      const C = p.cotizBase*sh*p.shockCotiz*w;                                                  /* cotizaciones al CPM (% PIB) */
      const newShare = 1/(1+Math.exp(-(y-p.ramp)/p.rampWidth));                                  /* participación de pensiones del nuevo esquema */
      const Nold = 3.0*(1-newShare)*(1+0.004*Math.min(t,40));                                   /* pensiones del régimen anterior (se extinguen) */
      const Nnew = 4.9*newShare*Math.pow(sh/sh0, p.elast);                                        /* pensiones del nuevo esquema, escalan con el umbral (subsidio implícito) */
      const N = Nold+Nnew;
      const traslados = Math.max(0, 0.30*Math.exp(-(y-2027)/6));                                /* traslados RAIS→CPM (art. 24 num. 3-5) */
      const solidaria = 0.06;                                                                   /* 1 punto de las cotizaciones del CCAI */
      const S = Math.max(0, C-cap(y)) + solidaria + traslados;                                  /* ingresos del fondo */
      const outFondo = p.generacional? Nnew*Math.min(1, 0.55+0.45*Math.max(0,(y-2050)/50)) : Nnew;
      let pagoFondo = 0;
      if(B+S>0){ pagoFondo=Math.min(outFondo, B*(1+p.rReal-p.gPIB)+S); }
      const Bnext = Math.max(0, B*(1+p.rReal-p.gPIB) + S - pagoFondo);
      if(agot===null && y>p.inicio+3 && Bnext<=1e-6 && S<outFondo) agot=y;
      const T = Math.max(0, Nold - Math.min(C,cap(y))) + (outFondo - pagoFondo) + (Nnew-outFondo);  /* transferencia de la Nación */
      vpnTransf += T/Math.pow(1.03, y-2025)/100;
      rows.push({y, cotizaciones:C, necesidades:N, ingresosFondo:S, saldo:B, pagoFondo, transferencia:T});
      B=Bnext;
    }
    const maxSaldo=rows.reduce((a,r)=> r.saldo>a.saldo?r:a, rows[0]);
    return {rows, agotamiento:agot, maxSaldo, vpnTransferencias:vpnTransf*100, params:p};
  };

  /* ---------- 10. Escenarios de automatización / IA sobre la base de cotización ----------
     Base de cotización ∝ empleo formal × salario. Exposición y desplazamiento reducen el empleo formal
     expuesto; el aumento (augmentation) eleva salarios; la formalización mueve trabajadores del sector informal
     al formal; una contribución sobre rentas de capital (p. ej. «impuesto a la automatización») añade ingresos. */
  M.automatizacion = function(p){
    p=Object.assign({exposicion:0.258, desplazamiento:0.30, reempleo:0.50, aumento:0.10, gananciaSalarial:0.14, formalizacion:0.0, capitalTax:0.0, formalShare:0.455}, p||{});
    const perdidaEmpleo = p.exposicion*p.desplazamiento*(1-p.reempleo);         /* fracción del empleo formal expuesto que sale de la base */
    const gananciaSal = p.aumento*p.gananciaSalarial;                            /* efecto salarial promedio de la complementariedad */
    const formal = p.formalShare*(1-perdidaEmpleo) + p.formalizacion;            /* nueva fracción formal del empleo total */
    const indice = (formal/p.formalShare)*(1+gananciaSal);                       /* índice de la masa de cotización (base = 1) */
    return {perdidaEmpleo, gananciaSal, formal, indice, capitalTax:p.capitalTax};
  };

  /* ---------- 11. Subsidio implícito y TIR del Régimen de Prima Media ----------
     Metodología (Farné & Nieto 2017; Bosch et al. 2015): capital nocional acumulado con las cotizaciones
     (share·IBC, densidad d, rendimiento real r) vs. reserva actuarial de la pensión legal (renta vitalicia con
     beneficiario, tasa técnica i, factor de gastos 5 % y seguridad 0,6 %). Subsidio = reserva − capital.
     TIR = tasa real que iguala el valor presente de aportes y beneficios. */
  M.subsidioRPM = function(p){
    p=Object.assign({sex:"M", ibcSM:1, semanas:1300, r:0.04, i:0.04, densidad:0.871, share:0.13, edadInicio:25, smmlv:M.smmlv(CURRENT_YEAR), gMin:0.02}, p||{});
    const ibc=p.ibcSM*p.smmlv; const edadRet=M.edadPension(p.sex);
    const aniosCot = p.semanas/52/p.densidad; const rm=Math.pow(1+p.r,1/12)-1; const meses=Math.round(aniosCot*12);
    let cap=0; for(let m=0;m<meses;m++){ const cotiza = (m%12)/12 < p.densidad; cap = cap*(1+rm) + (cotiza? p.share*ibc : 0); }
    const aniosHasta = Math.max(0, edadRet - (p.edadInicio+aniosCot)); cap*=Math.pow(1+p.r, aniosHasta);
    const leg = M.ley100RPM({sex:p.sex, edad:edadRet, semanas:p.semanas, ibl:ibc, smmlv:p.smmlv});
    const mesada = leg.mesada || Math.max(p.smmlv, ibc*leg.tasa/100);
    const g = mesada<=p.smmlv*1.0001 ? p.gMin : 0;                 /* solo la pensión mínima crece con el salario mínimo; las demás con IPC */
    const reserva = M.capitalParaRenta(mesada, edadRet, p.sex, p.i, true, g)*1.056;  /* +5 % gastos, +0,6 % seguridad (Res. 3099/2015) */
    const subsidio = reserva-cap;
    /* TIR: tasa real x tal que VP(aportes) = VP(beneficios) a la fecha de retiro */
    const f = (x)=>{ const xm=Math.pow(1+x,1/12)-1; let c=0; for(let m=0;m<meses;m++){ const cotiza=(m%12)/12<p.densidad; c=c*(1+xm)+(cotiza?p.share*ibc:0);} c*=Math.pow(1+x,aniosHasta); return c - M.capitalParaRenta(mesada, edadRet, p.sex, x, true, g)*1.056; };
    let lo=-0.02, hi=0.25; for(let k=0;k<50;k++){ const mid=(lo+hi)/2; if(f(mid)<0) lo=mid; else hi=mid; }
    return {ibc, mesada, tasa:leg.tasa, capital:cap, reserva, subsidio, subsidioPct: subsidio/reserva*100, tir:(lo+hi)/2, aniosCot, edadRet};
  };
  /* Punto de equilibrio del semicontributivo: edad a la que la renta acumulada (capitalizada a r) iguala el pago único */
  M.breakEvenSemi = function({renta, pagoUnico, edadRenta, r}){ r=r==null?0.03:r; let acc=0; const rm=Math.pow(1+r,1/12)-1; let pu=pagoUnico; for(let m=0;m<12*45;m++){ acc=acc*(1+rm)+renta*(m%12===11?2:1); pu*=(1+rm); if(acc>=pu) return edadRenta+m/12; } return null; };
  /* Deflactor: pesos corrientes de `year` → pesos de CURRENT_YEAR usando IPC */
  M.aReal = function(valor, year){ let f=1; for(let y=year;y<CURRENT_YEAR;y++){ f*=1+((IPC[y]||4)/100); } return valor*f; };

  if(typeof window!=="undefined") window.Models=M; if(typeof module!=="undefined") module.exports=M;
})();
