/* =====================================================================
   SEMANAS · Mapa de rutas
   ---------------------------------------------------------------------
   Única fuente de verdad de la navegación. El observatorio son cuatro
   secciones temáticas grandes más las referencias; cada una es una página
   propia (carpeta con index.html) dividida internamente en partes que el
   menú lateral despliega cuando esa ruta está activa.

   Lo consumen:
     · js/shell.js  → menú lateral, cajón móvil, anterior/siguiente
     · index.html   → rejilla de tarjetas de la portada
     · build.py     → orden del documento único

   Al agregar una parte a una sección: cree el <section id="…"> en la
   página y añádalo a `sub` aquí. El menú se actualiza solo.
   ===================================================================== */
(function(){
  "use strict";
  const S = window.SEMANAS = window.SEMANAS || {};

  /* Grupos del menú lateral. El orden manda. */
  S.PARTS = [
    ["El observatorio", ["historia","reforma","cifras","ia"]],
    ["Referencias",     ["fuentes","metodologia"]]
  ];

  /* n:      número que se pinta en la tarjeta
     id:     carpeta de la ruta (id/index.html)
     label:  nombre corto en el menú lateral
     title:  título de la pestaña
     desc:   qué hay en la sección (tarjeta de portada)
     color:  token de la paleta (ver css/styles.css)
     pat:    patrón geométrico de la franja superior (.pat-* en el CSS)
     sub:    partes internas: [id del <section>, etiqueta]              */
  S.ROUTES = [
    { n:"01", id:"historia", label:"Historia", title:"Ochenta años de sistema pensional colombiano",
      desc:"De las cajas de previsión de 1945 a la Ley 2381: cada norma, por qué se hizo y qué dejó sin resolver.",
      color:"magenta", pat:"zigzag",
      sub:[["origen","1945–1966 · El origen"],["deterioro","1967–1992 · Seguro y derecho"],
           ["ley100","1993 · La Ley 100"],["parametricas","2003–2014 · Los ajustes"],
           ["diagnostico-comun","2015–2022 · El diagnóstico"],["hacia2381","2023–2027 · La Ley 2381"],
           ["cronologia","La cronología completa"]] },

    { n:"02", id:"reforma", label:"Reforma 2381 de 2024", title:"La Ley 2381 de 2024, entera",
      desc:"Qué es y cómo funciona, los 95 artículos, qué cambia frente a la Ley 100, el umbral de 2,3, la Corte, las críticas y lo que quedó sin responder.",
      color:"cyan", pat:"escamas",
      sub:[["que-es","Qué es y cómo funciona"],["ley","Artículo por artículo"],
           ["comparador","Antes y después"],["umbral","El umbral de 2,3"],
           ["jurisprudencia","La Corte y el estado actual"],
           ["critica","Las críticas"],["preguntas","Preguntas abiertas"]] },

    { n:"03", id:"cifras", label:"Cifras y cálculos", title:"Cifras, cálculos y estadísticas del sistema",
      desc:"El estado del sistema en datos, las series de veinticinco años, la calculadora de su caso y los modelos que hay detrás.",
      color:"orange", pat:"damero",
      sub:[["diagnostico","El sistema hoy"],["series","Series históricas"],
           ["calculadora","Calculadora"],["analisis","Análisis avanzado"],
           ["modelos","Modelos y algoritmos"]] },

    { n:"04", id:"ia", label:"IA y trabajo", title:"Automatización, empleo y pensiones",
      desc:"Qué pasa con un sistema de reparto cuando la base que cotiza cambia de forma: productividad, desplazamiento y desempleo.",
      color:"green", pat:"arcos", sub:[] },

    { n:"05", id:"fuentes", label:"Bibliografía", title:"Bibliografía",
      desc:"Normas, sentencias, cifras institucionales y literatura académica citadas.",
      color:"yellow", pat:"rayas", sub:[] },

    { n:"06", id:"metodologia", label:"Metodología", title:"Cómo se construyó y qué no hace",
      desc:"Jerarquía de fuentes, trazabilidad, validación de los modelos y limitaciones.",
      color:"violet", pat:"cubos", sub:[] }
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
