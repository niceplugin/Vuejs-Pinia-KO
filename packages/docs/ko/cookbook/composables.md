# 컴포저블 다루기 %{#dealing-with-composables}%

[컴포저블(Composable)](https://vuejs.org/guide/reusability/composables.html#composables)은 Vue Composition API를 활용하여 state 로직을 캡슐화하고 재사용하는 함수들입니다. 직접 작성하거나 [외부 라이브러리](https://vueuse.org/)를 사용할 때, Pinia Store에서 컴포저블의 모든 기능을 완전히 사용할 수 있습니다.

## Option Stores %{#option-stores}%

<MasteringPiniaLink v-if="false"
  href="https://masteringpinia.com/lessons/using-composables-in-option-stores"
  title="Using Composables in Option Stores"
/>

Option Store를 정의할 때 `state` 프로퍼티 내부에서 컴포저블을 호출할 수 있습니다:

```ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),
})
```

**수정 가능한 state**(예: `ref()`)만 반환할 수 있다는 점을 기억하십시오. 다음은 사용할 수 있는 컴포저블의 몇 가지 예입니다:

- [useLocalStorage](https://vueuse.org/core/useLocalStorage/)
- [useAsyncState](https://vueuse.org/core/useAsyncState/)

Option Store에서 사용할 수 없는 컴포저블의 몇 가지 예는 다음과 같습니다 (하지만 setup Store에서는 사용할 수 있습니다):

- [useMediaControls](https://vueuse.org/core/useMediaControls/): 함수를 노출합니다.
- [useMemoryInfo](https://vueuse.org/core/useMemory/): 읽기 전용 데이터를 노출합니다.
- [useEyeDropper](https://vueuse.org/core/useEyeDropper/): 읽기 전용 데이터와 함수를 노출합니다.

## Setup Stores %{#setup-stores}%

<MasteringPiniaLink v-if="false"
  href="https://masteringpinia.com/lessons/using-composables-in-setup-stores"
  title="Using Composables in Setup Stores"
/>

반면에 Setup Store를 정의할 때는 거의 모든 컴포저블을 사용할 수 있습니다. 모든 프로퍼티가 state, action, getter로 구분되기 때문입니다:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useMediaControls } from '@vueuse/core'

export const useVideoPlayer = defineStore('video', () => {
  // 우리는 이 엘리먼트를 직접 노출(반환)하지 않을 것입니다.
  const videoElement = ref<HTMLVideoElement>()
  const src = ref('/data/video.mp4')
  const { playing, volume, currentTime, togglePictureInPicture } =
          useMediaControls(videoElement, { src })

  function loadVideo(element: HTMLVideoElement, src: string) {
    videoElement.value = element
    src.value = src
  }

  return {
    src,
    playing,
    volume,
    currentTime,

    loadVideo,
    togglePictureInPicture,
  }
})
```

:::warning
일반적인 state와 달리, `ref<HTMLVideoElement>()`는 직렬화할 수 없는 DOM 엘리먼트에 대한 참조를 포함합니다. 이것이 우리가 이것를 직접 반환하지 않는 이유입니다. 이것은 클라이언트 전용 state이므로 서버에서 설정되지 않으며, 클라이언트에서는 **항상** `undefined`로 시작된다는 것을 알고 있습니다.
:::

## 서버 사이드 렌더링 %{#ssr}%

[서버 사이드 렌더링(SSR)](../ssr/index.md)을 다룰 때, Store 내에서 컴포저블을 사용하기 위해 몇 가지 추가 단계를 처리해야 합니다.

[Option Store](#option-stores)에서는 `hydrate()` 함수를 정의해야 합니다. 이 함수는 클라이언트(브라우저)에서 Store가 인스턴스화될 때, Store 생성 시 사용 가능한 초기 state가 있을 때 호출됩니다. 이런 경우 `state()`가 호출되지 않기 때문에 이 함수를 정의해야 합니다.

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),

  hydrate(state, initialState) {
    // 이 경우, 우리는 브라우저에서 값을 읽기 원하기 때문에
    // 초기 state를 완전히 무시할 수 있습니다.
    state.user = useLocalStorage('pinia/auth/login', 'bob')
  },
})
```

[Setup Store](#setup-stores)에서 초기 state에서 가져오지 말아야 할 모든 state 프로퍼티에 `skipHydrate()`라는 헬퍼를 사용해야 합니다. Option Store와 달리, Setup Store는 단순히 *`state()` 호출을 생략할 수 없기* 때문에 `skipHydrate()`를 사용하여 하이드레이션할 수 없는 프로퍼티를 표시합니다. 이는 state 프로퍼티에만 적용된다는 점에 유의하세요.

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useEyeDropper, useLocalStorage } from '@vueuse/core'

export const useColorStore = defineStore('colors', () => {
  const { isSupported, open, sRGBHex } = useEyeDropper()
  const lastColor = useLocalStorage('lastColor', sRGBHex)
  // ...
  return {
    lastColor: skipHydrate(lastColor), // Ref<string>
    open, // 함수
    isSupported, // boolean (반응형 아님)
  }
})
```
