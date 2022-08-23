# 앱 버전 관리

## 1.0.0 (Major.Minor.Patch)

> Major : 기존 버전과 호환성이 깨질만한 변경사항이 적용 된 경우 변경.
> Minor : 기존 버전과 호환성을 지키면서 기능이 추가된 경우 변경.
> Patch : 기존 버전과 호환성을 지키는 범위 내에서 버그가 수정 된 경우 변경.

- 기본적으로 시맨틱 버저닝을 기초로 함. (https://semver.org/lang/ko/)

### Version Histories

##### 1.1.1

- 버전 관리 시작.

##### 1.2.0

- 플레이 종료 헤더 우측 부분에 비정상 카트 조건부 표시.
- 대시모드 모바일 (식음 관리자) 주문 목록 존재 여부 메시지 컴포넌트 변경.
- 주문 목록 있을 경우 오디오 파일 재생.
- 현황판 장애 카트(캐디) 숨김 처리.
- 전체라운드 스코어카드 모달화면 수정.
- 단체라운드 단체스코어 모달화면 수정.
- 단체라운드 엑셀 다운로드.
- 단체라운드 search 조회일 추가.
- 단체라운드 신페리오 적용됨 -> 시상설정 연결.
- 증명서 발급 조회.
- 증명서 모달 vue파일 생성.

##### 1.2.1

- 전체라운드 back-end 랑 데이터 맞춤.
- 단체라운드 서비스 준비중 toast 메세지.
- 전체라운드 스코어 프린트 화면데이터 수정.

##### 1.3.0

- 스타트대기/10T대기/플레이종료 캐디 목록 컴포넌트 모듈화.
- 스타트대기/10T대기/플레이종료 캐디 목록 정렬 로직 추가 (예약 시간).
- 스타트대기/10T대기/플레이종료 캐디 목록 첫/막팀 구분 색상 설정.
- 스타트대기/10T대기/플레이종료 캐디 클릭 시 메시지 보내기 기능 구현.
- 메신져 박스에서 메시지 클릭 시 해당 캐디에게 메시지 보내기 기능 구현.
- 메신져 보내기 컴포넌트 요구사항 반영 및 기능 추가 및 개선.

##### 1.4.0

- 단체라운드 스코어카드 화면 수정.
- 단체라운드 스코어카드 인쇄하기 화면.
- 단체라운드 랭킹 화면 수정.
- 단체라운드 랭킹 인쇄하기 화면.
- 전체라운드 기념사진 모달창 생성.
- 단체라운드 시상(신페리오) 적용.(시상 업데이트 개발중)
- 관제관리 진행시간 표준설정 api만 연결.
- 메인 현황판의 플레이 종료 내부 비정상 카트 모달 창 마우스 오버 시 캐디 정보 표시 기능 구현.
- 메인 현황판에서 캐디 선택 후 메시지 클릭 시 정상적으로 타겟팅 되지 않는 부분 수정.

##### 1.5.0

- 메인 현황판 비정상 카트 캐디 선택 시 메시지 보내기 기능 추가.
- 메인 현황판 메신져 알림 설정(ON/OFF) 기능 추가.
- 메인 현황판 새로운 메시지 확인 로직 및 알림 기능 추가.
- 메시지 송신 화면 캐디명 검색 기능 개선.
- 메시지 알림 시 소리 추가.

##### 1.5.1

- 관리자 페이지 라운드 API 401 Unauthorized 버그 처리.

##### 1.6.0

- 마우스 오버 시 캐디 정보 표시할 때 데이터 표현 구조 변경.
- 관리자 페이지 라운드 관리 탭 표시 될 때 조회일 오늘 날짜로 입력된 상태로 표시.
- 메인 현황판 메시지 알림 시 가장 최근에 받은 메시지를 텍스트로 표시.

##### 1.6.1

- 전체 라운드 사진/동영상 및 클럽체크 이미지 API 수정 및 기능 개선.
- 불필요한 코드 제거.
- 메인 현황판 캐디 마크에 가려 마우스 오버 안되는 부분 개선.
- 메신져 박스 마우스 오버 시 텍스트 커지는 부분 제거.
- 불필요한 코드 제거 및 코드 안정화.

##### 1.6.2

- PWA 관련 에러 제거.

##### 1.7.0

- 메인 현황판 지도로 보기(프로토타입) 추가.
- 메인 현황판 지도로 보기 캐디 마우스 오버 시 캐디 정보 표시 추가.
- 메인 현황판 지도로 보기 캐디 클릭 시 메시지 보내기 기능 추가.

##### 1.7.1

- 메인 현황판 지도로 보기 브라우저 사이즈 조정 시 좌표 깨지는 부분 처리.
- 메인 현황판 지도로 보기에서 메시지 전송 안되던 버그 처리.
- 메인 현황판 지도로 보기 이미지 사이징 최적화.

##### 1.8.0

- 라운드 api 401 ERROR -> 로그인 화면 이동로직 추가.
- 라운드 조회일 달력으로 변경.
- 증명서 발급.
- 진행시간 표준설정 조회기능.
- 진행시간 실시간 조회기능.

##### 1.9.0

- 메인 현황판 지도로 보기 내장객 검색 기능 추가.
- 메인 현황판 지도로 보기 캐디명 검색 기능 추가.
- 메인 현황판 지도로 보기 캐디 마크 및 사이즈 개선.
- 메인 현황판 지도로 보기 단체 지정 기능 추가.
- 메인 현황판 지도로 보기에서 다중선택 사용 불가 메시지 추가.
- 메인 현황판 지도로 보기에서 캐디 보기 설정(캐디 텍스트) 사용 불가 메시지 추가.
- 관제관리 진행시간 조회 기간조회기능 추가.
- 증명서발급 화면 수정.
- 대시보드 (식음 관리자) 주문 현황에서 주문 목록 컬럼 데이터 표현 개선.
- 전체라운드 스코어카드 sms 전송기능.

##### 1.9.1

- 메인 현황판 지도로 보기에서 데이터 새로고침 시 아이콘 클리어 안되는 부분 수정.

##### 1.10.1

- 로그인 후 로그인 화면으로 진입 시 홈화면으로 가도록 변경.
- 사용자 권한 별 로그인 시 리다이렉트 다르게 설정.

##### 1.11.1

- 진행시간 표준설정 수정기능.

##### 1.12.0

- 사용자 권한과 관련하여 로그인 시 수행되는 로직 프로세스가 개선되었습니다.
- 사용자 권한에 따라 홈 화면에 표시되는 서비스 목록들이 다르게 보입니다.

##### 1.12.1

- 사용자 권한과 관련해서 식음관리자 페이지의 경우 권한 허용 여부와 관계없이 홈화면에 나타나도록 설정 (추후 서버 작업 완료되면 처리할 예정).

##### 1.12.2

- 대시보드 (식음관리자) 주문 목록 수량 이상하게 뜨는 부분 처리.

##### 1.12.3

- 대시보드 (식음관리자) 테이블 폭 비율 조정.

##### 1.13.0

- 메인 현황판 지도로 보기에서 첫/막팀 아이콘 표시.

##### 1.14.0

- 로그인 시 권한 관련 비교 로직 변경.
- 대시보드 모바일 (식음관리자) 캐디 이름 클릭 시 정보 캐디 표시.
- 메인 현황판 대시보드에서 캐디 설정 보기 신입 마크 추가.

##### 1.14.1

- 대시보드 아이콘 클릭 시 메인현황판이 아닌 경우 이벤트 로직 실행하는 부분 수정.

##### 1.15.0

- 대시보드 모바일 (식음관리자) 새로운 주문 메시지 사이즈 조정.
- 메시지 수신 모달 디폴트를 받은 메시지로 변경.

##### 1.16.0

- 단체라운드 랭킹기능.

##### 1.17.0

- 단체라운드 랭킹 화면수정, 엑셀다운로드, 인쇄하기 기능추가.

##### 1.18.0

- 사용자 비밀번호 90일 경과 시 비밀번호 변경할 수 있도록 기능 추가.
- 단체라운드 랭킹 화면 UI 개선.
- 단체라운드 시상자 변경기능.
- 날짜 포맷 형식 변경(YYYYMMDD->YYYY.MM.DD).

##### 1.19.0

- 메인 현황판 단체 생성 기능 추가 (헤더 부분의 단체 지정 혹은 캐디 아이콘 클릭 후 설정 모달에서 단체 생성으로 가능).

##### 1.20.0

- 증명서 발급 수정기능추가.
- 증명서 발급 화면 UI 개선.

##### 1.20.1

- 증명서 발급 반응형으로 변경.

##### 1.21.0

- 앱 설정 페이지 기본 레이아웃 구조 구현.
- 앱 설정 페이지 대회 관리 기능 구현.
- 앱 설정 페이지 대회 목록에서 참가자 조회 기능 구현.
- 앱 설정 페이지 대회 목록에서 조회 API에 대한 HTTP 메소드가 변경됨(POST -> GET)에 따라 클라이언트 코드 수정.
- 앱 설정 페이지 홀/그린 좌표 관리 기본 레이아웃 구조 구현.
- 메인 현황판 단체명 변경 기능 추가 (캐디 아이콘 클릭 후 단체 클릭 시 단체명 변경 버튼 클릭).

##### 1.22.0

- 전체 골프장 설정 수정기능추가.
- 전체라운드 화면 UI 개선.
- 앱 설정 페이지 좌표 관리 좌표 조회/수정 기능 구현.
- 앱 설정 페이지 좌표 관리 기타 좌표 목록 조회/수정 구현.
- 앱 설정 페이지 태블릿 관리 기본 레이아웃 구조 구현.
- 앱 설정 페이지 태블릿 관리 태블릿 목록 조회 기능 구현.
- 앱 설정 페이지 대회 목록 구분(공개/비공개) 필드 추가.
- 앱 설정 페이지 대회 목록 대회 생성 기능 추가.
- 앱 설정 페이지 대회 목록 스크롤 개선.
- 단체 라운드 랭킹 소스개선.
- 홀아웃 승인 화면 UI 생성.
- 홀아웃 승인 조회 API 기능.
- 증명서발급 화면 페이징 css 추가.
- 라운드관리, 관제관리 화면 미디어 사이즈 조절 css 추가.

##### 1.23.0

- 홀아웃 승인 API 기능.
- 단체라운드 랭킹 인쇄 css 추가.
- 전체라운드 클럽항목 화면 UI 생성.
- 전체라운드 클럽항목 조회 API 기능.
- 단체 색상 박스 모달에서 선택된 색상에 대한 표시 효과를 한 눈에 확인할 수 있도록 개선.
- 캐디 설정 보기에서 단체 클릭 시 현재 선택된 캐디의 단체가 선택된 단체로 즉시 변경됩니다.

##### 1.23.1

- 지도로 보기에서 수평 스크롤 생기는 버그 처리.

##### 1.23.2

- 지도로 보기에서 데이터 새로고침 시 단체 지정 효과 풀리는 버그 처리.

##### 1.24.0

- 홈 화면 UI 개선.

##### 1.24.1

- 전체라운드 클럽항목 조건 구문 추가.

##### 1.25.0

- 관리자 페이지 전체 골프장 설정 구조 및 설계 개선.
- 관리자 페이지 UX/UI 및 기능 개선.
- 관리자 페이지 진행시간 표준설정 업데이트 안되는 버그 수정.

##### 1.26.0

- 대시보드 식음 관리자 모드인 경우 홀 막대에 그린 이미지 표시.
- 앱 설정 페이지에서 좌표 관리 탭 숨김 처리.
- 대시보드 지도 보기에서 각각의 사업장에 따른 동적 이미지 적용.
- 관리자 페이지 홀아웃 승인 에러 처리.
- 관리자 페이지 단체 라운드 랭킹 인쇄하기 비활성화.

##### 1.27.0

- 관리자 페이지 단체 라운드 랭킹 체크박스 최대 선택 수 제한 (6개).
- 관리자 페이지 단체 라운드 랭킹 모달 UI 개선.
- 메인 현황판 지도로 보기 코스 좌표값 불일치 수정.

##### 1.27.1

- 관리자 페이지 단체 라운드 랭킹 모달 UI 깨짐 현상 처리.
- 불필요한 코드 제거.

##### 1.27.2

- 메시지 모달 홀 선택 시 캐디가 정상적으로 선택되지 않는 부분 수정.

##### 1.28.2

- 단체라운드 랭킹 모달 전후반 체크박스 기능 추가.

##### 1.28.3

- 관리자 페이지 전체 라운드 스코어 카드 인쇄하기 CSS 깨지는 버그 수정.

##### 1.29.0

- 1280*1024 해상도 기준 css 수정.
- 전체라운드 기념사진/클럽사진 이동기능 화면추가. (2021-11-12 주석처리)
- 전체라운드 스코어 모달창 수정버튼추가. (2021-11-12 주석처리)

##### 1.30.0

- 전체라운드 기념사진/클럽사진 이동(스위칭) API 기능.

##### 1.30.1

- 전체라운드 스코어 모달창 css 깨지는 버그 수정.

##### 1.31.0

- 전체라운드 스코어 카드 수정기능.
- 전체라운드 SMS전송 모달창 화면 UI 개선.

##### 1.32.0

- 로그인하게 되면 관리자페이지 목록 페이지로 이동

##### 1.33.0

- 전체 골프장 설정 UI화면 수정.
- 단체라운드 대회설정.
- 단체라운드 랭킹모달 수정.

##### 1.34.0

- 단체라운드 대회설정 화면 UI 개선.
- 단체라운드 랭킹모달창 스코어카드 화면에 잘못 표기된 데이터 수정.
- 단체라운드 대회설정 목록으로 버튼추가.
- 단체라운드 대회설정 저장 후 목록으로 이동하도록 수정.

##### 1.35.0

- 전체라운드 기준일(오늘날짜)로부터 3일 이전, 이후 고객이름 마스킹처리.
- 단체라운드 대회설정 화면에서 이전화면으로 넘어갈 때, visitDt가 없는 경우 visitDt setting 추가.
- 진행시간 실시간 화면 UI 개선(NO로 셀병합)
- 진행시간 실시간 정보 미정의로 인해 주석처리.

##### 1.36.0

- 전체라운드 기준일 3일 이후 고객이름 null 값으로 들어올 경우 핸들링.
- 전체라운드 기준일 3일 이전 고객이름 노출.
- 전체라운드 스코어카드 SMS 모달 1920*1080 에 맞게 화면 UI 조정.
- 단체라운드 랭킹 노출 조건문 수정.
- 진행시간 실시간 전반코스조회 필터링 추가.

##### 1.37.0

- 전체라운드 리스트,스코어카드 기준일 3일 이후 고객이름 * 값으로 넘어오는 것 공백처리.
- 단체라운드 스코어카드 기준일 3일 이후 고객이름 * 값으로 넘어오는 것 공백처리.
- 홀아웃승인 고객이름 노출.

##### 1.38.0

- 전체라운드, 단체라운드, 증명서 발급, 진행시간 조회, 진행시간 통계 Loading indicator 추가.
- fontawesome cdn 방식 제거, 다운로드 방식 적용.(all.css -> fontawesome.css 파일이름변경.)

##### 1.39.0

- 라운드 룰 설정 체크박스 선택과 랭킹모달창 매핑 오류 수정.
- 라운드 룰 설정 최대6개로 제한기능 추가.
- 라운드 룰 설정 저장 후 해당 단체팀 랭킹모달창 이동.
- 단체라운드 랭킹 내장객 이름 수정

##### 1.40.0

- 단체라운드 룰 설정 저장 시 confirm 창 생성.
- 단체라운드 랭킹 스트로크핸디 체크여부에 따라 handyScore 변경.
- 단체라운드 시상자 이름 수정.

##### 1.41.0

- 진행시간 조회 정렬.
- timeutil null 처리.

##### 1.42.0

- 진행시간 조회 엑셀다운로드 기능추가.
- 진행시간 조회 기존소스 -> loadsh orderBy 로 변경.
- 마크인포바 오타 수정.

##### 1.43.0

- 식음관리자 현황판 메뉴명 노출기능 추가.
- 전체현황판 10T대기 주문이 있을 시 css
- 식음관리자 10T대기 주문이 있을 시 css

##### 1.44.0

- 전체현황판 10T대기 주문 css > 첫팀, 막팀
- 식음관리자 주문목록 화면 수정.
- 식음관리자 좌표이상현상 수정.

##### 1.45.0

- 진행시간 평가 퍼블리싱
- 대시보드 모바일 짤림현상 수정.
- 시상설정 상단 핸디모드 추가.
- alert창 -> toast message 로 변경.

##### 1.45.1

- 단체 랭킹 스코어 모달 undefined 처리.

##### 1.45.2

- 단체라운드 스코어, 랭킹버튼 노출조건 수정.
- 단체라운드 랭킹 스코어 모달 undefinded 처리.

##### 1.46.0

- 시상설정 핸디모드 추가개발.

##### 1.46.1

- 시상설정 핸디모드 신페리오, 스트로크핸디 체크박스 안 막아지는 이슈 처리.
- 시상설정 핸디모드에 따른 프린트 화면 수정
- 단체라운드 랭킹모달 핸디스코어, 넷스코어 수정 안되는 이슈 처리.(설정한 핸디모드에 따라서 수정가능)

##### 1.47.0

- 진행시간 평가

##### 1.48.0

- 페이징 클래스 pop -> shift 변경
- 페이징 변경에 따른 진행시간 조회 정렬 쪽 수정
- 진행시간 평가 프론트 sort 제거
- 진행시간 평가 코스 필터링 전체 추가.
- 진행시간 조회 기간조회 오늘날짜로 set
- 모바일 식음관리자 대쉬보드 깃발 아이콘 주석
- 진행시간 통계 기간조회 오늘날짜로 set
- 진행시간 통계 visitDt -> yyyy.mm.dd

##### 1.49.0

- 진행시간 실시간 코스 필터링 전체추가.
- 진행시간 평가 트랜지션 적용

##### 1.49.1

- 진행시간 평가 bookgTime 포맷팅 메소드 제거.

##### 1.50.0

- 대시보드 모바일 식음관리자 주문 목록 화면 버튼 css 수정

##### 1.51.0

- 캐디관리 > 캐디정보 추가

##### 1.51.1

- 페이징 이상현상 수정
- 대시보드 모바일 식음관리자 주문목록api 호출 시간 셋팅.

##### 1.52.0

- 대시보드 지도별 마크 색상 조건 변경

##### 1.52.1
- 대시보드 지도별 마크 색상 조건 변경2

##### 1.53.0
- 전체라운드 스코어 모달 오버타수 -> 총타수 변경
- 단체라운드 룰 설정 6개 제한 제거

##### 1.54.0
- 모바일 대쉬보드 내장객 overPar 표기

##### 1.55.0
- 단체라운드 모달 니어리스트 값 업데이트 부분 이슈 수정

##### 1.56.0
- 전체라운드 안전서약 기능 추가 

##### 1.57.0
- 캐디평가 기능 추가

##### 1.57.1
- 캐디평가 페이징 이상현상 수정


##### 1.58.0
- 랭킹 모달창 이슈 수정 (핸디모드)

