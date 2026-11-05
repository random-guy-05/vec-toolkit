# 加算後にゼロで切ると平均に偏りが生じる

**日本語 · Reliability Lab 03 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

一定値を加えて負値をゼロにする操作は非線形です。元のゼロはそれ以上下がらず、平均の変化は指定値と一致しません。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 03 --seed 7
```

## 問い

平均は正確に 0.5 下がりますか。

## 参照出力：乱数シード 7

```json
{
  "original_mean": 1.0,
  "shift": -0.5,
  "intended_mean": 0.5,
  "clipped_mean": 0.75
}
```

## 結果の読み方

いいえ。切り詰めが予定した減少の一部を消すため、実際の平均は目標より大きくなります。

## 追加の実験

ゼロの割合を変え、目標平均との差を測ってください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/03-clipping-bias.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
