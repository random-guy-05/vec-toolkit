# 为什么归一化表达不能总是恢复分子计数

**简体中文 · Reliability Lab 01 · 可靠性实验与解答**

本练习用合成数据解释单细胞或空间预测中的一个建模与评估问题。不读取比赛数据，不计算官方分数，也不预测隐藏样本的结果。它是独立的教学材料，不代表主办方认可。

CP10K 去掉每行总量。若正计数存在共同整数因子，最小正表达值未必对应一个分子。比例保留下来，但共同倍数丢失。

## 运行示例

新建环境、克隆仓库并安装指定依赖。在仓库根目录执行命令。先阅读未修改代码的输出，再尝试扩展实验。命令和 JSON 键是各语言版本共用的代码标识符，不应翻译。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 01 --seed 7
```

## 思考问题

第一行为什么无法准确恢复？

## 参考输出：随机种子 7

```json
{
  "input_counts": [
    [
      2.0,
      4.0,
      8.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "recovered_counts": [
    [
      1.0,
      2.0,
      4.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "exact_rows": 1,
  "lesson": "Normalization loses a common integer factor."
}
```

## 结果解释

[2,4,8] 与 [1,2,4] 的比例相同，归一化后无法区分。[1,3,5] 则包含一个分子的观测。

## 扩展练习

分别代入 [3,6,12] 和 [1,6,12]，预测恢复结果。

## 适用范围

示例只隔离一个数值机制，不能证明它在真实数据中的影响程度，不能识别因果关系，也不能替代官方评估器。请保留建模假设、来源记录和原始数据，并使用允许的数据验证决策。

本版本经过机器辅助改编，尚未经母语使用者认证审校。欢迎纠错。英文为事实参考版本；代码和数学数值保持一致。自动测试验证程序行为与页面结构，不证明语言表达或生物学解释正确。

[Source code](../../tools/experiments.py) · [Canonical English](../en/01-count-recovery.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
