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

  /* ---------- Menú: grupos, rutas y las partes de la ruta activa ---------- */
  function navHTML(){
    return S.PARTS.map(([grupo, ids]) =>
      `<span class="part">${grupo}</span>` +
      ids.map(id => {
        const r = S.ROUTE(id); if(!r) return "";
        const activa = id === HERE;
        const fila = `<a class="ruta c-${r.color} ${activa?"active":""}" href="${S.href(id)}" data-s="${id}"`+
                     `${activa?' aria-current="page"':""}>`+
                     `<span class="no">${r.n}</span><span class="nm">${r.label}</span></a>`;
        if(!activa || !r.sub || !r.sub.length) return fila;
        /* Una sola caja: la ruta abierta y sus partes no se separan. */
        return `<div class="grupo c-${r.color}">${fila}<div class="subs">${
          r.sub.map(([sid, lbl]) => `<a href="#${sid}" data-sub="${sid}">${lbl}</a>`).join("")
        }</div></div>`;
      }).join("")
    ).join("");
  }

  /* Icono de libro abierto: el botón dice qué hace sin depender del texto. */
  const iconoLibro = `<svg class="gb-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" `+
    `stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">`+
    `<path d="M3 4h6a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H3z"/>`+
    `<path d="M21 4h-6a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h6z"/></svg>`;

  const glosarioBtn = `<button class="glosario-btn" data-glosario type="button">`+
                      iconoLibro+`<span>Glosario</span><i aria-hidden="true">→</i></button>`;

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
  ${glosarioBtn}
</aside>
<div class="topbar" id="topbar">${brand}<button class="burger" id="burger" aria-label="Menú" aria-expanded="false"><span></span><span></span><span></span></button></div>
<div class="drawer" id="drawer"><div class="panel">${brand}<nav id="drawernav" aria-label="Secciones"></nav>${glosarioBtn}</div></div>`;
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
      <small id="gloss-kicker">Glosario</small>
      <h3 id="gloss-term"></h3>
    </div>
    <button class="gloss-close" id="gloss-close" aria-label="Cerrar el glosario">×</button>
  </div>
  <div class="gloss-body" id="gloss-body"></div>
</aside>
<div class="gloss-veil" id="gloss-veil" hidden></div>

<button class="totop" id="totop" aria-label="Subir">↑</button>`;
    body.appendChild(tail);

    document.getElementById("sidenav").innerHTML = navHTML();
    document.getElementById("drawernav").innerHTML = navHTML();
    wireBurger();
    subrayarParte();
    rejillaDeRutas();
    pieDeRuta();
  }

  /* Resalta la parte de la página en la que va el lector. Solo cambia
     clases: nunca desplaza el menú por su cuenta (eso congelaba el menú
     al llegar al final de la página en la versión anterior). */
  function subrayarParte(){
    if(!here || !here.sub || !here.sub.length) return;
    const enlaces = Array.from(document.querySelectorAll('.subs a[data-sub]'));
    const bloques = here.sub.map(([sid]) => document.getElementById(sid)).filter(Boolean);
    if(!bloques.length) return;
    let pendiente = false;
    const marcar = () => {
      pendiente = false;
      const y = window.scrollY + 140;
      let actual = bloques[0].id;
      bloques.forEach(b => { if(b.offsetTop <= y) actual = b.id; });
      enlaces.forEach(a => a.classList.toggle("en", a.dataset.sub === actual));
    };
    window.addEventListener("scroll", () => {
      if(pendiente) return;
      pendiente = true;
      requestAnimationFrame(marcar);
    }, {passive:true});
    marcar();
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

  /* ---------- Portada: la rejilla de secciones sale del mismo mapa ---------- */
  function rejillaDeRutas(){
    const cont = document.getElementById("rutas");
    if(!cont) return;
    cont.innerHTML = S.ROUTES.map(r => {
      const partes = (r.sub && r.sub.length)
        ? `<div class="partes">${r.sub.map(([,l]) => esc(l)).join(" · ")}</div>`
        : "";
      return `<a class="ruta-card c-${r.color}" href="${S.href(r.id)}">
        <div class="pat-band pat-${r.pat}" aria-hidden="true"></div>
        <div class="cuerpo">
          <div class="row"><span>${r.n}</span><span class="arrow" aria-hidden="true">↗</span></div>
          <h3>${esc(r.label)}</h3>
          <p>${esc(r.desc)}</p>
          ${partes}
        </div></a>`;
    }).join("");
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
