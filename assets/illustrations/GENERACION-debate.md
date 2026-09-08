# Ilustraciones del debate · 8 de septiembre de 2026

Cuatro escenas nuevas, generadas con la herramienta integrada `image_gen` y
basadas en el estilo de `math-split.webp`: geometría expresiva, tinta negra,
magenta, cian, violeta y amarillo. Los personajes representan situaciones;
no son retratos de Sanabria ni de funcionarios.

| Archivo | Qué representa |
|---|---|
| `debate-renta.webp` | Ahorro completo frente a pagos mensuales. |
| `debate-eleccion.webp` | La elección del destino de los aportes. |
| `debate-futuro.webp` | La financiación entre generaciones. |
| `debate-control.webp` | Revisión de las reglas y deliberación. |

Prompts completos y procedencia en [generacion-debate.json](generacion-debate.json).
Se siguió el procedimiento solicitado: fondo verde de chromakey, eliminación
con Sharp y salida WebP de 700 × 700 con alfa. Las cuatro suman unos 365 KiB.

```powershell
node scripts/key-illustrations.cjs assets/illustrations/generacion-debate.json tmp/reforma/debate-contact.png
```

Se reutilizan `cobertura.webp`, `math-fund.webp` y `math-pension.webp` para los
otros tres temas. Las imágenes crecen al abrir el detalle y mantienen la
composición completa. Las cantidades y fórmulas permanecen como HTML editable.
