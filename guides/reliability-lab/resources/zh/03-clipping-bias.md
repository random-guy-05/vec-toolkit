# 加性平移后截断为零产生的偏差

**简体中文 · Reliability Lab 03 · 可靠性实验与解答**

本练习用合成数据解释单细胞或空间预测中的一个建模与评估问题。不读取比赛数据，不计算官方分数，也不预测隐藏样本的结果。它是独立的教学材料，不代表主办方认可。

所有值加上同一常数后再将负值截为零，是非线性操作。原来的零不能继续下降，因此均值变化不等于指定常数。

## 运行示例

新建环境、克隆仓库并安装指定依赖。在仓库根目录执行命令。先阅读未修改代码的输出，再尝试扩展实验。命令和 JSON 键是各语言版本共用的代码标识符，不应翻译。

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 03 --seed 7
```

## 思考问题

均值是否恰好下降 0.5？

## 参考输出：随机种子 7

```json
{
  "original_mean": 1.0,
  "shift": -0.5,
  "intended_mean": 0.5,
  "clipped_mean": 0.75
}
```

## 结果解释

不是。截断抵消了部分预定下降，实际均值高于算术目标。

## 扩展练习

改变零值比例，比较目标均值与实际均值。

## 适用范围

示例只隔离一个数值机制，不能证明它在真实数据中的影响程度，不能识别因果关系，也不能替代官方评估器。请保留建模假设、来源记录和原始数据，并使用允许的数据验证决策。

本版本经过机器辅助改编，尚未经母语使用者认证审校。欢迎纠错。英文为事实参考版本；代码和数学数值保持一致。自动测试验证程序行为与页面结构，不证明语言表达或生物学解释正确。

[Source code](../../tools/experiments.py) · [Canonical English](../en/03-clipping-bias.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
