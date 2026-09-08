# Historia ilustrada

Rediseño del 8 de septiembre de 2026: seis etapas visibles, archivo completo desplegable y siete nuevas ilustraciones. Se conservan los anclajes de navegación. Se alternan portada editorial, entradas por fecha, flujo, comparación, cifras, gráfico de cobertura y archivo.

Inspiración investigada: [Defining Moments, National Museum of Australia](https://www.nma.gov.au/defining-moments/explore-defining-moments), que separa hitos con imágenes y lecturas adicionales de la cronología completa; [su cronología](https://www.nma.gov.au/defining-moments/defining-moments-timeline). Se adopta esa separación de niveles de lectura, sin reutilizar fotografías ni copiar su identidad.

Contenido: fuentes primarias Ley 6 (arts. 17–19), Ley 90 (arts. 1 y 8), Decreto 3041 (Acuerdo 224), Constitución, Ley 100 y reformas. La cobertura conserva población, año y página exactos del DANE. Se eliminan afirmaciones causales no sustentadas y la falsa exigencia de cotización continua. La cronología distingue la decisión reportada en 2026 de la fecha futura de 2027.

Imágenes generadas con la herramienta integrada image_gen; prompts y archivos finales en `assets/illustrations/generacion-historia.json`. Fondo chromakey retirado con `scripts/key-illustrations.cjs`, según la preferencia del usuario. Texto, cifras y citas permanecen en HTML accesible.

Verificación: `tests/test_history_ui.cjs` comprueba imágenes, referencias, filtros, apertura con teclado, ausencia de desbordamientos en cuatro anchuras y versión autocontenida. Capturas de revisión en `tmp/historia/`. `tests/test_illustrations.cjs` verifica alfa y ausencia de superficies verdes residuales.
