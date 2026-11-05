# Oficina Task 3: prever a resposta à perturbação

**75 minutos · 4–20 pessoas · sem código nem dados do Challenge**

Sessão para entender previsões de knockouts condicionais. O objetivo central é separar o efeito da perturbação do fundo do tipo selvagem (WT). Não propõe mecanismo biológico nem receita de modelagem. Tradução inicial assistida; correções de falantes nativos são bem-vindas.

## Preparação e agenda

Abra as páginas oficiais de [tarefas](https://virtualembryo.ai/challenge/tasks), [dados](https://virtualembryo.ai/challenge/data) e [regras](https://virtualembryo.ai/challenge/rules). Confira os splits atuais. Números e nomes de exemplo são fictícios; nenhum dado medido de alvo oculto é usado.

| Minutos | Atividade |
|---:|---|
| 0–8 | Definir o que deve mudar na previsão. |
| 8–20 | Identificar treino, validação e teste. |
| 20–38 | Comparar a perturbação com o WT correspondente. |
| 38–52 | Relacionar falhas às métricas de resposta. |
| 52–65 | Avaliar uma proposta fictícia de dados externos. |
| 65–75 | Escrever uma afirmação sustentada e seu limite. |

## Exercício 1 — Fundo e resposta

Valores normalizados inventados para uma característica genérica: WT = 10,0; Modelo A com perturbação = 10,1; Modelo B = 7,0. Qual prevê maior mudança em relação ao WT?

**Resposta:** A prevê mudança quase zero; B prevê uma queda maior. O exemplo não define qual direção é biologicamente correta. A avaliação examina a resposta em relação ao WT; copiar o fundo WT não basta.

## Exercício 2 — Quatro métricas de resposta

(a) Os genes certos mudam na direção oposta; (b) direção correta, magnitude pequena; (c) mudam genes errados; (d) as proporções celulares colapsam. **Respostas:** direção da resposta, magnitude da resposta, recuperação dos genes de resposta e distribuição de estados celulares, respectivamente. Cada métrica traz evidência diferente.

## Exercício 3 — Elegibilidade de dados

Um colega propõe um conjunto público de estágio semelhante com knockout de gene relacionado. Antes de usar, confira fonte/versão, alelo/genótipo, estágio, licença, relevância, regras atuais e divulgação. Um alelo relacionado ou fenótipo semelhante pode estar dentro de uma condição protegida. Se a elegibilidade não estiver clara, pause e consulte os organizadores.

## Folha dos participantes

Na página oficial, anote a perturbação de treino, o alvo de validação e o alvo de teste oculto. Calcule `perturbação − WT` no exemplo e diga o que a diferença revela. Relacione as falhas do Exercício 2 às métricas e liste a evidência que falta para uma conclusão biológica real.

Os valores são didáticos, não dados VEC. Material independente da comunidade, não é orientação oficial de avaliação ou estratégia.
