---
name: interfaz-semanas
description: Reglas de interfaz del observatorio SEMANAS. Úsala siempre que vayas a escribir o modificar HTML o CSS de este sitio, y en particular al agregar cualquier control de formulario (buscador, desplegable, selector de fecha, casilla, radio, deslizador), un menú, una ventana emergente, un cajón lateral, una tarjeta o un patrón de fondo.
---

# Interfaz de SEMANAS

Reglas obligatorias de la capa visual. No son sugerencias: si un componente
nuevo no las cumple, no entra.

## 1. Ningún control con el aspecto por defecto del navegador

El autor del sitio ha sido explícito: los controles nativos son feos y no se
usan. **Todo** control lleva `appearance:none` y el lenguaje de la casa —borde
negro de 1,5 px, radio grande, sombra dura `2px 2px 0`, foco magenta.

Ya están resueltos en `css/styles.css` (bloque «CONTROLES CON MARCA»):

| Control | Cómo se usa |
|---|---|
| Texto, número, correo, fecha | `<input type="...">` a secas: el estilo es global. |
| Buscador | `<span class="searchbar"><input type="search"></span>` — la lupa la pone el CSS. |
| Desplegable | `<span class="select-wrap"><select>…</select></span>` — la flecha la pone el CSS; nunca la del sistema. |
| Casilla y radio | `<input type="checkbox">` / `<input type="radio">`: se dibujan con la marca propia. |
| Deslizador | `<input type="range">`: pista con borde y pulsador amarillo. |
| Fecha | `<input type="date">`: el icono del calendario va en amarillo con borde. |

Si aparece un control que el bloque no cubre —selector de color, un calendario
propio, un menú contextual, una ventana emergente— **hay que estilizarlo antes
de usarlo** y añadirlo a ese bloque del CSS y a esta tabla. Nunca se deja el
aspecto nativo «por ahora».

Lo mismo aplica a lo emergente: el sitio no usa `alert()`, `confirm()` ni
`window.prompt()`. Las ventanas se hacen con `.modal`, las fichas flotantes con
`.pop` y los paneles laterales con el patrón de `.gloss`.

## 2. Los patrones nunca van debajo del texto

Es la regla que más se rompe y la que el autor pidió expresamente.

- Un patrón vive en su propia franja, `.pat-band`, separada del contenido por
  un borde. El texto siempre se apoya en **color plano**.
- Nada de `opacity` baja para «poder leer encima»: si hace falta bajarle la
  opacidad a un patrón para que se lea el texto, el patrón está en el lugar
  equivocado.
- Los patrones se dibujan con gradientes CSS (adaptados de css-pattern.com) y
  usan `--pat-a` / `--pat-b`, los dos tonos que define la clase de color de la
  ruta. Nunca imágenes.
- Catálogo actual: `.pat-zigzag`, `.pat-escamas`, `.pat-damero`, `.pat-arcos`,
  `.pat-rayas`, `.pat-cubos`, `.pat-puntos`, `.pat-cruces`.

## 3. Nombres de clase reservados

`.side` es **el menú lateral fijo** (`position:fixed`). Nunca use esa clase para
otra cosa: un `<div class="side">` dentro de un componente hereda el posicionado
del menú y se planta encima de él. Pasó con el bloque de tesis de la sección de
críticas, que usaba `.side a` / `.side b` y secuestraba el menú al llegar a esa
parte de la página; ahora se llama `.lado`.

Igual de reservadas: `.gloss` (cajón del glosario), `.drawer` (cajón móvil),
`.pdfview`, `.modal`, `.topbar` y `.pop`.

## 4. Geometría cuadrada

Nada lleva esquinas redondeadas. Los radios viven en `--r-xs`, `--r-sm`, `--r`,
`--r-lg`, `--r-xl` y `--pill`, y **todos valen `0`**: los componentes siguen
usando el token, así que no hay que tocarlos uno por uno. Un `border-radius`
escrito a mano en un componente nuevo es un error; use el token.

Siguen redondos, y solo ellos: el punto de la marca, las viñetas de la línea de
tiempo y de las listas con tilde, el pulsador del deslizador y el `input[type=radio]`
—cuadrarlo lo volvería indistinguible de una casilla—.

## 5. Color

- Todo color sale de las variables de `css/styles.css`. Ningún valor suelto en
  un componente.
- Las clases `.c-magenta`, `.c-cyan`, `.c-violet`, `.c-peri`, `.c-yellow`,
  `.c-green`, `.c-orange`, `.c-wine` definen `--card` (fondo), `--on` (tinta
  legible encima) y `--card-soft` (tinte suave). Úsalas en vez de escoger
  pareja de colores a mano: `--on` ya está calculada para contrastar.

## 6. Bloques, no tarjetas

El lenguaje es el de Aardvark Book Club: bloques de color plano, no una rejilla
de tarjetas iguales. Alterna `.figure`, `.panel`, `.block`, `.listblock`,
`.rows`, `.tiles`, `.stat-strip`, `.band`, `.callout`, `.steps`. `.card` es
para uso puntual.

**Cada bloque tiene su marcado exacto; copiarlo mal lo deja crudo.** El que más
se equivoca es `.rows`, que va así —fíjese en `.r` y en `.v`, no `.row` ni un
`<div>` pelado—:

```html
<div class="rows">
  <div class="r"><div class="k">Etiqueta</div><div class="v">Contenido</div></div>
</div>
```

`.row` sí existe, pero es de `.compare` y no es intercambiable. Antes de usar un
bloque, busque su selector en `css/styles.css` y copie la estructura que espera.

## 7. Menú, glosario y barras de desplazamiento

- El menú lateral usa **el mismo lenguaje de celdas que la rejilla de «artículo
  por artículo»**: un fondo negro que asoma 1,5 px entre celdas, sin marco
  propio, sin radios y sin sombra. Las celdas van **a sangre**, de borde a borde
  del menú: nada de una cajita con su propia barra de desplazamiento dentro de
  otra. Quien se desplaza es `.side` entero, y su barra va oculta.
- **La ruta abierta y sus partes son una sola celda**, no varias: van dentro de
  un `.grupo` con el tinte del color de la ruta (`--card-soft`) y sin líneas
  negras entre ellas. Las partes cuelgan de una línea de árbol (vertical con
  ramas cortas) que deja claro que son hijas; la que se está leyendo se pone
  en negrita, con su rama más gruesa y oscura: **sin fondo blanco**, para no
  romper el bloque de color.
- La vertical del árbol la dibuja cada fila (`::after`), y en la última se corta
  a la altura de su rama: el árbol cierra en «L» en vez de seguir hacia abajo.
- El menú lateral lleva el menú y, pegado abajo con `position:sticky`, el botón
  amarillo del glosario. Nada más: el pie con la fecha de corte se retiró.
- El menú muestra su barra de desplazamiento, con marca y algo más ancha que
  las demás: es la única señal de que hay más secciones abajo.
- El cajón del glosario muestra definición, «Lo importante» (2–3 puntos de
  contexto) y ejemplo, y **siempre debajo** el buscador con el índice completo en
  dos columnas (una en móvil). Dentro de la ficha, las demás palabras del
  glosario se enlazan solas (`automarcar` sobre `.gloss-ficha`). No hay «ver
  también» ni página propia.
- Un término en el texto va **solo subrayado** (punteado violeta), sin icono
  ni signo. El autor probó el cuadrito delante y el «?» detrás y rechazó ambos.
- **Toda raya lateral es ondulada.** `.listblock`, `.callout`, `.note`,
  `.warnbox`, `.gloss-ej`, `.gloss-puntos` y `.cita-loc` apagan su `border-left`
  y dibujan la onda con un `::before` enmascarado por un SVG (bloque «RAYAS
  ONDULADAS»). El color va en `--raya`. Un componente nuevo con raya lateral se
  suma a esa lista; no se le pone un `border-left` recto.
- **Artículo por artículo es la cuadrícula de tarjetas de siempre**, paginada de
  diez en diez. Al hacer clic, el detalle se abre en la ventana (`.modal`) con
  dos columnas: «En palabras sencillas» (interpretación para quien no maneja
  lenguaje jurídico) y «Texto exacto del artículo» (transcripción de Función
  Pública en `js/ley-texto.js`). El buscador también busca en el texto oficial.
- **Las citas no muestran nada al pasar el cursor.** Se hace clic en `[n]` y se
  abre el mismo cajón (`SEMANAS.abrirCita`) con la ficha: qué documento es, en
  qué página o artículo está el dato, la lista de páginas citadas, «Ver el PDF
  aquí» y «Abrir fuente original». El flotante `.pop` ya no existe.
- **Los PDF se sirven desde `pdf/<clave>.pdf`**, copia local registrada en
  `SEMANAS.PDFLOCAL` (`js/data.js`). El visor carga la copia; el enlace a la
  fuente original se queda siempre a la vista. Si una fuente nueva es PDF, se
  descarga a `pdf/` y se agrega a `PDFLOCAL`; si el servidor no la deja bajar,
  se deja sin copia y el visor intenta con la URL remota.
- Las barras de desplazamiento van con la marca (`scrollbar-color` y
  `::-webkit-scrollbar-*`): pista clara, pulgar negro que se pone magenta al
  pasar por encima. Ningún contenedor con desplazamiento se deja sin estilo, y
  el menú lateral esconde la suya para no partir las celdas.

## 8. Navegación

- `js/routes.js` es la única fuente de verdad. El menú, la rejilla de la
  portada y el pie anterior/siguiente se generan de ahí; no se escriben a mano.
- El glosario **no tiene página propia**: vive en el cajón lateral y se abre
  desde el botón del menú (`[data-glosario]`) o desde cualquier palabra
  marcada. Cualquier enlace nuevo al glosario usa `data-glosario`, no una URL.
- Nada de resaltado por desplazamiento que mueva el menú solo. Se pueden
  cambiar clases con el scroll, pero jamás llamar `scrollIntoView` desde un
  oyente de scroll: eso dejaba el menú congelado al final de la página.

## 9. Móvil y accesibilidad

- Móvil primero. Nada desborda en horizontal; lo ancho va en un contenedor con
  desplazamiento propio.
- Los paneles laterales entran por la derecha en escritorio y como media hoja
  desde abajo en móvil (ver `.gloss` bajo `@media (max-width:720px)`).
- Foco visible siempre, con el mismo aro magenta.
- Las animaciones parten de un estado de reposo visible y respetan
  `prefers-reduced-motion`.
