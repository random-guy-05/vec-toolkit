# Un gen no medido no equivale a un cero medido

**Español · Reliability Lab 19 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

Rellenar con cero un gen ausente produce una matriz rectangular, pero oculta si se realizó una medición. Una máscara de medición conserva esa distinción antes de cualquier imputación.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 19 --seed 7
```

## Pregunta

¿Qué información pierde el relleno silencioso con cero?

## Resultado de referencia: semilla 7

```json
{
  "measured_zero": {
    "gene": "G",
    "measured": true,
    "value": 0
  },
  "absent_panel_gene": {
    "gene": "G",
    "measured": false,
    "value": null
  },
  "zero_fill_cannot_preserve_measurement_status": true
}
```

## Interpretación

Se pierde si el gen fue medido. El ejemplo mantiene measured y usa null para la observación ausente.

## Pruebe otra situación

Añada un valor ausente por fallo de procesamiento y represente los tres casos por separado.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/19-unmeasured-is-not-zero.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
