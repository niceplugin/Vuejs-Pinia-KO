# 컴포넌트 외부에서 스토어 사용하기

Pinia 스토어는 `pinia` 인스턴스를 통해 모든 호출에서 동일한 스토어 인스턴스를 공유합니다. 대부분의 경우, 단순히 `useStore()` 함수를 호출하는 것만으로도 잘 작동합니다. 예를 들어, `setup()`에서는 다른 조치를 취할 필요가 없습니다. 하지만 컴포넌트 외부에서는 상황이 조금 다릅니다.
내부적으로 `useStore()`는 `app`에 제공한 `pinia` 인스턴스를 _주입_ 합니다. 이는 `pinia` 인스턴스가 자동으로 주입될 수 없는 경우, `useStore()` 함수에 수동으로 제공해야 함을 의미합니다.
이 문제는 작성 중인 응용 프로그램의 종류에 따라 다르게 해결할 수 있습니다.

## 싱글 페이지 응용 프로그램

SSR(Server Side Rendering)을 수행하지 않는 경우, `app.use(pinia)`로 pinia 플러그인을 설치한 후 `useStore()`를 호출하는 모든 경우가 작동할 것입니다:

```js
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from './App.vue'

// ❌ pinia가 생성되기 전에 호출되어 실패합니다.
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ pinia 인스턴스가 활성화된 이후에 호출되어 작동합니다.
const userStore = useUserStore()
```

이를 항상 적용하는 가장 쉬운 방법은 `useStore()`의 호출을 pinia가 설치된 후에 항상 실행될 함수 안에 _지연시키는_ 것입니다.

Vue Router와 함께 내비게이션 가드 안에서 스토어를 사용하는 이 예를 살펴봅시다:

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ 임포트 순서에 따라 이것은 실패할 것입니다.
const store = useStore()

router.beforeEach((to, from, next) => {
  // 여기에서 스토어를 사용하려고 했습니다.
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ 라우터가 탐색을 시작한 후고 pinia도 설치될 것이기 때문에
  // 이것은 작동할 것입니다.
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

## SSR 앱

서버 사이드 렌더링을 다룰 때는 `useStore()`에 `pinia` 인스턴스를 전달해야 합니다. 이는 pinia가 다른 애플리케이션 인스턴스 간에 전역 상태를 공유하는 것을 방지합니다.

[SSR 가이드](/ssr/index.md)에 전체 섹션이 이에 대해 바쳐져 있으며, 이것은 단지 짧은 설명일 뿐입니다.
