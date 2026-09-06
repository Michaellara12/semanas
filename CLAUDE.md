# SEMANAS · Observatorio del Sistema Pensional Colombiano

Sitio web estático de análisis técnico e interactivo sobre el sistema pensional de Colombia y la Ley 2381 de 2024. Se publica solo en GitHub Pages desde la rama `main`, carpeta raíz. **No hay compilación**: lo que está en el repositorio es exactamente lo que se sirve. Un cambio en cualquier `index.html`, en `css/` o en `js/` aparece en el sitio en menos de un minuto tras el merge.

**El observatorio son cuatro secciones grandes más las referencias**, y cada una es una ruta propia: `historia/`, `reforma/`, `cifras/`, `ia/`, `fuentes/`, `metodologia/`. La portada explica qué es el sistema pensional y cómo funciona. Cada página contiene solo su `<main>`; el menú lateral, la barra móvil, el cajón de navegación, el visor de PDF, el cajón del glosario, el modal de artículos, la rejilla de la portada y el pie los inyecta `js/shell.js` a partir de `js/routes.js`.

Dentro de una ruta, cada parte es un `<section id="…">` declarado en el campo `sub` de esa ruta. El menú lateral despliega esas partes cuando la ruta está activa.

**Antes de tocar HTML o CSS, lea `.claude/skills/interfaz-semanas/SKILL.md`.** Ahí están las reglas que no se negocian: ningún control con el aspecto por defecto del navegador y ningún patrón debajo del texto.

## Estado del proyecto (actualizar si cambia)

- **Estado jurídico:** la Sentencia C-264 de 2026 (25 de agosto, M.P. Paola Andrea Meneses Mosquera) declaró exequible la mayor parte de la Ley 2381 solo por vicios de procedimiento, devolvió a la Cámara los artículos 14, 36 y 93 más apartes de 11, 19, 23, 63, 84 y 92, y fijó la **vigencia el 1 de abril de 2027**. Más de 100 demandas de fondo siguen suspendidas hasta esa fecha.
- **Corte de información:** 5 de septiembre de 2026. Si se agregan datos posteriores, actualizar también esta línea y el pie del menú lateral en `js/shell.js`.
- **Es un borrador en evolución** (rough sketch): se espera seguir agregando secciones, ilustraciones y análisis.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Portada: qué es el proyecto, cómo funciona el sistema pensional, los cuatro pilares y la rejilla de secciones. |
| `<seccion>/index.html` | Una carpeta por ruta. Contiene solo su `<main>`; declara `data-root="../"` y `data-route="<seccion>"` en `<html>`. |
| `js/routes.js` | **Única fuente de verdad de la navegación**: número, título, descripción, color, patrón y partes internas (`sub`) de cada ruta, más los grupos del menú (`PARTS`). Agregar una parte = crear el `<section id>` + añadirlo a `sub`. |
| `js/shell.js` | Inyecta el armazón compartido y el pie anterior/siguiente. |
| `js/glossary.js` | `GLOSARIO` (definición, «lo importante», ejemplo y términos relacionados) y `TERM_FRASES` (frases que disparan el marcado automático). El glosario no tiene página: vive en el cajón lateral. |
| `.claude/skills/interfaz-semanas/` | Reglas de interfaz obligatorias: controles con marca, patrones fuera del texto, color, navegación. |
| `css/styles.css` | Identidad visual completa en variables CSS. |
| `js/data.js` | Fuentes numeradas, series de datos, línea de tiempo, los 95 artículos de la ley, columnas y tesis de Jerome Sanabria. |
| `js/models.js` | Motores de cálculo: actuarial, demográfico, Monte Carlo, fiscal y de subsidios. |
| `js/charts.js` | Librería propia de gráficas SVG (línea, barras, doble eje, dona, pirámide, histograma, mapa de calor, tornado). |
| `js/app.js` | Interfaz: citas con vista previa, bibliografía por sección, glosario, calculadora, simuladores, explorador de artículos. |
| `tests/test_models.js` | Casos de calibración. Correr con `node tests/test_models.js`. |
| `build.py` | Concatena todas las rutas en `dist/semanas.html` (archivo único) y `dist/semanas-artifact.html`. Marca `<html data-single>` para que los enlaces vuelvan a ser anclas. Opcional; el sitio no lo necesita. |
| `vendor/tex-svg.js` | MathJax local para que las fórmulas funcionen sin internet. |
| `pdf/` | Copias locales de las fuentes en PDF, una por clave (`abece.pdf`, `carf24u.pdf`, …). Las sirve el visor. |

## Reglas de contenido (importantes)

1. **Toda cifra lleva fuente.** Se agrega la fuente a `SEMANAS.SOURCES` en `js/data.js` con una clave corta, y se cita en el HTML con `<a class="cite" data-ref="clave"></a>`. La numeración `[n]` y la bibliografía se generan solas; nunca escribir números de referencia a mano.
2. **Tres niveles que no se mezclan:** hechos (texto legal y cifras oficiales), estimaciones (modelos, siempre con supuestos explícitos y comparación contra un estudio publicado) y opiniones (posiciones de actores). Nunca presentar una estimación como dato oficial.
3. **Jerarquía de fuentes:** normas y sentencias primero; luego entidades con mandato estadístico o fiscal (DANE, Colpensiones, Superfinanciera, MinHacienda, CARF, Banco de la República, OIT, OCDE, CEPAL); luego gremios y centros de pensamiento; la prensa solo para reseñar documentos primarios o declaraciones.
4. **Series históricas:** no interpolar años sin dato oficial publicado. Dejar el hueco.
5. **Idioma:** español de Colombia. Separador decimal coma, miles punto. Pesos constantes de 2026 salvo que se diga lo contrario.

## Reglas de diseño

La identidad visual v3 toma como referencia el lenguaje gráfico de **Aardvark Book Club**: fondo blanco, bloques de color plano y saturado en lugar de tarjetas, tipografía display ancha de peso alto, cuerpo en semibold, radios grandes en `em`, bordes negros de 1,5–2 px con sombra dura (`4px 4px 0`), botones píldora y un acento manuscrito puntual. Paleta: magenta (`--magenta`), violeta y periwinkle, cian, amarillo, verde, naranja y vino, con sus tintes suaves como fondo de bloque.

- Tipografías: **Bricolage Grotesque** para titulares (`--display`), **Figtree** para el cuerpo (`--font`), **Caveat** para las notas manuscritas (`--hand`) e **IBM Plex Mono** para código (`--mono`). Se cargan desde Google Fonts en el `<head>` de `index.html`.
- Todos los colores y tipografías viven en variables CSS al inicio de `css/styles.css`. Cambiar allí, nunca con valores sueltos en los componentes.
- **Geometría cuadrada:** los tokens de radio (`--r-sm`, `--r`, `--pill`…) valen `0`. No escribir `border-radius` a mano en un componente nuevo.
- Las gráficas leen la paleta desde esas variables (`--c1` a `--c8`), así que un cambio de tema se propaga solo. `--c4`, `--c7` y `--cyan-ink` son las versiones oscurecidas del cian y el verde: los tonos plenos no tienen contraste suficiente sobre blanco.
- **No meter todo en tarjetas.** Hay un catálogo de bloques para alternar: `.figure` (gráfica con regla superior de color, o en variante `boxed` / `tinted`), `.panel` (herramienta interactiva sobre fondo tintado), `.block` (solo una regla arriba), `.listblock` (barra de color a la izquierda), `.rows` (filas separadas por reglas), `.tiles` (mosaico de color plano), `.stat-strip` / `.kpis` (cifras separadas por reglas, nunca por cajas), `.band` (franja a sangre), `.callout`, `.slab` y `.steps`. `.card` sigue existiendo, pero es para uso puntual.
- **Los filtros no se repiten.** Cada control tiene su propio estilo: `.seg` (segmentado, línea de tiempo), `.chips` (fichas conmutables), `.tabs` (pestañas subrayadas) y `.tabs.pill` (pestañas píldora), `.searchbar` (buscador con lupa), `.select-wrap` y `.switch`.
- El menú lateral usa el **mismo lenguaje de celdas que `.art-list`**: fondo negro que asoma entre celdas a sangre, sin marco, radios ni sombra, y con la barra de desplazamiento de `.side`, más ancha y con marca, como única señal de que hay más abajo. La ruta activa se marca desde `data-route`; dentro de ella se despliegan sus partes y se resaltan con el desplazamiento, pero **sin mover el menú**: nunca `scrollIntoView` desde un oyente de scroll (eso lo congelaba al final de la página).
- Cada ruta tiene un color de la paleta (`.c-magenta`, `.c-cyan`, … que definen `--card`, `--on`, `--card-soft`, `--pat-a` y `--pat-b`).
- **Los patrones nunca van debajo del texto.** Viven en su propia franja `.pat-band`, separada por un borde; el texto se apoya siempre en color plano. Catálogo: `.pat-zigzag`, `.pat-escamas`, `.pat-damero`, `.pat-arcos`, `.pat-rayas`, `.pat-cubos`, `.pat-puntos`, `.pat-cruces`. Se dibujan con gradientes CSS, sin imágenes.
- **`.side` es el menú lateral fijo: esa clase no se reutiliza.** Un `<div class="side">` dentro de un componente hereda `position:fixed` y tapa el menú (le pasó al bloque de tesis, hoy `.lado`).
- **Las barras de desplazamiento también van con la marca** (`scrollbar-color` y `::-webkit-scrollbar-*`).
- **Ningún control usa el aspecto por defecto del navegador.** El bloque «CONTROLES CON MARCA» de `css/styles.css` cubre texto, número, fecha, búsqueda, desplegable, casilla, radio y deslizador. Un desplegable va dentro de `.select-wrap`; un buscador, dentro de `.searchbar`. Si aparece un control nuevo, se estiliza antes de usarlo.
- Los bloques con clase `.illus` y el `.avatar` son espacios reservados para ilustraciones y animaciones que el autor agregará después. No borrarlos.
- Mobile primero. Nada debe desbordar horizontalmente; tablas y gráficas anchas van dentro de un contenedor con desplazamiento propio.
- Las animaciones parten de un estado de reposo visible (nunca `opacity: 0` esperando un observador) y respetan `prefers-reduced-motion`.

## Glosario: términos con cajón lateral

Las palabras técnicas abren su ficha en un cajón sin sacar al lector de la página: por la derecha en escritorio, como media hoja desde abajo en móvil (`@media (max-width:720px)`). **No hay página de glosario**: bajo la definición y el ejemplo va siempre el buscador con el índice completo en dos columnas, y se abre desde el botón del menú lateral (`[data-glosario]`) o desde cualquier palabra marcada.

- Las fichas viven en `SEMANAS.GLOSARIO` (`js/glossary.js`): definición, ejemplo con números de 2026, términos relacionados y, si aplica, clave de fuente.
- **El marcado es automático.** `automarcar()` en `js/app.js` recorre el texto de `<main>` y subraya la primera aparición de cada frase de `SEMANAS.TERM_FRASES`, saltando títulos, enlaces, citas, botones y código. Solo hay que marcar a mano (`<span class="term" data-t="clave">`) cuando se quiera una aparición concreta.
- Las frases entre barras (`"/IBC/"`) se comparan respetando mayúsculas: es lo que evita que una sigla corta enganche palabras comunes.
- Un término subrayado en rojo (`.term-huerfano`) señala un `data-t` sin ficha.

## Fuentes en PDF: vista previa con página exacta

Las fuentes en PDF se previsualizan **dentro de la aplicación** (`#pdfview`, inyectado por `js/shell.js`, lógica en `js/app.js`), abiertas en la página que sustenta el dato, con un botón que lleva siempre a la fuente original.

- **El visor carga una copia local**, `pdf/<clave>.pdf`, registrada en `SEMANAS.PDFLOCAL` (`js/data.js`). Así no dependemos de que el servidor original permita el embebido. Al agregar una fuente en PDF: descargarla a `pdf/`, registrarla en `PDFLOCAL` y verificar la página. Si no se puede descargar (p. ej. `abbott`, que su servidor bloquea), se deja sin copia y el visor intenta con la URL remota.
- **Una cita `[n]` no muestra nada al pasar el cursor: se hace clic** y se abre el cajón lateral con la ficha de la referencia (documento, página o artículo del dato, páginas citadas, «Ver el PDF aquí», «Abrir fuente original», «Ver en bibliografía»).

- `SEMANAS.PDFPAGES` en `js/data.js` guarda, por clave de fuente, la página `def` que abre el visor y la lista `pages` de páginas citadas con su descripción.
- Una cita concreta puede apuntar a su propia página con `data-page`: `<a class="cite" data-ref="oecd23" data-page="5"></a>`.
- Una fuente cuenta como PDF si su URL termina en `.pdf` **o** si tiene entrada en `PDFPAGES`. Esto último es lo que rescata a los servidores que entregan el archivo sin extensión (el CARF lo sirve con `?download=true`).
- **Las páginas se verifican extrayendo el texto del PDF**, nunca por el número impreso en la hoja: `#page=N` cuenta páginas físicas. Si una fuente nueva en PDF no se puede descargar, se deja sin entrada en `PDFPAGES` (el visor la abre en la primera página) antes que inventar una referencia.

## Verificación antes de dar por terminado un cambio

```bash
node tests/test_models.js
```

Si se tocó `js/models.js`, revisar que las calibraciones sigan cuadrando con las referencias: esperanza de vida a los 65 (16,0 / 19,3 años poblacional; 18,2 / 21,5 rentistas), población máxima cerca de 2047, agotamiento del Fondo de Ahorro cerca de 2063 (el CARF estima 2062) y el subsidio implícito del régimen de prima media en el orden de Farné y Nieto (2017).

La numeración `[n]` es **global** (el orden de `SEMANAS.SOURCES`), así que una cita significa lo mismo en todas las rutas. Cada página lista al final solo lo que cita; la bibliografía completa está en `fuentes/`.

Si se agregaron citas, confirmar que no quedó ninguna clave sin fuente: cada `data-ref` del HTML debe existir en `SEMANAS.SOURCES`. Si la fuente es un PDF, confirmar también que la página registrada en `SEMANAS.PDFPAGES` (o en `data-page`) es la página física donde está el dato.

## Despliegue

Automático. Cada cambio que llegue a `main` se publica en https://michaellara12.github.io/semanas/ en menos de un minuto. No hay que ejecutar nada.

## Pendientes conocidos

- Integrar las ilustraciones y animaciones del autor en los bloques `.illus` y en el retrato de la sección de crítica.
- Cargar un derecho de petición real (historia laboral) en la calculadora para validarla contra una liquidación oficial.
- Profundizar el análisis histórico a medida que se publiquen nuevos boletines de Colpensiones y del DANE.
