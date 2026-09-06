/* =====================================================================
   SEMANAS · Mapa de rutas
   ---------------------------------------------------------------------
   Única fuente de verdad de la navegación. Cada sección principal es una
   página propia (carpeta con index.html), no un ancla del mismo documento.
   Este archivo lo consumen:
     · js/shell.js  → menú lateral, cajón móvil, anterior/siguiente
     · index.html   → rejilla de tarjetas de la portada
   Al agregar una sección: cree la carpeta con su index.html y añada aquí
   una entrada. El número, el color y el patrón se propagan solos.
   ===================================================================== */
(function(){
  "use strict";
  const S = window.SEMANAS = window.SEMANAS || {};

  /* Partes temáticas: agrupan las rutas en el menú. El orden manda. */
  S.PARTS = [
    ["El sistema",   ["historia","series","diagnostico"]],
    ["La reforma",   ["comparador","umbral","calculadora"]],
    ["Modelos",      ["analisis","modelos"]],
    ["La ley 2381",  ["ley","jurisprudencia"]],
    ["El debate",    ["critica","preguntas","ia"]],
    ["Referencias",  ["glosario","fuentes","metodologia"]]
  ];

  /* n:      número que se pinta en la tarjeta
     id:     carpeta de la ruta (id/index.html) y ancla histórica
     label:  nombre corto en el menú lateral
     title:  título de la pestaña y del encabezado de página
     desc:   qué hay en la sección (se muestra en la tarjeta de portada)
     color:  token de la paleta (ver css/styles.css)
     pat:    patrón geométrico de fondo (ver .pat-* en css/styles.css)   */
  S.ROUTES = [
    { n:"01", id:"historia",     label:"Historia",            title:"Ochenta años de sistema pensional colombiano",
      desc:"De la Caja de Previsión de 1946 a la Ley 2381: cada norma, por qué se hizo y qué dejó rota.",
      color:"magenta", pat:"dots" },

    { n:"02", id:"series",       label:"Series históricas",   title:"Veinticinco años en datos",
      desc:"Quién cotiza, quién cobra y quién paga, año por año, sin interpolar los huecos.",
      color:"cyan", pat:"waves" },

    { n:"03", id:"diagnostico",  label:"Diagnóstico",         title:"El sistema hoy, en cinco tableros",
      desc:"Cobertura, informalidad, costo fiscal y demografía con cifras oficiales de 2026.",
      color:"orange", pat:"diag" },

    { n:"04", id:"comparador",   label:"Antes y después",     title:"De dos regímenes a cuatro pilares",
      desc:"Comparación parámetro por parámetro entre la Ley 100 y la Ley 2381.",
      color:"violet", pat:"grid" },

    { n:"05", id:"umbral",       label:"El umbral de 2,3",    title:"El número que parte el sistema en dos",
      desc:"De dónde salió el 2,3 SMLMV, cómo se calcula y qué pasaría con otro número.",
      color:"yellow", pat:"rings" },

    { n:"06", id:"calculadora",  label:"Calculadora",         title:"Su caso, antes y después de la reforma",
      desc:"Estime su pensión bajo la Ley 100 y bajo la Ley 2381 con su historia laboral.",
      color:"green", pat:"chevron" },

    { n:"07", id:"analisis",     label:"Análisis avanzado",   title:"Los subsidios que nadie ve, medidos",
      desc:"Subsidio implícito, TIR por perfil, punto de equilibrio de la renta vitalicia y brecha de edad.",
      color:"peri", pat:"halftone" },

    { n:"08", id:"modelos",      label:"Modelos y algoritmos",title:"Cómo se calcula lo que usted ve",
      desc:"Los cinco motores auditables: ecuaciones, supuestos, calibración y limitaciones.",
      color:"wine", pat:"cross" },

    { n:"09", id:"ley",          label:"Artículo por artículo",title:"Los 95 artículos de la Ley 2381",
      desc:"Cada artículo resumido, con etiqueta temática y estado procesal tras la Sentencia C-264.",
      color:"cyan", pat:"bricks" },

    { n:"10", id:"jurisprudencia",label:"Corte Constitucional",title:"Del Auto 841 a la Sentencia C-264",
      desc:"El recorrido judicial de la reforma y qué quedó pendiente hasta abril de 2027.",
      color:"violet", pat:"zigzag" },

    { n:"11", id:"critica",      label:"Jerome Sanabria",     title:"Jerome Sanabria y el movimiento #NoConMiAhorro",
      desc:"Sus tesis contrastadas una por una con la ley, el CARF, MinHacienda y la OIT.",
      color:"magenta", pat:"triangles" },

    { n:"12", id:"preguntas",    label:"Preguntas abiertas",  title:"Lo que la evidencia aún no cierra",
      desc:"La agenda de investigación que dejan las más de 100 demandas pendientes.",
      color:"orange", pat:"dots" },

    { n:"13", id:"ia",           label:"IA y trabajo",        title:"Cuando la base que cotiza cambia de forma",
      desc:"Automatización, empleo formal y un simulador del Fondo de Ahorro bajo distintos escenarios.",
      color:"green", pat:"diag" },

    { n:"14", id:"glosario",     label:"Glosario",            title:"Glosario del sistema pensional",
      desc:"Cada término técnico del sitio, definido con ejemplos en pesos de 2026.",
      color:"peri", pat:"grid" },

    { n:"15", id:"fuentes",      label:"Bibliografía",        title:"Bibliografía",
      desc:"Normas, sentencias, cifras institucionales y literatura académica citadas.",
      color:"yellow", pat:"waves" },

    { n:"16", id:"metodologia",  label:"Metodología",         title:"Cómo se construyó y qué no hace",
      desc:"Jerarquía de fuentes, trazabilidad, validación de los modelos y limitaciones.",
      color:"violet", pat:"rings" }
  ];

  S.ROUTE = id => S.ROUTES.find(r => r.id === id) || null;

  /* Raíz del sitio vista desde la página actual. Las subpáginas declaran
     data-root="../" en <html>; la portada no declara nada. Así el sitio
     funciona igual en localhost:8765 que en /semanas/ de GitHub Pages. */
  S.ROOT = document.documentElement.getAttribute("data-root") || "";

  /* Id de la ruta actual, deducido de data-route en <html>. */
  S.HERE = document.documentElement.getAttribute("data-route") || "inicio";

  /* build.py arma un documento único con todas las rutas concatenadas y
     marca <html data-single>. Ahí los enlaces vuelven a ser anclas. */
  S.SINGLE = document.documentElement.hasAttribute("data-single");

  S.href = id => S.SINGLE
    ? "#" + id
    : S.ROOT + (id === "inicio" ? "" : id + "/");
})();
