# 種類間の共通変化は必ずしも技術的ではない

**日本語 · Reliability Lab 13 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

種類間の中央値は共通成分と種類固有の残差を分けます。共通成分を技術的と呼ぶには追加仮定が必要で、広い生物応答も同じ形を取り得ます。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 13 --seed 7
```

## 問い

計算から原因は特定できますか。

## 参照出力：乱数シード 7

```json
{
  "observed_type_deltas": [
    [
      -1.0,
      1.5
    ],
    [
      -1.0,
      -0.5
    ],
    [
      -1.0,
      0.5
    ]
  ],
  "common_component": [
    -1.0,
    0.5
  ],
  "residual": [
    [
      0.0,
      1.0
    ],
    [
      0.0,
      -1.0
    ],
    [
      0.0,
      0.0
    ]
  ],
  "caveat": "Common biology and batch remain confounded without additional assumptions."
}
```

## 結果の読み方

できません。組み込んだ共通成分は得られますが、同じ値が共通の生物応答を表しても矛盾しません。

## 追加の実験

全種類に同じ生物効果を加えてください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/13-common-shift-confounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
