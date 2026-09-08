/* SEMANAS · recursos editoriales de la primera sección de la Ley 2381 */
(function(){
  "use strict";
  const S = window.SEMANAS || {};
  if (S.HERE !== "reforma") return;

  const root = S.ROOT || "../";
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = root + "css/reforma-visual.css";
  document.head.appendChild(css);

  const official = "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=246356";

  async function generatedArtwork(){
    const paths = [0,1,2,3,4].map(i => root + "assets/illustrations/ley2381-hero.webp.b64." + i);
    const parts = await Promise.all(paths.map(async (path,i) => {
      const r = await fetch(path, {cache:"force-cache"});
      if (!r.ok) throw new Error("No se pudo cargar " + path);
      const text = (await r.text()).trim();
      return i < 4 ? text.slice(0,6000) : text;
    }));
    return "data:image/webp;base64," + parts.join("");
  }

  function inject(){
    const wrap = document.querySelector("#que-es .wrap");
    if (!wrap || wrap.querySelector(".law-hero-visual")) return;

    const intro = wrap.querySelector(".section-head");
    if (!intro) return;

    intro.insertAdjacentHTML("afterend", `
      <figure class="law-hero-visual reveal in" aria-label="Ilustración editorial del nuevo sistema pensional">
        <div class="law-hero-frame">
          <img data-law-art alt="Ilustración editorial sobre la Ley 2381: personas mayores, trabajadores, ahorro, protección social y aportes pensionales" decoding="async">
          <span class="law-mark law-mark-a" aria-hidden="true"></span>
          <span class="law-mark law-mark-b" aria-hidden="true"></span>
          <span class="law-mark law-mark-c" aria-hidden="true"></span>
        </div>
        <figcaption>Ley 2381 · una sola arquitectura con protección, aportes y ahorro.</figcaption>
      </figure>`);

    const firstGrid = intro.nextElementSibling && intro.nextElementSibling.classList.contains("law-hero-visual")
      ? intro.nextElementSibling.nextElementSibling
      : wrap.querySelector(".grid");

    if (firstGrid) firstGrid.insertAdjacentHTML("afterend", `
      <aside class="law-source-card reveal in" aria-label="Trazabilidad normativa de la primera sección">
        <div class="law-source-top">
          <div>
            <span class="law-source-kicker">Fuente normativa primaria</span>
            <h3>Ley 2381 de 2024 · texto oficial</h3>
          </div>
          <span class="law-source-number">01</span>
        </div>
        <p>Esta explicación parte de la lectura directa de la ley publicada por Función Pública. Para esta primera sección se usaron específicamente los <b>artículos 1, 3, 4, 5, 17, 18, 19, 20, 23, 24, 32, 34, 75 y 94</b>.</p>
        <div class="law-article-map" aria-label="Mapa de artículos usados">
          <span><b>Qué crea</b><small>arts. 1, 3–5</small></span>
          <span><b>Pilares</b><small>arts. 17–19</small></span>
          <span><b>Aportes</b><small>arts. 20, 23–24</small></span>
          <span><b>Pensión</b><small>arts. 32 y 34</small></span>
          <span><b>Transición</b><small>art. 75</small></span>
          <span><b>Vigencia</b><small>art. 94 + C-264/26</small></span>
        </div>
        <p class="law-method"><b>Cómo se hizo el análisis.</b> Primero se leyó el texto normativo artículo por artículo; después se separó lo que la ley ordena de la explicación pedagógica; los detalles operativos se contrastaron con el ABECÉ oficial y el estado de vigencia con la Sentencia C-264 de 2026. La primera sección no usa notas de prensa como sustituto de la norma.</p>
        <div class="law-source-actions">
          <a class="btn sm" href="${official}" target="_blank" rel="noopener">Abrir texto oficial ↗</a>
          <a class="btn sm ghost" href="${root}fuentes/#ref-1">Ver ficha en bibliografía</a>
        </div>
      </aside>`);

    const adminHeading = Array.from(wrap.querySelectorAll("h3")).find(h => h.textContent.includes("Quién administra qué"));
    const adminGrid = adminHeading ? adminHeading.closest(".grid") : null;
    if (adminGrid) adminGrid.insertAdjacentHTML("afterend", `
      <div class="law-pillars-visual reveal in" aria-label="Los cuatro pilares de la Ley 2381">
        <div class="law-pillar-card solidario"><div class="law-pillar-art" data-art-pos="solidario" aria-hidden="true"></div><span class="law-pillar-index">01</span><h4>Solidario</h4><p>Protección para personas mayores en pobreza que no lograron construir una pensión.</p><small>Artículo 17</small></div>
        <div class="law-pillar-card semi"><div class="law-pillar-art" data-art-pos="semi" aria-hidden="true"></div><span class="law-pillar-index">02</span><h4>Semicontributivo</h4><p>Convierte cotizaciones insuficientes en una renta vitalicia bajo las reglas del pilar.</p><small>Artículo 18</small></div>
        <div class="law-pillar-card contributivo"><div class="law-pillar-art" data-art-pos="contributivo" aria-hidden="true"></div><span class="law-pillar-index">03</span><h4>Contributivo</h4><p>Integra prima media y ahorro individual; el aporte se distribuye según el ingreso.</p><small>Artículos 19–24, 32 y 34</small></div>
        <div class="law-pillar-card voluntario"><div class="law-pillar-art" data-art-pos="voluntario" aria-hidden="true"></div><span class="law-pillar-index">04</span><h4>Ahorro voluntario</h4><p>Ahorro adicional para complementar la protección económica en la vejez.</p><small>Pilar definido en el artículo 3</small></div>
      </div>`);

    const pension = Array.from(wrap.querySelectorAll(".paso p")).find(p => p.textContent.includes("Pensión Integral de Vejez"));
    if (pension) pension.innerHTML = pension.innerHTML.replace("(art. 19)", "(art. 34; requisitos en el art. 32)");

    generatedArtwork().then(src => {
      wrap.querySelectorAll("img[data-law-art]").forEach(img => { img.src = src; });
      wrap.querySelectorAll(".law-pillar-art").forEach(el => { el.style.backgroundImage = `url(${src})`; });
    }).catch(err => {
      console.warn("Ilustración Ley 2381:", err);
      wrap.querySelector(".law-hero-visual")?.classList.add("art-missing");
    });

    setTimeout(() => {
      wrap.querySelectorAll('.cite[data-ref="ley2381"]').forEach(a => {
        a.title = "Ley 2381 de 2024 · artículos usados en esta sección: 1, 3–5, 17–20, 23–24, 32, 34, 75 y 94";
      });
    }, 0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject, {once:true});
  else inject();
})();
