# Nuxt.js

[Nuxt](https://nuxt.com/)와 Pinia를 함께 사용하는 것은 Nuxt가 _서버 사이드 렌더링_과 관련하여 많은 것을 처리하기 때문에 더 쉽습니다. 예를 들어, **직렬화나 XSS 공격에 대해 신경 쓸 필요가 없습니다**. Pinia는 Nuxt Bridge와 Nuxt 3를 지원합니다. 순수한 Nuxt 2 지원은 [아래를 참조하세요](#nuxt-2-without-bridge).

## 설치

```bash
yarn add pinia @pinia/nuxt
# 또는 npm을 사용하여
npm install pinia @pinia/nuxt
```

::: tip
npm을 사용하는 경우 _ERESOLVE unable to resolve dependency tree_ 오류를 만날 수 있습니다. 그런 경우 `package.json`에 다음을 추가하세요:

```js
"overrides": {
  "vue": "latest"
}
```

:::

모든 것을 처리해주는 _모듈_을 제공하므로, `nuxt.config.js` 파일의 `modules`에 추가하기만 하면 됩니다:

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

그게 다입니다, 평소와 같이 저장소를 사용하세요!

## 페이지 내에서 액션 대기

`onServerPrefetch()`와 마찬가지로, `asyncData()` 내에서는 저장소 액션을 호출할 수 있습니다. `useAsyncData()`가 작동하는 방식을 고려할 때, **값을 반환해야 한다는 것을 반드시 기억하세요**. 이로써 Nuxt는 클라이언트 측에서 액션을 실행하지 않고 서버에서 가져온 값을 재사용할 수 있습니다.

```vue{3-4}
<script setup>
const store = useStore()
// 우리는 데이터를 추출할 수도 있지만, 이미 저장소에 존재합니다
await useAsyncData('user', () => store.fetchUser())
</script>
```

액션이 값을 반환하지 않는 경우, 어떤 null이 아닌 값이라도 추가할 수 있습니다:

```vue{3}
<script setup>
const store = useStore()
await useAsyncData('user', () => store.fetchUser().then(() => true))
</script>
```

::: tip

`setup()` 외부에서 저장소를 사용하고 싶다면, `useStore()`에 `pinia` 객체를 전달해야 합니다. 우리는 `asyncData()`와 `fetch()`에서 이에 접근할 수 있도록 [컨텍스트](https://nuxtjs.org/docs/2.x/internals-glossary/context)에 이를 추가했습니다:

```js
import { useStore } from '~/stores/myStore'

export default {
  asyncData({ $pinia }) {
    const store = useStore($pinia)
  },
}
```

:::

## 자동 가져오기

기본적으로 `@pinia/nuxt`는 몇 가지 자동 가져오기를 제공합니다:

- `usePinia()`, `getActivePinia()`와 비슷하지만 Nuxt와 더 잘 작동합니다. 생활을 더 쉽게 만들기 위해 자동 가져오기를 추가할 수 있습니다:
- `defineStore()`로 저장소를 정의하기 위해
- `storeToRefs()`는 개별 참조를 저장소에서 추출할 때 필요합니다
- `acceptHMRUpdate()`는 [핫 모듈 교체](../cookbook/hot-module-replacement.md)를 위해

또한 `stores` 폴더 내에 정의된 **모든 저장소**를 자동으로 가져옵니다. 그러나 중첩된 저장소는 찾지 않습니다. 이 동작을 커스터마이징하기 위해 `storesDirs` 옵션을 설정할 수 있습니다:

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

폴더는 프로젝트의 루트에 상대적입니다. `srcDir` 옵션을 변경하는 경우 경로를 적절히 조정해야 합니다.

## 브릿지 없는 Nuxt 2

`@pinia/nuxt` v0.2.1까지 Pinia는 Nuxt 2를 지원합니다. `pinia`와 함께 [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/)를 설치해야 합니다:

```bash
yarn add pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
# 또는 npm으로
npm install pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
```

모든 것을 처리해주는 _모듈_을 제공하므로, `nuxt.config.js` 파일의 `buildModules`에 추가하기만 하면 됩니다:

```js
// nuxt.config.js
export default {
  // ... 다른 옵션들
  buildModules: [
    // Nuxt 2 전용:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

### TypeScript

Nuxt 2(`@pinia/nuxt` < 0.3.0)를 TypeScript와 함께 사용하거나 `jsconfig.json`이 있는 경우, `context.pinia`의 타입을 추가해야 합니다:

```json
{
  "types": [
    // ...
    "@pinia/nuxt"
  ]
}
```

이렇게 하면 자동 완성 기능을 확보할 수 있습니다 😉 .

### Pinia와 Vuex 함께 사용하기

**Pinia와 Vuex를 함께 사용하는 것은 권장되지 않지만**, 둘 다 사용해야 한다면 pinia가 이를 비활성화하지 않도록 해야 합니다:

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
