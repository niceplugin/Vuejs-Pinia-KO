---
title: 스토어 테스트
---

# 스토어 테스트 %{#testing-stores}%

스토어는 설계상 많은 장소에서 사용되며,
테스트를 예상보다 훨씬 어렵게 만들 수 있습니다.
다행히도 반드시 그러지는 않습니다.
스토어를 테스트할 때 세 가지 사항을 고려해야 합니다:

- `pinia` 인스턴스: 스토어는 이것 없이는 작동할 수 없음.
- `actions`: 대부분의 경우 스토어에서 가장 복잡한 논리를 가짐.
  기본적으로 모의(mock)되면 좋지 않을까요?
- 플러그인: 플러그인에 의존하는 경우, 테스트를 위해 플러그인도 설치해야 함.

테스트 대상 또는 방법에 따라 다음 세 가지를 다르게 처리해야 합니다:

- [스토어 테스트](#testing-stores)
  - [스토어 단위 테스트](#unit-testing-a-store)
  - [컴포넌트 단위 테스트](#unit-testing-components)
    - [초기 상태](#initial-state)
    - [액션의 작동 커스터마이징](#customizing-behavior-of-actions)
    - [createSpy 함수 지정](#specifying-the-createspy-function)
    - [게터 모의(mock)하기](#mocking-getters)
    - [피니아 플러그인](#pinia-plugins)
  - [E2E 테스트](#e2e-tests)
  - [컴포넌트 단위 테스트 (Vue 2)](#unit-test-components-vue-2)

## 스토어 단위 테스트 %{#unit-testing-a-store}%

To unit test a store, the most important part is creating a `pinia` instance:

```js
// counterStore.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounter } from '../src/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounter()
    expect(counter.n).toBe(0)
    counter.increment()
    expect(counter.n).toBe(1)
  })

  it('increments by amount', () => {
    const counter = useCounter()
    counter.increment(10)
    expect(counter.n).toBe(10)
  })
})
```

If you have any store plugins, there is one important thing to know: **plugins won't be used until `pinia` is installed in an App**. This can be solved by creating an empty App or a fake one:

```js
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { somePlugin } from '../src/stores/plugin'

// same code as above...

// you don't need to create one app per test
const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(somePlugin)
  app.use(pinia)
  setActivePinia(pinia)
})
```

## 컴포넌트 단위 테스트 %{#unit-testing-components}%

This can be achieved with `createTestingPinia()`, which returns a pinia instance designed to help unit tests components.

Start by installing `@pinia/testing`:

```shell
npm i -D @pinia/testing
```

And make sure to create a testing pinia in your tests when mounting a component:

```js
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useSomeStore() // uses the testing pinia!

// state can be directly manipulated
store.name = 'my new name'
// can also be done through patch
store.$patch({ name: 'new name' })
expect(store.name).toBe('new name')

// actions are stubbed by default, meaning they don't execute their code by default.
// See below to customize this behavior.
store.someAction()

expect(store.someAction).toHaveBeenCalledTimes(1)
expect(store.someAction).toHaveBeenLastCalledWith()
```

Please note that if you are using Vue 2, `@vue/test-utils` requires a [slightly different configuration](#unit-test-components-vue-2).

### 초기 상태 %{#initial-state}%

You can set the initial state of **all of your stores** when creating a testing pinia by passing an `initialState` object. This object will be used by the testing pinia to _patch_ stores when they are created. Let's say you want to initialize the state of this store:

```ts
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 0 }),
  // ...
})
```

Since the store is named _"counter"_, you need to add a matching object to `initialState`:

```ts
// somewhere in your test
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { n: 20 }, // start the counter at 20 instead of 0
        },
      }),
    ],
  },
})

const store = useSomeStore() // uses the testing pinia!
store.n // 20
```

### 액션의 작동 커스터마이징 %{#customizing-behavior-of-actions}%

`createTestingPinia` stubs out all store actions unless told otherwise. This allows you to test your components and stores separately.

If you want to revert this behavior and normally execute your actions during tests, specify `stubActions: false` when calling `createTestingPinia`:

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
})

const store = useSomeStore()

// Now this call WILL execute the implementation defined by the store
store.someAction()

// ...but it's still wrapped with a spy, so you can inspect calls
expect(store.someAction).toHaveBeenCalledTimes(1)
```

### createSpy 함수 지정 %{#specifying-the-createspy-function}%

When using Jest, or vitest with `globals: true`, `createTestingPinia` automatically stubs actions using the spy function based on the existing test framework (`jest.fn` or `vitest.fn`). If you are using a different framework, you'll need to provide a [createSpy](/api/interfaces/pinia_testing.TestingOptions.html#createspy) option:

```js
import sinon from 'sinon'

createTestingPinia({
  createSpy: sinon.spy, // use sinon's spy to wrap actions
})
```

You can find more examples in [the tests of the testing package](https://github.com/vuejs/pinia/blob/v2/packages/testing/src/testing.spec.ts).

### 게터 모의(mock)하기 %{#mocking-getters}%

By default, any getter will be computed like regular usage but you can manually force a value by setting the getter to anything you want:

```ts
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

const useCounter = defineStore('counter', {
  state: () => ({ n: 1 }),
  getters: {
    double: (state) => state.n * 2,
  },
})

const pinia = createTestingPinia()
const counter = useCounter(pinia)

counter.double = 3 // 🪄 getters are writable only in tests

// set to undefined to reset the default behavior
// @ts-expect-error: usually it's a number
counter.double = undefined
counter.double // 2 (=1 x 2)
```

### 피니아 플러그인 %{#pinia-plugins}%

If you have any pinia plugins, make sure to pass them when calling `createTestingPinia()` so they are properly applied. **Do not add them with `testingPinia.use(MyPlugin)`** like you would do with a regular pinia:

```js
import { createTestingPinia } from '@pinia/testing'
import { somePlugin } from '../src/stores/plugin'

// inside some test
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        stubActions: false,
        plugins: [somePlugin],
      }),
    ],
  },
})
```

## E2E 테스트 %{#e2e-tests}%

When it comes to pinia, you don't need to change anything for e2e tests, that's the whole point of e2e tests! You could maybe test HTTP requests, but that's way beyond the scope of this guide 😄.

## 컴포넌트 단위 테스트 (Vue 2) %{#unit-test-components-vue-2}%

When using [Vue Test Utils 1](https://v1.test-utils.vuejs.org/), install Pinia on a `localVue`:

```js
import { PiniaVuePlugin } from 'pinia'
import { createLocalVue, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const localVue = createLocalVue()
localVue.use(PiniaVuePlugin)

const wrapper = mount(Counter, {
  localVue,
  pinia: createTestingPinia(),
})

const store = useSomeStore() // uses the testing pinia!
```
