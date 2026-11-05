# Todos os tipos podem aumentar enquanto a média cai

**Português brasileiro · Reliability Lab 17 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

A média agregada depende de expressão por tipo e composição. Uma mistura que passa a favorecer tipos pouco expressos pode inverter a direção global.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 17 --seed 7
```

## Pergunta

Por que a média cai se ambos os tipos aumentam?

## Resultado de referência: semente 7

```json
{
  "type_means_before": [
    1.0,
    8.0
  ],
  "type_means_after": [
    2.0,
    9.0
  ],
  "aggregate_before": 7.3,
  "aggregate_after": 2.7
}
```

## Interpretação

A composição se desloca para células de baixa expressão. Esse efeito domina os aumentos internos.

## Experimente outra situação

Mantenha as proporções constantes e repita o cálculo.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/17-composition-simpson.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
