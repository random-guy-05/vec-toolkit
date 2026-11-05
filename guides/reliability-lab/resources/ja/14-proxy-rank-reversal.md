# 局所検証が公式の順位を逆転させる場合

**日本語 · Reliability Lab 14 · 信頼性を学ぶ実験と解説**

この教材は合成データを使い、単一細胞・空間予測のモデル化や評価における問題を一つずつ説明します。大会データを読み込まず、公式スコアや隠された試料の結果も予測しません。公式教材ではありません。

局所代理が選択に役立つのは順位が目的の評価へ移る場合です。局所スコアの高さだけでは示せず、同点には同順位を使います。

## 実験を実行する

新しい環境を作り、リポジトリをクローンして指定の依存関係を導入してください。コマンドはリポジトリ直下で実行します。まず変更前の出力を読み、次に条件を変えます。コマンドと JSON のキーは各言語で共通のコード識別子です。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 14 --seed 7
```

## 問い

Spearman が -1 とは何ですか。

## 参照出力：乱数シード 7

```json
{
  "local_scores": [
    1.0,
    2.0,
    2.0,
    4.0
  ],
  "official_scores": [
    4.0,
    2.0,
    2.0,
    1.0
  ],
  "tie_aware_spearman": -1.0,
  "constant_series_correlation": null
}
```

## 結果の読み方

中央の同点も含め順位が完全に逆です。一定系列の相関は未定義なので null を返します。

## 追加の実験

一つのスコアを変えて同点を解消し、順位を計算し直してください。

## 限界

この例が示すのは数値的な仕組みです。実データでの重要性や因果関係を証明せず、公式評価器の代わりにもなりません。仮定、出典、元データを保存し、利用可能なデータで検証してください。

機械支援による翻案版で、母語話者による認証済みの校閲は受けていません。訂正を歓迎します。事実の基準は英語版で、コードと数値は共通です。自動テストは言語品質を保証しません。

[Source code](../../tools/experiments.py) · [Canonical English](../en/14-proxy-rank-reversal.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
