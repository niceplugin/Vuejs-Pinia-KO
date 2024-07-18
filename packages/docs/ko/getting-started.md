# 시작하기 %{#getting-started}%


## 설치 %{#installation}%

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

선호하는 패키지 관리자로 `pinia`를 설치합니다:

```bash
yarn add pinia
# 또는 npm으로
npm install pinia
```

:::tip
앱에서 Vue <2.7을 사용 중이라면, Composition API 패키지인 `@vue/composition-api`를 설치해야 합니다. Nuxt를 사용 중이라면 [이 지침](/ssr/nuxt.md)을 따라야 합니다.
:::

Vue CLI를 사용 중이라면, [**비공식 플러그인**](https://github.com/wobsoriano/vue-cli-plugin-pinia)을 사용해 볼 수 있습니다.

Pinia 인스턴스(루트 Store)를 생성하고 플러그인으로 앱에 전달합니다:

```js {2,5-6,8}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

Vue 2를 사용 중이라면, 플러그인을 설치하고 생성된 `pinia`를 앱의 루트에 삽입해야 합니다:

```js {1,3-4,12}
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 다른 옵션들...
  // ...
  // 동일한 `pinia` 인스턴스는
  // 같은 페이지 내 여러 Vue 앱에서 사용할 수 있습니다.
  pinia,
})
```

이렇게 하면 devtools에서 지원됩니다. Vue 3는 vue-devtools에서 필요한 API를 제공하지 않기 때문에 time traveling과 편집 같은 일부 기능은 지원되지 않지만, devtools는 훨씬 더 많은 기능을 제공하며, 전체적으로 개발자 경험이 훨씬 뛰어납니다. Vue 2에서는 Pinia가 Vuex의 기존 인터페이스를 사용하기 때문에 Vuex와 함께 사용할 수 없습니다.

## Store란? %{#what-is-a-store}%

Store(예: Pinia)는 상태와 비즈니스 로직을 보유하는 독립체(entity)로, 컴포넌트 트리에 묶여 있지 않습니다. 즉, **전역 상태를 호스팅**합니다. 이는 항상 존재하는 컴포넌트와 같아서 모든 컴포넌트가 읽고 쓸 수 있습니다. Store에는 **세 가지 개념**인 [state](./core-concepts/state.md), [getters](./core-concepts/getters.md), [actions](./core-concepts/actions.md)이 있으며, 이 개념들은 컴포넌트의 `data`, `computed`, `methods`에 해당한다고 볼 수 있습니다.

## 스토어를 사용해야 하는 경우 %{#when-should-i-use-a-store}%

Store는 애플리케이션 전반에서 접근할 수 있는 데이터를 포함해야 합니다. 여기에는 여러 곳에서 사용되는 데이터(예: 내비게이션 바에 표시되는 사용자 정보)와 페이지를 통해 보존되어야 하는 데이터(예: 매우 복잡한 다단계 폼)가 포함됩니다.

반면에, 컴포넌트 내에서 호스팅할 수 있는 로컬 데이터를 Store에 포함하는 것은 피해야 합니다. 예를 들어, 페이지 내의 엘리먼트 가시성 같은 경우입니다.

모든 애플리케이션이 전역 상태에 접근할 필요는 없지만, 만약 필요하다면 Pinia가 개발 과정을 더 쉽게 만들어 줄 것입니다.

## 스토어를 사용하지 말아야 할 때 %{When-should-I-not-use-a-Store}%

때때로 우리는 너무 많은 것을 Store에 사용하는 경우가 있습니다. 애플리케이션에서 Store를 과도하게 사용한다고 느껴진다면, Store의 목적을 재고해 보아야 합니다. 예를 들어, 일부 로직은 단순히 조합형 함수로, 일부 상태는 컴포넌트의 로컬 상태로 두어야 할 수도 있습니다. 이 내용은 Mastering Pinia의 [Store를 남용하지 않기](https://masteringpinia.com/lessons/not-overusing-stores) 수업에서 자세히 다룹니다.
