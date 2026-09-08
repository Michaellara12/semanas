/* =====================================================================
   SEMANAS · app.js v2 — interfaz: menú lateral, citas con vista previa,
   gráficas históricas, calculadora, análisis avanzado, simuladores.
   ===================================================================== */
(function(){
  const $=(s,r)=>(r||document).querySelector(s); const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
  const D=SEMANAS.DATA, H=SEMANAS.HIST, SRC=SEMANAS.SRC;
  const COP=v=>"$"+Math.round(v).toLocaleString("es-CO");
  const NUM=(v,d)=>(d?(Math.round(v*Math.pow(10,d))/Math.pow(10,d)):Math.round(v)).toLocaleString("es-CO");
  const PCT=(v,d)=>NUM(v,d==null?1:d)+" %";
  const escapeHTML=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const lawCite=(k,locator="",article="")=>`<a class="cite" data-ref="${k}"${locator?` data-locator="${escapeHTML(locator)}"`:""}${article?` data-article="${article}"`:""}>[${SRC[k]||"?"}]</a>`;
  const cite=k=>lawCite(k);
  /* Solo enlaza referencias al articulado de esta ley. Las citas de otras
     normas, el texto oficial y las fichas bibliográficas conservan su lectura. */
  function linkLawMentions(root){
    if(!root||!SEMANAS.ANALISIS) return;
    const skip='a,button,script,style,code,pre,summary,.art,.law-official-content,.law-source-entry,.law-source-meta,.refs,.refs-local,[data-no-law-links],mjx-container';
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:node=>
      node.parentElement?.closest(skip)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    const pattern=/\b(art[ií]culos?|arts?\.?)\s+(\d{1,3}(?!\d)(?:\s*(?:[–—-]|,|y|e)\s*\d{1,3}(?!\d))*)/gi;
    const otherLaw=/(?:ley\s+(?!2381\b)\d+|constituci[oó]n|c[oó]digo\s+(?:civil|sustantivo|procesal)|decreto\s+\d+)/i;
    for(const node of nodes){
      const value=node.nodeValue; pattern.lastIndex=0;
      const hits=[...value.matchAll(pattern)]; if(!hits.length) continue;
      const fragment=document.createDocumentFragment();let end=0,changed=false;
      for(const hit of hits){
        const index=hit.index,after=value.slice(index+hit[0].length);
        const sentenceStart=Math.max(value.lastIndexOf('. ',index-1),value.lastIndexOf('; ',index-1));
        const before=value.slice(sentenceStart<0?0:sentenceStart+2,index);
        const isExternal=/^\s*(?:(?:de|del)\s+)?(?:(?:la|el)\s+)?(?:ley\s+(?!2381\b)\d+|constituci[oó]n|C\.?\s*P\.?|c[oó]digo|decreto)/i.test(after)||otherLaw.test(before);
        const numbers=[...hit[2].matchAll(/\d+/g)];
        if(isExternal||numbers.some(n=>+n[0]<1||+n[0]>95)) continue;
        fragment.append(value.slice(end,index));
        const makeLink=(label,n)=>{const a=document.createElement('a');a.className='law-article-link';a.href='#ley';a.dataset.lawArticle=n;a.textContent=label;a.setAttribute('role','button');a.setAttribute('aria-haspopup','dialog');a.setAttribute('aria-label',`Abrir artículo ${n} de la Ley 2381`);return a;};
        if(numbers.length===1) fragment.append(makeLink(hit[0],numbers[0][0]));
        else{
          fragment.append(hit[0].slice(0,hit[0].length-hit[2].length));let at=0;
          for(const number of numbers){fragment.append(hit[2].slice(at,number.index));fragment.append(makeLink(number[0],number[0]));at=number.index+number[0].length;}
          fragment.append(hit[2].slice(at));
        }
        end=index+hit[0].length;changed=true;
      }
      if(changed){fragment.append(value.slice(end));node.replaceWith(fragment);}
    }
  }
  function articleLinkAction(e){
    const link=e.target.closest?.('[data-law-article]'); if(!link) return;
    if(e.type==='keydown'&&e.key!==' ') return;
    e.preventDefault();
    if(document.querySelector('#gloss.open')) SEMANAS.panel?.cerrar();
    openArt(+link.dataset.lawArticle);
  }
  document.addEventListener('click',articleLinkAction);
  document.addEventListener('keydown',articleLinkAction);
  const on=(id,ev,fn)=>{ const e=document.getElementById(id); if(e) e.addEventListener(ev,fn); return e; };
  const val=id=>{ const e=document.getElementById(id); return e?(e.type==="checkbox"?e.checked:parseFloat(e.value)):null; };
  const txt=id=>{ const e=document.getElementById(id); return e?e.value:""; };
  const setHTML=(id,h)=>{ const e=document.getElementById(id); if(e) e.innerHTML=h; };
  const T=()=>Charts.theme().pal;

  /* ---------- Navegación ----------
     El menú, el cajón móvil y el pie anterior/siguiente los inyecta
     js/shell.js a partir de js/routes.js. Aquí ya no hay resaltado por
     desplazamiento: cada sección es su propia ruta y la marca activa la
     decide la página, no la posición del scroll. */
  const ROOT=SEMANAS.ROOT, HERE=SEMANAS.HERE;
  const hrefRef=n=>(SEMANAS.SINGLE||HERE==="fuentes"?"":ROOT+"fuentes/")+"#ref-"+n;

  /* ---------- Visor de PDF dentro de la aplicación ----------
     Las fuentes en PDF se previsualizan aquí, abiertas en la página exacta
     que sustenta el dato (SEMANAS.PDFPAGES, o data-page en la propia cita).
     Siempre queda a la vista el botón que lleva a la fuente original, y si
     el servidor bloquea el embebido se muestra la salida alterna. */
  /* Algunos servidores entregan el PDF sin extensión en la URL (el CARF, por
     ejemplo, usa «?download=true»), así que tener mapa de páginas también cuenta. */
  const isPDF=(u,k)=>!!(k&&((SEMANAS.PDFPAGES||{})[k]||(SEMANAS.PDFLOCAL||{})[k])) || (!!u&&/\.pdf($|[?#])/i.test(u));
  /* Copia guardada en pdf/: es la que se muestra en el visor. */
  const pdfLocal=k=>{ const l=(SEMANAS.PDFLOCAL||{})[k]; return l?ROOT+l:null; };
  const pdfMap=k=>(SEMANAS.PDFPAGES||{})[k]||null;
  function pdfPage(k,override){
    if(override) return parseInt(override,10)||1;
    const m=pdfMap(k); return m&&m.def?m.def:1;
  }
  function pdfPageNote(k,page){
    const m=pdfMap(k); if(!m||!m.pages) return "";
    const hit=m.pages.find(x=>x.p===page); return hit?hit.d:"";
  }
  let pdfTimer=null, pdfOrigin=null, articleOrigin=null;
  function topLayer(){return $("#pdfview.open")||$("#gloss.open")||$("#modal.open");}
  function syncLayers(){
    const pdf=$("#pdfview.open"), gloss=$("#gloss.open"), art=$("#modal.open");
    document.body.classList.toggle("law-modal-open",!!art);
    [$("main"),$("#shell")].filter(Boolean).forEach(el=>{el.inert=!!(pdf||gloss||art);});
    if($("#modal")){ $("#modal").inert=!!(pdf||gloss); $("#modal").setAttribute("aria-hidden",String(!art||!!(pdf||gloss))); }
    if($("#gloss")){ $("#gloss").inert=!!pdf; $("#gloss").setAttribute("aria-modal",String(!!gloss&&!pdf)); }
  }
  function closeArt(){
    const m=$("#modal"); if(!m?.classList.contains("open")) return;
    m.classList.remove("open"); syncLayers();
    if(articleOrigin?.isConnected) articleOrigin.focus({preventScroll:true});
    articleOrigin=null;
  }
  function openPDF(k,page){
    const n=SRC[k]; if(!n) return; const src=SEMANAS.SOURCES[n-1]; if(!src||!src.u) return;
    const view=$("#pdfview"); if(!view) return;
    page=page||pdfPage(k);
    const frame=$("#pdf-frame"), fb=$("#pdf-fallback");
    const plain=src.t.replace(/<[^>]+>/g,"");
    setHTML("pdf-title",plain.length>120?plain.slice(0,120)+"…":plain);
    const go=p=>{
      const ext=src.u+"#page="+p;
      $("#pdf-open").href=ext; $("#pdf-fallback-open").href=ext;
      $("#pdf-kicker").textContent="Vista previa · página "+p;
      setHTML("pdf-note",pdfPageNote(k,p));
      fb.classList.remove("show");
      clearTimeout(pdfTimer); let ok=false;
      frame.onload=()=>{ ok=true; fb.classList.remove("show"); };
      /* Primero la copia local; la URL original queda en el botón «Abrir fuente». */
      frame.src=(pdfLocal(k)||src.u)+"#page="+p+"&view=FitH";
      /* Si el documento no llega, el visor no puede quedarse en negro. */
      pdfTimer=setTimeout(()=>{ if(!ok) fb.classList.add("show"); },4500);
      $$("#pdf-pages button").forEach(b=>b.classList.toggle("active",+b.dataset.p===p));
    };
    const m=pdfMap(k);
    setHTML("pdf-pages", m&&m.pages&&m.pages.length>1
      ? '<span>Páginas citadas</span>'+m.pages.map(x=>`<button data-p="${x.p}" title="${x.d.replace(/"/g,"&quot;")}">p. ${x.p}</button>`).join("")
      : "");
    $$("#pdf-pages button").forEach(b=>b.onclick=()=>go(+b.dataset.p));
    pdfOrigin=document.activeElement;
    view.classList.add("open"); document.body.style.overflow="hidden"; go(page); syncLayers();
    $("#pdf-close").focus();
  }
  function closePDF(){
    const view=$("#pdfview"); if(!view||!view.classList.contains("open")) return;
    clearTimeout(pdfTimer); view.classList.remove("open");
    $("#pdf-frame").src="about:blank"; document.body.style.overflow=""; syncLayers();
    if(pdfOrigin?.isConnected) pdfOrigin.focus({preventScroll:true}); pdfOrigin=null;
  }
  function pdfWire(){
    on("pdf-close","click",closePDF);
    const v=$("#pdfview"); if(v) v.addEventListener("click",e=>{ if(e.target===v) closePDF(); });
  }

  /* ---------- Citas: numeración y ficha en el cajón ----------
     Antes la referencia aparecía en un flotante al pasar el cursor. Ahora
     se hace clic y se abre el mismo cajón lateral del glosario con la
     ficha completa: qué documento es, qué página o artículo sustenta el
     dato, la vista previa del PDF y el enlace a la fuente original. */
  function fichaCita(k, pageOverride, origen){
    const n=SRC[k]; if(!n) return null; const s=SEMANAS.SOURCES[n-1];
    let host=""; try{ host=new URL(s.u).hostname.replace("www.",""); }catch(e){}
    const pdf=isPDF(s.u,k), page=pdf?pdfPage(k,pageOverride):0, note=pdf?pdfPageNote(k,page):"";
    const m=pdfMap(k);
    const href=pdf?(s.u+"#page="+page):s.u;
    const paginas=(m&&m.pages&&m.pages.length)
      ? `<div class="cita-paginas"><h4>Páginas citadas en el observatorio</h4><ul class="cita-lista">${
          m.pages.map(x=>`<li><button data-pdfpage="${x.p}"${x.p===page?' class="es"':""}><span class="pg">p. ${x.p}</span><span>${x.d}</span></button></li>`).join("")
        }</ul></div>` : "";
    const legal=(SEMANAS.LEGAL_SOURCES||{})[k];
    const art=+(origen?.dataset.article||origen?.closest("#modal")?.dataset.article||0);
    const analysis=SEMANAS.ANALISIS?.[art];
    const locator=origen?.dataset.locator||legal?.ubicacion;
    let sourceUse=analysis?.s, sourceReason=analysis?.f;
    if(analysis){
      if(k==='ley2381'||k==='ley2381pdf') sourceUse=analysis.l;
      else if(k==='constitucion'){ sourceUse=analysis.c; sourceReason='Los derechos y principios constitucionales delimitan la lectura de la ley. '+analysis.f; }
      else if(k==='codcivil'){ sourceUse=SEMANAS.LEGAL_METHOD.literal+' '+analysis.l; sourceReason='El contexto y las conexiones evitan aislar una frase del artículo. '+analysis.s; }
      else if(k==='c054'){ sourceUse=SEMANAS.LEGAL_METHOD.constitucional; sourceReason='Aplicamos ese criterio como límite interpretativo, no como una decisión sobre la Ley 2381. '+analysis.c; }
      else if(k==='camara264'||k==='c264'){ sourceUse='Documenta el estado judicial reportado que puede afectar la aplicación temporal del artículo '+art+'. No sustenta por sí misma la interpretación material de sus requisitos.'; sourceReason='Separamos el anuncio institucional de la parte resolutiva íntegra: sin cotejar esta última no se puede asegurar el alcance individual, las excepciones ni los razonamientos del fallo.'; }
      else if(legal){ sourceUse=legal.uso+' '+analysis.s; sourceReason='La remisión o el antecedente se usa dentro de su alcance, junto con el artículo '+art+'. '+legal.limite; }
    }
    const context=analysis?`<div class="law-source-context"><h4>En el artículo ${art}: ${escapeHTML(analysis.q)}</h4><p><b>Cómo se usa aquí.</b> ${escapeHTML(sourceUse)}</p><p><b>Por qué se interpreta así.</b> ${escapeHTML(sourceReason)}</p><p class="small">Lectura editorial. La fuente sustenta la regla o el criterio indicado; no se atribuye a ella toda la conclusión de la plataforma.</p></div>`:"";
    const legalHTML=legal?`<dl class="law-source-meta"><div><dt>Tipo de documento</dt><dd>${escapeHTML(legal.tipo)}</dd></div><div><dt>Dónde consultar</dt><dd>${escapeHTML(locator)}</dd></div><div><dt>Qué sustenta</dt><dd>${escapeHTML(legal.uso)}</dd></div></dl>${context}<p class="law-source-warning"><b>Alcance de esta fuente.</b> ${escapeHTML(legal.limite)}</p>`:(locator?`<p><b>Dónde consultar:</b> ${escapeHTML(locator)}</p>`:"");
    return {
      n, s, pdf, page, href,
      html: `<div class="cita-ficha">
        <p class="cita-texto">${s.t}</p>
        ${legalHTML}
        ${pdf?`<p class="cita-loc"><b>Dónde está el dato:</b> página ${page}${note?" — "+note:""}${pdfLocal(k)?"":" <span class=\"muted\">(vista previa desde el servidor original)</span>"}</p>`:""}
        ${host?`<p class="cita-host">${host}</p>`:""}
        <div class="cita-acciones">
          ${pdf?`<button class="btn sm" data-pdfk="${k}" data-pdfp="${page}">Ver el PDF aquí</button>`:""}
          ${s.u?`<a class="btn sm ghost" href="${href}" target="_blank" rel="noopener">Abrir fuente original ↗</a>`:""}
          <a class="btn sm ghost" href="${hrefRef(n)}" data-goto="${n}">Ver en bibliografía</a>
        </div>
        ${paginas}
      </div>`
    };
  }
  function abrirCita(k, pageOverride, origen){
    const f=fichaCita(k,pageOverride,origen); if(!f||!SEMANAS.panel) return;
    const title=document.createElement("div"); title.innerHTML=f.s.t;
    SEMANAS.panel.abrir({kicker:"Referencia ["+f.n+"]", titulo:title.querySelector("b")?.textContent||"Fuente "+f.n, html:f.html, origen});
    const cuerpo=$("#gloss-body");
    $$("[data-pdfk]",cuerpo).forEach(b=>b.onclick=()=>openPDF(k,+b.dataset.pdfp||undefined));
    $$("[data-pdfpage]",cuerpo).forEach(b=>b.onclick=()=>abrirCita(k,b.dataset.pdfpage,origen));
    const g=$("[data-goto]",cuerpo); if(g) g.onclick=e=>{ const li=document.getElementById("ref-"+f.n); if(!li) return;
      e.preventDefault(); SEMANAS.panel.cerrar(); closeArt(); li.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"}); li.setAttribute("tabindex","-1"); li.focus({preventScroll:true}); li.classList.add("flash"); setTimeout(()=>li.classList.remove("flash"),2500); };
    $$(".cite.on").forEach(x=>x.classList.remove("on")); if(origen) origen.classList.add("on");
  }
  SEMANAS.abrirCita=abrirCita;
  function renderCites(){
    $$(".cite[data-ref]").forEach(a=>{ const k=a.dataset.ref; const n=SRC[k]; if(n){ a.textContent="["+n+"]"; a.href=hrefRef(n); a.setAttribute("aria-label","Referencia "+n+": ver la fuente"); a.setAttribute("role","button"); a.setAttribute("tabindex","0"); if(isPDF(SEMANAS.SOURCES[n-1].u,SEMANAS.SOURCES[n-1].k)) a.classList.add("pdf"); if(!a._wired){ a._wired=true;
      a.addEventListener("click",e=>{ e.preventDefault(); abrirCita(k,a.dataset.page,a); });
      a.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); abrirCita(k,a.dataset.page,a); } }); } } });
    const ol=$("#refs"); if(ol&&!ol.children.length){ ol.innerHTML=SEMANAS.SOURCES.map((s,i)=>{
      const pv=isPDF(s.u,s.k)?` <button class="pdfbtn" data-pdfk="${s.k}">Previsualizar PDF</button>`:"";
      return `<li id="ref-${i+1}">${s.t}${s.u?` <br><a href="${s.u}" target="_blank" rel="noopener">${s.u}</a>`:""}${pv}</li>`;
    }).join("");
      $$("#refs .pdfbtn").forEach(b=>b.onclick=()=>openPDF(b.dataset.pdfk)); }
  }
  document.addEventListener("keydown",e=>{
    const layer=topLayer();
    if(e.key==="Escape"){
      e.preventDefault(); e.stopImmediatePropagation();
      if(layer?.id==="pdfview") closePDF(); else if(layer?.id==="gloss") SEMANAS.panel?.cerrar(); else if(layer?.id==="modal") closeArt(); else $("#drawer")?.classList.remove("open");
    }
    if(e.key==="Tab"&&layer){
      const focusable=$$('a[href],button:not([disabled]),input,select,summary,[tabindex="0"]',layer).filter(el=>el.getClientRects().length&&!el.closest('[hidden],[inert]'));
      const first=focusable[0],last=focusable.at(-1); if(!first) return;
      if(e.shiftKey&&(document.activeElement===first||!layer.contains(document.activeElement))){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&(document.activeElement===last||!layer.contains(document.activeElement))){e.preventDefault();first.focus();}
    }
  },true);

  /* ---------- Animaciones ---------- */
  function reveal(){ const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); if(e.target.dataset.count) countUp(e.target); } }); },{threshold:.1}); $$(".reveal").forEach(el=>io.observe(el)); $$("[data-count]").forEach(el=>io.observe(el)); }
  function countUp(el){ const end=parseFloat(el.dataset.count); const dec=parseInt(el.dataset.dec||"0"); const suf=el.dataset.suffix||""; const pre=el.dataset.prefix||""; const t0=performance.now(); const step=t=>{ const p=Math.min(1,(t-t0)/1400); el.textContent=pre+NUM(end*(1-Math.pow(1-p,3)),dec)+suf; if(p<1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
  function tabs(){ $$(".tabs").forEach(t=>{ const btns=$$("button",t); btns.forEach(b=>b.addEventListener("click",()=>{ btns.forEach(x=>x.classList.remove("active")); b.classList.add("active"); $$(".tabpanel",t.parentElement).forEach(p=>p.classList.toggle("active",p.dataset.tab===b.dataset.tab)); window.dispatchEvent(new Event("resize")); })); }); }

  /* Hero: 1.300 semanas que se van llenando (canvas).
     Repinta ante cualquier cambio de tamaño (rotar el celular, colapso de la barra
     de direcciones) y al volver a primer plano, para que nunca quede en blanco. */
  function heroCanvas(){
    const c=$("#hero-canvas"); if(!c||!c.getContext) return; const ctx=c.getContext("2d");
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cols=50, rows=26, total=cols*rows;
    let W=0, Hh=0, progreso=reduced?total:0, t0=null, raf=null;
    function size(){ const r=c.parentElement.getBoundingClientRect(); const dpr=Math.min(window.devicePixelRatio||1,2);
      const w=Math.round(r.width*dpr), h=Math.round(r.height*dpr); if(!w||!h||(w===W&&h===Hh)) return false; W=c.width=w; Hh=c.height=h; return true; }
    function paint(){ if(!W||!Hh) return; const th=Charts.theme(); ctx.clearRect(0,0,W,Hh);
      const pad=W*0.09, gw=(W-2*pad)/cols, gh=(Hh-2*pad)/rows, rr=Math.min(gw,gh)*0.32;
      for(let i=0;i<total;i++){ const x=pad+(i%cols)*gw+gw/2, y=pad+Math.floor(i/cols)*gh+gh/2;
        let col="rgba(255,255,255,.10)"; if(i<progreso){ const band=i/total; col= band<0.58? th.pal[0] : band<0.77? th.pal[2] : th.pal[1]; }
        ctx.fillStyle=col; ctx.beginPath(); ctx.arc(x,y,rr,0,Math.PI*2); ctx.fill(); }
      ctx.textAlign="left"; ctx.fillStyle="#fff"; ctx.font=`900 ${Math.round(W*0.075)}px Archivo, sans-serif`;
      ctx.fillText(Math.round(Math.min(1300, progreso/total*1300)).toLocaleString("es-CO"), pad, Hh-pad*1.7);
      ctx.font=`700 ${Math.round(W*0.022)}px Archivo, sans-serif`; ctx.fillStyle="rgba(255,255,255,.7)";
      ctx.fillText("SEMANAS COTIZADAS · 57 M / 62 H", pad, Hh-pad*1.15); }
    let cuadros=0;
    function frame(t){ cuadros++; if(t0===null) t0=t; progreso=Math.min(total,(t-t0)/1000*140); paint();
      if(progreso<total) raf=requestAnimationFrame(frame); else raf=null; }
    function arrancar(){ if(reduced||raf!==null||progreso>=total) return; t0=null; raf=requestAnimationFrame(frame); }
    size(); paint(); arrancar();
    /* Cualquier cambio de tamaño reinicia el lienzo, así que siempre hay que repintar:
       si la animación sigue corriendo, ella volverá a pintar en su siguiente cuadro. */
    const repintar=()=>{ if(size()) paint(); };
    window.addEventListener("resize",repintar);
    window.addEventListener("orientationchange",()=>setTimeout(()=>{ size(); paint(); },200));
    document.addEventListener("visibilitychange",()=>{ if(!document.hidden){ size(); paint(); arrancar(); } });
    if(window.ResizeObserver) new ResizeObserver(repintar).observe(c.parentElement);
    /* Si el navegador congela la animación (pestaña en segundo plano), mostrar el estado final. */
    setTimeout(()=>{ if(cuadros===0){ if(raf) cancelAnimationFrame(raf); raf=null; progreso=total; paint(); } },2500);
  }

  /* ---------- Línea de tiempo ---------- */
  function timeline(){ const c=$("#timeline"); if(!c) return; const render=f=>{ c.innerHTML=SEMANAS.TIMELINE.filter(i=>f==="all"||i.c===f).map(i=>`<div class="tl-item ${i.major?"major":""}"><div class="y">${i.y}</div><h3>${i.t}</h3><p>${i.d}${i.s?" "+cite(i.s):""}</p></div>`).join(""); renderCites(); }; render("all"); $$("#tl-filter button").forEach(b=>b.addEventListener("click",()=>{ $$("#tl-filter button").forEach(x=>x.classList.remove("active")); b.classList.add("active"); render(b.dataset.f); })); }

  /* ---------- Pilares ---------- */
  const PILLAR_TEXT={
    solidario:`<b>Pilar Solidario (art. 17).</b> Renta Básica Solidaria para personas de 65 años (hombres) y 60 (mujeres) —o 55/50 con pérdida de capacidad laboral ≥ 50 %— en pobreza extrema, pobreza o vulnerabilidad, sin pensión y con 10 años de residencia. Monto: línea de pobreza extrema indexada ($230.000 en 2026; Colombia Mayor pagaba $80.000). Financiado con el Presupuesto General de la Nación y la subcuenta de subsistencia; costo estimado por el CARF de 0,3 % del PIB (≈ $4,8 billones). No es una pensión. ${cite("ley2381")} ${cite("carf24")} ${cite("pilarSol")}`,
    semicontributivo:`<b>Pilar Semicontributivo (art. 18).</b> Para quienes a los 65/60 años tengan entre 300 y menos de 1.000 semanas (hombres: menos de 1.300 desde 2036). Renta Vitalicia con las cotizaciones al componente de prima media traídas a valor presente con IPC, más 3 % efectivo anual y subsidio de 20 % (H) / 30 % (M) si no son elegibles al Pilar Solidario, más el saldo de la cuenta individual. Tope 80 % del salario mínimo; no heredable ni sustituible. Hasta 299 semanas se mantiene la indemnización sustitutiva / devolución de saldos. Costo CARF: 0,2 %–0,8 % del PIB (VPN 35,6 %). ${cite("ley2381")} ${cite("carf24")}`,
    contributivo:`<b>Pilar Contributivo (arts. 19–34).</b> Dos componentes articulados: <b>Prima Media</b> en Colpensiones, obligatorio para todos sobre ingresos de 1 a 2,3 SMLMV, con tasa de reemplazo r = 65,5 − 0,5·s (+1,5 % por cada 50 semanas adicionales, máximo 80 %), 1.300 semanas (mujeres: bajando a 1.000 en 2036) y 57/62 años; y <b>Complementario de Ahorro Individual</b> (CCAI) sobre el exceso hasta 25 SMLMV, en fondos generacionales, convertido al retiro en anualidad vitalicia. Colpensiones integra y paga una sola Pensión Integral de Vejez. El excedente de cotizaciones va al Fondo de Ahorro del Pilar Contributivo (art. 24) en el Banco de la República. ${cite("ley2381")} ${cite("oit25")}`,
    voluntario:`<b>Pilar de Ahorro Voluntario (art. 3).</b> Aportes voluntarios a través de los mecanismos del sistema financiero (fondos de pensiones voluntarias, AFC, seguros), con los beneficios tributarios del Estatuto Tributario. Sin cambios sustanciales frente al régimen anterior. ${cite("ley2381")}`};
  function pillars(){ const det=$("#pillar-detail"); $$(".pillar").forEach(p=>p.addEventListener("click",()=>{ $$(".pillar").forEach(x=>x.classList.remove("active")); p.classList.add("active"); det.innerHTML=PILLAR_TEXT[p.dataset.p]; renderCites(); })); if(det){ det.innerHTML=PILLAR_TEXT.contributivo; $(".pillar[data-p=contributivo]")?.classList.add("active"); } }

  /* ---------- Artículos ---------- */
  const ST={ex:["Aval de trámite reportado","ok"],dev:["Devolución reportada","bad"],parc:["Aparte pendiente reportado","warn"],cond:["Vigencia condicionada reportada","purple"]};
  const PL={general:"General",solidario:"Pilar Solidario",semicontributivo:"Semicontributivo",contributivo:"Contributivo",ccai:"Ahorro individual (CCAI)",fondo:"Fondo de Ahorro (BanRep)",transicion:"Transición",beneficios:"Beneficios especiales",invalidez:"Invalidez",sobrevivientes:"Sobrevivientes",institucional:"Institucional",tributario:"Tributario"};
  /* ---------- Artículo por artículo ----------
     La cuadrícula de siempre, ahora paginada de diez en diez para que la
     sección no se coma la pantalla. Al hacer clic, el detalle se abre en la
     ventana: la interpretación en palabras sencillas y, al lado, el texto
     exacto tal como lo publica Función Pública (SEMANAS.LEYTEXTO). */
  const POR_PAGINA=10;
  function articulos(){
    const list=$("#art-list"); if(!list) return;
    const sel=$("#art-filter"), st=$("#art-status"), q=$("#art-search"), pag=$("#art-pages");
    const TX=SEMANAS.LEYTEXTO||{};
    sel.innerHTML=`<option value="all">Todos los temas</option>`+Object.keys(PL).map(k=>`<option value="${k}">${PL[k]}</option>`).join("");
    let pagina=1;

    const normalize=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
    const filtrados=()=>{ const f=sel.value,s=st.value,qq=normalize(q.value||"");
      return SEMANAS.ARTICULOS.filter(a=>(f==="all"||a.p===f)&&(s==="all"||a.st===s)&&
        (!qq||normalize(a.t+" "+a.s+" "+a.n+" "+((TX[a.n]||{}).x||"")+" "+(SEMANAS.LECTURA_CLARA?.[a.n]||'')+" "+Object.values(SEMANAS.ANALISIS?.[a.n]||{}).join(" ")).includes(qq))); };

    const render=()=>{
      const items=filtrados(); const total=Math.max(1,Math.ceil(items.length/POR_PAGINA));
      if(pagina>total) pagina=total;
      $("#art-count").textContent=items.length+" artículos";
      const desde=(pagina-1)*POR_PAGINA;
      const pagina_items=items.slice(desde,desde+POR_PAGINA);
      list.innerHTML=pagina_items.map(a=>`<div class="art" data-n="${a.n}" tabindex="0" role="button"><div class="n">ART. ${a.n}</div><div class="t">${a.t}</div><div class="p">${escapeHTML(SEMANAS.LECTURA_CLARA?.[a.n]||a.s)}</div><div class="tags"><span class="tag">${PL[a.p]}</span><span class="tag ${ST[a.st][1]}">${ST[a.st][0]}</span></div></div>`).join("")
        || `<p class="art-sin">Ningún artículo coincide con la búsqueda.</p>`;
      $$(".art",list).forEach(el=>{ el.addEventListener("click",()=>openArt(+el.dataset.n));
        el.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openArt(+el.dataset.n); } }); });
      pintarPaginas(total,desde,items.length);
    };

    function pintarPaginas(total,desde,cuantos){
      if(!pag) return;
      if(total<=1){ pag.innerHTML=""; return; }
      const btn=(n,l,dis,act)=>`<button class="pg${act?" es":""}" data-p="${n}"${dis?" disabled":""}>${l}</button>`;
      const nums=[]; for(let i=1;i<=total;i++){ if(i===1||i===total||Math.abs(i-pagina)<=1) nums.push(i); else if(nums[nums.length-1]!=="…") nums.push("…"); }
      pag.innerHTML=btn(pagina-1,"← Anterior",pagina===1)+
        `<span class="pg-nums">${nums.map(x=>x==="…"?`<span class="pg-dots">…</span>`:btn(x,x,false,x===pagina)).join("")}</span>`+
        btn(pagina+1,"Siguiente →",pagina===total)+
        `<span class="pg-info">Página ${pagina} de ${total} · artículos ${desde+1}–${Math.min(desde+POR_PAGINA,cuantos)}</span>`;
      $$("button.pg",pag).forEach(b=>b.addEventListener("click",()=>{ pagina=+b.dataset.p; render(); $("#ley")?.scrollIntoView({block:"start",behavior:"smooth"}); }));
    }

    [sel,st].forEach(e=>e.addEventListener("change",()=>{ pagina=1; render(); }));
    q.addEventListener("input",()=>{ pagina=1; render(); });
    render();
  }

  /* El texto oficial del artículo, tal cual se publicó. */
  function textoOficial(n){
    const t=(SEMANAS.LEYTEXTO||{})[n];
    if(!t) return `<p class="art-sin">El texto de este artículo no aparece con su encabezado en la publicación de Función Pública que se transcribió. Consúltelo en la fuente oficial: ${cite("ley2381")}</p>`;
    return (t.h?`<p class="art-h">Artículo ${n}. ${escapeHTML(t.h)}.</p>`:"")+t.x.split("\n").map(x=>`<p>${escapeHTML(x)}</p>`).join("");
  }

  function openArt(n){
    const a=SEMANAS.ARTICULOS.find(x=>x.n===n); if(!a) return;
    const m=$("#modal");
    const d=SEMANAS.ANALISIS?.[n];
    if(!m.classList.contains("open")) articleOrigin=document.activeElement;
    m.classList.add("law-dialog"); m.dataset.article=n; m.setAttribute("aria-labelledby","art-title");
    const ref=(k,loc)=>lawCite(k,loc,n);
    const related=d?`<div class="law-related" aria-label="Artículos relacionados">${d.r.map(x=>`<button class="btn sm ghost" data-open-art="${x}">Art. ${x} · ${escapeHTML(SEMANAS.ARTICULOS.find(a=>a.n===x)?.t||"")}</button>`).join("")}</div>`:"";
    const block=(label,title,text,refs="")=>`<section class="law-analysis-block"><span class="law-analysis-label">${label}</span><h4>${title}</h4><p>${escapeHTML(text)} ${refs}</p></section>`;
    const keys=d?[...new Set(['ley2381',...d.k,'codcivil','c054','constitucion','camara264'])]:['ley2381'];
    const sourceList=keys.map(k=>{const meta=SEMANAS.LEGAL_SOURCES?.[k],source=SEMANAS.SOURCES[SRC[k]-1];return `<article class="law-source-entry"><h4>${source?.t.match(/<b>(.*?)<\/b>/)?.[1]||escapeHTML(k)} ${ref(k,k==='ley2381'?`Artículo ${n}; conexiones con arts. ${d?.r.join(', ')}`:meta?.ubicacion)}</h4><p><b>Qué consultamos.</b> ${escapeHTML(k==='ley2381'?`Artículo ${n} y disposiciones relacionadas: ${d?.r.join(', ')}.`:meta?.ubicacion||'Disposición citada.')}</p><p><b>Cómo se usa.</b> ${escapeHTML(meta?.uso||'Antecedente o remisión del artículo.')}</p><p class="small"><b>Alcance.</b> ${escapeHTML(meta?.limite||'Consultar versión y vigencia aplicables.')}</p></article>`;}).join('');
    const tab=(id,label)=>`<button type="button" role="tab" id="law-tab-${id}" aria-controls="law-panel-${id}" aria-selected="${id==='entender'}" tabindex="${id==='entender'?0:-1}" data-law-tab="${id}">${label}</button>`;
    const pane=(id,html)=>`<div class="law-tabpanel" role="tabpanel" id="law-panel-${id}" aria-labelledby="law-tab-${id}" tabindex="0"${id==='entender'?'':' hidden'}>${html}</div>`;
    const detail=d?`
      <div class="law-tabs" role="tablist" aria-label="Lecturas del artículo ${n}">${tab('entender','Entenderlo')}${tab('interpretar','Interpretación jurídica')}${tab('aplicar','En la práctica')}${tab('fuentes','Fuentes y método')}</div>
      ${pane('entender',`<p class="law-question">${escapeHTML(d.q)}</p><div class="law-plain"><span class="law-analysis-label">En palabras sencillas</span><p>${escapeHTML(SEMANAS.LECTURA_CLARA?.[n]||d.l)} ${ref('ley2381',`Artículo ${n}`)}</p></div>${block('Para llevarlo a un caso','Qué habría que revisar',d.v)}<div class="law-example"><h4>Un ejemplo</h4><p>${escapeHTML(d.e)}</p></div><p class="small muted">Esta es la primera explicación. En «Interpretación jurídica» encontrará el análisis detallado. En «Fuentes y método» explicamos qué documentos usamos y qué falta comprobar sobre su aplicación.</p>`)}
      ${pane('interpretar',`${block('01 · Literal y técnica','La regla y sus condiciones',d.l,ref('ley2381',`Artículo ${n}`)+ref('codcivil','Artículos 27–29'))}${block('02 · Sistemática','Cómo encaja con otras normas',d.s,ref('ley2381',`Artículos ${n}, ${d.r.join(', ')}`))}${related}${block('03 · Finalista','Por qué sostenemos esta lectura',d.f,ref('codcivil','Artículo 27'))}${block('04 · Constitucional y límites','Qué no permite concluir el artículo',d.c,ref('constitucion','Parámetros constitucionales pertinentes: arts. 4, 13, 29, 48 y 53')+ref('c054'))}${block('05 · Antecedentes y precedentes','Cómo usamos otras leyes y sentencias',SEMANAS.LEGAL_METHOD.historico,d.k.map(k=>ref(k)).join(' '))}${block('06 · Aplicación en el tiempo','Texto, vigencia y estado procesal',SEMANAS.LEGAL_METHOD.temporal,ref('camara264'))}`)}
      ${pane('aplicar',`<div class="law-example"><span class="law-analysis-label">Caso hipotético · no es una liquidación</span><h4>Un ejemplo para entenderlo</h4><p>${escapeHTML(d.e)}</p></div>${block('Aplicación al caso','Qué habría que comprobar',d.v)}${block('Límite de la conclusión','El punto que requiere especial cuidado',d.c)}<p class="small">El ejemplo supone que el artículo resulta aplicable. Para determinarlo se necesitan hechos, documentos, régimen y fecha; las dudas de la ficha no se resuelven inventando una regla.</p>${related}`)}
      ${pane('fuentes',`<p><b>Trazabilidad del análisis.</b> Cada referencia explica qué documento es, dónde consultar y qué sustenta. Al abrirla, la ficha se muestra sobre este artículo y conserva el punto de lectura.</p><div class="law-source-warning"><b>Estado individual reportado:</b> ${ST[a.st][0]}. La clasificación proviene del catálogo previo del observatorio; falta cotejar su alcance exacto con la parte resolutiva accesible de C-264/26. La comunicación de la Cámara solo permite corroborar el anuncio general. ${ref('camara264')}</div>${sourceList}<details class="law-official"><summary>El método de lectura, explicado</summary><div class="law-official-content">${Object.values(SEMANAS.LEGAL_METHOD).map(t=>`<p>${escapeHTML(t)}</p>`).join('')}<p>Revisión editorial: 7 de septiembre de 2026. Los ejemplos y las conclusiones pertenecen a SEMANAS; no se presentan como interpretación vinculante de una autoridad.</p></div></details>`)}
    `:`<p>${escapeHTML(a.s)}</p>`;
    $("#modal-body").innerHTML=`
      <div class="meta"><span>Ley 2381 de 2024 · Artículo ${a.n}</span><span class="tag">${PL[a.p]}</span><span class="tag ${ST[a.st][1]}">${ST[a.st][0]}</span></div>
      <h3 id="art-title">${escapeHTML(a.t)}</h3>
      ${detail}
      <details class="law-official"><summary>Texto exacto del artículo ${n}</summary><div class="law-official-content"><p class="law-official-note">Transcripción de la versión de 2024 publicada por Función Pública; conserva erratas y remisiones. El artículo 93 se recuperó cotejando la copia SUIN/OIT. Para contrastar el documento y su presentación original, abra la referencia. ${ref(n===93?'ley2381pdf':'ley2381',`Artículo ${n}`)} ${SEMANAS.LEYPAGES?.[n]?`<button class="pdfbtn" data-law-pdf="${SEMANAS.LEYPAGES[n]}">Ver art. ${n} en PDF · p. ${SEMANAS.LEYPAGES[n]}</button>`:''}</p>${textoOficial(n)}</div></details>
      <nav class="law-article-nav" aria-label="Navegar entre artículos"><button class="btn sm ghost" id="art-prev"${n===1?' disabled':''}>← Artículo ${Math.max(1,n-1)}</button><button class="btn sm" id="art-next"${n===95?' disabled':''}>Artículo ${Math.min(95,n+1)} →</button></nav>`;
    m.classList.add("open"); syncLayers(); renderCites(); linkLawMentions($("#modal-body"));
    $("#modal-body").scrollTop=0;
    $("#art-prev").onclick=()=>openArt(Math.max(1,n-1));
    $("#art-next").onclick=()=>openArt(Math.min(95,n+1));
    $$('[data-open-art]',m).forEach(b=>b.onclick=()=>openArt(+b.dataset.openArt));
    $$('[data-law-pdf]',m).forEach(b=>b.onclick=()=>openPDF('ley2381pdf',+b.dataset.lawPdf));
    const tabs=$$('[data-law-tab]',m);
    const selectTab=b=>{tabs.forEach(t=>{const active=t===b;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});};
    tabs.forEach((b,i)=>{b.onclick=()=>selectTab(b); b.onkeydown=e=>{let next;if(e.key==='ArrowRight') next=(i+1)%tabs.length;else if(e.key==='ArrowLeft') next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home') next=0;else if(e.key==='End') next=tabs.length-1;else return;e.preventDefault();selectTab(tabs[next]);tabs[next].focus();};});
    $("#modal-close").focus({preventScroll:true});
  }
  function modal(){ const m=$("#modal"); if(!m) return; $("#modal-close").addEventListener("click",closeArt); m.addEventListener("click",e=>{ if(e.target===m) closeArt(); }); }

  /* ---------- Series históricas ---------- */
  function series(){
    const P=T(); const yrs=(arr)=>arr.map(x=>String(x[0])); const vals=(arr)=>arr.map(x=>x[1]);
    if($("#h-pens")){ const years=[]; for(let y=2015;y<=2026;y++) years.push(y); const pens=years.map(y=>{ const r=H.colpPensionados.find(x=>x[0]===y); return r? r[1]/1e6:null; }); const afi=years.map(y=>{ const r=H.colpAfiliados.find(x=>x[0]===y); return r? r[1]/1e6:null; });
      Charts.dual($("#h-pens"),{labels:years.map(y=> y===2026?"jun-26":String(y)),left:{name:"Pensionados (millones)",values:pens,bars:true,color:P[0],format:v=>NUM(v,2)+" M",yMin:0},right:{name:"Afiliados (millones)",values:afi,color:P[1],format:v=>NUM(v,2)+" M",yMin:0,yMax:8},height:300}); }
    if($("#h-fondo")){ const rows=H.raisFondo; Charts.dual($("#h-fondo"),{labels:rows.map(r=> r[0]===2026?"abr-26":String(r[0])),left:{name:"Ahorro en AFP (billones)",values:rows.map(r=>r[1]),bars:true,color:P[2],format:v=>"$"+NUM(v)+" bn",yMin:0},right:{name:"% del PIB",values:rows.map(r=>r[1]/H.pib[r[0]]*100),color:P[1],format:v=>NUM(v,1)+" %",yMin:0,yMax:35},height:300}); }
    if($("#h-gasto")){ const g=H.gastoGNC; Charts.line($("#h-gasto"),{labels:yrs(g),series:[{name:"Gasto del Gobierno Central en pensiones (% PIB)",values:vals(g),color:P[0],area:true}],yFormat:v=>NUM(v,1)+" %",yMin:0,yMax:5,annotations:[{i:5,text:"AL 01/2005"},{i:18,text:"Gob. general 2018: 4,4 %"}],height:280}); }
    if($("#h-cob")){ const c=H.coberturaActivos; Charts.line($("#h-cob"),{labels:yrs(c),series:[{name:"Afiliados activos / PEA (%)",values:vals(c),color:P[2]}],yFormat:"pct",yMin:20,yMax:45,height:260}); }
    if($("#h-smmlv")){ const ys=Object.keys(D.smmlv).map(Number).filter(y=>y>=1994); const real=ys.map(y=>Models.aReal(D.smmlv[y],y)/1e6); const nom=ys.map(y=>D.smmlv[y]/1e6); Charts.line($("#h-smmlv"),{labels:ys.map(String),series:[{name:"SMMLV en pesos de 2026 (millones)",values:real,color:P[0]},{name:"SMMLV nominal (millones)",values:nom,color:P[1],dashed:true}],yFormat:v=>"$"+NUM(v,2)+" M",yMin:0,dots:false,annotations:[{i:ys.indexOf(2026),text:"+23 % (2026)"}],height:280}); }
    if($("#h-mesadas")){ const md=H.mesadas2020; Charts.bar($("#h-mesadas"),{categories:md.map(x=>x.l),series:[{name:"% de pensionados (2020)",values:md.map(x=>x.p),color:P[0]}],yFormat:"pct",valueLabels:true,height:280,margin:{b:46}}); }
    if($("#h-aportes")){ Charts.bar($("#h-aportes"),{categories:["2023 (ejecutado)","2024 (PGN)","2026 (PGN)"],series:[{name:"Aporte de la Nación a Colpensiones (billones)",values:[15.4,25.1,33.78],color:P[1]}],yFormat:v=>"$"+NUM(v,1)+" bn",valueLabels:true,height:260}); }
    if($("#h-ratio")){ const rows=[[2018,6702549,1328986],[2022,6772000,1570000],[2024,6897249,1747842],[2025,7129204,1864080],[2026,7244330,1928774]]; const pct={2018:0.42,2022:0.40,2024:0.384,2025:0.43,2026:0.418}; Charts.line($("#h-ratio"),{labels:rows.map(r=>r[0]===2026?"jun-26":String(r[0])),series:[{name:"Cotizantes activos por pensionado (Colpensiones)",values:rows.map(r=>r[1]*pct[r[0]]/r[2]),color:P[0]},{name:"Afiliados por pensionado",values:rows.map(r=>r[1]/r[2]),color:P[5],dashed:true}],yFormat:v=>NUM(v,2),yMin:0,yMax:6,height:260}); }
    const md=H.mesadas2020; const avg=md.reduce((a,x)=>a+x.p*x.m,0)/md.reduce((a,x)=>a+x.p,0); setHTML("h-mesada-avg", COP(avg)+" en 2020 ≈ "+COP(Models.aReal(avg,2020))+" de 2026");
  }

  /* ---------- Diagnóstico ---------- */
  function diagnostico(){ const P=T(); const cb=D.cobertura;
    if($("#ch-afiliados")) Charts.bar($("#ch-afiliados"),{categories:["Colpensiones (RPM) jun-26","Cotizantes activos RPM","AFP (RAIS) jun-26"],series:[{name:"Personas (millones)",values:[7.244,3.026,19.42],color:P[0]}],yFormat:v=>NUM(v,2)+" M",valueLabels:true,height:260,margin:{b:46}});
    if($("#ch-pensionados")) Charts.line($("#ch-pensionados"),{labels:["sep-25","dic-25","jun-26"],series:[{name:"Pensionados Colpensiones",values:[1.833,1.864,1.929],color:P[0],area:true}],yFormat:v=>NUM(v,3)+" M",yMin:1.7,yMax:2.0,height:240});
    if($("#ch-tipo")) Charts.donut($("#ch-tipo"),{items:[{label:"Vejez",value:74.2,color:P[0]},{label:"Sobrevivientes",value:21.0,color:P[1]},{label:"Invalidez",value:4.8,color:P[2]}],center:"1,93 M",centerLabel:"pensionados"});
    if($("#ch-rango")) Charts.donut($("#ch-rango"),{items:[{label:"1–2 SMMLV",value:79,color:P[0]},{label:"> 2 SMMLV",value:21,color:P[1]}],center:"79 %",centerLabel:"reciben ≤ 2 SMMLV"});
    if($("#ch-informalidad")) Charts.line($("#ch-informalidad"),{labels:cb.informalidad.map(x=>x.t),series:[{name:"Informalidad nacional",values:cb.informalidad.map(x=>x.v),color:P[0]},{name:"23 ciudades (abr-jun 26)",values:[null,null,null,null,41.9],color:P[2]},{name:"Rural (abr-jun 26)",values:[null,null,null,null,83.2],color:P[5]}],yFormat:"pct",yMin:30,yMax:90,height:260});
    if($("#ch-fiscal")) Charts.bar($("#ch-fiscal"),{categories:["Colpensiones","Regímenes exceptuados (FF.MM., Policía, Congreso, magisterio)","Regímenes en extinción (Cajanal, ISS, Telecom…)"],series:[{name:"PGN 2023 (billones COP)",values:[15.4,24.7,14.5],color:P[1]}],yFormat:v=>"$"+NUM(v,1)+" bn",valueLabels:true,height:280,margin:{b:60}});
    if($("#ch-vpn")) Charts.bar($("#ch-vpn"),{categories:["MinHacienda aval jun-2024 (2025–2100)","MFMP 2026 (pasivo pensional)"],series:[{name:"Sin reforma",values:[87.67,94.4],color:P[2]},{name:"Con reforma",values:[121.13,121.5],color:P[0]}],yFormat:v=>NUM(v,1)+" % PIB",valueLabels:true,height:280});
    if($("#ch-carf")){ const yrs=[2025,2030,2035,2040,2045,2050,2055,2060,2063,2065,2070,2080,2090,2100]; const nec=yrs.map(y=>y<=2065?3.0+1.9*(y-2025)/40:4.9); const tr=yrs.map(y=>y<=2062?1.3+0.15*(y-2025)/37:3.8); const fl=yrs.map(y=>y<=2051?0.6+0.6*(y-2025)/26:1.2-1.1*(y-2051)/49);
      Charts.line($("#ch-carf"),{labels:yrs.map(String),series:[{name:"Necesidades de Colpensiones",values:nec,color:P[0]},{name:"Transferencia de la Nación",values:tr,color:P[5]},{name:"Ingresos del Fondo de Ahorro",values:fl,color:P[2],dashed:true}],yFormat:v=>NUM(v,1)+" % PIB",annotations:[{i:8,text:"2062: agotamiento del fondo (CARF)"}],height:300}); }
    if($("#ch-demo")){ const rows=Models.proyectar({}); const lab=rows.filter(r=>r.y%5===0).map(r=>String(r.y)); Charts.line($("#ch-demo"),{labels:lab,series:[{name:"Población (millones, modelo)",values:rows.filter(r=>r.y%5===0).map(r=>r.total/1e6),color:P[0]},{name:"DANE PPED 2025 (anclas)",values:lab.map(l=>({2025:53.0,2045:56.0,2050:55.8,2070:50.5}[l]||null)),color:P[3],dashed:true}],yFormat:v=>NUM(v,1)+" M",yMin:44,yMax:60,height:280}); }
    if($("#ch-dep")){ const rows=Models.proyectar({}); const lab=rows.filter(r=>r.y%5===0).map(r=>String(r.y)); Charts.line($("#ch-dep"),{labels:lab,series:[{name:"Mayores de 65 (% población)",values:rows.filter(r=>r.y%5===0).map(r=>r.p65),color:P[0]},{name:"Dependencia de mayores (65+/15–64)",values:rows.filter(r=>r.y%5===0).map(r=>r.depMayores),color:P[2]},{name:"Trabajadores por cada mayor",values:rows.filter(r=>r.y%5===0).map(r=>r.trabajadoresPorMayor),color:P[6],dashed:true}],yFormat:v=>NUM(v,1),height:280}); }
    if($("#ch-piramide")) Charts.pyramid($("#ch-piramide"),{groups:Models.piramide(),format:v=>NUM(v,2)+" M",height:340});
    if($("#ch-oecd")) Charts.bar($("#ch-oecd"),{categories:["Gasto público en pensiones (% PIB)","65+ / población en edad de trabajar (%)","Esperanza de vida a los 65 (edad)"],series:[{name:"Colombia",values:[5.7,14.5,81.3],color:P[0]},{name:"Promedio OCDE",values:[7.7,31.3,84.6],color:P[1]}],yFormat:v=>NUM(v,1),valueLabels:true,height:280,margin:{b:52}});
    if($("#ch-ia")) Charts.bar($("#ch-ia"),{categories:["FMI 2024: empleo expuesto (mundo)","OIT 2025: alguna exposición (mundo)","OIT 2025: máximo riesgo (mundo)","LaboUR 2026: alta exposición (Colombia)","Asocapitales 2026: expuestos 23 ciudades","Fedesarrollo/BID: automatización parcial (Colombia)"],series:[{name:"% del empleo",values:[40,25,3.3,25.8,48.1,58],color:P[0]}],yFormat:"pct",valueLabels:true,height:300,margin:{b:70}});
    if($("#ch-wp121")) Charts.bar($("#ch-wp121"),{categories:["Mujeres","Hombres","Urbano","Rural"],series:[{name:"Automatización (% empleo)",values:[5.5,1.6,3.9,0.8],color:P[5]},{name:"Aumento (% empleo, mujeres)",values:[11.3,null,null,null],color:P[2]}],yFormat:"pct",valueLabels:true,height:260});
  }

  /* ---------- Calculadora ---------- */
  function calc(){ if(!$("#c-out")) return;
    const ids=["c-edad","c-semanas","c-semanas2027","c-ibc","c-ibl","c-saldo","c-hijos","c-rend","c-itec","c-gmin","c-gap","c-regimen","c-tasacot","c-mort","c-benef","c-pobre"]; ids.forEach(id=>{ const e=document.getElementById(id); if(e){ e.addEventListener("input",run); e.addEventListener("change",run);} }); $$("input[name=c-sexo]").forEach(r=>r.addEventListener("change",run));
    on("c-parse","click",parseHist); on("c-demo","click",()=>{ $("#c-historia").value="# Ejemplo: inicio, fin, IBC mensual (pesos del período)\n2004-02-01,2008-12-31,381500\n2009-03-01,2014-06-30,600000\n2015-01-15,2019-12-31,1000000\n2020-02-01,2025-12-31,1600000\n2026-01-01,2026-08-31,1900000"; parseHist(); });
    ["c-rend","c-itec","c-gmin"].forEach(id=>{ const e=document.getElementById(id); if(e){ const o=$("#"+id+"-o"); const upd=()=>{ o.textContent=NUM(parseFloat(e.value),1)+" %"; }; e.addEventListener("input",upd); upd(); } }); run();
    function parseHist(){ const h=Models.parseHistoria($("#c-historia").value); const out=$("#c-hist-out"); if(!h.periodos.length){ out.innerHTML=`<span class="status no">Sin períodos válidos</span> ${h.errores.join("; ")}`; return; } $("#c-semanas").value=Math.floor(h.semanas); $("#c-ibl").value=Math.round(h.ibl); $("#c-ibc").value=Math.round(h.ultimoIBC);
      out.innerHTML=`<span class="status ok">${h.periodos.length} períodos leídos</span> Semanas: <b>${NUM(h.semanas,1)}</b> · IBL últimos 10 años (pesos de ${Models.CURRENT_YEAR}): <b>${COP(h.ibl10)}</b> · IBL toda la vida: <b>${COP(h.iblVida)}</b> · Se usa el mayor (art. 21 Ley 100 / art. 32 Ley 2381). ${h.errores.length?"Advertencias: "+h.errores.join("; "):""}`; run(); }
    function run(){ const sex=($("input[name=c-sexo]:checked")||{}).value||"M"; const edad=val("c-edad")||45; const semanas=val("c-semanas")||0; const s27=val("c-semanas2027"); const sem2027=(s27==null||isNaN(s27))?null:s27; const ibc=val("c-ibc")||Models.smmlv(2026); const ibl=val("c-ibl")||ibc; const saldo=val("c-saldo")||0; const hijos=val("c-hijos")||0;
      const rend=(val("c-rend")||4)/100, itec=(val("c-itec")||3)/100, gmin=(val("c-gmin")||0)/100, gap=val("c-gap")||0; const regimen=txt("c-regimen")||"RAIS"; const tasaCot=parseFloat(txt("c-tasacot")||"0.16"); const benef=!!val("c-benef"); const pobre=!!val("c-pobre"); Models.setMortality(txt("c-mort")||"rentistas");
      const sm=Models.smmlv(2026); const edadReq=Models.edadPension(sex); const aniosFaltan=Math.max(0,edadReq-edad); const anioPension=Math.max(2027,2026+Math.ceil(aniosFaltan)); $("#c-anio-o").textContent=anioPension;
      const semProy=semanas+Math.round(aniosFaltan*52); const semAl2027=sem2027!=null?sem2027:Math.min(semProy,semanas+Math.round(Math.max(0,Math.min(aniosFaltan,0.58))*52)); const tr=Models.transicion(sex,semAl2027);
      let ley100Html="";
      if(regimen==="RPM"){ const r=Models.ley100RPM({sex,edad:edadReq,semanas:semProy,ibl,smmlv:sm}); ley100Html=`<div class="result"><div class="t">Ley 100 · Régimen de Prima Media (Colpensiones)</div><div class="v">${r.elegible?COP(r.mesada):"—"}<small>${r.elegible?" / mes":""}</small></div><div class="d">${r.elegible?`Tasa de reemplazo <b>${PCT(r.tasa)}</b> = 65,5 − 0,5·${NUM(r.s,2)} ${r.tasaExtra?"+ "+PCT(r.tasaExtra)+" por semanas adicionales":""} sobre IBL ${COP(ibl)} · 13 mesadas.`:`No alcanza requisitos a los ${edadReq}: faltarían <b>${NUM(r.faltanSemanas)}</b> semanas. Indemnización sustitutiva estimada: <b>${COP(Models.indemnizacionSustitutiva({ibcMensual:ibl,semanas:semProy,tasa:tasaCot}))}</b> (pago único).`}</div></div>`; }
      else { const capital=saldo*Math.pow(1+rend,aniosFaltan)+Models.acumular({ibcMensual:ibc,semanas:Math.round(aniosFaltan*52),r:rend,share:0.115}); const renta=Models.rentaVitalicia(capital,edadReq,sex,itec,benef,0); const rentaMin=Models.rentaVitalicia(capital,edadReq,sex,itec,benef,gmin); const capMin=Models.capitalParaRenta(1.1*sm,edadReq,sex,itec,benef,gmin); const cumple=capital>=capMin; const gpm=semProy>=1150;
        ley100Html=`<div class="result"><div class="t">Ley 100 · Ahorro Individual (AFP)</div><div class="v">${cumple?COP(renta):gpm?COP(sm):COP(capital)}<small>${cumple||gpm?" / mes":" saldo (devolución)"}</small></div><div class="d">Capital proyectado a los ${edadReq}: <b>${COP(capital)}</b> (saldo actual + 11,5 pts del IBC durante ${NUM(aniosFaltan,1)} años al ${PCT(rend*100)} real). ${cumple?`Financia una renta vitalicia (tasa técnica ${PCT(itec*100)}${gmin?", deslizamiento "+PCT(gmin*100):""}${benef?", con beneficiario":""}); con deslizamiento sería ${COP(rentaMin)}.`:gpm?`El capital no alcanza el mínimo requerido (${COP(capMin)} para 110 % del SMLMV) pero con ≥ 1.150 semanas aplica la <b>Garantía de Pensión Mínima</b>: 1 SMLMV.`:`Capital insuficiente para pensión mínima (${COP(capMin)} requeridos) y menos de 1.150 semanas: <b>devolución de saldos</b> (pago único).`}</div></div>`; }
      let l2=""; const anio=anioPension;
      if(tr.enTransicion){ l2=`<div class="result gold"><div class="t">Ley 2381 · Régimen de transición (art. 75)</div><div class="v">Ley 100 se mantiene</div><div class="d">Con <b>${NUM(semAl2027)}</b> semanas al 1 de abril de 2027 (umbral ${tr.umbral} para ${sex==="F"?"mujeres":"hombres"}) usted permanece íntegramente en la Ley 100: el resultado de la izquierda es el que aplica. ${cite("ley2381")}</div></div>`; }
      else { const saldoCCAI=ibc>2.3*sm?saldo*Math.pow(1+rend,aniosFaltan)*Math.max(0,(ibc-2.3*sm)/ibc)+Models.acumular({ibcMensual:Math.max(0,ibc-2.3*sm),semanas:Math.round(aniosFaltan*52),r:rend,share:0.132}):0; const r=Models.ley2381({sex,edad:edadReq,semanas:semProy,ibl,smmlv:sm,anio,saldoCCAI,iTecnica:itec,beneficiario:benef,hijos}); const semi=Models.semicontributivo({sex,semanas:semProy,ibcMensual:ibl,smmlv:sm,pobre,tasaCot,gapAnios:gap+3,iTecnica:itec,saldoCCAI:0,anio}); const saldoPre=saldo*Math.pow(1+rend,aniosFaltan)*Math.min(1,2.3*sm/ibc);
        if(r.elegible||r.elegibleConHijos){ l2=`<div class="result gold"><div class="t">Ley 2381 · Pilar Contributivo (Pensión Integral de Vejez)</div><div class="v">${COP(r.total)}<small> / mes</small></div><div class="d">Componente de prima media: <b>${COP(r.mesadaCPM)}</b> = ${PCT(r.tasa)} × IBL topado a 2,3 SMLMV (${COP(r.iblCPM)}). ${r.rentaCCAI?`Componente de ahorro individual: <b>${COP(r.rentaCCAI)}</b> (anualidad vitalicia sobre ${COP(saldoCCAI)} de aportes por encima de 2,3 SMLMV).`:"Sin componente de ahorro individual (ingresos ≤ 2,3 SMLMV)."} Semanas requeridas: ${r.semanasReq}${r.elegibleConHijos&&!r.elegible?` (cumple gracias al descuento por hijos, art. 36 —devuelto a la Cámara—)`:""}. ${saldoPre?`Su saldo previo en AFP hasta 2,3 SMLMV (≈ ${COP(saldoPre)}) se traslada a Colpensiones al pensionarse y no genera renta adicional.`:""}</div></div>`; }
        else if(r.anticipada){ l2=`<div class="result gold"><div class="t">Ley 2381 · Prestación anticipada de vejez (art. 37)</div><div class="v">${COP(r.prestAnticipada)}<small> / mes</small></div><div class="d">Con ${NUM(semProy)} semanas (> 1.000) y ${sex==="F"?62:65} años antes de 2036, prestación proporcional (${NUM(semProy)}/${r.semanasReq}), descontando ≈ ${COP(r.descuento)} mensuales por las cotizaciones faltantes. Sin sustitución pensional.</div></div>`; }
        else if(semi.aplica){ const is=Models.indemnizacionSustitutiva({ibcMensual:ibl,semanas:semProy,tasa:tasaCot}); const dev=Models.acumular({ibcMensual:ibc,semanas:semProy,r:rend,share:0.115}); const be=Models.breakEvenSemi({renta:semi.renta,pagoUnico:regimen==="RPM"?is:dev,edadRenta:semi.edadRenta,r:itec});
          l2=`<div class="result gold"><div class="t">Ley 2381 · Pilar Semicontributivo (art. 18)</div><div class="v">${COP(semi.renta)}<small> / mes desde los ${semi.edadRenta}</small></div><div class="d">Renta vitalicia sobre un capital de <b>${COP(semi.capital)}</b> (cotizaciones ${COP(semi.cotizaciones)} indexadas ${pobre?"sin subsidio (elegible al Pilar Solidario, recibe además la Renta Básica Solidaria de $230.000)":"+ 3 % real anual y subsidio de "+(sex==="F"?"30":"20")+" %"}), esperanza de vida ${NUM(semi.esperanzaVida,1)} años, no heredable, tope ${COP(semi.tope)}${semi.topado?" (aplicado)":""}.<br>Bajo Ley 100 recibiría ${regimen==="RPM"?"indemnización sustitutiva":"devolución de saldos"} ≈ <b>${COP(regimen==="RPM"?is:dev)}</b> (pago único, heredable). ${be?`La renta acumulada iguala ese pago único a los <b>${NUM(be,1)} años</b> de edad.`:"La renta no alcanza a igualar el pago único en 45 años."}</div></div>`; }
        else { l2=`<div class="result gold"><div class="t">Ley 2381</div><div class="v">${semProy<300?"Devolución / indemnización":"Sin derecho aún"}</div><div class="d">${semProy<300?"Con menos de 300 semanas se mantiene la indemnización sustitutiva (CPM) y la devolución de saldos (CCAI) (art. 18 par. 3).":`Faltarían ${NUM(r.faltanSemanas)} semanas para la pensión integral (requisito ${r.semanasReq}).`}</div></div>`; } }
      setHTML("c-status",`${tr.enTransicion?`<span class="status ok">EN TRANSICIÓN</span>`:`<span class="status no">NUEVO SISTEMA</span>`} Semanas hoy: <b>${NUM(semanas)}</b> · estimadas al 1-abr-2027: <b>${NUM(semAl2027)}</b> · proyectadas a los ${edadReq} años (${anioPension}): <b>${NUM(semProy)}</b> · umbral de transición: ${tr.umbral}.`);
      setHTML("c-out",ley100Html+l2);
      setHTML("c-assump",`<b>Supuestos:</b> SMLMV 2026 = ${COP(sm)}; cotización continua sobre el IBC actual hasta la edad de pensión; pesos constantes de 2026; mortalidad ${Models.mortalityMode()==="rentistas"?"de rentistas (≈RV08)":"poblacional (DANE)"} — esperanza de vida a los ${edadReq}: ${NUM(Models.lifeExpectancy(edadReq,sex),1)} años; rendimiento real ${PCT(rend*100)}; tasa técnica ${PCT(itec*100)}; cotización computada para el semicontributivo ${PCT(tasaCot*100)} del IBC. Estimación educativa, no una liquidación oficial.`); renderCites(); }
  }

  /* ---------- Análisis avanzado ---------- */
  function analisis(){ if(!$("#an-heat")) return; const P=T();
    const IBCS=[1,1.5,2,2.3,4,7,10,15,20,25], SEM=[1300,1400,1500,1600,1800];
    const run=()=>{ const sex=($("input[name=an-sex]:checked")||{}).value||"M"; const r=val("an-r")/100, i=val("an-i")/100, share=parseFloat(txt("an-share")), dens=val("an-dens")/100; ["an-r","an-i","an-dens"].forEach(id=>{ $("#"+id+"-o").textContent=PCT(val(id),1); });
      const V=IBCS.map(ib=>SEM.map(s=>Models.subsidioRPM({sex,ibcSM:ib,semanas:s,r,i,share,densidad:dens}).subsidioPct));
      Charts.heatmap($("#an-heat"),{rows:IBCS.map(x=>x+" SMMLV"),cols:SEM.map(String),values:V,format:v=>NUM(v,0)+" %",rowName:"IBC",colName:"semanas",valueName:"subsidio =",colorHi:P[0],height:380,min:0,max:80});
      const abs=IBCS.map(ib=>Models.subsidioRPM({sex,ibcSM:ib,semanas:1300,r,i,share,densidad:dens})); Charts.bar($("#an-abs"),{categories:IBCS.map(x=>x+" SM"),series:[{name:"Subsidio (millones COP de 2026)",values:abs.map(x=>x.subsidio/1e6),color:P[1]}],yFormat:v=>"$"+NUM(v)+" M",valueLabels:true,height:260});
      const tirH=IBCS.map(ib=>Models.subsidioRPM({sex:"M",ibcSM:ib,semanas:1300,r,i,share,densidad:dens}).tir*100), tirF=IBCS.map(ib=>Models.subsidioRPM({sex:"F",ibcSM:ib,semanas:1300,r,i,share,densidad:dens}).tir*100);
      Charts.bar($("#an-tir"),{categories:IBCS.map(x=>x+" SM"),series:[{name:"TIR real hombres (62 años)",values:tirH,color:P[2]},{name:"TIR real mujeres (57 años)",values:tirF,color:P[0]}],yFormat:v=>NUM(v,1)+" %",height:260});
      const bench=SEMANAS.HIST.farne; setHTML("an-table",`<div class="table-wrap"><table><thead><tr><th>IBC</th><th class="num">Modelo SEMANAS (${sex==="M"?"hombre":"mujer"})</th><th class="num">Farné &amp; Nieto 2017 (${sex==="M"?"hombre":"mujer"})</th><th class="num">Subsidio (millones)</th><th class="num">TIR real</th></tr></thead><tbody>${bench.map(b=>{ const m=Models.subsidioRPM({sex,ibcSM:b.ibc,semanas:1300,r,i,share,densidad:dens}); return `<tr><td>${b.ibc} SMMLV</td><td class="num">${PCT(m.subsidioPct)}</td><td class="num">${PCT(sex==="M"?b.h:b.m)}</td><td class="num">$${NUM(m.subsidio/1e6)} M</td><td class="num">${PCT(m.tir*100)}</td></tr>`; }).join("")}</tbody></table></div><p class="xs muted mt1">Farné y Nieto usan 13 puntos de cotización, 4 % real de rendimiento y de interés técnico, densidad 87,1 %, 25 años de aportes desde los 25 años y Resolución 3099/2015; con esos parámetros el modelo reproduce sus órdenes de magnitud. ${cite("farne17")}</p>`); renderCites(); };
    ["an-r","an-i","an-share","an-dens"].forEach(id=>{ on(id,"input",run); on(id,"change",run); }); $$("input[name=an-sex]").forEach(x=>x.addEventListener("change",run)); run();
    /* Punto de equilibrio semicontributivo */
    const be=()=>{ const sex=($("input[name=be-sex]:checked")||{}).value||"M"; const semanas=val("be-semanas"), ibcSM=val("be-ibc"), r=val("be-r")/100, pobre=!!val("be-pobre"); ["be-semanas","be-ibc","be-r"].forEach(id=>{ $("#"+id+"-o").textContent= id==="be-r"? PCT(val(id),1): id==="be-ibc"? NUM(val(id),1)+" SMMLV": NUM(val(id))+" semanas"; });
      const sm=Models.smmlv(2026); const ibc=ibcSM*sm; const semi=Models.semicontributivo({sex,semanas,ibcMensual:ibc,smmlv:sm,pobre,tasaCot:0.16,gapAnios:3,iTecnica:r}); const dev=Models.acumular({ibcMensual:ibc,semanas,r:0.04,share:0.115}); const is=Models.indemnizacionSustitutiva({ibcMensual:ibc,semanas,tasa:0.16});
      const ages=[]; const accR=[], devR=[]; let acc=0; const rm=Math.pow(1+r,1/12)-1; let d=dev; for(let m=0;m<=12*30;m++){ if(m%12===0){ ages.push(String(semi.edadRenta+m/12)); accR.push(acc/1e6); devR.push(d/1e6); } acc=acc*(1+rm)+semi.renta*(m%12===11?2:1); d*=(1+rm); }
      const beAge=Models.breakEvenSemi({renta:semi.renta,pagoUnico:dev,edadRenta:semi.edadRenta,r}); const ev=Models.lifeExpectancy(semi.edadRenta,sex);
      Charts.line($("#be-chart"),{labels:ages,series:[{name:"Renta semicontributiva acumulada (millones)",values:accR,color:P[0],area:true},{name:"Devolución de saldos capitalizada (millones)",values:devR,color:P[1],dashed:true}],yFormat:v=>"$"+NUM(v)+" M",dots:false,annotations:[{i:Math.min(ages.length-1,Math.round(ev)),text:"esperanza de vida: "+NUM(semi.edadRenta+ev,0)+" años"}],height:280});
      setHTML("be-out",`<div class="kpis"><div class="kpi p"><div class="v">${COP(semi.renta)}</div><div class="l">Renta semicontributiva mensual desde los ${semi.edadRenta} (${pobre?"sin":"con"} subsidio)</div></div><div class="kpi y"><div class="v">${COP(dev)}</div><div class="l">Devolución de saldos RAIS equivalente (pago único)</div><div class="s">indemnización sustitutiva RPM: ${COP(is)}</div></div><div class="kpi k"><div class="v">${beAge?NUM(beAge,1):"> 95"}<small>años</small></div><div class="l">Edad a la que la renta acumulada iguala la devolución capitalizada</div><div class="s">esperanza de vida a los ${semi.edadRenta}: ${NUM(semi.edadRenta+ev,1)} años</div></div><div class="kpi b"><div class="v">${PCT(semi.renta*13*(Models.annuityDue(semi.edadRenta,sex,r)-11/24)/dev*100,0)}</div><div class="l">Valor presente actuarial de la renta / devolución</div><div class="s">> 100 % favorece la renta en valor esperado</div></div></div>`); };
    ["be-semanas","be-ibc","be-r","be-pobre"].forEach(id=>{ on(id,"input",be); on(id,"change",be); }); $$("input[name=be-sex]").forEach(x=>x.addEventListener("change",be)); be();
    /* Déficit del RPM */
    if($("#an-deficit")) Charts.bar($("#an-deficit"),{categories:["Cotizaciones recibidas 2025","Prestaciones pagadas 2025","Aporte de la Nación 2026 (PGN)"],series:[{name:"Billones COP",values:[21,64.8,33.78],color:P[0]}],yFormat:v=>"$"+NUM(v,1)+" bn",valueLabels:true,height:260});
    /* Tornado del fondo */
    if($("#an-tornado")){ const base=Models.fapc({}); const y=r=>r.agotamiento||2101; const items=[
      {label:"Umbral 1,0 / 3,0 SMLMV",lo:y(Models.fapc({umbral:1})),hi:y(Models.fapc({umbral:3})),loLabel:"1 SMLMV",hiLabel:"3 SMLMV"},
      {label:"Rendimiento 3,3 % / 5,3 %",lo:y(Models.fapc({rReal:0.033})),hi:y(Models.fapc({rReal:0.053})),loLabel:"3,3 %",hiLabel:"5,3 %"},
      {label:"Crecimiento PIB 2,0 % / 4,0 %",lo:y(Models.fapc({gPIB:0.04})),hi:y(Models.fapc({gPIB:0.02})),loLabel:"4 %",hiLabel:"2 %"},
      {label:"Base de cotización −15 % / +15 %",lo:y(Models.fapc({shockCotiz:0.85})),hi:y(Models.fapc({shockCotiz:1.15})),loLabel:"−15 %",hiLabel:"+15 %"},
      {label:"Subcuentas generacionales",lo:y(base),hi:y(Models.fapc({generacional:true})),loLabel:"sin",hiLabel:"con"}];
      Charts.tornado($("#an-tornado"),{items,base:y(base),baseLabel:"escenario base",format:v=>v>2100?"> 2100":String(Math.round(v)),height:300}); }
    /* Género */
    if($("#an-genero")){ const sm=Models.smmlv(2026); const rows=[1,2,2.3,4].map(ib=>{ const h=Models.subsidioRPM({sex:"M",ibcSM:ib}), m=Models.subsidioRPM({sex:"F",ibcSM:ib}); return {ib,h:h.reserva/1e6,m:m.reserva/1e6}; }); Charts.bar($("#an-genero"),{categories:rows.map(r=>r.ib+" SMMLV"),series:[{name:"Reserva actuarial hombre a los 62 (millones)",values:rows.map(r=>r.h),color:P[2]},{name:"Reserva actuarial mujer a los 57 (millones)",values:rows.map(r=>r.m),color:P[0]}],yFormat:v=>"$"+NUM(v)+" M",valueLabels:true,height:270}); }
  }

  /* ---------- Simuladores ---------- */
  function demo(){ if(!$("#d-chart")) return; const P=T(); const run=()=>{ const tgf=val("s-tgf"), mort=val("s-mort")/100, mig=val("s-mig")*1000; $("#s-tgf-o").textContent=NUM(tgf,2); $("#s-mort-o").textContent=PCT(mort*100,1); $("#s-mig-o").textContent=NUM(mig)+" /año"; const rows=Models.proyectar({tgf,mejoraMort:mort,migracion:mig}); const base=Models.proyectar({}); const lab=rows.filter(r=>r.y%5===0).map(r=>String(r.y)); const pick=(rs,k)=>rs.filter(r=>r.y%5===0).map(r=>r[k]);
      Charts.line($("#d-chart"),{labels:lab,series:[{name:"Población escenario (M)",values:pick(rows,"total").map(v=>v/1e6),color:P[0]},{name:"Población base (M)",values:pick(base,"total").map(v=>v/1e6),color:P[3],dashed:true}],yFormat:v=>NUM(v,1)+" M",yMin:40,yMax:62,height:260});
      Charts.line($("#d-chart2"),{labels:lab,series:[{name:"Personas de 15–64 por cada mayor de 65 — escenario",values:pick(rows,"trabajadoresPorMayor"),color:P[2]},{name:"Base",values:pick(base,"trabajadoresPorMayor"),color:P[3],dashed:true}],yFormat:v=>NUM(v,2),yMin:0,height:260});
      const pk=rows.reduce((a,r)=>r.total>a.total?r:a,rows[0]); const r70=rows[rows.length-1]; setHTML("d-out",`<div class="kpis"><div class="kpi p"><div class="v">${pk.y}</div><div class="l">Año de población máxima (${NUM(pk.total/1e6,1)} M)</div><div class="s">DANE: 2043, > 56 M</div></div><div class="kpi y"><div class="v">${PCT(r70.p65)}</div><div class="l">Mayores de 65 en 2070</div><div class="s">DANE: ≈ 29 %</div></div><div class="kpi b"><div class="v">${NUM(r70.trabajadoresPorMayor,2)}</div><div class="l">Personas de 15–64 por mayor de 65 en 2070 (hoy ${NUM(rows[0].trabajadoresPorMayor,2)})</div></div><div class="kpi k"><div class="v">${NUM(r70.envejecimiento)}</div><div class="l">Índice de envejecimiento 2070</div><div class="s">DANE 2050: 135,9</div></div></div>`); }; ["s-tgf","s-mort","s-mig"].forEach(id=>on(id,"input",run)); run(); }
  function monte(){ if(!$("#mc-chart")) return; const run=()=>{ const ibc=val("mc-ibc")||Models.smmlv(2026), anios=val("mc-anios")||25, mu=val("mc-mu")/100, sigma=val("mc-sigma")/100, share=parseFloat(txt("mc-share")||"0.115"); ["mc-mu","mc-sigma","mc-anios"].forEach(id=>{ $("#"+id+"-o").textContent=id==="mc-anios"?NUM(val(id))+" años":PCT(val(id),1); }); const mc=Models.monteCarlo({ibcMensual:ibc,anios,share,mu,sigma,n:2000,seed:7}); const det=Models.acumular({ibcMensual:ibc,semanas:anios*52,r:mu,share});
      Charts.hist($("#mc-chart"),{values:mc.caps.map(v=>v/1e6),bins:36,xFormat:v=>"$"+NUM(v)+"M",name:"Capital final (millones COP)",markers:[{value:mc.p50/1e6,text:"mediana"},{value:det/1e6,text:"determinista"}],height:280}); const renta=v=>Models.rentaVitalicia(v,62,"M",0.03,true); const sm=Models.smmlv(2026);
      setHTML("mc-out",`<div class="result-grid"><div class="result"><div class="t">Percentil 5</div><div class="v">${COP(mc.p5)}</div><div class="d">renta ≈ ${COP(renta(mc.p5))}/mes (${PCT(renta(mc.p5)/ibc*100)} del IBC)</div></div><div class="result gold"><div class="t">Mediana</div><div class="v">${COP(mc.p50)}</div><div class="d">renta ≈ ${COP(renta(mc.p50))}/mes (${PCT(renta(mc.p50)/ibc*100)} del IBC)</div></div><div class="result"><div class="t">Percentil 95</div><div class="v">${COP(mc.p95)}</div><div class="d">renta ≈ ${COP(renta(mc.p95))}/mes</div></div><div class="result"><div class="t">Probabilidad de financiar 1,1 SMLMV</div><div class="v">${PCT(mc.caps.filter(v=>renta(v)>=1.1*sm).length/mc.caps.length*100,0)}</div><div class="d">capital requerido ≈ ${COP(Models.capitalParaRenta(1.1*sm,62,"M",0.03,true))}</div></div></div>`); }; ["mc-ibc","mc-anios","mc-mu","mc-sigma","mc-share"].forEach(id=>{ on(id,"input",run); on(id,"change",run); }); run(); }
  function fondo(){ if(!$("#f-chart")) return; const P=T(); const run=()=>{ const umbral=val("f-umbral"), r=val("f-r")/100, g=val("f-g")/100, shock=val("f-shock")/100, gen=!!val("f-gen"); $("#f-umbral-o").textContent=NUM(umbral,1)+" SMLMV"; $("#f-r-o").textContent=PCT(r*100,1); $("#f-g-o").textContent=PCT(g*100,1); $("#f-shock-o").textContent=PCT(shock*100,0); const sc=Models.fapc({umbral,rReal:r,gPIB:g,shockCotiz:shock,generacional:gen}); const base=Models.fapc({}); const lab=sc.rows.filter(x=>x.y%5===0||x.y===2027).map(x=>String(x.y)); const pick=(res,k)=>res.rows.filter(x=>x.y%5===0||x.y===2027).map(x=>x[k]);
      Charts.line($("#f-chart"),{labels:lab,series:[{name:"Saldo del fondo (escenario)",values:pick(sc,"saldo"),color:P[0],area:true},{name:"Saldo del fondo (base)",values:pick(base,"saldo"),color:P[3],dashed:true},{name:"Transferencia de la Nación (escenario)",values:pick(sc,"transferencia"),color:P[5]}],yFormat:v=>NUM(v,1)+" % PIB",height:300});
      setHTML("f-out",`<div class="kpis"><div class="kpi p"><div class="v">${sc.agotamiento||"> 2100"}</div><div class="l">Año de agotamiento del fondo</div><div class="s">base: ${base.agotamiento} · CARF 2024: 2062</div></div><div class="kpi y"><div class="v">${NUM(sc.maxSaldo.saldo,1)}<small>% PIB</small></div><div class="l">Saldo máximo (${sc.maxSaldo.y})</div><div class="s">base: ${NUM(base.maxSaldo.saldo,1)} % en ${base.maxSaldo.y}</div></div><div class="kpi b"><div class="v">${NUM(sc.vpnTransferencias,1)}<small>% PIB</small></div><div class="l">VPN transferencias 2027–2100 (3 % real)</div><div class="s">base: ${NUM(base.vpnTransferencias,1)} % · Δ ${NUM(sc.vpnTransferencias-base.vpnTransferencias,1)} pp</div></div><div class="kpi k"><div class="v">${NUM(sc.rows[sc.rows.length-1].transferencia,2)}<small>% PIB</small></div><div class="l">Transferencia anual de la Nación en 2100</div><div class="s">base: ${NUM(base.rows[base.rows.length-1].transferencia,2)} %</div></div></div>`); }; ["f-umbral","f-r","f-g","f-shock","f-gen"].forEach(id=>{ on(id,"input",run); on(id,"change",run); }); run(); }
  function autom(){ if(!$("#a-out")) return; const P=T(); const run=()=>{ const p={exposicion:val("a-exp")/100,desplazamiento:val("a-desp")/100,reempleo:val("a-reemp")/100,aumento:val("a-aum")/100,gananciaSalarial:val("a-sal")/100,formalizacion:val("a-form")/100,capitalTax:val("a-cap")/100}; ["a-exp","a-desp","a-reemp","a-aum","a-sal","a-form","a-cap"].forEach(id=>{ $("#"+id+"-o").textContent=PCT(val(id),id==="a-cap"?1:0); }); const a=Models.automatizacion(p); const sc=Models.fapc({shockCotiz:a.indice}); const base=Models.fapc({}); const extra=a.capitalTax; const sc2=Models.fapc({shockCotiz:a.indice,cotizBase:3.5+extra*(1/Models.shareUmbral(2.3))});
      setHTML("a-out",`<div class="kpis"><div class="kpi p"><div class="v">${NUM((a.indice-1)*100,1)}<small>%</small></div><div class="l">Cambio en la masa de cotización formal</div><div class="s">empleo formal: ${PCT(a.formal*100)} del total (hoy 45,5 %)</div></div><div class="kpi y"><div class="v">${PCT(a.perdidaEmpleo*100,1)}</div><div class="l">Empleo formal expuesto que sale de la base</div><div class="s">exposición × desplazamiento × (1 − reempleo)</div></div><div class="kpi b"><div class="v">${sc.agotamiento||"> 2100"}</div><div class="l">Agotamiento del Fondo de Ahorro con este escenario</div><div class="s">base: ${base.agotamiento}</div></div><div class="kpi k"><div class="v">${sc2.agotamiento||"> 2100"}</div><div class="l">…si además se destina ${PCT(extra*100,1)} del PIB de rentas de capital/IA</div><div class="s">VPN Δ ${NUM(sc2.vpnTransferencias-base.vpnTransferencias,1)} pp del PIB</div></div></div>`);
      const lab=sc.rows.filter(x=>x.y%5===0||x.y===2027).map(x=>String(x.y)); const pick=res=>res.rows.filter(x=>x.y%5===0||x.y===2027).map(x=>x.saldo); Charts.line($("#a-chart"),{labels:lab,series:[{name:"Saldo del fondo — base",values:pick(base),color:P[3],dashed:true},{name:"Saldo — escenario IA",values:pick(sc),color:P[0]},{name:"Saldo — IA + contribución sobre capital",values:pick(sc2),color:P[6]}],yFormat:v=>NUM(v,1)+" % PIB",height:280}); }; ["a-exp","a-desp","a-reemp","a-aum","a-sal","a-form","a-cap"].forEach(id=>on(id,"input",run)); run(); }

  /* ---------- Sanabria ---------- */


  /* ---------- El umbral de 2,3 SMLMV ----------
     Sección propia: qué hace el umbral, de dónde salió el número, las fórmulas
     explicadas para quien no viene de economía, y un simulador que recalcula
     el reparto, el Fondo de Ahorro y tres perfiles de trabajador. */
  function umbral(){
    if(!$("#u-split")) return;
    const SM=Models.smmlv(2026);
    const citeP=(k,pg)=>`<a class="cite" data-ref="${k}"${pg?` data-page="${pg}"`:""}></a>`;
    let U=2.3, W=2;   /* umbral en SMLMV · salario de ejemplo en SMLMV */

    /* --- 1· El diagrama del reparto --- */
    function pintarSplit(){
      const escala=Math.max(W,U,4);                 /* la jarra siempre muestra al menos 4 mínimos */
      const bCPM=Math.min(W,U), bCCAI=Math.max(0,W-U);
      const pc=v=>(v/escala*100).toFixed(2)+"%";
      const fCPM=$("#u-fill-cpm"), fCCAI=$("#u-fill-ccai");
      fCPM.style.height=pc(bCPM); fCCAI.style.height=pc(bCCAI);
      fCPM.classList.toggle("tall",bCPM/escala>0.13); fCCAI.classList.toggle("tall",bCCAI/escala>0.13);
      fCPM.querySelector("span").textContent="al fondo común";
      fCCAI.querySelector("span").textContent="a su cuenta";
      $("#u-mark").style.bottom=pc(Math.min(U,escala));
      setHTML("u-scale",`${COP(W*SM)} <span class="xs muted">(${NUM(W,1)} mínimos)</span>`);
      $("#u-v-cpm").textContent=COP(0.16*bCPM*SM);
      $("#u-v-ccai").textContent=COP(0.16*bCCAI*SM);
    }

    /* --- 2· Las fórmulas, una por una --- */
    function pintarFormulas(){ SEMANAS.MathLab.init(); }

    /* --- 3· El simulador --- */
    const ESCEN=[
      {u:1,   quien:"CARF (recomendación técnica)", dice:`El acervo de ahorro nacional sería ≈ 17,1 pp del PIB mayor que en el escenario actual. ${citeP("carf24u",22)}`},
      {u:1.5, quien:"Fedesarrollo", dice:`Luis Fernando Mejía pidió insistir en bajar el umbral a 1,5 SMLMV. ${citeP("portafolioU")}`},
      {u:2.3, quien:"Ley 2381, art. 24 (vigente)", dice:`Capta el 66 % de las cotizaciones; agotado el Fondo, la transferencia salta 2 % del PIB en 2063. ${citeP("carf24u",12)} ${citeP("carf24u",19)}`},
      {u:3,   quien:"Texto de los primeros debates", dice:`Bajar de 3 a 2,3 redujo el VPN del sistema en 3,3 % del PIB. ${citeP("carf24u",19)}`},
      {u:4,   quien:"Propuesta inicial del Gobierno", dice:`El CARF modeló 1, 2,3 y 3 SMMLV; en ese documento no publicó un escenario de 4. ${citeP("petro4")} ${citeP("carf24u",11)}`}
    ];
    const P=()=>T();
    function correr(){
      const r=val("u-r")/100, g=val("u-g")/100;
      $("#u-umbral-o").textContent=NUM(U,1)+" SMLMV · "+COP(U*SM);
      $("#u-r-o").textContent=PCT(r*100,1); $("#u-g-o").textContent=PCT(g*100,1);
      const sc=Models.fapc({umbral:U,rReal:r,gPIB:g}), base=Models.fapc({umbral:2.3,rReal:r,gPIB:g});
      const share=Models.shareUmbral(U)*100, shareBase=Models.shareUmbral(2.3)*100;

      setHTML("u-kpis",`<div class="kpis">
        <div class="kpi k"><div class="v">${NUM(share,0)}<small>%</small></div><div class="l">De la plata cotizada va al fondo común</div><div class="s">con 2,3: ${NUM(shareBase,0)} % (CARF: 66 %)</div></div>
        <div class="kpi p"><div class="v">${sc.agotamiento||"> 2100"}</div><div class="l">Se agota el Fondo de Ahorro</div><div class="s">con 2,3: ${base.agotamiento} · CARF: 2062</div></div>
        <div class="kpi b"><div class="v">${NUM(sc.vpnTransferencias,1)}<small>% PIB</small></div><div class="l">VPN de lo que pone la Nación, 2027–2100</div><div class="s">con 2,3: ${NUM(base.vpnTransferencias,1)} % · diferencia ${sc.vpnTransferencias>base.vpnTransferencias?"+":""}${NUM(sc.vpnTransferencias-base.vpnTransferencias,1)} pp</div></div>
      </div>`);

      const filas=x=>x.rows.filter(v=>v.y%5===0||v.y===2027);
      Charts.line($("#u-chart"),{labels:filas(sc).map(v=>String(v.y)),
        series:[{name:"Saldo del Fondo · escenario",values:filas(sc).map(v=>v.saldo),color:P()[1],area:true},
                {name:"Saldo del Fondo · umbral 2,3",values:filas(base).map(v=>v.saldo),color:P()[3],dashed:true},
                {name:"Transferencia de la Nación · escenario",values:filas(sc).map(v=>v.transferencia),color:P()[0]}],
        yFormat:v=>NUM(v,1)+" %",height:300});
      setHTML("u-legend",`<span><i style="background:${P()[1]}"></i>Saldo del Fondo · escenario</span>`+
        (Math.abs(U-2.3)>0.05?`<span><i style="background:${P()[3]}"></i>Saldo del Fondo · umbral 2,3 de la ley</span>`:"")+
        `<span><i style="background:${P()[0]}"></i>Transferencia de la Nación · escenario</span>`);

      const dU=U-2.3, mas=dU>0.05, menos=dU<-0.05;
      setHTML("u-verdict",`<div class="callout ${mas?"warn":menos?"":"yellow"} small">${
        mas? `<b>Con ${NUM(U,1)} el fondo común recibe más plata hoy.</b> El Fondo de Ahorro crece más y se agota ${sc.agotamiento&&base.agotamiento?`${sc.agotamiento-base.agotamiento} año(s) después`:"más tarde"}, pero esa misma plata compra derechos a mesadas públicas más grandes: el total que la Nación termina poniendo sube ${NUM(sc.vpnTransferencias-base.vpnTransferencias,1)} pp del PIB. Es el argumento por el que el CARF pedía bajarlo, no subirlo. ${citeP("carf24u",23)}`
        : menos? `<b>Con ${NUM(U,1)} entra menos plata al fondo común, así que el Fondo de Ahorro se agota antes (${sc.agotamiento||"> 2100"} frente a ${base.agotamiento}).</b> Parece peor y no lo es: al mismo tiempo se reduce la pensión pública que hay que pagar y el subsidio que la acompaña, y el total que pone la Nación baja ${NUM(base.vpnTransferencias-sc.vpnTransferencias,1)} pp del PIB. Más ahorro queda invertido en cuentas individuales. ${citeP("carf24u",20)}`
        : `<b>Este es el umbral que quedó en la ley.</b> Mueva la barra o toque uno de los otros valores para ver qué cambiaba con cada propuesta.`}</div>`);

      perfiles(); tabla(); renderCites();
      if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([$("#u-verdict")]).catch(()=>{});
    }

    /* --- 4· Tres perfiles de trabajador --- */
    function perfil(wSM,u){
      const ibl=wSM*SM;
      const baseCCAI=Math.max(0,(wSM-u))*SM;
      const saldo=baseCCAI>0? Models.acumular({ibcMensual:baseCCAI,semanas:1300,r:0.04,g:0,share:0.132}) : 0;
      return Models.ley2381({sex:"M",edad:62,semanas:1300,ibl,saldoCCAI:saldo,anio:2027,umbralSM:u,beneficiario:true});
    }
    function perfiles(){
      const defs=[[1,"Gana el mínimo","y"],[2.3,"Gana justo el umbral","b"],[5,"Gana cinco mínimos","p"]];
      setHTML("u-perfiles", defs.map(([w,t,c])=>{
        const a=perfil(w,U), b=perfil(w,2.3);
        const tot=a.total, pubPct=tot>0?a.mesadaCPM/tot*100:0;
        const dif=b.total>0? (tot/b.total-1)*100 : 0;
        return `<div class="tile ${c}">
          <div class="pot-h" style="font-size:.63rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-2)">${t} · ${COP(w*SM)}</div>
          <div class="v">${COP(tot)}<small>/mes</small></div>
          <p>${a.rentaCCAI>0
            ? `<b>${NUM(pubPct,0)} %</b> sale del componente público (${COP(a.mesadaCPM)}) y el resto de su cuenta individual (${COP(a.rentaCCAI)}).`
            : `Todo sale del componente público: su salario no pasa del umbral, así que no alcanza a abrir cuenta individual.`}</p>
          <p class="xs" style="margin-top:8px;font-weight:700">${
            Math.abs(U-2.3)<0.05 ? "Escenario vigente de la Ley 2381."
            : Math.abs(dif)<0.5 ? `Con umbral de ${NUM(U,1)} le queda igual que con 2,3.`
            : `Con umbral de ${NUM(U,1)}: ${dif>0?"+":""}${NUM(dif,1)} % frente al de la ley.`}</p>
        </div>`;
      }).join(""));
    }

    /* --- 5· La tabla de escenarios --- */
    function tabla(){
      const tb=$("#u-tabla tbody"); if(!tb) return;
      tb.innerHTML=ESCEN.map(e=>{
        const f=Models.fapc({umbral:e.u,rReal:val("u-r")/100,gPIB:val("u-g")/100});
        const act=Math.abs(e.u-U)<0.05;
        return `<tr${act?' style="background:var(--pale-yellow)"':''}>
          <td><b>${NUM(e.u,1)} SMLMV</b><br><span class="xs muted">${COP(e.u*SM)}</span></td>
          <td class="small">${e.quien}</td>
          <td class="num">${NUM(Models.shareUmbral(e.u)*100,0)} %</td>
          <td class="num">${f.agotamiento||"> 2100"}</td>
          <td class="num">${NUM(f.vpnTransferencias,1)} %</td>
          <td class="small">${e.dice}</td></tr>`;
      }).join("");
    }

    /* --- 6· Cableado --- */
    on("u-umbral","input",e=>{ U=parseFloat(e.target.value); pintarSplit(); correr();
      $$("#u-presets button").forEach(b=>b.classList.toggle("active",Math.abs(+b.dataset.u-U)<0.05)); });
    $$("#u-presets button").forEach(b=>b.addEventListener("click",()=>{
      U=+b.dataset.u; $("#u-umbral").value=U;
      $$("#u-presets button").forEach(x=>x.classList.toggle("active",x===b));
      pintarSplit(); correr(); }));
    $$("#u-sal-chips button").forEach(b=>b.addEventListener("click",()=>{
      W=+b.dataset.w; $$("#u-sal-chips button").forEach(x=>x.classList.toggle("active",x===b)); pintarSplit(); }));
    ["u-r","u-g"].forEach(id=>on(id,"input",correr));

    pintarSplit(); pintarFormulas(); correr();
  }

  /* ---------- Bibliografía de la sección ----------
     La numeración [n] es global (el orden de SEMANAS.SOURCES), así que una
     cita significa lo mismo en todas las rutas. Al final de cada página se
     lista solo lo que esa página cita; la lista completa vive en /fuentes/. */
  function refsLocales(){
    if(SEMANAS.SINGLE||HERE==="fuentes"||HERE==="inicio") return;
    const main=$("main"); if(!main) return;
    const articleSources=SEMANAS.ANALISIS?['ley2381','codcivil','c054','constitucion','camara264','ley2381pdf',...Object.values(SEMANAS.ANALISIS).flatMap(a=>a.k)]:[];
    const nums=[...new Set([...$$(".cite[data-ref]",main).map(a=>SRC[a.dataset.ref]),...articleSources.map(k=>SRC[k])].filter(Boolean))].sort((a,b)=>a-b);
    if(!nums.length) return;
    const sec=document.createElement("section");
    sec.className="section refs-local";
    sec.innerHTML=`<div class="wrap">
      <div class="section-head"><h2>Fuentes citadas en esta sección</h2>
      <p class="lead">Los números corresponden a la numeración global del observatorio. La bibliografía completa está en <a href="${ROOT}fuentes/">Bibliografía</a>.</p></div>
      <ol class="refs">${nums.map(n=>{
        const s=SEMANAS.SOURCES[n-1];
        const pv=isPDF(s.u,s.k)?` <button class="pdfbtn" data-pdfk="${s.k}">Previsualizar PDF</button>`:"";
        return `<li value="${n}" id="ref-${n}">${s.t}${s.u?` <br><a href="${s.u}" target="_blank" rel="noopener">${s.u}</a>`:""}${pv}</li>`;
      }).join("")}</ol></div>`;
    const antes=$(".ruta-foot",main);
    antes?main.insertBefore(sec,antes):main.appendChild(sec);
    $$(".refs-local .pdfbtn").forEach(b=>b.onclick=()=>openPDF(b.dataset.pdfk));
  }

  /* ---------- Glosario: cajón lateral ----------
     Las palabras marcadas con <span class="term" data-t="clave"> abren la
     ficha del término sin sacar al lector de donde está. En escritorio el
     cajón entra por la derecha; en móvil sube desde abajo a media pantalla
     (lo resuelve el CSS). Se cierra con la ×, tocando fuera o con Escape. */
  function glosario(){
    const G=SEMANAS.GLOSARIO||{};
    const caj=$("#gloss"), veil=$("#gloss-veil"), cuerpo=$("#gloss-body"), ttl=$("#gloss-term"), kick=$("#gloss-kicker");
    const items=(SEMANAS.glosarioOrdenado?SEMANAS.glosarioOrdenado():[]);
    let ultimo=null, actual=null, filtro="";

    /* --- El cajón, genérico: lo usan el glosario y las citas --- */
    function mostrar(){
      if(caj.hidden){ caj.hidden=false; veil.hidden=false; }
      requestAnimationFrame(()=>{ caj.classList.add("open"); veil.classList.add("open"); syncLayers(); });
      document.body.classList.add("gloss-abierto");
    }
    function cerrar(){
      if(!caj||caj.hidden) return;
      caj.classList.remove("open"); veil.classList.remove("open");
      syncLayers();
      document.body.classList.remove("gloss-abierto");
      $$(".term.on, .cite.on").forEach(x=>x.classList.remove("on"));
      setTimeout(()=>{ if(!caj.classList.contains("open")){ caj.hidden=true; veil.hidden=true; } },260);
      if(ultimo){ ultimo.focus(); ultimo=null; }
    }
    function abrirPanel({kicker,titulo,html,origen}){
      if(origen) ultimo=origen;
      if(kick) kick.textContent=kicker||"";
      ttl.textContent=titulo||"";
      cuerpo.innerHTML=html||"";
      cuerpo.scrollTop=0;
      mostrar();
      renderCites();
      $("#gloss-close").focus();
    }
    SEMANAS.panel={abrir:abrirPanel, cerrar};

    /* --- Ficha de un término: definición, por qué importa, ejemplo --- */
    const ficha=k=>{
      const g=G[k]; if(!g) return "";
      return (g.a?`<p class="gloss-alias">${g.a}</p>`:"")+
        `<p class="gloss-def">${g.d}</p>`+
        (g.i&&g.i.length?`<div class="gloss-puntos"><h4>Lo importante</h4><ul>${g.i.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:"")+
        (g.e?`<div class="gloss-ej"><h4>Ejemplo</h4><p>${g.e}</p></div>`:"")+
        (g.k?`<p class="gloss-src">Fuente: ${cite(g.k)}</p>`:"");
    };

    /* El índice completo va siempre debajo, para saltar a otra palabra. */
    const filas=()=>{
      const q=filtro.trim().toLowerCase();
      const hits=items.filter(g=>!q||(g.t+" "+(g.a||"")+" "+g.d).toLowerCase().includes(q));
      if(!hits.length) return `<p class="gloss-vacio">Ningún término coincide con «${q}».</p>`;
      return `<ul class="gloss-lista">${hits.map(g=>
        `<li><button data-t="${g.k}"${g.k===actual?' class="es"':""}>${g.t}`+
        `${g.a?`<small>${g.a}</small>`:""}</button></li>`).join("")}</ul>`;
    };
    function pintarLista(){
      const cont=$("#gloss-filas"); if(!cont) return;
      cont.innerHTML=filas();
      $$("button[data-t]",cont).forEach(b=>b.onclick=()=>abrir(b.dataset.t));
    }
    function pintar(origen){
      abrirPanel({
        kicker:"Glosario",
        titulo: actual?G[actual].t:"Glosario del sistema",
        html: (actual?`<div class="gloss-ficha">${ficha(actual)}</div>`:"")+
          `<div class="gloss-indice">
             <div class="gloss-buscar">
               <span class="searchbar"><input type="search" id="gloss-q" autocomplete="off"
                 placeholder="Buscar otro término…" aria-label="Buscar en el glosario"></span>
             </div>
             <div id="gloss-filas"></div>
           </div>`,
        origen});
      pintarLista();
      /* Dentro de la ficha, las demás palabras del glosario también se enlazan. */
      const fi=$(".gloss-ficha",cuerpo); if(fi) automarcar(fi,[actual]);
      const q=$("#gloss-q");
      if(q){ q.value=filtro; q.addEventListener("input",()=>{ filtro=q.value; pintarLista(); }); }
    }
    function abrir(k,origen){
      if(!caj||!G[k]) return;
      actual=k;
      pintar(origen);
      $$(".term.on").forEach(x=>x.classList.remove("on"));
      if(origen) origen.classList.add("on");
    }
    function indice(){
      if(!caj) return;
      actual=null; filtro="";
      pintar();
      $("#gloss-q")?.focus();
    }
    SEMANAS.abrirTermino=abrir;
    SEMANAS.abrirGlosario=indice;

    /* Un solo oyente en el documento: sirve también para el texto que se
       pinta después (línea de tiempo, artículos, fichas del cajón). */
    document.addEventListener("click",e=>{
      const boton=e.target.closest("[data-glosario], .abre-glosario");
      if(boton){ e.preventDefault(); indice(); return; }
      const t=e.target.closest(".term[data-t]");
      if(!t) return;
      e.preventDefault();
      if(!G[t.dataset.t]) return;
      abrir(t.dataset.t,t);
    });
    document.addEventListener("keydown",e=>{
      const t=e.target.closest?.(".term[data-t]");
      if(t&&(e.key==="Enter"||e.key===" ")){ e.preventDefault(); abrir(t.dataset.t,t); }
    });
    $("#gloss-close")?.addEventListener("click",cerrar);
    veil?.addEventListener("click",cerrar);

    /* Accesibilidad: cada término es un botón para el teclado. */
    const marcar=()=>$$(".term[data-t]").forEach(t=>{
      if(t._g) return; t._g=true;
      t.setAttribute("role","button"); t.setAttribute("tabindex","0");
      const g=G[t.dataset.t];
      if(g) t.setAttribute("aria-label",g.t+": ver definición"); else t.classList.add("term-huerfano");
    });

    /* Marcado automático: recorre el texto de la página y subraya la
       primera aparición de cada término. Evita títulos, enlaces, citas,
       botones, código y lo que ya venga marcado a mano en el HTML. */
    function automarcar(raiz, excluir){
      const F=SEMANAS.TERM_FRASES||{};
      raiz=raiz||$("main"); if(!raiz) return;
      const usados=new Set($$(".term[data-t]",raiz).map(t=>t.dataset.t).concat(excluir||[]));
      const entradas=[];
      Object.keys(F).forEach(k=>{ if(G[k]) F[k].forEach(f=>entradas.push([k,f])); });
      /* Frases largas primero: «régimen de prima media» antes que «prima media». */
      entradas.sort((a,b)=>b[1].length-a[1].length);
      const VETADO="a,button,h1,h2,h3,h4,code,pre,script,style,select,option,textarea,label,.cite,.term,.chapter,.tag,.seg,.tabs,.chips,.gloss-indice,.gloss-alias,.cita-ficha,.kpi .v,.stat-strip";

      entradas.forEach(([k,frase])=>{
        if(usados.has(k)) return;
        const exacta=frase.startsWith("/")&&frase.endsWith("/");
        const texto=exacta?frase.slice(1,-1):frase;
        const re=new RegExp("(^|[^\\p{L}\\p{N}])("+texto.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(?![\\p{L}\\p{N}])",
                            exacta?"u":"iu");
        const it=document.createNodeIterator(raiz,NodeFilter.SHOW_TEXT);
        let n;
        while((n=it.nextNode())){
          if(!n.nodeValue||n.nodeValue.length<texto.length) continue;
          if(n.parentElement.closest(VETADO)) continue;
          const m=re.exec(n.nodeValue); if(!m) continue;
          const ini=m.index+m[1].length;
          const medio=n.splitText(ini); medio.splitText(m[2].length);
          const sp=document.createElement("span");
          sp.className="term"; sp.dataset.t=k;
          medio.parentNode.replaceChild(sp,medio); sp.appendChild(medio);
          usados.add(k);
          break;
        }
      });
      marcar();
    }
    automarcar();

  }

  document.addEventListener("DOMContentLoaded",()=>{ pdfWire(); tabs(); timeline(); umbral(); pillars(); articulos(); modal(); SEMANAS.initDebate?.(); renderCites(); refsLocales(); linkLawMentions($("main")); heroCanvas(); series(); diagnostico(); calc(); analisis(); demo(); monte(); fondo(); autom(); reveal(); glosario(); const y=$("#year"); if(y) y.textContent=new Date().getFullYear(); if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise().catch(()=>{}); });
})();
