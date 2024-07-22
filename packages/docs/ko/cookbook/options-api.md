# `setup()` 없이 사용하기 %{#usage-without-setup}%

Pinia는 Composition API를 사용하지 않더라도 사용할 수 있습니다(만약 Vue <2.7을 사용 중이라면, `@vue/composition-api` 플러그인을 설치해야 합니다). Composition API를 시도하고 배우는 것을 권장하지만, 아직 귀하와 귀하의 팀에게 적절한 시기가 아닐 수도 있고, 애플리케이션을 마이그레이션하는 과정 중이거나 다른 이유가 있을 수 있습니다. 다음은 제공되는 몇 개의 함수입니다:

- [mapStores](#giving-access-to-the-whole-store)
- [mapState](../core-concepts/state.md#usage-with-the-options-api)
- [mapWritableState](../core-concepts/state.md#modifiable-state)
- ⚠️ [mapGetters](../core-concepts/getters.md#without-setup) (마이그레이션 편의를 위해 제공되지만, `mapState()` 사용을 추천합니다)
- [mapActions](../core-concepts/actions.md#without-setup)

## 전체 Store에 대한 접근 권한 부여 %{#giving-access-to-the-whole-store}%

Store의 거의 모든 항목에 접근해야 한다면, Store의 모든 프로퍼티를 매핑하는 것은 너무 번거로울 수 있습니다. 대신 `mapStores()`를 사용하여 전체 Store에 접근할 수 있습니다:

```js
import { mapStores } from 'pinia'

// 다음과 같은 id를 가진 두 개의 Store가 주어진 경우.
const useUserStore = defineStore('user', {
  // ...
})
const useCartStore = defineStore('cart', {
  // ...
})

export default {
  computed: {
    // 배열을 전달하는 것이 아니라, Store를 하나씩 전달하고 있다는 점을 유의하세요.
    // 각 Store는 id + 'Store' 형식으로 접근할 수 있습니다.
    ...mapStores(useCartStore, useUserStore)
  },

  methods: {
    async buyStuff() {
      // 어디서나 사용할 수 있습니다!
      if (this.userStore.isAuthenticated()) {
        await this.cartStore.buy()
        this.$router.push('/purchased')
      }
    },
  },
}
```

기본적으로 Pinia는 각 Store의 `id` 뒤에 `"Store"` 접미사를 추가합니다. `setMapStoreSuffix()`를 호출하여 이 동작을 사용자 정의할 수 있습니다:

```js
import { createPinia, setMapStoreSuffix } from 'pinia'

// 접미사를 완전히 제거: this.user, this.cart
setMapStoreSuffix('')
// 사용자 정의 접미사: this.user_store, this.cart_store
setMapStoreSuffix('_store')
export const pinia = createPinia()
```

## TypeScript %{#typescript}%

기본적으로 모든 맵 헬퍼는 자동 완성을 지원하므로 아무것도 할 필요가 없습니다. `"Store"` 접미사를 변경하기 위해 `setMapStoreSuffix()`를 호출하는 경우, TS 파일이나 `global.d.ts` 파일의 어딘가에 추가해야 합니다. 가장 편리한 위치는 `setMapStoreSuffix()`를 호출하는 곳과 동일한 위치일 것입니다:

```ts
import { createPinia, setMapStoreSuffix } from 'pinia'

setMapStoreSuffix('') // 접미사를 완전히 제거.
export const pinia = createPinia()

declare module 'pinia' {
  export interface MapStoresCustomization {
    // 위와 같은 값으로 설정.
    suffix: ''
  }
}
```

:::warning
TypeScript 선언 파일(`global.d.ts`와 같은)을 사용하는 경우, 파일 상단에 `import 'pinia'`를 추가하여 모든 기존 타입을 노출해야 합니다.
:::
