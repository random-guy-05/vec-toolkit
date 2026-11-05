# Maior proporção não significa maior população

**Português brasileiro · Reliability Lab 06 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

O campo observado altera as proporções. Remover células de um tipo aumenta a fração de outro sem acrescentar nenhuma célula a ele.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 06 --seed 7
```

## Pergunta

A segunda população cresceu?

## Resultado de referência: semente 7

```json
{
  "early_counts": [
    900,
    100
  ],
  "late_counts": [
    90,
    100
  ],
  "early_fraction": [
    0.9,
    0.1
  ],
  "late_fraction": [
    0.47368421052631576,
    0.5263157894736842
  ],
  "unchanged_heart_count": true,
  "warning": "A changed observed fraction need not mean more heart cells."
}
```

## Interpretação

Não: permanece com 100 células. A primeira passa de 900 para 90 observações, aumentando a fração da segunda.

## Experimente outra situação

Mantenha o total fixo e transfira células entre tipos.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/06-field-of-view-composition.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
