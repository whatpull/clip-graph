# clip-graph
JavaScript graph and bundle process
자바스크립트 번들러 셋업 및 과정 이해

1. 자산(Assets) 생성
- 보유하고 있는 파일 자산 정보
(Source Code translate ES Code : Babel)

2. 그래프(Graph) 생성
- 자산(Assets)의 연결 그래프(Graph) 정보

3. 번들(Bundle) 진행
- 그래프(Graph) 정보 기반 즉시 실행 익명함수 형태의 결과 소스 생성

그래프 생성 후 화면에 Dependencies의 상황을 캐치
1차 : 프로젝트에 필요한 구조 및 메타정보를 한번에 캐치할 수 있는 통합작업 진행
2차 : 메타 정보 기반 프로젝트 분석 및 가상 실행 후 퍼포먼스 체크
3차 : 권장 가능한 코드리뷰 적용(AI)
