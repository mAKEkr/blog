---
title: 토이 프로젝트 마감기 - 더모아프로
subtitle: 10일간의 토이프로젝트 개발 대장정
categories:
  - programming
date: 2024-01-20
---

더모아프로(themore.pro)는 신한카드중 The More 신한카드의 특성을 이용하여 최대한의 혜택을 뽑아먹는(체리피킹) 사람들을(체리피커) 위한 사이트이다. 물론 나도 그중 한명이다.

프로젝트 시작 계기와 스택 결정, 준비과정, 약 10일 동안의 토이 프로젝트 개발기등을 적어볼까 한다.

## 제작 계기와 프로젝트 스택 결정

원래 [themorehelp.com](http://themorehelp.com) 이라는 사이트가 존재했다. 이 사이트 운영자분께서 유지보수 및 운영을 중단하신걸 계기로 빠르게 계산기를 만들어야겠다 라고 생각했다.

2024년에는 뭔가 토이프로젝트 여러개를 만들어보고 싶었는데, 바로 아이디어가 걸려들었기에 주저없이 개발을 추진하기로 했다.

데이터 소스를 비자, 신한은행에서 받아와서 계산하는게 핵심이였기에 백엔드가 필수적이였다. (값을 리퀘스트마다 불러오는건 아니여서 다행이였다)

이 서비스의 핵심은 단순히 환율값만 받아와서 계산하는것이 아닌 핵심 기능인 정확한 계산식에 대한 확인 및 검증이 우선시 되어야 했는데, 무엇보다 계산식 자체가 꽁꽁 숨겨져있었고, 이에 대해서 실제로 계산식을 검증하는 부분이 너무 쉽지 않았다.

아무래도 결제 수수료 관련한 부분이다 보니 민감해서 숨겨진건가 싶을정도로 상당히 접근성이 좋지 않았다.

계산식을 구한 뒤 프로그램으로 구현이 1차적으로 이루어졌고, 그 뒤에 우리가 말할 수 있는 ‘기술 스택’에 대한 결정이 이루어졌다.

프로젝트를 시작하면서 많은 생각이 있었지만, 이미 여러 개발자분들이 개발을 시작하셔서 나도 주저없이 빠르게 뛰어들어야 했고, 빠르게 결과물을 냈어야 했기에, 가장 친숙하고 빠르고 그리고 확실하게 개발할 수 있는 스택으로 프론트엔드를 개발하는것으로 결정하였다.

### 스택 결정하기

**프론트엔드**

- Vue 3
- Pinia
- Tailwindcss
- Vite

**백엔드**

- Supabase
- Cloudflare Pages

이중에서 Supabase만 유일하게 처음으로 써보는 스택이였고, 나머지는 한번이라도 엎어진 프로젝트에서 써보았거나 아니면 써본적이 있는것들이였기에, 가장 빠른 생산성을 추구할 수 있을것같았다.

Supabase로 결정한 이유는 쿼리를 얼마나 써야하는지 몰랐기 때문이다.

`MySQL`과 유사한 `Vitess`에 대한 클라우드 서비스를 제공하는 `Planetscale`도 놓고 고민했는데, 이쪽은 과금체계가 읽기/쓰기 액션에 대한 과금이 이루어져서 어느정도의 트래픽이 올지 모르고 어느정도로 예측이 가능한 송수신 트래픽단위로 과금체계가 이루어진 Supabase를 골랐다.

### 타입스크립트 덜어내기

최근에 타입스크립트를 공부했다고 말한지도 얼마 안되어서 이번 토이프로젝트에서는 타입스크립트를 포기할수밖에 없었다.

타입스크립트에서 아직 지원되지 않는 모듈에 대한 `declare(.d.ts)` 파일 을 채워줘야 되는 문제라던가, 높은 엄격함으로 인하여 프로젝트 개발 및 관리에 오히려 발목을 잡힐것이라고 판단했다.

그리고 이 우려는 다행히 적중했다. 내가 설치한 vue의 버전과 eslint가 맞지않았고, 템플릿 파서의 오류인지 setup에 import했음에도 변수가 지정되지 않았거나 한번도 사용되지 않았다는 오류가 발생하는 문제가 아직도 발생하고 있다. 아마 eslint랑 엮어서 빌드하게끔 설정된 프리셋으로 설치했다면,백프로 꼬여서 제대로 할 수도 없는 상황이였을것이다.

시간이야 들이면 당연히 수정 다 해서 타입스크립트를 이용했겠지만, 한시가 급한 상황이니 컴파일 및 검증 과정을 거치지 않는 js의 빠른 생산성이 오히려 득을 가져다 줬다고 생각한다.

타입스크립트 반대론자는 아닌데, 빠른 생산성에 있어서는 타입스크립트는 여전히 독이라고 생각한다.

## 프로젝트의 차별성 고민하기

확실하게 나는 슬로스타터였다. 개발 1일차 전에 갑자기 엑셀 시트를 운영하던분께서 부트스트랩 기반의 사이트를 내놔서 자칫 잘못하면 뒤쳐질 수 있다는 생각에 한시가 급한 상황이였다.

그래서 내 사이트만이 가질 수 있는 차별점을 생각해보기로 했다.

- 기존에 타인이 운영중이던, 그리고 현재 만들어진 사이트들 모두는 모바일 친화적 사이트가 아니였다. 모바일 친화적 UI로 개발을 시작하자.
- 외국 현지, 네트워크 상황이 여의치 않은 곳들에서 계산하는 분들이 계시므로 낮은 용량으로도 제공이 가능하도록 맞춰보려고 했다.
- 기존에 사용자들이 겪던 불편함을 최우선 과제로 잡고 개발해보자
    - 이전날짜의 데이터에 대한 조회 가능여부 등등
- 무엇보다 서버비를 납부 안해도, 플랜 제공이 변경되지 않는 이상 지속적으로 유지가 가능한 형태를 가져가고 싶었다.

## 대강의 타임라인

- 1일차 (1월 3일)
    - 서비스 이름 결정 및 도메인 구매
        - 기존에 [Tradehelper.pro](http://Tradehelper.pro) 라는 서비스를 운영하고있어서, 그냥 [themore.pro](http://themore.pro) 로 빠르게 결정했다.
    - 프로젝트 셋업, 계산식에 검증을 위한 프로토타입 개발
    - 백엔드/프론트엔드 개발식 동일화를 위한 공통 모듈 개발
        - 둘다 자바스크립트라 정말 다행이다.
    - 백엔드 크롤러 데이터 검증 및 테스트
    - Supabase 기능 익혀보기
        - Supabase를 통한 insert는 아직도 어색해서 백엔드엔 Prisma가 깔려있다
- 2일차 (1월 4일)
    - 프로젝트 UI에 해당하는 레이아웃, 아이콘 디자인
        - 레이아웃의 경우 하드코딩 디자인으로 즉흥적으로 했고, 아이콘 디자인의 경우 그냥 주머니에 있던 카드 꺼내서 보고 흠.. 하면서 포토샵으로 그대로 구현했다.
    - 지속적인 프론트엔드 작업
- 3일차 (1월 5일)
    - Git 저장소 생성 및 처음 커밋
    - 반응형 준비
    - 백엔드 모듈 개인 서버 설치 및 크론 테스트 진행
- 4일차 (1월 6일)
    - 핵심 기능(계산 부분) 과 일부 기능 구현을 통한 부분 배포 및 비공개 테스트 진행
        - 네이버의 비공개 카페에 테스트라곤 적지 않았지만, 테스트 하는 수준으로 진행을 했다. 늦게 나온 서비스임에도 불구하고 상당히 반응이 좋아서 본격적으로 개발해야겠다 라는 느낌이 들었다.
    - 일부 지인들에게도 테스트 부탁하여 몇가지 디테일이 부족하던것들 수정했다.
        - 국기 이모지가 특정 디바이스 혹은 특정 브라우저에서는 표시되지 않는 문제라던가, 웹폰트가 일치하지 않아 생기는 문제라던가 좀 디테일 부분에서 자잘자잘하게 손을 봤다.
    - 메세지에 대한 UX개선
        - 해당 서비스를 개발하면서, 자꾸 금융권의 단어들을 듣다보니 ‘외환 송금보낼때’보다 ‘전신환매도율’이라는 단어가 달라붙고, 자꾸 피곤한 상황에서 문구를 적다보니 어떤걸 표현하려는지에 대한 혼동이 생기면서 지속적으로 홈페이지 내의 문구의 내용들을 보다 명확하게 알 수 있도록 수정했다.
- 5일차 (1월 8일) (7일에는 가족과 관련된 일정떄문에 하루종일 밖에 있었다)
    - iOS쪽 스타일링 최적화 문제 개선
        - 이건 몇년이 지나도 그대로인거 보면 참 진짜 이걸 어떻게 해야되나 싶은 생각이 들었다. 특히 폰트 크기 작으면 무조건 인풋에 줌들어가는거. 덕분에 모바일페이지가 엄청 두툼하고 둔탁한 느낌이다.
        - 시각장애인분들중에 완전히 시력을 잃으신분이 아니라면 페이지 줌을 해서라도 봐야하는 경우가 있어서 user-scalable 옵션은 건드리지 않기로 했다.
    - 데이터 범위 확대
        - 데이터 범위를 확대하면서 데이터 포맷도 변화를 주었다. 원래 통짜 json인데, 사용자들에게 선택하게 해서 쿼리 범위를 좁혀서 보내게끔 하면 좀더 트래픽 관리에 유리하지 않을까 생각했다.
            - 예상은 적중했고, 기존에 모든 데이터를 받아오던 JSON 형태의 일 300명정도의 사용자보다, 현재의 일 1000명정도의 사용자의 트래픽이 훨씬 낮다.
            - 아마 PostgreSQL에서 JSONB 포맷으로 해도 select같은걸 통해서 JSON의 일부만 가져올 수 있게끔 구현이 가능할지도 모르겠지만, PostgreSQL은 정말 전혀 모르는 상태로 썼다.
    - 스트레스 테스트 진행
        - 스트레스 테스트는 외부 커뮤니티중 재테크 관련해서 트래픽이 높은 뽐뿌의 재테크포럼을 이용하였다.
            - 트래픽 테스트는 당연히 외부에 공개해서 하는게 국룰아닌가?
            - Supabase의 Free Plan으로 충분히 감당가능한 대역폭인지, 그리고 Cloudflare의 Pages가 정말로 신뢰할만한 수준인지가 궁금했다.
            - 결과적으로, Cloudflare의 대시보드 기준 순 방문자 7300명정도의 방문이 이루어졌다.
- 6일차 (1월 9일)
    - 스토어 관련 라이브러리인 Pinia 도입
        - 컴포넌트들과 데이터를 공유해야 할 일이 없다고 생각했는데, 모달이라던가, 여러가지 디자인이 추가되다보니 빠르게 지금이라도 도입하는게 맞다 싶어서 도입했다.
        - 아무리 가벼운 프로젝트라도, Store가 도입되어야 할 때가 언제인지 알게 된것같다.
- 7일차 (1월 10일)
    - 수기로 데이터를 기입해야 할 부분에 대해서 수기처리
        - 각 국가 국기 이모지라던가, 통화에 대해서 부르는 방식, 그리고 티커(KRW, JPY 같은)에 대한 검증을 재차 확인했다.
- 8일차 (1월 11일)
    - Toast와 같은 UI 컴포넌트 개발
- 9일차 (1월 13일)
    - 애드센스 도입을 위한 SEO 준비
    - Supabase 프론트엔드 클라이언트 삭제 및 fetch 통한 자체 리퀘스트로 용량 절감
    - 디자인 세밀한 부분들 조정(마진, 패딩)
    - 실험적 기능 도입(붙여넣어 환율 관련 정보 조회)
- 10일차 (1월 14일)
    - 사이트 내 다크모드 도입
    - 공식적인 기능개발 종료

## 프로젝트를 개발하면서 느낀것

여기서부터가 진짜 개발 후기가 아닐까.

### Less Dependencies, Less Bandwidth.

원래부터 의존성 라이브러리/패키지에 대한 설치를 별로 달가워하지 않아서 정말 필요한 만큼만 설치하면서 직접 개발하기로 생각했다.

클라우드플레어 페이지가 해외에서 어느정도의 반응속도일지도 모르고, 계산기 하나 보자고 사용자들이 1MB 넘는 트래픽을 소모하는것을 반가워할것 같지도 않았기 때문이다.

![packages.json의 구성](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled.png)

딱 vue, vue-router, pinia, tailwindcss정도가 프론트엔드에 영향을 주는 패키지라고 보면 된다.

솔직히 용량적인 측면이라면 그냥 쌩으로 바닐라로 개발하는게 용량적인 측면에서 훨씬 낫겠지만, 그렇게 용량을 위해서 이미 트레이드오프한 작업속도를 희생할만큼의 집착적인 최적화는 하고싶지 않았다.

![빌드 후 로그](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%201.png)

이 항목에서 빠진거라면 웹폰트 정도인데 웹폰트를 왜 도입했냐면

- 웹폰트들은 통일성을 위하여 항상 선택하는데, 한글 특성상, 그리고 이모지 폰트도 사용하는데 이모지 폰트의 특성상 너무 용량이 크기에 서브셋 폰트 프리셋을 사용했다.
- emoji 특성상 모든 브라우저에서 동일한 그래픽 렌더링이 되지 않는것이 고민이여서 폰트를 이것저것 고민하다가 결국 호환성이 좋은 `Noto Color Emoji` 폰트를 선택했다. (tossface는 웹폰트를 적용할경우 파이어폭스에서 제대로 렌더링 되지 않았다)
- 그 외엔 웹폰트로 너무 잘쓰고있는 Pretendard를 이용했다.

### UI/UX 신경쓰기

그렇다고, 용량을 신경안쓰면서 UI/UX를 희생했냐 생각하면 난 아니라고 답하고 싶다. 전문적인 UI/UX 개발자분들이 보신다면 다르겠지만, 적어도 난 말이다.

![메인페이지](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%202.png)

![자체적으로 구현한 모달 활성화 시의 컨텐츠](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%203.png)

![자체적으로 구현한 툴팁](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%204.png)

![HTML5의 표준인 date input popup](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%205.png)

일부 HTML 네이티브로 가능한것들은 네이티브로 해결했지만, 아직 정식문서가 아닌것들이라던가(다이얼로그, 모달), 툴팁같은 것들은 그냥 직접 제작해서 해결했다.

진짜 정말 충분히 열심히 노력했다.

### 더 좋아진 Vue

개인적으로 개발하면서 깜짝 놀랐던것들이 몇개가 있었는데, 이걸 굳이 적어보는 이유는 혹시라도 Vue를 사용하지 않거나, 천대하시는 분들에게 ‘Vue는 정말 멋진 프레임워크다’라는걸 알려드리기 위해서다.

이번에 토이프로젝트를 개발하면서도 느꼈지만, 생산성적인 측면에서는 Vue만한게 없다는 생각이 들었다.

### 여러 모델간 바인딩이 가능해진 컴포넌트가 가능해진 Vue 3

vue의 가장 특장점중 하나라고 생각하는 `v-model`이 이젠 컴포넌트간 통신(부모-자식 컴포넌트간)에 있어서 `v-model:alias` 형태로 작성이 가능하게끔 변경되었다. 자식 컴포넌트에서는 `defineModel` 을 통하여 모델 선언을 해주면 이전에 bind했을때 액션을 넘겨주는등 불필요하게 코드가 많이 생성되던 과정을 간소화 할 수 있게된다.

일단은 느린 반영(실시간으로 반영이 필요하지 않은 모델)에 대해서는 여전히 v-model이 아닌 기존 v-bind형태가 유리하다고 생각하지만, 여러 모델을 주고 받아 이를 쉽게 활용할 수 있는것이 큰 장점이 되었다.

![실제 프로젝트 안의 코드. v-model로 받아온 값을 내부에서 어떻게 정의하는지에 대한 예제이다.](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%206.png)

### Setup형태의 스토어를 지원하는 Pinia

Vuex부터 시작해서 Store형태로 상태관리를 하시는 분들에게는 `state`, `getter`, `mutation`등의 단어가 익숙할것인데, 이러한 흐름 자체가 너무 직관적이지 않고, 모듈링하기에 조금 힘들다고 생각해서 나는 마음에 들지 않았었다.

그러던 와중, 최근에 Pinia 측에서 setup 형태의 store를 지원한다고 해서 너무 흥미롭게 봤는데, 별 러닝커브 없이 바로 적용완료했다. 오히려 이전의 `options` 형태로 지원되던 스토어들에 비해 훨씬 더 보기 좋아졌다.

Vue 3의 Setup을 처음 써본 느낌 그대로라고 해야될까.

이러한 움직임은 Svelte의 상태관리를 따라간것인데, 정말 이걸 통해서 너무 편하게 store의 관리를 해낼 수 있었다. 좋은건 바로바로 주저없이 가져오는 Vue 덕분에 정말 편하게 개발한다.

![Vue 내부에서 쓰던 ref라던가 reactive를 그대로 사용하고, setup 형태로 return으로 원하는것들만 내보낼 수 있어서 정말 유익했다.](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%207.png)

Vue 내부에서 쓰던 ref라던가 reactive를 그대로 사용하고, setup 형태로 return으로 원하는것들만 내보낼 수 있어서 정말 유익했다.

## 스택에 대한 평가

### 프론트엔드 - Vue 3, Pinia

더할나위없이 최고다. 긴말하지 않겠다.

### 백엔드 - Cloudflare Pages

Cloudflare Pages의 환경에서 빌드가 전혀 안되어서 빌드할때마다 로컬 컴퓨터에서 빌드 → 파일 업로드를 진행했다.

그나마 파일 업로드가 존재하는게 어디냐.. 싶어서 위안삼지만, 그래도 git에 커밋 한번 올리면 자동으로 deploy까지 해주는것과 내가 대시보드 들어가서 로그인해서 폴더선택하고 업로드버튼 누르고 업로드 확인까지 하는건 너무 다른 과정이다.

vite관련 호환성 문제를 빠른 시일내에 해결해줬으면 좋겠다. 그리고 Worker도 호환성 별로 안좋아서 로컬모드로 디버깅하려고 하면 오류터지는걸 보고 서버리스에서 백엔드 데이터 가져오는건 후일로 미루어두려고 한다.

### 백엔드 - Supabase

Supabase는 외부에 “구글의 Firebase의 대체가능한 서비스” 라고 알려져있는데, Firebase를 써보지 않았지만 일단 컨셉 자체가 ‘데이터베이스 기반 서비스’였다.

RLS라고 불리는 Row-Level Security부터 비롯하여 PostgreSQL에 대해서 어느정도 숙련된 사람들만 해당 서비스를 100% 다룰 수 있고, 뭔가 친절하면서도 불친절한 느낌이 Supabase를 통해 서비스를 운영하면서도 지속적으로 남아있다.

결론적으로, PostgreSQL을 모르고 이 서비스를 시작하겠다? 절대적으로 비추천한다.

Prisma를 통해서 구조를 수정하다가 RLS로 인해 전체 데이터베이스가 꼬여서 다시 재설정을 해야되었던거나 등등.. 자칫잘못하면 사고날뻔한 문제가 많았다. RLS의 작동구조나 원리나 그런걸 모르는데 Supabase에서는 RLS를 무조건 켜길 권장하고, 참 대 혼돈이지 않은가.

물론 이는 내가 PostgreSQL을 잘 몰라서 생긴 문제이기에, PostgreSQL을 능숙하게 사용하시는 분들이라면 해당 서비스를 이용하는데 큰 문제가 없을것이다.

그리고 사용하면서 불만이였던걸 몇가지 적자면

- API를 직접 마음대로 지정하지 못하는 형태
    - 사실상 Row Level Security라고 말하는 방식을 제외하곤 보안방식도 존재하지 않는다. 사용에 주의가 필요하다.
- 리퀘스트의 CORS 설정이 불가능했다.
    - Supabase측에서는 자신들의 엣지 펑션이라고 부르는 서버리스 펑션을 이용하라고 하는데, 서버리스 이용할것같았으면 다른 서비스를 이용했을거란 생각을 왜 모르는걸까?
        - 심지어 월 50만회라는데, 현재 하루에 약 4000건정도의 데이터베이스 요청이 들어오고있다. 아무리 커버 가능하더라도 갑자기 트래픽이 늘으면 서비스 전체가 블로킹되는걸 원치않는다.
    - 그 덕분에 지금 내 서비스의 URL을 다른 웹페이지에서 따서 XHR을 보내면 그냥 프리패스다.
- 악성 IP에 대한 차단조차 불가능했다.
    - 지금도 열심히 index.php등으로 요청을 보내는 악성봇들을 차단하고싶은데, 차단 방법이 전혀없다.
    - 지금도 대시보드보면서 별별 url로 들어오는 리퀘스트들을 그냥 방치하고있다. 대시보드 볼땐 어떤 이상한 리퀘스트가 들어왔을까요 하면서 지켜보고있다.
    - 그래서 클라우드플레어 통한 보안 강화라도 하려 했는데 무료플랜이라 CNAME 등록이 안된다.. 포기.
- API의 문제인데, 정식적으로 UNION 혹은 GROUP BY 쿼리가 안먹힌다.
    - 그래서 별도의 view table을 만들어야한다. 이게맞나? 물론 이거 덕분에 view table방식을 처음 알았다.

다음번에는 꼭 내가 친숙하고 호환성 문제 크게 없는 MySQL을 사용하는 Planetscale을 이용해볼까 한다.

## 프로젝트 지표 및 트래픽

![Cloudflare의 일주일간 대시보드 통계.](https://f.ake.kr/2024-01-20_toy_project_review_themore_pro/Untitled%208.png)

위는 클라우드플레어의 7일간의 트래픽 통계이다. 프론트엔드의 경우 총 538MB정도의 트래픽, 백엔드의 경우 총 100MB정도의 캐파대비 1/50의 준수한 트래픽을 보여줬다. 아마 월 150~200MB정도를 사용한다고 하면 실제 트래픽이 엄청나게 몰려도 충분하게 받춰줄 수 있을거라고 생각한다.

## 마치면서

- 운영비용
    - 도메인 등록비용 3달러
        - 차후 갱신시 13~15달러
    - 끝!

사실상의 메인 개발이 종료되었고, 앞으로는 후순위로 미루어두었던 조금 뒷전이였던것들에 대한 개발, 사용자들의 요청사항이나 자잘한 버그들이 파악되는대로 그것에 대한 수정만 집중적으로 이어나가려고 한다.

솔직히 애드센스등으로 수익조차 낼 수 없는 상황인지라 많은 개발 대비 아웃풋이 없어서 고민이 커진다. 특색있는 기능을 제공하는것만으론 부족한것인지, 애드센스의 반려가 상당히 뼈아프게 다가오는 상황이다. SEO부터 시작해서 많은것을 손봐야 하는 상황이 탐탁치 않다.

애드센스를 위해서 별도의 페이지를 만들 수 있도록 신설하고, 여러모로 나름 열심히 노력을 해보아야 할것같다. 그래서 사실상 마감기라고 적었지만 마감은 아닌것같은 느낌이다.

간만에 너무 빡세게 구른건지 피곤으로 인한 후유증이 상당하다. 술을 두잔만 마셔도 바로 뻗어버린다.

그 외에 집에 있는 홈서버가 멀쩡하지 않을때 작동할 수 있도록 하는 크론잡 형태의 서버리스로의 백엔드 이전이라던가에 대한 고민들이 남아있지만, 일단은 최대한 체력 회복을 하고 천천히 진행해보려고 한다.
