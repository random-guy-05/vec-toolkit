# Dividir células puede compartir todos los especímenes

**Español · Reliability Lab 15 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

Una división aleatoria de células puede colocar células del mismo embrión en entrenamiento y prueba. Los efectos compartidos del espécimen no quedan separados aunque las filas sean distintas.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 15 --seed 7
```

## Pregunta

¿Cuántos identificadores de espécimen aparecen en ambos lados?

## Resultado de referencia: semilla 7

```json
{
  "cell_split_shared_specimens": 6,
  "specimen_split_shared_specimens": 0,
  "total_specimens": 6
}
```

## Interpretación

La partición celular comparte especímenes. La partición explícita por grupos no comparte ninguno; muchas células no equivalen a muchos embriones independientes.

## Pruebe otra situación

Dé dos alias distintos al mismo embrión y explique qué fuga no detectaría una comparación literal.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/15-specimen-holdout.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
