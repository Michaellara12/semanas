# SEMANAS · Observatorio del Sistema Pensional Colombiano

Sitio web estático de análisis técnico e interactivo sobre el sistema pensional de Colombia y la Ley 2381 de 2024. Se publica solo en GitHub Pages desde la rama `main`, carpeta raíz. **No hay compilación**: lo que está en el repositorio es exactamente lo que se sirve. Un cambio en `index.html`, `css/` o `js/` aparece en el sitio en menos de un minuto tras el merge.

## Estado del proyecto (actualizar si cambia)

- **Estado jurídico:** la Sentencia C-264 de 2026 (25 de agosto, M.P. Paola Andrea Meneses Mosquera) declaró exequible la mayor parte de la Ley 2381 solo por vicios de procedimiento, devolvió a la Cámara los artículos 14, 36 y 93 más apartes de 11, 19, 23, 63, 84 y 92, y fijó la **vigencia el 1 de abril de 2027**. Más de 100 demandas de fondo siguen suspendidas hasta esa fecha.
- **Corte de información:** 5 de septiembre de 2026. Si se agregan datos posteriores, actualizar también esta línea y el pie del menú lateral en `index.html`.
- **Es un borrador en evolución** (rough sketch): se espera seguir agregando secciones, ilustraciones y análisis.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Todo el contenido editorial y la estructura de las 15 secciones. |
| `css/styles.css` | Identidad visual completa en variables CSS. |
| `js/data.js` | Fuentes numeradas, series de datos, línea de tiempo, los 95 artículos de la ley, columnas y tesis de Jerome Sanabria. |
| `js/models.js` | Motores de cálculo: actuarial, demográfico, Monte Carlo, fiscal y de subsidios. |
| `js/charts.js` | Librería propia de gráficas SVG (línea, barras, doble eje, dona, pirámide, histograma, mapa de calor, tornado). |
| `js/app.js` | Interfaz: menú, citas con vista previa, calculadora, simuladores, explorador de artículos. |
| `tests/test_models.js` | Casos de calibración. Correr con `node tests/test_models.js`. |
| `build.py` | Genera `dist/` (archivo único y variante para publicar como Artifact). Opcional; el sitio no lo necesita. |
| `vendor/tex-svg.js` | MathJax local para que las fórmulas funcionen sin internet. |

## Reglas de contenido (importantes)

1. **Toda cifra lleva fuente.** Se agrega la fuente a `SEMANAS.SOURCES` en `js/data.js` con una clave corta, y se cita en el HTML con `<a class="cite" data-ref="clave"></a>`. La numeración `[n]` y la bibliografía se generan solas; nunca escribir números de referencia a mano.
2. **Tres niveles que no se mezclan:** hechos (texto legal y cifras oficiales), estimaciones (modelos, siempre con supuestos explícitos y comparación contra un estudio publicado) y opiniones (posiciones de actores). Nunca presentar una estimación como dato oficial.
3. **Jerarquía de fuentes:** normas y sentencias primero; luego entidades con mandato estadístico o fiscal (DANE, Colpensiones, Superfinanciera, MinHacienda, CARF, Banco de la República, OIT, OCDE, CEPAL); luego gremios y centros de pensamiento; la prensa solo para reseñar documentos primarios o declaraciones.
4. **Series históricas:** no interpolar años sin dato oficial publicado. Dejar el hueco.
5. **Idioma:** español de Colombia. Separador decimal coma, miles punto. Pesos constantes de 2026 salvo que se diga lo contrario.

## Reglas de diseño

La identidad visual toma como referencia el lenguaje gráfico de Innfiltrados: fondo blanco cálido, tipografía Archivo en pesos altos con interletrado negativo, menú lateral fijo numerado, botones píldora, bordes de 0,8 px, color plano. Paleta: blanco, morado (`--purple`), amarillo (`--yellow`) y azul (`--blue`) como acento de datos.

- Todos los colores y tipografías viven en variables CSS al inicio de `css/styles.css`. Cambiar allí, nunca con valores sueltos en los componentes.
- Las gráficas leen la paleta desde esas variables (`--c1` a `--c8`), así que un cambio de tema se propaga solo.
- Los bloques con clase `.illus` y el `.avatar` son espacios reservados para ilustraciones y animaciones que el autor agregará después. No borrarlos.
- Mobile primero. Nada debe desbordar horizontalmente; tablas y gráficas anchas van dentro de un contenedor con desplazamiento propio.
- Las animaciones parten de un estado de reposo visible (nunca `opacity: 0` esperando un observador) y respetan `prefers-reduced-motion`.

## Verificación antes de dar por terminado un cambio

```bash
node tests/test_models.js
```

Si se tocó `js/models.js`, revisar que las calibraciones sigan cuadrando con las referencias: esperanza de vida a los 65 (16,0 / 19,3 años poblacional; 18,2 / 21,5 rentistas), población máxima cerca de 2047, agotamiento del Fondo de Ahorro cerca de 2063 (el CARF estima 2062) y el subsidio implícito del régimen de prima media en el orden de Farné y Nieto (2017).

Si se agregaron citas, confirmar que no quedó ninguna clave sin fuente: cada `data-ref` del HTML debe existir en `SEMANAS.SOURCES`.

## Despliegue

Automático. Cada cambio que llegue a `main` se publica en https://michaellara12.github.io/semanas/ en menos de un minuto. No hay que ejecutar nada.

## Pendientes conocidos

- Integrar las ilustraciones y animaciones del autor en los bloques `.illus` y en el retrato de la sección de crítica.
- Cargar un derecho de petición real (historia laboral) en la calculadora para validarla contra una liquidación oficial.
- Profundizar el análisis histórico a medida que se publiquen nuevos boletines de Colpensiones y del DANE.
