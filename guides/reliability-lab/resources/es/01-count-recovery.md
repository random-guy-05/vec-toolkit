# Cuándo no se pueden recuperar moléculas de la expresión normalizada

**Español · Reliability Lab 01 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

CP10K elimina el total de cada fila. Si todos los recuentos positivos comparten un factor, el menor valor positivo normalizado no identifica una molécula. La normalización conserva proporciones, pero pierde ese factor común.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 01 --seed 7
```

## Pregunta

¿Por qué falla la recuperación de la primera fila?

## Resultado de referencia: semilla 7

```json
{
  "input_counts": [
    [
      2.0,
      4.0,
      8.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "recovered_counts": [
    [
      1.0,
      2.0,
      4.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "exact_rows": 1,
  "lesson": "Normalization loses a common integer factor."
}
```

## Interpretación

[2,4,8] y [1,2,4] generan la misma expresión normalizada. El decodificador no puede distinguirlas. La fila [1,3,5] sí contiene una observación de una molécula.

## Pruebe otra situación

Sustituya la primera fila por [3,6,12] y después por [1,6,12]. Prediga qué cambia.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/01-count-recovery.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
