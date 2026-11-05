# 比例上升不等于群体增长

**简体中文 · Reliability Lab 06 · 可靠性实验与解答**

本练习用合成数据解释单细胞或空间预测中的一个建模与评估问题。不读取比赛数据，不计算官方分数，也不预测隐藏样本的结果。它是独立的教学材料，不代表主办方认可。

观测到的细胞比例取决于视野。移除某一类型的细胞，即使另一类型数量不变，也会提高后者所占比例。

## 运行示例

新建环境、克隆仓库并安装指定依赖。在仓库根目录执行命令。先阅读未修改代码的输出，再尝试扩展实验。命令和 JSON 键是各语言版本共用的代码标识符，不应翻译。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 06 --seed 7
```

## 思考问题

第二个群体增长了吗？

## 参考输出：随机种子 7

```json
{
  "early_counts": [
    900,
    100
  ],
  "late_counts": [
    90,
    100
  ],
  "early_fraction": [
    0.9,
    0.1
  ],
  "late_fraction": [
    0.47368421052631576,
    0.5263157894736842
  ],
  "unchanged_heart_count": true,
  "warning": "A changed observed fraction need not mean more heart cells."
}
```

## 结果解释

没有，仍然是 100 个细胞。第一个群体的观测数量从 900 降到 90，使第二个比例上升。

## 扩展练习

固定总量，在两个类型间转移细胞并比较机制。

## 适用范围

示例只隔离一个数值机制，不能证明它在真实数据中的影响程度，不能识别因果关系，也不能替代官方评估器。请保留建模假设、来源记录和原始数据，并使用允许的数据验证决策。

本版本经过机器辅助改编，尚未经母语使用者认证审校。欢迎纠错。英文为事实参考版本；代码和数学数值保持一致。自动测试验证程序行为与页面结构，不证明语言表达或生物学解释正确。

[Source code](../../tools/experiments.py) · [Canonical English](../en/06-field-of-view-composition.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
