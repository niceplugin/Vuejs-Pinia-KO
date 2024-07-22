# 서버 사이드 렌더링 (SSR) %{#server-side-rendering-ssr}%

<MasteringPiniaLink v-if="false"
  href="https://masteringpinia.com/lessons/ssr-friendly-state"
  title="Learn about SSR best practices"
/>

:::tip
**Nuxt.js**를 사용하는 경우, 이 섹션 대신 [**Nuxt.js**](./nuxt.md)를 읽어야 합니다.
:::

Pinia로 Store를 생성할 때 정의한 `useStore()` 함수는 `setup` 함수, `getter`, `action`의 최상단에서 호출하면 SSR(서버 사이드 렌더링)에서 즉시 작동합니다:

```vue
<script setup>
// 이것은 Pinia가 `setup` 내부에서
// 어떤 애플리케이션이 실행되고 있는지 알고 있기 때문에 작동합니다.
const main = useMainStore()
</script>
```

## `setup()` 외부에서 Store 사용 %{#using-the-store-outside-of-setup}%

다른 곳에서 Store를 사용해야 하는 경우, [앱에 전달된 `pinia` 인스턴스](../getting-started.md#installation)를 `useStore()` 함수 호출에 전달해야 합니다:

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅ 이 방법은 현재 실행 중인 애플리케이션에 맞는
  // 올바른 Store가 사용되도록 보장합니다.
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

Pinia는 애플리케이션에 `$pinia`로  추가되므로, `serverPrefetch()`와 같은 함수에서 편리하게 사용할 수 있습니다:

```js
export default {
  serverPrefetch() {
    const store = useStore(this.$pinia)
  },
}
```

`onServerPrefetch()`를 사용할 때 특별히 추가로 할 작업은 없습니다:

```vue
<script setup>
const store = useStore()
onServerPrefetch(async () => {
  // ✅ 작동함
  await store.fetchData()
})
</script>
```

## State 하이드레이션 %{#state-hydration}%

초기 상태를 수화(hydrate)하려면, Pinia가 나중에 state를 가져올 수 있도록 rootState가 HTML의 어딘가에 포함되어야 합니다. SSR에서 사용하는 방법에 따라, **보안상의 이유로 state를 이스케이프(escape)해야 합니다**. Nuxt.js에서 사용되는 있는 [@nuxt/devalue](https://github.com/nuxt-contrib/devalue) 사용을 추천합니다.

```js
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
// 서버 측에서 rootState를 검색합니다.
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// 페이지 렌더링 후, root state가 구축되며
// `pinia.state.value`로 직접 읽을 수 있습니다.

// state의 내용을 사용자가 변경할 수 있는 경우,
// **직렬화하고 이스케이프해서**
// 페이지의 어딘가에 (예를 들어 전역 변수로) 배치해야 합니다.
devalue(pinia.state.value)
```

SSR에서 사용하는 방법에 따라, HTML에 직렬화될 *초기 state* 변수를 설정해야 합니다. 또한 XSS 공격으로부터 보호해야 합니다. 필요에 따라 `@nuxt/devalue` 외에도 [다른 대안](https://github.com/nuxt-contrib/devalue#see-also)을 사용할 수 있습니다. 예를 들어, `JSON.stringify()`/`JSON.parse()`를 사용하여 상태를 직렬화하고 파싱할 수 있다면, **성능을 크게 향상시킬 수 있습니다**.

Nuxt를 사용하지 않는 경우, state의 직렬화 및 하이드레이션을 직접 처리해야 합니다. 다음은 몇 가지 예시입니다:

- [Vitesse template](https://github.com/antfu/vitesse/blob/main/src/modules/pinia.ts)
- [vite-plugin-ssr](https://vite-plugin-ssr.com/pinia)

이 전략을 당신의 환경에 맞게 조정해야 합니다. **클라이언트 측에서 `useStore()` 함수를 호출하기 전에 Pinia의 상태를 하이드레이션 하도록 하십시오**. 예를 들어, state를 `<script>` 태그에 직렬화하여 클라이언트 측에서 `window.__pinia`를 통해 전역적으로 접근할 수 있게 한다면, 다음과 같이 작성할 수 있습니다:

```ts
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// `isClient`는 환경에 따라 다릅니다. 예를 들어 Nuxt에서는 `import.meta.client`입니다.
if (isClient) {
  pinia.state.value = JSON.parse(window.__pinia)
}
```
