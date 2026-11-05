# 遺伝子間構造と空間構造は別の問いに答える

**日本語 · Reliability Lab 20 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

細胞行を丸ごと並べ替えても、一部の遺伝子間要約は同じです。座標を固定すると近隣の発現状態は変わり、一方の保存は他方を示しません。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 20 --seed 7
```

## 問い

行置換に不変な要約はどれですか。

## 参照出力：乱数シード 7

```json
{
  "gene_pair_functional_before": 0.9446099464524159,
  "gene_pair_functional_after": 0.9446099464524159,
  "sequence_neighbor_distance_before": 2.1422813806369296,
  "sequence_neighbor_distance_after": 2.1619532929742107,
  "lesson": "Gene-gene structure and spatial structure answer different questions."
}
```

## 結果の読み方

遺伝子対の差の平均は順序が変わるだけです。連続行の距離は通常変わり、ここでは固定線上の近傍を表します。

## 追加の実験

座標と発現を一緒に置換し、何が保たれるか説明してください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/20-gene-versus-spatial-structure.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
