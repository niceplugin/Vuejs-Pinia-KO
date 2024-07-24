# Store (스토어) 정의하기 %{#defining-a-store}%

<!-- <VueSchoolLink
  href="https://vueschool.io/lessons/define-your-first-pinia-store"
  title="Learn how to define and use stores in Pinia"
/> -->

<MasteringPiniaLink v-if="false"
  href="https://play.gumlet.io/embed/651ecff2e4c322668b0a17af"
  mp-link="https://masteringpinia.com/lessons/quick-start-with-pinia"
  title="Get started with Pinia"
/>

핵심 개념을 살펴보기 전에, Store는 `defineStore()`를 사용해 정의되며, 첫 번째 인수로 **고유한** 이름이 필요하다는 것을 알아야 합니다:

```js
import { defineStore } from 'pinia'

// `defineStore()`의 반환값에 원하는 대로 이름을 지을 수 있지만,
// `use`로 시작해 `Store`로 끝나는 Store의 이름을 사용하는 것이 좋습니다.
// (예: `useUserStore`, `useCartStore`, `useProductStore`)
// 첫 번째 인수는 애플리케이션 내 Store의 고유 ID입니다.
export const useAlertsStore = defineStore('alerts', {
  // 다른 옵션...
})
```

이 **이름**은 *id*라고도 하며, 반드시 전달해야 하고, Pinia는 이를 사용하여 Store와 devtools를 연결합니다. 반환된 함수를 *use...* 로 명명하는 것은 조합형 함수의 관례를 따르는 것입니다.

`defineStore()`의 두 번째 인수에는 Setup 함수 또는 Options 객체를 전달할 수 있습니다.

## Option Store %{#option-stores}%

Vue의 Options API와 유사하게, `state`, `getters`, `actions` 프로퍼티를 가진 Options 객체를 전달할 수도 있습니다.

```js {2-10}
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

Store에서는 `data`는 `state`로, `computed`는 `getters`로, `methods`는 `actions`로 생각할 수 있습니다.

Option Store는 직관적이고 간단하게 시작할 수 있습니다.

## Setup Store %{#setup-stores}%

Store를 정의하는 또 다른 문법도 있습니다. Vue Composition API의 [setup 함수](https://ko.vuejs.org/api/composition-api-setup.html)와 유사하게, 반응형 프로퍼티와 메서드를 정의하는 함수를 전달하고, 노출하려는 프로퍼티와 메서드를 포함한 객체를 반환할 수 있습니다.

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

_Setup Store_ 내에서:

- `ref()`는 `state` 프로퍼티가 됨.
- `computed()`는 `getters` 프로퍼티가 됨.
- `function()`은 `actions` 프로퍼티가 됨.

Pinia가 `state`를 올바르게 인식하도록 하기 위해, Setup Store에서는 **모든 state 프로퍼티**를 반환해야 합니다. 즉, Store에 [_비공개_ state 프로퍼티](https://masteringpinia.com/blog/how-to-create-private-state-in-stores)를 가질 수 없습니다. 모든 state를 프로퍼티로 반환하지 않거나 **읽기 전용**으로 만들면 [SSR](../cookbook/composables.md), 개발 도구 및 기타 플러그인이 제대로 작동하지 않습니다.

Setup Store는 [Option Store](#option-stores)보다 훨씬 더 많은 유연성을 제공합니다. Store 내에서 감시자를 만들 수 있고, 자유롭게 [컴포저블](https://ko.vuejs.org/guide/reusability/composables.html#composables)을 사용할 수 있습니다. 하지만 SSR에서 컴포저블 사용시 더 복잡해질 수 있다는 점을 염두에 두어야 합니다.

Setup Store는 라우터나 라우트처럼 전역적으로 제공된 프로퍼티가 필요할 수도 있습니다. [앱 레벨에서 제공된](https://ko.vuejs.org/api/application.html#app-provide) 모든 프로퍼티는 컴포넌트에서처럼 `inject()`를 사용하여 Store에서 접근할 수 있습니다.

```ts
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // 이것은 `app.provide('appProvided', 'value')`가 호출되었다고 가정함
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

:::warning
Store 자체에 속하지 않는 `route`나 `appProvided` 같은 프로퍼티는 반환하면 안됩니다. 이러한 프로퍼티는 컴포넌트 내에서 `useRoute()`와 `inject('appProvided')`를 사용하여 직접 접근할 수 있습니다.
:::

## 어떤 문법을 선택해야 할까요? %{#what-syntax-should-i-pick}%

[Vue의 Composition API와 Options API](https://ko.vuejs.org/guide/introduction.html#which-to-choose)의 내용처럼, 자신에게 가장 편한 문법을 선택하세요. 둘 다 장단점이 있습니다. Options Store는 더 쉽게 작업할 수 있는 반면, Setup Store는 더 유연하고 강력합니다. 둘의 차이점에 대해 더 깊이 알고 싶다면, Mastering Pinia의 [Option Stores vs Setup Stores 챕터](https://masteringpinia.com/lessons/when-to-choose-one-syntax-over-the-other)를 참고하세요.

## Store 사용하기 %{#using-the-store}%

Store는 `<script setup>`에서 `use...Store()`로 호출하거나 `setup()` 함수 내에서 **컴포저블처럼** 호출하기 전까지 생성되지 않습니다:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// 컴포넌트 내 어디서든 `store` 변수를 접근할 수 있습니다 ✨
const store = useCounterStore()
</script>
```

:::tip
`setup` 컴포넌트를 아직 사용하지 않는 경우, [**map 헬퍼**를 사용하여 Pinia를 사용할 수 있습니다](../cookbook/options-api.md)。
:::

(자동으로 번들러가 코드 분할을 허용하고 TypeScript 추론을 제공하는) Pinia의 이점을 최대한 활용하려면, 필요한 만큼의 Store를 **각각 다른 파일에 정의해야 합니다**.

Store가 인스턴스화되면, Store의 `state`, `getters`, `actions`에 정의된 모든 프로퍼티에 직접 접근할 수 있습니다. 이러한 세부 사항은 다음 페이지에서 자세히 다룰 것이며 자동 완성이 이를 도와줄 것입니다.

`store`는 `reactive`로 래핑된 객체이므로, getters 뒤에 `.value`가 필요 없습니다. `setup`의 `props`처럼 **디스트럭처링(destructuring : 구조 분해 할당)을 할 수 없습니다**:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
// ❌ 이렇게 하면 반응성이 깨져서 작동하지 않습니다
// `props`를 디스트럭처링 하는 것과 같습니다
const { name, doubleCount } = store // [!code warning]
name // 항상 "Eduardo" 입니다 // [!code warning]
doubleCount // 항상 0 입니다 // [!code warning]

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ 이렇게 하면 반응형이 됩니다
// 💡 또는 `store.doubleCount`를 직접 사용하는 것도 가능합니다
const doubleValue = computed(() => store.doubleCount)
</script>
```

## Store에서 디스트럭처링 %{#destructuring-from-a-store}%

Store에서 프로퍼티를 추출하면서 반응성을 유지하려면 `storeToRefs()`를 사용해야 합니다. 이는 모든 반응형 프로퍼티에 대한 ref를 생성합니다. Store의 state만 사용하고 action을 호출하지 않을 때 유용합니다. action은 Store 자체에 바인딩되므로 Store에서 직접 디스트럭처링 할 수 있습니다:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name`과 `doubleCount`는 반응형 ref입니다.
// 플러그인에 의해 추가된 프로퍼티도 ref로 추출됩니다.
// 모든 action 또는 비반응형(ref/reactive가 아닌) 프로퍼티는 건너뜁니다.
const { name, doubleCount } = storeToRefs(store)
// action의 increment는 직접 디스트럭처링 할 수 있습니다.
const { increment } = store
</script>
```
