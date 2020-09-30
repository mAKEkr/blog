---
title: "VuePress 블로그 테마: Typewriter"
subtitle: 소개와 설치방법 및 사용방법
categories:
  - programming
date: 2019-10-25
theme:
  headerCover: 'https://lh3.googleusercontent.com/CDnO4e4bHoRznm58vJvfENUznBOfsAHBTQbWwFWZ0hLhLqQKoHAsalJ8eNupHfWQ4ORvL3S4DTF2yUlEuFSXS9TiVjoMEvFjbejjrHtFQwv4AUm7xBb8um2bCenlFkOAu8Gi-NGwfQ=w2400'
  headerColor: '#ffffff'
---

Typewriter는 타자기를 의미합니다. 타자기와 같이 글을 전달하는 본연의 목적에만 집중할 수 있는 환경을 만들기 위하여 Typewriter로 정하였으며, Typewriter는 VuePress 전용 블로그 테마입니다.

해당 블로그 테마는 지금 이 글을 보고계신 개인 블로그용으로만 개발하였지만, 한국 내 VuePress 사용자를 늘리기 위하여 배포하기로 결정하였습니다.

## 특징

- 한국어 기반의 타이포그래피
  (부끄럽지만 많이 모자랍니다)
- 가벼운 설정, 최대한 노력한 시맨틱 문법
- 자체 TOC(Table Of Content)탑재
- 특정 블록형태 지원(이미지에 캡션 사용과 같은)
- 페이지 내 프론트매터 항목을 통한 헤더 색상의 쉬운 수정 가능, 헤더에 그림 추가 가능

## 설치하기

``` bash
npm install vuepress-theme-typewriter --save
```

## 설정하기

블로그는 vuepress 폴더 내의 `.vupress/config.js`를 이용하여 설정합니다.

``` js
module.exports =
  themeConfig: { //테마별 설정 항목입니다.
    nav: [ // 레이아웃 헤더의 우측 네비게이션 항목을 설정합니다.
      {
        text: 'Blog', // 메뉴에 표시될 이름
        link: '/' // 링크 주소
      }, // 다음과 같은 포맷으로 작성해주시면 됩니다.
    ],
    copyright: 'Copyright 2010-2019 AKE.kr all rights reserved.', // 레이아웃 푸터의 카피라이트를 작성합니다.
    github: 'mAKEkr', // 우측 github 링크를 추가하고싶다면 주소 혹은 저장소(저장소같은 경우 mAKEkr/blog 와 같이 작성해주시면 됩니다)를 적어주시면 됩니다.
    feed: true, // rss 피드를 발행중이시라면 true로 작성해주시면 feed.xml의 주소에 맞추어 아이콘이 뜨게됩니다.
    comment: { // https://utteranc.es/ 서비스의 코멘트를 이용할 수 있습니다. 해당 comment 항목 전체가 없다면(아예 삭제되었다면) 코멘트 서비스를 이용하지 않는것으로 간주합니다. 
      // 차후 vssue등의 서비스를 적용할 예정입니다.
      // 아래 설정들은 utteranc.es 에서 attribute로 들어가는 설정들중 서비스 설정만 넣어주시면 됩니다. 기본 스크립트 로드(src), crossorigin, async등의 설정은 기본으로 들어갑니다.
      'repo': 'mAKEkr/blog', 
      'issue-term': 'url'
    }
  }
}
```

## 포스트 헤더 디자인 설정하기

포스트 별로 테마에서 개별 디자인을 지원합니다. 다음과 같이 포스트의 `frontmatter` 항목을 이용해주시면 됩니다.
``` bash
---
theme:
  headerCover: 'image url' # 헤더에 메뉴를 넘어서 이미지를 넣고싶은 경우 다음과 같이 코드를 추가합니다.
  headerColor: 'color code' # 이미지를 삽입했을 경우의 상단 헤더부분의 메뉴가 잘 보이지 않기에 메뉴의 색상이 수정 가능합니다.
---
```
현재 보고 있으신 포스트에 적용되어있는 상황입니다.

## 버그 문의 및 질문 혹은 PR(무엇이 되었던 환영합니다!)
[Github 저장소](https://github.com/mAKEkr/vuepress-theme-typewriter)
