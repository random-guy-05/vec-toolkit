# 유전자 간 구조와 공간 구조는 서로 다른 질문이다

**한국어 · Reliability Lab 20 · 풀이가 있는 신뢰성 실험**

이 실습은 합성 데이터로 단일세포 및 공간 예측의 모델링·평가 문제를 설명합니다. 대회 데이터를 읽지 않고 공식 점수를 계산하거나 숨겨진 표본의 결과를 예측하지도 않습니다. 주최 측의 공식 교재가 아닙니다.

세포 행 전체를 섞어도 일부 유전자 간 요약은 유지됩니다. 좌표가 고정되면 이웃 발현 상태가 달라져 한 구조의 보존이 다른 구조를 증명하지 않습니다.

## 예제 실행

새 환경을 만들고 저장소를 복제한 뒤 지정된 의존성을 설치하세요. 저장소 최상위 디렉터리에서 명령을 실행합니다. 먼저 코드를 바꾸지 않은 출력을 읽고, 이후 조건을 바꾸세요. 명령과 JSON 키는 모든 언어판이 공유하는 코드 식별자입니다.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 20 --seed 7
```

## 질문

행 순열에 불변인 요약은 무엇인가요?

## 기준 출력: 난수 시드 7

```json
{
  "gene_pair_functional_before": 0.9446099464524159,
  "gene_pair_functional_after": 0.9446099464524159,
  "sequence_neighbor_distance_before": 2.1422813806369296,
  "sequence_neighbor_distance_after": 2.1619532929742107,
  "lesson": "Gene-gene structure and spatial structure answer different questions."
}
```

## 결과 해석

유전자 쌍 차이의 평균은 순서만 바뀝니다. 연속 행 거리는 보통 달라지며 여기서는 고정된 직선 이웃을 나타냅니다.

## 추가 실험

좌표와 발현을 함께 섞어 보존되는 관계를 설명하세요.

## 한계

예제는 하나의 수치적 메커니즘을 분리합니다. 실제 데이터에서의 중요성이나 인과관계를 증명하지 않으며 공식 평가기를 대체하지 않습니다. 가정, 출처와 원본 데이터를 보존하고 허용된 데이터로 검증하세요.

기계의 도움으로 각색한 판본이며, 원어민의 검증된 교정을 받지 않았습니다. 수정을 환영합니다. 사실관계의 기준은 영어판이고 코드와 수치는 유지됩니다. 자동 검사는 언어 품질을 보증하지 않습니다.

[Source code](../../tools/experiments.py) · [Canonical English](../en/20-gene-versus-spatial-structure.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
