# 切り出しは生物的成長なしに RMS 半径を変える

**日本語 · Reliability Lab 12 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

RMS 半径は観測した点群の中心から測ります。中心部を切り出すと遠い点が除かれ、残った細胞が動かなくても半径は減ります。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 12 --seed 7
```

## 問い

切り出した点群の半径が小さい理由は何ですか。

## 参照出力：乱数シード 7

```json
{
  "full_rms": 1.7226292470793867,
  "cropped_rms": 1.0827934049272807,
  "retained_cells": 4852,
  "biological_growth": 0
}
```

## 結果の読み方

距離 1.5 より遠い点を除いたからです。発生は模擬しておらず、違いは観測だけに由来します。

## 追加の実験

片側だけを切り、中心と半径を再計算してください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/12-crop-rms.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
