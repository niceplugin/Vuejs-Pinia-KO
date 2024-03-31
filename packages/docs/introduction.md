# 소개

<VueSchoolLink
  href="https://vueschool.io/lessons/introduction-to-pinia"
  title="Pinia 시작하기"
/>

Pinia는 2019년 11월경 [Composition API](https://github.com/vuejs/composition-api)를 사용하여 Vue의 Store가 어떤 모습일지에 대한 실험으로 [시작되었습니다](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e). 그 이후, 초기 원칙들은 그대로 유지되었지만, Pinia는 Vue 2와 Vue 3 모두에서 작동하며 **composition API를 사용할 필요가 없습니다**. API는 _설치_ 및 _SSR_을 제외하고는 동일하며, 이 문서는 Vue 3을 대상으로 하지만 필요할 때마다 Vue 2에 대한 참고 사항을 포함하므로 Vue 2 및 Vue 3 사용자 모두가 읽을 수 있습니다!

## 왜 Pinia를 사용해야 할까요?

Pinia는 Vue의 상태 저장소 라이브러리로, 컴포넌트/페이지 간에 상태를 공유할 수 있게 해줍니다. Composition API에 익숙하다면, 단순한 `export const state = reactive({})`으로 전역 상태를 공유할 수 있다고 생각할 수 있습니다. 이는 싱글 페이지 어플리케이션에서는 사실이지만 **서버 사이드 렌더링을 사용할 경우 어플리케이션에 [보안 취약점](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)을 노출**시킵니다. 하지만, 작은 싱글 페이지 어플리케이션에서조차도 Pinia를 사용하면 많은 이점을 얻을 수 있습니다:

- Devtools 지원
  - 행동, 변이 추적을 위한 타임라인
  - 사용되는 컴포넌트에서 스토어가 보임
  - 시간 여행 및 더 쉬운 디버깅
- 핫 모듈 교체
  - 페이지를 새로 고침하지 않고 스토어 수정
  - 개발 동안 기존 상태 유지
- 플러그인: 플러그인으로 Pinia 기능 확장
- 제대로 된 TypeScript 지원 또는 JS 사용자를 위한 **자동완성**
- 서버 사이드 렌더링 지원

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

## 기본 예제

API 측면에서 Pinia를 사용하는 것은 다음과 같습니다(전체 지침을 보려면 [시작하기](./getting-started.md)를 확인하세요). 스토어를 생성하는 것부터 시작합니다:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 다음과 같이 정의될 수도 있음
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

그리고 나서 컴포넌트에서 _사용_합니다:

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// 자동완성과 함께 ✨
counter.$patch({ count: counter.count + 1 })
// 또는 대신에 액션을 사용
counter.increment()
</script>

<template>
  <!-- 스토어에서 직접 상태에 접근 -->
  <div>현재 개수: {{ counter.count }}</div>
</template>
```

[Playground에서 시도해보세요](https://play.pinia.vuejs.org/#eNqNVM1O3DAQfpVpVGkXQWIQLYfVgqCIQ3toq9JjLsEZWNPEtuzJstUqb9IH6HP1STq2k/2hFeKyG49nvvnmsz+vsytri2WH2Sybe+mUJfBInb0otWqtcQRr6Dxem04TulsyDqGHe2damBRCpnDx6CelLrU02hMMQTh/Xjg9SEmpJv4fHpZaCHhStICqIyNNaxskZTT8+fV7m/zWViQX03UCn409Eggcwgn0DM5IxnFXpR+g0lDJCKSYFFb1Fkxp6bBFTYHQXKSxeWBeEHL/ipBXAPM3eQ5XUqL3QAsET7wDtXIoqfmZREjxoEqep6JaLS+uO+cYH+L0M1gPvDeE+34uQl5ov2mZHWVJ8rytLEtqNB/KOmCWw4YvMwYLkRCzSqsqRMpMxO8CfZvfOfPk45GU2dGYesknLGpckjGNzyurUtmCyPqZELLWnF9jo5au0EhC21b8U3N5VrwvTkSj7gQ3EkrXuNpvwxV5je1r0MfUy+Pi5F1xFlGXpwNoG1ADaF/qnmUhzzfrXj08EyVcFtWg+2LDOe+LUzWNefoUY+Q63FCUC5Q//hN/9KvE+qtDlm+JO2NR5R6Q0vbN7Wdc8fdmszV113D2C5vf0JumCxxT2odO10x7Jy+y/RjPmO/ud3+zItR+HCoQjWrE/Cjz9Qujb+meFqc7Km7NyhJuzF3jvdK4b+x4m6KjcRXTkrGfvwPnu8XTyYA/OUpUoltmMD2A84uRnOOnxWnuOtj4OHAbB2P3cripoWq8gTt2WkTntR+29yC3jwGjsJFh8LvfSLHj8zEEbFjlt29PiKTu4bc/yPq/puS2IQ==)

컴포넌트 `setup()`과 유사한 함수를 사용하여 더 고급 사용 사례를 위한 스토어를 정의할 수도 있습니다:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

[Playground에서 시도해보세요](https://play.pinia.vuejs.org/#eNqNVEFu2zAQ/MpWKGAHscQGaXMwnCBpkEN7aIumR10Uah0zlUiCXCkuDP2kD+i7+pIuSVt20iLoSeJydnZ2yOUmu7K26DvM5tnCS6csgUfq7EWpVWuNI9hA5/HadJrQ3ZJxCAMsnWlhUgiZwsWDn5S61NJoT7ANwvnzxOlRAqWc+D0+LrUQ8KhoBVVHRprWNkjKaPj989ce/NpWJFfTTSKf72okEjiGExiYnJmM46pK30OloZKRSLEorOo9mdLSYYuagqCFSG1zw7wg5PoVIa8AFq/yHK6kRO+BVgieeAdq5VBS8yOZkOLBlTxPSbXqL64755gfYvdz2Gx1j4KHYSECLpQfS2azLFmet5VlS43mQ9kEznK74cuMyUIkxKzSqgqRMhPxv0Df5nfOPPp4JGU220Ev+YRFjT0Z0/i8siqlrYisnwsha834GhvVu0IjCW1b8VfO5VnxrjgRjboTXEgoXeP6aRnOyGts/4d9B718U5y8Lc4ia3+6JW0DayAdSj2wLeT5Zi3V/TNTwmVRDbrPNpzzU3OqpjGPH2OMXIejRLlC+f0f8Qe/Tqq/OGT7ejxoiyp3j5S2b24/4Zr/x83W1F3D6Bc2v6I3TRc0Jtj7Ttcs+wAX1X6IZ8x395u/WRNqv2sqCI1uRHy0+fqF1vdyT4vTAxf3w8oWjsPtcDkONBPzHI9bNS6VxqczHy9aHHZcR1ia+edPxPlh8nSyLT2ZwfQIzi+S1oPXgvGsY/qG5xFg2end4I5zuusuoou+ajoMT0fsLXwcv1lOs+YImO1TY/NH2fAHelGuuQ==)

여전히 `setup()`과 Composition API를 사용하지 않는다면 걱정하지 마세요, Pinia는 Vuex와 비슷한 [_map helper_](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper)들을 지원합니다. 동일한 방법으로 스토어를 정의하지만 `mapStores()`, `mapState()`, 또는 `mapActions()`를 사용합니다:

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
    // 다른 계산된 속성들
    // ...
    // this.counterStore 및 this.userStore에 접근을 제공
    ...mapStores(useCounterStore, useUserStore),
    // this.count 및 this.double에 대한 읽기 접근 제공
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // this.increment()에 접근 제공
    ...mapActions(useCounterStore, ['increment']),
  },
})
```

[Playground에서 시도해보세요](https://play.pinia.vuejs.org/#eNqdVcFy0zAQ/RWNL0lpIrUUesikmRTooRyAoXDCHBxrm6i1JY8kp5nJ+N9ZS7bsOIFhekmk1b7dt0/a9T66LQq6LSGaRXOTalHYRSxFXihtyZ5weBQSPircS5CWVORRq5yMEDDqueVJ8WCVBjPxy8SCW92mVihpAqwQUiR9YGkweCktaIcPjpSl3kyfzMD/pzl2RnPjGUvYOV9knpSZ++9XMN7HkpAUt6UFPiNuSwhjRNkN6HBCCq0K0FaACR6U0rBeiy0YkqQpGEOsInYjDG04e3aJ5N5ak3MmD8YoQa7xoP7JQYFnk0E6DQk/mbNLxlW5ygaZ8DaOE/0aOeRoQkYeM/rt81XuNwe7Udz0BTpZspCphrwW9qyftLn4U2kDop+wQvSchfeHGwt5kSFz3BEy52K7cIGQ0B4vqQvZCFBVc1Y7Be9Prijn7us7dFmV1ipJlmkm0uebOAqs4mhx367nzLshZM4CoWgS+fc4xULx1SmJveNkwjDuwMRREC6O3KOvLXHE3JqCyacrrV78q42j5p7jaIl9xThsrVKZmSaF8LCNtYWZMZZyif4cMrHVVIJlssjZEWZ5Td/TS5aJFcNETEgOu8M0iJhyyP8neuu6vKCX7+i1i7q9aoLmdVR3hXiDKIs1qZKPYj0Qpe4pkYH+WrhHcSBOkmXq5bOzWV1CoJhuIH0+YX8yO8/6G7YP6C30yrKJXgNeYH189/AFdrgOh7niJTbGvw6/g1FZWXP0bh9KyZF2z8+xvXd3LOT6h7nbWZCmLaom2nWQk7meO38rvaN7Ra96KnaTDyUcTOLDwdeO0zD0UH5jj4bqTR889n0PGjvfUTH1fJiR8Rm5WZBx01wzckEq357IEb27SeC7CQEO6FBu1TTiG/K2N0YSPwcCuDcuWhPpzbHzc2/z4HYwoCbNgH+9IN1XY6BGHbmVop3xLmn1B2TmaJo=)

핵심 개념에서 각 _map helper_에 대한 더 많은 정보를 찾을 수 있습니다.

## 왜 _Pinia_인가

Pinia(영어 발음으로는 `/piːnjʌ/`, "피냐"와 같음)는 유효한 패키지 이름으로는 _piña_(_파인애플_ 의 스페인어)와 가장 가까운 단어입니다. 파인애플은 실제로 개별 꽃들이 모여 하나의 복수 과일을 만드는 것입니다. 스토어들도 비슷하게, 각각이 개별적으로 탄생하지만 결국 모두 연결됩니다. 또한, 남아메리카 원산의 맛있는 열대 과일이기도 합니다.

## 좀 더 현실적인 예제

여기 Pinia를 사용할 때의 API가 **자바스크립트에서도 타입을 가지는** 더 완전한 예시입니다. 일부 사람들에게는 이것만으로 시작하기에 충분할 수 있지만, 여전히 나머지 문서를 확인하거나 모든 _핵심 개념_에 대해 읽은 후에 이 예시로 돌아오는 것이 좋습니다.

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // 타입은 자동으로 number로 추론됩니다
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // 자동완성! ✨
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
        // 자동완성과 함께 다른 getter 호출 ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // 인자의 양에 관계 없이, 프로미스를 반환하거나 그렇지 않아도 됩니다
    addTodo(text) {
      // 직접 상태를 변경할 수 있습니다
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

[Playground에서 시도해보세요](https://play.pinia.vuejs.org/#eNqtVs1y2zYQfpU1L5QdmUzGbQ4cyWO3k86kh7STuKcwB4pcWohJgIMfWRqVb9IH6HP1SboA+Cu7nkzbiygQu99++Haxy2Nw2zTRzmCQBCuVS9ZoUKhNc51yVjdCajiCxBJaKKWoISTTcLKltJB4Jz5iqQaThnGWTY2MIpNCjBZRrO06+qrILOW54EqDe/XJ4sF6cFmc99tHKFmlUS67JxY95nrKYjHCkGvvzPHRWt/hXpM5nWcRhm67NDzXTHDICoe3OIdjygFYCYuziVe0yyqD3SYQgjaS3AFaiwIT8lGP9NTbGj55S3xCUoFwVrFPAElPC411U2UaaQWwqrINVtcrxhujYXdZiwKrdRp4KdIA9KFBWsusYIKWDpnWWVWlwTXcVtUq9hD/Ba2kxKotFhbyp+7//4Fr+BT5t2E1w95K/zR+baMxilEKSQhWfmB8XhoUIXnAQ7cdMYvuXcn5lKM3Uf2xRrL5FvOHjdhPnI9Hl+9I23JqKXMOMa6YZxh3FDs5/PYHfATLKumsT+NP6mKMbQPQ6oZO0UhUKkJOx7N59TXWcZrptDFaUz0nBVPZpsKCrKeFbOHyiuUPM5TbgsT2noSyiofiC5aBv8aXddbQfRWcGoW7BGm3QTIn/bVIA3f37Zs0iN3/CFV9uZHiUaEk/zRY9qY31EriAndaiEpdZg3zblutG5XEcV5wsidx2E5GHHXMmzp+4nPzNvo+ekPSb2IKFDNe4H4ehjwuC6y/Bb03vXkdvfkueutQd1cdaG1RuxvfkixaUWsp2f2JKLmoG1ah/KWxbWUuDt1G8fize6elwYGiK7Fn3n9VVHWW9a+UfJQ7nBxLZ/IeKZt2+92nDy6zwyYVlanI+oXNj6hEZSxHb/aD4QXRntg5tu9djhm/v1Pv9hq56g9liTo1nL2T+ccXjj7SvYqupip2c4AEHMZFgdQA0E+C05mSctw7M9/Xh8mynnotQgcbLn18pamSE6DWvr6GRUcpvriAG3vN3G0mhRKyk3TQJbAiAW7qjZ01Y0dIYENFhxmH9vOXFi5ij+MiJfD5S6fbBDckBUP4HcK+n7nF2OzCEcX3rQScS48UuzYAj6yqYIOQGS3qTLOcbA7U7EqU1OmIQEfWe5E++j2Rfe1Q2nP3IOkJnmh2h+8Z+BHr9BlGmwtsY9lKrtCm8gz++uPPftePPi9q5NPn2S/c6HUinzRTN/j6UgEYFXg+/rdEOHs5BGWhQ6NseDz17xLdw8wS9U/M7VeD3rKeL6zXNNyHdE8Mncg2kSD0lgy7BFGu9fZE/Kn2gzZdkImKvUkLWCl8nsmk9GZcpqAnyRlgT5LjbF1upsL738x9UY3VZuuJHyCrheEaRAnUC0xNo0wte7gMGrrmjIgLCVxo79h/SdmszevzIAzJx6FgEnNN16E2NhVEC33d9LYjz6gxarvwJeBT7/b8fXn1al4BZWZFbGdVZX/b86D9GztAvyY=)

## Vuex와의 비교

Pinia는 Vuex의 다음 반복이 어떤 모습일지에 대한 탐구로 시작되었으며, Vuex 5를 위한 코어 팀 논의에서 나온 많은 아이디어를 포함하고 있습니다. 결국, 우리는 Pinia가 Vuex 5에서 원하는 대부분을 이미 구현하고 있다는 것을 깨닫고, 그것을 새로운 추천으로 만들기로 결정했습니다.

Vuex와 비교해, Pinia는 덜 복잡한 API와 적은 의식을 제공하며, 중요하게는 TypeScript를 사용할 때 견고한 타입 추론 지원이 있습니다.

### RFC들

초기에 Pinia는 RFC 프로세스를 거치지 않았습니다. 나는 애플리케이션 개발, 다른 사람의 코드 읽기, Pinia를 사용하는 클라이언트를 위한 작업, Discord에서 질문에 답변하는 등의 경험을 바탕으로 아이디어를 시험해 보았습니다.
이를 통해 다양한 케이스와 애플리케이션 크기에 적합한 해결책을 제공할 수 있었으며, 자주 출판하며 핵심 API를 동일하게 유지하면서 라이브러리를 발전시켰습니다.

이제 Pinia가 기본 상태 관리 솔루션이 되면서, Vue 생태계의 다른 핵심 라이브러리와 마찬가지로 동일한 RFC 프로세스의 대상이 되었으며, 그 API는 안정된 상태에 접어들었습니다.

### Vuex 3.x/4.x와의 비교

> Vuex 3.x는 Vue 2용 Vuex이며, Vuex 4.x는 Vue 3용입니다

Pinia API는 Vuex ≤4와 매우 다르며, 특히:

- _변이_는 더 이상 존재하지 않습니다. 그것들은 종종 **_극도로_ 장황하게** 인식되었습니다. 초기에는 devtools 통합을 가져왔지만 이제는 더 이상 문제가 아닙니다.
- TypeScript를 지원하기 위해 복잡한 맞춤형 래퍼를 생성할 필요가 없으며, 모든 것이 타입 지정 되어 있고 API는 가능한 한 TS 타입 추론을 활용하도록 설계되었습니다.
- 주입할 마법의 문자열이 더 이상 없으며, 함수를 가져와 호출하고 자동완성을 즐깁니다!
- 동적으로 스토어를 추가할 필요가 없으며, 모든 스토어는 기본적으로 동적이며 심지어 눈치채지도 못할 것입니다. 물론 스토어를 수동으로 사용하여 등록할 수는 있지만 자동이기 때문에 걱정할 필요가 없습니다.
- _모듈_의 중첩 구조가 더 이상 없습니다. 여전히 하나의 스토어를 다른 스토언 내에서 가져오고 _사용함으로써_ 스토어를 암시적으로 중첩시킬 수 있지만, Pinia는 디자인적으로 평면적 구조를 제공하면서도 스토어 간의 교차 구성 방식을 여전히 가능하게 합니다. **심지어 스토어의 순환 의존성도 가질 수 있습니다**.
- _네임스페이스화된 모듈_이 없습니다. 스토어의 평면 아키텍처를 감안할 때, "네임스페이싱" 스토어는 스토어가 정의되는 방식에 내재되어 있으며, 모든 스토어가 네임스페이스화되었다고 볼 수 있습니다.

기존의 Vuex ≤4 프로젝트를 Pinia를 사용하도록 변환하는 방법에 대한 자세한 지침은 [Vuex에서 마이그레이션 가이드](./cookbook/migration-vuex.md)를 참조하십시오.
