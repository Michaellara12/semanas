# Revisión de Jerome y las críticas

La sección `reforma/#critica` sustituye la cronología, el perfil extenso, las
tesis repetidas y la tabla de propuestas por siete debates cerrados inicialmente.
Cada uno separa crítica, respuesta documentada, valoración editorial y solución
propuesta. El texto distingue las etapas del proyecto y las respuestas de 2023,
2024, 2025 y 2026; no las presenta como réplicas contemporáneas equivalentes.

## Fuentes y límites de la revisión

- Columnas originales: Sanabria, 29-10-2024, 27-08-2025, 15-01-2026 y 21-05-2026.
- ANIF: análisis originales del 25-04-2024 y 19-06-2024.
- CARF: PDF local, página física 16 (transferencias y costo de guardar ahorro
  por generaciones). No se trata el escenario del tercer debate como una fecha
  segura de colapso de la ley final.
- OIT: PDF local, página física 19 (prestación periódica reducida y reservas).
- Ley 2381: artículos 11, 17–19, 24, 27, 75–76 y 92, contrastados con la copia
  local y el análisis ya registrado en la plataforma.
- Consejo de Estado y Gobierno: comunicaciones del 11-05-2026 sobre el Decreto
  415. Se documenta la suspensión cautelar como un hito, sin afirmar nulidad
  definitiva ni presumir que se revisaron todas las actuaciones posteriores.
- Auto 841/25: providencia oficial. Comunicación de la Cámara de agosto de 2026:
  se mantiene el límite de no contar con cotejo íntegro de C-264/26.
- Varias páginas oficiales tienen acceso intermitente. Los pasajes de VIDA 29,
  alocución presidencial y comunicado de Colpensiones se corroboraron en el
  índice público. La descarga de PDFs de Presidencia devolvió HTML de bloqueo;
  no se guardaron como PDF. Las fichas indican ese límite y conservan el enlace
  original. Del Decreto 1485 solo se usa el objeto corroborado, no se simula una
  auditoría íntegra ni un precio universal.

Las nuevas fichas están en `SEMANAS.LEGAL_SOURCES` y las fuentes se añadieron
al final del catálogo para conservar su numeración. El glosario diferencia
explícitamente sobrevivientes en una pensión y la renta semicontributiva.

## Verificación

```powershell
python build.py
node tests/test_debate_ui.cjs
node tests/test_illustrations.cjs
node tests/test_ley.js
node tests/test_math_ui.cjs
node tests/test_reforma_ui.cjs
```

Los tests de navegador requieren Playwright, Edge y servidor en 8765. Cubren los
siete desplegables, todas las citas del detalle, teclado, conceptos, enlace al
artículo 18, cambios de ambas variables, valor inválido, cuatro anchos de pantalla
y versión autocontenida. Las capturas quedan en `tmp/reforma/debate-*.png`.

La cuenta pago único / mensualidad es un ejemplo aritmético de acumulación
nominal. No calcula una renta legal ni compara valores presentes; lo dice junto
al resultado y no recomienda una opción a partir de esa división.
