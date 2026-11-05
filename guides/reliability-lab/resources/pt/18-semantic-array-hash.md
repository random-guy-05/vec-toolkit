# Igualdade semântica e disposição na memória

**Português brasileiro · Reliability Lab 18 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

Matrizes de valores iguais podem ter disposições de memória distintas. Canonizar tipo e ordem contígua permite um resumo independente dessa disposição.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 18 --seed 7
```

## Pergunta

Por que os hashes canônicos coincidem?

## Resultado de referência: semente 7

```json
{
  "c_layout": true,
  "f_layout": true,
  "semantic_digest_equal": true,
  "warning": "A real semantic hash must also include shape, gene order, cell order and coordinates."
}
```

## Interpretação

As matrizes são convertidas ao mesmo tipo e ordem. Um hash completo também precisa de forma, ordem de genes, células e coordenadas.

## Experimente outra situação

Troque duas colunas e explique quais metadados devem entrar no hash.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/18-semantic-array-hash.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
