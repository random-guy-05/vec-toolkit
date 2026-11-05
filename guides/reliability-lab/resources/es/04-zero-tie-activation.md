# Activación espacial de ceros empatados

**Español · Reliability Lab 04 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

Los ceros empatados requieren una regla para decidir qué células se activan en un transporte de cuantiles. Una elección aleatoria dispersa detecciones; el apoyo de células vecinas produce otra organización espacial con el mismo número de activaciones.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 04 --seed 7
```

## Pregunta

¿Qué células selecciona el apoyo local?

## Resultado de referencia: semilla 7

```json
{
  "zero_cells": [
    0,
    1,
    2,
    3
  ],
  "random_activation": [
    2,
    3
  ],
  "supported_activation": [
    1,
    0
  ],
  "support": [
    0.9,
    0.8,
    0.2,
    0.1,
    2.0
  ]
}
```

## Interpretación

Se seleccionan los ceros con apoyo 0.9 y 0.8. Una selección aleatoria puede coincidir o diferir; una sola realización no demuestra superioridad universal.

## Pruebe otra situación

Invierta el vector de apoyo y mantenga fijo el número de activaciones.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/04-zero-tie-activation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
