# Oficina Task 2: raciocinar sobre espaço e tempo

**75 minutos · 4–20 pessoas · sem código nem dados do Challenge**

Para participantes que conhecem o básico de single-cell e estão começando com previsões espaço-temporais em 3D. O objetivo é entender o contrato da tarefa e os limites das evidências, não recomendar um modelo. Tradução inicial assistida; correções de falantes nativos são bem-vindas.

## Preparação e agenda

Abra as páginas oficiais de [tarefas](https://virtualembryo.ai/challenge/tasks), [dados](https://virtualembryo.ai/challenge/data) e [avaliação](https://virtualembryo.ai/challenge/evaluation). Confira os splits atuais. Todos os cenários são fictícios; não compartilhe dados privados nem previsões da equipe.

| Minutos | Atividade |
|---:|---|
| 0–8 | O que uma previsão precisa conter? |
| 8–20 | Ler o split: interpolação ou extrapolação? |
| 20–38 | Corrigir a suposição de que todo board T2 testa extrapolação. |
| 38–52 | Comparar evidências moleculares, celulares e espaciais. |
| 52–65 | Discutir o significado das coordenadas entre estágios. |
| 65–75 | Escrever uma afirmação sustentada e outra sem evidência suficiente. |

## Exercícios e respostas

**1. Dois contextos.** Uma equipe fictícia supõe que todo teste T2 prevê depois do último estágio de treino. Consulte o split oficial. **Resposta:** o contexto de embrião inteiro testa interpolação; o de coração inclui uma pergunta de interpolação e outra de extrapolação. Confira os estágios exatos na página atual.

**2. Quatro dimensões.** O Modelo A prevê mudanças de expressão plausíveis, mas produz uma nuvem uniforme. O Modelo B tem forma e vizinhanças plausíveis, porém mudanças de expressão fracas. **Resposta:** mudanças de expressão, distribuição de estados celulares, forma/escala do tecido e organização espacial local valem 25% cada em T2. Uma dimensão não comprova as outras. Um pseudo-split local não prevê o teste oculto.

**3. Referencial local.** Duas etapas têm coordenadas iguais `(x,y,z)`. São a mesma célula? **Resposta:** não é possível concluir isso pelas coordenadas. A página oficial informa que `spatial_3D` usa um referencial local por embrião e não está registrado entre etapas.

## Folha dos participantes

Anote os estágios visíveis de treino e o alvo do board escolhido, com link oficial; qual dimensão a evidência mede; o que seria necessário para afirmar correspondência entre coordenadas de etapas diferentes; e uma limitação explícita. Exemplos fictícios não são resultados reais.
