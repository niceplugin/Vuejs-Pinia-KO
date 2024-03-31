# 플러그인

Pinia 스토어는 저수준 API 덕분에 완전히 확장될 수 있습니다. 여기 당신이 할 수 있는 몇 가지 사항이 있습니다:

- 상점에 새 속성 추가
- 상점을 정의할 때 새로운 옵션 추가
- 상점에 새 메소드 추가
- 기존 메소드 감싸기
- 작업과 그 결과를 가로채기
- [로컬 스토리지](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)와 같은 부수 효과 구현
- **오직** 특정 상점에만 적용

플러그인은 `pinia.use()`로 pinia 인스턴스에 추가됩니다. 모든 스토어에 정적 속성을 추가하는 가장 단순한 예제는 객체를 반환하는 것입니다:

```js
import { createPinia } from 'pinia'

// 이 플러그인이 설치된 후 생성된 모든 스토어에 `secret`이라는 속성을 추가합니다.
// 이는 다른 파일에서도 사용될 수 있습니다.
function SecretPiniaPlugin() {
  return { secret: '케이크는 거짓말이다' }
}

const pinia = createPinia()
// 플러그인을 pinia에 제공합니다.
pinia.use(SecretPiniaPlugin)

// 다른 파일에서
const store = useStore()
store.secret // '케이크는 거짓말이다'
```

이는 라우터, 모달 또는 토스트 관리자와 같은 전역 객체를 추가하는데 유용합니다.

## 소개

Pinia 플러그인은 선택적으로 스토어에 추가될 속성을 반환하는 함수입니다. 이는 하나의 선택적 인자인 _컨텍스트_를 받습니다:

```js
export function myPiniaPlugin(context) {
  context.pinia // `createPinia()`로 생성된 pinia
  context.app // `createApp()`(Vue 3만 해당)으로 생성된 현재 앱
  context.store // 플러그인이 확장하고 있는 스토어
  context.options // `defineStore()`로 스토어를 정의할 때 전달된 옵션 객체
  // ...
}
```

그런 다음 이 함수는 `pinia.use()`를 통해 `pinia`에 전달됩니다:

```js
pinia.use(myPiniaPlugin)
```

플러그인은 **플러그인 자체보다 뒤에 그리고 `pinia`가 앱에 전달된 후에 생성된 스토어에만 적용됩니다.** 그렇지 않으면 적용되지 않습니다.

## 스토어 확장하기

플러그인에서 객체를 그저 반환함으로써 모든 스토어에 속성을 추가할 수 있습니다:

```js
pinia.use(() => ({ hello: '세계' }))
```

또한, `store`에 직접 속성을 설정할 수도 있지만 **가능하다면 리턴 버전을 사용하여 devtools에서 자동으로 추적되게 하는 것이 좋습니다**:

```js
pinia.use(({ store }) => {
  store.hello = '세계'
})
```

플러그인에 의해 _반환된_ 모든 속성은 devtools에서 자동으로 추적되므로, `hello`를 devtools에서 볼 수 있게 하려면, **개발 모드에서만** 이것을 `store._customProperties`에 추가해야 합니다:

```js
// 위 예제에서
pinia.use(({ store }) => {
  store.hello = '세계'
  // 번들러가 이를 처리할 수 있도록 합니다. webpack과 vite는 기본적으로 처리합니다.
  if (process.env.NODE_ENV === 'development') {
    // store에 설정한 모든 키를 추가합니다.
    store._customProperties.add('hello')
  }
})
```

모든 스토어는 [`reactive`](https://vuejs.org/api/reactivity-core#reactive)로 래핑되므로, 여기에 포함된 모든 Ref(`ref()`, `computed()` 등)가 자동으로 언래핑됩니다:

```js
const sharedRef = ref('공유됨')
pinia.use(({ store }) => {
  // 각 스토어는 개별적인 `hello` 속성을 갖습니다.
  store.hello = ref('비밀')
  // 자동으로 언래핑됩니다.
  store.hello // '비밀'

  // 모든 스토어는 `shared` 속성의 값을 공유합니다.
  store.shared = sharedRef
  store.shared // '공유됨'
})
```

이것이 `.value` 없이 모든 계산된 속성에 접근할 수 있고, 왜 그것들이 반응적인지에 대한 이유입니다.

### 새로운 상태 추가하기

스토어에 새로운 상태 속성을 추가하거나 하이드레이션 중에 사용될 속성을 추가하려면 **두 곳에 추가해야 합니다**:

- `store`에 접근할 수 있도록 하기 위해
- devtools에서 사용할 수 있고 **SSR 중에 직렬화될 수 있도록** `store.$state`에

이런 경우, ref() (또는 다른 반응형 API)를 사용하여 다른 접근들 간에 값을 공유할 필요가 거의 확실합니다:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // SSR을 올바르게 처리하기 위해,
  // 우리는 기존 값이 덮어쓰이지 않도록 해야 합니다.
  if (!store.$state.hasOwnProperty('hasError')) {
    // hasError는 플러그인 내에서 정의되므로, 각 스토어는 개별적인
    // 상태 속성을 가집니다.
    const hasError = ref(false)
    // `$state`에 변수를 설정하면 SSR 중에 직렬화할 수 있습니다.
    store.$state.hasError = hasError
  }
  // 상태에서 스토어로 ref를 전달해야 합니다. 이렇게 하면
  // 두 가지 접근: store.hasError와 store.$state.hasError 모두 작동하고
  // 같은 변수를 공유하게 됩니다.
  // 참고: https://vuejs.org/api/reactivity-utilities.html#toref
  store.hasError = toRef(store.$state, 'hasError')

  // 이 경우 `hasError`를 반환하는 것이 좋지 않습니다.
  // 어차피 devtools의 `state` 섹션에 표시될 것이고, 만약 반환한다면
  // devtools에서 두 번 표시될 겁니다.
})
```

플러그인 내에서 발생하는 상태 변경사항이나 추가사항(스토어에 `store.$patch()`를 호출하는 것을 포함하여)은 스토어가 활성화되기 전에 발생하므로 **어떠한 구독도 트리거하지 않습니다**.

::: warning
**Vue 2**를 사용하는 경우, Pinia는 Vue와 동일한 [반응성 경고](https://v2.vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)에 영향을 받습니다. `secret`과 `hasError`와 같은 새로운 상태 속성을 생성할 때는 Vue 2.7에서 `Vue.set()`을 사용하거나 Vue <2.7의 경우 `@vue/composition-api`에서 `set()`을 사용해야 합니다:

```js
import { set, toRef } from '@vue/composition-api'
pinia.use(({ store }) => {
  if (!store.$state.hasOwnProperty('secret')) {
    const secretRef = ref('비밀')
    // 데이터가 SSR 중에 사용될 예정이라면
    // 직렬화되고 하이드레이션 중에 인식되도록
    // `$state` 속성에 설정해야 합니다.
    set(store.$state, 'secret', secretRef)
  }
  // 직접 스토어에도 설정하여
  // `store.$state.secret` / `store.secret` 두 가지 방식으로 접근할 수 있습니다.
  set(store, 'secret', toRef(store.$state, 'secret'))
  store.secret // '비밀'
})
```

:::

#### 플러그인에서 추가된 상태 리셋하기

기본적으로 `$reset()`은 플러그인에 의해 추가된 상태를 리셋하지 않지만, 추가한 상태도 리셋하도록 오버라이드할 수 있습니다:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // 참조 코드를 위해 위와 같은 코드입니다.
  if (!store.$state.hasOwnProperty('hasError')) {
    const hasError = ref(false)
    store.$state.hasError = hasError
  }
  store.hasError = toRef(store.$state, 'hasError')

  // 스토어를 (`this`)로 컨텍스트 설정을 확실히 합니다.
  const originalReset = store.$reset.bind(store)

  // $reset 함수를 오버라이드합니다.
  return {
    $reset() {
      originalReset()
      store.hasError = false
    },
  }
})
```

## 새로운 외부 속성 추가하기

외부 속성, 다른 라이브러리로부터 오는 클래스 인스턴스, 혹은 단순히 반응형이 아닌 것들을 추가할 때, pinia에 전달하기 전에 `markRaw()`로 객체를 래핑해야 합니다. 여기 모든 스토어에 라우터를 추가하는 예시가 있습니다:

```js
import { markRaw } from 'vue'
// 라우터가 있는 곳에 따라 이를 적응하세요.
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

## 플러그인 내부에서 `$subscribe` 호출하기

플러그인 내에서도 [store.$subscribe](./state.md#subscribing-to-the-state)와 [store.$onAction](./actions.md#subscribing-to-actions)을 사용할 수 있습니다:

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // 스토어 변경사항에 반응합니다.
  })
  store.$onAction(() => {
    // 스토어 액션에 반응합니다.
  })
})
```

## 새로운 옵션 추가하기

스토어를 정의할 때 새로운 옵션을 생성한 다음, 플러그인에서 그 옵션을 나중에 사용할 수 있습니다. 예를 들어, 어떤 액션을 디바운스할 수 있도록 하는 `debounce` 옵션을 만들 수 있습니다:

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // 나중에 플러그인에서 읽을 것입니다.
  debounce: {
    // 액션 searchContacts을 300ms 동안 디바운스합니다.
    searchContacts: 300,
  },
})
```

그런 다음 플러그인은 그 옵션을 읽어 원래 액션을 대체하는 새로운 액션으로 액션을 래핑할 수 있습니다:

```js
// 디바운스 라이브러리 사용
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // 새로운 액션으로 액션을 덮어쓰고 있습니다.
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

설정 구문을 사용할 때, 사용자 정의 옵션은 세 번째 인자로 전달됩니다:

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // 나중에 플러그인에서 읽을 것입니다.
    debounce: {
      // 액션 searchContacts을 300ms 동안 디바운스합니다.
      searchContacts: 300,
    },
  }
)
```

## TypeScript

위에 표시된 모든 것은 타입 지정 지원을 사용하여 수행될 수 있으므로, `any` 또는 `@ts-ignore`을 사용할 필요가 없습니다.

### 플러그인 타입 지정

Pinia 플러그인은 다음과 같이 타입 지정될 수 있습니다:

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

### 새로운 스토어 속성 타입 지정

스토어에 새로운 속성을 추가할 때는, `PiniaCustomProperties` 인터페이스를 확장해야 합니다.

```ts
import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // setter를 사용하여 문자열과 refs 모두를 허용합니다.
    set hello(value: string | Ref<string>)
    get hello(): string

    // 더 단순한 값도 정의할 수 있습니다.
    simpleNumber: number

    // 위의 플러그인에 의해 추가된 라우터를 타입화합니다.(#새로운-외부-속성-추가하기)
    router: Router
  }
}
```

그런 다음 안전하게 작성하고 읽을 수 있습니다:

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // @ts-expect-error: 우리는 이것을 올바르게 타입하지 않았습니다.
  store.simpleNumber = ref(Math.random())
})
```

`PiniaCustomProperties`는 스토어의 속성을 참조할 수 있는 제네릭 타입입니다. 다음 예시에서는 초기 옵션을 `$options`로 복사하는 경우를 상상해 보십시오(이는 옵션 스토어에서만 작동합니다):

```ts
pinia.use(({ options }) => ({ $options: options }))
```

`PiniaCustomProperties`의 4가지 제네릭 유형을 사용하여 이를 적절히 타입할 수 있습니다:

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

::: tip
제네릭에서 타입을 확장할 때, 소스 코드에서와 **정확히 같은 이름**이어야 합니다. `Id`는 `id`나 `I`로 명명될 수 없으며, `S`는 `State`로 명명될 수 없습니다. 각 문자가 나타내는 것은 다음과 같습니다:

- S: State
- G: Getters
- A: Actions
- SS: Setup Store / Store

:::

### 새로운 상태 타입 지정

새로운 상태 속성을 추가할 때(`store`와 `store.$state` 모두에), `PiniaCustomStateProperties`에 타입을 추가해야 합니다. `PiniaCustomProperties`와 달리, 이것은 `State` 제네릭만을 받습니다:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

### 새로운 생성 옵션 타입 지정

`defineStore()`에 대한 새로운 옵션을 생성할 때, `DefineStoreOptionsBase`를 확장해야 합니다. `PiniaCustomProperties`와 다르게, 이것은 두 개의 제네릭만을 노출합니다: 상태와 스토어 타입으로, 정의할 수 있는 것을 제한할 수 있습니다. 예를 들어, 액션의 이름을 사용할 수 있습니다:

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // 액션들 중 어느 것에 대해서든지 ms 단위를 정의할 수 있도록 허용
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

::: tip
`StoreGetters` 타입은 스토어 타입에서 _getters_를 추출하는데 사용할 수 있습니다. _setup stores_ 또는 _option stores_의 옵션을 **오직** `DefineStoreOptions` 및 `DefineSetupStoreOptions` 타입을 확장함으로써 확장할 수도 있습니다.
:::

## Nuxt.js

[Nuxt와 함께 pinia를 사용할 때](../ssr/nuxt.md), 먼저 [Nuxt 플러그인](https://nuxt.com/docs/guide/directory-structure/plugins)을 생성해야 합니다. 이것은 `pinia` 인스턴스에 접근할 수 있게 해줍니다:

```ts{14-16}
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // 스토어 변경에 반응
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // TS를 사용한다면 이것은 타입을 지정해야 합니다
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
})
```

::: info

위 예제는 TypeScript를 사용하고 있습니다, `.js` 파일을 사용하고 있다면 `PiniaPluginContext`와 `Plugin`의 타입 주석 및 그들의 가져오기를 제거해야 합니다.

:::

### Nuxt.js 2

Nuxt.js 2를 사용하고 있다면, 타입이 약간 다릅니다:

```ts{3,15-17}
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // 스토어 변경에 반응
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // TS를 사용한다면 이것은 타입을 지정해야 합니다
  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
}

export default myPlugin
```
