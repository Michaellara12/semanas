/* =====================================================================
   SEMANAS · data.js
   Datos verificados con fuentes oficiales / institucionales.
   Cada dato lleva la clave de la fuente (ver SOURCES). Las cifras que son
   supuestos de modelación (no observadas) se marcan explícitamente.
   Fecha de corte de la investigación: 5 de septiembre de 2026.
   ===================================================================== */
window.SEMANAS = window.SEMANAS || {};

/* ---------- FUENTES (el orden define el número [n] en toda la plataforma) ---------- */
SEMANAS.SOURCES = [
 {k:"ley2381", t:"Congreso de la República de Colombia (2024). <b>Ley 2381 de 2024</b> (16 de julio), «por medio de la cual se establece el Sistema de Protección Social Integral para la Vejez, Invalidez y Muerte de origen común». Diario Oficial 52.813. Texto consolidado en el Gestor Normativo de Función Pública.", u:"https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=246356"},
 {k:"ley100", t:"Congreso de la República (1993). <b>Ley 100 de 1993</b>, por la cual se crea el Sistema de Seguridad Social Integral.", u:"http://www.secretariasenado.gov.co/senado/basedoc/ley_0100_1993.html"},
 {k:"ley797", t:"Congreso de la República (2003). <b>Ley 797 de 2003</b>, reforma al Sistema General de Pensiones (art. 9: semanas y edades; art. 10: fórmula de tasa de reemplazo r = 65,5 − 0,5·s).", u:"http://www.secretariasenado.gov.co/senado/basedoc/ley_0797_2003.html"},
 {k:"al01", t:"Congreso de la República (2005). <b>Acto Legislativo 01 de 2005</b>, que adiciona el artículo 48 de la Constitución (sostenibilidad financiera, fin de regímenes especiales, tope de 25 SMLMV, mesada 14).", u:"http://www.secretariasenado.gov.co/senado/basedoc/acto_legislativo_01_2005.html"},
 {k:"ley1328", t:"Congreso de la República (2009). <b>Ley 1328 de 2009</b> (multifondos en el RAIS y Beneficios Económicos Periódicos, BEPS).", u:"http://www.secretariasenado.gov.co/senado/basedoc/ley_1328_2009.html"},
 {k:"ley1580", t:"Congreso de la República (2012). <b>Ley 1580 de 2012</b>, pensión familiar.", u:"http://www.secretariasenado.gov.co/senado/basedoc/ley_1580_2012.html"},
 {k:"ley1748", t:"Congreso de la República (2014). <b>Ley 1748 de 2014</b>, doble asesoría obligatoria para traslados de régimen.", u:"http://www.secretariasenado.gov.co/senado/basedoc/ley_1748_2014.html"},
 {k:"auto841", t:"Corte Constitucional (2025). <b>Auto 841 de 2025</b> (17 de junio), M.P. Jorge Enrique Ibáñez Najar, expediente D-15989. Constata vicio subsanable de deliberación en la plenaria de la Cámara (14 jun 2024), devuelve el proyecto y suspende la vigencia de la Ley 2381.", u:"https://www.corteconstitucional.gov.co/relatoria/autos/2025/a841-25.htm"},
 {k:"c264", t:"Corte Constitucional (2026). <b>Sentencia C-264 de 2026</b> (25 de agosto), M.P. Paola Andrea Meneses Mosquera, expediente D-15989. Comunicado 27 (25–27 ago 2026). Declara exequible, por los vicios de procedimiento examinados, la mayor parte de la Ley 2381; devuelve 3 artículos completos y 6 apartes; condiciona el art. 94: vigencia a partir del 1 de abril de 2027. Salvamento de voto del conjuez Carlos Pablo Márquez.", u:"https://www.corteconstitucional.gov.co/comunicados/"},
 {k:"colpJun26", t:"Colpensiones (2026). <b>Cifras clave sobre el Régimen de Prima Media, programa BEPS y Ley Pensional, corte a junio de 2026</b>.", u:"https://www.colpensiones.gov.co/publicaciones/5184/cifras-clave-sobre-el-regimen-de-prima-media-rpm-programa-beps-y-ley-pensional-con-corte-a-junio-de-2026/"},
 {k:"colpSep25", t:"Colpensiones (2025). <b>Cifras clave sobre pensiones, programa BEPS y Ley Pensional, septiembre de 2025</b>.", u:"https://www.colpensiones.gov.co/publicaciones/5134/cifras-clave-sobre-pensiones-programa-beps-y-ley-pensional-durante-septiembre-de-2025/"},
 {k:"colpRC25", t:"Colpensiones (2026). <b>Colpensiones rinde cuentas sobre su gestión 2025</b> (27 de marzo de 2026): $64,8 billones en prestaciones, $21 billones en cotizaciones, 141.541 pensiones reconocidas, 186.870 traslados desde AFP ($13,5 billones).", u:"https://www.colpensiones.gov.co/publicaciones/5155/colpensiones-rinde-cuentas-sobre-su-gestion-2025/"},
 {k:"mfmp26", t:"Ministerio de Hacienda y Crédito Público (2026). <b>Marco Fiscal de Mediano Plazo 2026</b> (junio). Capítulo de pensiones: gasto del RPM 4,6 %–4,9 % del PIB; pasivo pensional (VPN) 94,4 % del PIB sin reforma y 121,5 % con reforma. Cifras reseñadas por Semana (15 jun 2026).", u:"https://www.minhacienda.gov.co/pol%C3%ADtica-fiscal/marco-fiscal-de-mediano-plazo/2026"},
 {k:"aval24", t:"Ministerio de Hacienda (2024). <b>Concepto de aval fiscal al proyecto de reforma pensional</b> (viceministro técnico (e) Diego Guevara): VPN 2025–2100 de 121,13 % del PIB con reforma frente a 87,67 % sin reforma. Reseña de El Tiempo, 5 jun 2024.", u:"https://www.eltiempo.com/economia/sectores/ministerio-de-hacienda-dio-aval-fiscal-a-la-reforma-pensional-costaria-121-13-del-pib-3349465"},
 {k:"carf24", t:"Comité Autónomo de la Regla Fiscal, Dirección Técnica (2024). <b>Tercera Actualización – Análisis Técnico sobre la Reforma Pensional</b> (ponencia tercer debate), Bogotá, 4 de junio de 2024. Modelo CEDE (Universidad de los Andes), horizonte 2100.", u:"https://www.carf.gov.co/documents/d/guest/2024-06-04-tercer-alcance-documento-tecnico-reforma-pensional-ponencia-tercer-debate_v7?download=true"},
 {k:"carf23", t:"Comité Autónomo de la Regla Fiscal (2023). Primer análisis técnico del proyecto «Cambio por la Vejez»: VPN −132,5 % del PIB sin reforma vs −160,5 % con el proyecto radicado; recomendación de umbral de 1 SMMLV (ahorro ≈ 20 % del PIB). Reseña de Semana, 9 may 2023.", u:"https://www.semana.com/economia/macroeconomia/articulo/reforma-pensional-multiplicaria-deficit-por-financiar-mas-a-colpensiones-comite-de-expertos-de-la-regla-fiscal-propone-cambios/202300/"},
 {k:"danePPED", t:"DANE (2025). <b>Proyecciones de Población y Estudios Demográficos – Nota técnica, actualización julio de 2025</b> (método de componentes con enfoque multirregional; Lee-Carter; Rogers-Castro).", u:"https://www.dane.gov.co/files/censo2018/proyecciones-de-poblacion/Nacional/NotaTecnica-PPED-jul2025.pdf"},
 {k:"daneMayores", t:"DANE (2021). <b>Personas mayores en Colombia: hacia la inclusión y la participación</b>. Nota estadística, noviembre de 2021 (cruce GEIH – registros administrativos 2020).", u:"https://www.dane.gov.co/files/investigaciones/notas-estadisticas/nov-2021-nota-estadistica-personas-mayores-en-colombia-presentacion.pdf"},
 {k:"daneGEIH", t:"DANE (2026). <b>GEIH – Empleo informal y seguridad social</b>, trimestre móvil abril–junio 2026: 54,5 % de ocupados informales (23 ciudades 41,9 %; centros poblados y rural disperso 83,2 %).", u:"https://www.dane.gov.co/index.php/estadisticas-por-tema/mercado-laboral/empleo-informal-y-seguridad-social"},
 {k:"oit25", t:"Organización Internacional del Trabajo (2025). <b>Sistema de Protección Social Integral para la Vejez, Invalidez y Muerte de origen común. Análisis de la Ley 2381 de 2024 de Colombia a la luz del Convenio núm. 102</b>. Ginebra: OIT, abril de 2025. DOI 10.54394/YMCM4040.", u:"https://www.ilo.org/sites/default/files/2025-04/Analisis%20Ley%202381%20y%20Convenio%20102.pdf"},
 {k:"oecd23", t:"OECD (2023). <b>Pensions at a Glance 2023 – Country profile: Colombia</b>. Gasto público en pensiones 5,7 % del PIB (OCDE 7,7 %); población 65+ = 14,5 % de la población en edad de trabajar (OCDE 31,3 %).", u:"https://www.oecd.org/content/dam/oecd/en/publications/support-materials/2023/12/pensions-at-a-glance-2023_4757bf20/country-profiles/Colombia.pdf"},
 {k:"asof26", t:"Asofondos (2026). <b>XIX Congreso Asofondos</b> (22 abr 2026): ahorro administrado por las AFP $548 billones, más de 20 millones de afiliados; rentabilidad histórica 10,3 % (mayor riesgo), 9,7 % (moderado), 7,9 % (conservador). Reseña ABC Economía.", u:"https://abceconomia.co/2026/04/22/congreso-asofondos-alerta-por-alza-del-57-en-costo-de-pension/"},
 {k:"asof25", t:"Asofondos / Semana (2025). Ahorro en fondos privados $468,8 billones; rendimientos acumulados desde 1995 $329,92 billones (14,06 % nominal anual); 19,21 millones de afiliados a dic-2024; rentabilidad real de multifondos desde 2011 ≈ 8 %.", u:"https://www.semana.com/economia/macroeconomia/articulo/ahorros-de-trabajadores-en-fondos-privados-de-pension-llegaron-a-4688-billones-con-518-billones-en-rendimientos/202548/"},
 {k:"sfc", t:"Superintendencia Financiera de Colombia (2026). <b>Fondos de pensiones obligatorias: valor del fondo, afiliados y rentabilidad</b> (actualización 18 ago 2026); Carta Circular 39 de 2026 (rentabilidad mínima).", u:"https://www.superfinanciera.gov.co/publicaciones/9125/informes-y-cifrascifraspensiones-cesantias-y-fiduciariasinformacion-por-sector-pensiones-y-cesantiasregimen-de-ahorro-individual-con-solidaridad-fondos-de-pensiones-obligatoriasvalor-del-fondo-9125/"},
 {k:"abece", t:"Ministerio de Salud y Protección Social (2025). <b>ABECÉ Reforma Pensional – Aspectos generales de la Ley 2381</b> (operación PILA, transición, tarifas al Fondo de Solidaridad Pensional).", u:"https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VP/DOA/abece-reforma-pensional-ley-2381-de-2024.pdf"},
 {k:"pilarSol", t:"Presidencia de la República / Prosperidad Social (2025–2026). Pilar Solidario y Renta Básica Solidaria: ampliación de 1,7 a 3,1 millones de personas mayores; $230.000 mensuales en 2026; Colombia Mayor $80.000 para no elegibles.", u:"https://www.presidencia.gov.co/prensa/Paginas/Prosperidad-Social-inicia-busqueda-de-personas-mayores-para-el-Pilar-Solidario-250826.aspx"},
 {k:"d1469", t:"Gobierno Nacional (2025). <b>Decretos 1469 y 1470 de 2025</b> (29 dic): salario mínimo 2026 de $1.750.905 (+23 %) y auxilio de transporte de $249.095. Suspensión provisional levantada por el Consejo de Estado (17 jul 2026). Reseña Holland & Knight.", u:"https://www.hklaw.com/en/insights/publications/2025/12/colombia-decreta-aumento-del-salario-minimo-y-auxilio-de-transporte"},
 {k:"d1485", t:"Gobierno Nacional (2025). <b>Decreto 1485 de 2025</b> (31 dic): sustituye el mecanismo de cobertura de deslizamiento del salario mínimo (Título 17, Libro 2, Parte 2 del Decreto 1833 de 2016). Reseña Portafolio, ene 2026.", u:"https://www.portafolio.co/economia/finanzas/decreto-del-gobierno-disolveria-posibilidad-de-pension-a-quienes-ganan-salario-minimo-y-cotizan-en-fondos-privados-485599"},
 {k:"d0415", t:"Gobierno Nacional (2026). <b>Decreto 0415 de 2026</b> (20–23 abr): ordena a las AFP transferir a Colpensiones los saldos de ~120.000 afiliados que cambiaron de régimen (~$25 billones) en plazos de 15 a 30 días. Reseña Infobae 23 abr 2026 (críticas de Asofondos: Santiago García, Andrés Velasco).", u:"https://www.infobae.com/colombia/2026/04/23/el-gobierno-ordeno-trasladar-25-billones-de-los-fondos-privados-a-colpensiones/"},
 {k:"d514", t:"Gobierno Nacional (2025). <b>Decreto 514 de 2025</b>, reglamenta y compila normas del Sistema de Protección Social Integral para la Vejez (Ley 2381).", u:"https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=179081"},
 {k:"etRegimenes", t:"Cigüenza Riaño, N. (2024). «El 72 % del presupuesto público de las pensiones en Colombia se va a los regímenes especiales». El Tiempo, 28 abr 2024 (PGN 2023: $54,6 billones; Colpensiones $15,4 billones; FFMM/Policía 288.044 pensionados; FOMAG 236.450).", u:"https://www.eltiempo.com/economia/sectores/el-72-del-presupuesto-publico-de-las-pensiones-se-va-a-los-regimenes-especiales-3338189"},
 {k:"semanaMFMP", t:"Semana (2026). «Colpensiones y el gasto en pensiones que se espera. Fuerte presión a la billetera pública», 15 jun 2026 (cifras del MFMP 2026: nómina 1.864.080 pensionados; +90.000/año; ingresos propios 2,3 % vs gasto 4,6 % del PIB; 24 millones de afiliados esperados).", u:"https://www.semana.com/economia/macroeconomia/articulo/colpensiones-y-el-gasto-en-pensiones-que-se-espera-fuerte-presion-a-la-billetera-publica/202647/"},
 {k:"elcolC264", t:"El Colombiano (2026). «Abecé de la reforma pensional: esto fue lo que avaló la Corte y lo que quedó pendiente», 26 ago 2026.", u:"https://www.elcolombiano.com/negocios/reforma-pensional-corte-constitucional-articulos-aprobados-pendientes-2026-KE40333678"},
 {k:"lafmProp", t:"La FM (2026). «Las propuestas que la Cámara deberá resolver tras el fallo sobre la reforma pensional» (proposiciones de Salcedo, Zabaraín y Pedraza; plazo de 30 días hábiles).", u:"https://www.lafm.com.co/economia/camara-revisara-propuestas-pendientes-reforma-pensional-decision-corte-constitucional-409010"},
 {k:"portHeredable", t:"Portafolio (2025). «Ahorro pensional en el pilar semicontributivo no será heredable, según el Ministerio del Trabajo».", u:"https://www.portafolio.co/economia/empleo/ahorro-pensional-en-el-pilar-semicontributivo-no-sera-heredable-segun-el-ministerio-del-trabajo-634587"},
 {k:"anifFedes", t:"El Heraldo (2023). «Reforma aumentaría el pasivo pensional: Anif y Fedesarrollo» (Mauricio Santa María; Luis Fernando Mejía): en el RPM el 20 % más pobre recibe 0,13 % de los subsidios y el 20 % más rico 76,8 %; propuesta de piso en la línea de pobreza extrema.", u:"https://www.elheraldo.co/economia/reforma-aumentaria-el-pasivo-pensional-anif-y-fedesarrollo-982275"},
 {k:"uniandes", t:"Universidad de los Andes (2024). «Sistema pensional colombiano: avances y riesgos de la reforma aprobada» (Óscar Becerra, Facultad de Economía).", u:"https://www.uniandes.edu.co/es/noticias/economia/sistema-pensional-colombiano-avances-y-riesgos-de-la-reforma-aprobada"},
 {k:"cepal20", t:"CEPAL (2020). <b>El sistema de pensiones en Colombia: institucionalidad, gasto público y sostenibilidad financiera</b>. Serie Macroeconomía del Desarrollo. Santiago: Naciones Unidas.", u:"https://www.cepal.org/es/publicaciones/45780-sistema-pensiones-colombia-institucionalidad-gasto-publico-sostenibilidad"},
 {k:"rv08", t:"Superintendencia Financiera (2010). <b>Resolución 1555 de 2010</b>: tablas de mortalidad de rentistas hombres y mujeres (RV08) para el cálculo de reservas y rentas vitalicias.", u:"https://www.superfinanciera.gov.co/"},
 {k:"smmlv", t:"Banco de la República. <b>Serie histórica del salario mínimo legal mensual</b> (1984–2026) y Ministerio del Trabajo, decretos anuales.", u:"https://www.banrep.gov.co/es/estadisticas/salarios"},
 {k:"ipc", t:"DANE. <b>Índice de Precios al Consumidor (IPC)</b>, variación anual, serie histórica.", u:"https://www.dane.gov.co/index.php/estadisticas-por-tema/precios-y-costos/indice-de-precios-al-consumidor-ipc"},
 {k:"dane2036", t:"Presidencia de la República (2025). «En 2036, Colombia tendrá más adultos mayores que niños: proyección del DANE» (23 jul 2025).", u:"https://www.presidencia.gov.co/prensa/Paginas/En-2036-Colombia-tendra-mas-adultos-mayores-que-ninos-proyeccion-del-Dane-250723.aspx"},
 {k:"port2070", t:"Portafolio (2025). «Envejecimiento y decrecimiento poblacional en Colombia: proyecciones y efectos económicos al 2070» (con base en DANE, PPED 2025): 65+ pasa de 10,1 % a ≈29 %; dependencia de mayores 14 % → 48,2 %.", u:"https://www.portafolio.co/economia/crecimiento/envejecimiento-y-decrecimiento-poblacional-en-colombia-proyecciones-y-efectos-economicos-al-2070-637797"},
 {k:"infobaeInf", t:"Infobae (2026). «Más de la mitad de los trabajadores de Colombia no tiene garantizada una pensión: el DANE midió 54,5 % de informalidad», 14 ago 2026.", u:"https://www.infobae.com/colombia/2026/08/14/mas-de-la-mitad-de-los-trabajadores-de-colombia-no-tiene-garantizada-una-pension-el-dane-midio-545-de-informalidad/"},
 /* --- Literatura IA / automatización --- */
 {k:"fedesAuto", t:"Mejía, L. F. & Pabón, C. (2023). <b>COVID-19 y riesgo de automatización en el mercado laboral de los países andinos</b>. Fedesarrollo – Banco Interamericano de Desarrollo (difusión 4 mar 2024): 58 % de los ocupados en Colombia con alta probabilidad de automatización en el mediano plazo (54 % Bolivia, 61 % Ecuador, 65 % Perú).", u:"https://publications.iadb.org/es/covid-19-y-riesgo-de-automatizacion-en-el-mercado-laboral-de-los-paises-andinos"},
 {k:"banrepAuto", t:"Bonilla-Mejía, L.; Flórez, L. A.; Hermida, D.; Lasso-Valderrama, F. J.; Morales, L. F.; Ospina-Tejeiro, J. J. & Pulido, J. (2022). <b>¿La pandemia del Covid-19 aceleró la automatización en países en desarrollo? Evidencia para Colombia</b>. Borradores de Economía, Banco de la República (vacantes SPE + GEIH; índices Frey-Osborne y Nedelkoska-Quintini).", u:"https://www.banrep.gov.co/es/pandemia-covid-19-acelero-automatizacion-paises-desarrollo-evidencia-colombia"},
 {k:"labour26", t:"Universidad del Rosario – Observatorio Laboral LaboUR (2026). Exposición a la IA con GEIH 2025: 25,8 % de los ocupados (5,9 millones) en alta exposición; informalidad 55,7 %. Reseña Infobae, 29 abr 2026.", u:"https://www.infobae.com/colombia/2026/04/29/la-cuarta-parte-de-los-trabajos-en-colombia-esta-en-riesgo-por-culpa-de-la-inteligencia-artificial-estos-son-las-conclusiones-de-estudio-de-la-universidad-del-rosario/"},
 {k:"asocap26", t:"Asocapitales (2026). Estudio de exposición y complementariedad a la IA en 23 ciudades: 3,27 millones de trabajadores en alta exposición y baja complementariedad; 48,1 % de ocupados expuestos. Reseña Forbes Colombia, 1 ago 2026.", u:"https://forbes.co/2026/08/01/capital-humano/ia-acelera-transformacion-del-empleo-en-colombia-y-eleva-riesgo-de-automatizacion/"},
 {k:"conpes4144", t:"Departamento Nacional de Planeación (2025). <b>Documento CONPES 4144 – Política Nacional de Inteligencia Artificial</b> (14 feb 2025), presupuesto indicativo $479 mil millones a 2030.", u:"https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf"},
 {k:"conpes3975", t:"Departamento Nacional de Planeación (2019). <b>Documento CONPES 3975 – Política Nacional para la Transformación Digital e Inteligencia Artificial</b>.", u:"https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/3975.pdf"},
 {k:"mision", t:"Levy, S. & Maldonado, D. (2021). <b>Misión de Empleo 2020–2021: Informe final</b>. Departamento Nacional de Planeación – Ministerio del Trabajo. (Diagnóstico de informalidad y diseño de la protección social.)", u:"https://www.misionempleo.gov.co/"},
 {k:"gmyrek24", t:"Gmyrek, P.; Winkler, H. & Garganta, S. (2024). <b>Buffer or Bottleneck? Employment Exposure to Generative AI and the Digital Divide in Latin America</b>. ILO Working Paper 121 / World Bank Policy Research Working Paper 10863.", u:"https://www.ilo.org/sites/default/files/2024-07/WP121_web.pdf"},
 {k:"gmyrek26", t:"Gmyrek, P.; Viollaz, M. & Winkler, H. (2026). <b>Disruption without Dividend? How the Digital Divide and Task Differences Split GenAI's Global Impact</b>. World Bank Policy Research Working Paper 11328.", u:"https://ideas.repec.org/p/wbk/wbrwps/11328.html"},
 {k:"gmyrek23", t:"Gmyrek, P.; Berg, J. & Bescond, D. (2023). <b>Generative AI and jobs: A global analysis of potential effects on job quantity and quality</b>. ILO Working Paper 96.", u:"https://www.ilo.org/publications/generative-ai-and-jobs-global-analysis-potential-effects-job-quantity-and"},
 {k:"gmyrek25", t:"Gmyrek, P. et al. (2025). <b>Generative AI and Jobs: A Refined Global Index of Occupational Exposure</b>. ILO Working Paper 140 (OIT–NASK), 20 may 2025: 25 % del empleo mundial con alguna exposición; 3,3 % en la categoría de mayor riesgo.", u:"https://www.ilo.org/sites/default/files/2025-05/WP140_web.pdf"},
 {k:"imf24", t:"Cazzaniga, M.; Jaumotte, F.; Li, L.; Melina, G.; Panton, A. J.; Pizzinelli, C.; Rockall, E. & Tavares, M. M. (2024). <b>Gen-AI: Artificial Intelligence and the Future of Work</b>. IMF Staff Discussion Note SDN/2024/001: ≈40 % del empleo mundial expuesto (60 % en economías avanzadas, 40 % en emergentes, 26 % en países de ingreso bajo).", u:"https://www.imf.org/en/publications/staff-discussion-notes/issues/2024/01/14/gen-ai-artificial-intelligence-and-the-future-of-work-542379"},
 {k:"ar22", t:"Acemoglu, D. & Restrepo, P. (2022). <b>Demographics and Automation</b>. <i>Review of Economic Studies</i>, 89(1), 1–44. DOI 10.1093/restud/rdab031.", u:"https://academic.oup.com/restud/article-abstract/89/1/1/6295889"},
 {k:"ar20", t:"Acemoglu, D. & Restrepo, P. (2020). <b>Robots and Jobs: Evidence from US Labor Markets</b>. <i>Journal of Political Economy</i>, 128(6), 2188–2244.", u:"https://www.journals.uchicago.edu/doi/10.1086/705716"},
 {k:"acemoglu24", t:"Acemoglu, D. (2024). <b>The Simple Macroeconomics of AI</b>. NBER Working Paper 32487 (publicado en <i>Economic Policy</i>, 2025).", u:"https://www.nber.org/papers/w32487"},
 {k:"autor24", t:"Autor, D.; Chin, C.; Salomons, A. & Seegmiller, B. (2024). <b>New Frontiers: The Origins and Content of New Work, 1940–2018</b>. <i>Quarterly Journal of Economics</i>, 139(3), 1399–1465.", u:"https://academic.oup.com/qje/article/139/3/1399/7630196"},
 {k:"frey17", t:"Frey, C. B. & Osborne, M. A. (2017). <b>The future of employment: How susceptible are jobs to computerisation?</b> <i>Technological Forecasting and Social Change</i>, 114, 254–280.", u:"https://doi.org/10.1016/j.techfore.2016.08.019"},
 {k:"eloundou", t:"Eloundou, T.; Manning, S.; Mishkin, P. & Rock, D. (2024). <b>GPTs are GPTs: Labor market impact potential of LLMs</b>. <i>Science</i>, 384(6702), 1306–1308 (arXiv:2303.10130, 2023).", u:"https://arxiv.org/abs/2303.10130"},
 {k:"felten", t:"Felten, E.; Raj, M. & Seamans, R. (2021). <b>Occupational, industry, and geographic exposure to artificial intelligence</b>. <i>Strategic Management Journal</i>, 42(12), 2195–2217.", u:"https://doi.org/10.1002/smj.3286"},
 {k:"bryn", t:"Brynjolfsson, E.; Li, D. & Raymond, L. (2025). <b>Generative AI at Work</b>. <i>Quarterly Journal of Economics</i>, 140(2), 889–942 (NBER WP 31161, 2023): +14 % de productividad en soporte al cliente, +34 % en trabajadores novatos.", u:"https://www.nber.org/papers/w31161"},
 {k:"noy", t:"Noy, S. & Zhang, W. (2023). <b>Experimental evidence on the productivity effects of generative artificial intelligence</b>. <i>Science</i>, 381(6654), 187–192.", u:"https://www.science.org/doi/10.1126/science.adh2586"},
 {k:"dellacqua", t:"Dell'Acqua, F. et al. (2023). <b>Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality</b>. Harvard Business School Working Paper 24-013.", u:"https://www.hbs.edu/faculty/Pages/item.aspx?num=64700"},
 {k:"korinek", t:"Korinek, A. & Stiglitz, J. E. (2019). <b>Artificial Intelligence and Its Implications for Income Distribution and Unemployment</b>. En Agrawal, Gans & Goldfarb (eds.), <i>The Economics of Artificial Intelligence: An Agenda</i>. University of Chicago Press (NBER WP 24174).", u:"https://www.nber.org/papers/w24174"},
 {k:"garg26", t:"Garg, P.; Crosta, T. & Baier, J. (2026). <b>Global Automation Atlas</b>. arXiv:2605.17086 (18.797 tareas clasificadas con LLM en 124 economías; exposición entre 3,3 % y 61,6 %).", u:"https://arxiv.org/abs/2605.17086"},
 {k:"yango26", t:"Wabenga Yango, J. (2026). <b>Automation and Aging in General Equilibrium: AI Capital, Fertility, and the Return to Capital</b>. arXiv:2606.22037 (modelo de generaciones traslapadas).", u:"https://arxiv.org/abs/2606.22037"},
 {k:"abbott", t:"Abbott, R. & Bogenschneider, B. (2018). <b>Should Robots Pay Taxes? Tax Policy in the Age of Automation</b>. <i>Harvard Law & Policy Review</i>, 12, 145–175.", u:"https://harvardlpr.com/wp-content/uploads/sites/20/2018/03/AbbottBogenschneider.pdf"},
 /* --- Jerome Sanabria: columnas y entrevistas --- */
 {k:"sMini", t:"Infobae (2024). «Error en la reforma pensional de Petro haría que a trabajadores les llegue menos dinero: ya se anuncia una demanda», 30 jul 2024 (tesis de Jerome Sanabria: «mini pensiones» de $82.000 a $280.000; 12 millones de afectados; caso de 416 semanas: $112 millones vs $110.000/mes; convocatoria #NoConMiAhorro).", u:"https://www.infobae.com/colombia/2024/07/30/error-en-la-reforma-pensional-de-petro-haria-que-a-trabajadores-les-llegue-menos-dinero-ya-se-anuncia-una-demanda/"},
 {k:"sIncomodando", t:"Sanabria, J. (2024). «Los estamos incomodando». La República, 29 oct 2024.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/los-estamos-incomodando-3986329"},
 {k:"sMejor", t:"Sanabria, J. (2025). «El mejor año de mi vida». La República, 29 abr 2025 (columna número 52).", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/el-mejor-ano-de-mi-vida-4121450"},
 {k:"sEnvejecer", t:"Sanabria, J. (2025). «Sin permiso para envejecer». La República, 20 ago 2025.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/sin-permiso-para-envejecer-4205257"},
 {k:"sCorte", t:"Sanabria, J. (2025). «Corte, en ti confío». La República, 27 ago 2025.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/corte-en-ti-confio-4210383"},
 {k:"sSeguro", t:"Sanabria, J. (2026). «El nuevo Seguro Social». La República, 15 ene 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/el-nuevo-seguro-social-4305371"},
 {k:"sRazon", t:"Sanabria, J. (2026). «Siempre tuvimos la razón». La República, 27 mar 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/siempre-tuvimos-la-razon-4358149"},
 {k:"sTigre", t:"Sanabria, J. (2026). «La pensional del Tigre». La República, 21 may 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/la-pensional-del-tigre-4396595"},
 {k:"sOscuro", t:"Sanabria, J. (2026). «Oscuro panorama». La República, 24 jul 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/oscuro-panorama-4442063"},
 {k:"sArchiven", t:"Sanabria, J. (2026). «¡Archiven la pensional!». La República, 21 ago 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/archiven-la-pensional-4463222"},
 {k:"sRuja", t:"Sanabria, J. (2026). «Que ruja el Tigre». La República, 29 ago 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/que-ruja-el-tigre-4469797"},
 {k:"sPanito", t:"Sanabria, J. (2026). «Pañito de agua tibia». La República, 5 sep 2026.", u:"https://www.larepublica.co/analisis/jerome-sanabria-3850986/panito-de-agua-tibia-4475032"},
 {k:"sChichigua", t:"Infobae (2026). «Jerome Sanabria arremetió con datos contra la reforma pensional que dejó Gustavo Petro: “Una chichigua vitalicia”», 26 ago 2026.", u:"https://www.infobae.com/colombia/2026/08/26/jerome-sanabria-arremetio-con-datos-contra-la-reforma-pensional-que-dejo-gustavo-petro-una-chichigua-vitalicia/"},
 {k:"sPerdimos", t:"Infobae (2026). «Jerome Sanabria explicó por qué según ella “perdimos millones de colombianos”…», 26 ago 2026.", u:"https://www.infobae.com/colombia/2026/08/26/jerome-sanabria-explico-por-que-segun-ella-perdimos-millones-de-colombianos-con-la-aprobacion-de-la-reforma-pensional-por-parte-de-la-corte-constitucional/"},
 {k:"sContra", t:"Infobae (2026). «Jerome Sanabria calificó decisión de la Corte… como una “vergüenza” y propuso una contrarreforma», 27 ago 2026.", u:"https://www.infobae.com/colombia/2026/08/27/jerome-sanabria-califico-decision-de-la-corte-sobre-la-reforma-pensional-de-petro-como-una-verguenza-y-propuso-una-contrarreforma-a-disposicion-de-salvacion-nacional-centro-democratico-y-cambio-radical/"},
 {k:"sTransicion", t:"Infobae (2026). «Jerome Sanabria explicó quiénes entrarían en el régimen de transición de la reforma pensional: “Vengo a darles tranquilidad”», 1 sep 2026.", u:"https://www.infobae.com/colombia/2026/09/01/jerome-sanabria-explico-quienes-entrarian-en-el-regimen-de-transicion-de-la-reforma-pensional-vengo-a-darles-tranquilidad/"},
 {k:"sDevolucion", t:"Infobae (2026). «“Les roba su devolución de saldos”: decisión de la Corte sobre la reforma pensional genera dudas…», 26 ago 2026.", u:"https://www.infobae.com/colombia/2026/08/26/les-roba-su-devolucion-de-saldos-decision-de-la-corte-sobre-la-reforma-pensional-genera-dudas-afectara-los-ahorros-de-quienes-no-completen-las-semanas-para-pensionarse/"},
 {k:"sLaFM", t:"La FM (2026). «“No vamos a depender de una pensión estatal”: la advertencia de Jerome Sanabria sobre recursos de pensiones» (traslado de $25 billones; propuesta de que vayan al fondo del Banco de la República).", u:"https://www.lafm.com.co/economia/traslado-recursos-colpensiones-fondos-privados-pension-estatal-jerome-sanabria-recursos-399116"},
 {k:"semanaC264", t:"Semana (2026). «Reforma pensional: sobrevivió al procedimiento, pero la batalla jurídica continúa» (análisis de Carolina Camacho, Laura Pérez, Rafael Serrano, Misael Triana).", u:"https://www.semana.com/economia/empresas/articulo/reforma-pensional-sobrevivio-al-procedimiento-pero-la-batalla-juridica-continua/202600/"},
 /* --- Series históricas y análisis de subsidios --- */
 {k:"farne17", t:"Farné, S. & Nieto Ramos, A. (2017). <b>¿A quiénes y cuánto subsidia el Régimen Pensional de Prima Media en Colombia?</b> Observatorio del Mercado de Trabajo y la Seguridad Social, Universidad Externado de Colombia, septiembre de 2017 (supuestos: 13 % de cotización, 4 % real de rendimiento y de interés técnico, densidad 87,1 %, 1.300 semanas, Resolución 3099/2015).", u:"https://incp.org.co/Site/publicaciones/info/archivos/a-quienes-y-cuanto-subsidia-el-regimen-pensional-de-prima-media-en-colombia.pdf"},
 {k:"banrep1271", t:"Ospina-Tejeiro, J. J.; Ramos-Forero, J. E.; López-Valenzuela, D. C.; Hernández-Turca, Y. & Herrera-Pinto, N. V. (2024). <b>El sistema de pensiones en Colombia: perspectivas y riesgos fiscales con base en las normas vigentes</b>. Borradores de Economía 1271, Banco de la República (gasto en pensiones &lt; 3,6 % del PIB en el escenario base; hasta 8 % con menor crecimiento; +0,3 % del PIB anual por longevidad o por mayor formalidad dados los subsidios implícitos).", u:"https://ideas.repec.org/p/bdr/borrec/1271.html"},
 {k:"sfc30", t:"Superintendencia Financiera de Colombia (2024). <b>30 años del sistema pensional: hitos y desafíos</b>: 25,8 millones de afiliados a fondos obligatorios, 12,6 millones activos (49 %); 1.974.826 pensionados (16 % del RAIS); activos administrados $459,5 billones; aportes a las AFP 2023 $33,5 billones (2,1 % del PIB); 78 % (RAIS) y 84 % (Colpensiones) de los cotizantes activos ganan hasta 2 SMMLV.", u:"https://www.superfinanciera.gov.co/publicaciones/10115107/30-anos-del-sistema-pensional-hitos-y-desafios/"},
 {k:"bloomberg21", t:"Bloomberg Línea (2021). «¿Cuánta gente se pensiona al año en Colombia y con cuánta plata?», 25 oct 2021 (pensionados de Colpensiones 2015–2020 y distribución de mesadas 2020, con datos de Colpensiones y Asofondos).", u:"https://www.bloomberglinea.com/2021/10/25/cuanta-gente-se-pensiona-al-ano-en-colombia-y-con-cuanta-plata/"},
 {k:"port2022", t:"Portafolio (2023). «Colpensiones cerró el 2022 con 1,57 millones de jubilados»; Colpensiones en cifras, diciembre de 2022: 6.772.000 afiliados, 40 % cotizó el último mes, 78,4 % cotiza sobre 1 SMMLV.", u:"https://www.portafolio.co/mis-finanzas/jubilacion/colpensiones-cerro-el-2022-con-1-57-millones-de-jubilados-577650"},
 {k:"port2018", t:"Portafolio (2019). «Casi 70.000 personas recibieron la jubilación en Colpensiones en 2018»: 1.328.986 pensionados y 6.702.549 afiliados al cierre de 2018.", u:"https://www.portafolio.co/mis-finanzas/jubilacion/casi-70-000-personas-recibieron-la-jubilacion-en-colpensiones-en-2018-525600"},
 {k:"lr2020", t:"La República (2020). «Colpensiones llegó al millón de pensionados por vejez y cuestan más de $27 billones», 12 feb 2020: 1,38 millones de pensionados en 2019; nómina anual $30,2 billones; 76,98 % de las pensiones por debajo de 2 SMMLV.", u:"https://www.larepublica.co/finanzas/llegamos-al-millon-de-pensionados-por-vejez-juan-miguel-villa-presidente-de-colpensiones-2963333"},
 {k:"colpDic21", t:"Colpensiones (2022). <b>Colpensiones en cifras, diciembre de 2021</b>: ≈ 6,8 millones de afiliados y 1,49 millones de pensionados.", u:"https://www.colpensiones.gov.co/publicaciones/4766/colpensiones-en-cifras-diciembre-2021/"},
 {k:"colp2023", t:"Colpensiones (2024). «Récord histórico de Colpensiones en 2023»: 6.798.472 afiliados, 1.648.199 pensionados, 103.813 nuevas pensiones, 103.272 solicitudes de traslado desde el RAIS.", u:"https://www.colpensiones.gov.co/publicaciones/4995/record-historico-de-colpensiones-en-2023/"},
 {k:"colpDic24", t:"Colpensiones (2025). <b>Colpensiones en cifras, diciembre de 2024</b>: 6.897.249 afiliados (38,4 % cotizó el último mes; 68,6 % sobre 1 SMMLV), 1.747.842 pensionados (54,8 % con 1 SMMLV; 23,3 % con 2).", u:"https://www.colpensiones.gov.co/publicaciones/5066/colpensiones-en-cifras-diciembre-2024/"},
 {k:"lafm2017", t:"La FM (2018). «Ahorro pensional alcanzó los 227 billones de pesos en 2017: Asofondos» (≈ 25 % del PIB).", u:"https://www.lafm.com.co/economia/ahorro-pensional-alcanzo-los-227-billones-de-pesos-en-2017-asofondos"},
 {k:"asof2022", t:"Asofondos (2023). «2022, un año con volatilidades y ahorro pensional en $345 billones» (2021: $357,8 billones; rendimientos 2019 $39,7 bn, 2020 $27,1 bn, 2021 $31,8 bn; 18,4 millones de afiliados a jun-2022).", u:"https://asofondos.org.co/comunicados/2022-un-ano-con-volatilidades-y-ahorro-pensional-en-345-billones/"},
 {k:"asofCifras", t:"Asofondos (2026). <b>Estudios y cifras – Cifras del sector</b> (junio 2026): 19.418.858 afiliados a pensiones obligatorias; 11.728.494 a cesantías; 1.004.234 a pensiones voluntarias.", u:"https://asofondos.org.co/estudios-y-cifras/"},
 {k:"lr2026rais", t:"La República (2026). «De 26 millones de afiliados en los fondos privados, solo 395.058 se han pensionado», 26 ago 2026 (datos del Ministerio de Hacienda; Colpensiones 7,2 M afiliados y ≈ 1,9 M pensionados; Porvenir 12,05 M, Protección 5,03 M, Colfondos 1,63 M, Skandia 0,13 M).", u:"https://www.larepublica.co/finanzas/de-26-millones-de-afiliados-en-fondos-privados-solo-395-058-se-han-pensionado-4467135"},
 {k:"etAportes", t:"El Tiempo (2023). «Más de $25 billones de impuestos se usarán para tapar déficit de Colpensiones», 31 jul 2023: aporte de la Nación de $25,1 billones en el PGN 2024 (44 % de los $57,4 billones para pensiones) frente a $19,4 billones en 2023.", u:"https://www.eltiempo.com/economia/sectores/mas-de-25-billones-de-impuestos-se-usaran-para-tapar-deficit-de-colpensiones-791397"},
 {k:"danePIB", t:"DANE. <b>Cuentas nacionales anuales – PIB a precios corrientes</b> (2017–2024; cifras redondeadas en billones de pesos).", u:"https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales/cuentas-nacionales-anuales"},
 {k:"bosch15", t:"Bosch, M.; Berstein, S.; Castellani, F.; Oliveri, M. L. & Villa, J. M. (2015). <b>Diagnóstico del sistema previsional colombiano y opciones de reforma</b>. Banco Interamericano de Desarrollo, Nota técnica IDB-TN-825.", u:"https://publications.iadb.org/publications/spanish/document/Diagn%C3%B3stico-del-sistema-previsional-colombiano-y-opciones-de-reforma.pdf"},
 {k:"carf24u", t:"Comité Autónomo de la Regla Fiscal (2024). <b>Análisis técnico sobre la reforma pensional — tercer alcance</b> (ponencia para tercer debate), 4 de junio de 2024. Escenarios de umbral con el modelo CEDE de la Universidad de los Andes: el 66 % de las cotizaciones se hace hoy sobre ingresos ≤ 2,3 SMMLV; bajar el umbral de 3 a 2,3 reduce el VPN del sistema en 3,3 % del PIB; con umbral de 1 SMMLV el acervo de ahorro nacional sería ≈ 17,1 pp del PIB mayor que en el escenario actual.", u:"https://www.carf.gov.co/documents/d/guest/2024-06-04-tercer-alcance-documento-tecnico-reforma-pensional-ponencia-tercer-debate_v7?download=true"},
 {k:"senadoU", t:"Senado de la República (2024). <b>«Reforma pensional: umbral de cotización a Colpensiones quedó en 2,3 salarios mínimos»</b>. Comunicado de prensa sobre el acuerdo alcanzado en el debate del Senado.", u:"https://www.senado.gov.co/index.php/el-senado/noticias/5460-reforma-pensional-umbral-de-cotizacion-a-colpensiones-quedo-en-2-3-salarios-minimos"},
 {k:"mintrabU", t:"Ministerio del Trabajo (2024). <b>«Prestación anticipada de vejez y umbral de 2.3 salarios mínimos a Colpensiones fueron aprobados en tercer debate de reforma pensional»</b>, mayo de 2024.", u:"https://www.mintrabajo.gov.co/comunicados/2024/mayo/prestacion-anticipada-de-vejez-y-umbral-de-2.3-salarios-minimos-a-colpensiones-fueron-aprobados-en-tercer-debate-de-reforma-pensional"},
 {k:"petro4", t:"El Tiempo (2024). <b>«En alocución, Petro insiste en que el umbral para cotizar en Colpensiones sea de cuatro salarios mínimos»</b>: tras aprobarse el umbral de 2,3 en el Senado, el presidente pidió a la Cámara elevarlo a 4 SMLMV; la Cámara mantuvo 2,3.", u:"https://www.eltiempo.com/politica/gobierno/en-alocucion-petro-insiste-en-cambios-al-texto-de-reforma-pensional-aprobado-por-senado-3337123"},
 {k:"carf1sm", t:"El Colombiano (2024). <b>«Comité de la Regla Fiscal sugiere umbral de 1 mínimo para la reforma pensional»</b>, 5 de junio de 2024: con umbral de 1 SMLMV el ahorro nacional aumentaría ≈ 17,1 pp del PIB; con el umbral aprobado de 2,3 las obligaciones de Colpensiones pasan de 3 % del PIB (2025) a 4,9 % (2065) y las transferencias de la Nación de 1,3 % a 3,8 % del PIB.", u:"https://www.elcolombiano.com/negocios/carf-plantea-umbral-de-1-salario-minimo-en-reforma-pensional-LJ24694971"},
 {k:"portafolioU", t:"Portafolio (2024). <b>«¿Es sostenible el sistema pensional con umbral de cotización de 2,3 salarios mínimos?»</b>: posiciones de Fedesarrollo (Luis Fernando Mejía pide bajar el umbral a 1,5 SMLMV) y de ANIF sobre la concentración de las cotizaciones en el componente público.", u:"https://www.portafolio.co/mis-finanzas/jubilacion/pensiones-es-viable-un-umbral-de-cotizacion-en-colpensiones-de-2-3-salarios-minimos-603147"},
];
/* ---------- PÁGINAS EXACTAS DE LAS FUENTES EN PDF ----------
   Para cada fuente en PDF se registra la página física (la que entiende
   #page=N del visor) donde está el dato citado. `def` es la página que abre
   el visor cuando la cita no indica una propia con data-page.
   Verificado extrayendo el texto de cada PDF, no por el número impreso.
   Las fuentes cuyo servidor no permitió la descarga (CONPES 4144 y 3975,
   Abbott & Bogenschneider, Bosch et al.) quedan sin mapa de páginas: el
   visor las abre en la primera página y el botón «Abrir fuente» sigue igual. */
SEMANAS.PDFPAGES = {
  oecd23:{def:1, pages:[
    {p:1, d:"Indicadores país: gasto público en pensiones 5,7 % del PIB y población 65+ (14,5 % frente a 31,3 % de la OCDE)"},
    {p:5, d:"Tasas de reemplazo modeladas: neta 103,5 % para 0,5 del salario promedio y 73,1 % para el promedio"}]},
  daneMayores:{def:42, pages:[
    {p:41, d:"Mesada pensional promedio en 2020: $1.565.922 (mujeres) y $1.891.004 (hombres)"},
    {p:42, d:"Cobertura: 25,5 % de hombres de 62+ y mujeres de 57+ recibe pensión; 22,4 % entre las mujeres"}]},
  oit25:{def:18, pages:[
    {p:18, d:"Cobertura proyectada del componente de prima media: ≈ 72 % de los asalariados, sobre el mínimo de 50 % del Convenio 102"},
    {p:28, d:"Renta Básica Solidaria: monto unificado de ≈ $230.226 mensuales"}]},
  gmyrek24:{def:32, pages:[
    {p:32, d:"Colombia, mujeres: 5,5 % del empleo expuesto a automatización, 11,3 % en categoría de aumento y 22,5 % en «gran incógnita»"},
    {p:33, d:"Automatización por sexo (5,5 % mujeres frente a 1,6 % hombres) y por zona (3,9 % urbano frente a 0,8 % rural)"}]},
  gmyrek25:{def:4, pages:[
    {p:4, d:"Resumen: los cuatro gradientes de exposición a la IA generativa y su concentración en ocupaciones de oficina"}]},
  farne17:{def:10, pages:[
    {p:9,  d:"Al subir la edad de pensión, el subsidio de un IBC de 20 SMMLV cae de 33,4 % a 21,7 % (gráfico 4)"},
    {p:10, d:"En el salario mínimo la pensión sigue subsidiada en 71 % de la reserva actuarial (gráfico 5)"}]},
  danePPED:{def:23, pages:[
    {p:13, d:"Estructura de la población base frente a la censada de 2018 (gráfico 1)"},
    {p:21, d:"Resultados: la población de 0 a 14 años pasa de 25,2 % en 2018 a 13,6 % en 2050"},
    {p:23, d:"Índice de envejecimiento 2018 y 2070 (gráfico 8)"}]},
  carf24u:{def:12, pages:[
    {p:11, d:"Metodología: tres escenarios de umbral con el modelo CEDE de la Universidad de los Andes (sin reforma, 3 SMMLV y 2,3 SMMLV base)"},
    {p:12, d:"El 66 % de las cotizaciones se hace hoy sobre ingresos iguales o inferiores a 2,3 SMMLV; con umbral de 3 las cotizaciones a Colpensiones pasan de 2,3 % a 2,5 % del PIB"},
    {p:19, d:"Bajar el umbral de 3 a 2,3 reduce el VPN del sistema en 3,3 % del PIB (gastos −14,8 %, ingresos −11,6 %); agotado el Fondo, el salto de la transferencia es de 2 % del PIB en 2063"},
    {p:20, d:"Con umbral de 1 SMMLV el Fondo se agota antes pero la transferencia queda por debajo; con umbral de 3 el ahorro nacional resulta menor que sin reforma"},
    {p:22, d:"Con umbral de 1 SMMLV el acervo de ahorro nacional sería ≈ 17,1 pp del PIB mayor; antes de la reforma el traslado solo era racional por encima de 1,54 SMMLV"},
    {p:23, d:"Entre menor sea el umbral, mayor el ahorro nacional, menor el subsidio del régimen público y mayor el carácter distributivo de la reforma"}]},
  abece:{def:1, pages:[
    {p:1, d:"Vigencia y aspectos generales de la Ley 2381"},
    {p:2, d:"Umbral de cotización de 2,3 SMLMV y reparto entre componentes"},
    {p:3, d:"Tabla de factores de aporte por rango de IBC en SMLMV"}]}
};

SEMANAS.SRC = {}; SEMANAS.SOURCES.forEach((s,i)=>{ SEMANAS.SRC[s.k]=i+1; });

/* ---------- SERIES ECONÓMICAS Y DEMOGRÁFICAS ---------- */
SEMANAS.DATA = {
  /* Salario mínimo legal mensual vigente (COP). Fuente: Banco de la República / decretos [smmlv] */
  smmlv: {1994:98700,1995:118934,1996:142125,1997:172005,1998:203826,1999:236460,2000:260100,2001:286000,2002:309000,2003:332000,2004:358000,2005:381500,2006:408000,2007:433700,2008:461500,2009:496900,2010:515000,2011:535600,2012:566700,2013:589500,2014:616000,2015:644350,2016:689455,2017:737717,2018:781242,2019:828116,2020:877803,2021:908526,2022:1000000,2023:1160000,2024:1300000,2025:1423500,2026:1750905},
  /* Inflación anual (variación IPC dic-dic, %). Fuente: DANE [ipc]. 2025 = dato usado en la negociación del mínimo (5,1 %). */
  ipc: {1994:22.6,1995:19.5,1996:21.6,1997:17.7,1998:16.7,1999:9.2,2000:8.8,2001:7.7,2002:7.0,2003:6.5,2004:5.5,2005:4.9,2006:4.5,2007:5.7,2008:7.7,2009:2.0,2010:3.2,2011:3.7,2012:2.4,2013:1.9,2014:3.7,2015:6.8,2016:5.8,2017:4.1,2018:3.2,2019:3.8,2020:1.6,2021:5.6,2022:13.1,2023:9.3,2024:5.2,2025:5.1},
  /* Colpensiones (RPM). Fuente: cifras clave [colpSep25, colpRC25, colpJun26] */
  colpensiones: {
    afiliados: [{t:"sep-2025",v:7082216},{t:"dic-2025",v:7129204},{t:"jun-2026",v:7244330}],
    cotizantes: [{t:"sep-2025",v:3045937},{t:"jun-2026",v:3026073}],
    pensionados: [{t:"sep-2025",v:1833099},{t:"dic-2025",v:1864080},{t:"jun-2026",v:1928774}],
    nominaMensual: [{t:"sep-2025",v:4.6e12},{t:"jun-2026",v:7.37e12}], /* pesos; junio incluye mesada adicional */
    tipoPension: {vejez:74.2, sobrevivientes:21.0, invalidez:4.8}, /* % jun-2026 */
    rangoPension: {"1–2 SMMLV":79, "más de 2 SMMLV":21}, /* % sep-2025 */
    cotizanRango: {"1–2 SMMLV":84, "más de 2 SMMLV":16},
    sexoAfiliados: {hombres:52.5, mujeres:47.5}, sexoPensionados:{hombres:43.6,mujeres:56.4},
    beps: {vinculados:2158729, ahorradores:1234415, anualidades:59370},
    ley2381: {dobleAsesoria:280212, solicitudesTraslado:159636, trasladosEfectivos:145815, pensionadosTrasladados:26693},
    gestion2025: {prestaciones:64.8e12, cotizaciones:21e12, pensionesReconocidas:141541, trasladosPersonas:186870, trasladosPesos:13.5e12}
  },
  /* RAIS / AFP. Fuentes [asof25, asof26, sfc] */
  rais: {
    afiliados: [{t:"dic-2024",v:19210000},{t:"abr-2026",v:20000000}],
    fondo: [{t:"dic-2024",v:464.8e12},{t:"2025",v:468.8e12},{t:"abr-2026",v:548e12}],
    rendAcum: 329.92e12, rentNominalHist:14.06, rentRealMultifondos:8.0,
    rentPorFondo: {"Mayor riesgo":10.3,"Moderado":9.7,"Conservador":7.9},
    tesShare: 0.70 /* Infobae/Asofondos: ~70 % de los recursos trasladados estaban en TES */
  },
  /* Fiscal. Fuentes [mfmp26, aval24, carf24, carf23, etRegimenes, semanaMFMP] */
  fiscal: {
    pgn2023: {total:54.6, colpensiones:15.4, exceptuados:24.7, transitorios:14.5}, /* billones COP */
    fomag2023: 8.1, pensionadosFFMM:288044, pensionadosFOMAG:236450,
    nacionColpensiones: [{t:2023,v:15.4},{t:2026,v:33.78}], /* billones; 2026 = aporte de la Nación para el faltante del RPM (PGN 2026) */
    mfmp26: {ingresosPropios:2.3, gasto:4.6, gastoFinDecada:4.9, pasivoSin:94.4, pasivoCon:121.5, semicontributivo:0.4, afiliadosEsperados:24e6, aumentoGasto2027:12},
    aval24: {sin:87.67, con:121.13, horizonte:"2025–2100"},
    carf23: {sin:-132.5, con:-160.5},
    carf24: {
      solidarioPIB:0.3, solidarioCOP:4.8, semicontributivo:[{t:2025,v:0.2},{t:2036,v:0.3},{t:2065,v:0.8},{t:2100,v:0.6}],
      necesidadesColp:[{t:2025,v:3.0},{t:2065,v:4.9}],
      transferenciaNacion:[{t:2025,v:1.3},{t:2063,v:3.8}],
      flujosFondo:[{t:2025,v:0.6},{t:2051,v:1.2},{t:2100,v:0.1}],
      agotamientoFondo:2062, vpnDelta:62.3, vpnSemicontributivo:35.6, rendimientoTES:4.3,
      pensionados:{sin:[{t:2040,v:1.8},{t:2050,v:2.5},{t:2090,v:4.0}], con:[{t:2040,v:2.1},{t:2050,v:2.8},{t:2090,v:4.2}]},
      umbral1SMMLVAhorro:20, caidaRentabilidad1pp:{costoPIB:12, aniosAntes:9}
    },
    gastoPensionalPIB: 3.5, /* aprox. gasto público en pensiones (Semana/MFMP) */
    oecd: {gastoCol:5.7, gastoOCDE:7.7, dep65Col:14.5, dep65OCDE:31.3, ev65Col:81.3, ev65OCDE:84.6, evNacCol:73.7, evNacOCDE:80.7}
  },
  /* Demografía. Fuentes [danePPED, dane2036, port2070] */
  demografia: {
    poblacion: [{t:2018,v:48.3},{t:2025,v:53.0},{t:2043,v:56.2},{t:2050,v:55.8},{t:2070,v:50.5}], /* millones; 2043 = máximo (>56) */
    grupos2018: {"0-14":25.2,"15-59":61.6,"60+":13.2}, grupos2050:{"0-14":13.6,"15-59":61.8,"60+":24.6},
    mayores65: [{t:2025,v:10.1},{t:2070,v:29.0}], edadActiva:[{t:2025,v:67.3},{t:2070,v:60.6}],
    dependencia: {total2026:47.9, minimoAnio:2042, mayores2020:14.0, mayores2070:48.2, infantil2020:36.6, infantil2070:17.0},
    indiceEnvejecimiento: [{t:2018,v:36.7},{t:2050,v:135.9},{t:2055,v:164.3},{t:2070,v:200.2}],
    picoPoblacion:2043, cruceMayoresNinos:2036,
    esperanzaVida: {hombres2025:74, mujeres2025:80} /* aprox. DANE (gráfico 5) */
  },
  /* Cobertura y mercado laboral. Fuentes [daneMayores, daneGEIH, pilarSol, oit25] */
  cobertura: {
    pension2020: {total:25.5, mujeres57:22.4, pensionados2020:2134314, mesadaMujeres:1565922, mesadaHombres:1891004},
    informalidad: [{t:"abr-jun 2025",v:55.9},{t:"ene-mar 2026",v:55.3},{t:"feb-abr 2026",v:55.1},{t:"mar-may 2026",v:54.7},{t:"abr-jun 2026",v:54.5}],
    informalidad23c:41.9, informalidadRural:83.2, informalesMillones:12.7,
    colombiaMayor: {antes:1.7e6, pilarSolidario:3.1e6, montoCM:80000, montoRBS2026:230000, lineaPobrezaExtrema2024:223000},
    asalariadosCotizan2024: 72 /* OIT: cobertura del CPM proyectada ≈ 72 % de asalariados */
  },
  /* IA / automatización. Fuentes [gmyrek24, gmyrek25, imf24, fedesAuto, labour26, asocap26] */
  ia: {
    global: {imfExpuesto:40, imfAvanzadas:60, imfEmergentes:40, imfBajos:26, oitExpuesto:25, oitMaxRiesgo:3.3},
    latam: {expuesto:"30–40", automatizacion:"2–5", aumento:"8–12", brechaDigital:"≈50 % de los empleos aumentables no usa computador"},
    colombia: {wp121: {automMujeres:5.5, automHombres:1.6, aumMujeres:11.3, unknownMujeres:22.5, automUrbano:3.9, automRural:0.8},
               labour: {altaExposicion:25.8, personas:5.9e6, informalidad:55.7, desempleo:8.9},
               fedesarrollo: 58, bid:58, asocapitales:{expuestos:48.1, altaBajaComp:3.27e6, graduadosVulnerables:43.5, ventana:"2026–2029"}}
  }
};

/* ---------- SERIES HISTÓRICAS (anuales, cierre de año salvo indicación) ---------- */
SEMANAS.HIST = {
  /* Colpensiones / ISS: pensionados y afiliados. Fuentes: bloomberg21, port2018, lr2020, colpDic21, port2022, colp2023, colpDic24, colpRC25, colpJun26 */
  colpPensionados: [[2015,1210577],[2016,1246254],[2017,1284178],[2018,1328986],[2019,1380977],[2020,1433966],[2021,1490000],[2022,1570000],[2023,1648199],[2024,1747842],[2025,1864080],[2026,1928774]],
  colpAfiliados: [[2018,6702549],[2021,6800000],[2022,6772000],[2023,6798472],[2024,6897249],[2025,7129204],[2026,7244330]],
  colpCotizantesPct: [[2022,40],[2024,38.4],[2025,43],[2026,41.8]],
  colpNominaAnual: [[2019,30.2],[2025,64.8]], /* billones */
  /* RAIS. Fuentes: lafm2017, asof2022, asof25, asof26, asofCifras, lr2026rais, sfc30 */
  raisFondo: [[2017,227],[2021,357.8],[2022,345],[2023,405.6],[2024,464.8],[2026,548]],
  raisAfiliados: [[2022,18400000],[2024,19210000],[2026,19418858]],
  raisPensionados: [[2024,358183],[2026,395058]],
  /* Sistema total 2024 (SFC 30 años) */
  sistema2024: {afiliados:25.8e6, activos:12.6e6, pensionados:1974826, raisShare:16, aportesAFP2023:33.5},
  /* Gasto público del Gobierno Central en pensiones, % PIB (CEPAL, Cuadro A1) */
  gastoGNC: [[2000,1.9],[2001,2.2],[2002,2.4],[2003,2.3],[2004,2.6],[2005,3.4],[2006,3.4],[2007,3.5],[2008,3.5],[2009,3.5],[2010,3.1],[2011,3.4],[2012,3.4],[2013,3.7],[2014,3.6],[2015,3.5],[2016,3.4],[2017,3.6],[2018,3.4]],
  gastoGG2018: 4.4,
  /* Afiliados activos / PEA, % (CEPAL, Gráfico 2) */
  coberturaActivos: [[2007,30.3],[2008,31.6],[2009,29.2],[2010,30.4],[2011,29.4],[2012,28.1],[2013,30.6],[2014,34.3],[2015,33.2],[2016,31.5],[2017,34.2],[2018,36.8]],
  coberturaPasivos: {contributiva2018:33, conColombiaMayor2018:66, pension2020:25.5, y1997:18},
  /* Aportes de la Nación a Colpensiones, billones (etRegimenes, etAportes, semanaMFMP) */
  aportesNacion: [[2023,15.4],[2024,25.1],[2026,33.78]],
  /* PIB nominal, billones COP (DANE, aprox.) */
  pib: {2017:920.5,2018:987.8,2019:1060.1,2020:998.7,2021:1192.6,2022:1464.5,2023:1572.6,2024:1706.0,2025:1830.0,2026:1960.0},
  /* Distribución de pensionados de Colpensiones por mesada promedio, 2020 (bloomberg21) */
  mesadas2020: [{p:52.7,m:877803,l:"1 SMMLV"},{p:24.6,m:1246619,l:"1–2 SMMLV"},{p:9.8,m:2133189,l:"2–3 SMMLV"},{p:4.7,m:3024656,l:"3–4 SMMLV"},{p:2.6,m:3907892,l:"4–5 SMMLV"},{p:4.4,m:5938341,l:"5–10 SMMLV"},{p:0.94,m:10522231,l:"10–15 SMMLV"},{p:0.02,m:14628119,l:"15–20 SMMLV"},{p:0.01,m:19735208,l:"20–25 SMMLV"}],
  mesadas2024: {unSM:54.8, dosSM:23.29},
  /* Densidad de cotización al llegar a la edad de pensión (CEPAL): semanas promedio y vida laboral de referencia */
  densidad: {rais:570, rpm:540, vidaLaboral:2057},
  /* Subsidio implícito del RPM como % de la reserva actuarial (Farné & Nieto 2017) */
  farne: [{ibc:1,h:71,m:75},{ibc:4,h:40.8,m:51.2},{ibc:10,h:38.1,m:48.9},{ibc:25,h:31.2,m:43.4}]
};

/* ---------- LÍNEA DE TIEMPO ---------- */
SEMANAS.TIMELINE = [
 {y:"1945–1946", t:"Cajanal e ICSS", c:"hist", d:"Se crean la Caja Nacional de Previsión (Cajanal, Ley 6 de 1945) y el Instituto Colombiano de Seguros Sociales (Ley 90 de 1946). Arranca el aseguramiento contributivo, fragmentado por sectores y con cientos de cajas."},
 {y:"1967", t:"Seguro de vejez del ISS", c:"hist", d:"El ISS asume el riesgo de vejez para trabajadores privados (Decreto 3041 de 1966): régimen de reparto con reservas insuficientes desde el inicio."},
 {y:"1993", t:"Ley 100: dos regímenes en competencia", c:"hist", d:"Nace el Sistema General de Pensiones: Régimen de Prima Media (RPM, prestación definida) y Régimen de Ahorro Individual con Solidaridad (RAIS, cuentas individuales en AFP). Cotización inicial 13,5 %; garantía de pensión mínima; devolución de saldos e indemnización sustitutiva.", s:"ley100", major:true},
 {y:"2003", t:"Ley 797: paramétrica", c:"hist", d:"Sube gradualmente semanas (1.000 → 1.300 en 2015) y edades (57 M / 62 H desde 2014), cotización a 16 %, y fija la fórmula de tasa de reemplazo r = 65,5 − 0,5·s (55,5 %–65,5 %, máximo 80 %).", s:"ley797", major:true},
 {y:"2005", t:"Acto Legislativo 01", c:"hist", d:"Constitucionaliza la sostenibilidad financiera, elimina regímenes especiales (salvo Fuerza Pública y Presidente) desde 2010, tope de 25 SMLMV y fin de la mesada 14.", s:"al01"},
 {y:"2009–2012", t:"Multifondos, BEPS y Colpensiones", c:"hist", d:"Ley 1328 de 2009 crea multifondos (conservador, moderado, mayor riesgo) y los BEPS. En 2012 Colpensiones reemplaza al ISS; Ley 1580 de 2012 crea la pensión familiar.", s:"ley1328"},
 {y:"2014", t:"Doble asesoría", c:"hist", d:"Ley 1748 de 2014 obliga a la doble asesoría para traslados entre regímenes, tras la evidencia de traslados mal informados.", s:"ley1748"},
 {y:"mar-2023", t:"Radicación de «Cambio por la Vejez»", c:"ref", d:"El Gobierno radica el proyecto (PL 293/2023 Senado) con cuatro pilares y umbral inicial de 3 SMLMV (4 en la propuesta original de campaña).", s:"carf24"},
 {y:"jun-2024", t:"Aprobación y sanción", c:"ref", d:"La plenaria de la Cámara acoge el texto del Senado el 14 de junio de 2024 sin debatir más de 700 proposiciones. Sanción el 16 de julio de 2024 (Ley 2381).", s:"ley2381", major:true},
 {y:"jun-2025", t:"Auto 841: vicio subsanable", c:"jur", d:"La Corte constata la falta de deliberación mínima en la Cámara, devuelve el proyecto para repetir el segundo debate y suspende la vigencia prevista para el 1 de julio de 2025.", s:"auto841", major:true},
 {y:"jun–ago 2025", t:"Subsanación en la Cámara", c:"jur", d:"La Cámara repite la votación (27–28 de junio de 2025) con base en el comunicado de prensa; el Auto solo se notifica el 14 de agosto de 2025 (crítica del conjuez Márquez)."},
 {y:"dic-2025", t:"Decreto 1485 y salario mínimo +23 %", c:"ref", d:"Sustituye el mecanismo de cobertura de deslizamiento del salario mínimo; el mínimo de 2026 sube 23 % ($1.750.905), elevando el capital requerido para pensiones mínimas en el RAIS.", s:"d1485"},
 {y:"abr-2026", t:"Decreto 0415: traslado de $25 billones", c:"ref", d:"Ordena a las AFP girar a Colpensiones los saldos de ~120.000 afiliados que se trasladaron con la ventana de la Ley 2381. Asofondos alerta sobre venta masiva de activos.", s:"d0415"},
 {y:"25-ago-2026", t:"Sentencia C-264: exequible en su mayoría", c:"jur", d:"Exequibilidad por vicios de procedimiento de casi todo el articulado; devuelve los arts. 14, 36 y 93 y apartes de 11, 19, 23, 63, 84 y 92; vigencia condicionada al 1 de abril de 2027; suspende términos de las demás demandas hasta esa fecha.", s:"c264", major:true},
 {y:"1-abr-2027", t:"Entrada en vigencia", c:"ref", d:"Fecha fijada por la Corte para el inicio del nuevo sistema. Desde entonces la Corte retomará más de 100 demandas de fondo.", s:"c264"}
];

/* ---------- ARTÍCULOS DE LA LEY 2381 DE 2024 ----------
   st: 'ex' exequible (C-264/26) | 'dev' devuelto a la Cámara | 'cond' exequible condicionado | 'parc' exequible salvo aparte devuelto
   p: etiqueta temática. Resúmenes elaborados a partir del texto oficial [ley2381].       */
SEMANAS.ARTICULOS = [
 {n:1,t:"Objeto",p:"general",st:"ex",s:"Crea el Sistema de Protección Social Integral para la Vejez, Invalidez y Muerte de origen común para garantizar el derecho a la seguridad social (art. 48 C.P.) mediante pilares, con principios de universalidad, solidaridad y eficiencia."},
 {n:2,t:"Ámbito de aplicación",p:"general",st:"ex",s:"Aplica a residentes en Colombia y a colombianos en el exterior (pilares semicontributivo y contributivo). El Pilar Solidario es solo para residentes."},
 {n:3,t:"Estructura del sistema",p:"general",st:"ex",s:"Cuatro pilares: Solidario (Prosperidad Social), Semicontributivo (Colpensiones), Contributivo (Componente de Prima Media en Colpensiones + Componente Complementario de Ahorro Individual en administradoras vigiladas) y Ahorro Voluntario."},
 {n:4,t:"Principios",p:"general",st:"ex",s:"21 principios: universalidad, solidaridad, dignidad, igualdad, eficiencia, integralidad, unidad, financiamiento colectivo, sostenibilidad financiera y actuarial, progresividad, derechos adquiridos, enfoque de género, protección rural y étnica, libertad de elección (dentro del CCAI), rentabilidad, entre otros."},
 {n:5,t:"Deberes del Estado",p:"general",st:"ex",s:"Dirigir, controlar y vigilar el sistema; garantizar información; proveer los recursos públicos dentro de la Regla Fiscal, el MFMP y el MGMP; calcular el total de recursos fondeados para el pasivo pensional; garantizar la rentabilidad del ahorro; promover equidad rural."},
 {n:6,t:"Deberes de las administradoras",p:"general",st:"ex",s:"Asesorar con lenguaje claro sobre cotizaciones y rentabilidades; reconocer y pagar oportunamente; extractos trimestrales; canales especializados; no trasladar cargas administrativas al afiliado."},
 {n:7,t:"Deberes de empleadores y contratantes",p:"general",st:"ex",s:"Pagar los aportes (75 % empleador / 25 % trabajador), reportar información, responder por la totalidad del aporte aunque no descuente, facilitar la elección de administradora del CCAI."},
 {n:8,t:"Deberes de afiliados y beneficiarios",p:"general",st:"ex",s:"Suministrar información veraz, contribuir al financiamiento, revisar permanentemente su historia laboral y mantener datos de contacto actualizados."},
 {n:9,t:"Derechos de afiliados y beneficiarios",p:"general",st:"ex",s:"Recibir prestaciones oportunas, información clara y asesoría, respuesta oportuna y servicios con estándares de calidad y seguridad."},
 {n:10,t:"Facultad del empleador para solicitar la pensión",p:"contributivo",st:"ex",s:"Es justa causa de terminación del contrato cumplir los requisitos de pensión integral de vejez; el empleador puede solicitar el reconocimiento 30 días después de que el trabajador cumpla requisitos sin pedirla."},
 {n:11,t:"Naturaleza de los recursos",p:"general",st:"parc",s:"Recursos públicos de carácter parafiscal, no pertenecen a la Nación ni a las administradoras; prohibido destinarlos a otros fines o computarlos como ingresos corrientes. Inciso 4 (cuentas del CCAI son propiedad del afiliado, de naturaleza privada y no constituyen renta) devuelto a la Cámara por la C-264/26 (proposición Zabaraín)."},
 {n:12,t:"Afiliación y cotización",p:"contributivo",st:"ex",s:"Afiliación obligatoria de dependientes, independientes y rentistas al Pilar Contributivo; quienes ganan más de 2,3 SMLMV deben elegir administradora del CCAI; base máxima 25 SMLMV; recaudo por PILA; afiliación voluntaria de colombianos en el exterior."},
 {n:13,t:"Prestaciones del sistema",p:"general",st:"ex",s:"Pensión de vejez, invalidez y sobrevivientes, auxilio funerario, indemnización sustitutiva, devolución de aportes, incapacidades, Renta Básica Solidaria y Renta Vitalicia; quien no accede a pensión contributiva pasa al semicontributivo; prestación anticipada."},
 {n:14,t:"Características de las prestaciones",p:"contributivo",st:"dev",s:"Pensión Integral de Vejez = componente de prima media + componente de ahorro individual (única pensión). Se computan semanas de todos los regímenes anteriores, bonos y títulos pensionales; equivalencias actuariales para completar semanas con el CCAI; garantía de pensión mínima. Artículo completo devuelto a la Cámara (C-264/26)."},
 {n:15,t:"Reajuste de prestaciones",p:"general",st:"ex",s:"Reajuste anual el 1 de enero con el IPC del año anterior; las prestaciones iguales al salario mínimo se reajustan con el incremento del mínimo."},
 {n:16,t:"Incompatibilidad pensional",p:"general",st:"ex",s:"No se puede recibir simultáneamente pensión de invalidez de origen común y de vejez; la pensión familiar es incompatible con cualquier otra; compatibilidad solo con riesgos laborales."},
 {n:17,t:"Pilar Solidario",p:"solidario",st:"ex",s:"Renta Básica Solidaria para ciudadanos de 65 años (H) / 60 (M) —o 55/50 con pérdida de capacidad laboral ≥50 %— en pobreza extrema, pobreza o vulnerabilidad, con 10 años de residencia y sin pensión. Monto mínimo: línea de pobreza extrema 2023 indexada con IPC ($230.000 en 2026). No es pensión. Inclusión de pueblos indígenas, NARP, campesinos y cuidadores."},
 {n:18,t:"Pilar Semicontributivo",p:"semicontributivo",st:"ex",s:"Para quienes a los 65 (H) / 60 (M) tengan entre 300 y menos de 1.000 semanas: Renta Vitalicia = cotizaciones al CPM traídas a valor presente con IPC (+3 % efectivo anual y subsidio de 20 % H / 30 % M si no son elegibles al Pilar Solidario) + saldo de la cuenta del CCAI. Tope 80 % del SMLMV, no sustituible ni heredable, no es pensión. BEPS con subsidio mínimo de 30 %. Hasta 299 semanas: indemnización sustitutiva + devolución de saldos. Desde 2036 el rango para hombres es 300–1.300."},
 {n:19,t:"Pilar Contributivo",p:"contributivo",st:"parc",s:"Componente de Prima Media (CPM) para todos los afiliados sobre ingresos de 1 a 2,3 SMLMV; Componente Complementario de Ahorro Individual (CCAI) sobre el exceso hasta 25 SMLMV; fondos generacionales; reconocimiento en máximo 4 meses; traslado libre entre administradoras del CCAI cada 6 meses; garantía estatal; los saldos del RAIS anteriores a la ley: hasta 2,3 SMLMV van a Colpensiones al pensionarse. Literal k (inversión de recursos según el Gobierno) devuelto a la Cámara."},
 {n:20,t:"Obligatoriedad y monto de cotizaciones",p:"contributivo",st:"ex",s:"16 % del IBC (75 % empleador, 25 % trabajador). Aportes adicionales al Fondo de Solidaridad Pensional: 1,5 % (4–7 SMLMV), 1,8 % (7–11), 2,5 % (11–19), 2,8 % (19–20), 3 % (>20). Pensionados de 10–20 SMLMV aportan 1 % y de más de 20 SMLMV 2 % a la subcuenta de subsistencia."},
 {n:21,t:"Responsabilidad por el pago",p:"contributivo",st:"ex",s:"El empleador responde por la totalidad del aporte; intereses moratorios; cálculo actuarial por omisión; cobro coactivo por la UGPP; mujeres sin vínculo laboral pueden aportar sobre 1 SMLMV mediante un tercero."},
 {n:22,t:"Ingreso base de cotización",p:"contributivo",st:"ex",s:"Tope de 25 SMLMV; dependientes cotizan sobre el salario (70 % si es integral); independientes sobre el 40 % de los ingresos netos (mínimo 1 SMLMV); ingresos rurales estacionales pueden cotizar hasta 12 meses en un pago."},
 {n:23,t:"Distribución de la cotización",p:"contributivo",st:"parc",s:"CPM: 13 puntos al Fondo Común de Vejez y al Fondo de Ahorro del Pilar Contributivo; 3 puntos a administración (Colpensiones hasta 1) y seguros. CCAI: 13,2 puntos a la cuenta individual, 1 punto al Fondo de Ahorro (contribución solidaria), hasta 0,8 gastos de administración y hasta 1 punto a seguros previsionales. Parágrafo transitorio (comisión máxima de 0,7 % de las AFP sobre saldos) devuelto a la Cámara."},
 {n:24,t:"Fondo de Ahorro del Pilar Contributivo (FAPC)",p:"fondo",st:"ex",s:"Cuenta especial administrada por el Banco de la República (no son reservas internacionales). Financia las pensiones del nuevo esquema (no las del régimen de transición). Recibe la diferencia entre las cotizaciones del CPM y un uso decreciente: 1,8 % del PIB (2025–2028), 1,6 % (2029–2035), 1,4 % (2036–2040), 1,2 % (2041–2050) y 1,0 % desde 2051; más la contribución solidaria del CCAI y los traslados. Subcuentas generacionales; informe semestral al Congreso; concepto del CARF sobre desacumulación."},
 {n:25,t:"Fondo de Solidaridad Pensional",p:"solidario",st:"ex",s:"Subcuenta de Solidaridad subsidia cotizaciones de independientes, rurales, campesinos, artistas, mujeres de la economía del cuidado, personas con discapacidad, pueblos étnicos; Subcuenta de Subsistencia financia el Pilar Solidario."},
 {n:26,t:"Recursos del Fondo de Solidaridad",p:"solidario",st:"ex",s:"0,5 pp de la cotización adicional de quienes ganan ≥4 SMLMV a solidaridad y el resto a subsistencia; aportes del PGN no inferiores al recaudo; contribución de pensionados de altos ingresos; multas y sanciones."},
 {n:27,t:"Cotización por días o semanas",p:"contributivo",st:"ex",s:"Trabajadores por períodos inferiores a un mes: 1–7 días = 1 semana mínima; 8–14 = 2; 15–21 = 3; más de 21 = 4 (1 SMLMV). Herramienta tecnológica interoperable para zonas rurales; control para evitar precarización."},
 {n:28,t:"Base de cotización mínima semanal",p:"contributivo",st:"ex",s:"La cotización mínima semanal es 1/4 del SMLMV (riesgos laborales sobre el mínimo mensual)."},
 {n:29,t:"Porcentaje de cotización",p:"contributivo",st:"ex",s:"Aplica los porcentajes de los sistemas de riesgos laborales, subsidio familiar y protección para la vejez de forma proporcional."},
 {n:30,t:"Multiplicidad de empleadores",p:"contributivo",st:"ex",s:"Cada empleador cotiza de manera independiente cuando hay varios contratos simultáneos."},
 {n:31,t:"Garantías de trabajadores por días",p:"contributivo",st:"ex",s:"Cotizar por días no exonera del pago de prestaciones sociales ni de las demás obligaciones laborales."},
 {n:32,t:"Liquidación y monto de la Pensión Integral de Vejez",p:"contributivo",st:"ex",s:"CPM: 57 años (M) / 62 (H) y 1.300 semanas; para mujeres las semanas bajan 25 por año desde 1.275 (2025) hasta 1.000 (2036). Tasa de reemplazo r = 65,5 − 0,5·s sobre el IBL (promedio de los últimos 10 años o de toda la vida si es mayor), +1,5 % por cada 50 semanas adicionales hasta 80 %, mínimo 1 SMLMV, 13 mesadas. CCAI: el saldo (aportes, rendimientos, bono) se certifica a Colpensiones para financiar una anualidad vitalicia que complementa la pensión."},
 {n:33,t:"Financiación de la etapa de desacumulación",p:"contributivo",st:"ex",s:"Con los recursos del CCAI Colpensiones puede constituir una renta vitalicia mediante un mecanismo de mutualidad de riesgos (universalidad, patrimonio autónomo o fondo mutuo) adjudicado por licitación; cobertura de extralongevidad y riesgos jurídicos; aplica también a retiros programados del RAIS."},
 {n:34,t:"Integración y pago de la pensión",p:"contributivo",st:"ex",s:"Colpensiones reconoce y paga una sola pensión: la parte del CPM con el fondo común y la del CCAI con el giro de la anualidad vitalicia."},
 {n:35,t:"Madres o padres con hijo con discapacidad",p:"beneficios",st:"ex",s:"Pensión especial de vejez a cualquier edad con 1.300 semanas para la madre o padre de hijo con discapacidad dependiente (mantiene la Ley 797)."},
 {n:36,t:"Semanas por hijos para mujeres",p:"beneficios",st:"dev",s:"Reduce 50 semanas por cada hijo nacido vivo o adoptivo (máximo 3) hasta un mínimo de 850 semanas en el CPM, solo tras agotar las equivalencias actuariales y sin aumentar la tasa de reemplazo. Artículo completo devuelto a la Cámara (proposición Salcedo: piso de 1.000 semanas)."},
 {n:37,t:"Prestación anticipada de vejez",p:"beneficios",st:"ex",s:"Para quienes no están en transición, cumplan 62 (M) / 65 (H) tras la vigencia, tengan más de 1.000 semanas y no completen el mínimo tras las equivalencias: prestación proporcional con la misma fórmula, descontando mensualmente las cotizaciones faltantes hasta 1.300 semanas. Solo para quienes cumplan requisitos antes del 1 de enero de 2036; sin sustitución pensional."},
 {n:38,t:"Pensión familiar",p:"beneficios",st:"ex",s:"Suma de esfuerzos de cotización de cónyuges o compañeros permanentes para cumplir los requisitos de la pensión integral de vejez, tras agotar las equivalencias actuariales."},
 {n:39,t:"Requisitos de la pensión familiar",p:"beneficios",st:"ex",s:"Reconocida y pagada por Colpensiones desde la solicitud; convivencia acreditada; requisitos de edad y suma de semanas conforme a la ley."},
 {n:40,t:"Estado de invalidez",p:"invalidez",st:"ex",s:"Es inválida la persona con pérdida de capacidad laboral igual o superior al 50 % no provocada intencionalmente ni de origen laboral."},
 {n:41,t:"Entidad que reconoce la invalidez",p:"invalidez",st:"ex",s:"La pensión de invalidez se reconoce y paga por la administradora del Componente de Prima Media (Colpensiones)."},
 {n:42,t:"Requisitos de la pensión de invalidez",p:"invalidez",st:"ex",s:"Mantiene la Ley 100/797: 50 semanas cotizadas en los 3 años anteriores a la estructuración (con reglas especiales para menores de 20 años)."},
 {n:43,t:"Monto de la pensión de invalidez",p:"invalidez",st:"ex",s:"PCL entre 50 % y 66 %: 45 % del IBL + 1,5 % por cada 50 semanas adicionales a 500. PCL ≥ 66 %: 54 % + 2 % por cada 50 semanas adicionales a 800. Máximo 75 %, mínimo 1 SMLMV."},
 {n:44,t:"Financiación de la invalidez",p:"invalidez",st:"ex",s:"Con cargo a la aseguradora del seguro previsional hasta la edad de vejez y luego a Colpensiones."},
 {n:45,t:"Revisión de la invalidez",p:"invalidez",st:"ex",s:"Revisión cada 3 años a solicitud de la entidad o del pensionado."},
 {n:46,t:"Indemnización sustitutiva / devolución de saldos por invalidez",p:"invalidez",st:"ex",s:"Cuando no se cumplen los requisitos: indemnización sustitutiva (CPM) o devolución de saldos (CCAI)."},
 {n:47,t:"Pensión de sobrevivientes",p:"sobrevivientes",st:"ex",s:"Requisitos de la Ley 100/797: 50 semanas en los 3 años anteriores al fallecimiento del afiliado; sustitución para pensionados."},
 {n:48,t:"Beneficiarios por muerte del pensionado",p:"sobrevivientes",st:"ex",s:"Cónyuge o compañero(a) permanente (convivencia de 5 años), hijos menores de 25 estudiantes o con discapacidad, padres dependientes, hermanos con discapacidad."},
 {n:49,t:"Beneficiarios por muerte del afiliado",p:"sobrevivientes",st:"ex",s:"Mismos beneficiarios; regla de convivencia extendida por la jurisprudencia constitucional (SU-149/21)."},
 {n:50,t:"Monto de la sustitución pensional",p:"sobrevivientes",st:"ex",s:"100 % de la pensión que recibía el pensionado."},
 {n:51,t:"Monto de la pensión de sobrevivientes",p:"sobrevivientes",st:"ex",s:"45 % del IBL + 2 % por cada 50 semanas adicionales a 500, máximo 75 %, mínimo 1 SMLMV."},
 {n:52,t:"Financiación de sobrevivientes",p:"sobrevivientes",st:"ex",s:"Seguro previsional hasta la edad de vejez del causante; después Colpensiones."},
 {n:53,t:"Indemnización / devolución en sobrevivientes",p:"sobrevivientes",st:"ex",s:"Cuando no se cumplen requisitos: indemnización sustitutiva o devolución de saldos a los beneficiarios."},
 {n:54,t:"Seguro de invalidez y sobrevivencia",p:"sobrevivientes",st:"ex",s:"Colpensiones contrata el seguro previsional por licitación; la aseguradora no puede usar bonos ni ahorro del CCAI para pagar invalidez o sobrevivientes."},
 {n:55,t:"Inexistencia de beneficiarios",p:"sobrevivientes",st:"ex",s:"Sin beneficiarios, los recursos del CCAI pasan a la masa sucesoral; a falta de herederos, al Fondo de Solidaridad Pensional."},
 {n:56,t:"Auxilio funerario",p:"general",st:"ex",s:"Entre 5 y 10 SMLMV para quien compruebe haber pagado el entierro de un afiliado o pensionado."},
 {n:57,t:"Administradoras del CCAI",p:"ccai",st:"ex",s:"AFP, sociedades fiduciarias, aseguradoras de vida, comisionistas de bolsa, Colpensiones y entidades sin ánimo de lucro vigiladas por la Superintendencia Financiera, en igualdad de condiciones."},
 {n:58,t:"Niveles de patrimonio",p:"ccai",st:"ex",s:"El Gobierno fija con criterios técnicos el patrimonio adecuado de las administradoras."},
 {n:59,t:"Requisitos de las administradoras",p:"ccai",st:"ex",s:"Autorización de la Superintendencia Financiera, capital mínimo, infraestructura y estándares de servicio."},
 {n:60,t:"Gobierno corporativo",p:"ccai",st:"ex",s:"Estándares mínimos de gobierno corporativo, conflictos de interés y transparencia."},
 {n:61,t:"Fondos como patrimonios autónomos",p:"ccai",st:"ex",s:"Los fondos del CCAI son patrimonios autónomos independientes de la administradora e inembargables."},
 {n:62,t:"Participación de los afiliados",p:"ccai",st:"ex",s:"Mecanismos de participación y control de los afiliados sobre las administradoras."},
 {n:63,t:"Inversión de los recursos",p:"ccai",st:"parc",s:"Régimen de inversiones definido por el Gobierno con activos admisibles por nivel de riesgo; esquema de fondos generacionales orientado a optimizar la mesada. Inciso 2 devuelto (proposición Salcedo: considerar el impacto fiscal de mediano y largo plazo y prohibir usar los recursos como crédito al Gobierno en emergencias)."},
 {n:64,t:"Desempeño mínimo",p:"ccai",st:"ex",s:"Las administradoras deben cumplir un desempeño mínimo para conservar el encargo fiduciario."},
 {n:65,t:"Publicación de rentabilidad",p:"ccai",st:"ex",s:"Publicación periódica y comparable de la rentabilidad de los fondos."},
 {n:66,t:"Contratos de recaudo",p:"ccai",st:"ex",s:"Contratos para el recaudo y transferencia de recursos entre administradoras y Colpensiones."},
 {n:67,t:"Promoción",p:"ccai",st:"ex",s:"Reglas para la promoción y publicidad de las administradoras del CCAI."},
 {n:68,t:"Garantía estatal del CCAI",p:"ccai",st:"ex",s:"La Nación garantiza los ahorros y el pago de las prestaciones del CCAI si las administradoras incumplen, con acción de repetición."},
 {n:69,t:"Sanciones a administradoras",p:"ccai",st:"ex",s:"Sanciones de la Superintendencia Financiera por incumplimientos."},
 {n:70,t:"Colpensiones",p:"institucional",st:"ex",s:"Colpensiones administra el CPM y el Pilar Semicontributivo; naturaleza y régimen jurídico."},
 {n:71,t:"Funciones adicionales de Colpensiones",p:"institucional",st:"ex",s:"Reconocer y pagar la pensión integral, invalidez y sobrevivientes; recibir los saldos del CCAI al momento de la solicitud con destino al FAPC; administrar el semicontributivo."},
 {n:72,t:"Sistema Nacional de Protección Social para la Vejez",p:"institucional",st:"ex",s:"Crea el sistema de coordinación interinstitucional."},
 {n:73,t:"Consejo Nacional de Protección Social para la Vejez",p:"institucional",st:"ex",s:"Órgano de dirección con participación de gobierno, trabajadores, pensionados y empleadores."},
 {n:74,t:"Comisión Técnica",p:"institucional",st:"ex",s:"Comisión técnica de seguimiento actuarial y financiero del sistema."},
 {n:75,t:"Régimen de transición",p:"transicion",st:"ex",s:"Quienes al entrar en vigencia el sistema (1 abr 2027) tengan 750 semanas (mujeres) o 900 (hombres) —en cualquier régimen o entidad— siguen íntegramente en la Ley 100 de 1993. Los demás pasan a la nueva ley. Mecanismos de aseguramiento si no se adjudica el seguro previsional."},
 {n:76,t:"Oportunidad de traslado",p:"transicion",st:"ex",s:"Quienes tengan 750/900 semanas y les falten menos de 10 años para la edad de pensión tuvieron 2 años desde la promulgación (hasta el 16 jul 2026) para trasladarse de régimen con doble asesoría; sus saldos siguen en la AFP hasta consolidar la pensión."},
 {n:77,t:"Sistema de información",p:"institucional",st:"ex",s:"Sistema Público Único Integrado de Información con datos abiertos; operación en máximo un año desde la vigencia; criterios de MinTrabajo, UGPP y Colpensiones."},
 {n:78,t:"Servicios sociales complementarios",p:"solidario",st:"ex",s:"El Estado provee servicios sociales complementarios para la vejez."},
 {n:79,t:"Calidad de la información",p:"institucional",st:"ex",s:"Reglas transitorias de calidad e interoperabilidad de la información de historias laborales."},
 {n:80,t:"Educación financiera en protección social",p:"institucional",st:"ex",s:"MinTrabajo y SENA desarrollan programas de educación financiera y previsional."},
 {n:81,t:"Inembargabilidad",p:"general",st:"ex",s:"Son inembargables los recursos de los fondos, las pensiones (con las excepciones legales) y las cuentas individuales."},
 {n:82,t:"Imprescriptibilidad",p:"general",st:"ex",s:"El derecho a la pensión es imprescriptible; prescriben las mesadas no reclamadas en 3 años."},
 {n:83,t:"Sanciones",p:"general",st:"ex",s:"Sanciones a autoridades y entidades que incumplan la ley."},
 {n:84,t:"Tratamiento tributario",p:"tributario",st:"parc",s:"Exención de impuestos nacionales a los recursos de los pilares, bonos pensionales y Fondo de Solidaridad; exención de renta para Colpensiones, cajas públicas y las sumas abonadas en cuentas del CCAI. Numeral 5 (pensiones gravadas solo en la parte que exceda 1.000 UVT mensuales) devuelto a la Cámara."},
 {n:85,t:"Protección de la vejez campesina, étnica y popular",p:"solidario",st:"ex",s:"Estrategias diferenciales de MinTrabajo para campesinos, comunidades étnicas y economía popular."},
 {n:86,t:"Términos para acciones administrativas",p:"general",st:"ex",s:"Plazos para ejercer acciones administrativas y contencioso-administrativas sobre pensiones."},
 {n:87,t:"Conmutación de rentas vitalicias",p:"ccai",st:"ex",s:"Las AFP pueden conmutar los retiros programados o constituir rentas vitalicias para los constituidos a la vigencia de la ley, con información clara."},
 {n:88,t:"Mesada adicional",p:"general",st:"ex",s:"Los pensionados siguen recibiendo la mesada adicional de diciembre (mesada 13)."},
 {n:89,t:"Pensión anticipada por invalidez",p:"beneficios",st:"ex",s:"Personas con deficiencia ≥50 %: pensión anticipada de vejez a los 50 (M) / 55 (H) años con 1.000 semanas."},
 {n:90,t:"Comité de Transición Operativa",p:"transicion",st:"ex",s:"Comité (Colpensiones, administradoras del CCAI, Superfinanciera, MinHacienda, MinTrabajo) para el traslado de afiliados, información y recursos."},
 {n:91,t:"Junta Directiva de Colpensiones",p:"institucional",st:"ex",s:"MinTrabajo, MinHacienda, tres independientes de periodo fijo de 4 años designados por el Presidente, un representante de pensionados y uno de trabajadores."},
 {n:92,t:"Administración del FAPC por el Banco de la República",p:"fondo",st:"parc",s:"Principios de interés exclusivo del fondo, prudencia y diversificación; Comité Directivo (MinHacienda, MinTrabajo, DNP y expertos de periodo fijo de 5 años elegidos por la Junta del Banco); política de inversión orientada a la mejor mesada estable; informe anual al Congreso. Inciso 1 devuelto a la Cámara."},
 {n:93,t:"Responsabilidad del Banco de la República",p:"fondo",st:"dev",s:"El Banco de la República tiene responsabilidad de medio y no de resultado en la administración del FAPC; Colpensiones asume el pago de las prestaciones. Artículo completo devuelto a la Cámara."},
 {n:94,t:"Vigencia",p:"general",st:"cond",s:"Texto original: 1 de julio de 2025. Suspendido por el Auto 841/25; la Sentencia C-264/26 lo declara exequible «en el entendido» de que las disposiciones exequibles entran en vigencia el 1 de abril de 2027."},
 {n:95,t:"Derogatorias",p:"general",st:"ex",s:"La ley rige desde su sanción y deroga las disposiciones contrarias."}
];

/* ---------- JEROME SANABRIA: columnas, entrevistas y tesis ---------- */
SEMANAS.SANABRIA = {
  perfil: "Jerome Sanabria es estudiante de Derecho e Historia, columnista semanal de La República (sección Tribuna Universitaria / Análisis desde abril de 2024; columna número 52 el 29 de abril de 2025), vocera del movimiento #NoConMiAhorro, exconsejera de juventud en San Cristóbal (Bogotá) y codirectora del documental «Sin permiso para envejecer» (con Julio César Iglesias y Mateo Amaya, financiado por Atlas Network). Su activismo nació de una experiencia familiar: a sus 15 años su padre recibió una devolución de saldos de $112 millones tras cotizar más de 400 semanas en un fondo privado, recursos que financiaron su educación. Se define en el liberalismo clásico (Hayek) y en 2025–2026 se vinculó a la campaña presidencial de Abelardo de la Espriella, con quien elaboró la propuesta de contrarreforma «La pensional del Tigre».",
  columnas: [
    {f:"2024-07-30", t:"«Mini pensiones» (reseña en Infobae)", k:"sMini", r:"Presenta la tesis central: el pilar semicontributivo elimina la devolución de saldos y entrega «mini pensiones» de $82.000 a $280.000 mensuales a más de 12 millones de cotizantes; convoca a firmar una demanda ante la Corte."},
    {f:"2024-10-29", t:"Los estamos incomodando", k:"sIncomodando", r:"Define la reforma como «expropiación»: los saldos del RAIS pasan a Colpensiones, la renta empieza «desde los $82.000» tres años después de la edad pensional y no es heredable; critica a Colombia Check y RTVC."},
    {f:"2025-04-29", t:"El mejor año de mi vida", k:"sMejor", r:"Balance personal de un año de columnas; origen del activismo tras una entrevista en La FM y beca universitaria."},
    {f:"2025-08-20", t:"Sin permiso para envejecer", k:"sEnvejecer", r:"Relata la devolución de saldos de su padre ($112 millones) y el documental con testimonios de Argentina, Perú, Venezuela y Colombia."},
    {f:"2025-08-27", t:"Corte, en ti confío", k:"sCorte", r:"Sostiene que la subsanación en la Cámara fue indebida por citarse sesiones extraordinarias sin el Auto notificado; pide a la Corte actuar como «muro de contención»."},
    {f:"2026-01-15", t:"El nuevo Seguro Social", k:"sSeguro", r:"Critica el Decreto 1485 de 2025: con productividad de 0,91 % e inflación de 5,1 %, el mínimo subió 23 %; un afiliado de 62 años que necesitaba $360 millones ahora requeriría $560 millones (Asofondos); proyecta el agotamiento del Fondo de Garantía y el colapso de Colpensiones hacia 2062."},
    {f:"2026-03-27", t:"Siempre tuvimos la razón", k:"sRazon", r:"Reivindica las advertencias de #NoConMiAhorro: umbral de 4 → 2,3 SMLMV, bono prometido de $500.000, «chichigua vitalicia desde $82.000», ~$200 billones de ahorro en juego; acusa a la «tecnocracia centrista» de respaldar el esquema."},
    {f:"2026-05-21", t:"La pensional del Tigre", k:"sTigre", r:"Propuesta de contrarreforma: semicontributivo opcional (renta vitalicia o devolución de saldos), retiros excepcionales (enfermedad terminal, residencia en el exterior, tratamientos no cubiertos) y pilar contributivo opcional: AFP sin límite o Colpensiones hasta 2,3 SMLMV."},
    {f:"2026-07-24", t:"Oscuro panorama", k:"sOscuro", r:"Aritmética de la Comisión Séptima de la Cámara (21 curules, 11 para mayoría) como llave para desmontar la reforma."},
    {f:"2026-08-21", t:"¡Archiven la pensional!", k:"sArchiven", r:"Pide a la Corte declarar inexequible la ley: el Congreso «pupitreó» la reforma, incumplió el Auto 841 y devolverla por segunda vez sería un «cambio jurisprudencial enorme»."},
    {f:"2026-08-29", t:"Que ruja el Tigre", k:"sRuja", r:"Tras la C-264: la Corte devolvió «nueve artículos intrascendentes»; nómina de Colpensiones ≈ $90 billones (2026), $32 billones del PGN; 16 millones de cotizantes obligados aliviarían la caja en más de $30 billones anuales, pero la crisis se «patea» 15 años."},
    {f:"2026-09-05", t:"Pañito de agua tibia", k:"sPanito", r:"Contrasta las dos contrarreformas del Centro Democrático: «La pensional de la libertad» (Forero–Briceño: libertad de elección) frente a la de Cadavid–Posada (mantiene pilares y baja el umbral a 1 SMLMV), que califica de insuficiente por conservar la obligatoriedad del reparto."},
    {f:"2026-08-26", t:"Entrevistas y declaraciones tras la C-264 (Infobae, La FM)", k:"sChichigua", r:"«Chichigua vitalicia»: 300 semanas ≈ $82.956–$84.322 y 999 semanas ≈ $276.244–$280.792 mensuales; caso de un padre con $160 millones de devolución (2017) invertidos en un inmueble que renta $2 millones; los $25 billones del Decreto 0415 deberían ir al fondo del Banco de la República y no a Colpensiones."}
  ],
  /* Tesis principales confrontadas con fuentes primarias. v: 1 = respaldada por la fuente; 2 = parcialmente/depende de supuestos; 3 = imprecisa o contradicha */
  tesis: [
    {a:"El pilar semicontributivo «roba la devolución de saldos»: quien no alcance las semanas recibe una renta vitalicia no heredable, tres años después de la edad de pensión.", b:"El art. 18 crea una Renta Vitalicia a los 65 (H) / 60 (M) —tres años después de 62/57—, con tope de 80 % del SMLMV, «no sustituible por muerte, ni heredable» (par. 2). La devolución de saldos e indemnización sustitutiva se conservan solo para quienes tienen hasta 299 semanas (par. 3). MinTrabajo confirmó la no heredabilidad. La OIT valora que sustituir un pago único por una prestación periódica acerca el sistema al Convenio 102, aunque advierte que su nivel no está garantizado por ser de cotización definida.", v:1, k:["ley2381","portHeredable","oit25"], vt:"Descripción correcta del texto legal"},
    {a:"Las «mini pensiones» empiezan en $82.000 y llegan a lo sumo a $280.000 mensuales.", b:"Los montos dependen de las semanas, del IBC y de la tasa técnica de la renta vitalicia, que el Gobierno aún no ha reglamentado. Con 300 semanas a 1 SMLMV el capital indexado es bajo y la renta resultante puede estar en ese orden; con 999 semanas, ingresos superiores a 1 SMLMV o el subsidio de 20 %/30 % (art. 18 b) el valor sube. El tope legal es 80 % del SMLMV ($1.400.724 en 2026), muy por encima de $280.000. La calculadora de esta plataforma permite reproducir ambos casos.", v:2, k:["ley2381","sChichigua"], vt:"Cifras plausibles para el caso base, pero no son el techo"},
    {a:"«Nos toca a todos irnos obligatoriamente a Colpensiones».", b:"El art. 19 (b) hace obligatorio el Componente de Prima Media sobre ingresos de 1 a 2,3 SMLMV para todos los afiliados sin transición; el 84 % de los cotizantes de Colpensiones y la mayoría del RAIS ganan hasta 2 SMLMV, de modo que la mayor parte de la cotización de la mayoría iría al reparto. El art. 75 exime a quienes tengan 750/900 semanas al 1 abr 2027. La OIT y el CARF describen el mismo diseño; lo evalúan de forma opuesta (coherencia con el Convenio 102 vs. menor ahorro nacional).", v:1, k:["ley2381","oit25","carf24"], vt:"Correcto para afiliados sin transición"},
    {a:"Colpensiones es una «pirámide» insostenible; la reforma «patea» la crisis 15 años y el sistema colapsa hacia 2062.", b:"El CARF (jun 2024) estima que el Fondo de Ahorro se agotaría en 2062 en el escenario base y que las transferencias de la Nación pasarían de 1,3 % a 3,8 % del PIB en 2063 (+62,3 % del PIB en VPN a 2100); el MFMP 2026 eleva el pasivo de 94,4 % a 121,5 % del PIB. Pero el mismo CARF señala que con subcuentas generacionales el fondo no se agota antes de 2100, que la reforma reduce los subsidios a pensiones altas y eleva la cobertura. «Pirámide» es una metáfora política: el reparto es un contrato intergeneracional legal, cuyo problema es demográfico y de diseño, no fraude.", v:2, k:["carf24","mfmp26"], vt:"El horizonte de riesgo coincide con el CARF; la caracterización es discutible"},
    {a:"El Gobierno prometió un bono de $500.000 y entregó «$82.000».", b:"La promesa de campaña (2022) fue de $500.000; el proyecto radicado en 2023 y la ley fijan la Renta Básica Solidaria en la línea de pobreza extrema indexada ($230.000 en 2026), tal como habían propuesto ANIF y Fedesarrollo por costo fiscal (0,3 % del PIB según el CARF). Los $82.000 corresponden al ejemplo del semicontributivo, no al Pilar Solidario.", v:2, k:["ley2381","carf24","anifFedes","pilarSol"], vt:"Mezcla dos pilares distintos"},
    {a:"Las cotizaciones son «propiedad privada» del afiliado y el Estado no debería decidir dónde cotizar.", b:"El art. 11 declara los recursos del sistema como públicos y parafiscales, y solo las cuentas del CCAI como propiedad privada del afiliado (inciso 4, devuelto a la Cámara por la C-264). En el RPM la cotización nunca ha sido propiedad individual (Ley 100, art. 32). La jurisprudencia reconoce la libertad de escoger régimen como configuración legal, no como derecho absoluto; ese es precisamente el punto de fondo pendiente en más de 100 demandas.", v:2, k:["ley2381","c264","ley100"], vt:"Posición normativa; el texto legal la contradice parcialmente"},
    {a:"El Decreto 1485 «quiebra» a las AFP y aleja la pensión mínima: de $360 a $560 millones de capital requerido.", b:"El decreto sustituyó el mecanismo de cobertura de deslizamiento del salario mínimo (que cubría el impacto del alza del mínimo sobre rentas vitalicias); con el mínimo +23 % en 2026, el capital para financiar una renta de 1 SMLMV sube en la misma proporción y las aseguradoras deben asumir el riesgo. La cifra de $360 → $560 millones es de Asofondos y depende de la edad y la tasa técnica; el modelo actuarial de esta plataforma muestra un salto del orden de 20–25 % por el mínimo, más el efecto de la tasa.", v:2, k:["d1485","d1469","sSeguro"], vt:"Mecanismo real; magnitud depende de supuestos"},
    {a:"Los $25 billones del Decreto 0415 deberían ir al fondo del Banco de la República, no a Colpensiones.", b:"El art. 24 (num. 4 y 5) destina al FAPC «la totalidad» de los traslados del RAIS a Colpensiones; el decreto ordena girar a Colpensiones los saldos de quienes se trasladaron por la ventana del art. 76, cuyo parágrafo dice que los saldos siguen en las AFP «hasta que se consolide la pensión». Asofondos sostiene que el traslado anticipado contraviene la ley; el Gobierno alega el «descalce» de pagar pensiones sin recibir los saldos. El fondo del Banco solo opera desde la vigencia (1 abr 2027).", v:1, k:["ley2381","d0415","sLaFM"], vt:"Consistente con el diseño del art. 24"},
    {a:"Contrarreforma: eliminar el semicontributivo, hacer opcional el contributivo, Colpensiones hasta 2,3 SMLMV para quien lo elija.", b:"El CARF advirtió que el arbitraje entre regímenes (elegir el que más subsidio da) es una de las fuentes del costo actual y que un umbral más bajo reduce el costo (≈20 % del PIB con 1 SMLMV); ANIF/Fedesarrollo muestran que el 76,8 % de los subsidios del RPM va al quintil más rico. Restaurar la libre elección con umbral de 2,3 mantendría el subsidio para quien elija reparto y devolvería el riesgo de selección adversa a Colpensiones. La propuesta no ha sido costeada públicamente.", v:2, k:["carf24","carf23","anifFedes","sContra"], vt:"Propuesta política sin evaluación fiscal publicada"}
  ]
};

/* ---------- Copias locales de los PDF citados ----------
   Varios servidores bloquean que su PDF se muestre dentro de otra página, y
   otros lo sirven sin extensión o forzando la descarga. Por eso el visor
   carga la copia guardada en pdf/<clave>.pdf y deja siempre a la vista el
   enlace a la fuente original. Si una fuente no está aquí, el visor intenta
   con la URL remota. Regenerar la lista al agregar un archivo a pdf/. */
SEMANAS.PDFLOCAL = {
  abece: "pdf/abece.pdf",
  bosch15: "pdf/bosch15.pdf",
  carf24u: "pdf/carf24u.pdf",
  conpes3975: "pdf/conpes3975.pdf",
  conpes4144: "pdf/conpes4144.pdf",
  daneMayores: "pdf/daneMayores.pdf",
  danePPED: "pdf/danePPED.pdf",
  farne17: "pdf/farne17.pdf",
  gmyrek24: "pdf/gmyrek24.pdf",
  gmyrek25: "pdf/gmyrek25.pdf",
  oecd23: "pdf/oecd23.pdf",
  oit25: "pdf/oit25.pdf"
};
