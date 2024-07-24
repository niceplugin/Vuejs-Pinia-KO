# Actions (액션) %{#actions}%

<!-- <VueSchoolLink
  href="https://vueschool.io/lessons/synchronous-and-asynchronous-actions-in-pinia"
  title="Learn all about actions in Pinia"
/> -->

<MasteringPiniaLink v-if="false"
  href="https://masteringpinia.com/lessons/the-3-pillars-of-pinia-actions"
  title="Learn all about actions in Pinia"
/>

Actions는 컴포넌트의 [메서드](https://ko.vuejs.org/api/options-state.html#methods)와 동일합니다. `defineStore()`에서 `actions` 프로퍼티로 정의할 수 있으며, **처리해야 할 작업의 로직을 정의하는 데 완벽합니다**:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // `this`에 의존하므로 화살표 함수를 사용할 수 없습니다.
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

[Getters](./getters.md)와 마찬가지로 actions도 `this`를 통해 **전체 Store 인스턴스**에 접근할 수 있으며, **완벽한 타입 지원**(및 자동 완성 ✨)을 제공합니다. **Getters와 달리 `actions`는 비동기적**일 수 있으며, actions 내부에서 API 호출이나 다른 actions를 `await`할 수 있습니다! 여기 [Mande](https://github.com/posva/mande)를 사용하는 예제가 있습니다. 어떤 라이브러리를 사용하는지는 중요하지 않으며, `Promise`를 얻을 수 있으면 됩니다. 심지어 원시 `fetch` 함수(브라우저 전용)를 사용할 수도 있습니다:

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`다시 오신 것을 환영합니다, ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 폼 컴포넌트가 오류를 표시하도록 합니다.
        return error
      }
    },
  },
})
```

Actions는 원하는 인수를 자유롭게 설정하고 원하는 결과를 반환할 수 있습니다. Actions를 호출할 때 모든 것이 자동으로 추론됩니다!

Actions는 일반 함수나 메서드처럼 호출됩니다:

```vue
<script setup>
const store = useCounterStore()
// Action을 Store의 메서드로 호출합니다.
store.randomizeCounter()
</script>

<template>
  <!-- 템플릿에서도 가능합니다. -->
  <button @click="store.randomizeCounter()">Randomize</button>
</template>
```

## 다른 Store의 actions에 접근하기 %{#accessing-other-stores-actions}%

다른 Store를 사용하려면 _action_ 내부에서 직접 *사용*하면 됩니다:

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

## Options API에서 사용하기 %{#usage-with-the-options-api}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-actions-in-the-options-api"
  title="Access Pinia Getters via the Options API"
/>

다음 예제에서는 아래와 같은 Store가 생성되었다고 가정합니다:

```js
// 예제 파일 경로:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### `setup()`에서 %{#with-setup}%

비록 Composition API가 모든 사람에게 적합한 것은 아니지만, `setup()` 훅은 Options API를 사용할 때 Pinia를 더 쉽게 사용할 수 있게 해줍니다. 추가적인 매핑 헬퍼 함수도 필요 없습니다!

```vue
<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    },
  },
})
</script>
```

### `setup()` 없이 %{#without-setup}%

Composition API를 전혀 사용하지 않으려면, `mapActions()` 헬퍼를 사용하여 actions 프로퍼티를 컴포넌트의 메서드로 매핑할 수 있습니다:

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    // 컴포넌트 내에서 this.increment()로 접근할 수 있게 해줍니다.
    // store.increment()로 호출하는 것과 동일합니다.
    ...mapActions(useCounterStore, ['increment']),
    // 위와 같지만 이를 this.myOwnName()으로 등록합니다.
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
```

## Actions 구독하기 %{#subscribing-to-actions}%

`store.$onAction()`을 사용하여 actions와 그 결과를 감시할 수 있습니다. 전달된 콜백 함수는 action 보다 먼저 실행됩니다. `after` 훅 함수는 action에서 return 또는 promise 완료(resolve) 이후 실행됩니다. 비슷하게 `onError` 훅 함수는 action이 오류를 발생(throw)시키거나 promise 실패(reject)할 때 실행됩니다. 이는 [Vue 문서의 팁](https://ko.vuejs.org/guide/best-practices/production-deployment#tracking-runtime-errors)처럼 런타임 오류를 추적하는 데 유용합니다.

여기 실행 전과 action이 resolve/reject된 후에 로그를 기록하는 예제가 있습니다.

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 이름.
    store, // Store 인스턴스, `someStore`와 같음.
    args, // action으로 전달된 매개변수로 이루어진 배열.
    after, // action에서 return 또는 resolve 이후의 훅.
    onError, // action에서 throw 또는 reject 될 경우의 훅.
  }) => {
    // 특정 action 호출 시 사용할 변수를 정의합니다.
    const startTime = Date.now()
    // 이것은 `store`의 action이 실행되기 전에 트리거됩니다.
    console.log(`"${ name }"가 [${ args.join(', ') }] 인자를 전달받아 시작됩니다.`)

    // 이것은 action이 끝까지 실행된 후에 트리거됩니다.
    // 반환된 promise를 기다립니다.
    after((result) => {
      console.log(
        `"${ name }"가 ${
          Date.now() - startTime
        }ms 후 종료됬습니다.\n결과: ${ result }.`
      )
    })

    // action이 throw 되거나 promise가 reject되면 트리거됩니다.
    onError((error) => {
      console.warn(
        `"${ name }"가 ${
          Date.now() - startTime
        }ms 후 실패했습니다.\n애러: ${ error }.`
      )
    })
  }
)

// 리스너를 수동으로 제거합니다.
unsubscribe()
```

기본적으로 *action 구독*은 컴포넌트에 추가한 경우에 바인딩됩니다 (Store가 컴포넌트의 `setup()` 내부에 있는 경우). 이는 해당 컴포넌트가 마운트 해제될 때 자동으로 제거됨을 의미합니다. 컴포넌트가 마운트 해제된 후에도 구독을 유지하려면 *action 구독*의 두 번째 인수로 `true`를 전달하여 현재 컴포넌트에서 분리하십시오:

```vue
<script setup>
const someStore = useSomeStore()

// 이 구독은 컴포넌트가 마운트 해제된 후에도 유지됩니다.
someStore.$onAction(callback, true)
</script>
```