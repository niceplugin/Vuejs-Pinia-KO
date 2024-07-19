# Nuxt.js

<MasteringPiniaLink
  href="https://masteringpinia.com/lessons/ssr-friendly-state"
  title="Learn about SSR best practices"
/>

Pinia를 [Nuxt](https://nuxt.com/)와 함께 사용하면, Nuxt가 *서버 사이드 렌더링*과 관련된 많은 사항을 처리하므로 더 쉽습니다. 예를 들어 **직렬화나 XSS 공격에 대해 신경 쓸 필요가 없습니다**. Pinia는 Nuxt Bridge와 Nuxt 3을 지원합니다. 순수 Nuxt 2 지원에 대해서는 [아래](#nuxt-2-without-bridge)를 참조하세요.

## 설치 %{#installation}%

```bash
yarn add pinia @pinia/nuxt
# 또는 npm으로
npm install pinia @pinia/nuxt
```

:::tip
npm을 사용하는 경우, `_ERESOLVE unable to resolve dependency tree_` 오류가 발생할 수 있습니다. 이 경우, `package.json`에 다음을 추가하세요:

```js
"overrides": { 
  "vue": "latest"
}
```

:::

모든 것을 처리할 *모듈*을 제공합니다. `nuxt.config.js` 파일의 `modules`에 이를 추가하기만 하면 됩니다:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... 다른 옵션들
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

이게 전부입니다. 평소처럼 Store를 사용하세요!

## 페이지에서 actions 대기하기 %{#awaiting-for-actions-in-pages}%

`onServerPrefetch()`와 마찬가지로, `asyncData()` 내에서 Store의 action을 호출할 수 있습니다. `useAsyncData()`의 작동 방식 때문에 **반드시 값을 반환해야 합니다**. 이렇게 하면 Nuxt가 클라이언트 측에서 action을 실행하지 않고 서버에서 값을 재사용할 수 있습니다.

```vue{3-4}
<script setup>
const store = useStore()
// 데이터를 추출할 수도 있지만, 이미 Store에 존재하므로 필요하지 않습니다.
await useAsyncData('user', () => store.fetchUser())
</script>
```

Action이 값을 반환하지 않는 경우, null이나 undefined가 아닌 값을 추가할 수 있습니다:

```vue{3}
<script setup>
const store = useStore()
await useAsyncData('user', () => store.fetchUser().then(() => true))
</script>
```

::: tip

`setup()` 외부에서 Store를 사용하려면 `useStore()`에 `pinia` 객체를 전달해야 합니다. 우리는 이를 [컨텍스트](https://nuxtjs.org/docs/2.x/internals-glossary/context)에 추가했으므로 `asyncData()`와 `fetch()`에서 접근할 수 있습니다:

```js
import { useStore } from '~/stores/myStore'

export default {
  asyncData({ $pinia }) {
    const store = useStore($pinia)
  },
}
```

:::

## 오토 imports %{#auto-imports}%

기본적으로 `@pinia/nuxt`는 몇 가지 오토 imports를 제공합니다:

- `usePinia()`: `getActivePinia()`와 유사하지만 Nuxt와 더 잘 작동합니다. 이를 통해 오토 imports를 추가하여 작업을 더 쉽게 할 수 있습니다.
- `defineStore()`: Store를 정의할 때 사용합니다.
- `storeToRefs()`: Store에서 개별 refs를 추출할 때 사용합니다.
- `acceptHMRUpdate()`: [핫 모듈 교체(HMR)](../cookbook/hot-module-replacement.md)를 위한 함수입니다.

또한 `stores` 폴더 내에 정의된 **모든 Store**를 오토 imports 합니다. 그러나 중첩된 Store는 검색하지 않습니다. 이 동작을 사용자 정의 하려면 `storesDirs` 옵션을 설정해야 합니다:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ... 다른 옵션들
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
})
```

폴더는 프로젝트의 루트를 기준으로 상대적입니다. `srcDir` 옵션을 변경하면 경로를 그에 맞게 조정해야 합니다.

## Nuxt 2 without bridge %{#nuxt-2-without-bridge}%

Pinia는 `@pinia/nuxt` v0.2.1까지 Nuxt 2를 지원합니다. `pinia`와 함께 [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/)도 설치해야 합니다.

```bash
yarn add pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
# 또는 npm으로
npm install pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
```

모든 작업을 처리할 *모듈*을 제공합니다. `nuxt.config.js` 파일의 `buildModules`에 이를 추가하기만 하면 됩니다:

```js
// nuxt.config.js
export default {
  // ... 다른 옵션들
  buildModules: [
    // Nuxt 2 에서만:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

## TypeScript %{#typescript}%

Nuxt 2(`@pinia/nuxt` < 0.3.0)를 TypeScript와 함께 사용하거나 `jsconfig.json`이 있는 경우, `context.pinia`의 타입을 추가해야 합니다:

```json
{
  "types": [
    // ...
    "@pinia/nuxt"
  ]
}
```

이렇게 하면 자동 완성도 보장됩니다 😉.

### Pinia와 Vuex 동시에 사용하기 %{#using-pinia-alongside-vuex}%

**Pinia와 Vuex를 동시에 사용하는 것은 권장되지 않습니다**. 그러나 둘 다 사용해야 하는 경우, Pinia가 Vuex를 비활성화하지 않도록 설정해야 합니다:

```js
// nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
  ],
  // ... 다른 옵션들
}
```
