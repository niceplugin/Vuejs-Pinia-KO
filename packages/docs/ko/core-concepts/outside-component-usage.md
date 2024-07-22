# 컴포넌트 외부에서 Store 사용 %{#using-a-store-outside-of-a-component}%

<MasteringPiniaLink v-if="false"
  href="https://play.gumlet.io/embed/651ed1ec4c2f339c6860fd06"
  mp-link="https://masteringpinia.com/lessons/how-does-usestore-work"
  title="Using stores outside of components"
/>

작성된 Pinia Store는 모든 호출에서 동일한 Store 인스턴스를 공유하기 위해 `pinia` 인스턴스에 의존합니다. 대부분의 경우, `useStore()` 함수를 호출하는 것만으로 자동으로 동작합니다. 예를 들어, `setup()`에서 추가 작업이 필요 없습니다. 그러나 컴포넌트 외부에서는 약간 다릅니다.
백그라운드에서 `useStore()`는 `app`에 제공한 `pinia` 인스턴스를 *주입*합니다. 즉, `pinia` 인스턴스가 자동으로 주입될 수 없는 경우, 수동으로 `useStore()` 함수에 제공해야 합니다.
작성 중인 애플리케이션 종류에 따라 이를 다르게 해결할 수 있습니다.

## 싱글 페이지 애플리케이션 (SPA) %{#single-page-applications}%

SSR(서버 사이드 렌더링)을 하지 않는 경우, `app.use(pinia)`로 pinia 플러그인을 설치한 후의 모든 `useStore()` 호출이 정상적으로 동작할 것입니다:

```js
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// ❌ pinia가 생성되기 전에 호출되기 때문에 실패합니다.
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ pinia 인스턴스가 이제 활성 상태이므로 정상적으로 작동합니다.
const userStore = useUserStore()
```

Pinia 인스턴스가 활성화되도록 보장하는 가장 간단한 방법은 `useStore()` 호출을 항상 pinia가 설치된 후에 실행되는 함수 안에 두는 것입니다.

다음은 Vue Router의 내비게이션 가드에서 Store를 사용하는 예제입니다:

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ import 순서에 따라 실패할 수 있습니다.
const store = useStore()

router.beforeEach((to, from, next) => {
  // 여기서 Store를 사용하려고 했습니다.
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ 라우터가 설치된 이후에 내비게이션이 시작되며,
  // 이 시점에서 pinia도 이미 설치되어 있기 때문에, 정상적으로 작동합니다.
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

## 서버 사이드 렌더링 애플리케이션 %{#ssr-apps}%

서버 사이드 렌더링을 처리할 때, `pinia` 인스턴스를 `useStore()`에 전달해야 합니다. 이렇게 하면 pinia가 서로 다른 애플리케이션 인스턴스 간에 전역 state를 공유하는 것을 방지할 수 있습니다.

자세한 내용은 [SSR 가이드](/ssr/index.md)에서 확인할 수 있으며, 여기서는 간단하게 설명한 것입니다.
