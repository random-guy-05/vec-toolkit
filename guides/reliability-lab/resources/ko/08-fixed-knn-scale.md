# 고정된 이웃 수는 물리적 범위를 고정하지 않는다

**한국어 · Reliability Lab 08 · 풀이가 있는 신뢰성 실험**

이 실습은 합성 데이터로 단일세포 및 공간 예측의 모델링·평가 문제를 설명합니다. 대회 데이터를 읽지 않고 공식 점수를 계산하거나 숨겨진 표본의 결과를 예측하지도 않습니다. 주최 측의 공식 교재가 아닙니다.

k 최근접 이웃은 반지름이 아니라 세포 수를 고정합니다. 같은 영역에서 밀도가 커지면 이웃의 물리적 거리는 줄어듭니다.

## 예제 실행

새 환경을 만들고 저장소를 복제한 뒤 지정된 의존성을 설치하세요. 저장소 최상위 디렉터리에서 명령을 실행합니다. 먼저 코드를 바꾸지 않은 출력을 읽고, 이후 조건을 바꾸세요. 명령과 JSON 키는 모든 언어판이 공유하는 코드 식별자입니다.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 08 --seed 7
```

## 질문

15개 이웃의 범위는 어떻게 달라지나요?

## 기준 출력: 난수 시드 7

```json
{
  "domain_length": 1,
  "fixed_neighbor_count": 15,
  "physical_span": {
    "100": 0.15151515151515152,
    "1000": 0.015015015015015015,
    "10000": 0.0015001500150015
  }
}
```

## 결과 해석

단위 선분에 점이 늘어나면 끝점에서 열다섯 번째 위치까지의 거리가 작아집니다.

## 추가 실험

물리적 반지름을 고정하고 밀도마다 포함되는 점을 세세요.

## 한계

예제는 하나의 수치적 메커니즘을 분리합니다. 실제 데이터에서의 중요성이나 인과관계를 증명하지 않으며 공식 평가기를 대체하지 않습니다. 가정, 출처와 원본 데이터를 보존하고 허용된 데이터로 검증하세요.

기계의 도움으로 각색한 판본이며, 원어민의 검증된 교정을 받지 않았습니다. 수정을 환영합니다. 사실관계의 기준은 영어판이고 코드와 수치는 유지됩니다. 자동 검사는 언어 품질을 보증하지 않습니다.

[Source code](../../tools/experiments.py) · [Canonical English](../en/08-fixed-knn-scale.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
