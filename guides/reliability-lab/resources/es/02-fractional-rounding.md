# Redondeo estocástico de recuentos fraccionarios

**Español · Reliability Lab 02 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

Truncar recuentos fraccionarios reduce sistemáticamente su media. El redondeo estocástico añade una variable de Bernoulli para la parte fraccionaria y conserva el valor esperado, aunque cada realización tenga ruido.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 02 --seed 7
```

## Pregunta

¿Qué operación conserva los valores originales en promedio?

## Resultado de referencia: semilla 7

```json
{
  "target": [
    0.2,
    0.7,
    1.4,
    3.8
  ],
  "floor": [
    0.0,
    0.0,
    1.0,
    3.0
  ],
  "randomized_mean": [
    0.202,
    0.70021,
    1.39812,
    3.79941
  ],
  "max_error": 0.0020000000000000018
}
```

## Interpretación

El truncamiento devuelve 0,0,1,3. La media de muchos redondeos aleatorios se aproxima a 0.2,0.7,1.4,3.8; el programa comprueba el error empírico.

## Pruebe otra situación

Reduzca las repeticiones de 100000 a 100 y compare varias semillas.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/02-fractional-rounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
