# Verificación de la página de la Ley 2381

## Integridad y modelos

Desde la raíz del repositorio:

```sh
node tests/test_ley.js
node tests/test_models.js
python build.py
```

`test_ley.js` comprueba los 95 análisis y textos, claves bibliográficas,
relaciones entre artículos, imágenes existentes y mapa de páginas del PDF.
Contiene regresiones para los errores de los artículos 10, 82 y 93.
Estas comprobaciones detectan pérdidas de contenido y referencias rotas;
no sustituyen la revisión jurídica de una interpretación.

## Interacción en navegador

Requiere Playwright disponible en Node y Microsoft Edge instalado.
Se puede elegir otro canal con `PLAYWRIGHT_CHANNEL`.

```sh
python -m http.server 8765 --bind 127.0.0.1
# En otra terminal:
node tests/test_reforma_ui.cjs
```

`TEST_BASE_URL` permite cambiar la dirección. En el entorno de Codex se utilizó
el Playwright del runtime incluido, mediante `NODE_PATH`.
Ejecutar antes `python build.py`: la prueba incluye el archivo único.

La prueba recorre 95 artículos × 4 pestañas, búsqueda y filtros, navegación
con flechas/Home/End, ciclo de foco, fuentes superpuestas, Escape por capa,
retorno del foco y PDF en las páginas de los artículos 1 y 93. Comprueba anchos
de 320, 390, 768 y 1440 píxeles y ausencia de errores JavaScript.
Las capturas se guardan en `tmp/reforma/`, excluido del control de versiones.

Resultado del 7 de septiembre de 2026: pruebas de integridad, modelos,
interacción y archivo único completadas. Se revisaron visualmente hero,
ilustraciones, lector de artículos y fuentes en móvil y escritorio.

## Alcance de la revisión de fuentes

- Base: transcripción de Función Pública de la Ley 2381 y copia de SUIN
  conservada por OIT/NATLEX (`pdf/ley2381pdf.pdf`, 50 páginas).
- Se localizó el encabezado de cada artículo en el PDF. El artículo 93,
  que faltaba como entrada separada, se cotejó visualmente en la página 49.
- El método se apoya en los artículos 25–32 del Código Civil, la Constitución
  y C-054/16. Se distingue interpretación editorial de criterio vinculante.
- C-1037/03 y C-197/23 se usan como antecedentes con límites expresos;
  las remisiones a otras leyes se documentan por fuente y artículo.
- El Auto 841/25 documenta la actuación de 2025. La comunicación de la
  Cámara del 26 de agosto de 2026 corrobora el anuncio general sobre C-264/26.
  No se obtuvo la parte resolutiva íntegra de esta última. Los estados
  individuales del catálogo anterior se mantienen como **reportados**,
  pendientes de cotejo; no certifican la aplicación actual de un artículo.
- El acceso a la providencia contenciosa relacionada con el artículo 86
  fue intermitente. Su ficha no extiende el resultado a otros casos.

Las URLs, ubicación, uso y límites de cada referencia se mantienen en
`SEMANAS.SOURCES` y `SEMANAS.LEGAL_SOURCES` de `js/data.js` y son visibles
en el lector. Los ejemplos son hipotéticos.

## Revisión de lenguaje, ilustraciones y comparación

- Se verifican 95 primeras explicaciones sencillas sin quitar las pestañas
  jurídicas ni modificar las transcripciones.
- La prueba de navegador comprueba enlaces de artículos, retorno del foco,
  rangos y exclusión de referencias a la Constitución y a la Ley 100.
- Comprueba pares de comparación alineados en escritorio y alternados en
  móvil, contenido de pasos a todo el ancho e imagen de lectura sin fondo CSS.
- `node tests/test_illustrations.cjs` requiere Sharp y verifica las once
  ilustraciones con transparencia real.
- Se revisaron además 1.024 y 1.280 píxeles; los títulos largos se mantienen
  completos. MathJax representa las dos fórmulas del comparador.
