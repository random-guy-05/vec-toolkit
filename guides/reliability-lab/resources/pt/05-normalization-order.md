# Normalização e mistura não comutam

**Português brasileiro · Reliability Lab 05 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

Misturar contagens e depois normalizar difere de misturar expressões logarítmicas já normalizadas. Totais e log1p introduzem não linearidades e hipóteses distintas.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 05 --seed 7
```

## Pergunta

Por que dois pontos médios diferem?

## Resultado de referência: semente 7

```json
{
  "normalize_after_mix": [
    9.115140186122302,
    6.813544494621113
  ],
  "mix_after_normalize": [
    4.6052201834882585,
    4.6052201834882585
  ],
  "difference": 5.0215609817365605
}
```

## Interpretação

[10,0] e [0,1] têm totais diferentes. Normalizar primeiro elimina essa diferença; a média dos logaritmos acrescenta outra não linearidade.

## Experimente outra situação

Iguale os totais e repita a comparação.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/05-normalization-order.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
