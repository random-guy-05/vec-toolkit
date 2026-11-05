# Uma estimativa não viesada de MMD pode ser negativa

**Português brasileiro · Reliability Lab 07 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

A distância populacional é não negativa, mas o estimador não viesado remove termos diagonais e pode ser negativo com poucas observações. O estimador viesado mantém esses termos.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 07 --seed 7
```

## Pergunta

Por que os sinais diferem?

## Resultado de referência: semente 7

```json
{
  "unbiased_mmd_squared": -0.8617044036602768,
  "biased_mmd_squared": 0.0029603131031104013,
  "population_distance_nonnegative": true
}
```

## Interpretação

A correção diagonal modifica a estimativa finita. Uma estimativa negativa não implica distância populacional negativa.

## Experimente outra situação

Afaste a segunda amostra mantendo o núcleo fixo.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/07-negative-unbiased-mmd.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
