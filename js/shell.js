/* =====================================================================
   SEMANAS · Armazón compartido
   ---------------------------------------------------------------------
   Cada ruta es un archivo HTML independiente que solo contiene su propio
   contenido. Todo lo que se repite —menú lateral, barra móvil, cajón de
   navegación, visor de PDF, cajón del glosario, modal de artículos, pie—
   lo inyecta este archivo antes de que corra js/app.js.

   Se ejecuta de inmediato (el <script> va antes de app.js y sin defer),
   así que app.js siempre encuentra el DOM completo.
   ===================================================================== */
(function(){
  "use strict";
  const S = window.SEMANAS;
  const ROOT = S.ROOT, HERE = S.HERE;
  const here = S.ROUTE(HERE);

  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");

  /* ---------- Menú: partes temáticas con sus rutas ---------- */
  function navHTML(){
    return S.PARTS.map(([parte, ids]) =>
      `<span class="part">${parte}</span>` +
      ids.map(id => {
        const r = S.ROUTE(id); if(!r) return "";
        return `<a href="${S.href(id)}" data-s="${id}"${id===HERE?' aria-current="page"':""}>`+
               `<span class="dot"></span><span class="nm">${r.label}</span>`+
               `<span class="no">${r.n}</span></a>`;
      }).join("")
    ).join("");
  }

  const brand = `<a class="brand" href="${ROOT || "./"}"><span class="mark"></span>`+
                `<span class="name">SEMANAS<small>Observatorio pensional</small></span></a>`;

  /* ---------- Inyección del armazón ---------- */
  function mount(){
    const body = document.body;

    const chrome = document.createElement("div");
    chrome.id = "shell";
    chrome.innerHTML = `
<aside class="side" id="side">
  ${brand}
  <nav id="sidenav" aria-label="Secciones"></nav>
  <div class="foot"><b>Corte:</b> 5 sep 2026 · Vigencia Ley 2381: 1 abr 2027 (C-264/26)<br>Datos oficiales citados en [n]; pase el cursor para ver la fuente.</div>
</aside>
<div class="topbar" id="topbar">${brand}<button class="burger" id="burger" aria-label="Menú" aria-expanded="false"><span></span><span></span><span></span></button></div>
<div class="drawer" id="drawer"><div class="panel">${brand}<nav id="drawernav" aria-label="Secciones"></nav></div></div>`;
    body.insertBefore(chrome, body.firstChild);

    const tail = document.createElement("div");
    tail.id = "shell-tail";
    tail.innerHTML = `
<div class="modal" id="modal" role="dialog" aria-modal="true"><div class="box"><button class="close" id="modal-close" aria-label="Cerrar">×</button><div id="modal-body"></div></div></div>

<div class="pdfview" id="pdfview" role="dialog" aria-modal="true" aria-label="Vista previa de la fuente">
  <div class="shell">
    <div class="bar">
      <div class="ttl"><small id="pdf-kicker">Vista previa en la aplicación</small><span id="pdf-title"></span><em id="pdf-note"></em></div>
      <div class="pages" id="pdf-pages"></div>
      <div class="actions">
        <a id="pdf-open" href="#" target="_blank" rel="noopener">Abrir fuente ↗</a>
        <button class="close" id="pdf-close" aria-label="Cerrar vista previa">Cerrar ×</button>
      </div>
    </div>
    <div class="body">
      <iframe id="pdf-frame" title="Documento fuente" referrerpolicy="no-referrer"></iframe>
      <div class="fallback" id="pdf-fallback">
        <div>
          <h3>Este servidor no permite la vista previa</h3>
          <p class="small">Algunos sitios bloquean que su PDF se muestre dentro de otra página, y varios navegadores móviles no incrustan PDF.<br>El documento sigue disponible en su fuente original, abierto en la página citada.</p>
          <p><a class="btn sm" id="pdf-fallback-open" href="#" target="_blank" rel="noopener">Abrir el PDF en su sitio ↗</a></p>
        </div>
      </div>
    </div>
  </div>
</div>

<aside class="gloss" id="gloss" role="dialog" aria-modal="false" aria-labelledby="gloss-term" hidden>
  <div class="gloss-head">
    <div>
      <small>Glosario</small>
      <h3 id="gloss-term"></h3>
    </div>
    <button class="gloss-close" id="gloss-close" aria-label="Cerrar el glosario">×</button>
  </div>
  <div class="gloss-body" id="gloss-body"></div>
  <div class="gloss-foot"><a id="gloss-all" href="${S.href("glosario")}">Ver el glosario completo →</a></div>
</aside>
<div class="gloss-veil" id="gloss-veil" hidden></div>

<button class="totop" id="totop" aria-label="Subir">↑</button>`;
    body.appendChild(tail);

    document.getElementById("sidenav").innerHTML = navHTML();
    document.getElementById("drawernav").innerHTML = navHTML();
    marcarActivo();
    wireBurger();
    pieDeRuta();
  }

  function marcarActivo(){
    document.querySelectorAll("#sidenav a, #drawernav a").forEach(a=>{
      a.classList.toggle("active", a.dataset.s === HERE);
    });
    const act = document.querySelector("#sidenav a.active");
    if(act && !S.SINGLE) act.scrollIntoView({block:"nearest"});
  }

  function wireBurger(){
    const b = document.getElementById("burger"), d = document.getElementById("drawer");
    if(!b || !d) return;
    const abrir = v => { d.classList.toggle("open", v); b.setAttribute("aria-expanded", String(v)); };
    b.addEventListener("click", () => abrir(!d.classList.contains("open")));
    d.addEventListener("click", e => { if(e.target === d || e.target.closest("a")) abrir(false); });
  }

  /* ---------- Pie de ruta: anterior / siguiente ---------- */
  function pieDeRuta(){
    const main = document.querySelector("main");
    if(!main) return;
    if(S.SINGLE || !here){ pieLegal(main); return; }  /* portada y archivo único: solo pie */
    const i = S.ROUTES.indexOf(here);
    const prev = S.ROUTES[i-1], next = S.ROUTES[i+1];
    const tarjeta = (r, dir) => r
      ? `<a class="ruta-nav-item ${dir}" href="${S.href(r.id)}">
           <small>${dir==="prev"?"← Anterior":"Siguiente →"}</small>
           <span class="no">${r.n}</span>
           <b>${esc(r.label)}</b>
           <em>${esc(r.desc)}</em>
         </a>`
      : `<a class="ruta-nav-item ${dir}" href="${ROOT || "./"}">
           <small>${dir==="prev"?"← Anterior":"Siguiente →"}</small>
           <span class="no">00</span><b>Portada</b>
           <em>El índice completo del observatorio.</em>
         </a>`;
    const foot = document.createElement("div");
    foot.className = "ruta-foot";
    foot.innerHTML = `<div class="wrap">
      <nav class="ruta-nav" aria-label="Navegación entre secciones">${tarjeta(prev,"prev")}${tarjeta(next,"next")}</nav>
    </div>`;
    main.appendChild(foot);
    pieLegal(main);
  }

  function pieLegal(main){
    const pie = document.createElement("footer");
    pie.innerHTML = `<div class="wrap inner"><div><b>SEMANAS</b> · Observatorio del Sistema Pensional Colombiano · <span id="year"></span></div><div>Contenido educativo y de análisis. No constituye asesoría legal, financiera ni una liquidación pensional.</div></div>`;
    main.appendChild(pie);
  }

  /* La barra de progreso solo tiene sentido dentro de una página larga. */
  function progreso(){
    const top = document.getElementById("totop");
    window.addEventListener("scroll", () => {
      if(top) top.classList.toggle("show", window.scrollY > 700);
    }, {passive:true});
    if(top) top.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", () => { mount(); progreso(); });
  } else { mount(); progreso(); }
})();
