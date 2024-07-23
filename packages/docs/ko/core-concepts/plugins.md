# Plugins (플러그인) %{#plugins}%

<MasteringPiniaLink v-if="false"
  href="https://masteringpinia.com/lessons/What-is-a-pinia-plugin"
  title="Learn all about Pinia plugins"
/>

기본 API 지원 덕분에 Pinia Store는 이제 확장 기능을 완벽하게 지원합니다. 확장할 수 있는 내용은 다음과 같습니다:

- Store에 새로운 프로퍼티 추가
- Store를 정의할 때 새로운 옵션 추가
- Store에 새로운 메서드 추가
- 기존 메서드 래핑
- action을 변경하거나 취소
- [로컬 스토리지](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 같은 사이드 이펙트 구현
- 특정 Store에만 플러그인 **적용**

플러그인은 `pinia.use()`를 사용하여 pinia 인스턴스에 추가합니다. 가장 간단한 예는 객체를 반환하여 모든 Store에 정적 프로퍼티를 추가하는 것입니다:

```js
import { createPinia } from 'pinia'

// 이 플러그인이 설치된 후 생성된 모든 Store에 `secret`라는 프로퍼티가 추가됩니다.
// 이 플러그인은 다른 파일에 있을 수 있습니다.
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 이 플러그인을 Pinia에 제공.
pinia.use(SecretPiniaPlugin)

// 다른 파일에서
const store = useStore()
store.secret // 'the cake is a lie'
```

이것은 라우터, 모달, 토스트 관리자와 같은 전역 객체를 추가하는 데 유용합니다.

## 소개 %{#introduction}%

Pinia 플러그인은 Store에 추가할 프로퍼티를 선택적으로 반환하는 함수입니다. 이 함수는 선택적 인자인 *context*를 받습니다:

```js
export function myPiniaPlugin(context) {
  context.pinia // `createPinia()`로 생성된 pinia
  context.app // `createApp()`으로 생성된 현재 앱 (Vue 3만 해당)
  context.store // 플러그인이 확장하려는 Store
  context.options // `defineStore()`에 전달된 Store를 정의하는 options 객체
  // ...
}
```

이 함수를 `pinia.use()`를 사용하여 `pinia`에 전달합니다:

```js
pinia.use(myPiniaPlugin)
```

플러그인은 **`pinia`가 애플리케이션에 전달된 후** 생성된 Store에만 적용됩니다. 그렇지 않으면 적용되지 않습니다.

## Store 확장하기 %{#augmenting-a-store}%

각 Store에 특정 프로퍼티를 추가하기 위해 다음과 같이 플러그인에서 프로퍼티가 포함된 객체를 반환할 수 있습니다:

```js
pinia.use(() => ({ hello: 'world' }))
```

`store`에 직접 프로퍼티를 설정할 수도 있지만, **가능하면 객체 반환 방법을 사용하여 devtools에서 자동으로 추적할 수 있도록 하는 것이 좋습니다**:

```js
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

플러그인에서 *반환된* 모든 프로퍼티는 devtools에서 자동으로 추적되므로, `hello` 프로퍼티를 devtools에서 디버깅하려면 dev 모드에서 이를 `store._customProperties`에 추가해야 합니다:

```js
// 위의 예제에서
pinia.use(({ store }) => {
  store.hello = 'world'
  // 빌드 도구가 이 문제를 처리할 수 있는지 확인하세요. webpack과 vite는 기본적으로 이것을 처리할 수 있습니다.
  if (process.env.NODE_ENV === 'development') {
    // Store에 설정된 키 값을 추가합니다.
    store._customProperties.add('hello')
  }
})
```

각 Store는 [`reactive`](https://ko.vuejs.org/api/reactivity-core.html#reactive)로 래핑되어 있으므로, 포함된 Ref(`ref()`, `computed()`, ...)를 자동으로 래핑 해제할 수 있습니다:

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // 각 Store에는 개별 `hello` 프로퍼티가 있습니다.
  store.hello = ref('secret')
  // 자동으로 래핑 해제됩니다.
  store.hello // 'secret'

  // 모든 store는 `shared` 프로퍼티 값을 공유합니다.
  store.shared = sharedRef
  store.shared // 'shared'
})
```

이것이 `.value` 없이도 모든 계산형 프로퍼티에 접근할 수 있는 이유이며, 그들이 반응형인 이유입니다.

### 새로운 state 추가하기 %{#adding-new-state}%

Store에 새로운 state 프로퍼티를 추가하거나 서버 사이드 렌더링의 하이드레이션 과정에서 사용되는 프로퍼티를 추가하려면, **반드시 두 곳에 동시에 추가해야 합니다**.

- `store`에 추가한 후 `store.myState`로 접근할 수 있습니다.
- `store.$state`에 추가한 후 devtools에서 사용할 수 있으며, **SSR 시 올바르게 직렬화(serialized)** 됩니다.

또한 다른 곳에서 접근할 때에도 값이 공유되도록 `ref()`(또는 다른 반응형 API)를 반드시 사용해야 합니다:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // SSR을 올바르게 처리하기 위해,
  // 기존 값을 덮어쓰지 않도록 해야 합니다.
  if (!store.$state.hasOwnProperty('hasError')) {
    // 플러그인에서 hasError를 정의하여,
    // 각 Store가 개별적인 hasError state를 가지도록 합니다.
    const hasError = ref(false)
    // `$state`에 변수를 설정하여, SSR 동안 직렬화될 수 있도록 합니다.
    store.$state.hasError = hasError
  }
  // state에서 Store로 ref를 이동시켜서
  // store.hasError와 store.$state.hasError가
  // 동일한 변수를 공유하도록 합니다.
  // 참고: https://ko.vuejs.org/api/reactivity-utilities.html#toref
  store.hasError = toRef(store.$state, 'hasError')
  
  // 이 경우 `hasError`를 반환하지 않는 것이 좋습니다.
  // 반환하면 devtools의 `state` 섹션에 두 번 표시됩니다.
  
})
```

플러그인에서 state 변경 또는 추가(`store.$patch()` 호출 포함)는 store가 활성화되기 전에 발생하므로, **어떠한 구독 함수도 트리거되지 않습니다**.

:::warning
**Vue 2**를 사용하는 경우, Pinia는 Vue와 마찬가지로 [동일한 반응형 제한](https://v2.vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)에 의해 제한됩니다. 새로운 state 프로퍼티인 `secret` 및 `hasError`를 만들 때 `Vue.set()` (Vue 2.7) 또는 `@vue/composition-api`의 `set()` (Vue < 2.7)를 사용해야 합니다:

```js
import { set, toRef } from '@vue/composition-api'
pinia.use(({ store }) => {
  if (!store.$state.hasOwnProperty('secret')) {
    const secretRef = ref('secret')
    // 이 데이터가 SSR 과정에서 사용될 경우,
    // `$state` 프로퍼티에 설정하여 직렬화되고
    // 하이드레이션 과정에서 수신되도록 합니다.
    set(store.$state, 'secret', secretRef)
  }
  // store에 직접 설정하여 접근할 수 있도록 합니다.
  // `store.$state.secret` / `store.secret` 모두 가능합니다.
  set(store, 'secret', toRef(store.$state, 'secret'))
  store.secret // 'secret'
})
```

:::

#### 플러그인에서 추가한 state 재설정 %{#resetting-state-added-in-plugins}%

기본적으로 `$reset()`은 플러그인이 추가한 state를 재설정하지 않습니다. 하지만, 추가한 state를 재설정하도록 재정의할 수 있습니다:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // 위의 코드와 동일하며 참고용입니다.
  if (!store.$state.hasOwnProperty('hasError')) {
    const hasError = ref(false)
    store.$state.hasError = hasError
  }
  store.hasError = toRef(store.$state, 'hasError')

  // 컨텍스트 (`this`)를 store로 설정합니다.
  const originalReset = store.$reset.bind(store)

  // $reset 함수 재정의 합니다.
  return {
    $reset() {
      originalReset()
      store.hasError = false
    },
  }
})
```

## 새로운 외부 프로퍼티 추가하기 %{#adding-new-external-properties}%

외부 프로퍼티, 서드파티 라이브러리의 클래스 인스턴스 또는 비반응성의 간단한 값을 추가할 때는 먼저 `markRaw()`로 이를 래핑한 후, pinia에 전달해야 합니다. 다음은 각 store에 라우터를 추가하는 예제입니다:

```js
import { markRaw } from 'vue'
// 라우터의 위치에 따라 이를 조정하세요.
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

## 플러그인에서 `$subscribe` 호출하기 %{#calling-subscribe-inside-plugins}%

플러그인 내에서 [store.$subscribe](./state.md#subscribing-to-the-state)와 [store.$onAction](./actions.md#subscribing-to-actions)을 사용할 수 있습니다:

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // store 변경에 응답
  })
  store.$onAction(() => {
    // store actions에 응답
  })
})
```

## 새로운 옵션 추가하기 %{#adding-new-options}%

Store를 정의할 때, 플러그인에서 사용할 수 있는 새로운 옵션을 만들 수 있습니다. 예를 들어, 모든 action에 디바운스를 적용할 수 있는 `debounce` 옵션을 만들 수 있습니다:

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // 이는 이후에 플러그인에서 읽혀집니다.
  debounce: {
    // searchContacts action을 300ms 디바운스 처리.
    searchContacts: 300,
  },
})
```

그런 다음 플러그인은 해당 옵션을 읽어 action을 래핑하고 원래 action을 대체할 수 있습니다:

```js
// 임의의 디바운스 라이브러리 사용
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // 새로운 action으로 기존 action을 덮어씁니다.
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```

Setup 문법을 사용하는 경우, 사용자 정의 옵션이 세 번째 인자로 전달된다는 점에 유의하세요:

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // 이는 이후에 플러그인에서 읽혀집니다.
    debounce: {
      // searchContacts action을 300ms 디바운스 처리.
      searchContacts: 300,
    },
  }
)
```

## TypeScript

위에서 보여준 모든 기능은 타입이 지원되므로 `any` 또는 `@ts-ignore`를 사용할 필요가 없습니다.

### 플러그인 타입 지정 %{#typing-plugins}%

Pinia 플러그인은 다음과 같은 방식으로 타입을 지정할 수 있습니다:

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

### 새로운 Store 프로퍼티에 타입 추가 %{#typing-new-store-properties}%

Store에 새로운 프로퍼티를 추가할 때는 `PiniaCustomProperties` 인터페이스를 확장해야 합니다.

```ts
import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // setter를 사용하여 문자열과 ref를 모두 허용합니다.
    set hello(value: string | Ref<string>)
    get hello(): string

    // 더 간단한 값도 정의할 수 있습니다.
    simpleNumber: number

    // 이 페이지의 "새로운 외부 프로퍼티 추가하기" 섹션에서 플러그인에 추가한 라우터의 타입 정의.
    router: Router
  }
}
```

그런 다음 안전하게 읽고 쓸 수 있습니다:

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // @ts-expect-error: 올바르게 타입을 지정하지 않았습니다.
  store.simpleNumber = ref(Math.random())
})
```

`PiniaCustomProperties`는 Store의 프로퍼티를 참조할 수 있는 제네릭 타입입니다. 다음 예제에서 초기 옵션을 `$options`로 복사하는 경우를 생각해 봅시다(이것은 Options Store에서만 작동합니다):

```ts
pinia.use(({ options }) => ({ $options: options }))
```

`PiniaCustomProperties`의 4가지 제네릭 타입을 사용하여 이를 적절하게 타입 지정할 수 있습니다:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
```

:::tip
제네릭에서 타입을 확장할 때는 **소스 코드와 정확히 일치하게** 이름을 지정해야 합니다. `Id`는 `id`나 `I`로 이름을 지정할 수 없으며, `S`는 `State`로 이름을 지정할 수 없습니다. 다음은 각 글자가 의미하는 바입니다:

- S: State
- G: Getters
- A: Actions
- SS: Setup Store / Store

:::

### 새로운 state에 타입 지정하기 %{#typing-new-state}%

새로운 state 프로퍼티를 추가할 때(`store`와 `store.$state` 모두), 타입을 `PiniaCustomStateProperties`에 추가해야 합니다. `PiniaCustomProperties`와 다르게, `State` 제네릭만 받습니다:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

### 새로운 정의 옵션에 타입 지정하기 %{#typing-new-creation-options}%

`defineStore()`에 새로운 옵션을 생성할 때는 `DefineStoreOptionsBase`를 확장해야 합니다. `PiniaCustomProperties`와 다르게, 두 개의 제네릭(State와 Store 타입)만 노출하여 정의할 수 있는 옵션의 타입을 제한할 수 있습니다. 예를 들어, action의 이름을 사용할 수 있습니다:

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // 모든 action은 디바운스 시간을 밀리초 단위로 정의할 수 있도록 허용합니다.
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

:::tip
또한 Store 타입에서 *getters*를 추출하는 `StoreGetters` 타입이 있습니다. 또한 *setup stores*나 *option stores*의 옵션을 확장하려면 각각 `DefineStoreOptions`와 `DefineSetupStoreOptions` 타입을 확장하여야 합니다.
:::

## Nuxt.js

[Nuxt에서 pinia를 사용할 때](../ssr/nuxt.md)는 먼저 [Nuxt 플러그인](https://nuxt.com/docs/guide/directory-structure/plugins)을 만들어야 합니다. 이렇게 하면 `pinia` 인스턴스에 접근할 수 있습니다:

```ts{14-16}
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // Store 변경에 반응합니다.
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // TS를 사용하는 경우 타입을 추가해야 합니다.
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
})
```

::: info

위의 예제는 TypeScript를 사용하고 있습니다. `.js` 파일을 사용하는 경우 `PiniaPluginContext`와 `Plugin`의 타입 주석 및 해당 import를 제거해야 합니다.

:::

### Nuxt.js 2

Nuxt.js 2를 사용하는 경우, 타입이 약간 다릅니다:

```ts{3,15-17}
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // Store 변경에 반응합니다.
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // TS를 사용하는 경우 타입을 추가해야 합니다.
  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
}

export default myPlugin
```
