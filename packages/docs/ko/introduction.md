# 소개 %{#introduction}%

<!-- <VueSchoolLink
  href="https://vueschool.io/lessons/introduction-to-pinia"
  title="Get started with Pinia"
/> -->

<MasteringPiniaLink
  href="https://play.gumlet.io/embed/651ecf274c2f339c6860e36b"
  mp-link="https://masteringpinia.com/lessons/the-what-and-why-of-state-management-and-stores"
  title="Create your own Pinia from scratch"
/>

Pinia는 2019년 11월경 [Composition API](https://github.com/vuejs/composition-api)를 사용하여 Vue의 Store를 재설계하는 실험으로 [시작](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)되었습니다. 그 이후로 초기 원칙은 변하지 않았으며, Pinia는 Vue 2 및 Vue 3에서 **필수적으로 Composition API를 사용하지 않더라도 작동**합니다. API는 _설치_ 및 _SSR_ 부분을 제외하면 Vue에서 사용법은 두 버전 모두 동일하며, 이 문서는 Vue 3을 대상으로 **필요할 경우 Vue 2에 대한 주석**을 달아 Vue 2 및 Vue 3 사용자 모두가 읽을 수 있도록 작성되었습니다!

## 왜 Pinia를 사용해야 하나요? %{#why-should-i-use-pinia}%

<!--
https://masteringpinia.com/lessons/why-use-pinia
 -->

Pinia는 Vue의 Store 라이브러리로, 컴포넌트/페이지 간 상태(state)를 공유할 수 있게 해줍니다. Composition API에 익숙하다면 이미 `export const state = reactive({})`와 같이 전역으로 상태(state)를 공유할 수 있다고 생각할 수 있습니다. 이는 단일 페이지 애플리케이션에서는 가능하지만, 서버 사이드 렌더링 시 애플리케이션이 [보안 취약점](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)에 노출될 수 있습니다. 또한 작은 규모의 단일 페이지 애플리케이션에서도 Pinia를 사용하면 많은 이점을 얻을 수 있습니다:

- 테스트 유틸리티
- 플러그인: Pinia 기능을 플러그인으로 확장
- JS 사용자를 위한 적절한 TypeScript 지원 및 **자동 완성**
- 서버 사이드 렌더링 지원
- Devtools 지원
  - 액션(action), 변화(mutation) 추적 타임라인
  - 컴포넌트에서 사용된 Store 표시
  - 타임 트래블 및 쉬운 디버깅
- 핫 모듈 교체(HMR)
  - 페이지를 새로고침하지 않고 Store 수정
  - 개발 중에도 기존 상태(state) 유지

여전히 의문이 있다면 [**공식** Mastering Pinia 강좌](https://masteringpinia.com)를 확인해보세요. 처음에는 `defineStore()` 함수를 직접 작성하는 방법을 다루고, 그 후에 공식 Pinia API로 넘어갑니다.

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

## 기본 예제 %{#basic-example}%

다음은 Pinia API 사용 예시입니다. 전체 지침은 [시작하기](./getting-started.md)를 확인하세요. 먼저 Store를 생성합니다:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 다음과 같이 정의할 수도 있음
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

그런 다음 컴포넌트에서 해당 Store를 *사용*합니다:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// 자동 완성! ✨
counter.$patch({ count: counter.count + 1 })
// 또는 actions 사용
counter.increment()
</script>

<template>
  <!-- Store에서 직접 state에 접근 -->
  <div>Current Count: {{ counter.count }}</div>
</template>
```

[Playground에서 직접 해보기](https://play.pinia.vuejs.org/#eNqNVM1O3DAQfpVpVGkXQWIQLYfVgqCIQ3toq9JjLsEZWNPEtuzJstUqb9IH6HP1STq2k/2hFeKyG49nvvnmsz+vsytri2WH2Sybe+mUJfBInb0otWqtcQRr6Dxem04TulsyDqGHe2damBRCpnDx6CelLrU02hMMQTh/Xjg9SEmpJv4fHpZaCHhStICqIyNNaxskZTT8+fV7m/zWViQX03UCn409Eggcwgn0DM5IxnFXpR+g0lDJCKSYFFb1Fkxp6bBFTYHQXKSxeWBeEHL/ipBXAPM3eQ5XUqL3QAsET7wDtXIoqfmZREjxoEqep6JaLS+uO+cYH+L0M1gPvDeE+34uQl5ov2mZHWVJ8rytLEtqNB/KOmCWw4YvMwYLkRCzSqsqRMpMxO8CfZvfOfPk45GU2dGYesknLGpckjGNzyurUtmCyPqZELLWnF9jo5au0EhC21b8U3N5VrwvTkSj7gQ3EkrXuNpvwxV5je1r0MfUy+Pi5F1xFlGXpwNoG1ADaF/qnmUhzzfrXj08EyVcFtWg+2LDOe+LUzWNefoUY+Q63FCUC5Q//hN/9KvE+qtDlm+JO2NR5R6Q0vbN7Wdc8fdmszV113D2C5vf0JumCxxT2odO10x7Jy+y/RjPmO/ud3+zItR+HCoQjWrE/Cjz9Qujb+meFqc7Km7NyhJuzF3jvdK4b+x4m6KjcRXTkrGfvwPnu8XTyYA/OUpUoltmMD2A84uRnOOnxWnuOtj4OHAbB2P3cripoWq8gTt2WkTntR+29yC3jwGjsJFh8LvfSLHj8zEEbFjlt29PiKTu4bc/yPq/puS2IQ==)

더 고급 사용 목적으로 컴포넌트 `setup()`과 유사한 함수를 사용하여 Store를 정의할 수도 있습니다:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

[Playground에서 직접 해보기](https://play.pinia.vuejs.org/#eNqNVEFu2zAQ/MpWKGAHscQGaXMwnCBpkEN7aIumR10Uah0zlUiCXCkuDP2kD+i7+pIuSVt20iLoSeJydnZ2yOUmu7K26DvM5tnCS6csgUfq7EWpVWuNI9hA5/HadJrQ3ZJxCAMsnWlhUgiZwsWDn5S61NJoT7ANwvnzxOlRAqWc+D0+LrUQ8KhoBVVHRprWNkjKaPj989ce/NpWJFfTTSKf72okEjiGExiYnJmM46pK30OloZKRSLEorOo9mdLSYYuagqCFSG1zw7wg5PoVIa8AFq/yHK6kRO+BVgieeAdq5VBS8yOZkOLBlTxPSbXqL64755gfYvdz2Gx1j4KHYSECLpQfS2azLFmet5VlS43mQ9kEznK74cuMyUIkxKzSqgqRMhPxv0Df5nfOPPp4JGU220Ev+YRFjT0Z0/i8siqlrYisnwsha834GhvVu0IjCW1b8VfO5VnxrjgRjboTXEgoXeP6aRnOyGts/4d9B718U5y8Lc4ia3+6JW0DayAdSj2wLeT5Zi3V/TNTwmVRDbrPNpzzU3OqpjGPH2OMXIejRLlC+f0f8Qe/Tqq/OGT7ejxoiyp3j5S2b24/4Zr/x83W1F3D6Bc2v6I3TRc0Jtj7Ttcs+wAX1X6IZ8x395u/WRNqv2sqCI1uRHy0+fqF1vdyT4vTAxf3w8oWjsPtcDkONBPzHI9bNS6VxqczHy9aHHZcR1ia+edPxPlh8nSyLT2ZwfQIzi+S1oPXgvGsY/qG5xFg2end4I5zuusuoou+ajoMT0fsLXwcv1lOs+YImO1TY/NH2fAHelGuuQ==)

`setup()` 함수와 Composition API에 익숙하지 않더라도 걱정하지 마세요. Pinia는 Vuex와 유사한 [State 매핑 헬퍼 함수](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper)도 지원합니다. 동일한 방식으로 Store를 정의한 후 `mapStores()`, `mapState()`, 또는 `mapActions()`를 사용하여 접근할 수 있습니다:

```js {22,24,28}
const useCounterStore = defineStore('counter', {
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

const useUserStore = defineStore('user', {
  // ...
})

export default defineComponent({
  computed: {
    // 기타 계산된 프로퍼티
    // ...
    // this.counterStore 및 this.userStore로 접근 가능.
    ...mapStores(useCounterStore, useUserStore),
    // this.count 및 this.double로 접근해 읽기 가능.
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // this.increment()로 접근 가능.
    ...mapActions(useCounterStore, ['increment']),
  },
})
```

[Playground에서 직접 해보기](https://play.pinia.vuejs.org/#eNqdVcFy0zAQ/RWNL0lpIrUUesikmRTooRyAoXDCHBxrm6i1JY8kp5nJ+N9ZS7bsOIFhekmk1b7dt0/a9T66LQq6LSGaRXOTalHYRSxFXihtyZ5weBQSPircS5CWVORRq5yMEDDqueVJ8WCVBjPxy8SCW92mVihpAqwQUiR9YGkweCktaIcPjpSl3kyfzMD/pzl2RnPjGUvYOV9knpSZ++9XMN7HkpAUt6UFPiNuSwhjRNkN6HBCCq0K0FaACR6U0rBeiy0YkqQpGEOsInYjDG04e3aJ5N5ak3MmD8YoQa7xoP7JQYFnk0E6DQk/mbNLxlW5ygaZ8DaOE/0aOeRoQkYeM/rt81XuNwe7Udz0BTpZspCphrwW9qyftLn4U2kDop+wQvSchfeHGwt5kSFz3BEy52K7cIGQ0B4vqQvZCFBVc1Y7Be9Prijn7us7dFmV1ipJlmkm0uebOAqs4mhx367nzLshZM4CoWgS+fc4xULx1SmJveNkwjDuwMRREC6O3KOvLXHE3JqCyacrrV78q42j5p7jaIl9xThsrVKZmSaF8LCNtYWZMZZyif4cMrHVVIJlssjZEWZ5Td/TS5aJFcNETEgOu8M0iJhyyP8neuu6vKCX7+i1i7q9aoLmdVR3hXiDKIs1qZKPYj0Qpe4pkYH+WrhHcSBOkmXq5bOzWV1CoJhuIH0+YX8yO8/6G7YP6C30yrKJXgNeYH189/AFdrgOh7niJTbGvw6/g1FZWXP0bh9KyZF2z8+xvXd3LOT6h7nbWZCmLaom2nWQk7meO38rvaN7Ra96KnaTDyUcTOLDwdeO0zD0UH5jj4bqTR889n0PGjvfUTH1fJiR8Rm5WZBx01wzckEq357IEb27SeC7CQEO6FBu1TTiG/K2N0YSPwcCuDcuWhPpzbHzc2/z4HYwoCbNgH+9IN1XY6BGHbmVop3xLmn1B2TmaJo=)

각 *map 헬퍼*에 대한 자세한 정보는 핵심 개념에서 확인할 수 있습니다.

## 공식 강좌 %{Official-Course}%

Pinia의 공식 강좌는 [Mastering Pinia](https://masteringpinia.com)입니다. Pinia의 저자가 작성한 이 강좌는 기본부터 플러그인, 테스트, 서버 사이드 렌더링과 같은 고급 주제까지 모두 다룹니다. 이는 Pinia를 시작하고 마스터하기 위한 최고의 방법입니다.

## 왜 Pinia인가? %{#why-pinia}%

Pinia(`/piːnjʌ/` 영어로 "피냐"와 유사)는 패키지 이름으로 스페인어로 _piña_(_파인애플_)에 가장 가까운 단어입니다. 파인애플은 개별 꽃들이 모여 여러 개의 열매를 만드는 식물입니다. 이는 각각 독립적으로 생성되지만 끝에서는 모두 연결되는 Store와 비슷합니다. 또한 파인애플은 남아메리카 원산의 맛있는 열대 과일입니다.

## 좀 더 현실적인 예졔 %{#a-more-realistic-example}%

다음은 **JavaScript에서도 타입을 사용하는** Pinia API의 예제가 있습니다. 일부 개발자는 이 예제만으로 충분할 수 있지만, 이 예제를 건너뛰고 다른 문서들에서 *핵심 개념*을 모두 읽은 후 돌아오는 것을 권장합니다.

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // 타입은 자동으로 숫자로 추론합니다.
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // 자동 완성! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // 자동 완성 기능이 있는 다른 getter 호출 ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // 인수의 수에 상관없이 사용 가능, 경우에 따라서 Promise를 반환하게 할 수 있음
    addTodo(text) {
      // state를 직접 변경할 수 있음
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

[Playground에서 직접 해보기](https://play.pinia.vuejs.org/#eNqtVs1y2zYQfpU1L5QdmUzGbQ4cyWO3k86kh7STuKcwB4pcWohJgIMfWRqVb9IH6HP1SboA+Cu7nkzbiygQu99++Haxy2Nw2zTRzmCQBCuVS9ZoUKhNc51yVjdCajiCxBJaKKWoISTTcLKltJB4Jz5iqQaThnGWTY2MIpNCjBZRrO06+qrILOW54EqDe/XJ4sF6cFmc99tHKFmlUS67JxY95nrKYjHCkGvvzPHRWt/hXpM5nWcRhm67NDzXTHDICoe3OIdjygFYCYuziVe0yyqD3SYQgjaS3AFaiwIT8lGP9NTbGj55S3xCUoFwVrFPAElPC411U2UaaQWwqrINVtcrxhujYXdZiwKrdRp4KdIA9KFBWsusYIKWDpnWWVWlwTXcVtUq9hD/Ba2kxKotFhbyp+7//4Fr+BT5t2E1w95K/zR+baMxilEKSQhWfmB8XhoUIXnAQ7cdMYvuXcn5lKM3Uf2xRrL5FvOHjdhPnI9Hl+9I23JqKXMOMa6YZxh3FDs5/PYHfATLKumsT+NP6mKMbQPQ6oZO0UhUKkJOx7N59TXWcZrptDFaUz0nBVPZpsKCrKeFbOHyiuUPM5TbgsT2noSyiofiC5aBv8aXddbQfRWcGoW7BGm3QTIn/bVIA3f37Zs0iN3/CFV9uZHiUaEk/zRY9qY31EriAndaiEpdZg3zblutG5XEcV5wsidx2E5GHHXMmzp+4nPzNvo+ekPSb2IKFDNe4H4ehjwuC6y/Bb03vXkdvfkueutQd1cdaG1RuxvfkixaUWsp2f2JKLmoG1ah/KWxbWUuDt1G8fize6elwYGiK7Fn3n9VVHWW9a+UfJQ7nBxLZ/IeKZt2+92nDy6zwyYVlanI+oXNj6hEZSxHb/aD4QXRntg5tu9djhm/v1Pv9hq56g9liTo1nL2T+ccXjj7SvYqupip2c4AEHMZFgdQA0E+C05mSctw7M9/Xh8mynnotQgcbLn18pamSE6DWvr6GRUcpvriAG3vN3G0mhRKyk3TQJbAiAW7qjZ01Y0dIYENFhxmH9vOXFi5ij+MiJfD5S6fbBDckBUP4HcK+n7nF2OzCEcX3rQScS48UuzYAj6yqYIOQGS3qTLOcbA7U7EqU1OmIQEfWe5E++j2Rfe1Q2nP3IOkJnmh2h+8Z+BHr9BlGmwtsY9lKrtCm8gz++uPPftePPi9q5NPn2S/c6HUinzRTN/j6UgEYFXg+/rdEOHs5BGWhQ6NseDz17xLdw8wS9U/M7VeD3rKeL6zXNNyHdE8Mncg2kSD0lgy7BFGu9fZE/Kn2gzZdkImKvUkLWCl8nsmk9GZcpqAnyRlgT5LjbF1upsL738x9UY3VZuuJHyCrheEaRAnUC0xNo0wte7gMGrrmjIgLCVxo79h/SdmszevzIAzJx6FgEnNN16E2NhVEC33d9LYjz6gxarvwJeBT7/b8fXn1al4BZWZFbGdVZX/b86D9GztAvyY=)

## Vuex와 비교 %{#comparison-with-vuex}%

Pinia는 Vuex의 다음 버전이 어떻게 생길지 탐구하는 과정에서 시작되었으며, Vuex 5에 대한 핵심 팀 논의에서 많은 아이디어를 통합했습니다. 결국 Pinia가 이미 우리가 Vuex 5에서 원했던 대부분의 기능을 구현하고 있음을 깨닫고, 이를 새로운 추천 방식으로 결정했습니다.

Vuex와 비교했을 때, Pinia는 더 간단한 API를 제공하고, Composition-API 스타일의 API를 제공하며, 가장 중요한 것은 TypeScript와 함께 사용할 때 매우 견고한 타입 추론 지원을 제공합니다.

### RFCs %{#rfcs}%

처음에 Pinia는 RFC 과정을 거치지 않았습니다. 저는 애플리케이션을 개발한 경험을 바탕으로, 다른 사람의 코드를 읽고, Pinia를 사용하는 클라이언트를 위해 일하고, Discord에서 질문에 답변하면서 아이디어를 테스트했습니다.
이를 통해 다양한 사례와 애플리케이션 규모에 적합한 솔루션을 제공할 수 있었습니다. 핵심 API를 유지하면서 라이브러리를 자주 업데이트하고 발전시켰습니다.

이제 Pinia가 기본 상태 관리 솔루션이 되었기 때문에, Vue 생태계의 다른 핵심 라이브러리와 마찬가지로 RFC 과정을 거치며, API도 안정된 상태에 접어들었습니다.

### Vuex 3.x/4.x와 비교 %{#comparison-with-vuex-3-x-4-x}%

> Vuex 3.x는 Vue 2용이고, Vuex 4.x는 Vue 3용입니다.

Pinia API는 Vuex ≤4와 매우 다릅니다. 주요 차이점은 다음과 같습니다:

- *mutations*는 더 이상 존재하지 않습니다. 이것은 종종 **매우 장황하게** 여겨졌습니다. 초기에는 devtools 통합을 위해 도입되었으나, 이제는 더 이상 문제가 되지 않습니다.
- TypeScript를 지원하기 위해 복잡한 커스텀 래퍼를 만들 필요가 없습니다. 모든 것이 타입이 지정되어 있으며, API는 TS 타입 추론을 최대한 활용할 수 있도록 설계되었습니다.
- 주입할 마법 문자열이 필요 없습니다. 함수를 가져와서 호출하고, 자동 완성 기능을 즐기세요!
- 동적으로 Store를 추가할 필요가 없습니다. 기본적으로 모든 Store는 동적이며, 이를 알아차리지 못할 수도 있습니다. 여전히 Store를 수동으로 등록할 수 있지만, 자동으로 처리되므로 걱정할 필요가 없습니다.
- *모듈*의 중첩 구조가 없습니다. 여전히 다른 Store를 가져와 사용하여 암묵적으로 Store를 중첩시킬 수 있지만, Pinia는 평면 구조를 제공하면서도 Store
- 간의 교차 조합을 가능하게 합니다. **심지어 Store의 순환 종속성도 허용됩니다.**
- 더 이상 *이름을 지정할 수 있는 모듈*이 없습니다. Store의 평면 아키텍처를 감안할 때, Store의 "네임스페이싱"은 정의 방식에 내재되어 있으며, 모든 Store는 네임스페이스가 있다고 할 수 있습니다.

기존 Vuex ≤4 프로젝트를 Pinia로 변환하는 방법에 대한 자세한 지침은 [Vuex에서 마이그레이션 가이드](./cookbook/migration-vuex.md)를 참조하세요.
