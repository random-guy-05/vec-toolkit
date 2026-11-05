# El alineamiento por rotación necesita restringir el determinante

**Español · Reliability Lab 10 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

Un ajuste ortogonal sin restricciones puede reflejar la nube. Una rotación propia exige determinante +1 y conserva la orientación; ese requisito cambia el conjunto de soluciones permitidas.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 10 --seed 7
```

## Pregunta

¿Por qué el ajuste perfecto tiene determinante -1?

## Resultado de referencia: semilla 7

```json
{
  "unconstrained_determinant": -1.0000000000000007,
  "proper_determinant": 1.0000000000000016,
  "unconstrained_error": 6.891658975852732e-15,
  "proper_error": 15.367278961474724
}
```

## Interpretación

El objetivo sintético refleja un eje. La reflexión lo ajusta exactamente, mientras que la rotación propia conserva determinante +1 y deja un residuo.

## Pruebe otra situación

Genere el objetivo mediante una rotación propia conocida y compare los errores.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/10-proper-rotation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
