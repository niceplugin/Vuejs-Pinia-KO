# Functions

## acceptHMRUpdate

▸ **acceptHMRUpdate**(`initialUseStore`, `hot`): (`newModule`: `any`) => `any`

Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.

**`Example`**

```js
const useUser = defineStore(...)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
```

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialUseStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> | return of the defineStore to hot update |
| `hot` | `any` | `import.meta.hot` |

### Returns

`fn`

▸ (`newModule`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newModule` | `any` |

#### Returns

`any`

___

## createPinia

▸ **createPinia**(): [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

Creates a Pinia instance to be used by the application

### Returns

[`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

___

## defineStore

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`id`, `options`): [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Creates a `useStore` function that retrieves the store instance

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Id` | id of the store (must be unique) |
| `options` | `Omit`<[`DefineStoreOptions`](/api/modules/pinia/interfaces/DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"``\> | options to define the store |

### Returns

[`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`options`): [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Creates a `useStore` function that retrieves the store instance

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DefineStoreOptions`](/api/modules/pinia/interfaces/DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\> | options to define the store |

### Returns

[`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `SS`\>(`id`, `storeSetup`, `options?`): [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

Creates a `useStore` function that retrieves the store instance

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `SS` | `SS` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Id` | id of the store (must be unique) |
| `storeSetup` | () => `SS` | function that defines the store |
| `options?` | [`DefineSetupStoreOptions`](/api/modules/pinia/interfaces/DefineSetupStoreOptions.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\> | extra options |

### Returns

[`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

___

## getActivePinia

▸ **getActivePinia**(): `undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

Get the currently active pinia if there is any.

### Returns

`undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

___

## mapActions

▸ **mapActions**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

Allows directly using actions from your store without using the composition
API (`setup()`) by generating an object to be spread in the `methods` field
of a component. The values of the object are the actions while the keys are
the names of the resulting methods.

**`Example`**

```js
export default {
  methods: {
    // other methods properties
    // useCounterStore has two actions named `increment` and `setCount`
    ...mapActions(useCounterStore, { moar: 'increment', setIt: 'setCount' })
  },

  created() {
    this.moar()
    this.setIt(2)
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `A`\> |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object to define new names for the actions |

### Returns

[`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

▸ **mapActions**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

Allows directly using actions from your store without using the composition
API (`setup()`) by generating an object to be spread in the `methods` field
of a component.

**`Example`**

```js
export default {
  methods: {
    // other methods properties
    ...mapActions(useCounterStore, ['increment', 'setCount'])
  },

  created() {
    this.increment()
    this.setCount(2) // pass arguments as usual
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | keyof `A`[] | array of action names to map |

### Returns

[`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

___

## mapGetters

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Allows using state and getters from one store without using the composition
API (`setup()`) by generating an object to be spread in the `computed` field
of a component. The values of the object are the state properties/getters
while the keys are the names of the resulting computed properties.
Optionally, you can also pass a custom function that will receive the store
as its first argument. Note that while it has access to the component
instance via `this`, it won't be typed.

**`Example`**

```js
export default {
  computed: {
    // other computed properties
    // useCounterStore has a state property named `count` and a getter `double`
    ...mapState(useCounterStore, {
      n: 'count',
      triple: store => store.n * 3,
      // note we can't use an arrow function if we want to use `this`
      custom(store) {
        return this.someComponentValue + store.n
      },
      doubleN: 'double'
    })
  },

  created() {
    this.n // 2
    this.doubleN // 4
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object of state properties or getters |

### Returns

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Allows using state and getters from one store without using the composition
API (`setup()`) by generating an object to be spread in the `computed` field
of a component.

**`Example`**

```js
export default {
  computed: {
    // other computed properties
    ...mapState(useCounterStore, ['count', 'double'])
  },

  created() {
    this.count // 2
    this.double // 4
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | readonly `Keys`[] | array of state properties or getters |

### Returns

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

___

## mapState

▸ **mapState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Allows using state and getters from one store without using the composition
API (`setup()`) by generating an object to be spread in the `computed` field
of a component. The values of the object are the state properties/getters
while the keys are the names of the resulting computed properties.
Optionally, you can also pass a custom function that will receive the store
as its first argument. Note that while it has access to the component
instance via `this`, it won't be typed.

**`Example`**

```js
export default {
  computed: {
    // other computed properties
    // useCounterStore has a state property named `count` and a getter `double`
    ...mapState(useCounterStore, {
      n: 'count',
      triple: store => store.n * 3,
      // note we can't use an arrow function if we want to use `this`
      custom(store) {
        return this.someComponentValue + store.n
      },
      doubleN: 'double'
    })
  },

  created() {
    this.n // 2
    this.doubleN // 4
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object of state properties or getters |

### Returns

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

▸ **mapState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Allows using state and getters from one store without using the composition
API (`setup()`) by generating an object to be spread in the `computed` field
of a component.

**`Example`**

```js
export default {
  computed: {
    // other computed properties
    ...mapState(useCounterStore, ['count', 'double'])
  },

  created() {
    this.count // 2
    this.double // 4
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | readonly `Keys`[] | array of state properties or getters |

### Returns

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

___

## mapStores

▸ **mapStores**<`Stores`\>(...`stores`): [`_Spread`](pinia.md#_spread)<`Stores`\>

Allows using stores without the composition API (`setup()`) by generating an
object to be spread in the `computed` field of a component. It accepts a list
of store definitions.

**`Example`**

```js
export default {
  computed: {
    // other computed properties
    ...mapStores(useUserStore, useCartStore)
  },

  created() {
    this.userStore // store with id "user"
    this.cartStore // store with id "cart"
  }
}
```

### Type parameters

| Name | Type |
| :------ | :------ |
| `Stores` | extends `any`[] |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...stores` | [...Stores[]] | list of stores to map to an object |

### Returns

[`_Spread`](pinia.md#_spread)<`Stores`\>

___

## mapWritableState

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

Same as `mapState()` but creates computed setters as well so the state can be
modified. Differently from `mapState()`, only `state` properties can be
added.

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S`\> |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object of state properties |

### Returns

[`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

▸ **mapWritableState**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapWritableStateReturn`](pinia.md#_mapwritablestatereturn)<`S`\>

Allows using state and getters from one store without using the composition
API (`setup()`) by generating an object to be spread in the `computed` field
of a component.

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | keyof `S`[] | array of state properties |

### Returns

[`_MapWritableStateReturn`](pinia.md#_mapwritablestatereturn)<`S`\>

___

## setActivePinia

▸ **setActivePinia**(`pinia`): `undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

Sets or unsets the active pinia. Used in SSR and internally when calling
actions and getters

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pinia` | `undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md) | Pinia instance |

### Returns

`undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

___

## setMapStoreSuffix

▸ **setMapStoreSuffix**(`suffix`): `void`

Changes the suffix added by `mapStores()`. Can be set to an empty string.
Defaults to `"Store"`. Make sure to extend the MapStoresCustomization
interface if you are using TypeScript.

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suffix` | `string` | new suffix |

### Returns

`void`

___

## skipHydrate

▸ **skipHydrate**<`T`\>(`obj`): `T`

Tells Pinia to skip the hydration process of a given object. This is useful in setup stores (only) when you return a
stateful object in the store but it isn't really state. e.g. returning a router instance in a setup store.

### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `T` | target object |

### Returns

`T`

obj

___

## storeToRefs

▸ **storeToRefs**<`SS`\>(`store`): `ToRefs`<[`StoreState`](pinia.md#storestate)<`SS`\> & [`StoreGetters`](pinia.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<[`StoreState`](pinia.md#storestate)<`SS`\>\>\>

Creates an object of references with all the state, getters, and plugin-added
state properties of the store. Similar to `toRefs()` but specifically
designed for Pinia stores so methods and non reactive properties are
completely ignored.

### Type parameters

| Name | Type |
| :------ | :------ |
| `SS` | extends [`_StoreWithState`](/api/modules/pinia/interfaces/_StoreWithState.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & [`StateTree`](pinia.md#statetree) & [`_StoreWithGetters`](pinia.md#_storewithgetters)<[`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>\> & [`PiniaCustomProperties`](/api/modules/pinia/interfaces/PiniaCustomProperties.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<[`StateTree`](pinia.md#statetree), `SS`\> |

### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | `SS` | store to extract the refs from |

### Returns

`ToRefs`<[`StoreState`](pinia.md#storestate)<`SS`\> & [`StoreGetters`](pinia.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<[`StoreState`](pinia.md#storestate)<`SS`\>\>\>