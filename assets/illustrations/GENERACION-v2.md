# Segunda versión: escenas geométricas con transparencia

Se generaron once imágenes nuevas con la herramienta integrada `image_gen`.
El usuario pidió expresamente generar sobre verde de chromakey y eliminarlo
después. Se usó verde uniforme `#00FF00` y se extrajo con Sharp, conservando
el blanco de caras, ropa, libros y otros elementos del dibujo.

La referencia fue `reference-hero.webp`, la infografía presente en el historial
de `main` antes del commit `56a6f5c` (recurso completo en `7f80811`). No se
encontró un PRD separado en ese árbol. Se recuperaron sus diagonales, tramas,
arcos, líneas finas y formas escalonadas, con la paleta actual de SEMANAS.

## Archivos finales

Todos están en `assets/illustrations/` y tienen canal alfa real:

| Archivo | Uso |
| --- | --- |
| `hero-v2.webp` | Chica con libro y bandera en el inicio |
| `proteccion-v2.webp` | Protección de ingresos a lo largo de la vida |
| `cobertura.webp` | Personas con distintas situaciones de trabajo y residencia |
| `pilar-solidario.webp` | Apoyo a una persona mayor |
| `pilar-semi.webp` | Aportes que se convierten en un ingreso continuado |
| `pilar-contributivo.webp` | Dos componentes que se reúnen |
| `pilar-voluntario.webp` | Ahorro adicional elegido por la persona |
| `aportes.webp` | Un aporte con dos destinos |
| `prestaciones.webp` | Edad, semanas y monto como preguntas distintas |
| `transicion.webp` | Conservar reglas y cambiar de régimen |
| `lectura-v2.webp` | Lectora con lupa sobre el fondo de la sección |

Los prompts completos y las rutas de los originales seleccionados están en
[`generacion-v2.json`](generacion-v2.json). Los originales verdes permanecen
en el directorio de imágenes generadas de Codex; la página solo utiliza los
WebP finales. Se descartaron variantes que no cumplían el fondo verde.

## Extracción y verificación

`scripts/key-illustrations.cjs` lee ese manifiesto. Elimina el verde dominante,
suaviza su mezcla en bordes, recorta el margen vacío y coloca cada escena en
un lienzo cuadrado transparente. Exporta WebP con alfa de calidad máxima.
La referencia visual evita verde dentro de los personajes para no perder
detalles al extraer el fondo. Las escenas son conceptuales: las monedas no
representan proporciones o cifras legales.

Resultado: unos **1.106 KiB entre las once imágenes**. Solo el hero carga con
prioridad; las otras diez usan carga diferida. No se incrustan fondos blancos
en CSS. Algunas ilustraciones sobresalen del borde superior de los bloques,
con espacio reservado para que no se recorten ni cubran el texto.

Se revisaron sobre blanco, gris y colores de tarjeta. La prueba
`node tests/test_illustrations.cjs` comprueba alfa, esquinas transparentes y
ausencia de grandes superficies verdes. Tolera mezclas aisladas de color
causadas por el redimensionado y la compresión.
