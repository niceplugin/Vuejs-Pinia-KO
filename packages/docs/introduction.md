# 소개 %{#introduction}%

<VueSchoolLink
href="https://vueschool.io/lessons/introduction-to-pinia"
title="Get started with Pinia"
/>

피니아는 2019년 11월경에 [컴포지션 API](https://github.com/vuejs/composition-api)로 Vue용 스토어가 어떻게 생겼는지 재설계하기 위한 실험으로 [시작](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)했습니다. 그 이후로 초기 원칙은 여전히 동일하지만, 피니아는 컴포지션 API를 사용할 필요가 없으며, Vue 2와 Vue 3 모두에서 작동합니다. API는 설치와 SSR을 제외하고 모두 동일하며, 이 문서는 Vue 2 및 Vue 3 사용자가 읽을 수 있도록 필요할 때마다 Vue 2에 대한 메모와 함께 Vue 3을 대상으로 합니다!

## 왜 피니아를 사용해야 하나요? %{#why-should-i-use-pinia}%

<!-- 
https://masteringpinia.com/lessons/why-use-pinia
 -->

피니아는 Vue의 스토어 라이브러리로 컴포넌트/페이지 간에 상태를 공유할 수 있습니다. 컴포지션 API에 익숙하다면 간단한 `export const state = reactive({})`로 전역 상태를 공유할 수 있다고 생각할 수 있습니다. 이는 SPA에는 해당되지만 SSR의 경우, **앱이 [보안 취약성](https://vuejs.kr/guide/scaling-up/ssr.html#cross-request-state-pollution)에 노출됩니다.** 그러나 작은 SPA에서도 피니아를 사용하면 많은 이점이 있습니다:

- 테스트 유틸리티
- 플러그인: 플러그인으로 Pinia 기능 확장
- JS 사용자를 위한 적절한 TypeScript 지원 또는 **자동 완성**
- 서버 사이드 렌더링 지원
- Devtools 지원
  - 액션, 뮤테이션을 추적하는 타임라인
  - 사용되는 컴포넌트에서 스토어가 나타남
  - 타임 트래블 및 더 쉬운 디버깅
- 핫 모듈 교체 (HMR)
  - 페이지를 새로고침하지 않고 스토어 수정
  - 개발 중 기존 상태 유지

아직도 의문이 남아 있다면, [공식 Mastering Pinia 강좌](https://masteringpinia.com)를 확인하세요. 처음에는 `defineStore()` 함수를 직접 구축하는 방법을 다루고, 이후에는 공식 Pinia API로 이동합니다.

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

## 기본 예제 %{#basic-example}%

이것은 API 측면에서 피니아를 사용하는 것과 같습니다(전체 지침은 [시작하기](getting-started.md)를 확인하십시오). 스토어를 만드는 것으로 시작합니다.

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 다음과 같이 정의할 수도 있음:
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

그런 다음 컴포넌트에서 사용합니다:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// 자동 완성 기능 ✨
counter.$patch({ count: counter.count + 1 })
// 또는 actions 사용
counter.increment()
</script>

<template>
  <!-- 스토어에서 직접 상태에 액세스 -->
  <div>현재 카운트: {{ counter.count }}</div>
</template>
```

[Try it in the Playground](https://play.pinia.vuejs.org/#eNqNVM1O3DAQfpVpVGkXQWIQLYfVgqCIQ3toq9JjLsEZWNPEtuzJstUqb9IH6HP1STq2k/2hFeKyG49nvvnmsz+vsytri2WH2Sybe+mUJfBInb0otWqtcQRr6Dxem04TulsyDqGHe2damBRCpnDx6CelLrU02hMMQTh/Xjg9SEmpJv4fHpZaCHhStICqIyNNaxskZTT8+fV7m/zWViQX03UCn409Eggcwgn0DM5IxnFXpR+g0lDJCKSYFFb1Fkxp6bBFTYHQXKSxeWBeEHL/ipBXAPM3eQ5XUqL3QAsET7wDtXIoqfmZREjxoEqep6JaLS+uO+cYH+L0M1gPvDeE+34uQl5ov2mZHWVJ8rytLEtqNB/KOmCWw4YvMwYLkRCzSqsqRMpMxO8CfZvfOfPk45GU2dGYesknLGpckjGNzyurUtmCyPqZELLWnF9jo5au0EhC21b8U3N5VrwvTkSj7gQ3EkrXuNpvwxV5je1r0MfUy+Pi5F1xFlGXpwNoG1ADaF/qnmUhzzfrXj08EyVcFtWg+2LDOe+LUzWNefoUY+Q63FCUC5Q//hN/9KvE+qtDlm+JO2NR5R6Q0vbN7Wdc8fdmszV113D2C5vf0JumCxxT2odO10x7Jy+y/RjPmO/ud3+zItR+HCoQjWrE/Cjz9Qujb+meFqc7Km7NyhJuzF3jvdK4b+x4m6KjcRXTkrGfvwPnu8XTyYA/OUpUoltmMD2A84uRnOOnxWnuOtj4OHAbB2P3cripoWq8gTt2WkTntR+29yC3jwGjsJFh8LvfSLHj8zEEbFjlt29PiKTu4bc/yPq/puS2IQ==)

고급 사용 목적으로 함수(컴포넌트 `setup()`과 유사)를 사용하여 스토어를 정의할 수도 있습니다:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

[Try it in the Playground](https://play.pinia.vuejs.org/#eNqNVEFu2zAQ/MpWKGAHscQGaXMwnCBpkEN7aIumR10Uah0zlUiCXCkuDP2kD+i7+pIuSVt20iLoSeJydnZ2yOUmu7K26DvM5tnCS6csgUfq7EWpVWuNI9hA5/HadJrQ3ZJxCAMsnWlhUgiZwsWDn5S61NJoT7ANwvnzxOlRAqWc+D0+LrUQ8KhoBVVHRprWNkjKaPj989ce/NpWJFfTTSKf72okEjiGExiYnJmM46pK30OloZKRSLEorOo9mdLSYYuagqCFSG1zw7wg5PoVIa8AFq/yHK6kRO+BVgieeAdq5VBS8yOZkOLBlTxPSbXqL64755gfYvdz2Gx1j4KHYSECLpQfS2azLFmet5VlS43mQ9kEznK74cuMyUIkxKzSqgqRMhPxv0Df5nfOPPp4JGU220Ev+YRFjT0Z0/i8siqlrYisnwsha834GhvVu0IjCW1b8VfO5VnxrjgRjboTXEgoXeP6aRnOyGts/4d9B718U5y8Lc4ia3+6JW0DayAdSj2wLeT5Zi3V/TNTwmVRDbrPNpzzU3OqpjGPH2OMXIejRLlC+f0f8Qe/Tqq/OGT7ejxoiyp3j5S2b24/4Zr/x83W1F3D6Bc2v6I3TRc0Jtj7Ttcs+wAX1X6IZ8x395u/WRNqv2sqCI1uRHy0+fqF1vdyT4vTAxf3w8oWjsPtcDkONBPzHI9bNS6VxqczHy9aHHZcR1ia+edPxPlh8nSyLT2ZwfQIzi+S1oPXgvGsY/qG5xFg2end4I5zuusuoou+ajoMT0fsLXwcv1lOs+YImO1TY/NH2fAHelGuuQ==)

아직 `setup()` 및 컴포지션 API에 익숙하지 않더라도 피니아는 [Vuex와 같은 맵 헬퍼](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper)와 같은 세트를 지원하므로 걱정하지 마십시오. 스토어 정의 방식은 같지만, `mapStores()`, `mapState()` 또는 `mapActions()`를 사용합니다:

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
    // 다른 계산된 속성
    // ...
    // `this.counterStore`와 `this.userStore`로 접근 가능.
    ...mapStores(useCounterStore, useUserStore),
    // `this.count`와 `this.double`의 읽기 접근 권한을 부여.
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // this.increment()에 접근 제공.
    ...mapActions(useCounterStore, ['increment']),
  },
})
```

[Try it in the Playground](https://play.pinia.vuejs.org/#eNqdVcFy0zAQ/RWNL0lpIrUUesikmRTooRyAoXDCHBxrm6i1JY8kp5nJ+N9ZS7bsOIFhekmk1b7dt0/a9T66LQq6LSGaRXOTalHYRSxFXihtyZ5weBQSPircS5CWVORRq5yMEDDqueVJ8WCVBjPxy8SCW92mVihpAqwQUiR9YGkweCktaIcPjpSl3kyfzMD/pzl2RnPjGUvYOV9knpSZ++9XMN7HkpAUt6UFPiNuSwhjRNkN6HBCCq0K0FaACR6U0rBeiy0YkqQpGEOsInYjDG04e3aJ5N5ak3MmD8YoQa7xoP7JQYFnk0E6DQk/mbNLxlW5ygaZ8DaOE/0aOeRoQkYeM/rt81XuNwe7Udz0BTpZspCphrwW9qyftLn4U2kDop+wQvSchfeHGwt5kSFz3BEy52K7cIGQ0B4vqQvZCFBVc1Y7Be9Prijn7us7dFmV1ipJlmkm0uebOAqs4mhx367nzLshZM4CoWgS+fc4xULx1SmJveNkwjDuwMRREC6O3KOvLXHE3JqCyacrrV78q42j5p7jaIl9xThsrVKZmSaF8LCNtYWZMZZyif4cMrHVVIJlssjZEWZ5Td/TS5aJFcNETEgOu8M0iJhyyP8neuu6vKCX7+i1i7q9aoLmdVR3hXiDKIs1qZKPYj0Qpe4pkYH+WrhHcSBOkmXq5bOzWV1CoJhuIH0+YX8yO8/6G7YP6C30yrKJXgNeYH189/AFdrgOh7niJTbGvw6/g1FZWXP0bh9KyZF2z8+xvXd3LOT6h7nbWZCmLaom2nWQk7meO38rvaN7Ra96KnaTDyUcTOLDwdeO0zD0UH5jj4bqTR889n0PGjvfUTH1fJiR8Rm5WZBx01wzckEq357IEb27SeC7CQEO6FBu1TTiG/K2N0YSPwcCuDcuWhPpzbHzc2/z4HYwoCbNgH+9IN1XY6BGHbmVop3xLmn1B2TmaJo=)

핵심 개념에서 각 "맵 헬퍼"에 대한 자세한 정보를 찾을 수 있습니다.

## 공식 강좌 %{Official-Course}%

Pinia의 공식 강좌는 [Mastering Pinia](https://masteringpinia.com)입니다. Pinia의 저자가 작성한 이 강좌는 기본부터 플러그인, 테스트, 서버 사이드 렌더링과 같은 고급 주제까지 모두 다룹니다. Pinia를 시작하고 마스터하는 최고의 방법입니다.

## 왜 피니아인가? %{#why-pinia}%

피니아(pinia)는 스페인어 _pineapple_의 영어 발음과 가장 유사한 _piña_입니다. 파인애플은 실제로 각각의 꽃들이 하나의 그룹으로 된 과일입니다. 꽃은 각각 피어나지만, 결국 모두 합쳐지는 모습이 마치 스토어 같습니다. 남아메리카가 원산지인 맛있는 열대 과일이기도 합니다.

## 좀 더 현실적인 예졔 %{#a-more-realistic-example}%

다음은 JavaScript에서도 유형이 있는 피니아를 사용할 수 있는 예제입니다. 일부 개발자에게는 이 설명으로 충분할 수 있습니다. 이해되지 않는다면, 이 예제를 건너뛰고 다른 모든 핵심 개념에 대해 읽은 후에 다시 오는 것이 좋습니다.

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // 유형은 자동으로 숫자로 유추됨
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
        // 자동 완성 기능으로 다른 getters 호출 ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // 인자의 양에 관계없이 promise를 반환할지 여부
    addTodo(text) {
      // 상태를 직접 변경할 수 있음
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

[Try it in the Playground](https://play.pinia.vuejs.org/#eNqtVs1y2zYQfpU1L5QdmUzGbQ4cyWO3k86kh7STuKcwB4pcWohJgIMfWRqVb9IH6HP1SboA+Cu7nkzbiygQu99++Haxy2Nw2zTRzmCQBCuVS9ZoUKhNc51yVjdCajiCxBJaKKWoISTTcLKltJB4Jz5iqQaThnGWTY2MIpNCjBZRrO06+qrILOW54EqDe/XJ4sF6cFmc99tHKFmlUS67JxY95nrKYjHCkGvvzPHRWt/hXpM5nWcRhm67NDzXTHDICoe3OIdjygFYCYuziVe0yyqD3SYQgjaS3AFaiwIT8lGP9NTbGj55S3xCUoFwVrFPAElPC411U2UaaQWwqrINVtcrxhujYXdZiwKrdRp4KdIA9KFBWsusYIKWDpnWWVWlwTXcVtUq9hD/Ba2kxKotFhbyp+7//4Fr+BT5t2E1w95K/zR+baMxilEKSQhWfmB8XhoUIXnAQ7cdMYvuXcn5lKM3Uf2xRrL5FvOHjdhPnI9Hl+9I23JqKXMOMa6YZxh3FDs5/PYHfATLKumsT+NP6mKMbQPQ6oZO0UhUKkJOx7N59TXWcZrptDFaUz0nBVPZpsKCrKeFbOHyiuUPM5TbgsT2noSyiofiC5aBv8aXddbQfRWcGoW7BGm3QTIn/bVIA3f37Zs0iN3/CFV9uZHiUaEk/zRY9qY31EriAndaiEpdZg3zblutG5XEcV5wsidx2E5GHHXMmzp+4nPzNvo+ekPSb2IKFDNe4H4ehjwuC6y/Bb03vXkdvfkueutQd1cdaG1RuxvfkixaUWsp2f2JKLmoG1ah/KWxbWUuDt1G8fize6elwYGiK7Fn3n9VVHWW9a+UfJQ7nBxLZ/IeKZt2+92nDy6zwyYVlanI+oXNj6hEZSxHb/aD4QXRntg5tu9djhm/v1Pv9hq56g9liTo1nL2T+ccXjj7SvYqupip2c4AEHMZFgdQA0E+C05mSctw7M9/Xh8mynnotQgcbLn18pamSE6DWvr6GRUcpvriAG3vN3G0mhRKyk3TQJbAiAW7qjZ01Y0dIYENFhxmH9vOXFi5ij+MiJfD5S6fbBDckBUP4HcK+n7nF2OzCEcX3rQScS48UuzYAj6yqYIOQGS3qTLOcbA7U7EqU1OmIQEfWe5E++j2Rfe1Q2nP3IOkJnmh2h+8Z+BHr9BlGmwtsY9lKrtCm8gz++uPPftePPi9q5NPn2S/c6HUinzRTN/j6UgEYFXg+/rdEOHs5BGWhQ6NseDz17xLdw8wS9U/M7VeD3rKeL6zXNNyHdE8Mncg2kSD0lgy7BFGu9fZE/Kn2gzZdkImKvUkLWCl8nsmk9GZcpqAnyRlgT5LjbF1upsL738x9UY3VZuuJHyCrheEaRAnUC0xNo0wte7gMGrrmjIgLCVxo79h/SdmszevzIAzJx6FgEnNN16E2NhVEC33d9LYjz6gxarvwJeBT7/b8fXn1al4BZWZFbGdVZX/b86D9GztAvyY=)

## Vuex와 비교 %{#comparison-with-vuex}%

피니아는 Vuex 5에 대한 핵심 팀 토론의 많은 아이디어를 통합하여, Vuex의 다음 버전이 어떤 모습일지 탐구하는 것으로 시작했습니다. 마침내 우리는 Vuex 5에서 우리가 원하는 대부분을 피니아가 이미 구현하고 있다는 것을 깨달았고, 이것을 새로운 권장 사항으로 만들기로 결정했습니다.

Vuex와 비교할 때, 피니아는 더 간단한 API를 제공하고, 컴포지션 API 스타일을 제공하며, 가장 중요한 것은 TypeScript와 함께 사용할 때 견고한 유형 추론을 지원합니다.

### RFCs %{#rfcs}%

처음에 피니아는 RFC 프로세스를 거치지 않았습니다. 나는 앱 개발, 다른 사람의 코드 읽기, 피니아를 사용하는 고객을 위해 일하고 디스코드에서 질문에 답변한 경험을 바탕으로 아이디어를 테스트했습니다. 이를 통해 다양한 사례와 앱 크기에 적합한 솔루션을 제공할 수 있었습니다. 나는 자주 퍼블리싱하고 핵심 API를 동일하게 유지하면서 라이브러리를 발전시켰습니다.

이제 피니아는 기본 상태 관리 솔루션이 되었으며, Vue 생태계의 다른 핵심 라이브러리와 동일한 RFC 프로세스를 거치며 API는 안정적인 상태에 진입했습니다.

### Vuex 3.x/4.x와 비교 %{#comparison-with-vuex-3-x-4-x}%

> Vuex 3.x는 Vue 2용이고, Vuex 4.x는 Vue 3용입니다.

피니아 API는 Vuex ≤4와 매우 다릅니다:

- `mutations`는 더 이상 존재하지 않습니다.
  이것은 종종 **매우 장황한** 것으로 인식되었습니다.
  이것은 처음에 devtools 통합을 제공했지만, 더 이상 문제가 되지 않습니다.
- TypeScript를 지원하기 위해 복잡한 커스텀 래퍼를 만들 필요가 없으며,
  모든 것이 입력되며 API는 TS 유형 추론을 최대한 활용하는 방식으로 설계되었습니다.
- 더 이상 매직 문자열을 주입없이, 함수를 가져오고, 호출하고, 자동 완성을 즐기십시오!
- 스토어를 동적으로 추가할 필요가 없습니다.
  기본적으로 모두 동적으로 작동하므로 눈치채지 못할 것입니다.
  원할 때마다 수동으로 스토어를 사용하여 등록할 수 있지만, 자동이기 때문에 걱정할 필요가 없습니다.
- 더 이상 모듈의 중첩 구조가 없습니다.
  스토어를 가져오고 다른 스토어 내부에 사용하여 여전히 스토어을 암시적으로 중첩할 수 있지만,
  피니아는 수평적으로 디자인한 구조를 제공하는 동시에 스토어 간에 교차 구성 방법을 여전히 가능하게 합니다.
  **스토어의 순환 종속성을 가질 수도 있습니다**.
- **네임스페이스 모듈이 없습니다**.
  스토어의 수평적 아키텍처를 고려할 때,
  "네임스페이스" 스토어는 정의된 방식에 내재되어 있으며, 모든 스토어가 네임스페이스라고 말할 수 있습니다.

기존 Vuex ≤4 프로젝트에서 피니아를 사용하도록 변환하는 방법의 자세한 지침은 [Vuex에서 마이그레이션 가이드](/cookbook/migration-vuex.md)를 참고하세요.