# Un cambio común entre tipos no es necesariamente técnico

**Español · Reliability Lab 13 · Ejercicio de fiabilidad con solución**

Este ejercicio utiliza datos sintéticos para estudiar un fallo concreto del modelado o de la evaluación de datos unicelulares y espaciales. No necesita datos del concurso, no calcula una puntuación oficial y no predice resultados de muestras ocultas.

La mediana de cambios entre tipos separa un componente común de residuos específicos. Llamar técnico a ese componente requiere otra hipótesis: una respuesta biológica amplia también puede ser común.

## Ejecutar el ejemplo

Cree un entorno nuevo, clone el repositorio e instale la dependencia indicada. Ejecute el comando desde la raíz del repositorio. Lea primero el resultado sin modificar el código. Las claves JSON y los comandos son identificadores literales compartidos por todas las ediciones.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 13 --seed 7
```

## Pregunta

¿Qué parte identifica el cálculo y qué interpretación no identifica?

## Resultado de referencia: semilla 7

```json
{
  "observed_type_deltas": [
    [
      -1.0,
      1.5
    ],
    [
      -1.0,
      -0.5
    ],
    [
      -1.0,
      0.5
    ]
  ],
  "common_component": [
    -1.0,
    0.5
  ],
  "residual": [
    [
      0.0,
      1.0
    ],
    [
      0.0,
      -1.0
    ],
    [
      0.0,
      0.0
    ]
  ],
  "caveat": "Common biology and batch remain confounded without additional assumptions."
}
```

## Interpretación

Recupera el componente común construido. Las mismas cifras servirían si ese componente fuese biológico; su causa no queda identificada.

## Pruebe otra situación

Añada el mismo efecto biológico a todos los tipos y repita la separación.

## Límites

El ejemplo aísla un mecanismo numérico. No demuestra su importancia en un conjunto de datos real, no identifica efectos causales y no sustituye al evaluador oficial. Valide las decisiones con datos permitidos y conserve las hipótesis y la procedencia.

Edición adaptada con asistencia automática, sin revisión certificada de un hablante nativo. Se agradecen correcciones. El inglés es la fuente factual de referencia; el código y los valores matemáticos se conservan.

[Source code](../../tools/experiments.py) · [Canonical English](../en/13-common-shift-confounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
