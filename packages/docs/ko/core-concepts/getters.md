# Getters (개터) %{#getters}%

<!-- <VueSchoolLink
  href="https://vueschool.io/lessons/getters-in-pinia"
  title="Learn all about getters in Pinia"
/> -->

<MasteringPiniaLink v-if="false"
  href="https://masteringpinia.com/lessons/the-3-pillars-of-pinia-getters"
  title="Learn all about getters in Pinia"
/>

Getter는 Store의 state에 대한 [계산형 값](https://vuejs.org/guide/essentials/computed.html)과 정확히 동일합니다. `defineStore()`의 `getters` 프로퍼티를 사용하여 정의할 수 있습니다. 화살표 함수를 사용하는 것을 **권장하며**, `state`를 첫 번째 매개변수로 받습니다:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

대부분의 경우, getter는 오직 state에만 의존하지만, 다른 getter를 사용해야 할 수도 있습니다. 이 때문에 일반 함수를 정의할 때, `this`를 통해 전체 Store 인스턴스에 접근할 수 있지만, **(TypeScript에서) 반환 타입을 정의해야 합니다**. 이는 TypeScript의 알려진 제한 사항 때문이며, **화살표 함수로 정의된 getter나 `this`를 사용하지 않는 getter에 영향을 미치지 않습니다**:

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 자동으로 반환 타입을 숫자로 추론합니다.
    doubleCount(state) {
      return state.count * 2
    },
    // 반환 타입을 **명시적으로** 설정해야 합니다.
    doublePlusOne(): number {
      // 전체 Store에 대한 자동 완성 및 타입 설정 ✨
      return this.doubleCount + 1
    },
  },
})
```

그런 다음 Store 인스턴스에서 getter에 직접 접근할 수 있습니다:

```vue
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

## 다른 getter에 접근하기 %{#accessing-other-getters}%

계산형 프로퍼티와 마찬가지로 여러 getter를 결합할 수 있습니다. `this`를 통해 다른 getter에 접근할 수 있습니다. 이 경우, **이 getter에 대해 반환 타입을 지정해야 합니다**.

::: code-group

```ts [counterStore.ts]
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
```

```js [counterStore.js]
// JavaScript 사용시 JSDoc (https://jsdoc.app/tags-returns.html)을 사용할 수 있습니다.
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // `this`를 사용하지 않기 때문에 타입은 자동으로 추론됩니다.
    doubleCount: (state) => state.count * 2,
    // 여기서는 타입을 직접 추가해야 합니다 (JS에서 JSDoc 사용).
    // 이를 통해 getter를 문서화할 수도 있습니다.
    /**
     * count 값을 2배로 한 후 1을 더한 값을 반환합니다.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // 자동완성 ✨
      return this.doubleCount + 1
    },
  },
})
```

:::

## getter에 인자 전달하기 %{#passing-arguments-to-getters}%

*Getter*는 단지 내부적으로 **계산형** 프로퍼티일 뿐이므로, 매개변수를 전달할 수 없습니다. 그러나 *getter*에서 함수를 반환하여 임의의 매개변수를 받을 수 있습니다:

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

그리고 컴포넌트에서 사용합니다:

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useUserListStore } from './store'

const userList = useUserListStore()
const { getUserById } = storeToRefs(userList)
// `<script setup>`에서 함수에 접근하려면
// `getUserById.value`를 사용해야 합니다.
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

이렇게 하면 **getter는 더 이상 캐시되지 않습니다**. 단지 호출되는 함수일 뿐입니다. 하지만 getter 자체 내에서 일부 결과를 캐시할 수 있으며, 이는 일반적이지 않지만 성능 향상에 도움이 됩니다:

```js
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

## 다른 Store의 getter에 접근하기 %{#accessing-other-stores-getters}%

다른 Store의 getter를 사용하려면, _getter_ 내부에서 직접 *사용*할 수 있습니다:

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## `setup()`에서 사용하기 %{#usage-with-setup}%

Store의 프로퍼티로 모든 getter에 직접 접근할 수 있습니다(마치 state 프로퍼티처럼):

```vue
<script setup>
const store = useCounterStore()

store.count = 3
store.doubleCount // 6
</script>
```

## Options API에서 사용하기 %{#usage-with-the-options-api}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-getters-in-the-options-api"
  title="Access Pinia Getters via the Options API"
/>

다음 예제는 아래와 같은 Store가 생성되었다고 가정합니다:

```js
// 예제 파일 경로:
// ./src/stores/count.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})
```

### `setup()`에서 %{#with-setup}%

비록 Composition API가 모든 사람에게 적합한 것은 아니지만, `setup()` 훅은 Options API에서 Pinia를 더 쉽게 사용할 수 있게 해줍니다. 추가적인 매핑 헬퍼 함수도 필요 없습니다!

```vue
<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    // 디스트럭처링 대신 store 전체를 반환합니다.
    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
})
</script>
```

이는 컴포넌트를 Options API에서 Composition API로 마이그레이션할 때 유용하지만 **단계적인 마이그레이션 과정**으로만 사용해야 합니다. 항상 동일한 컴포넌트 내에서 두 가지 API 스타일을 혼용하지 않도록 노력하세요.

### `setup()` 없이 %{#without-setup}%

[이전 섹션의 state](./state.md#options-api)에서 사용한 동일한 `mapState()` 함수를 사용하여 getters에 매핑할 수 있습니다:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 컴포넌트 내에서 this.doubleCount로 접근할 수 있게 해줍니다.
    // store.doubleCount로 읽는 것과 동일합니다.
    ...mapState(useCounterStore, ['doubleCount']),
    // 위와 같지만 이를 this.myOwnName으로 등록합니다.
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCount',
      // Store에 접근할 수 있는 함수를 작성할 수도 있습니다.
      double: (store) => store.doubleCount,
    }),
  },
}
```
