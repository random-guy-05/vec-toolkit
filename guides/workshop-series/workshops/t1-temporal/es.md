# Taller Task 1: Pronosticar una población celular cambiante

**75 minutos · 4–20 participantes · sin código ni datos del Challenge**

Sesión lista para facilitar a participantes que conocen conceptos básicos de análisis unicelular y se inician en la predicción temporal de expresión génica. Usa recuentos celulares y valores de características ficticios para distinguir los cambios en la composición de estados celulares de los cambios dentro de cada estado. El objetivo es razonar sobre el objetivo de predicción y la evidencia, no prescribir un modelo.

## Preparación

Abre las [descripciones oficiales de las tareas](https://virtualembryo.ai/challenge/tasks), el [esquema de datos](https://virtualembryo.ai/challenge/data) y la [página de evaluación](https://virtualembryo.ai/challenge/evaluation). Imprime o comparte esta guía. Las cifras son inventadas y no representan observaciones de VEC. No uses mediciones de objetivos ocultos. Las páginas oficiales prevalecen y pueden cambiar.

## Agenda

| Minutos | Actividad | Pregunta para facilitar |
|---:|---|---|
| 0–8 | Definir la predicción | «¿Pronosticamos células individuales o una población futura?» |
| 8–20 | Leer la división actual | «¿Qué etapas son de entrenamiento, validación y test oculto hoy?» |
| 20–38 | Separar identidad de distribución | Usa el Ejercicio 1. |
| 38–52 | Descomponer un cambio de pseudobulk | Usa el Ejercicio 2. |
| 52–65 | Diagnosticar las preguntas métricas | Usa el Ejercicio 3. |
| 65–72 | Delimitar una afirmación | Cada pareja escribe una afirmación respaldada y otra que no lo está. |
| 72–75 | Cerrar | Vuelve a la página oficial de la tarea y recoge preguntas abiertas. |

## Ejercicio 1 — Población nueva, no seguimiento celular

Los recuentos siguientes son ficticios. Imagina una muestra de entrenamiento publicada con 70 células del tipo A y 30 del tipo B. Un objetivo posterior ficticio tiene 40 de tipo A, 30 de tipo B y 30 de un tipo C que aparece por primera vez. Pregunta a las parejas: ¿qué células del objetivo son «las mismas» que las del entrenamiento? ¿Qué muestra el ejemplo sobre pronosticar una población en lugar de seguir identidades celulares?

### Clave

La tabla didáctica no ofrece evidencia de identidad celular entre etapas, así que no se pueden emparejar células individuales. La distribución objetivo incluye un tipo ausente en la muestra de entrenamiento ficticia y distintas proporciones de los tipos existentes. Una predicción temporal de población debe considerar qué estados aparecen y con qué frecuencia; no pide avanzar cada célula observada en el tiempo. Comprueba la división real y la definición del objetivo en la página oficial actual.

## Ejercicio 2 — La composición puede cambiar un valor agregado

Estas medias ficticias de una característica se mantienen dentro de cada tipo celular mientras cambia la mezcla:

| Etapa | Proporción tipo A | Media tipo A | Proporción tipo B | Media tipo B | Media agrupada |
|---|---:|---:|---:|---:|---:|
| anterior | 80% | 2 | 20% | 12 | 4 |
| posterior | 20% | 2 | 80% | 12 | 10 |

Pide a las parejas que calculen la media agrupada en cada etapa. ¿Qué cambió: las medias dentro de cada tipo o la mezcla de la población? ¿Qué no puede revelar por sí solo el valor agrupado?

### Clave

La media agrupada anterior es `0.8 × 2 + 0.2 × 12 = 4`; la posterior es `0.2 × 2 + 0.8 × 12 = 10`. Las medias dentro de cada tipo no cambiaron; cambió la mezcla. Un cambio agrupado, por sí solo, no distingue una respuesta dentro de un estado de un cambio en las proporciones de estados celulares. Es un ejemplo didáctico, no una afirmación sobre un gen o una etapa reales.

## Ejercicio 3 — Cuatro preguntas de evaluación distintas

La evaluación oficial de Task 1 distingue la recuperación de genes DE, la dirección del cambio, la distribución de estados celulares y la covariación entre genes. Pide a los grupos que relacionen cada fallo ficticio con la pregunta más directamente afectada: (a) se omiten muchos genes que cambian; (b) los genes pertinentes cambian en sentido contrario; (c) las proporciones de tipos celulares predichas son incorrectas; (d) las medias por gen parecen plausibles, pero desaparecen las relaciones entre genes.

### Clave

(a) recuperación de genes DE; (b) dirección del cambio; (c) distribución de estados celulares; (d) covariación entre genes. Un fallo puede afectar a varias métricas, y estos ejemplos no son firmas deterministas de puntuación. Un buen resultado en una métrica no demuestra que las demás también sean buenas.

## Hoja para participantes

1. En la página oficial actual, enumera las etapas de entrenamiento visibles, el objetivo de validación, el objetivo de test oculto y la cantidad que se predice.
2. En el Ejercicio 1, ¿qué evidencia se necesitaría para afirmar que dos células de etapas distintas son la misma? ¿Está presente?
3. Muestra el cálculo del Ejercicio 2. Explica cómo cambió la media agrupada mientras ambas medias por tipo se mantuvieron fijas.
4. Relaciona cada fallo del Ejercicio 3 con la pregunta métrica oficial más directa.
5. Escribe una afirmación respaldada por los ejemplos ficticios y una afirmación biológica que no puedan respaldar.

## Cierre para facilitar

No interpretes los valores inventados como biología real ni como resultado de un modelo. Invita a distinguir en los análisis la composición de estados celulares, la expresión dentro de cada estado, la división de datos y la evidencia del scorer. Este material educativo independiente no es una guía oficial de evaluación ni una receta de modelado.
