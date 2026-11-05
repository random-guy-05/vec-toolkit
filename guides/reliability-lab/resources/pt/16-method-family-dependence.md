# Muitas variantes não equivalem a muitas famílias

**Português brasileiro · Reliability Lab 16 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

Uma correlação global forte pode refletir diferenças entre poucas famílias de modelos. Ela não garante boa seleção de variantes próximas dentro de cada família.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 16 --seed 7
```

## Pergunta

As correlações globais e internas concordam?

## Resultado de referência: semente 7

```json
{
  "pooled_spearman": 0.9352941176470588,
  "within_family_spearman": [
    0.39999999999999997,
    0.39999999999999997,
    -0.7999999999999999,
    -0.39999999999999997
  ],
  "independent_families": 4,
  "variants": 16,
  "lesson": "Many variants do not create many independent method families."
}
```

## Interpretação

O exemplo tem sinal forte entre famílias e ruído interno pequeno. As correlações internas variam com a semente; não esconda essa variação.

## Experimente outra situação

Acrescente variantes sem acrescentar famílias.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/16-method-family-dependence.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
