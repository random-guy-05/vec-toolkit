# Dos leyes de crecimiento, dos puntos medios

**Español · Reliability Lab 11 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

Interpolar el radio o su logaritmo reproduce los mismos extremos, pero da tamaños intermedios diferentes. Dos observaciones no identifican por sí solas la ley de crecimiento.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 11 --seed 7
```

## Pregunta

¿Qué punto medio resulta entre radios 100 y 400?

## Resultado de referencia: semilla 7

```json
{
  "early_radius": 100.0,
  "late_radius": 400.0,
  "linear_midpoint": 250.0,
  "constant_log_growth_midpoint": 200.0
}
```

## Interpretación

La interpolación lineal del radio da 250. El crecimiento logarítmico constante da la media geométrica, 200. Ambos dependen de su hipótesis.

## Pruebe otra situación

Evalúe ambas curvas en las fracciones 0.25 y 0.75.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/11-growth-law.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
