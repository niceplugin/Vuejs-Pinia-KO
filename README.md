<p align="center">
  <a href="https://pinia.vuejs.kr" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://pinia.vuejs.org/logo.svg" alt="Pinia logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/pinia"><img src="https://badgen.net/npm/v/pinia" alt="npm 패키지"></a>
  <a href="https://github.com/vuejs/pinia/actions/workflows/test.yml?query=branch%3Av2"><img src="https://github.com/vuejs/pinia/workflows/test/badge.svg?branch=v2" alt="빌드 상태"></a>
  <a href="https://codecov.io/github/vuejs/pinia"><img src="https://badgen.net/codecov/c/github/vuejs/pinia/v2" alt="코드 커버리지"></a>
</p>
<br/>

# Pinia

> 여기는 Vue 상태관리 라이브러리 Pinia 웹 페이지 한글화를 위해 포크한 저장소 입니다.
> 2024-03-31 Open AI API의 GPT-4-turbo 를 사용하여 일괄 재번역 하였습니다.
> 일부 오역 등 잘못된 부분 PR 환영합니다.

> 직관적이고, 타입 안전하며, 유연한 Vue의 Store

- 💡 직관적인
- 🔑 타입 안전
- ⚙️ 개발자 도구 지원
- 🔌 확장 가능
- 🏗 모듈화 설계
- 📦 매우 가벼움
- ⛰️ Nuxt 모듈

Pinia는 Vue 2와 Vue 3 모두에서 작동합니다.

Pinia는 스페인어로 '파인애플'이라는 단어의 가장 유사한 영어 발음입니다: _piña_. 실제로 파인애플은 여러 개의 개별 꽃들이 모여 하나의 다중 과일을 만드는 것입니다. 스토어들처럼, 각각은 개별적으로 탄생하지만, 결국 모두 연결됩니다. 또한 남아메리카 원산의 맛있는 열대 과일입니다.

## 👉 [Vue 3와 함께하는 StackBlitz에서의 데모](https://stackblitz.com/github/piniajs/example-vue-3-vite)

## 👉 [Nuxt 3와 함께하는 StackBlitz에서의 데모](https://stackblitz.com/github/piniajs/example-nuxt-3)

## 이 프로젝트를 계속 진행할 수 있도록 도와주세요 💚

- [GitHub에서 스폰서 되기](https://github.com/sponsors/posva)
- [PayPal을 통한 일회성 기부](https://paypal.me/posva)

---

## FAQ

이 프로젝트와 가능한 질문에 대한 몇 가지 노트:

**Q**: _Pinia는 Vuex의 후속작인가요?_

**A**: [예](https://vuejs.org/guide/scaling-up/state-management.html#pinia)

**Q**: _동적 모듈은 어떻게 되나요?_

**A**: 동적 모듈은 타입 안전하지 않으므로, 대신 [다른 스토어를 만들 수 있게 허용합니다](https://pinia.vuejs.org/cookbook/composing-stores.html) 그리고 어디서나 임포트할 수 있습니다

## 설치

```bash
# 또는 pnpm 또는 yarn
npm install pinia
```

Vue <2.7을 사용하는 경우, 최신 `@vue/composition-api`를 설치하세요:

```bash
npm install pinia @vue/composition-api
```

## 사용법

### 플러그인 설치

pinia(루트 스토어)를 생성하고 앱에 전달하세요:

```js
// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

```js
// Vue 2
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 기타 옵션...
  // ...
  // 동일한 페이지에서 여러 Vue 앱에 동일한 `pinia` 인스턴스를 사용할 수 있습니다.
  pinia,
})
```

[Nuxt 구성](https://pinia.vuejs.org/ssr/nuxt.html#nuxt-js)을 포함한 더 자세한 지침은 [문서](https://pinia.vuejs.org)를 확인하세요.

### 스토어 생성

원하는 만큼 많은 스토어를 생성할 수 있으며, 각 스토어는 다른 파일에 있어야 합니다:

```ts
import { defineStore } from 'pinia'

// main은 스토어의 이름입니다. 이 이름은 애플리케이션 전체에서 고유하며 개발자 도구에 표시됩니다.
export const useMainStore = defineStore('main', {
  // 새로운 상태를 반환하는 함수
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  // 옵션인 getter들
  getters: {
    // getter들은 첫 번째 매개변수로 상태를 받습니다.
    doubleCounter: (state) => state.counter * 2,
    // 다른 getter에서 getter 사용
    doubleCounterPlusOne(): number {
      return this.doubleCounter + 1
    },
  },
  // 옵션인 액션
  actions: {
    reset() {
      // `this`는 스토어 인스턴스를 의미합니다.
      this.counter = 0
    },
  },
})
```

`defineStore`는 스토어에 접근하려면 호출해야 하는 함수를 반환합니다:

```ts
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const main = useMainStore()

    // 특정 스토어 속성을 추출합니다.
    const { counter, doubleCounter } = storeToRefs(main)

    return {
      // 템플릿에서 전체 스토어에 접근을 제공합니다.
      main,
      // 특정 상태 또는 getter에만 접근을 제공합니다.
      counter,
      doubleCounter,
    }
  },
})
```

## 문서

Pinia에 대해 더 알아보려면 [한글 문서](https://pinia.vuejs.kr)를 확인하세요.

## 라이센스

[MIT](http://opensource.org/licenses/MIT)

