# 固定した近傍数は物理的な範囲を固定しない

**日本語 · Reliability Lab 08 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

k 近傍が固定するのは細胞数であり半径ではありません。同じ領域で密度が増えると、近傍の物理距離は短くなります。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 08 --seed 7
```

## 問い

15 近傍の範囲はどう変わりますか。

## 参照出力：乱数シード 7

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

## 結果の読み方

単位線分上で点数が増えると、端点から十五番目の位置までの距離が小さくなります。

## 追加の実験

物理半径を固定し、含まれる点を数えてください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/08-fixed-knn-scale.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
