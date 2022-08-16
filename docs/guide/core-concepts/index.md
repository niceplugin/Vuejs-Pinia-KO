---
title: 스토어 다루기
---

# 스토어 정의하기 %{#defining-a-store}%

핵심 개념에 대해 알아보기 전에 스토어가 `defineStore()`를 사용해 정의되고,
**고유한** 이름이 첫 번째 인자로 전달되어야 한다는 것을 알아야 합니다:

```js
import { defineStore } from 'pinia'

// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.
export const useMainStore = defineStore('main', {
  // 다른 옵션...
})
```

`ID`라고도 하는 이 `name`은 필요하며,
피니아에서 스토어와 devtools를 연결하는 데 사용합니다.
반환된 함수의 이름을 `use...`로 지정하는 것은,
사용법을 관용적으로 만들기 위한 컴포저블 전반에 걸친 규칙입니다.

`defineStore()`의 두 번째 인자는 두 개의 고유한 값을 허용합니다: 셋업 함수 또는 옵션 객체

## 옵션 스토어 %{#option-stores}%

Vue의 옵션 API와 유사하게 `state`, `actions` 및 `getters` 속성을 사용하여 옵션 객체를 전달할 수 있습니다.

```js {2-10}
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

`state`는 스토어의 `data`, `getters`는 스토어의 `computed` 속성, `actions`은 `methods`로 생각할 수 있습니다.

옵션 스토어는 시작하기 쉽고 직관적입니다.

## 셋업 스토어 %{#setup-stores}%

스토어를 정의하는 또 다른 문법이 있습니다.
Vue 컴포지션 API의 [셋업 함수](https://vuejs.kr/api/composition-api-setup.html)와 유사하게,
반응형 속성 및 메서드를 정의하고,
노출하려는 속성 및 메서드가 있는 객체를 반환하는 함수를 전달할 수 있습니다.

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

셋업 스토어 내에서:

- `ref()`는 `state` 속성이 됨.
- `computed()`는 `getters`가 됨.
- `function()`은 `actions`가 됨.


셋업 스토어는 스토어 내에서 감시자를 만들고 [컴포저블](https://vuejs.kr/guide/reusability/composables.html#composables)을 자유롭게 사용할 수 있으므로,
[옵션 스토어](#option-stores)보다 훨씬 더 많은 유연성을 제공합니다.
그러나 컴포저블을 사용하면 [SSR](/guide/cookbook/composables.md)이 더 복잡해집니다.

## 어떤 문법을 선택해야 합니까? %{#what-syntax-should-i-pick}%

[Vue의 컴포지션 API 및 옵션 API](https://vuejs.kr/guide/introduction.html#which-to-choose)처럼 가장 편한 것을 선택하면 됩니다.
잘 모르겠다면 먼저 [옵션 스토어](#option-stores) 스타일로 사용해 보십시오.

## 스토어 이용하기 %{#using-the-store}%

`setup()` 내부에서 `useStore()`가 호출될 때까지 스토어가 생성되지 않으므로, 스토어를 정의합니다:

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const store = useCounterStore()

    return {
      // 템플릿에서 사용하기 위해 스토어 인스턴스를 반환할 수 있음
      store,
    }
  },
}
```

원하는 만큼 스토어를 정의할 수 있습니다.
피니아를 최대한 활용하려면(예: 번들이나 코드분할 및 TypeScript 추론을 자동으로 허용),
**각 스토어는 다른 파일에 정의해야** 합니다.

아직 `setup` 컴포넌트를 사용하지 않는 경우,
["맵 헬퍼"로 피니아를 사용할 수 있습니다](/guide/cookbook/options-api.md).

스토어가 인스턴스화되면,
스토어에서 직접 `state`, `getters`, `actions`에 정의된 모든 속성에 접근할 수 있습니다.
다음 페이지에서 자세히 살펴보겠지만 자동 완성이 도움이 될 것입니다.

`store`는 `reactive`로 래핑된 객체입니다.
즉, getter 뒤에 `.value`를 쓸 필요가 없지만,
`setup`의 `props`와 같이 **구조화할 수 없습니다**:

```js
export default defineComponent({
  setup() {
    const store = useCounterStore()
    // ❌ 이것은 반응형을 깨뜨리기 때문에 작동하지 않음.
    const { name, doubleCount } = store

    name // "홍길동"
    doubleCount // 2

    return {
      // 항상 "홍길동"이 될 것임.
      name,
      // 항상 2가 될 것임.
      doubleCount,
      // 이것은 반응 할 것임.
      doubleValue: computed(() => store.doubleCount),
    }
  },
})
```

반응형을 유지하면서 스토어에서 속성을 추출하려면, `storeToRefs()`를 사용해야 합니다.
모든 반응형 속성에 대한 참조를 생성합니다.
이것은 스토어의 상태만 사용하고, 액션을 호출하지 않을 때 유용합니다.
스토어 자체에도 바인딩되므로, 스토어에서 직접 액션을 구조화할 수 있습니다:

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useCounterStore()
    // `name`과 `doubleCount`는 반응형 refs임.
    // 이것은 플러그인에 의해 추가된 속성에 대한 'refs'도 생성함.
    // 그러나 모든 액션 또는 비반응형(ref/반응형이 아닌) 속성을 건너뜀.
    const { name, doubleCount } = storeToRefs(store)
    // increment 액션은 그냥 추출 가능.
    const { increment } = store

    return {
      name,
      doubleCount,
      increment,
    }
  },
})
```
