# SEMANAS · Observatorio del Sistema Pensional Colombiano

Plataforma web interactiva de análisis técnico sobre el sistema pensional colombiano y la Ley 2381 de 2024: series históricas, la ley artículo por artículo, calculadora antes/después de la reforma, modelos actuariales y demográficos auditables, medición de los subsidios implícitos, la crítica de Jerome Sanabria contrastada con fuentes primarias, y un capítulo sobre automatización e inteligencia artificial.

**Sitio publicado:** https://michaellara12.github.io/semanas/

Sin dependencias de ejecución, sin compilación y sin servidor. Lo que está en el repositorio es exactamente lo que se publica.

## Editar desde el celular

1. Abrir **claude.ai/code** en el navegador del celular o en la app de Claude.
2. Escoger el repositorio `semanas`.
3. Pedir el cambio en lenguaje natural, por voz o texto. Por ejemplo: *«actualiza las cifras de Colpensiones con el boletín de julio»* o *«agrega una gráfica de traslados por año»*.
4. El agente trabaja en la nube, deja los cambios en una rama y abre un pull request.
5. Al aprobar el pull request desde el celular, GitHub Pages republica el sitio en menos de un minuto.

El archivo `CLAUDE.md` en la raíz le da al agente el contexto del proyecto: reglas de citación, jerarquía de fuentes, identidad visual y cómo verificar los modelos. Conviene mantenerlo actualizado.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Las 15 secciones y todo el contenido editorial. |
| `css/styles.css` | Identidad visual: paleta blanco, morado, amarillo y azul, tipografía Archivo, menú lateral. Todo en variables CSS. |
| `js/data.js` | Fuentes numeradas, series de datos con su origen, línea de tiempo, los 95 artículos de la ley con su estado tras la Sentencia C-264 de 2026, columnas y tesis de Jerome Sanabria. |
| `js/models.js` | Motor actuarial (Gompertz–Makeham calibrada, rentas vitalicias individuales y conjuntas, Ley 100 y Ley 2381, semicontributivo, transición, historia laboral e IBL), Monte Carlo, proyección demográfica por componentes, modelo del Fondo de Ahorro calibrado al CARF, subsidios implícitos y tasa interna de retorno. |
| `js/charts.js` | Librería propia de gráficas SVG: línea, barras, doble eje, dona, pirámide, histograma, mapa de calor y tornado. |
| `js/app.js` | Interfaz: menú lateral, citas con vista previa, calculadora, simuladores, explorador de artículos. |
| `tests/test_models.js` | Casos de calibración. |
| `build.py` | Genera `dist/` con un archivo único y la variante para publicar como Artifact. Opcional. |
| `vendor/tex-svg.js` | MathJax local para que las fórmulas funcionen sin conexión. |

## Uso local

Abrir `index.html` directamente en el navegador, o servir la carpeta:

```bash
python -m http.server 8765
```

Verificar los modelos:

```bash
node tests/test_models.js
```

Generar el archivo único para compartir:

```bash
python build.py
```

## Cargar una historia laboral

En la calculadora, desplegar «Pegar historia laboral» e ingresar una línea por período con el formato `AAAA-MM-DD, AAAA-MM-DD, IBC`. Se calculan las semanas y el ingreso base de liquidación indexado con el índice de precios del DANE. Los datos no salen del navegador.

## Estado

Corte de información: 5 de septiembre de 2026. La Ley 2381 entra en vigencia el 1 de abril de 2027 según la Sentencia C-264 de 2026. Proyecto en evolución.
