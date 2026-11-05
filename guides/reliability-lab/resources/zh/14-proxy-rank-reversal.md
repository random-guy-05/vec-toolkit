# 局部验证可能反转官方方法排序

**简体中文 · Reliability Lab 14 · 可靠性实验与解答**

本练习用合成数据解释单细胞或空间预测中的一个建模与评估问题。不读取比赛数据，不计算官方分数，也不预测隐藏样本的结果。它是独立的教学材料，不代表主办方认可。

局部替代评估只有在排序可迁移时才有助于选模。局部分数高并不能证明这一点，相同分数应采用并列秩。

## 运行示例

新建环境、克隆仓库并安装指定依赖。在仓库根目录执行命令。先阅读未修改代码的输出，再尝试扩展实验。命令和 JSON 键是各语言版本共用的代码标识符，不应翻译。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 14 --seed 7
```

## 思考问题

Spearman 等于 -1 表示什么？

## 参考输出：随机种子 7

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

## 结果解释

两组排序完全相反，包括中间的并列。常数序列的相关系数未定义，因此输出 null。

## 扩展练习

改变一个分数打破并列，再重新计算秩。

## 适用范围

示例只隔离一个数值机制，不能证明它在真实数据中的影响程度，不能识别因果关系，也不能替代官方评估器。请保留建模假设、来源记录和原始数据，并使用允许的数据验证决策。

本版本经过机器辅助改编，尚未经母语使用者认证审校。欢迎纠错。英文为事实参考版本；代码和数学数值保持一致。自动测试验证程序行为与页面结构，不证明语言表达或生物学解释正确。

[Source code](../../tools/experiments.py) · [Canonical English](../en/14-proxy-rank-reversal.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
