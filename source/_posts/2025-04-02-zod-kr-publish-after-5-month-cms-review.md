---
title: zod.kr 개발 7개월, 오픈 5개월 후기 - CMS 선택 및 개발편
subtitle: 밈으로 프로그래머 기피 1순위인 PHP로 만들어진지 10년도 다되어가는 CMS로 개발하는 이야기
categories:
  - programming
date: 2025-04-02
---

해당 게시물은 [zod.kr 개발 4개월, 오픈 2개월 후기 - 서버 및 서비스편](https://ake.kr/2025/01/12/zod-kr-publish-after-2-month-review-services-and-server/)에서 이어집니다.

[조드](https://zod.kr/)를 오픈하기 전에도, 꽤 많은 생각을 했었다.

> “한국의 CMS환경은 매우 낡았다”
> 

컴포넌트 기반의 프론트엔드/백엔드 개발이 전혀 이루어지지 않고, 아직도 PHP로 ‘~~보드’형태를 찾는 웹페이지들. 동적 렌더링을 하려면 jquery를 찾고, 아직도 ‘빌더’, ‘보드’같은 형태가 자리잡고있다고.

해외는 Strapi와 같은 Headless CMS를 통해 사용자가 원하는 형태의 데이터셋을 갖춘 커스터마이징 가능한 완전 기초부터 집중하는데, 한국은 전혀 그러지 못한다는 생각이 들었다.

무엇보다 이러한 환경을 가속화 시킨것은 변화되지 않는 웹호스팅 환경, 그리고 점점 더 어려워지는 접근성, 그리고 무엇보다 부족했던 웹 환경 구축일 것이라고.

그런 생각을 하면서 개인용 CMS 프로젝트를 몇번 만들고 엎고 반복하기도 수차례, 갑자기 나에게 ‘조드’라는 웹 서비스를 오픈하게 되는 계기가 발생하면서, 내가 “매우 낡았다”라고 칭한 CMS들을 찾아볼 수 밖에 없는 역설적인 상황이 만들어지게 되었다.

## 조드를 시작하며 CMS를 결정하기까지

조드를 구상한 초기에, 개발자로써 “당연히 새롭게 만드는게 답이다!” 라는 결론을 내리고 싶었지만, 그동안 너무나도 많이 봐온 자체 코어 CMS들의 실패사례, 불안정성, 새로운 기술개발을 하기까지의 시간적 여유, 서버 운영의 어려움을 기점으로 “기존의 성공사례가 존재하는 CMS를 사용하자” 라는 결론을 내렸다.

그리고 무엇보다 자체 코어 개발하려다가 망해간 몇몇 커뮤니티들의 사례를 보면서, “자체개발은 하지 말아야겠다” 라는 확신을 얻고 한국 사용자들에게 가장 친숙한, 그리고 가장 활발한 오픈소스 프로젝트를 비교했다.

한국형 CMS중 비교적 지속적인 개발이 진행되고 있는것들은 총 두개.

- 그누보드5
- Rhymix

이 두개를 놓고 어느것을 선택할지 골라야 하는 상황이 있었다. 이중에서 활발한 개발로 치면 그누보드가 맞긴한데.. 활발만 한것같다.

다른 선택지는 없었나? 라고 물어보신다면, 내 정보력이 미약했던건지 없었다. 있더라도 지원이 중단되었거나, 아마도 원하는 기능을 개발하기까지 꽤 오랜 시간이 걸리거나 했을것들이 많았을것이라고 생각한다. 아니라면 자체 서버에 둘 수 없었거나.

일단 내 기억속에서 개발 중단된 CMS는 XpressEngine 3와 KimsQ. 그리고 고려도 안한건 워드프레스 확장형 게시판들(KBoard, 레인보드 등) 정도가 있었다고 알려드릴 수 있을것같다.

### 그누보드5

그누보드같은 경우에는.. 솔직히 말씀드려서 이런 물건이 아직도 2025년도까지 돌아간다는게 상당히 웹 환경에 실례가 아닐까 싶을정도로 상당히 구식 서비스라고 생각하고있다. “이런 말을 할 자격이 있냐!” 라고 하신다면, [그누보드 5의 이전, 그누보드 4s까지 만져봤던 사람](https://sir.kr/g5_skin/686?sfl=wr_name%2C1&stx=%EC%97%90%EC%B9%B4)이라 이런 말을 할 수 있을 정도의 자격은 되지 않을까 생각한다. 그리고 무려 2012년도부터 CodeIgniter 1.x버전으로 코딩하고 2016년에는 Laravel 책펴들고 공부했었으니까. PHP한정이면 가능한것같다. (지금에 와서 보는거지만, 이때도 반응형에 미쳐서 반응형 테마 만들고 난리가 아니였구나 싶다)

그나마 최신 자료들중에 리빌더라는 꽤 모던한 디자인과 환경의 패키지가 판매되는걸로 보았는데, 소스코드를 확인하지 않았음에도 불구하고 이마저도 레거시일것이라는 막연한 두려움과, 혼자서 감당하기엔 너무 무거운 수준의 프론트엔드일거라고 생각해서 최적화 불가능함으로 판단하여 그누보드는 완전히 보류하는것으로 결정했다.

“소스코드도 보지않고 결정하기에는 무리가 맞지 않느냐!”라고 말씀하시겠지만, 무엇보다 그누보드의 ~~빌더들의 코드퀄리티를 그동안 보아왔던 나였기에, 코어수정도 서슴없이 진행되며 코어와 서드파티의 분리가 제대로 진행되지 않는 그누보드는 어떤 보안 및 성능문제를 일으킬지 몰랐다.

물론 백엔드를 파이썬으로 갈아엎은 그누보드6가 있었지만, 이건 프로덕션으로 활용할 수 있는 안정성을 가진 물건이 아니라고 판단했고, 무엇보다 개발하면서 파이썬을 실제 프로덕션 수준으로 활용할 만큼의 사용 이력을 내가 갖고있지도 않았다.

(* 게시물 작성 이후 알게된것인데, Python기반의 그누보드6는 결국 개발이 중단되었다고 한다. 안타까울 뿐이다.)

### Rhymix

Rhymix는 기존 제로보드에서 시작한 zbXE → XE → XpressEngine 1.x → Rhymix가 된 주인이 여러번 바뀌었지만 나름 계보가 긴 CMS다.

일단 글쓴이는 XE에서는 [나름 왕성한 활동을 펼친 적이 존재](https://xe1.xpressengine.com/index.php?mid=download&user_id=3837131)했고, 대학생때 며칠을 새가며 서드파티자료를 만들기 위하여 역으로 구조를 분석해나간적이 존재하기에 기억을 더듬고 더듬어 구조는 어느정도 알고있었다.

이 CMS의 역사중에 내 지식이 마지막으로 끊긴곳은 XpressEngine 1.x를 XpressEngine Team(이하 XETeam)에서 개발을 중단하고, Laravel기반의 XpressEngine 3에 대한 개발을 집중적으로 진행했을때, 그리고 XpressEngine 1버전대에 잔류하고자 했던 유저들이 모여 NuriCMS등등 포크된 형태의 저장소를 만들다가 Rhymix라는 이름을 가지지 얼마 안되었을때가 마지막이였다.

그렇게 내 기존 **XpressEngine 1.x버전대의 지식**으로 판단하고 있던 문제점으로는

- 모호한 MVC형태, 애매한 모듈/애드온 구조.
- 레거시가 섞여있는 스크립트
- 취약한 보안
- jQuery 의존적 코어와 서드파티 스크립트들
- 최적화 의지가 없는 개발팀.
- XML쿼리라는 형태의 자체 ORM으로 인한 데이터베이스 설계 및 쿼리 설계 문제
- 자체 템플릿 엔진으로 인한 진입장벽 존재

등의 문제점을 갖고있었다.

문제점의 내용들이 상당히 많고, “그러면 그누보드 쓰는거 아님?” 이라고 하시겠지만..

### 내가 내린 결론

이 모든걸 종합적으로 고려해보아도, 결국 “초기에 서버 리소스를 많이 투입하지 않아도 될것이고, 나와 같이 운영하는 사람들에게 그나마 친숙하게 사용할 수 있는 Rhymix가 낫다” 라는 이유로 Rhymix로 결정하게 되었다.

“답정너”라고 하면 할말이 없지만, 솔직히 나에게 있어서 가장 친숙한것도 좋았다. 무엇보다 코드의 뿌리까지 확인해본적이 존재하고, 최근에 [Rhymix로 마이그레이션 한 사례](https://theqoo.net/notice/2841163581?page=2)와 [실제 운영사례](https://www.dogdrip.net/)를 본 적이 있어서 “몇십년된 코드를 이제와서 다시 써보는건 어떤 느낌일까?” 라는 더욱 더 도전해보고 싶단 마음이 들었다.

## Rhymix로 시작하기

Rhymix로 시작하는것은 비교적 어렵지 않았다. 기존에 XE에 대해서 지식은 어느정도 알고있었으니까.

Nginx와 PHP-FPM, 심지어 4코어 24기가 메모리와 8기가 메모리를 가진 별도의 mysql 서버. 심지어 MySQL 9.0.1이라니.

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image.png)

[(주변에 자랑하고 다닌모습. 공짜 좋아하면 대머리된다는 말은 이번에 너무 잘 알았다)](https://ake.kr/2025/01/12/zod-kr-publish-after-2-month-review-services-and-server/#_2%E1%84%87%E1%85%A5%E1%86%AB%E1%84%8B%E1%85%B4-%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8%E1%84%8B%E1%85%A6-%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%83%E1%85%A5%E1%86%AB-%E1%84%89%E1%85%A5%E1%84%87%E1%85%A5%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A5%E1%86%AB)

그렇게 서비스를 설치하고 어느정도 성능에 대한 사전테스트를 진행하고, 어느정도 Rhymix를 이용해보며 어느정도 완성도를 가졌는지 파악을 진행했다.

그런데 웬걸, Rhymix는 내가 알고있던 그 XpressEngine 1이 아니였다.

정확힌 호환은 되는데, 마음만 먹으면 새로운 환경을 만들 수 있는 환경의 CMS였다.

## Rhymix의 실제 모습

이걸 이정도 항목을 만들어가며 쓰는건, “그 누구도 지금까지 안알려주니 내가 대신 알려주겠다” 라는 느낌으로 봐주시면 감사하겠다.

실제로 이런 후기를 쓰는 사람들이 인터넷에 없으니..

- Rhymix 2.1버전대에 새로 도입된 모듈 구조로 인해 규모가 커져도 부담없는 형태가 됨.
    - namespace 사용과 같은 모던한 문법을 적극적으로 도입해서 개발할 수 있음.
    - 모듈에서 Composer를 이용하여 패키지 설치 및 이용도 가능함
        - AWS SDK를 이용하여 Cloudflare R2 호환 플러그인 개발을 무사히 마쳤다!
- 적극적인 패치 진행
- Blade 호환 문법의 템플릿 지원
    - [해당 글 작성 도중에 Blade 호환 문법으로 일부 템플릿을 작성해보았지만, 문제가 발생하여 원복한 상태이다.](https://rhymix.org/community/1905161) 정확한 문제는 나도 모르겠다. 특수 상황일 수 있겠지만, 사용이 불안정하니 무조건적으로 동작한다! 라고 말씀드리긴 어려울것같다.
- 다양한 캐시 레이어 호환(파일, APCu, memcached, Redis) 및 캐시 기능 탑재로 인해 훨씬 빨라진 작동
- (착각일수도 있지만) XpressEngine 1버전대 대비 hook 형태의 작동이 코어에서 제공하는 기능들엔 거의 다됨
- 심지어 비동기 큐가 내장되어있고 잘 작동도 함
    - 웹호스팅 환경에서는 불가능하다.
- XML쿼리에 다양한 기능 추가로 인하여 웬만큼 글쓴이의 수준에서 작성하는 쿼리들이라면 거의 다 작성가능.
- 책임지고 코드 관리해줄 주체가 있음(중요)
    - 저번 포스트에 작성한 fetchpriority, img load-lazy 와 관련한 백엔드 리스폰스에 관련해서 그냥 쿨하게 추가해주셨다.

결론적으로 Rhymix를 선택하는게 나에게 있어서 상당히 좋은 선택지가 되었지만, 위에 적어둔 개선된 사례들에 대해서 말해줄 수 있는, 그리고 이러한 사례를 공유해줄 수 있는 사람이 없는 상황에서 선택까지 상당히 불확실성을 갖고 임했었다는게 상당히 아쉬웠다.

### 편견이 아닌 실제 문제들

그래도 편견이 실제로 아직도 남아있는 부분들이 존재한다.

- 코어에 비해 모자란 서드파티들의 완성도
    - 이에 대해서는 아래에 설명하겠다.
- 레거시가 덜 걷혀진 코어
    - 관리자 페이지의 디자인(bootstrap 2버전대를 적극적으로 사용중에 있다..)이라던가, 20년이 다되어가는 비효율적 소스코드가 코어 패키지에 혼재되어있다던가 등
- 반쯤 죽어버린 서드파티 시장
    - 테마를 제작해서 유료로 판매하거나 배포하는 분들은 두손으로 꼽고, 모듈/애드온(프로그램)을 제작하여 배포하시는 분들은 한손에 꼽는것같다.
- XE 1버전대부터 상당히 논란이 많았던 제대로 된 메뉴얼의 부재
    - 이게 가장 심각한 진입장벽이라고 생각된다.

이 항목들은 편견이 아닌 사실임을, 그리고 여러분이 만약 제 글을 보시고 Rhymix를 이용하려 결정한다면 상당히 큰 장애물로써 작용할 것임을 미리 알려드린다.

## 디자인 결정 및 문법/CSS오류 수정하기

조드는 ‘처음부터 만들지 말고 구매할 수 있는것들은 최대한 구매하여 시간을 아껴보자’가 오픈 전까지의 마인드였다. 그렇기에 ‘시간을 아낄 수 있는 반응형을 이용해서 시간과 돈을 아끼자’라는 내 주장으로 반응형을 적극적으로 밀었다.

무엇보다 쓸만한 모바일 테마가 없다는것도 문제였지만, 반응형이 개인 개발에 있어서 작업량이 상당히 줄어들고 신경 쓸 것들이 줄어든다는것은 명백하기 때문이다.

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%201.png)

(내가 지금 돌아간다면 아마 지금 판매되는 테마패키지들을 쓰지 않았을까 생각한다)

반응형을 지원하는 테마중에 그나마 나아보이는 디자인의 ‘slow’라는 현재 판매중단된 레이아웃을 이용하기로 결정했다. 무엇보다 이전에 나름 디자인이 괜찮아 응원삼아 구매했던것이 생각났고, 파일도 보유하고 있었기에 적합하단 생각이 들었다.

![dedc84109275dea5683b95765605a21e](https://github.com/user-attachments/assets/f8651535-2fad-40c4-bd22-df5382ed1f36)

(slow 디자인의 샘플모습. 현재의 조드와 비교하면 상당한 차이가 나는걸 아실 수 있을것이다.)

### 문법 수정하기

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%202.png)

(이러한 오류메세지만 수십번을 경험했다)

이걸 풀어서 쓸 자신이 없다. 어떤 버그를 고쳤는지 대충 설명해드리자면

- 템플릿 내 변수 지정 제대로 안되어있던것들 해결
    - PHP의 변수는 `$` 로 시작해야하는데, $ 없이 표현된 내용이 상당히 많았다.. 이러한 문법이 과거까진 어느정도 허용되던것으로 보였지만, 여지없이 에러를 뿜어냈기에 실제 사용자 환경과 유사하게 세팅하며 지속적으로 테스트를 진행했다.
- flex에 일부 설정 지정 안되어 flex overflow 현상 발생하던것 해결
    - min-width:0 지정을 통하여 해결하는 일종의 트릭을 이용했다.
        - 심지어 사전오픈 하고도 유저들한테 피드백받고 고친곳들이 꽤 많다.
- 이상한 JS 표현식 해결
    - $(’selector’).find(’another selector’).parent().show() 이게 무슨 의미가 있나..
- 중복선언된 스타일링 해결
    - 분명 스타일 선언이 되어있는데 이유없이 tailwind의 클래스 정의로 덮여있다던가 등..
- 에러메세지가 사라지는 문제 해결
    - 이거때문에 거의 한달 애먹었다..
- SEO에 악영향을 끼치는 링크문제 해결
    - rel=”nofollow” rel=”sponsored” 삽입 등등..
- CSS 프리프로세서인 less/scss가 병행되어있는 문제 해결 등등..

절대로 정말로 진심으로 여러분들은 디자인적 감각이 저처럼 없는게 아니라면 직접 만드시는걸 권장한다. 디자인을 처음부터 하는게 불가능한 디자인 감각이 없는 나같은 사람이 아니라면 절대로.

![hq720.jpg](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/hq720.jpg)

(전 분명 따라하지말라고 했습니다.)

정말 불행 중 다행이였던건, 디자인을 적용한 테마가 ‘tailwindcss v2’(물론 지금은 v4의 시대지만)를 사용한다는 것이였고, 그나마 tailwindcss의 문법에 맞게 ‘보기 좋게’고치는 것은 그리 어려운 작업이 아니였다.

그렇게, 어느정도 '보여지는건 괜찮은 수준'으로 작업을 진행해놓고 자체기능 추가를 진행했다.

## 자체 기능 추가하기

사이트라면 자체적으로 제공해주는 기능이 있어야 사용자들이 다른 사이트에서 느끼지 못한 편리함을 느낄 수 있고, 제공해주는 기능들로 인하여 사용자의 이탈 방지에 상당히 도움이 된다.

지금 현재 조드에 들어간 자체개발 기능은 상당히 많다.

- 본문 글자크기 조절과 같은 사용자 정의 기능들
- 이벤트 참여 및 이벤트 제한 관리
- 파트너용 JSON 포맷의 API
- Cloudflare R2 연동 파일 업로드
- 질문글 답변 달릴경우 삭제 방지기능 추가
- 대댓글을 추적하여 파악 하는 기능
- 스티커 기능 본문작성 + 별도 프론트엔드 적용
- FCM기반의 웹 푸시
- 자체 개발한 위젯

등등..

![E0IyXRmVkAM7v3s.jpg](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/E0IyXRmVkAM7v3s.jpg)

일복이 넘치다 못해 터져버린 나의 작업량.

그중에 ‘모듈’이라고 부르는, 확장도구를 개발하기까지의 내용을 간략하게 정리해보았다.

### 모듈을 개발하기까지의 의식의 흐름
(알아둘 점) - 필자는 구 XpressEngine 시절에 디자인과 간단한 애드온이라 부르는 스크립트를 다뤄봤지만, 본격적인 확장도구인 모듈은 못다뤄봤다!

- 모듈의 구조부터 찾아봤다!
- 구버전 구조의 모듈에 관련한 매뉴얼은 찾았지만, 구버전 구조는 이해하기 싫었다!

![i1627288259.jpg](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/i1627288259.jpg)

- 일단 모듈생성기라는걸 이용해서 2.1버전의 구조로 모듈을 만들었다.
- 해당 구조에 대해서 어떻게 작동하는지 확인하기 위한 매뉴얼을 찾아보았다.
- 매뉴얼이 없다!
- 검색을 해본다
- 매뉴얼 비슷한게 Github 저장소에 Pull Request등으로 혼재되어있었다!
- 일단 코어라고 부르는 CMS 안에 내부 탑재된것들을 뜯어서 체크해봤다
- 무언가 점차 이해가 간다
- 하나둘씩 만들어본다
- 그럭저럭 동작한다!
- 작동이 안되면 포럼에 가서 물어본다
- 핵심 개발자와 서드파티 개발자분들이 답변을 해주신다
- 그걸 토대로 필요한 기능을 이것저것 적다보면 뭔가 감이 잡힌다
- 제대로 동작하는 무언가가 탄생했다

### 새 구조의 모듈 만들어보기

그렇게 처음 만들었던건 “링크 단축시스템”이라고 부르는 링크를 특정 랜덤 문자열로 변환하는 형태. 조드에서는 내부적으로 링크 변환 및 포인트 지급이 필요할때 사용중에 있다.

모듈의 구조를 직접 파악하고, 그 어디에도 안적혀있는 네이밍 규칙에 대한 이해, 그리고 검색해야 겨우 나오는 라이프사이클 등..

예전 구조를 버틸 수 없는 이유를 단 한개의 파일로 보여드리자면

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%203.png)

이전 구조의 경우 컨트롤러 하나에 4천줄이 육박하는 구조가 가능하다는 것이고, 자체기능을 위해서 추가하는것들이 상당히 많아졌을때 코드 찾는게 진짜 '죽음'수준이라는 것이다.

"앞에 함수 네이밍으로 어떻게 해결 가능하지 않을까?" 라는 생각을 나도 했지만, [XE의 잔재로 인하여 가끔가다가 disp, proc과 같은 함수명을 이용해야 하는 경우](https://rhymix.org/qna/1844012)가 있었다.

그렇게 새 구조로 만든 모듈은 비교적 적은 제약으로 성공적인 개발을 해냈고, 실제로 현재 가장 긴 컨트롤러도 300줄가량 되며, 이마저도 주석을 통해 어느정도 추후 개발에 도움이 될법한 내용들을 싸그리 적어놓은 경우 혹은 배열 혹은 변수를 한줄한줄 선언한 경우가 대다수였다.

결론적으로는 너무 만족스럽게 개발을 진행하고 라이믹스를 선택한게 좋은 결과였다라는 생각을 하게 되는 요소가 되었다.

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%204.png)

(조드에서 작동하고있는 질문/답변과 관련된 기능. 질문글의 댓글을 채택하기도 하고, 포인트를 지급해주기도 하고, 질문글의 삭제를 방지해주기도 하고, 질문글의 삭제 시도시 글쓴이를 가로채기도 한다.)

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%205.png)

이렇게 제작된 기능들이 모여서 하나의 컨트롤러를 이루고 있고, 이런 컨트롤러 파일만 14개정도 된다. 이 모든 컨트롤러가 300줄정도로만 이루어져 있으니 

## 서드파티 레거시와의 전쟁

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%206.png)

(원시 조드의 출석체크 프로그램의 흔적)

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%207.png)

(현재 아주조금 고쳐진 출석체크 디자인. 물론 이 디자인으로 절대 끝낼 생각이 없고 이 디자인도 싹 갈아엎어야한다. 물론 디자인만 고쳐야하는것도 절대 아니다.)

우려했던 걱정들은 Rhymix CMS 자체가 문제가 아니였다. 서드파티 자료들이 문제였다.

최소 10년은 낡아있는 서드파티 자료들은, PHP 4, PHP 5버전대를 주축으로 개발되었기에 현재의 PHP 7, 8버전대에서 정상적으로 작동하지 않는것은 기본이였다. 기본적인 구조 수정부터 시작하여, deprecated된 문법 형태, 그리고 도대체 왜 이렇게 작성했는지 모를 파일 구조까지.

이런 자료들의 문제라면 당연하게도 “이미 개발되어있으니 새로운걸 만들지않기에 기존 자료의 유지보수가 끝나면 그걸로 기능이 죽어버린다” 라는 딜레마 때문에, 어느정도 완성도를 가진 자료의 서드파티 개발자가 사라지면 전혀 관리가 이루어지지 않는다는것이다.

그럼에도 강조하고싶은건, 모든 서드파티들이 낡았다고 말씀드리는건 절대 아니다.

유료이긴 하지만 elasticsearch와 연동되는 모듈도 있고, 비교적 최신 검색엔진 최적화 도구인 IndexNow를 지원하는 모듈도 있고, 백엔드를 Sentry와 연동하는 모듈도 있고, webhook으로 새 게시물 작성 시 전송을 도와주는 애드온도 존재한다.

하지만, 진짜로 우리가 옛날 “개인 홈페이지”를 생각하면서 쓰던 기능들, 그리고 그때 필요하던 일부 것들은 다 낡았기에, 이 낡은 레거시 서드파티들을 잘 다듬어서 실 서비스로 올리는건 정말 너무 힘들고 괴로운 일이란걸 말씀드리고 싶다.

물론 레거시가 아닌 프로그램을 실 서비스로 올렸다고 해서, 오류없이 작동하리란 보장이 없다. 조드에서 사용중인 출석체크 프로그램(출석부)의 경우 데드락이 발생하고, 링크 요약 카드를 표시해주는 프로그램(링크 프리뷰)의 경우에도 상당한 버그가 존재하기도 했으니까.

참고로 링크 프리뷰의 경우 비교적 최신으로 유지보수되는 항목이라, 어느정도 손 닿는 곳까지는 Pull Request를 보냈다.

## 최적화와의 씨름

현재 돌아가는 백엔드는 ‘PHP치고’는 상당히 어려운 환경에 놓여있다. 4코어 32기가 메모리. 여기에  웹서버인 nginx, 캐싱을 넉넉히 가져가는 세팅을 해둔 데이터베이스인 MariaDB와, 세션 및 큐 등 각종 도움을 받는 Redis, 그리고 검색을 위하여 설치한 Elasticsearch까지. 이 모든것들이 여유없이 거의 다 들어차있는 구조라고 봐야될것같다.

### 프론트엔드 최적화

이전글의 ‘트래픽을 줄인다’라는 행위 자체가 비용 절감도 있지만, ‘사용자의 전송량 감소’라는 전제가 들어가는것이기 때문에 그 부분들에서 상당히 유의미한 최적화가 진행되었다.

그 외의 자바스크립트 최적화의 경우 jQuery문법을 제거하는것만으로도 상당히 큰 효과를, 그리고 `fetch`를 이용하여 동적 리퀘스트를 처리한것만으로도 좋은 효과를 얻게 되었다.

기존 테마가 jquery를 의존하는 형태의 처리가 상당히 많았고, Rhymix의 조상님인 XpressEngine부터 사용되던 `exec_xml` 이라는 기능이 상당히 응답이 느린걸 파악하고, 내가 파악하는 exec_xml을 호출하는 부분들을 상당수 fetch로 대체하였다.

그 결과 사용자의 인터랙션이 진행되는 부분들(특히 추천)에서 큰 개선이 이루어졌고, 추천을 누르자마자 사용자가 딜레이를 크게 느끼지 못할정도로 프론트엔드에서 응답하는 수준의 최적화를 이루어냈다.

![Honeycam 2025-03-18 04-59-30.gif](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/Honeycam_2025-03-18_04-59-30.gif)

(추천도 클릭효과도 빨간색이라 잘 티가 안나지만, 상당히 빠르다.)

### 백엔드 최적화

서버세팅과 일부 어플리케이션의 성능적인 부분의 경우에는 Rhymix를 현재 개발하고 운영하고 있는 [포에시스](https://www.poesis.dev/)에게 비용을 지불하여 도움을 받았는데, 오라클 서버의 마무리작업과 추후 서버가 터졌을때 새로운 서비스로 이전된 서버의 서버 세팅을 도와주셨다. 현재 글 작성일 기준에 조드 서버가 피크때 조금 아슬아슬한 모습을 보이기에, 몇번 더 진단 및 최적화 요청을 드렸다.

CMS 및 기타 서드파티와 직접 작성한 프로그램에 대한 최적화는, 현재도 지속적으로 이뤄지고 있지만, 주로 Rhymix에 내장되어있는 **디버그 기능**을 이용하였다.

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%208.png)

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%209.png)

(실제 조드 사이트의 설정과 디버그를 통해서 확인할 수 있는 일부 기록들)

굳이 APM(Application Performance Monitoring)를 사용하지 않고도 이렇게 DB상에서 쿼리가 몇초 내에 이루어졌는지 파악할 수 있는 디버그 기능을 자체적으로 제공하기에 최적화에서 상당히 큰 힌트를 얻을 수 있었고, 최적화를 진행함에 있어서 ‘완벽한 수준’까지는 아니지만, ‘합리적인 수준’까지는 큰 무리 없이 진행할 수 있었다.

그 외의 백엔드 최적화는

- 전체 페이지 캐싱 및 일부 COUNT와 같은 쿼리에 대한 캐싱을 지원하는 추가 캐시 프로그램(슈퍼캐시 모듈)에 대한 조드에 맞춘 최적화 진행
- DB쿼리가 많거나 연산이 많이 필요한 일부 기능들에 대한 DB서버 요청을 줄이기 위해 데이터를 파일/메모리로 캐시
    - 별도 제작
- 일부 최적화 되지않은 항목에 대한 DB 인덱스 지정
- 템플릿에 대한 비효율적인 일부 렌더링 조건 최적화 진행
    - 대부분 게시판에 대한 최적화.
    - 현재 게시판 → 위젯 → 기타 모듈순으로 최적화를 진행중에 있다.
- PHP의 Warning이 표시될만한 문법적 오류들 제거
- (현재 진행중) 사용자의 응답을 지연시킬만한 일부 기능들은 비동기 형태로 전환중

정도 진행을 거치고있다.

열심히 최적화하고 있는 흔적은 직접 [조드](https://zod.kr/)에 들어오셔서 확인하시길 바란다.

## 이렇게 개발하며 깨달은 점

주저리 주저리 많은 이야기를 늘어놓았지만, 다음 내용으로 요약할 수 있을것같다.

- 역시 세월이 오랫동안 지나도 변하는것과 변하지 않는것이 있다.
    - 그누보드는 제발 좀 변했으면 좋겠다 정말로!
- 매뉴얼없는 개발은 엄청힘들다.
    - 매뉴얼의 소중함. Vue로 감동하며 한번 깨닫고 Rhymix로 좌절하며 다시 깨닫는다.
- 서드파티는 꼭 최근까지 유지보수 된 자료를 이용하자. 예전의 자료가 좋다면 **각오**해서라도 이용해야 하며, 수정은 본인의 몫이다.
    - 근데, 최근까지 유지보수했다고 해도 그 서드파티의 코드 퀄리티가 좋을거라고 착각하지 않도록하자.
- 아무리 최적화 기반이 잘 닦여있어도 프로그램이 빠르게 작동하느냐는 개발자의 몫이다.
    - 열심히 최적화하면 분명 코드는 보답해줄것이다.
- 레거시, 해치웠나?

그리고 본문엔 없지만, 이건 꼭 적고싶다.

![image.png](https://f.ake.kr/zod-kr-publish-after-5-month-cms-review/image%2010.png)

- 소형 프로젝트라도 GIt 저장소는 꼭 만듭시다.
    - 9월에 시작해서 12월이 다되어서야 저장소를 처음으로 개설했다.
    - 아무리 천줄 넘어가는 변화점을 커밋하더라도, 당신의 저장소는 분명히 비공개로라도 존재함에 가치가 있을것이다.
        - 난 그걸 뒤늦게 깨달아서 9월부터의 작업물이 통째로 다날아갔다

## 마치며

이러한 과정을 모두 거치며 조드라는 사이트가 만들어져 운영중에 있다.

이 글은 여러분에게 “무조건 Rhymix 쓰세요!” 라고 하는 글은 아니다. 읽는 여러분들이 그렇게 느끼시지 않으셨길 빈다. 특히 요 최근에 [그누보드를 선택하고 상당히 큰 규모로 운영되고있는 사이트도 존재하기에](https://damoang.net/), “나는 이러한 이유로 이 CMS를 선택했으며, 이렇게 개발 및 최적화 과정을 거쳤다” 라고, 그리고 “국내 CMS들은 여전히 명맥을 잇고 있다”라고 말하고싶었다.

그리고 새로운 사이트 구축에 있어서 Rhymix를 선택한분들이 계시다면, 그분들에게 “우리 사이트는 이렇게 헤쳐나갔습니다!”라고 가이드가 되고싶은 글이였는데, 그 의도가 잘 전달되었길 바란다.

요 며칠 과분한 관심 덕택에 “취미에 할애할 시간에 글좀 쓰자!”라고 해서 빠르게 초고만 작성되어있던 이 글을 완성하기 위해서 잠까지 줄여가면서 글을 작성하였는데도 상당한 시간이 소요되었다.  그럼에도 불구하고 행사도 다녀오고, 워낙 소규모 팀이기 때문에 개발 외적으로도 열심히 구르고 있기에 글이 늦어졌음에 양해를 구한다.

이렇게 긴 글을 읽어주신 여러분들에게 감사드리며, 점점 더 이상하고 신기한 기능들을 많이 추가해나갈 [조드](https://zod.kr/)에 서버가 터지지 않을만큼만의 관심을 부탁드린다. 서버가 또 터지면 생애 두번째 장애보고서를 작성해야될지도 모르니까 😭
