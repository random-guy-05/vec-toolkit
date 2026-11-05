# Autovalores próximos desestabilizam direções PCA

**Português brasileiro · Reliability Lab 09 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

Autovalores repetidos não definem eixos individuais únicos. Uma pequena perturbação pode girar um eixo muito mais do que altera a matriz de covariância.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 09 --seed 7
```

## Pergunta

Como surge uma rotação de cerca de 45 graus?

## Resultado de referência: semente 7

```json
{
  "covariance_perturbation": 1.4142135623730952e-08,
  "principal_axis_angle_degrees": 45.00000000000001,
  "eigenvalues": [
    0.1,
    1.0,
    1.0
  ]
}
```

## Interpretação

Os dois maiores autovalores são iguais. A perturbação escolhe outra base válida no mesmo plano.

## Experimente outra situação

Mude um autovalor principal para 1.2 e compare o ângulo.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/09-pca-eigenvalue-gap.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
