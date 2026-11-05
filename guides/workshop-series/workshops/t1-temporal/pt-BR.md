# Oficina Task 1: prever uma população celular em transformação

**75 minutos · 4–20 participantes · sem código ou dados do Challenge**

Esta sessão pronta para facilitação é para quem conhece conceitos básicos de análise de célula única e está começando a trabalhar com previsão temporal de expressão gênica. Ela usa contagens celulares e valores de características fictícios para separar mudanças na composição dos estados celulares de mudanças dentro de um estado. O objetivo é raciocinar sobre o alvo da previsão e as evidências, não recomendar um modelo.

## Preparação

Abra as [descrições oficiais das tarefas](https://virtualembryo.ai/challenge/tasks), o [esquema dos dados](https://virtualembryo.ai/challenge/data) e a [página de avaliação](https://virtualembryo.ai/challenge/evaluation). Imprima ou compartilhe este guia. Os números abaixo são inventados e não representam observações do VEC. Não use medições de alvos ocultos. As páginas oficiais prevalecem e podem mudar.

## Roteiro

| Minutos | Atividade | Pergunta de facilitação |
|---:|---|---|
| 0–8 | Definir a previsão | “Estamos prevendo células individuais ou uma população futura?” |
| 8–20 | Ler a divisão atual | “Quais estágios são de treino, validação e teste oculto hoje?” |
| 20–38 | Separar identidade e distribuição | Use o Exercício 1. |
| 38–52 | Decompor uma mudança de pseudobulk | Use o Exercício 2. |
| 52–65 | Diagnosticar as perguntas das métricas | Use o Exercício 3. |
| 65–72 | Delimitar uma afirmação | Cada dupla escreve uma afirmação sustentada e outra sem sustentação. |
| 72–75 | Encerrar | Volte à página oficial da tarefa e às perguntas em aberto. |

## Exercício 1 — População nova, não rastreamento celular

As contagens abaixo são inventadas. Imagine uma amostra de treino publicada com 70 células do tipo A e 30 do tipo B. Um alvo posterior fictício tem 40 células do tipo A, 30 do tipo B e 30 de um tipo C que aparece pela primeira vez. Pergunte às duplas: quais células do alvo são “as mesmas” células do treino? O que o exemplo mostra sobre prever uma população em vez de acompanhar identidades celulares?

### Respostas esperadas

A tabela didática não fornece evidência de identidade celular entre estágios, então não é possível parear células individuais. A distribuição-alvo inclui um tipo ausente na amostra fictícia de treino e proporções diferentes dos tipos existentes. Uma previsão temporal de população precisa considerar quais estados aparecem e com que frequência; não significa avançar cada célula observada no tempo. Confira a divisão real e a definição do alvo na página oficial atual.

## Exercício 2 — A composição pode alterar um valor agregado

Estas médias fictícias de uma característica permanecem fixas dentro de cada tipo celular, enquanto a mistura muda:

| Estágio | Proporção tipo A | Média tipo A | Proporção tipo B | Média tipo B | Média agregada |
|---|---:|---:|---:|---:|---:|
| anterior | 80% | 2 | 20% | 12 | 4 |
| posterior | 20% | 2 | 80% | 12 | 10 |

Peça às duplas que calculem a média agregada em cada estágio. O que mudou: as médias dentro dos tipos ou a mistura da população? O que o valor agregado, sozinho, não pode revelar?

### Respostas esperadas

A média agregada anterior é `0.8 × 2 + 0.2 × 12 = 4`; a posterior é `0.2 × 2 + 0.8 × 12 = 10`. As médias dentro dos tipos não mudaram; a mistura mudou. Uma mudança agregada, por si só, não distingue uma resposta dentro de um estado de uma mudança nas proporções dos estados celulares. Este é um exemplo didático, não uma afirmação sobre um gene ou estágio real.

## Exercício 3 — Quatro perguntas distintas da avaliação

A avaliação oficial de Task 1 separa recuperação de genes DE, direção da mudança, distribuição dos estados celulares e co-variação entre genes. Peça aos grupos que associem cada falha fictícia à pergunta mais diretamente afetada: (a) muitos genes que mudam não são recuperados; (b) os genes relevantes mudam na direção oposta; (c) as proporções previstas dos tipos celulares estão erradas; (d) as médias por gene parecem plausíveis, mas as relações entre genes desaparecem.

### Respostas esperadas

(a) recuperação de genes DE; (b) direção da mudança; (c) distribuição dos estados celulares; (d) co-variação entre genes. Uma falha pode afetar mais de uma métrica, e estes exemplos não são assinaturas determinísticas de pontuação. Um bom resultado em uma métrica não prova que as outras também sejam boas.

## Folha dos participantes

1. Na página oficial atual da tarefa, liste os estágios de treino visíveis, o alvo de validação, o alvo de teste oculto e a quantidade prevista.
2. No Exercício 1, que evidência seria necessária para afirmar que duas células de estágios diferentes são a mesma célula? Essa evidência está presente?
3. Mostre o cálculo do Exercício 2. Explique como a média agregada mudou enquanto as médias dentro dos dois tipos permaneceram fixas.
4. Associe cada falha do Exercício 3 à pergunta métrica oficial mais direta.
5. Escreva uma afirmação sustentada pelos exemplos fictícios e uma afirmação biológica que eles não podem sustentar.

## Encerramento para facilitação

Não interprete os valores inventados como biologia real ou resultado de modelo. Convide os participantes a manter separadas nas análises a composição dos estados celulares, a expressão dentro de cada estado, a divisão dos dados e as evidências do scorer. Este material educacional independente não é um guia oficial de avaliação nem uma receita de modelagem.
