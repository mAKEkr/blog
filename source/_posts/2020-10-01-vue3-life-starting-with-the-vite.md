---
title: Vite부터 시작하는 Vue 3 생활
subtitle: Vite부터 Vue 3까지 간단하게 훑어보기
categories:
  - programming
date: 2020-10-01
---

> 이 글은 Vue 2를 사용해본 사람으로 기준이 맞춰져있다. Vue 2를 사용해보지 않았거나 이번 Vue 3가 완전히 프론트엔드 렌더링 라이브러리중에 처음이라면 생소할 수 있지만 최대한 노력하여 어렵지 않게 작성했다.

> 무책임한 말이지만, 해당 포스트는 완벽하지 않다. 정말 많은 변화점에 대해서 쉽게 이해시켜드리기 위하여 노력했지만, 노력만 했으며 결과는 그리 좋지 않았다고 생각한다. Vue 3에 대한 정확한 정보는 [Vue 3의 공식 사이트](https://v3.vuejs.org/)를 참고하시길 바란다.

한국시각 기준 19일 Vue의 최신 버전인 Vue 3가 공개되었다. [저장소링크](https://github.com/vuejs/vue-next/releases/tag/v3.0.0)

Vue 3는 이번에 용량 개선과 성능 향상을 위해 처음부터 다시 설계한 구조와, 트리 쉐이킹(라이브러리의 필요한 부분만 가져와서 빌드)과, 타입스크립트 지원등을 통하여 메이저 체인지라는 이름이 아깝지 않도록 개발되었다.
더 높은 수준의 트리 쉐이킹 이용을 위해, 그리고 더 나은 개발 환경을 위하여 Vue팀은 로컬 개발 서버에 여러가지 확장 플러그인을 담은 번들러를 제공해주게 되었다. 이것이 바로 Vite(발음 `/vit/`).

Vue 3의 주요 변화점과 새롭게 등장한 번들러인 Vite가 무엇인지 알아보자

## Vue 3
> 개인적으로 중요하다고 생각되는 변화점에 대해서만 다룰 예정이다. 자세한 변화점 및 그에 따라 마이그레이션을 어떻게 해야되는지에 대해서는 v3 문서의 [Migration Guide](https://v3.vuejs.org/guide/migration/introduction.html)를 참고하길 바란다.

> Vue 3에서 Tree Shaking을 지원하는만큼 적극적으로 특정 모듈만 불러오는 형태를 사용할것이다. 물론 기존의 Vue 2에서 사용하는 형태의 코드들도 활용 가능하지만, 최대한 Vue 3에서 지양하는 형태의 코드를 작성하고 그에 안내할것이다.

> 예제코드는 해당 항목이 어떻게 동작하는지에 대한 예제를 표시하는 것 뿐이며, 정상적인 작동을 보증하지 않는다.

### Reactivity API(reactive, ref, toRefs, readonly)
기존 Vue 2의 문제점을 기억하는가? Object 안에 새로운 key를 추가하면 반응형으로 반응하지 않고(그래서 Vue.set을 사용해야만 했다), array 안에 push, slice, shift등을 이용해야만 새로운 배열을 인식했던것을.
그래서 Vue팀은 데이터의 반응성을 해결하기 위하여 자바스크립트의 Proxy API와 비슷한 형태의 API를 제작한다. 이것이 Reactivity API. Reactivity API는 Javascript에서 지원하는 Proxy API의 직접적인 형태가 아님으로 이점을 유의하도록 한다.

#### reactive
`reactive`는 **객체**와 **배열**, **셋(Set)** 과 같은 형태의 데이터들을 담당한다.

#### ref
ref는 단순값(숫자, 문자열, 불린과 같은)을 담당한다.

#### toRefs
toRefs는 Reactivity API로 감싸진 값들을 일반형태로 변환하기 위한 함수이다.

#### readonly
readonly의 경우 명칭 그대로 값이 바뀌지 않아야 하는 상황에 지정하며, Reactivity API로 감싸진 항목에 대해서만 작동한다.

이 항목들은 다음과 같이 예제를 작성할 수 있다
``` vue
<template>
  <p>count: {{ count }}</p>
  <button @click="count++">count update</button>
  <p>list: {{ list }}</p>
  <button @click="updateList(list)">list push</button>
  <p>readOnlyCount: {{ readOnlyCount }}</p>
  <button @click="readOnlyCount++">readOnlyCount update</button>
  <hr />
  <p>failedCount: {{ failedCount }}</p>
  <button @click="failedCount++">count update</button>
  <p>failedList: {{ failedList }}</p>
  <button @click="updateList(failedList)">list push</button>
</template>

<script>
import {
  ref, reactive, toRefs, readonly
} from 'vue'

export default {
  setup () {
    const count = ref(0) // 단순값인 ref를 사용했다
    const list = reactive([]) // 배열임으로 reactive를 사용했다
    const readOnlyCount = readonly(count) // ref를 이용한 값에 readonly 속성을 지정하여 새로운 변수로 지정했다. 업데이트를 하려 해도 업데이트가 되지 않으며 count가 올라갈때 자동으로 참조되어 업데이트된다

    const failedCount = reactive(0) // 단순값을 지정해야 할 곳에 reactive를 사용했다. 값이 반영되지 않는다.
    const failedList = ref([]) // 배열에 ref를 사용했다. 값이 반영되지 않는다.
    
    const updateList = (base) => {
      base.push(Math.random()) // 왜인지 모르겠는데 직접 참조하면 안되는것이 function으로 동적으로 받아서 push하면 ref/reactive 상관없이 배열/셋이 반응한다. 버그인것같은데, 코드의 의도만 파악해주시라.
    }
    
    return {
      count,
      list,
      readOnlyCount,
      failedCount,
      failedList,
      updateList
    }
  }
}
</script>
```

### Composition API(setup)
#### 들어가기전에
이와 관련된 에피소드를 알고있다면 무시하셔도 좋지만, 이 Composition API는 분명하게 Vue 2의 구조를 붕괴하는 API이며, 사용이 반강제적인 현재 상황에서 이 Composition API와 기존 Vue 2의 구조를 이용하여 코드를 작성할 경우 며칠전의 필자와 같이 크게 혼동할 수 있는 구조다.

그렇기에 이 Composition API를 이해하려는 것은 기존의 Vue 2가 갖고있던 객체 기반의 옵션형태를 전면 부인하는것이 되는것이며, Vue 2.x를 사용할 일이 없는 분만 해당 항목에 대해서 진지하게 공부하시길 바란다.

이런 setup 구조로 만든 이유에 대해서 찾은결과, Evan You가 코멘트한 [Github Issue의 답변](https://github.com/vuejs/vue-next/issues/41#issuecomment-514747379)에 따르면 사람들이 Vue 2.x의 API를 건드는것에 대해서 상당히 반발감이 컸기때문이라고 한다. 그렇기에 변화를 추구하지만 구조적으로 꼬인 혼종을 탄생시킨 결과물로 인해 Composition API와 기존 Vue 2.x형태의 객체기반 옵션들이 혼재해있는 상황이다. 마이그레이션 가이드등에 이러한 경고라도 해주었음 좋았을거라고 생각하지만, 그렇게 생각은 안했나보다.

어느정도 문서들을 재정리 할 시간이 필요하리라 판단하지만, 아직 Vue 2를 현업에서 사용하여야 하는분이라면 이 API에 대해서 알고가지 않길 바란다. 본인에게 있어선 정말 머리아픈 일주일이였다.

Composition API를 본격적으로 사용하게 된다면, 컴포넌트에서 Vue 2 기반의 설정은 없는거라고 생각하시길 바란다 꼭. 둘다 겹쳐 사용하면 지옥을 맛보게 될거라 장담한다.

#### 내용
Composition API는 이번 Vue 3에 새로 도입되는 형태로써, 컴포넌트 내에 `setup`을 통하여 구성되게 된다.
setup은 해당 컴포넌트가 받을 `Props`와 `Context`(컴포넌트를 구성하는 `Attribute`와 `Slots` 그리고 `Emit`)를 전달 받을 수 있다.

자 여기까진 진짜 원론적 이야기고, 왜 `setup`의 예제코드들에 이 Reactivity API들이 포함되어 작성되어있는지에 대해 이야기 해볼까 한다.

이 Composition API를 담당하는 Setup은 컴포넌트가 생성되기 전에 실행된다. 우선순위가 높으므로  `this`와 같은 형태로 컴포넌트를 참고할 수 없으며, 그 뒤에 실행되며 처리될 컴포넌트의 `data`, `computed`, `methods`, `computed`, `watch`에 대한 내용을 가져올 수 없다.

Vue 2의 다음 항목들은 Composition API를 이용할 경우 `setup`함수 안에 작성하는것으로 대체한다.

- methods
- data
- lifecycle hooks(onCreate, created 등)
- watch

이 모든 항목들을 `setup`안에 작성하여 return으로 반환될 객체에 포함시켜 내보내는것만으로 Vue의 템플릿에서 인식이 가능해진다.
``` vue
<template>
  <h1>출입문</h1>
  <p>{{ welcomeMessage }}</p>
  <button @click="leave">떠나기</button>
</template>

<script>
import {
  reactive, ref,
  computed, watch,
  onMounted
} from 'vue'
export default {
  setup (prop, { attribute, slots, emit }) {
    const state = reactive({
      name: 'Dooly',
      visitCount: 0
    }) // vue에서 통제하는 데이터를 지정하는것이다. reactive 항목에 대해서는 위의 Reactivity API를 참고하시기 바란다.
    
    const leave = () => { // method도 이런 방식으로 지정해야한다.
      state.visitCount = 0
    }
  
    onMounted(() => { // hook에 해당하는 항목들을 vue에서 모듈로 불러와서 setup 안에 실행함수를 넣으면 해당 훅 조건에 맞게 실행된다.
      console.log('component mounted!')
    })
    
    const welcomeMessage = computed(() => `${state.name}님 환영합니다`)

    watch(
      () => state.visitCount,
      (value, prev) => {
        console.log(`${state.name}님 ${value}회 방문`)
      }
    )
    
    return { // data, method, computed 모두 종류에 상관없이 모두 합쳐서 return한다.
      state,
      leave,
      welcomeMessage
    }
  }
}
</script>
```

### 제공(Provide)과 투입(Inject)
우리는 그동안 자식 컴포넌트에 자식 컴포넌트 데이터를 제공해올때 어떻게 해왔는가?

``` vue main.vue
// main.vue
<template>
  <ChildComponent :propkey="data">
  </ChildComponent>
</template>
<script>
import ChildComponent from './child-component.vue'

export default {
  components: {
    ChildComponent
  }
}
</script>
```

``` vue
// childComponent.vue
<template>
  <AnotherChild :values="this.propkey">
  </AnotherChild>
</template>

<script>
import AnotherChild from './another-child.vue'

export default {
  props: {
    propkey: Object
  },
  components: {
    AnotherChild
  }
}
</script>
```

이렇듯 당연히 Prop을 써왔는데, child-component의 child-component가 별도로 존재하고, 그걸 위 코드에서 확인할 수 없다면? 이를 해결하기 위한것이 Provide와 Injection이며, 다음과 같은 형태로 작성이 가능하다.

``` vue main.vue
// main.vue
<template>
  <ChildComponent :propkey="data">
  </ChildComponent>
</template>
<script>
import ChildComponent from './child-component.vue'

export default {
  provide: {
    providedValue: 'hello'
  },
  components: {
    ChildComponent
  }
}
</script>
```

``` vue
// childComponent.vue
<template>
  <AnotherChild :values="this.propkey">
  </AnotherChild>
</template>

<script>
import AnotherChild from './another-child.vue'

export default {
  inject: [
    'providedValue' // inject로 불러올땐 array 형태로 provide로 제공된 키를 지정한다.
  ],
  props: {
    propkey: Object
  },
  components: {
    AnotherChild
  }
}
</script>
```

이외에 provide를 함수형태로 사용하고 object를 반환시키면 computed 등의 반응형 형태로 작동이 가능하다.

이러한 표기방식은 Prop으로 데이터를 표기해온 지난날들과 다르게 어느 컴포넌트에서 어떠한 데이터를 Provide로 제공받는지 상당히 불명확한 표기법으로써, 개발중인 프로젝트에서 나름의 규칙을 갖지 않는 한 차후 코드 리팩토링과 같은 상황에 있어서 허들이 높아질것이라 판단한다.

그렇지만 재귀형태로 데이터를 관리하거나, data/state로 관리하긴 애매한 데이터를 Provide/Inject로 관리하면 데이터를 관리할 양이 줄어들고 데이터를 담당하는 채널 자체는 늘어났지만 데이터의 규모는 더 작아져 관리하기 용이해질 것이다.

### Instance API(new Vue)
앞으로 vue를 작동시키는 방식이 `new Vue`에서 `Vue.createApp`형태로 바뀌게 되었다.

```js
// Vue 2
import Vue from 'vue'
const app = new Vue({})
    
// Vue 3
import { createApp } from 'vue'
const app = createApp({})
```
그럼 기존에 사용하던 글로벌 컴포넌트, 믹스인등에 대해서는 다음과 같은 형태로 선언/사용하게 된다.

```js
// Vue 2
import Vue from 'vue'
import VueAddon from './addon.js'
    
Vue.use(VueAddon, options)
Vue.component('GlobalComponent', {})
const app = new Vue({}).mount('#app')
    
// Vue 3
import { createApp } from 'vue'
import Vue3Addon from './AddonForVue3.js'

const app = createApp({})
app.use(Vue3Addon)
app.component('GlobalComponent', {})

app.mount('#app')

// 메서드 체이닝도 가능하다
const app = createApp({})
    .use(Vue3Addon)
    .component('GlobalComponent', {})
    .mount('#app')
```

이와 같이 변경됨으로써 하나의 파일에 여러개의 Vue Instance를 선언할 때 모든 인스턴스가 믹스인, 컴포넌트등을 공용으로 사용하지 않고 선언이 가능하다.
불필요한 부분들이 공용으로 사용되지 않으니, 더 효율적인 인스턴스 생성이 가능해졌다.

### 수명주기(Lifecycle) 변화, 다이어그램 명확화
![Vue 2와 Vue 3의 수명주기 다이어그램](https://paper-attachments.dropbox.com/s_A4708CFC020A114A406DF423BB4C49C2FC9DDEAAD321253DB94788ED6A3C1303_1601490262555_vue+lifecycle.png)
Vue 2와 Vue 3의 수명주기 다이어그램을 보면 무언가 다를것이다.

1. **beforeCreate**와 **created**가 필요없게 되었다. Composition API로 인하여 setup에서 사용하는거와 다름없게 된것이다.
2. **destroy**가 **unmount**로 명칭이 바뀌었다. 그에 따라 수명주기에서의 unmount시 호출되는 훅도 `beforeUnmount`, `unmounted`로 변경되었다.
3. `el` 옵션이 존재하는지 확인하는 과정이 사라졌다.
4. 기존 Vue 2에는 `template` 옵션이 존재하지 않을 경우 ‘el’로 지정된 엘리먼트에 outerHTML로 뒤덮었으나, innerHTML으로 작성한다. (즉, 엘리먼트 자체가 보존된다)
5. 다이어그램이 좀더 명확해졌다.
    기존 destory가 호출된경우 beforeDestory 훅 호출 → 컴포넌트 제거 → destoryed 훅 호출 과정으로 이루어졌었지만, Vue 3에서는 beforeUnmount 훅 호출 → 이벤트 리스너, 워쳐(watcher), 자식 컴포넌트(child component) 제거 → unmounted 훅 호출 과정의 다이어그램으로 변경되었다.
    쉽게 말하자면 “과정이 추가된게 아니라 다이어그램만 수정되었으며, 이벤트 리스너, 워쳐, 자식 컴포넌트 제거 과정이 추가됨”으로써 조금 더 명확해진것.
    - 이에 대해 혹시라도 “기존 Vue 2에서는 안그랬는데요!” 라고 하실분이 계실까봐, Vue 2의 destory와 Vue 3의 unmount에 대한 링크를 각각 가져왔다. 소스코드가 완전히 똑같진 않지만 과정은 유사하게 보일것이다.
        [Vue 2](https://github.com/vuejs/vue/blob/d9b27a92bd5277ee23a4e68a8bd31ecc72f4c99b/src/core/instance/lifecycle.js#L109) / [Vue 3](https://github.com/vuejs/vue-next/blob/376883d1cfea6ed92807cce1f1209f943a04b625/packages/runtime-core/src/renderer.ts#L1976)

### 텔레포트
컴포넌트안의 항목을 전혀 무관한곳으로 이동가능한 기능을 텔레포트라 한다. 이 개념은 Vue에 처음 도입된것이 아닌데, React에서도 도입되어있는 기능으로서 React에서는 Portals이라고 부른다.
해당기능은 Modal이나 팝업, 다이얼로그등에 유용하게 사용할 수 있으며, Vue 3의 예제문서에도 Modal 예제로 설명이 되어있다.
비교적 설명이 잘 되어있는 편이니 [Vue 3의 공식 문서](https://v3.vuejs.org/guide/teleport.html)를 참고하시기 바란다.

```html
<!doctype html>
<html>
  <body>
    <div id="app"></div>
    <div id="modal-background"></div>
  </body>
</html>
```

```vue
<template>
  <h1>저는 마법을 쓸줄 알아요</h1>
  <p>Vue와 상관없는 #modal-background에 내용을 넣을게요</p>
  <teleport to="#modal-background">
     <p>흐아아아압! 순간이동 완료</p>
  </teleport>
</template>
```

### 그 외

[mixin등 컴포넌트와 겹치는 형태를 이용하여 data 함수를 전달시 완전히 덮어버리는 형태로 변경](https://v3.vuejs.org/guide/migration/data-option.html#overview)되었다거나, [Composition API로 인하여 props에서 데이터의 기본값을 지정하는 default를 함수로 사용했을 경우 this에 접근이 불가능](https://v3.vuejs.org/guide/migration/props-default-this.html)하거나, [Custom Event를 담당하던 $on, $off, $once가 제거되었다거나](https://v3.vuejs.org/guide/migration/events-api.html) 등등 글쓴이가 다 풀어내지 못한 내용들이 Vue 3 문서의 [Migration guide](https://v3.vuejs.org/guide/migration/introduction.html)에 존재하니 꼭 기존 Vue 2 개발자들은 참고하여 마이그레이션 하거나 새롭게 적응하시길 바란다.
두번 강조드린다 제발 제 글로만 겉핥기로 끝내지말고 꼭 보시라.

## Vite

Vite의 어원은 프랑스어 “빠름”이라고 한다. 개발에 집중한 번들러로써, 개발중에는 네이티브 형태의 ES Import를 사용하며, 빌드시에는 Rollup을 통하여 번들링 되는 형태로써 운영된다. 추가로 Vite는 Vue만 지원하는것이 아닌 React, Preact도 지원하며, 커뮤니티의 개발로 Svelte까지 지원되며 활발하게 개발되고있다.

Vite의 핵심은 Vite의 공식 저장소에 있는 How and Why 항목의 [How is This different from vue-cli or Other Bundler-based Solutions?](https://github.com/vitejs/vite#how-is-this-different-from-vue-cli-or-other-bundler-based-solutions) 에서 확인할 수 있다. “영어라서 읽기 힘들어요!” 하실 분들을 위해 미숙한 번역이지만 일단 번역하여 올려둔다. 재차 강조하겠지만 영어로 직독직해가 가능하신분은 원문 링크로 가서 그렇게 해주시길 바란다.

### Vite가 vue-cli 혹은 다른 번들러들과 어떻게 다른가요?
주요적인 차이점은 Vite는 개발중에 번들링을 하지 않는다는 겁니다. 네이티브 ES Import 문법은 소스코드가 브라우저에 직접적으로 제공되도록 하며, 브라우저에서 지원되는 `<script module>` 을 통하여 해석할 것이며, 각각의 import들을 HTTP 요청으로 받아옵니다.

개발 서버는 코드의 변형이 필요한경우 일부 요청을 가로챌것입니다. 예를들자면, `.vue` 파일을 불러온다면 브라우저에 제공되기 전에 컴파일 될 것 입니다.

이러한 접근법으로 인하여 몇가지 장점을 갖게 됩니다.


- 번들링 작업이 없기때문에 서버의 첫 실행(콜드 스타트)이 엄청나게 빠릅니다.
- 코드는 주문형(온디맨드)으로 컴파일되므로, 현재 페이지에서 컴파일된 코드들만 불러와집니다. 개발을 시작하기 위해 번들링이 끝날때까지 기다릴 필요가 없습니다. 여러개의 페이지를 가진 앱에서 큰 차이를 불러옵니다.
    (주: 스크린을 페이지로 번역했습니다.)
- Hot module replacement(HMR)의 성능이 모듈의 갯수에 상관없게 됩니다. 앱이 얼마나 크던 상관없이 HMR은 빠릅니다.

네이티브 ES import 사용으로 인해 다중 import 형태를 가질 경우 네트워크의 폭포(waterfall)효과로 페이지 전체 새로고침의 경우 번들러 기반의 설정보다 약간 느릴 수 있습니다. 그렇지만 로컬에서 개발이 진행되는만큼, 실제 차이는 엄청 사소한 수준일것입니다. (컴파일이 필요한 파일의 경우 이미 컴파일된 파일이 메모리에 캐시되기때문에, 새로고침시 컴파일에 시간을 소모하지 않습니다.)

마지막으로, 여전히 컴파일은 Node에서 이루어지며, 번들러가 가능한 모든 코드 변환이 가능하기에 어떠한것도 당신을 코드를 제품 수준으로 번들링하기 위하여 막지 못할겁니다.
사실, Vite는 앱이 제품 수준에서 네트워크 폭포효과로 고통받지 않기 위하여 빌드 명령어를 제공합니다.

라고 한다.

### 요약

- 개발중엔 ES Import를 직접지원 하고, 브라우저에서 `<script module>` 형태로 불러오기에 별도의 번들링이 필요없다. 필요한 파일만 컴파일 하여 메모리에 저장하기에 로딩도 빠르다.
- ES Import의 특성상 겹쳐진 Import로 인해 발생할 수 있는 로딩 지연을 Rollup 번들러를 이용하여 번들링시 해결하고, 프로덕션 상태로 배포가 가능하다.
- 코드중 컴파일이 필요한 경우에는 직접 컴파일하며, 컴파일 된 항목은 모두 메모리에 저장한다.
- 개발중에 무진장 빠르다!
- 심지어 React, Preact, Svelte도 플러그인으로 지원된다!

라고 할 수 있겠다. Rollup 번들러를 국내에서 사용하는 경우나, 예제등을 잘 보지 못하여 Rollup 번들러가 생소한 분들이 있으실 수 있기에, 이점만 유의하여 사용하면 될거라고 생각한다.


## 마치며

Vue 3과 Vite를 간단히? 알아보았다. 간단히라고는 적었는데 새로운 번들러와 새로운 라이브러리를 간단하게 요약하기는 힘들지 않은가. 🤣

최대한 여러분이 혼동하지 않도록 노력했으며, 내 나름대로 알게된것들을 다시금 정리하고 몇십번의 교정도 이루어졌다.

기존의 Vue 2의 Object 기반의 API를 좋아하시던 분들에게는 함수 형태의 setup을 이용한 Composition API는 분명 절망적인 소식일것이다. 앞으로는 `<script setup>` 형태로 아예 svelte 느낌이 나도록 만들어버리게 한다니까..


![](https://paper-attachments.dropbox.com/s_A4708CFC020A114A406DF423BB4C49C2FC9DDEAAD321253DB94788ED6A3C1303_1601141747951_168c8971b69293436.png)


다 모아놓고 보니 Composition API, Reactivity API가 사실상 이번 Vue 3의 핵심인것같다.

Vue 2의 변화에 대한 반발로 인하여 혼종이 되어버린 Composition API. 그에 맞춘 문서들도 더더욱 혼종이기에 여러분들에게 내가 VuePress에 이어 한번 더 삽질해서 알려드리는 계기가 되었다.

참고로 Vue 2의 경우 [로드맵](https://github.com/vuejs/vue/projects/6)에 따르면 2020년 4분기경 마지막으로 Vue 3과 호환되는 일부기능들을 추가, 그리고 Vue 3에서 사라질 기능에 대한 경고를 띄우게 하는 2.7버전을 공개 한 뒤 18개월짜리 LTS(Long-Term Support)로 전환, LTS가 끝나면 심각한 보안문제를 제외한 모든 패치를 중단한다고 나와있다.
Vue 2 사용자에게는 이제 피할 수 없는 숙명이자, 앞으로 다가올 새로운 공부거리가 탄생한것이다.

이 글을 모두 보신 여러분은 Vue 3를 알아보았다. Vite가 뭔지도 알아보았으니 여러분은 이제 Vue 3와의 전쟁에서 적어도 소총 한자루는 쥐어진 셈이다.

자고일어나면 새로운 라이브러리와 번들러가 나오는 험난한 프론트엔드의 길에 있어서, 사막에서 이정표 역할을 해주는 NPC같은 글이 되었길 바라면서, 이 글을 작성한 덕분에 Vue 3 공부를 끝냈다는 성취감에 빠져있는 필자는 글을 마친다.