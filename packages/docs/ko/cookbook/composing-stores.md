# Store 조합하기 %{#composing-stores}%

Store를 조합하는 것은 서로를 사용하는 Store를 의미하며, 이는 Pinia에서 지원됩니다. 대신 따라야 할 규칙이 하나 있습니다.

**두 개 이상의 Store가 서로를 사용할 경우**, *getter*나 *action*을 통해 무한 루프를 만들 수 없습니다. setup 함수에서 서로의 state를 **직접** 읽을 수 없습니다:

```js
const useX = defineStore('x', () => {
  const y = useY()

  // ❌ y도 x.name을 읽으려고 하기 때문에 이는 불가능합니다.
  y.name

  function doSomething() {
    // ✅ 계산형 프로퍼티나 action에서 y 프로퍼티를 읽습니다.
    const yName = y.name
    // ...
  }

  return {
    name: ref('I am X'),
  }
})

const useY = defineStore('y', () => {
  const x = useX()

  // ❌ x도 y.name을 읽으려고 하기 때문에 이는 불가능합니다.
  x.name

  function doSomething() {
    // ✅ 계산형 프로퍼티나 action에서 x 프로퍼티를 읽습니다.
    const xName = x.name
    // ...
  }

  return {
    name: ref('I am Y'),
  }
})
```

## 중첩된 Store %{#nested-stores}%

한 Store가 다른 Store를 사용할 경우, *getter*와 *action* 내에서 `useStore()` 함수를 직접 불러오고 호출할 수 있습니다. 그런 다음 Vue 컴포넌트 내에서처럼 Store와 상호작용할 수 있습니다. [공유된 Getters](#Shared-Getters) 및 [공유된 Actions](#Shared-Actions)를 참고하세요.

*Setup Store*에 대해서는, Store 함수의 **최상단**에서 Store 중 하나를 간단히 사용할 수 있습니다:

```ts
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const user = useUserStore()
  const list = ref([])

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${list.value.length} items in your cart. It costs ${price.value}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  return { summary, purchase }
})
```

## 공유된 Getters %{#shared-getters}%

*getter* 내에서 `useUserStore()`를 간단히 호출할 수 있습니다:

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  getters: {
    summary(state) {
      const user = useUserStore()

      return `Hi ${user.name}, you have ${state.list.length} items in your cart. It costs ${state.price}.`
    },
  },
})
```

## 공유된 Actions %{#shared-actions}%

*actions*에도 동일하게 적용됩니다:

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        // 다른 action
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```

Action은 비동기일 수 있으므로 **모든 `useStore()` 호출이 `await` 전에 작성되어야** 합니다. 그렇지 않으면 *SSR 앱*에서 잘못된 pinia 인스턴스를 사용할 수 있습니다:

```js{7-8,11-13}
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      // ✅ `await` 이전에 action의 맨 위에서 호출.
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        // ❌ `await` 구문 이후에 호출.
        const otherStore = useOtherStore()
        // 다른 액션
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```
