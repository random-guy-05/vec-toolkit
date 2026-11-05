# Arredondamento aleatório de contagens fracionárias

**Português brasileiro · Reliability Lab 02 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

Truncar reduz a média sistematicamente. Acrescentar uma variável de Bernoulli para a parte fracionária preserva a esperança, mas introduz variabilidade em cada realização.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 02 --seed 7
```

## Pergunta

Qual operação preserva os valores em média?

## Resultado de referência: semente 7

```json
{
  "target": [
    0.2,
    0.7,
    1.4,
    3.8
  ],
  "floor": [
    0.0,
    0.0,
    1.0,
    3.0
  ],
  "randomized_mean": [
    0.202,
    0.70021,
    1.39812,
    3.79941
  ],
  "max_error": 0.0020000000000000018
}
```

## Interpretação

O piso produz 0,0,1,3. A média de muitos arredondamentos aleatórios aproxima 0.2,0.7,1.4,3.8.

## Experimente outra situação

Reduza as repetições de 100000 para 100 e varie a semente.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/02-fractional-rounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
