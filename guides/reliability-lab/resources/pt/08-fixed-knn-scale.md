# Um número fixo de vizinhos muda de escala física

**Português brasileiro · Reliability Lab 08 · Exercício de confiabilidade com resolução**

Este exercício usa dados sintéticos para explicar uma falha de modelagem ou avaliação de previsões unicelulares e espaciais. Não lê dados do desafio, não calcula pontuação oficial e não prevê resultados de amostras ocultas.

Os k vizinhos mais próximos fixam uma quantidade de células, não um raio físico. Amostras mais densas aproximam os vizinhos no mesmo domínio.

## Executar

Crie um ambiente novo, clone o repositório e instale a dependência indicada. Execute o comando na raiz do repositório. Leia primeiro o resultado sem alterar o código. Comandos e chaves JSON são identificadores literais compartilhados pelas edições.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 08 --seed 7
```

## Pergunta

O que acontece com a extensão de 15 vizinhos?

## Resultado de referência: semente 7

```json
{
  "domain_length": 1,
  "fixed_neighbor_count": 15,
  "physical_span": {
    "100": 0.15151515151515152,
    "1000": 0.015015015015015015,
    "10000": 0.0015001500150015
  }
}
```

## Interpretação

A distância da extremidade à posição 15 diminui quando o segmento unitário recebe mais pontos.

## Experimente outra situação

Fixe um raio e conte quantos pontos ele contém em cada densidade.

## Limitações

O exemplo isola um mecanismo numérico. Não comprova sua importância em dados reais, não identifica causas e não substitui o avaliador oficial. Preserve hipóteses, procedência e dados originais.

Edição adaptada com assistência automática, sem revisão certificada de falante nativo. Correções são bem-vindas. O inglês é a referência factual; código e valores matemáticos são preservados.

[Source code](../../tools/experiments.py) · [Canonical English](../en/08-fixed-knn-scale.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
