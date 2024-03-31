# 상태

<VueSchoolLink
  href="https://vueschool.io/lessons/access-state-from-a-pinia-store"
  title="Pinia에서 상태에 대해 알아보기"
/>

상태는 대부분의 경우, 당신의 스토어의 핵심 부분입니다. 사람들은 종종 그들의 앱을 대표하는 상태를 정의하기로 시작합니다. Pinia에서 상태는 초기 상태를 반환하는 함수로 정의됩니다. 이를 통해 Pinia는 서버와 클라이언트 측 모두에서 작동할 수 있습니다.

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // 전체 유형 추론을 위해 화살표 함수 권장
  state: () => {
    return {
      // 이 모든 속성들은 자동으로 그들의 유형이 추론될 것입니다
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

::: tip
Vue 2를 사용하는 경우, `state`에서 생성된 데이터는 Vue 인스턴스의 `data`와 같은 규칙을 따릅니다. 즉, 상태 객체는 평범해야 하며, **새로운** 속성을 추가할 때는 `Vue.set()`을 호출해야 합니다. **참조: [Vue#data](https://v2.vuejs.org/v2/api/#data)**.
:::

## TypeScript

상태를 TS와 호환되게 만들기 위해 많은 것을 할 필요가 없습니다: [`strict`](https://www.typescriptlang.org/tsconfig#strict)이, 또는 적어도 [`noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis)가 활성화되어 있는지 확인하십시오. 그러면 Pinia는 자동으로 상태의 타입을 추론할 것입니다! 그러나, 타입 지정에 도움을 줄 몇 가지 경우가 있습니다:

```ts
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // 처음에 비어 있는 목록의 경우
      userList: [] as UserInfo[],
      // 데이터가 아직 로드되지 않은 경우
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

원한다면, 인터페이스로 상태를 정의하고 `state()`의 반환값을 타입으로 지정할 수 있습니다:

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

## `state`에 접근하기

기본적으로, `store` 인스턴스를 통해 상태에 직접 읽기 및 쓰기를 할 수 있습니다:

```js
const store = useStore()

store.count++
```

`state()`에서 **정의하지 않은** 새 상태 속성을 추가할 수 없습니다. 초기 상태를 포함해야 합니다. 예: `store.secondCount = 2`를 할 수 없습니다, 만약 `secondCount`가 `state()`에 정의되어 있지 않다면.

## 상태 초기화하기

[옵션 스토어](/core-concepts/index.md#option-stores)에서, `$reset()` 메서드를 스토어에 호출함으로써 상태를 초기 값으로 _초기화_ 할 수 있습니다:

```js
const store = useStore()

store.$reset()
```

내부적으로, 이는 새 상태 객체를 생성하는 `state()` 함수를 호출하고 현재 상태를 대체합니다.

[설정 스토어](/core-concepts/index.md#setup-stores)에서, 당신은 자신의 `$reset()` 메서드를 생성해야 합니다:

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

### 옵션 API와 함께 사용하기

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-state-in-the-options-api"
  title="옵션 API를 통해 Pinia 상태에 접근하기"
/>

다음 예제들을 위해, 다음과 같은 스토어가 생성되었다고 가정할 수 있습니다:

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

Composition API를 사용하지 않고 `computed`, `methods`, ...를 사용하는 경우, 상태 속성을 읽기 전용 계산된 속성으로 매핑하기 위해 `mapState()` 헬퍼를 사용할 수 있습니다:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 컴포넌트 내부에서 this.count에 접근 허용
    // store.count에서 읽는 것과 같음
    ...mapState(useCounterStore, ['count'])
    // 위와 동일하지만 this.myOwnName으로 등록
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // 스토어에 접근하는 함수를 작성할 수도 있음
      double: store => store.count * 2,
      // `this`에 접근할 수 있지만 정확하게 타입이 지정되지 않을 수 있음...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```

#### 수정 가능한 상태

이러한 상태 속성을 쓰기 위해 (예: 폼을 가지고 있다면) `mapWritableState()`를 대신 사용할 수 있습니다. `mapState()`와 같이 함수를 전달할 수는 없음에 주의하십시오:

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 컴포넌트 내부에서 this.count에 접근 및 설정 허용
    // this.count++
    // store.count에서 읽는 것과 같음
    ...mapWritableState(useCounterStore, ['count']),
    // 위와 동일하지만 this.myOwnName으로 등록
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

::: tip
배열과 같은 컬렉션에 대해서는 `cartItems = []`로 전체 배열을 교체하는 경우가 아니면 `mapWritableState()`가 필요하지 않습니다. `mapState()`는 여전히 컬렉션에서 메서드를 호출할 수 있게 합니다.
:::

## 상태 변경하기

`store.count++`로 스토어를 직접 변경하는 것 외에도, 여러 변경 사항을 동시에 적용할 수 있는 `$patch` 메서드를 호출할 수 있습니다. 이는 부분 `state` 객체로 여러 변경 사항을 한 번에 적용합니다:

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

그러나, 이 구문으로 적용하기 어렵거나 비용이 많이 드는 일부 변경 사항(예: 배열에서 요소를 푸시, 제거, 스플라이스하는 것)은 새 컬렉션을 생성해야 합니다. 이 때문에, `$patch` 메서드는 이러한 유형의 변경 사항을 그룹화할 수 있는 함수도 허용합니다:

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

주요 차이점은 `$patch()`가 개발자 도구에서 한 번에 여러 변경 사항을 하나의 항목으로 그룹화할 수 있게 해준다는 것입니다. **`state`에 대한 직접 변경과 `$patch()` 모두 개발자 도구에 나타나며** 시간 여행이 가능합니다(아직 Vue 3에서는 아님).

## `state` 교체하기

스토어의 상태를 정확히 교체할 수는 **없습니다**. 그렇게 하면 반응성이 깨집니다. 하지만 _패치할 수는_ 있습니다:

```js
// 이것은 실제로 `$state`를 교체하지 않습니다
store.$state = { count: 24 }
// 내부적으로 `$patch()`를 호출합니다:
store.$patch({ count: 24 })
```

또한, 전체 애플리케이션의 **초기 상태**를 `pinia` 인스턴스의 `state`를 변경하여 설정할 수 있습니다. 이는 [SSR을 위한 하이드레이션](../ssr/#state-hydration) 동안 사용됩니다.

```js
pinia.state.value = {}
```

## 상태를 구독하기

Vuex의 [구독 메서드](https://vuex.vuejs.org/api/#subscribe)와 유사하게, 스토어의 `$subscribe()` 메서드를 통해 상태와 그 변화를 관찰할 수 있습니다. _패치_ (예: 위의 함수 버전 사용 시) 후 _구독_이 한 번만 트리거되므로, 일반적인 `watch()`보다 `$subscribe()`를 사용하는 것이 좋습니다.

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // cartStore.$id와 동일
  mutation.storeId // 'cart'
  // mutation.type === 'patch object'일 때만 사용 가능
  mutation.payload // cartStore.$patch()에 전달된 패치 객체

  // 상태가 변경될 때마다 전체 상태를 로컬 스토리지에 지속
  localStorage.setItem('cart', JSON.stringify(state))
})
```

기본적으로, _상태 구독_은 추가된 컴포넌트의 `setup()` 내부에 있는 스토어에 바인딩됩니다. 즉, 컴포넌트가 마운트 해제될 때 자동으로 제거됩니다. 컴포넌트가 마운트 해제된 후에도 그들을 유지하려면, 현재 컴포넌트로부터 _상태 구독_을 _분리_하기 위해 두 번째 인수로 `{ detached: true }`를 전달하십시오:

```vue
<script setup>
const someStore = useSomeStore()

// 이 구독은 컴포넌트가 마운트 해제된 후에도 유지됩니다
someStore.$subscribe(callback, { detached: true })
</script>
```

::: tip
단일 `watch()`로 `pinia` 인스턴스에서 전체 상태를 _감시_할 수 있습니다:

```js
watch(
  pinia.state,
  (state) => {
    // 상태가 변경될 때마다 전체 상태를 로컬 스토리지에 지속
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

:::
