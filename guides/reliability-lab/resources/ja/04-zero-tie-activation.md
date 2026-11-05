# 同順位のゼロを空間的な支持で活性化する

**日本語 · Reliability Lab 04 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

分位点変換では、どのゼロを活性化するか決める必要があります。乱択と近傍の支持では、活性化数が同じでも空間配置が異なります。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 04 --seed 7
```

## 問い

局所的な支持はどの細胞を選びますか。

## 参照出力：乱数シード 7

```json
{
  "zero_cells": [
    0,
    1,
    2,
    3
  ],
  "random_activation": [
    2,
    3
  ],
  "supported_activation": [
    1,
    0
  ],
  "support": [
    0.9,
    0.8,
    0.2,
    0.1,
    2.0
  ]
}
```

## 結果の読み方

支持が 0.9 と 0.8 のゼロを選びます。乱択も偶然一致し得るため、一回では一般的な優位性を示せません。

## 追加の実験

活性化数を固定して支持の順序を反転してください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/04-zero-tie-activation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
