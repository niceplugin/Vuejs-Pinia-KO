# 핫 모듈 교체 (HMR) %{#hmr-hot-module-replacement}%

Pinia는 Store를 편집하고 페이지를 새로 고침 없이 앱에서 직접 상호작용할 수 있도록 핫 모듈 교체(Hot Module Replacement, HMR)를 지원합니다. 이를 통해 현재 상태를 유지하면서 state、action, getter를 추가하거나 제거할 수 있습니다.

현재 공식적으로 지원되는 번들은 [Vite](https://vitejs.dev/guide/api-hmr.html#hmr-api)뿐이지만, `import.meta.hot` 사양을 구현하는 모든 번들러는 작동해야 합니다 (예외로 [webpack](https://webpack.js.org/api/module-variables/#importmetawebpackhot)은 `import.meta.hot` 대신 `import.meta.webpackHot`을 사용하는 것 같습니다).
Store 선언 후에 코드 조각을 추가해야 합니다. 예를 들어, `auth.js`, `cart.js`, `chat.js` 세 가지 Store가 있다고 가정하면, *Store 정의* 후 아래와 같은 코드를 추가하고 조정해야 합니다:

```js
// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuth = defineStore('auth', {
  // 옵션...
})

// 올바른 Store 선언인 `useAuth`를 전달해야 합니다.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
```
