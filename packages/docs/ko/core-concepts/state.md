# State (상태) %{#state}%

<!-- <VueSchoolLink
  href="https://vueschool.io/lessons/access-state-from-a-pinia-store"
  title="Learn all about state in Pinia"
/> -->

<MasteringPiniaLink
  href="https://masteringpinia.com/lessons/the-3-pillars-of-pinia-state"
  title="Learn all about state in Pinia"
/>

대부분의 경우, Store는  state를 중심으로 이루어지며, 일반적으로 앱의 state를 정의하는 것부터 시작합니다. Pinia에서 state는 초기 상태를 반환하는 함수로 정의됩니다. 이것은 Pinia가 서버와 클라이언트 측에서 모두 작동할 수 있게 합니다.

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // 완전한 타입 추론을 위해 화살표 함수를 사용하는 것이 좋습니다.
  state: () => {
    return {
      // 이 모든 프로퍼티들은 자동으로 타입이 추론됩니다.
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

:::tip
Vue 2를 사용하고 있다면, `state`에서 생성한 데이터는 Vue 인스턴스의 `data`와 동일한 규칙을 따릅니다. 즉, state 객체는 평범해야 하며, **새로운 프로퍼티를 추가**할 때 `Vue.set()`을 호출해야 합니다. **참고: [Vue#data](https://v2.vuejs.org/v2/api/#data)**.
:::

## TypeScript %{#typescript}%

state를 TS와 호환되게 만들기 위해 많은 노력이 필요하지 않습니다. [`strict`](https://www.typescriptlang.org/tsconfig#strict) 또는 최소한 [`noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis)를 활성화하면 Pinia가 state 타입을 자동으로 추론합니다! 하지만 몇 가지 경우에는 캐스팅으로 보조해야 합니다:

```ts
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // 최초에 비어있는 배열의 경우.
      userList: [] as UserInfo[],
      // 아직 로드되지 않은 데이터의 경우.
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

원한다면, 인터페이스를 사용하여 state를 정의하고 `state()`의 반환 값에 타입을 지정할 수 있습니다:

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

## `state`에 접근 %{#accessing-the-state}%

기본적으로 `store` 인스턴스를 통해 직접 state에 접근하여 읽고 쓸 수 있습니다:

```js
const store = useStore()

store.count++
```

**`state()`에 정의하지 않은** 새로운 프로퍼티를 추가할 수 없습니다. 최초에 state에 포함되어야 합니다. 예를 들어, `secondCount`가 `state()`에 정의되어 있지 않다면, `store.secondCount = 2`를 실행할 수 없습니다.

## state 재설정 %{#resetting-the-state}%

[Option Store](/core-concepts/index.md#option-stores)에서는 Store의 `$reset()` 메서드를 호출하여 state를 초기 값으로 *재설정*할 수 있습니다.

```js
const store = useStore()

store.$reset()
```

내부적으로 이것은 새로운 state 객체를 생성하기 위해 `state()` 함수를 호출하고 현재 state를 그것으로 대체합니다.

[Setup Store](/core-concepts/index.md#setup-stores)에서는 직접 `$reset()` 메서드를 생성해야 합니다:

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

### Options API 사용법 %{#usage-with-the-options-api}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-state-in-the-options-api"
  title="Access Pinia State via the Options API"
/>

다음 예제는 아래와 같은 Store가 생성되었다고 가정합니다:

```js
// 예제 파일 경로:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
})
```

Composition API를 사용하지 않고 `computed`, `methods` 등을 사용하고 있다면, `mapState()` 헬퍼를 사용하여 state 프로퍼티를 읽기 전용 계산형(computed) 프로퍼티로 매핑할 수 있습니다:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 컴포넌트 내에서 this.count로 접근할 수 있습니다.
    // store.count로 읽는 것과 동일합니다.
    ...mapState(useCounterStore, ['counter']),
    // 위와 동일하지만 this.myOwnName으로 등록합니다.
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // Store에 접근할 수 있는 함수를 작성할 수도 있습니다.
      double: store => store.count * 2,
      // `this`에 접근할 수 있지만, 올바르게 타입이 지정되지 않습니다...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```

#### 수정 가능한 state %{#modifiable-state}%

이 state 프로퍼티들을 수정할 수 있도록 하려면(예: 폼이 있는 경우), `mapWritableState()`를 대신 사용해야 합니다. 하지만 `mapState()`처럼 함수를 전달할 수는 없습니다:

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 컴포넌트 내에서 this.count에 접근할 수 있으며 이를 설정할 수 있습니다.
    // this.count++
    // store.count로 읽는 것과 동일합니다.
    ...mapWritableState(useCounterStore, ['count']),
    // 위와 동일하지만 이를 this.myOwnName으로 등록합니다.
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

:::tip
배열 같은 컬렉션의 경우 반드시 `mapWritableState()`를 사용할 필요는 없습니다. 전체 배열을 `cartItems = []`로 바꾸려는 경우가 아니면, `mapState()`를 사용하면 컬렉션에 대한 메서드를 호출할 수도 있습니다.
:::

## state 변경하기 %{#mutating-the-state}%

<!-- TODO: disable this with `strictMode` -->

`store.count++`로 Store를 직접 수정하는 것 외에도 `$patch` 메서드를 호출할 수 있습니다. 이 메서드를 사용하면 `state`의 일부 객체를 패치하여 여러 변경 사항을 동시에 적용할 수 있습니다.

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

하지만 이 문법으로는 일부 변경 사항을 적용하기 어렵거나 비용이 많이 듭니다. 예를 들어, 배열에 요소를 추가하거나 제거 또는 `splice` 작업을 하는 등 컬렉션을 수정하려면 새 컬렉션을 생성해야 합니다. 이 때문에 `$patch` 메서드는 패치 객체로 적용하기 어려운 이러한 종류의 변경을 함수를 사용하여 그룹화할 수도 있습니다.

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

<!-- TODO: disable this with `strictMode`, `{ noDirectPatch: true }` -->

주된 차이점은 `$patch()`가 여러 변경 사항을 devtools에서 하나의 항목으로 그룹화할 수 있다는 점입니다. 또한, **`state`를 직접 변경하는 것과 `$patch()`는 모두 devtools에 나타나며** time travel이 가능합니다 (Vue 3에서는 아직 지원되지 않습니다).

## `state` 교체하기 %{#replacing-the-state}%

Store의 state를 **완전히 교체할 수는 없습니다**. 그렇게 하면 반응성이 깨지기 때문입니다. 하지만 *patch* 할 수는 있습니다:

```js
// 이것은 실제로 `$state`를 교체하지 않습니다.
store.$state = { count: 24 }
// 내부적으로 `$patch()`를 호출합니다:
store.$patch({ count: 24 })
```

`pinia` 인스턴스의 `state`를 변경하여, 전체 애플리케이션의 **초기 state를 설정**할 수도 있습니다. 이는 [SSR 상태 하이드레이션](../ssr/#state-hydration)에서 일반적으로 사용됩니다.

```js
pinia.state.value = {}
```

## state 구독하기 %{#subscribing-to-the-state}%

Vuex의 [subscribe 메서드](https://vuex.vuejs.org/api/index.html#subscribe)과 유사하게,
Store의 `$subscribe()` 메서드를 통해 state 변화를 감지할 수 있습니다. `watch()`를 사용하는 것보다 `$subscribe()`를 사용시 장점은 *subscribe*이 *fetch* 후에 한 번만 트리거된다는 점입니다 (예: 위에서 언급한 함수 방식을 사용할 때).

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // cartStore.$id와 동일.
  mutation.storeId // 'cart'
  // mutation.type === 'patch object'인 경우에만 사용 가능.
  mutation.payload // cartStore.$patch()에 전달된 패치 객체

  // 변경될 때마다 전체 state를 로컬 저장소에 유지합니다.
  localStorage.setItem('cart', JSON.stringify(state))
})
```

기본적으로 *state 구독*은 컴포넌트에 추가한 경우에 바인딩됩니다 (Store가 컴포넌트의 `setup()` 내부에 있는 경우). 이는 해당 컴포넌트가 언마운트될 때 자동으로 제거됨을 의미합니다. 컴포넌트가 언마운트된 후에도 구독을 유지하려면 두 번째 인수로 `{ detached: true }`를 전달하여 *state 구독*을 현재 컴포넌트에서 *분리*하십시오:

```vue
<script setup>
const someStore = useSomeStore()

// 이 구독은 컴포넌트가 언마운트된 후에도 유지됩니다.
someStore.$subscribe(callback, { detached: true })
</script>
```

:::tip
`pinia` 인스턴스에서 단일 `watch()` 함수를 사용하여 전체 state를 *감시*할 수 있습니다.
```js
watch(
  pinia.state,
  (state) => {
    // 변경될 때마다 전체 state를 로컬 저장소에 유지합니다.
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

:::
