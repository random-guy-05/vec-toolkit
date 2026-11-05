# Taller Task 2: razonar sobre espacio y tiempo

**75 minutos · 4–20 personas · sin código ni datos del Challenge**

Para participantes con nociones básicas de célula única que empiezan a trabajar con predicción espacial-temporal 3D. La sesión enseña a leer el contrato de la tarea y los límites de la evidencia; no propone un método ganador. Traducción asistida, abierta a correcciones nativas.

## Preparación y agenda

Revisa las páginas oficiales de [tareas](https://virtualembryo.ai/challenge/tasks), [datos](https://virtualembryo.ai/challenge/data) y [evaluación](https://virtualembryo.ai/challenge/evaluation). Confirma los splits actuales. Todos los escenarios son ficticios; no se comparten predicciones ni datos privados.

| Minutos | Actividad |
|---:|---|
| 0–8 | ¿Qué debe contener la predicción? |
| 8–20 | Mapear el split: ¿interpolación o extrapolación? |
| 20–38 | Corregir el supuesto de que todos los tableros extrapolan. |
| 38–52 | Comparar evidencia molecular, celular y espacial. |
| 52–65 | Revisar qué significan las coordenadas entre etapas. |
| 65–75 | Escribir una afirmación respaldada y una que no lo está. |

## Ejercicios y respuestas

**1. Dos contextos.** Un equipo ficticio supone que toda evaluación T2 predice más allá de la última etapa de entrenamiento. Comprueben el split oficial. **Respuesta:** la configuración de embrión completo evalúa interpolación; la del corazón incluye una pregunta de interpolación y otra de extrapolación. Hay que revisar las etapas exactas en la página actual.

**2. Cuatro dimensiones.** El Modelo A predice cambios de expresión razonables pero una nube uniforme. El Modelo B tiene forma y vecindades plausibles, pero cambios de expresión débiles. **Respuesta:** T2 asigna un 25% a cambios de expresión, distribución de estados celulares, forma/escala del tejido y organización espacial local. Una dimensión no demuestra las demás. Un pseudo-split local no predice el resultado oculto.

**3. Marcos locales.** Dos etapas tienen una célula con el mismo `(x,y,z)`. ¿Es la misma célula? **Respuesta:** no se puede concluir eso. La página oficial indica que `spatial_3D` usa un marco local por embrión y no está registrado entre etapas.

## Hoja de trabajo

Anota: (a) etapas visibles y objetivo del tablero elegido, con enlace oficial; (b) cuál de las cuatro dimensiones mide tu evidencia; (c) qué haría falta para afirmar correspondencia entre coordenadas de distintas etapas; y (d) una limitación. No conviertas los ejemplos ficticios en resultados reales.
