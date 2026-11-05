# 全種類が増加しても全体平均は低下し得る

**日本語 · Reliability Lab 17 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

全体平均は種類内の発現と構成割合に依存します。低発現の種類が大きく増えると、各種類の上昇を上回って全体が下がります。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 17 --seed 7
```

## 問い

二種類とも上昇するのに全体が下がる理由は何ですか。

## 参照出力：乱数シード 7

```json
{
  "type_means_before": [
    1.0,
    8.0
  ],
  "type_means_after": [
    2.0,
    9.0
  ],
  "aggregate_before": 7.3,
  "aggregate_after": 2.7
}
```

## 結果の読み方

混合が低発現細胞へ移り、その構成効果が種類内の増加を上回るからです。

## 追加の実験

割合を固定し、全体の変化方向を再計算してください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/17-composition-simpson.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
