# 시작하기

## 설치하기

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

선호하는 패키지 매니저로 `pinia`를 설치하세요:

```bash
yarn add pinia
# 또는 npm으로
npm install pinia
```

::: tip
앱이 Vue <2.7을 사용하는 경우, composition api `@vue/composition-api`도 설치해야 합니다. Nuxt를 사용하는 경우, [이 지침을](/ssr/nuxt.md) 따르세요.
:::

Vue CLI를 사용하는 경우, 이 [**비공식 플러그인**](https://github.com/wobsoriano/vue-cli-plugin-pinia)을 시도해 볼 수 있습니다.

pinia 인스턴스(루트 스토어)를 생성하고 앱에 플러그인으로 전달하세요:

```js {2,5-6,8}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

Vue 2를 사용하는 경우, 플러그인을 설치하고 생성된 `pinia`를 앱의 루트에 주입해야 합니다:

```js {1,3-4,12}
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 다른 옵션들...
  // ...
  // 동일한 `pinia` 인스턴스는 한 페이지에서 여러 Vue 앱에 걸쳐 사용될 수 있음을 주목하세요
  pinia,
})
```

이는 또한 개발자 도구 지원을 추가합니다. Vue 3에서는 vue-devtools가 필요한 API를 아직 제공하지 않기 때문에 시간 여행 및 편집과 같은 일부 기능이 여전히 지원되지 않지만, 개발자 도구에는 훨씬 더 많은 기능이 있으며 전반적으로 개발자 경험이 훨씬 우수합니다.

## 스토어란 무엇인가요?

스토어(Pinia와 같은)는 컴포넌트 트리에 종속되지 않는 상태와 비즈니스 로직을 보유하는 엔티티입니다. 즉, **전역 상태를 호스팅합니다**. 마치 항상 존재하며 누구나 읽고 쓸 수 있는 컴포넌트와 같습니다. 이는 [상태](./core-concepts/state.md), [게터](./core-concepts/getters.md) 및 [액션](./core-concepts/actions.md)의 **세 가지 개념**을 가지며, 이 개념들은 컴포넌트의 `data`, `computed` 및 `methods`와 동일하다고 가정하는 것이 안전합니다.

## 언제 스토어를 사용해야 하나요?

스토어에는 애플리케이션 전체에서 접근할 수 있는 데이터가 포함되어야 합니다. 이는 많은 곳에서 사용되는 데이터, 예를 들어, 네비게이션 바에 표시되는 사용자 정보뿐만 아니라 페이지를 통해 보존되어야 하는 데이터, 예를 들어, 매우 복잡한 다단계 양식 같은 데이터를 포함합니다.

반면에, 페이지의 로컬 요소에 대한 가시성과 같이 컴포넌트에 호스트될 수 있는 로컬 데이터를 스토어에 포함시키는 것은 피해야 합니다.

모든 애플리케이션이 전역 상태에 접근할 필요는 없지만, 여러분의 애플리케이션이 그렇다면, Pinia는 여러분의 삶을 더 쉽게 만들어 줄 것입니다.
