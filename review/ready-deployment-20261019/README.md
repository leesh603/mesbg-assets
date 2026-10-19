# 출전 준비 배치·악세력 영입 검증

출전 준비 화면에 실제 전장을 표시하고 출전/대기 선택, 클릭·드래그·터치 배치, 확대/전체 보기를 연결했다. 선택한 부대와 위치는 자동 저장되며 출전 버튼으로 곧바로 전투를 시작한다. 지도 변경 시 다음 전장에 맞게 다시 배치한다. 보유 인원·영입은 출전 포인트와 분리한다.

트리단 기마형의 잘못된 선세력 등록을 게임 카탈로그, 원본 유닛 메타데이터, 도감 데이터에서 악세력으로 수정했다. 악세력 영입은 추첨뿐 아니라 선택·확정·직접 영입에서도 위력의 반지 보유를 검사한다. 이전 저장의 잠긴 후보는 제거하고 선택 수량을 다시 연결하며, 이미 보유한 동료는 보존한다.

검증 결과:
- `node --test tests/ready-deployment.test.cjs tests/warband-deployment.test.cjs tests/warband-points.test.cjs`: 29/29 통과.
- `node --test tests/recruit-dark-events.test.cjs`: 9/9 통과. 영입 분포·악세력 해금·70스테이지 난입 시뮬레이션 포함.
- `node tests/ready-deployment-browser.cjs`: Chromium 실제 실행 통과. 마우스 배치, 포인트 초과 차단, 출전/대기 교체, 저장/이어하기, 390px 모바일 화면, 실제 터치 배치, 즉시 출전 및 캔버스 복귀 확인. JavaScript 오류 0건.
- `node tools/build.js --online-only`: 배포 HTML 재생성.

`browser-report.json`은 실제 좌표와 출전 결과다. `ready-desktop.jpg`, `ready-mobile.jpg`는 출전 준비 화면이다.
