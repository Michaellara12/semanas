/* =====================================================================
   SEMANAS · Glosario
   ---------------------------------------------------------------------
   Terminología del sistema pensional. Cada entrada se abre en el cajón
   lateral al hacer clic sobre una palabra marcada en el texto:

       <span class="term" data-t="ibl">IBL</span>

   Campos: t = término · a = sigla o forma larga · d = definición
           e = ejemplo con números de 2026 · v = términos relacionados
           k = clave de fuente en SEMANAS.SOURCES (opcional)

   Regla de contenido: la definición dice qué es y de dónde sale la regla
   (norma o entidad). Si un valor cambia con la Ley 2381, se dice cuál rige
   antes y cuál después del 1 de abril de 2027.
   ===================================================================== */
(function(){
  "use strict";
  const S = window.SEMANAS = window.SEMANAS || {};

  S.GLOSARIO = {

  /* --- Bases de cálculo --- */
  smlmv:{ t:"SMLMV", a:"Salario mínimo legal mensual vigente",
    d:"El piso salarial que fija el Gobierno cada año por decreto, tras la negociación en la Comisión Permanente de Concertación. Es la unidad de medida de casi todo el sistema pensional: los topes, el umbral del pilar contributivo, la pensión mínima y los rangos del pilar semicontributivo se expresan en múltiplos del salario mínimo, no en pesos, para que no se desactualicen con la inflación.",
    e:"Ninguna pensión del sistema puede ser inferior a 1 SMLMV. Por eso quien cotiza toda la vida sobre el mínimo recibe exactamente el mínimo: la fórmula puede dar menos, pero la ley lo sube al piso.",
    i:["Cambia cada enero por decreto; en 2026 quedó en $1.750.905 tras un aumento del 23 %.",
       "Como el umbral, la pensión mínima y los topes se miden en SMLMV, una subida fuerte del mínimo mueve todo el sistema a la vez.",
       "Ninguna pensión puede ser inferior a un SMLMV: es el piso legal, no una meta."],
    v:["ibc","umbral","pension-minima"] },

  ibc:{ t:"IBC", a:"Ingreso base de cotización",
    d:"El ingreso sobre el cual se calcula el aporte mes a mes. Para un empleado es el salario, con un piso de 1 SMLMV y un tope de 25 SMLMV; para un independiente, el 40 % de sus ingresos brutos. No es lo que usted gana necesariamente: es lo que se reporta a la seguridad social, y de ahí sale tanto el aporte como el registro de semanas.",
    e:"Un salario de $4.000.000 con aporte del 16 % genera $640.000 mensuales al sistema, de los cuales el empleador paga 12 puntos y el trabajador 4.",
    i:["No es el sueldo: es lo que se <b>reporta</b>. Si el empleador reporta menos de lo que paga, la pensión se calcula sobre lo reportado.",
       "Piso de 1 SMLMV y tope de 25 SMLMV; los independientes cotizan sobre el 40 % de su ingreso.",
       "Con la Ley 2381 el IBC decide qué parte del aporte va a Colpensiones (hasta 2,3 SMLMV) y qué parte a la cuenta individual."],
    v:["ibl","smlmv","cotizacion"] },

  ibl:{ t:"IBL", a:"Ingreso base de liquidación",
    d:"El promedio de los ingresos sobre los que se cotizó, actualizado con el IPC, que sirve de base para liquidar la pensión. En el régimen de prima media es el promedio de los últimos 10 años, o el de toda la vida laboral si resulta más favorable y se cotizaron al menos 1.250 semanas. No confundir con el IBC: el IBC es lo que se aporta cada mes; el IBL es el promedio con el que se calcula la mesada.",
    e:"Si sus últimos diez años promedian $3.000.000 en pesos de hoy y le corresponde una tasa de reemplazo del 65 %, la mesada estimada es de $1.950.000.",
    i:["Se calcula al final, no mes a mes: es el promedio actualizado por inflación de lo cotizado.",
       "Regla general: promedio de los últimos 10 años; puede tomarse toda la vida laboral si conviene y hay al menos 1.250 semanas.",
       "Subir el IBC los últimos años sube la pensión: por eso la ley vigila los aumentos abruptos al final de la carrera."],
    v:["ibc","tasa-reemplazo","prima-media"] },

  semanas:{ t:"Semanas cotizadas", a:"",
    d:"La unidad con la que el sistema mide el tiempo de aporte. Un mes completo cotizado equivale a 4,29 semanas; un año, a 51,43. Lo que cuenta no es haber trabajado, sino que se haya reportado y pagado la cotización: los períodos de informalidad, desempleo o mora del empleador no suman.",
    e:"La Ley 100 exige 1.300 semanas —unos 25 años y 3 meses de aporte continuo— para pensionarse en Colpensiones.",
    i:["Un mes cotizado son 4,29 semanas; 1.300 semanas son unos 25 años de aporte continuo.",
       "Los períodos sin cotizar no suman aunque se haya trabajado: es la razón de fondo por la que la informalidad impide pensionarse.",
       "La Ley 2381 usa las semanas para fijar la transición (750 mujeres / 900 hombres al 1 de abril de 2027)."],
    v:["densidad","transicion","cotizacion"] },

  densidad:{ t:"Densidad de cotización", a:"",
    d:"La proporción del tiempo laboral activo en la que efectivamente se cotizó. Es el número que explica por qué tan poca gente se pensiona: no basta con trabajar treinta años, hay que haber aportado en la mayoría de esos meses.",
    e:"Una densidad del 45 % —cercana al promedio colombiano— significa que en 40 años de vida laboral se acumulan unas 940 semanas: por debajo de las 1.300 que exige la ley.",
    i:["Se mide como meses cotizados sobre meses de vida laboral. En Colombia el promedio ronda el 45 %.",
       "Con esa densidad, 40 años de trabajo rinden unas 940 semanas: no alcanza para las 1.300.",
       "Es el parámetro que ninguna reforma paramétrica ha logrado mover."],
    v:["semanas","informalidad","cobertura"] },

  cotizacion:{ t:"Tasa de cotización", a:"",
    d:"El porcentaje del IBC que se destina a pensión: 16 %, del cual el empleador aporta 12 puntos y el trabajador 4. De esos 16 puntos, 3 no van a la cuenta ni a la bolsa común sino a gastos de administración, seguro previsional y al Fondo de Garantía de Pensión Mínima. La Ley 2381 no cambia la tasa, cambia a dónde va el dinero.",
    e:"De un aporte de $640.000, unos $120.000 se van en administración y seguros; el resto financia la prestación.",
    i:["16 % del IBC: 12 puntos paga el empleador y 4 el trabajador. La Ley 2381 no lo cambia.",
       "No todo financia la pensión: 3 puntos van a administración, seguro previsional y garantía de pensión mínima.",
       "Quien gana 4 SMLMV o más aporta entre 1,5 % y 3 % adicional al Fondo de Solidaridad Pensional."],
    v:["ibc","umbral","fapc"] },

  /* --- Regímenes y pilares --- */
  "prima-media":{ t:"Régimen de prima media", a:"RPM · prestación definida",
    d:"El régimen público, administrado por Colpensiones. Los aportes de quienes cotizan hoy pagan las mesadas de quienes ya están pensionados: es un sistema de reparto, no una cuenta de ahorro. A cambio, la ley promete una fórmula conocida de antemano —de ahí lo de «prestación definida»— y el Estado cubre el faltante con el presupuesto.",
    e:"Quien cotiza 1.300 semanas sobre un IBL de $3.000.000 sabe desde el primer día que su tasa de reemplazo será del 65,5 % menos medio punto por cada salario mínimo de IBL.",
    i:["Lo administra Colpensiones y funciona por reparto: los aportes de hoy pagan las mesadas de hoy.",
       "Promete una fórmula (la tasa de reemplazo), no un saldo. Lo que la fórmula no financia lo cubre el Presupuesto.",
       "Con la Ley 2381 pasa a ser el Componente de Prima Media del pilar contributivo, obligatorio hasta 2,3 SMLMV."],
    v:["capitalizacion","reparto","tasa-reemplazo","subsidio"] },

  capitalizacion:{ t:"Régimen de ahorro individual", a:"RAIS · contribución definida",
    d:"El régimen privado, administrado por las AFP. Cada aporte entra a una cuenta a nombre del afiliado, se invierte y la pensión depende del capital acumulado, de los rendimientos obtenidos y de la esperanza de vida al momento del retiro. La ley no promete un monto: promete que el saldo es suyo.",
    e:"Un capital de $300.000.000 a los 62 años financia una renta vitalicia cercana a $1.500.000 mensuales, según la tasa y las tablas de mortalidad vigentes.",
    i:["Lo administran las AFP: cada aporte entra a una cuenta a nombre del afiliado y se invierte.",
       "La pensión depende del saldo, los rendimientos y la esperanza de vida al retiro. Nadie promete un monto.",
       "Con la reforma recibe solo los aportes por encima de 2,3 SMLMV, como Componente Complementario de Ahorro Individual."],
    v:["prima-media","renta-vitalicia","retiro-programado","afp"] },

  reparto:{ t:"Sistema de reparto", a:"pay-as-you-go",
    d:"Esquema en el que las cotizaciones de la generación activa financian las pensiones de la generación retirada, sin fondo acumulado que respalde la promesa. Su sostenibilidad depende de la relación entre cotizantes y pensionados, y por eso lo golpea directamente el envejecimiento y la informalidad.",
    e:"Con 3,7 cotizantes por pensionado el reparto se sostiene; con 1,5 —el escenario demográfico de mediados de siglo— requiere impuestos generales para cubrir la diferencia.",
    i:["Sin fondo acumulado detrás: la promesa se sostiene mientras haya suficientes cotizantes por cada pensionado.",
       "El envejecimiento y la informalidad lo golpean directo, porque reducen la base que aporta.",
       "Colpensiones tiene hoy cerca de 1,6 cotizantes activos por pensionado; el equilibrio pediría más de 3."],
    v:["prima-media","pasivo","fapc"] },

  pilares:{ t:"Sistema de pilares", a:"",
    d:"La arquitectura que introduce la Ley 2381: en vez de dos regímenes compitiendo por el mismo afiliado, cuatro componentes que se suman. Solidario (subsidio a personas mayores en pobreza), semicontributivo (para quien cotizó pero no alcanzó a pensionarse), contributivo (obligatorio, mixto entre Colpensiones y las AFP según el umbral) y ahorro voluntario.",
    e:"Un trabajador que gana 4 SMLMV cotizará por los primeros 2,3 a Colpensiones y por los 1,7 restantes a su AFP: los dos pilares, no uno u otro.",
    i:["Cuatro capas que se suman, no cuatro opciones: solidario, semicontributivo, contributivo y voluntario.",
       "El cambio de fondo es que el afiliado ya no escoge entre Colpensiones y una AFP: pasa por ambas según su ingreso.",
       "La arquitectura está en el artículo 3 de la Ley 2381; el reparto del aporte, en el 19."],
    v:["umbral","pilar-solidario","pilar-semicontributivo","ley2381"] },

  "pilar-solidario":{ t:"Pilar solidario", a:"",
    d:"Transferencia monetaria no contributiva para personas mayores en pobreza extrema o moderada que no alcanzaron una pensión. No exige haber cotizado y se financia con el presupuesto general, no con aportes. Es el pilar que más amplía la cobertura del sistema.",
    e:"El monto de referencia es de unos $230.000 mensuales, ajustados por línea de pobreza.",
    i:["No exige haber cotizado: se financia con el presupuesto, no con aportes.",
       "Lo administra Prosperidad Social y está dirigido a personas mayores en pobreza extrema o moderada.",
       "Es el componente que más amplía la cobertura, y el único que llega a quien nunca estuvo en el sistema."],
    v:["pilar-semicontributivo","cobertura","pilares"] },

  "pilar-semicontributivo":{ t:"Pilar semicontributivo", a:"",
    d:"Para quien cotizó entre 300 y 1.000 semanas y llegó a la edad sin cumplir los requisitos de pensión. Convierte el saldo o las semanas en una renta vitalicia con un subsidio estatal, en vez de devolver el dinero de una sola vez. Es la alternativa a la devolución de saldos y a la indemnización sustitutiva.",
    e:"Con 800 semanas cotizadas sobre el mínimo, la renta del pilar semicontributivo supera a la devolución de saldos si se viven más de once años después del retiro.",
    i:["Para quien cotizó entre 300 y 1.000 semanas y llegó a la edad sin pensionarse.",
       "Reemplaza la devolución de saldos (un pago único) por una renta vitalicia con subsidio estatal.",
       "Conviene si se vive más allá del punto de equilibrio; si no, el pago único habría rendido más."],
    v:["devolucion","indemnizacion","punto-equilibrio"] },

  umbral:{ t:"Umbral", a:"2,3 SMLMV",
    d:"La frontera que reparte cada cotización entre el pilar público y el privado: los aportes sobre los primeros 2,3 salarios mínimos van a Colpensiones y al Fondo de Ahorro; lo que exceda ese nivel va a la cuenta individual en la AFP. Es el parámetro más discutido de la reforma porque define cuánto dinero maneja el Estado y cuánto ahorro individual queda.",
    e:"Con el salario mínimo de 2026 ($1.750.905), el umbral equivale a unos $4.027.000 mensuales. Quien gana menos cotiza todo a Colpensiones; quien gana más divide.",
    i:["2,3 SMLMV: unos $4.027.000 en 2026. Hasta ahí el aporte va a Colpensiones; el exceso, a la cuenta individual.",
       "Define cuánto dinero maneja el pilar público y cuánto ahorro queda en las AFP. Por eso es el parámetro más peleado.",
       "El Gobierno propuso 4, luego 3; el Senado lo bajó a 2,3; el CARF recomendó 1."],
    v:["fapc","pilares","cotizacion"] },

  fapc:{ t:"Fondo de Ahorro del Pilar Contributivo", a:"FAPC",
    d:"El fondo donde se acumula el excedente entre lo que recauda el pilar contributivo público y lo que paga en mesadas durante los primeros años de la reforma. Lo administra el Banco de la República con un régimen de inversión propio. Su función es amortiguar el momento en que los pagos superen al recaudo, no financiar el sistema para siempre.",
    e:"Las proyecciones del CARF sitúan su agotamiento alrededor de 2062, con el umbral en 2,3 SMLMV.",
    i:["Guarda el excedente de Colpensiones mientras recaude más de lo que paga. Lo administra el Banco de la República.",
       "No es un fondo eterno: el CARF proyecta su agotamiento alrededor de 2062 con el umbral en 2,3.",
       "Sus reglas de inversión están entre lo que la Corte devolvió a la Cámara y aún no se han reglamentado."],
    v:["umbral","carf","pasivo"] },

  /* --- Prestaciones --- */
  "tasa-reemplazo":{ t:"Tasa de reemplazo", a:"",
    d:"La proporción del ingreso previo que sustituye la pensión. En el régimen de prima media se calcula con la fórmula r = 65,5 − 0,5·s, donde s es el IBL medido en salarios mínimos: a mayor ingreso, menor porcentaje, más las semanas adicionales sobre las 1.300 exigidas.",
    e:"Con un IBL de 3 SMLMV la tasa base es del 64 %; con un IBL de 10 SMLMV, del 60,5 %.",
    i:["Fórmula del régimen de prima media: r = 65,5 − 0,5·s, donde s es el IBL en salarios mínimos.",
       "A mayor ingreso, menor porcentaje: 64 % con IBL de 3 SMLMV; 60,5 % con IBL de 10.",
       "Sube 1,5 puntos por cada 50 semanas adicionales a las 1.300, con techo del 80 %."],
    v:["ibl","prima-media","mesada"] },

  mesada:{ t:"Mesada pensional", a:"",
    d:"El pago mensual que recibe el pensionado. Se reajusta cada año con el IPC —o con el salario mínimo si la pensión es de un salario mínimo— y quienes se pensionaron bajo regímenes anteriores a 2011 pueden recibir catorce mesadas al año en lugar de trece.",
    e:"Una mesada de $2.000.000 con inflación del 5 % pasa a $2.100.000 en enero siguiente.",
    i:["Se reajusta cada enero con el IPC; las de un salario mínimo, con el aumento del mínimo.",
       "Trece mesadas al año; catorce solo para pensiones causadas antes de la reforma constitucional de 2005.",
       "Con la Ley 2381, Colpensiones paga una única mesada que suma los dos componentes del pilar contributivo."],
    v:["tasa-reemplazo","sustitucion"] },

  "renta-vitalicia":{ t:"Renta vitalicia", a:"",
    d:"Modalidad en la que el afiliado entrega su capital a una aseguradora y esta se compromete a pagarle una mesada fija, ajustada por inflación, hasta su muerte. El riesgo de vivir mucho pasa a la aseguradora; a cambio, el saldo deja de ser heredable.",
    e:"Con $300.000.000 a los 62 años, una renta vitalicia paga alrededor de $1.500.000 mensuales de por vida.",
    i:["El capital pasa a una aseguradora, que paga una mesada fija de por vida y asume el riesgo de longevidad.",
       "No deja saldo heredable, pero sí genera sustitución pensional para el cónyuge y los hijos con derecho.",
       "La renta del pilar semicontributivo tiene una regla distinta: el artículo 18, parágrafo 2, no permite heredarla ni sustituirla por muerte. No se deben trasladar a ella las reglas de sobrevivientes de una pensión."],
    v:["retiro-programado","mortalidad","punto-equilibrio"] },

  "retiro-programado":{ t:"Retiro programado", a:"",
    d:"Modalidad en la que el saldo permanece en la AFP, se sigue invirtiendo y se retira por cuotas recalculadas cada año según el capital restante y la expectativa de vida. Si el pensionado muere, el saldo pasa a sus herederos; a cambio, la mesada puede bajar con los años.",
    e:"Una mesada inicial de $1.700.000 en retiro programado puede caer a $1.100.000 quince años después si los rendimientos no acompañan.",
    i:["El saldo sigue en la AFP y se retira por cuotas recalculadas cada año.",
       "Si el pensionado muere, el saldo pasa a los herederos; a cambio, la mesada puede bajar con los años.",
       "Riesgo de longevidad a cargo del afiliado: si vive más de lo previsto, el saldo se agota."],
    v:["renta-vitalicia","capitalizacion"] },

  devolucion:{ t:"Devolución de saldos", a:"",
    d:"Lo que recibe quien cotizó al régimen de ahorro individual, llegó a la edad y no alcanzó el capital para una pensión mínima: le devuelven su saldo con rendimientos, en un solo pago. Cierra la relación con el sistema.",
    e:"Es la comparación obligada del pilar semicontributivo: un pago único hoy frente a una renta pequeña pero de por vida.",
    i:["Es lo que recibe quien llegó a la edad sin capital para una pensión mínima en el régimen de ahorro individual.",
       "Un pago único: saldo más rendimientos. Cierra la relación con el sistema.",
       "La Ley 2381 la sustituye, para quien tenga entre 300 y 1.000 semanas, por la renta del pilar semicontributivo."],
    v:["indemnizacion","pilar-semicontributivo","punto-equilibrio"] },

  indemnizacion:{ t:"Indemnización sustitutiva", a:"",
    d:"El equivalente en el régimen de prima media: un pago único para quien llegó a la edad sin las semanas necesarias. Se calcula con el promedio de lo cotizado, las semanas efectivas y el porcentaje de aporte, actualizado por inflación.",
    e:"Con 600 semanas sobre el mínimo, la indemnización ronda los pocos millones de pesos: mucho menos que el valor presente de una pensión.",
    i:["Equivalente de la devolución de saldos, pero en el régimen de prima media.",
       "Se calcula con el promedio de lo cotizado, las semanas efectivas y el porcentaje de aporte, actualizado por inflación.",
       "Suele quedar muy por debajo del valor presente de una pensión: es la salida de quien no alcanzó."],
    v:["devolucion","pilar-semicontributivo"] },

  "punto-equilibrio":{ t:"Punto de equilibrio", a:"",
    d:"El número de años que hay que vivir después del retiro para que una renta vitalicia iguale, en valor presente, a un pago único. Por debajo de ese umbral conviene el pago único; por encima, la renta.",
    e:"Si la devolución es de $60.000.000 y la renta del pilar semicontributivo es de $520.000 mensuales, el punto de equilibrio está alrededor de los once años.",
    i:["Años que hay que vivir tras el retiro para que una renta mensual iguale, en valor presente, a un pago único.",
       "Por debajo conviene el pago único; por encima, la renta. Depende de la tasa de descuento que se use.",
       "Es la comparación clave para decidir entre devolución de saldos y pilar semicontributivo."],
    v:["renta-vitalicia","devolucion","mortalidad"] },

  sustitucion:{ t:"Sustitución pensional", a:"pensión de sobrevivientes",
    d:"El derecho del cónyuge o compañero permanente, los hijos menores o con discapacidad y, en su defecto, los padres, a seguir recibiendo la pensión cuando el titular muere. Exige convivencia acreditada de al menos cinco años en el caso del cónyuge.",
    e:"Es el punto donde más pesa la diferencia entre renta vitalicia y retiro programado: la primera no deja saldo heredable, pero sí genera sustitución.",
    i:["El cónyuge o compañero permanente necesita al menos cinco años de convivencia acreditada.",
       "Los hijos la reciben hasta los 18 años, o hasta los 25 si estudian, o sin límite si tienen discapacidad.",
       "La renta vitalicia la genera; el retiro programado, en cambio, deja saldo heredable."],
    v:["renta-vitalicia","mesada"] },

  "pension-minima":{ t:"Garantía de pensión mínima", a:"FGPM",
    d:"El compromiso estatal de completar hasta un salario mínimo la pensión de quien cumplió requisitos pero cuyo capital o fórmula no alcanza. En el régimen de ahorro individual se financia con el Fondo de Garantía de Pensión Mínima, alimentado con 1,5 puntos de la cotización.",
    e:"Explica por qué la pensión de un cotizante del mínimo es idéntica en los dos regímenes: la garantía iguala el resultado.",
    i:["El Estado completa hasta un SMLMV la pensión de quien cumplió requisitos pero cuyo capital o fórmula no alcanza.",
       "En el régimen de ahorro individual se financia con el Fondo de Garantía de Pensión Mínima (1,5 puntos de la cotización).",
       "Por eso quien cotiza toda la vida sobre el mínimo recibe lo mismo en cualquiera de los dos regímenes."],
    v:["smlmv","subsidio","cotizacion"] },

  /* --- Transición y régimen jurídico --- */
  transicion:{ t:"Régimen de transición", a:"",
    d:"La regla que decide quién se pensiona con las normas viejas y quién con las nuevas. La Ley 2381 lo fija en semanas cotizadas al momento de su entrada en vigencia: quienes tengan 750 semanas (mujeres) o 900 (hombres) siguen bajo la Ley 100. Con la Sentencia C-264 de 2026 el corte se cuenta al 1 de abril de 2027.",
    e:"Una mujer con 780 semanas al 1 de abril de 2027 conserva íntegro el régimen anterior, incluida la posibilidad de elegir entre Colpensiones y su AFP.",
    i:["Se mide en semanas, no en edad: 750 para mujeres y 900 para hombres al 1 de abril de 2027 (art. 75).",
       "Quien las tenga conserva íntegra la Ley 100, incluida la posibilidad de elegir entre Colpensiones y su AFP.",
       "Es el artículo que decide a quién le aplica la reforma y a quién no."],
    v:["ley2381","c264","semanas"] },

  ley2381:{ t:"Ley 2381 de 2024", a:"reforma pensional",
    d:"La reforma que sustituye la competencia entre regímenes por un sistema de cuatro pilares, crea el Fondo de Ahorro del Pilar Contributivo, fija el umbral en 2,3 SMLMV y amplía el pilar solidario. Consta de 95 artículos y entra en vigencia el 1 de abril de 2027.",
    e:"No cambia la edad de pensión (57 mujeres / 62 hombres) ni la tasa de cotización: cambia hacia dónde va cada peso aportado.",
    i:["Sancionada el 16 de julio de 2024; 95 artículos; vigencia fijada por la Corte para el 1 de abril de 2027.",
       "Crea el sistema de cuatro pilares, el Fondo de Ahorro y el umbral de 2,3 SMLMV; no toca edad ni tasa de cotización.",
       "Tres artículos y seis apartes volvieron a la Cámara tras la Sentencia C-264; más de cien demandas de fondo siguen pendientes."],
    v:["pilares","umbral","c264","transicion"], k:"ley2381" },

  c264:{ t:"Sentencia C-264 de 2026", a:"",
    d:"El fallo del 25 de agosto de 2026 con el que la Corte Constitucional resolvió las demandas por vicios de procedimiento: declaró exequible la mayor parte de la ley, devolvió a la Cámara los artículos 14, 36 y 93 más apartes de otros seis, y aplazó la vigencia al 1 de abril de 2027. Las más de cien demandas de fondo siguen suspendidas.",
    e:"Es la razón por la que el sistema de pilares no arrancó en julio de 2025 como preveía el texto original.",
    i:["Fallo del 25 de agosto de 2026: exequible casi todo el articulado, pero <b>solo por vicios de procedimiento</b>.",
       "Devolvió a la Cámara los artículos 14, 36 y 93 y apartes de 11, 19, 23, 63, 84 y 92.",
       "Aplazó la vigencia al 1 de abril de 2027. Las demandas de fondo se retoman desde entonces."],
    v:["ley2381","transicion"], k:"c264" },

  /* --- Instituciones --- */
  colpensiones:{ t:"Colpensiones", a:"",
    d:"La administradora pública del régimen de prima media, empresa industrial y comercial del Estado. Con la reforma pasa a administrar el pilar contributivo hasta el umbral y a operar el pilar semicontributivo.",
    e:"En junio de 2026 reportaba 7,24 millones de afiliados y 1,93 millones de pensionados.",
    i:["Empresa industrial y comercial del Estado; administra el régimen de prima media desde 2012, cuando reemplazó al ISS.",
       "Con la reforma administra el Componente de Prima Media hasta el umbral y opera el pilar semicontributivo.",
       "Junio de 2026: 7,24 millones de afiliados y 1,93 millones de pensionados."],
    v:["prima-media","afp","pilares"] },

  afp:{ t:"AFP", a:"Administradora de fondos de pensiones",
    d:"Las sociedades privadas que administran las cuentas individuales del régimen de ahorro individual: Porvenir, Protección, Colfondos y Skandia. Con la reforma administran los aportes por encima del umbral y el ahorro voluntario.",
    e:"En abril de 2026 gestionaban alrededor de $548 billones, cerca del 28 % del PIB.",
    i:["Cuatro administradoras: Porvenir, Protección, Colfondos y Skandia. Las vigila la Superintendencia Financiera.",
       "Con la Ley 2381 pasan a administrar solo los aportes por encima de 2,3 SMLMV y el ahorro voluntario.",
       "Administraban cerca de $548 billones en abril de 2026, alrededor del 28 % del PIB."],
    v:["capitalizacion","asofondos","umbral"] },

  asofondos:{ t:"Asofondos", a:"",
    d:"El gremio que reúne a las administradoras de fondos de pensiones. Publica cifras del ahorro administrado y es uno de los actores centrales del debate: fuente de datos y parte interesada a la vez, por lo que sus cifras se contrastan con la Superintendencia Financiera.",
    i:["Gremio de las AFP: publica cifras del ahorro administrado y participa en el debate como parte interesada.",
       "Sus datos se cruzan con la Superintendencia Financiera antes de usarlos en el observatorio.",
       "Ha sido el principal opositor institucional al umbral de 2,3 y al traslado de saldos."],
    e:"", v:["afp","capitalizacion"] },

  carf:{ t:"CARF", a:"Comité Autónomo de la Regla Fiscal",
    d:"El órgano técnico independiente que evalúa el cumplimiento de la regla fiscal y proyecta el impacto de las reformas sobre las finanzas públicas. Sus estimaciones del Fondo de Ahorro son la referencia contra la que se comparan los modelos de esta plataforma.",
    e:"El CARF sitúa el agotamiento del Fondo de Ahorro alrededor de 2062.",
    i:["Gremio de las AFP: publica cifras del ahorro administrado y participa en el debate como parte interesada.",
       "Sus datos se cruzan con la Superintendencia Financiera antes de usarlos en el observatorio.",
       "Ha sido el principal opositor institucional al umbral de 2,3 y al traslado de saldos."],
    v:["fapc","pasivo"] },

  dane:{ t:"DANE", a:"Departamento Administrativo Nacional de Estadística",
    d:"La entidad con mandato estadístico nacional. De ahí salen la Gran Encuesta Integrada de Hogares (informalidad y ocupación), las proyecciones de población y las tablas de esperanza de vida que alimentan los modelos demográficos.",
    e:"La informalidad del 54,5 % del trimestre abril–junio de 2026 es una cifra de la GEIH.",
    i:["Fuente oficial de la informalidad (GEIH), las proyecciones de población y las tablas de esperanza de vida.",
       "La informalidad del 54,5 % (abril–junio de 2026) y la cobertura del 25,5 % (2020) son cifras suyas.",
       "Sus proyecciones alimentan el motor demográfico del observatorio."],
    v:["informalidad","cobertura","mortalidad"] },

  /* --- Medición y modelos --- */
  informalidad:{ t:"Informalidad laboral", a:"",
    d:"La proporción de ocupados que no cotiza a seguridad social. Es la restricción de fondo del sistema pensional colombiano: sin cotización no hay semanas, y sin semanas no hay pensión por más que se ajusten los parámetros.",
    e:"Con 54,5 % de informalidad, más de la mitad de quienes trabajan hoy no está construyendo derecho pensional alguno.",
    i:["54,5 % de los ocupados en el trimestre abril–junio de 2026: más de la mitad no cotiza.",
       "Sin cotización no hay semanas, y sin semanas no hay pensión. Es la restricción que ninguna reforma ha tocado.",
       "Explica por qué la cobertura no sube aunque los parámetros cambien."],
    v:["densidad","cobertura","dane"] },

  cobertura:{ t:"Cobertura pensional", a:"",
    d:"La proporción de personas en edad de pensión que efectivamente recibe una pensión. Es distinta de la afiliación: se puede estar afiliado toda la vida y no alcanzar los requisitos.",
    e:"En 2020, solo el 25,5 % de las personas en edad de pensión recibía pensión contributiva.",
    i:["Proporción de personas en edad de pensión que recibe una: 25,5 % en 2020 (22,4 % entre mujeres).",
       "No es lo mismo que afiliación: se puede estar afiliado toda la vida y no cumplir requisitos.",
       "El pilar solidario es el único componente de la Ley 2381 que la mueve de forma directa."],
    v:["informalidad","pilar-solidario","densidad"] },

  subsidio:{ t:"Subsidio implícito", a:"",
    d:"La diferencia entre el valor presente de las mesadas que recibirá un pensionado y el valor presente de lo que aportó. En el régimen de prima media es positivo para casi todos los perfiles y crece con el ingreso, porque la fórmula promete más de lo que financia la cotización.",
    e:"Farné y Nieto (2017) encontraron que el subsidio del régimen público se concentra en los deciles altos: quien más gana, más subsidio recibe en pesos.",
    i:["Diferencia entre el valor presente de las mesadas y el de los aportes. En prima media casi siempre es positivo.",
       "Crece con el ingreso: el 20 % más rico captura el 76,8 % de los subsidios del régimen público.",
       "El umbral de 2,3 lo acota por arriba, pero no lo elimina por debajo."],
    v:["tir","prima-media","pasivo"] },

  tir:{ t:"TIR", a:"Tasa interna de retorno",
    d:"La tasa de interés que iguala el valor presente de los aportes con el de las prestaciones recibidas. Permite comparar regímenes y perfiles en una sola cifra: si la TIR del reparto supera la tasa de crecimiento de la economía, el esquema está prometiendo más de lo que puede financiar.",
    e:"Una TIR real del 6 % para un cotizante del mínimo frente a un crecimiento del PIB del 3 % indica un subsidio estructural.",
    i:["La tasa de interés que iguala aportes y prestaciones en valor presente. Permite comparar regímenes en una sola cifra.",
       "Si la TIR del reparto supera el crecimiento de la economía, el sistema promete más de lo que puede financiar.",
       "Es la medida que usa el observatorio para el subsidio implícito por perfil."],
    v:["subsidio","pasivo"] },

  pasivo:{ t:"Pasivo pensional", a:"VPN de las obligaciones",
    d:"El valor presente neto de todas las pensiones que el Estado tendrá que pagar en las décadas siguientes, menos los aportes que espera recibir. No es una deuda exigible hoy, pero mide el compromiso que ya está adquirido.",
    e:"El Marco Fiscal de Mediano Plazo de 2026 lo sitúa en 121,5 % del PIB con la reforma y 94,4 % sin ella.",
    i:["Valor presente de todas las pensiones que el Estado deberá pagar, neto de los aportes que espera recibir.",
       "No es deuda exigible hoy, pero mide un compromiso ya adquirido: 121,5 % del PIB con la reforma según el MFMP 2026.",
       "La mayor parte proviene de regímenes especiales y en extinción, no del régimen general."],
    v:["reparto","carf","fapc"] },

  mortalidad:{ t:"Tablas de mortalidad", a:"RV08",
    d:"Las tablas que fija la Superintendencia Financiera para calcular cuánto capital se necesita por cada peso de renta vitalicia. Las de rentistas suponen mayor longevidad que las poblacionales, porque quien compra una renta vitalicia vive en promedio más que el colombiano medio.",
    e:"A los 65 años, la esperanza de vida poblacional es de unos 16,0 años para hombres y 19,3 para mujeres; con tablas de rentistas sube a 18,2 y 21,5.",
    i:["Las fija la Superintendencia Financiera (tablas RV08) y deciden cuánto capital se necesita por peso de renta vitalicia.",
       "Las de rentistas suponen más longevidad que las poblacionales: 18,2 años a los 65 para hombres frente a 16,0.",
       "Un año más de esperanza de vida encarece la renta vitalicia y baja la mesada del mismo capital."],
    v:["renta-vitalicia","punto-equilibrio"] },

  "monte-carlo":{ t:"Simulación de Monte Carlo", a:"",
    d:"Método que corre miles de trayectorias con rendimientos aleatorios en vez de una sola proyección determinista, para mostrar la distribución de resultados posibles y no un único número. Sirve para medir cuánto del resultado depende del azar del mercado.",
    e:"Dos mil simulaciones sobre 25 años de aportes muestran que el capital final del percentil 10 puede ser la mitad del percentil 90.",
    i:["Corre miles de trayectorias con rendimientos aleatorios en vez de una sola proyección.",
       "Muestra la distribución de resultados: qué tan probable es quedar por debajo del capital necesario.",
       "El observatorio usa 2.000 simulaciones sobre 25 años de aportes."],
    v:["capitalizacion","tir"] },

  ipc:{ t:"IPC", a:"Índice de precios al consumidor",
    d:"La medida oficial de inflación que publica el DANE. Actualiza el IBL, reajusta las mesadas cada enero y convierte los pesos de distintos años a una misma unidad. En esta plataforma todas las cifras están en pesos constantes de 2026 salvo indicación contraria.",
    e:"$1.000.000 de 2016 equivalen a cerca de $1.700.000 de 2026.",
    i:["Lo publica el DANE y reajusta las mesadas cada enero y el IBL al liquidar.",
       "Todas las cifras del observatorio están en pesos constantes de 2026 salvo indicación contraria.",
       "Un peso de 2016 equivale a cerca de 1,7 pesos de 2026."],
    v:["ibl","mesada"] }

  };


  /* ---------------------------------------------------------------------
     Frases que disparan cada término al recorrer el texto de una página.
     Las que van entre // // se comparan respetando mayúsculas (siglas);
     las demás, sin distinguir mayúsculas ni tildes de más. El marcado
     automático solo toca la PRIMERA aparición de cada término por página,
     nunca dentro de títulos, enlaces, citas ni botones.
     --------------------------------------------------------------------- */
  S.TERM_FRASES = {
    smlmv:["/SMLMV/","/SMMLV/","salario mínimo legal mensual vigente"],
    ibc:["/IBC/","ingreso base de cotización"],
    ibl:["/IBL/","ingreso base de liquidación"],
    semanas:["semanas cotizadas","semanas de cotización"],
    densidad:["densidad de cotización"],
    cotizacion:["tasa de cotización"],
    "prima-media":["régimen de prima media","/RPM/","prima media"],
    capitalizacion:["régimen de ahorro individual","ahorro individual","/RAIS/","capitalización individual"],
    reparto:["sistema de reparto","de reparto"],
    pilares:["sistema de pilares","cuatro pilares"],
    "pilar-solidario":["pilar solidario"],
    "pilar-semicontributivo":["pilar semicontributivo"],
    umbral:["umbral de 2,3","umbral"],
    fapc:["Fondo de Ahorro del Pilar Contributivo","Fondo de Ahorro"],
    "tasa-reemplazo":["tasa de reemplazo"],
    mesada:["mesada pensional","mesada"],
    "renta-vitalicia":["renta vitalicia"],
    "retiro-programado":["retiro programado"],
    devolucion:["devolución de saldos"],
    indemnizacion:["indemnización sustitutiva"],
    "punto-equilibrio":["punto de equilibrio"],
    sustitucion:["sustitución pensional","pensión de sobrevivientes"],
    "pension-minima":["garantía de pensión mínima","pensión mínima"],
    transicion:["régimen de transición","transición"],
    ley2381:["Ley 2381 de 2024","Ley 2381"],
    c264:["Sentencia C-264 de 2026","Sentencia C-264"],
    colpensiones:["Colpensiones"],
    afp:["/AFP/","administradoras de fondos de pensiones"],
    asofondos:["Asofondos"],
    carf:["/CARF/","Comité Autónomo de la Regla Fiscal"],
    dane:["/DANE/"],
    informalidad:["informalidad laboral","informalidad"],
    cobertura:["cobertura pensional","cobertura"],
    subsidio:["subsidio implícito","subsidios implícitos"],
    tir:["/TIR/","tasa interna de retorno"],
    pasivo:["pasivo pensional"],
    mortalidad:["tablas de mortalidad","tabla de mortalidad"],
    "monte-carlo":["Monte Carlo"],
    ipc:["/IPC/"]
  };

  /* Términos ordenados alfabéticamente, para la página del glosario. */
  S.glosarioOrdenado = () => Object.keys(S.GLOSARIO)
    .map(k => Object.assign({k}, S.GLOSARIO[k]))
    .sort((a,b) => a.t.localeCompare(b.t,"es"));
})();
