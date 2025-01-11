---
title: zod.kr 개발 4개월, 오픈 2개월 후기 - 서버 및 서비스편
subtitle: 서버비를 줄이기 위한 눈물나는 최적화과정 포함
categories:
  - programming
date: 2025-01-12
---

드디어 이제서야 정체를 소개하게 되었다. IT커뮤니티인 조드(zod.kr)를 운영하는 개발자 닉네임 mAKEkr, 조드 이전 닉네임 admin-m, 현 닉네임 메이커다.

조드를 통해 본격적으로 웹개발에 3년만에, 그리고 PHP개발은 거의 7년만에 다시 뛰어들게 되었다. 난 분명 지인들에게 “내가 때려죽어도 풀스택은 이제 안한다” 라고 했는데, 그 말을 7년만에 번복하고 풀스택으로 돌아왔다는점에 있어선.. 하.. 말을 아끼겠다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image.png)

(Front-end Developer에서 Full-Stack Developer로 바뀌었다)

zod는 ‘1인개발’된 커뮤니티이다. 1인운영까진 아니란것.

그 중에서 이번에는 서버를 모르는 개발자가 어떻게 서비스를 선택하고 결정하고 그리고 어떻게 치여왔고 현재 어떻게 안정적으로 서비스를 굴리고 있는지 알려드리고자 이 글을 작성하였다.

이전에는 더모아프로 개발기를 통해 서비스 비용없이 정적 호스팅 기반 그리고 일부 자동화된 데이터를 기반으로 운영하는지를 알려드렸었는데, 이번엔 어떻게 개발자 혼자서 일 고유방문자 20k~30k수준의 커뮤니티를 버틸 수 있는지, 그리고 이 관리자는 어떻게 비용 효율화를 통해 중규모 커뮤니티를 운영중인지 알려드릴까 한다.

## 서비스 스택 결정

요즘은 서버리스니 헤드리스니 뭐니 기술적인 이야기는 많지만, 백엔드 프로그램으로는 CMS인 `Rhymix`가 결정되었다. 이와 관련해서는 추후 별도 게시물을 통하여 전달해드릴 예정이니, 개발기가 궁금하신 분들은 조금만 기다려주시면 감사하겠다.

극 초반에는 **오라클 클라우드**의 프리티어 ARM서버를 사용했다. 24기가 메모리, 4코어 ARM이지만 나름 신뢰성있는 서버용 Ampere, 용량 50기가. 심지어 네트워크 드라이브 150기가도 공짜네? 심지어 아웃바운드 트래픽 4TB 공짜.

오픈소스 하는사람들은 못믿는 오라클이라고 하지만, 아무리 생각해도 오라클이라는 대기업의 이미지, 그리고 오라클은 흔히 ‘안정성을 최우선으로 하는’이라는 이미지로 인해, 그리고 심지어 그 오라클이 무료로 4테라 트래픽을 퍼준다? 한국에서 이정도로 메리트있는 서비스는 흔치 않다라고 생각하여 첫 서비스 운영위치를 오라클로 결정했다.

ARM코어라는 약간의 문제점이 있었지만, 리눅스 진영에서 noarch라던가 관련 패키지들이 잘 마련되어있었고, 직접 컴파일 할 수 있도록 `make`는 그래도 여러번 해와서 문제가 없었다.

이 널널한 서버 사양을 통해 무조건 중-장기적으로 서버를 구매할때까지는 150기가를 충분히 사용할것같아서 “100기가정도 채우면 한 500기가까지 확장해보고 서버 사양을 생각해보자” 라는 안일한 생각이 있었다.

그리고 나서 프론트엔드는 트래픽이 많이 들어오지 않는다는걸 가정 하에 서버를 제외한

1. 서버를 담당하는 오라클 클라우드
2. 보안을 담당하는 Cloudflare
3. 첨부파일에 대한 압축 및 전송을 CDN을 담당하는 Bunny.net
4. 이메일 및 외부 메세지 서비스는 네이버 클라우드

로 결정하였다. 클라우드플레어를 제외하면 가격 경쟁력이 상당히 높았고, 나름 합리적이라 생각한것들이라 최선의 선택이였다.

2번의 Cloudflare의 경우 Argo Smart Routing이라는 트래픽 종량제형 서비스를 이용하면, 월 200만원 이상 지출해야하는 ICN리전(한국 서버) 연결이 가능했기에, 보안을 챙기면서 속도도 챙기길 원했던 나로써는 선택지가 없었다.

비용은 GB당 $0.1. 인바운드/아웃바운드 모두 포함이였고, 알수없는 클라우드플레어의 트래픽 정책을 알기 전까지 “월 20만원이면 충분하겠지!” 라는 마음을 먹게 만든, 원흉이다.

원흉이 맞다.. 추후 서술하겠지만, 여러분은 저와 같은 함정에 빠지질 않길 바라며 이 글을 작성하는것이기에, 꼭 중규모 서비스 구축을 생각하신다면 꼭 봐주시길 바란다.

그리고 [Bunny.net](http://Bunny.net)의 경우에는 [조금 안좋은 사건](https://hi098123.tistory.com/498)으로 알게되었는데, Bunny.net의 가격 정책이 클라우드플레어 Argo의 3/10, 그리고 자동 최적화 기능을 켜면 용량 최적화도 되니 결국엔 클라우드플레어의 15~20%의 비용으로 트래픽 처리가 가능하기에 Bunny.net을 선택했다.

“월 340GB트래픽정도만 나와도 [Bunny.net](http://Bunny.net) 쓰는게 이득이네?”라고 계산을 했지만.. 뭐 아래에 보시면 어느정도 트래픽을 매일 처리하고 있는지 아시게 될것이다.

## 2번의 계획에 없던 서버이전

오라클 클라우드 프리티어에 서버세팅을 하고 나서 지속적으로 서버가 유지됐다면 그것이야 말로 해피엔딩이라 말할 수 있겠지만, 불행히도 나는 전혀 그러지 못했다.

서비스 오픈과정에서, 정말 예기치 못한 타사의 크나큰 실수로 인하여 서비스 오픈 과정에서 예상했던것의 정확히 10배의 트래픽이 유입됐다.

이게 분명 기뻐야 할 일이 맞는데, 그리고 어느정도 사용자 유입도 생각해서 널널하게 서버 사양을 구축한것도 맞는데, 오픈 몇시간만에 서버 모니터링 도중 사용자의 첨부파일이 유실된 문제를 확인했다. 원인을 찾다보니 첨부파일 폴더에 연결해놨던 네트워크 스토리지의 인스턴스와의 네트워크 연결이 끊기게 되어, 심지어 150GB짜리인데 10GB도 채우지 못한 상태로 스토리지 서버와의 연결이 멈추게 된것이다.

그래도 불행중 다행이였던것은, 해당 네트워크 드라이브에 첨부했던 파일들에 대한 연동을 rsync로 먼저 백업을 대비해놨기에 처음에 작업할땐 부담이 없었다.

그리고 그당시의 난 전혀 몰랐다. fstab으로 지정된 드라이브 연결설정이 끊기면 리눅스 부팅에 실패한다는걸.

정확히는 root 계정의 비밀번호를 설정하지 않았기 떄문에(보안때문에 root를 최대한 쓰지 않으려 했던 내 아집이라고 말하겠다), 이러한 문제가 발생했다.

관련하여 root의 비밀번호를 복구할 수 있는 방법을 찾아보기도, 이것저것 부트로더에서 설정을 바꿔보기도 했지만, 서버를 능숙하게 관리 할 수 없는 내 기준에서 방법은 전혀 없었다.

당연히 ssh는 접속조차 되지 않기에 관련하여 VNC를 연결하여 최대한 살려보려했지만, 서버를 살릴 수 없었다는 좌절감에 휩싸이고 있었다.

그렇게 나는 생애 최초로 장애보고서라는걸 작성하고 공개했다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%201.png)

(그 당시의 싸움. 새벽 3시정도면 잠을 잘 수 있겠지라는 안일한 마음이 있었지만, 결국 38시간의 비수면을 통해 무조건 데이터뿐만이 아닌 서버 설정도 함께 백업하는 습관이 생겼다.)

오라클 프리티어의 경우 서버 재생성도 즉시 불가능하고, 그걸 돈주고서라도 해결하려고 했는데 돈을 주기 위해서 관리자의 수동승인(무려 2일걸렸다)이 필요했다.

근데 서비스는 지금 사람이 물밀듯이 들어오는 상황이고.

그렇게 결국 한달 넘게 구축해놓은 서버와 서비스 스택을 쉽게 포기할 수 밖에 없었고, 서버를 온전히 다른 서비스로 옮길 수 밖에 없었다.

그렇게 선택한곳은 vultr였다. 솔직히 다른 서비스 알아보기도 힘들었고, 아무리 vultr의 ip들이 DDoS 지뢰밭이라 한들, 당장 서비스를 구축하여 서버를 열만한 곳은 내 기억엔 vultr말곤 없었다.

그렇게 30시간 넘는 무수면상태로 임시로 서비스를 vultr에 구축하여 임시로 오픈을 진행했다.

# 트래픽과의 싸움

일단은 서버보다 사람 사는게 우선이다 싶어서 최적화고 뭐고 앞서 서술했던 1~4번중에 1,3번을 포기한 상태로 구축을 진행했다.

그리고 트래픽은?

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%202.png)

앞에 서술해드린거 기억하시나? Cloudflare Argo는 GB당 0.1달러를 청구한다.

하루에 못해도 20달러씩 주머니에서 청구되고 있었단 소리다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%203.png)

그리고 일 고유 방문자는 2.7만에서 3만을 왔다갔다 하고있었다.

솔직히 이땐 최적화고 뭐고 사람이고 뭐고 그냥 모르겠단 느낌이고 말도안되는 업무량 초과로 인해 그냥 머릿속이 안돌아가고 있었다.

호주머니에서 돈이 만원 이만원씩 빠져나가도 “그냥.. 몰라..” 이런 느낌이였다.

지독한 무수면상태에서 체력이 어느정도 회복한 뒤에 선택한것은, “일단 주머니에서 빠져나가는 돈부터 해결해보자” 였다. 실시간으로 돈이 삭제되는 느낌이란게 이런걸까.

![한국에서 돈으로 트래픽을 사려는 행위는 좋은 선택이 되지 못한다](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/16e4a46de2a484fb0.jpg)

한국에서 돈으로 트래픽을 사려는 행위는 좋은 선택이 되지 못한다

서버비로 일 4달러정도(백업도 활성화해놔서), 클라우드플레어로 일 22달러정도. 하루 식비 3만원도 아까운 입장에 하루 트래픽 3만원? 그게 한달이 되면 100만원???을 깨닫자마자 정신이 확 차려졌다.

여러분은 웹 사이트를 접속하고 나서 트래픽에 대해서 생각해본적이 한번이라도 있었는가? 난 없었다. 적어도 조드를 운영하기 전까지 말이다.

아무리 내가 웹쪽 개발자이고, 풀스택 개발을 하고, 실제로 인프라도 여러번 만지작 해본 입장이라지만, 그 누가 트래픽까지 생각하면서 인터넷을 할까?

그런 생각이 모인사람이 100명, 1,000명이라면? 아니, 만명이라면? 아니, 일 순 방문자 3만명이라면? 10MB짜리 원본 이미지/동영상파일을 압축없이 볼수있게 올려달라는 회원들이 그렇게 미워보일수가 없다.

너무 잘되어서 탈이 된 것이나 다름없는데, 일단 너무 지친 상황에서 최적화를 하기 싫기도 하고, 처음부터 보안을 엄청나게 강화하면 좋지 않을까? 라는 무식한 생각에 클라우드플레어로만 해결을 보고싶어서 비즈니스 플랜의 계약을 위해 클라우드플레어에 문의를 했다.

## 이상과 현실, 클라우드플레어의 비즈니스 플랜.

트래픽은 하루만에 피크를 찍고 이틀이 정점, 그 후 살짝 꺾이는 듯 하다가 유지하는 모습을 보였어도, 이대로 가다간 최소 100만원은 나올것같다고 생각했기에, “비즈니스 플랜을 쓰면 인천리전에 연결해준다” 라는 기억으로 일단 클라우드플레어에 전화부터 걸어봤다.

전화가 오지 않아서 실망하고 점심을 먹으려던 찰나 콜백이 와서 상담해본 결과, 국내 지사는 **비즈니스 플랜 영업 담당만 하며 기업마다 계약 조건이 다르며 금액도 다르다** 라는 말을 해주셨다.

그렇기에 월 100만원정도는 낼 생각이 있다 라고 말씀드리니, 이것도 모자라다는 반응으로 리셀러들이 별도의 계약을 진행하니 리셀러를 알아보라고 했다.

클라우드플레어의 국내 리셀러는 알기론 두곳.

한곳은 정말 친절하게 전화 상담부터 이것저것 잘 해주시고 문의도 잘 받아주셨다. 개인적으로 처음 알게된 회사였는데, 나중에 조드가 상당히 커져서 비즈니스 플랜을 이용하게 된다면(조드의 경쟁사는 현재 비즈니스플랜을 이용중인것으로 생각된다) 클플 본사 말고 해당 업체와 무조건 컨택하여 계약할 생각일 정도로 말이다.

다른 한곳은 국내에서 나름 큰 규모의 리셀러. 근데 이곳은 전화조차 안받았다.

그렇게 결국 비용, 리셀러간 비교가 불가능한 상황에서 비즈니스 플랜은 포기하기로 했다.

## 이렇게 된 이상 클라우드플레어의 트래픽을 줄여라

“모든 대형 커뮤니티들은 그정도 트래픽을 사용한다” 라고 말하실 수 있겠지만, 트래픽을 정확하게 최적화 할 수 있는 능력을 갖고있으면서, 그리고 그러한 자원을 효율적으로 분배할 수 있는 커뮤니티들이, 그리고 트래픽 비용에 과감하게 비용을 지불할 수 있는 커뮤니티들이 얼마나 있을 수 있을까 싶다.

살면서 내가 만든 서비스의 트래픽이 주당 1테라를 넘는걸 본적이 없었다. 그리고 이번에 조드를 통해서 그걸 훌쩍 뛰어넘었다.

클라우드플레어의 Argo는 기본요금 5달러에 1GB당 0.1달러를 부과한다. 1주일에 100달러씩 빠진단 소리다.

이건 ‘무조건 한국리전에 연결해야하는 운영자’와 ‘어떻게든 돈을 뜯어내야하는 클라우드플레어’와의 비용절감싸움이라고 보셔도 될것같다.

## 아이콘 바꾸고 줄이기 - iconoir

![기존에 테마에서 사용하고있던 아이콘. 정확히는 조드의 예시는 아니지만, 알고있는 사이트에 대한 예시로 가져왔다. 캐싱된 리퀘스트인데 블링크현상이 발생한다. 놀랍지 않은가?](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/Honeycam_2024-12-30_00-00-31.gif)

기존에 테마에서 사용하고있던 아이콘. 정확히는 조드의 예시는 아니지만, 알고있는 사이트에 대한 예시로 가져왔다. 캐싱된 리퀘스트인데 블링크현상이 발생한다. 놀랍지 않은가?

기존에 Rhymix에 설치해놨던 Slow의 경우 레이아웃 자체에서 사용하던 ionicons 자체가 비동기형태로 리퀘스트를 진행하는데, CDN에서 파일을 다시 리퀘스트하는 과정에서 블링크 현상을 발생시켰다. 캐시가 없어서 그런거냐고? 놀랍게도 매 페이지 리프레시할때마다 아이콘이 저런식의 블링크가 발생했다.

아이콘 블링크 현상을 없애고자 결국 대체할만한 아이콘 라이브러리를 찾고 찾다가, Iconoir라는 적합한 라이브러리를 찾았는데. 아이콘만 3MB정도 되는걸 그냥 올리고 생각없이 있었다.

그리고 나서 개발자도구로 용량 상위 리퀘스트를 찾아보니, 아이콘 라이브러리가 떡하니 있었다는 슬픈 이야기.

일단 닥치는대로 웬만한 페이지에 들어가서 해당 스크립트를 선언했다.

```jsx
JSON.stringify([...new Set([...document.querySelectorAll('i[class^="iconoir"]')].map(elem => {
  if (elem.classList.length < 2) {
    return elem.getAttribute('class')
  } else {
    return elem.getAttribute('class').split(' ').filter(className => className.indexOf('iconoir-') === 0)[0]
  }
}))])
```

그리고 이걸 모아 flat하게 적용하고 난 뒤, 다시 set으로 중복된 클래스를 제거하고 다시 합쳤다

```jsx
[...new Set([
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-plus","iconoir-page","iconoir-calendar","iconoir-voice","iconoir-wrench","iconoir-search","iconoir-heart"]',
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-heart"]',
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-search","iconoir-plus","iconoir-heart"]',
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-heart"]',,
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-heart"]',
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-arrow-left","iconoir-heart"]',
 '["iconoir-check-circle-solid","iconoir-nav-arrow-down","iconoir-sparks-solid","iconoir-sun-light","iconoir-bell-notification-solid","iconoir-settings","iconoir-hammer","iconoir-select-window","iconoir-menu","iconoir-user","iconoir-bookmark-solid","iconoir-quote-message","iconoir-chat-bubble-empty","iconoir-droplet-half","iconoir-user-xmark","iconoir-xmark","iconoir-nav-arrow-left","iconoir-nav-arrow-right","iconoir-arrow-up","iconoir-chat-bubble-solid","iconoir-list","iconoir-edit","iconoir-trash","iconoir-heart","iconoir-share-android-solid","iconoir-white-flag-solid","iconoir-emoji-satisfied","iconoir-plus","iconoir-page","iconoir-calendar","iconoir-voice","iconoir-wrench","iconoir-search"]',
].map(item => JSON.parse(item)).flat())]
```

이렇게 만든 클래스셋을 통해, 그 후에는 직접 웹페이지에 접속하여 테스트를 진행하고 비어있는 아이콘을 채워 아이콘셋을 완성하였다.

### 아이콘의 css mask-image의 이중 선언 제거

어쩌면 당연하지만, 누군 놀랄수도 있는 사실은 테스팅 기기를 총 6대를 소유하고있다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%204.png)

css mask-image라는 사소한 기능의 작동방식을 확인해보면, 거의 대다수의 기기들이 webkit prefix를 지정 해야만 작동하고 있는 상황이였고, PC브라우저들이 perfix를 제거한 표현을 지원하고있는 상태였다.

근데, prefix를 다 지원해도 prefix없는 정식 표현식을 지원하지 않는 경우가 많았다. 그렇기에 내가 갖고있는 기기들을 통해 -webkit- prefix를 사용한 -webkit-mask-image를 이용하더라도 크롬, 엣지, 사파리, 오페라,파이어폭스 등 데스크톱 브라우저들에서는 원활하게 렌더링된다는걸 깨달았다.

그렇기에 `mask-image`의 선언을 없애고, 오히려 `-webkit-`선언만 남겨놓는 최적화를 진행했다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%205.png)

(앞선 두개의 최적화 하기 전과 최적화 한 후의 용량차이. 이것으로 인해 ‘일’ 트래픽 소모량이 5GB정도 줄었다.)

## 웹폰트 분리

조드는 웹폰트중에 Pretendard를 쓴다. 개인적으로 정말 완성도가 높은 웹폰트라고 생각한다.

웹폰트를 사용하기로 결정한 이유는 어느 기기에서던 동일한 디자인을 통해 이용자에게 동일한 경험을 주고싶었다.

그중에서 Pretendard Variable를 사용했는데, 폰트 하나하나당 용량이 큰 한국어 폰트 특성상, 그리고 여러 굵기를 사용해야 하는 웹 특성상(대충 400,700만 써도) 완성형 폰트에서는 가변 폰트를 사용하는것이 훨씬 유리하다고 생각했다.

그리고 구글 폰트와 같은 외부 폰트 서비스를 이용하지 않기로 결정한것은 트래픽 절감 목적보다 ‘무조건 서브셋으로 제공’과 같은 형태가 정말 싫었다.

jsdelivr로 제공하는것도 존재했지만, 이전에 기억으로 오류가 있던걸로 기억했고, 사이트의 오류 = 신뢰도의 문제 라는걸 첫날에 수면시간과 맞바꾸어 깨달아버린 이상, 다른 외부 CDN으로 대체할 수 없었다.

 “구글 폰트를 사용하지 않느냐!”, “서브셋이 뭐가 문제냐!” 라고 하시겠지만, 구글 폰트의 서브셋 기법은 커뮤니티에 전혀 적합하지 않은 설계를 갖고있다. 한번이라도 무언가 입력창에 입력하면서 깜빡이는 블링크 현상을 겪었다면, 그건 구글 폰트 서브셋 문제라고 당당하게 말할 수 있다.

관련하여 더이상 트래픽을 할게 없지않나? 라고 생각되던 상태에서, 보안을 위해 Cloudflare의 Pro플랜을 구매하였을때 대시보드가 바뀌는걸 알게 되었고, 그리고 그 뒤에 일 트래픽 그리고 심지어 어떤 파일이 트래픽을 엄청나게 소비했는지 알려주는걸 뒤늦게 알았다.

그리고 그 상위권에 당당하게 차지하고 있던 Pretendard-variable.woff2. 40기가정도 차지하고있었다. 그리고 식겁하고 바로 Bunny CDN으로 파일을 이동시키자, 클라우드플레어의 처리 트래픽이 일 60기가에서 16기가로 감소하였다.

“진짜 이정도나 감소한다고?” 생각했는데, Bunny.net에 전일대비 44GB의 트래픽이 증가량이 찍힌 걸 보고 “아 그래도 최소한 트래픽으로 부풀리는 짓은 안하는구나” 싶었다.

최종적으로는 Bunny.net에서 서브하는것도 아끼고 싶었다. 무엇보다 Bunny.net에 서브할때와 jsdelivr를 통한 CDN이용이나 PC 접속자들에게는 큰 차이가 없었고, 모바일 환경에서는 누구나 똑같았기 때문에..

결론적으로는 44기가*30일. 폰트 서브 변경 하나로 한달에 132달러, 무려 19만원을 아끼게 됐다.

## 인라인 스크립트와 인라인 스타일링 최소화, HTML 주석의 최소화

![원본 파일중 일부는 이렇습니다.](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%206.png)

원본 파일중 일부는 이렇습니다.

이해할수 없지만, 구매했던 테마에 인라인 자바스크립트가 엄청나게 많았다. 게다가 동적 웹페이지를 로드할때마다 포함된 자바스크립트의 총합이 1kb라면, 페이지뷰가 60만이면, 못해도 585MB.

게다가 딱봐도 여러번 쓰이는 엘리먼트를 class로 처리하지 않고 tailwindcss의 동적 class를 활용하지도 않는 상황에서 class를 지정하여 스타일링을 한 모습들이 다소 보였다.

뭔가 최적화에 대한 대책이 있거나 자신감보다.. 그냥 그렇게 하고싶으셨나보다. 그리고 그 결과물을 나는 돈으로 지탱하고있는 상황이나 다름없었다.

그렇게 내부에 tailwindcss로 지정된 클래스들을 찾아서 거의 박멸하는 수준으로 최적화를 현재까지 진행중에 있고(할게 너무많다), 인라인으로 지정된 자바스크립트들을 하나의 파일로 모아서 최적화 하는 노력을 기울이고 있다.

이 노력은 일 못해도 2~6기가정도의 트래픽은 줄이는 효과를 가져오지 않을까 생각한다.

참고로 너무 많은 부분을 최적화 해야되기에.. 이 글을 쓰고있는 현재에도 아직도 해당 최적화는 진행중에 있다.

## 클라우드플레어 Pro 플랜 이용을 통한 트래픽 파악하기

난 이걸 프로플랜 결제할때까지 몰랐다. 여러분은 꼭 알아가시길 바란다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%207.png)

이 메뉴에

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%208.png)

이런델 들어가면

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%209.png)

이런게 나온다.

기간별로 어떤 파일에서 얼만큼의 데이터를 전송했는지가 나온다.

Argo Smart Routing 쓰시는분들은 Pro플랜은 ‘최소 선택’임을 알아두시길 바란다.

## 봇 차단하기

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%2010.png)

조드에는 ‘특가’게시판이 존재한다.

상당히 가치가 높은 데이터를 제공하며, 봇어슬렁특가호시탐탐 봇만들어 돌리는 제작자들이 항시 스크래핑을 해왔다.

단순히 HTML트래픽으로 따지면 200MB정도 되지만, Puppeteer, Playwright, Selenium과 같은 자동형 브라우저를 이용한 트래픽 수집도 존재했어서, 실질적으로 이 봇들을 수동파악하며 차단하는걸로 일 트래픽 3~4GB를 절약할 수 있었다.

물론 그럼에도 불구하고 무조건적인 차단만 진행하진 않았다. API를 도입하여 관련한 알구몬과 같은 서비스에 데이터를 제공하면서 트래픽을 효율적으로 사용할 수 있게 되었다. 횟수에는 제한이 없으니까.

하지만 연락없이 무단으로 데이터 수집하는 바이럴들은 싫었기에 API는 화이트리스트 형태로 도입중에 있다.

## lazyload 적극 활용하기

난 Bunny.net의 트래픽도 줄이고싶었다.

근데 말씀드렸다싶이, 대부분 Bunny.net으로 서브되는 트래픽들의 대부분은 첨부파일들이다.

첨부되는 video, img태그에 `loading=”lazy”`선언과 `fetchpriority=”low”`선언을 통해 사용자의 반응성 확보도 하고, 트래픽도 절감하는 효과를 거뒀다.

iframe에 `loading="lazy"`를 걸면 상당한 페이지 로드 개선효과도 생긴다.

해당 패치 적용 전 트래픽 68~88GB에서 44~46GB로 상당히 많이 줄어들었다.

## 현재까지의 최적화의 결과

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%2011.png)

조드는 휴일에 트래픽이 꺾이는 기이한(?) 커뮤니티라서, 관련하여 글을 작성하는 현재 비교하기엔 좋진 않지만, 결론적으로 클라우드플레어 피크트래픽 211GB에서 12GB로, 

![image.png](image%2012.png)

[Bunny.net](http://Bunny.net) 동일 날짜 기준으로 56GB까지 더해도 68GB정도로 방문자 수 대비 총 트래픽을 약 57%정도 절감하였으며, 

단순 트래픽 비용은 순수 클라우드플레어 트래픽으로 처리된다면 56기가라면 5.6달러가 나와야하지만, 총 3.48달러수준으로 38%가량 절감하였으며,

최적화로 인한 총 절감 비용은 대강 추산하여 70~80%정도 절감하고 있지 않나 생각중이다.

클라우드플레어는 잘쓰면 좋고 못쓰면 독이다. 서버 관리자가 없더라도 서비스 관리자가 방화벽을 들여다볼줄 알아야한다라는 좋은 교훈을 얻게 되었다.

## 마치며

혹시라도, 진짜 혹시라도, 제 글을 못믿으실까봐 “클플 아르고 트래픽 대시보드에서는 그만큼 찍히지도 않는데 뭔 40만원을 냈대” 라는 소리를 하실분이 있을까봐.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%2013.png)

이게 여러분들이 말하는 대시보드의 이상향이고

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%2014.png)

이것이 우리에게 날라온 트래픽 청구서다. 분명 11월에 저기 보이는 트래픽 총합은 19.9GB인데, 실제 날라온 트래픽은 2265GB.

아마도 저기 Argo traffic은 인바운드 트래픽, 즉 들어오는 트래픽에 대한 합산이 아닐까 싶다.

이 청구서의 트래픽을 정확하게 확인할 수 있는 방법에 관련해서 유선상의 문의도 해봤고 여러모로 찾아도 봤지만, 만족할만한 답변은 전혀 얻을 수 없었다.

아 그리고 R2 트래픽도 Argo Smart Routing에 합산된다. 절대로 Argo Smart Routing 쓰는 도메인으로 뭐 연결해서 쓰려고 하지마라. 그게 다 돈이다.

그냥 클라우드플레어 Argo Smart Routing 서비스를 쓰실거면 무조건 도메인을 따로 분리하던, 어떻게 해서라던 용량이 많이 들어갈만한 웹폰트, 이미지, 아이콘, 스타일시트 뭐든 다 좋으니 따로 분리하시는걸 권장하고, 그럼에도 불구하고 합산 200만원이 넘는다면 클라우드플레어 비즈니스 플랜의 문을 두드리시는걸 권장한다.

![image.png](https://f.ake.kr/2024-12-31-zod-kr-publish-after-2-month-review--services-and-server/image%2015.png)

솔직히 말해서 아직도 완벽하게 최적화가 이루어지지 않았다. 분기별로 나뉘어져서 여러번 로드하고있는 css파일이라던가, tailwind의 풀파일을 통쨰로 넣고있는 상황이라던가, 띄어쓰기가 처리 안되어서 전송되는 html이라던가.

위젯, 개별 스킨, 나머지 다 최적화 하는데 아마 최소 못해도 6개월의 시간이 걸릴거란 생각이 든다.

아직도 최적화가 완벽하게 이루어지지 않았기에, 어셋을 제외하고 페이지 로드별 페이지에만 순수 14kb정도의 트래픽을 사용중에 있다. 아마도 최적화가 다 끝나면 이마저도 더 줄여서 9~10kb를 바라볼 수 있지 않을까.

이상 돈으로 교훈을 얻은 운영자의 이야기다. 하지만 원달러 1470원 시대를 맞아 최적화는 지속할 예정이다.

최대한 벨트를 단단히 조여메고 서버 비용 및 관련 인프라 비용은 한푼이라도 더 아끼자는 마음을 갖기 위하여 최선의 방법들을 찾아보려고 한다.

이를 위해서 아마 여기 적진 않았지만, 별도의 CDN서버를 직접 구축할지도 모른다.

그래도 이번에 클라우드플레어 프로플랜 사용하면서 얻은 보안적 이점이 큰것같아서 클라우드플레어 프로플랜은 유지해보려고 한다.

CDN들만 월 60~70만원의 위태로운 환경에서, 월 20만원의 덜 부담스러운 환경이 되기까지, 쉽지 않았지만 결국에 해내고 말았다.

다음번엔 “프로그래머 기피 1순위 언어 PHP로 만들어진지 15년도 다되어가는 CMS로 개발하는 이야기”를 한번 해볼까 한다.
