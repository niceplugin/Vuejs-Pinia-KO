# 서버 사이드 렌더링(SSR)

::: tip
**Nuxt.js**를 사용하고 있다면, 대신 [**이 지침**](./nuxt.md)을 읽어야 합니다.
:::

Pinia를 사용하여 스토어를 생성하는 것은 `setup` 함수, `getters`, 그리고 `actions`의 상단에서 `useStore()` 함수를 호출하는 한 SSR에서도 문제없이 작동해야 합니다:

```vue
<script setup>
// pinia가 어떤 애플리케이션 안에서 실행되고 있는지 알기 때문에 이렇게 동작합니다
// `setup`
const main = useMainStore()
</script>
```

## `setup()` 외부에서 스토어 사용하기

다른 곳에서 스토어를 사용해야 한다면, 앱에 [전달된 `pinia` 인스턴스](../getting-started.md#installation)를 `useStore()` 함수 호출에 전달해야 합니다:

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅ 이렇게 하면 현재 실행 중인 앱에 맞는 올바른 스토어가 사용되도록 합니다
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

Pinia는 편리하게도 자신을 `$pinia`로 앱에 추가하므로, `serverPrefetch()` 같은 함수에서 사용할 수 있습니다:

```js
export default {
  serverPrefetch() {
    const store = useStore(this.$pinia)
  },
}
```

`onServerPrefetch()`를 사용할 때 특별히 할 필요가 없음을 주목하세요:

```vue
<script setup>
const store = useStore()
onServerPrefetch(async () => {
  // ✅ 이렇게 하면 동작합니다
  await store.fetchData()
})
</script>
```

## 상태 하이드레이션

초기 상태를 하이드레이션하려면, Pinia가 나중에 찾을 수 있도록 rootState가 HTML 어딘가에 포함되어 있는지 확인해야 합니다. SSR에 사용하는 것에 따라, **보안상의 이유로 상태를 이스케이프해야 합니다**. Nuxt.js에서 사용하는 것과 같은 [@nuxt/devalue](https://github.com/nuxt-contrib/devalue) 사용을 권장합니다:

```js
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
// 서버 사이드에서 rootState 검색
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// 페이지를 렌더링 한 후, root 상태가 구성되며 `pinia.state.value`에서
// 직접 읽을 수 있습니다.

// 직렬화, 이스케이프(상태 내용을 사용자가 변경할 수 있는 경우가 거의 항상
// 그러하므로 매우 중요함), 그리고 페이지 어딘가에 배치, 예를 들어 글로벌 변수로.
devalue(pinia.state.value)
```

SSR에 사용하는 것에 따라 HTML에 직렬화될 _초기 상태_ 변수를 설정합니다. XSS 공격으로부터 자신을 보호해야 합니다. `@nuxt/devalue`에 대한 [다른 대안들](https://github.com/nuxt-contrib/devalue#see-also)을 사용할 수 있습니다. 필요에 따라, 예를 들어 상태를 `JSON.stringify()`/`JSON.parse()`로 직렬화 및 파싱할 수 있다면, **성능을 많이 향상시킬 수 있습니다**.

Nuxt를 사용하지 않는 경우에는 상태의 직렬화 및 하이드레이션을 직접 처리해야 합니다. 다음은 몇 가지 예시입니다:

- [Vitesse 템플릿](https://github.com/antfu/vitesse/blob/main/src/modules/pinia.ts)
- [vite-plugin-ssr](https://vite-plugin-ssr.com/pinia)

이 전략을 환경에 맞게 조정하세요. **클라이언트 측에서 어떤 `useStore()` 함수를 호출하기 전에 반드시 pinia의 상태를 하이드레이션하세요**. 예를 들어, 상태를 `<script>` 태그에 직렬화하여 클라이언트 측에서 `window.__pinia`를 통해 전역적으로 접근할 수 있게 하면, 이렇게 작성할 수 있습니다:

```ts
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// `isClient`는 환경에 따라 다름, 예를 들어 Nuxt에서는 `import.meta.client`
if (isClient) {
  pinia.state.value = JSON.parse(window.__pinia)
}
```
