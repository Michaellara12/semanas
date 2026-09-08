# Cinco cuentas ilustradas

Generadas el 8 de septiembre de 2026 con la herramienta integrada `image_gen`.
Referencia de estilo: `aportes.webp`, de la serie aprobada por el usuario.
Los cinco prompts completos y las rutas originales se conservan en
[generacion-math.json](generacion-math.json).

| Archivo | Escena |
|---|---|
| `math-split.webp` | Un ingreso se separa en dos destinos. |
| `math-contribution.webp` | Empleada y empleador reúnen sus aportes. |
| `math-share.webp` | Tres personas, tres cantidades diferentes. |
| `math-pension.webp` | Semanas acumuladas y una mesada mensual. |
| `math-fund.webp` | Entradas, ahorro y pagos. |

Cada archivo final mide 700 × 700, conserva transparencia real y se carga de
forma diferida. Total aproximado: 487 KiB. Por pedido del usuario, se generaron
sobre verde de chromakey y se eliminó ese fondo con Sharp:

```powershell
node scripts/key-illustrations.cjs assets/illustrations/generacion-math.json tmp/reforma/math-contact.png
```

Las escenas no contienen fórmulas ni etiquetas impresas. La infografía que las
acompaña es HTML adaptable: horizontal en escritorio y vertical en móvil. Sus
cantidades cambian con cada control y siguen siendo legibles y accesibles.

Las fórmulas y sus supuestos se documentan en `js/math-explainers.js`. Las
referencias legales remiten a los artículos 19–23 y 32–33; la comparación de
dinero y personas y el ejercicio del fondo remiten al CARF, páginas 12 y 19.
Los valores de los ejercicios son ejemplos, no estimaciones nacionales nuevas.
