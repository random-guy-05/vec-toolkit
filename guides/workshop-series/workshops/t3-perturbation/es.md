# Taller Task 3: predecir la respuesta a una perturbación

**75 minutos · 4–20 personas · sin código ni datos del Challenge**

Para participantes que quieren entender la predicción de perturbaciones condicionales. La idea central es separar el efecto de la perturbación del fondo de tipo silvestre (WT). No se propone un mecanismo biológico. Traducción inicial asistida, abierta a correcciones nativas.

## Preparación y agenda

Abre las páginas oficiales de [tareas](https://virtualembryo.ai/challenge/tasks), [datos](https://virtualembryo.ai/challenge/data) y [reglas](https://virtualembryo.ai/challenge/rules). Verifica el split actual. Usa solo números y nombres genéricos ficticios; no se usan medidas de objetivos ocultos.

| Minutos | Actividad |
|---:|---|
| 0–8 | Definir qué debe cambiar en la predicción. |
| 8–20 | Identificar entrenamiento, validación y test. |
| 20–38 | Comparar cada perturbación con su WT emparejado. |
| 38–52 | Relacionar fallos con métricas de respuesta. |
| 52–65 | Examinar una propuesta ficticia de datos externos. |
| 65–75 | Escribir una afirmación respaldada y su límite. |

## Ejercicio 1 — Fondo y respuesta

Valores normalizados e inventados para una característica genérica: WT = 10,0; Modelo A bajo perturbación = 10,1; Modelo B = 7,0. ¿Qué modelo predice un cambio mayor respecto al WT?

**Respuesta:** A predice un cambio casi nulo; B predice una disminución mayor. El ejemplo no dice qué dirección sería biológicamente correcta. La evaluación se centra en la respuesta respecto a WT; copiar el fondo WT no basta.

## Ejercicio 2 — Cuatro métricas

Relaciona los fallos: (a) cambian los genes correctos en dirección opuesta; (b) dirección correcta, magnitud demasiado pequeña; (c) cambian genes equivocados; (d) se desploman las proporciones celulares. **Respuesta:** dirección de respuesta, magnitud, recuperación de genes de respuesta y distribución de estados celulares, respectivamente. Cada métrica aporta evidencia distinta.

## Ejercicio 3 — Elegibilidad de datos

Un colega propone datos públicos de una etapa similar con una alteración de un gen relacionado. Antes de usarla, comprueba la fuente y versión, alelo/genotipo, etapa, licencia, relación con la tarea, reglas actuales y divulgación. Una alteración relacionada o un fenocopiado pueden entrar en una condición protegida. Si no se puede resolver la elegibilidad, pausa y consulta a los organizadores.

## Hoja de trabajo

1. En la página oficial identifica la perturbación de entrenamiento, el objetivo de validación y el objetivo de test oculto.
2. Calcula `perturbación − WT` en el ejemplo. ¿Qué reveló la diferencia?
3. Relaciona cada fallo con una métrica.
4. Escribe la evidencia que falta para hacer una afirmación biológica real.

Los valores son didácticos, no datos de VEC. Esta guía independiente no es una instrucción oficial de evaluación ni de estrategia.
