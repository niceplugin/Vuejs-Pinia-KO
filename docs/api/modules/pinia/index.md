# Module: pinia

## Enumerations

- [MutationType](enums/MutationType.md)

## Interfaces

- [DefineSetupStoreOptions](/api/modules/pinia/interfaces/DefineSetupStoreOptions.md)
- [DefineStoreOptions](/api/modules/pinia/interfaces/DefineStoreOptions.md)
- [DefineStoreOptionsBase](/api/modules/pinia/interfaces/DefineStoreOptionsBase.md)
- [DefineStoreOptionsInPlugin](/api/modules/pinia/interfaces/DefineStoreOptionsInPlugin.md)
- [MapStoresCustomization](/api/modules/pinia/interfaces/MapStoresCustomization.md)
- [Pinia](/api/modules/pinia/interfaces/Pinia.md)
- [PiniaCustomProperties](/api/modules/pinia/interfaces/PiniaCustomProperties.md)
- [PiniaCustomStateProperties](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)
- [PiniaPlugin](/api/modules/pinia/interfaces/PiniaPlugin.md)
- [PiniaPluginContext](/api/modules/pinia/interfaces/PiniaPluginContext.md)
- [StoreDefinition](/api/modules/pinia/interfaces/StoreDefinition.md)
- [StoreProperties](/api/modules/pinia/interfaces/StoreProperties.md)
- [SubscriptionCallbackMutationDirect](/api/modules/pinia/interfaces/SubscriptionCallbackMutationDirect.md)
- [SubscriptionCallbackMutationPatchFunction](/api/modules/pinia/interfaces/SubscriptionCallbackMutationPatchFunction.md)
- [SubscriptionCallbackMutationPatchObject](/api/modules/pinia/interfaces/SubscriptionCallbackMutationPatchObject.md)
- [\_StoreOnActionListenerContext](/api/modules/pinia/interfaces/_StoreOnActionListenerContext.md)
- [\_StoreWithState](/api/modules/pinia/interfaces/_StoreWithState.md)
- [\_SubscriptionCallbackMutationBase](/api/modules/pinia/interfaces/_SubscriptionCallbackMutationBase.md)

## Type Aliases

### PiniaStorePlugin

Ƭ **PiniaStorePlugin**: [`PiniaPlugin`](/api/modules/pinia/interfaces/PiniaPlugin.md)

Plugin to extend every store.

**`Deprecated`**

use PiniaPlugin instead

___

### StateTree

Ƭ **StateTree**: `Record`<`string` \| `number` \| `symbol`, `any`\>

Generic state of a Store

___

### Store

Ƭ **Store**<`Id`, `S`, `G`, `A`\>: [`_StoreWithState`](/api/modules/pinia/interfaces/_StoreWithState.md)<`Id`, `S`, `G`, `A`\> & `UnwrapRef`<`S`\> & [`_StoreWithGetters`](index.md#_storewithgetters)<`G`\> & [`_ActionsTree`](index.md#_actionstree) extends `A` ? {} : `A` & [`PiniaCustomProperties`](/api/modules/pinia/interfaces/PiniaCustomProperties.md)<`Id`, `S`, `G`, `A`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<`S`\>

Store type to build a store.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](index.md#statetree) = {} |
| `G` | {} |
| `A` | {} |

___

### StoreActions

Ƭ **StoreActions**<`SS`\>: `SS` extends [`Store`](index.md#store)<`string`, [`StateTree`](index.md#statetree), [`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>, infer A\> ? `A` : [`_ExtractActionsFromSetupStore`](index.md#_extractactionsfromsetupstore)<`SS`\>

Extract the actions of a store type. Works with both a Setup Store or an
Options Store.

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### StoreGeneric

Ƭ **StoreGeneric**: [`Store`](index.md#store)<`string`, [`StateTree`](index.md#statetree), [`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>, [`_ActionsTree`](index.md#_actionstree)\>

Generic and type-unsafe version of Store. Doesn't fail on access with
strings, making it much easier to write generic functions that do not care
about the kind of store that is passed.

___

### StoreGetters

Ƭ **StoreGetters**<`SS`\>: `SS` extends [`Store`](index.md#store)<`string`, [`StateTree`](index.md#statetree), infer G, [`_ActionsTree`](index.md#_actionstree)\> ? [`_StoreWithGetters`](index.md#_storewithgetters)<`G`\> : [`_ExtractGettersFromSetupStore`](index.md#_extractgettersfromsetupstore)<`SS`\>

Extract the getters of a store type. Works with both a Setup Store or an
Options Store.

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### StoreOnActionListener

Ƭ **StoreOnActionListener**<`Id`, `S`, `G`, `A`\>: (`context`: [`StoreOnActionListenerContext`](index.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](index.md#_actionstree) : `A`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | `G` |
| `A` | `A` |

#### Type declaration

▸ (`context`): `void`

Argument of `store.$onAction()`

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`StoreOnActionListenerContext`](index.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](index.md#_actionstree) : `A`\> |

##### Returns

`void`

___

### StoreOnActionListenerContext

Ƭ **StoreOnActionListenerContext**<`Id`, `S`, `G`, `A`\>: [`_ActionsTree`](index.md#_actionstree) extends `A` ? [`_StoreOnActionListenerContext`](/api/modules/pinia/interfaces/_StoreOnActionListenerContext.md)<[`StoreGeneric`](index.md#storegeneric), `string`, [`_ActionsTree`](index.md#_actionstree)\> : { [Name in keyof A]: Name extends string ? \_StoreOnActionListenerContext<Store<Id, S, G, A\>, Name, A\> : never }[keyof `A`]

Context object passed to callbacks of `store.$onAction(context => {})`
TODO: should have only the Id, the Store and Actions to generate the proper object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | `G` |
| `A` | `A` |

___

### StoreState

Ƭ **StoreState**<`SS`\>: `SS` extends [`Store`](index.md#store)<`string`, infer S, [`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>, [`_ActionsTree`](index.md#_actionstree)\> ? `UnwrapRef`<`S`\> : [`_ExtractStateFromSetupStore`](index.md#_extractstatefromsetupstore)<`SS`\>

Extract the state of a store type. Works with both a Setup Store or an
Options Store. Note this unwraps refs.

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### SubscriptionCallback

Ƭ **SubscriptionCallback**<`S`\>: (`mutation`: [`SubscriptionCallbackMutation`](index.md#subscriptioncallbackmutation)<`S`\>, `state`: `UnwrapRef`<`S`\>) => `void`

#### Type parameters

| Name |
| :------ |
| `S` |

#### Type declaration

▸ (`mutation`, `state`): `void`

Callback of a subscription

##### Parameters

| Name | Type |
| :------ | :------ |
| `mutation` | [`SubscriptionCallbackMutation`](index.md#subscriptioncallbackmutation)<`S`\> |
| `state` | `UnwrapRef`<`S`\> |

##### Returns

`void`

___

### SubscriptionCallbackMutation

Ƭ **SubscriptionCallbackMutation**<`S`\>: [`SubscriptionCallbackMutationDirect`](/api/modules/pinia/interfaces/SubscriptionCallbackMutationDirect.md) \| [`SubscriptionCallbackMutationPatchObject`](/api/modules/pinia/interfaces/SubscriptionCallbackMutationPatchObject.md)<`S`\> \| [`SubscriptionCallbackMutationPatchFunction`](/api/modules/pinia/interfaces/SubscriptionCallbackMutationPatchFunction.md)

Context object passed to a subscription callback.

#### Type parameters

| Name |
| :------ |
| `S` |

___

### \_ActionsTree

Ƭ **\_ActionsTree**: `Record`<`string`, [`_Method`](index.md#_method)\>

Type of an object of Actions. For internal usage only.
For internal use **only**

___

### \_Awaited

Ƭ **\_Awaited**<`T`\>: `T` extends ``null`` \| `undefined` ? `T` : `T` extends `object` & { `then`: (`onfulfilled`: `F`) => `any`  } ? `F` extends (`value`: infer V, ...`args`: `any`) => `any` ? [`_Awaited`](index.md#_awaited)<`V`\> : `never` : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

___

### \_DeepPartial

Ƭ **\_DeepPartial**<`T`\>: { [K in keyof T]?: \_DeepPartial<T[K]\> }

Recursive `Partial<T>`. Used by [['$patch']](index.md#store).

For internal use **only**

#### Type parameters

| Name |
| :------ |
| `T` |

___

### \_ExtractActionsFromSetupStore

Ƭ **\_ExtractActionsFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractActionsFromSetupStore_Keys`](index.md#_extractactionsfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractActionsFromSetupStore_Keys`](index.md#_extractactionsfromsetupstore_keys)<`SS`\>\> : `never`

For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### \_ExtractActionsFromSetupStore\_Keys

Ƭ **\_ExtractActionsFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method ? K : never]: any }

Type that enables refactoring through IDE.
For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### \_ExtractGettersFromSetupStore

Ƭ **\_ExtractGettersFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractGettersFromSetupStore_Keys`](index.md#_extractgettersfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractGettersFromSetupStore_Keys`](index.md#_extractgettersfromsetupstore_keys)<`SS`\>\> : `never`

For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### \_ExtractGettersFromSetupStore\_Keys

Ƭ **\_ExtractGettersFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends ComputedRef ? K : never]: any }

Type that enables refactoring through IDE.
For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### \_ExtractStateFromSetupStore

Ƭ **\_ExtractStateFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractStateFromSetupStore_Keys`](index.md#_extractstatefromsetupstore_keys)<`SS`\> extends keyof `SS` ? [`_UnwrapAll`](index.md#_unwrapall)<`Pick`<`SS`, [`_ExtractStateFromSetupStore_Keys`](index.md#_extractstatefromsetupstore_keys)<`SS`\>\>\> : `never`

For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### \_ExtractStateFromSetupStore\_Keys

Ƭ **\_ExtractStateFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method \| ComputedRef ? never : K]: any }

Type that enables refactoring through IDE.
For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

___

### \_GettersTree

Ƭ **\_GettersTree**<`S`\>: `Record`<`string`, (`state`: `UnwrapRef`<`S`\> & `UnwrapRef`<[`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<`S`\>\>) => `any` \| () => `any`\>

Type of an object of Getters that infers the argument. For internal usage only.
For internal use **only**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](index.md#statetree) |

___

### \_MapActionsObjectReturn

Ƭ **\_MapActionsObjectReturn**<`A`, `T`\>: { [key in keyof T]: A[T[key]] }

For internal use **only**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `A`\> |

___

### \_MapActionsReturn

Ƭ **\_MapActionsReturn**<`A`\>: { [key in keyof A]: A[key] }

For internal use **only**

#### Type parameters

| Name |
| :------ |
| `A` |

___

### \_MapStateObjectReturn

Ƭ **\_MapStateObjectReturn**<`Id`, `S`, `G`, `A`, `T`\>: { [key in keyof T]: Function }

For internal use **only**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> = {} |

___

### \_MapStateReturn

Ƭ **\_MapStateReturn**<`S`, `G`, `Keys`\>: { [key in Keys]: Function }

For internal use **only**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `Keys` | extends keyof `S` \| keyof `G` = keyof `S` \| keyof `G` |

___

### \_MapWritableStateObjectReturn

Ƭ **\_MapWritableStateObjectReturn**<`S`, `T`\>: { [key in keyof T]: Object }

For internal use **only**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](index.md#statetree) |
| `T` | extends `Record`<`string`, keyof `S`\> |

___

### \_MapWritableStateReturn

Ƭ **\_MapWritableStateReturn**<`S`\>: { [key in keyof S]: Object }

For internal use **only**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](index.md#statetree) |

___

### \_Method

Ƭ **\_Method**: (...`args`: `any`[]) => `any`

#### Type declaration

▸ (...`args`): `any`

Generic type for a function that can infer arguments and return type

For internal use **only**

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

___

### \_Spread

Ƭ **\_Spread**<`A`\>: `A` extends [infer L, ...(infer R)] ? [`_StoreObject`](index.md#_storeobject)<`L`\> & [`_Spread`](index.md#_spread)<`R`\> : `unknown`

For internal use **only**.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `any`[] |

___

### \_StoreObject

Ƭ **\_StoreObject**<`S`\>: `S` extends [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<infer Ids, infer State, infer Getters, infer Actions\> ? { [Id in \`${Ids}${MapStoresCustomization extends Record<"suffix", string\> ? MapStoresCustomization["suffix"] : "Store"}\`]: Function } : {}

For internal use **only**.

#### Type parameters

| Name |
| :------ |
| `S` |

___

### \_StoreWithActions

Ƭ **\_StoreWithActions**<`A`\>: { [k in keyof A]: A[k] extends Function ? Function : never }

Store augmented for actions. For internal usage only.
For internal use **only**

#### Type parameters

| Name |
| :------ |
| `A` |

___

### \_StoreWithGetters

Ƭ **\_StoreWithGetters**<`G`\>: { readonly [k in keyof G]: G[k] extends Function ? R : UnwrapRef<G[k]\> }

Store augmented with getters. For internal usage only.
For internal use **only**

#### Type parameters

| Name |
| :------ |
| `G` |

___

### \_UnwrapAll

Ƭ **\_UnwrapAll**<`SS`\>: { [K in keyof SS]: UnwrapRef<SS[K]\> }

Type that enables refactoring through IDE.
For internal use **only**

#### Type parameters

| Name |
| :------ |
| `SS` |

## Variables

### PiniaVuePlugin

• `Const` **PiniaVuePlugin**: `Plugin`

Vue 2 Plugin that must be installed for pinia to work. Note **you don't need
this plugin if you are using Nuxt.js**. Use the `buildModule` instead:
https://pinia.vuejs.org/ssr/nuxt.html.

**`Example`**

```js
import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // ...
  pinia,
})
```

**`Param`**

`Vue` imported from 'vue'.

## Functions

### acceptHMRUpdate

▸ **acceptHMRUpdate**(`initialUseStore`, `hot`): (`newModule`: `any`) => `any`

Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.

**`Example`**

```js
const useUser = defineStore(...)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialUseStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`string`, [`StateTree`](index.md#statetree), [`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>, [`_ActionsTree`](index.md#_actionstree)\> | return of the defineStore to hot update |
| `hot` | `any` | `import.meta.hot` |

#### Returns

`fn`

▸ (`newModule`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `newModule` | `any` |

##### Returns

`any`

___

### createPinia

▸ **createPinia**(): [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

Creates a Pinia instance to be used by the application

#### Returns

[`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

___

### defineStore

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`id`, `options`): [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Creates a `useStore` function that retrieves the store instance

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) = {} |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Id` | id of the store (must be unique) |
| `options` | `Omit`<[`DefineStoreOptions`](/api/modules/pinia/interfaces/DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"``\> | options to define the store |

#### Returns

[`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`options`): [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Creates a `useStore` function that retrieves the store instance

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) = {} |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DefineStoreOptions`](/api/modules/pinia/interfaces/DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\> | options to define the store |

#### Returns

[`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `SS`\>(`id`, `storeSetup`, `options?`): [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](index.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](index.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](index.md#_extractactionsfromsetupstore)<`SS`\>\>

Creates a `useStore` function that retrieves the store instance

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `SS` | `SS` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Id` | id of the store (must be unique) |
| `storeSetup` | () => `SS` | function that defines the store |
| `options?` | [`DefineSetupStoreOptions`](/api/modules/pinia/interfaces/DefineSetupStoreOptions.md)<`Id`, [`_ExtractStateFromSetupStore`](index.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](index.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](index.md#_extractactionsfromsetupstore)<`SS`\>\> | extra options |

#### Returns

[`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](index.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](index.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](index.md#_extractactionsfromsetupstore)<`SS`\>\>

___

### getActivePinia

▸ **getActivePinia**(): `undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

Get the currently active pinia if there is any.

#### Returns

`undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

___

### mapActions

▸ **mapActions**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapActionsObjectReturn`](index.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `A`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object to define new names for the actions |

#### Returns

[`_MapActionsObjectReturn`](index.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

▸ **mapActions**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapActionsReturn`](index.md#_mapactionsreturn)<`A`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | keyof `A`[] | array of action names to map |

#### Returns

[`_MapActionsReturn`](index.md#_mapactionsreturn)<`A`\>

___

### mapGetters

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](index.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object of state properties or getters |

#### Returns

[`_MapStateObjectReturn`](index.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](index.md#_mapstatereturn)<`S`, `G`, `Keys`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | readonly `Keys`[] | array of state properties or getters |

#### Returns

[`_MapStateReturn`](index.md#_mapstatereturn)<`S`, `G`, `Keys`\>

___

### mapState

▸ **mapState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](index.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object of state properties or getters |

#### Returns

[`_MapStateObjectReturn`](index.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

▸ **mapState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](index.md#_mapstatereturn)<`S`, `G`, `Keys`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | readonly `Keys`[] | array of state properties or getters |

#### Returns

[`_MapStateReturn`](index.md#_mapstatereturn)<`S`, `G`, `Keys`\>

___

### mapStores

▸ **mapStores**<`Stores`\>(...`stores`): [`_Spread`](index.md#_spread)<`Stores`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Stores` | extends `any`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...stores` | [...Stores[]] | list of stores to map to an object |

#### Returns

[`_Spread`](index.md#_spread)<`Stores`\>

___

### mapWritableState

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapWritableStateObjectReturn`](index.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

Same as `mapState()` but creates computed setters as well so the state can be
modified. Differently from `mapState()`, only `state` properties can be
added.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extends `Record`<`string`, keyof `S`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keyMapper` | `KeyMapper` | object of state properties |

#### Returns

[`_MapWritableStateObjectReturn`](index.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

▸ **mapWritableState**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapWritableStateReturn`](index.md#_mapwritablestatereturn)<`S`\>

Allows using state and getters from one store without using the composition
API (`setup()`) by generating an object to be spread in the `computed` field
of a component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](index.md#statetree) |
| `G` | extends [`_GettersTree`](index.md#_getterstree)<`S`\> |
| `A` | `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | store to map from |
| `keys` | keyof `S`[] | array of state properties |

#### Returns

[`_MapWritableStateReturn`](index.md#_mapwritablestatereturn)<`S`\>

___

### setActivePinia

▸ **setActivePinia**(`pinia`): `undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

Sets or unsets the active pinia. Used in SSR and internally when calling
actions and getters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pinia` | `undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md) | Pinia instance |

#### Returns

`undefined` \| [`Pinia`](/api/modules/pinia/interfaces/Pinia.md)

___

### setMapStoreSuffix

▸ **setMapStoreSuffix**(`suffix`): `void`

Changes the suffix added by `mapStores()`. Can be set to an empty string.
Defaults to `"Store"`. Make sure to extend the MapStoresCustomization
interface if you are using TypeScript.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suffix` | `string` | new suffix |

#### Returns

`void`

___

### skipHydrate

▸ **skipHydrate**<`T`\>(`obj`): `T`

Tells Pinia to skip the hydration process of a given object. This is useful in setup stores (only) when you return a
stateful object in the store but it isn't really state. e.g. returning a router instance in a setup store.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `T` | target object |

#### Returns

`T`

obj

___

### storeToRefs

▸ **storeToRefs**<`SS`\>(`store`): `ToRefs`<[`StoreState`](index.md#storestate)<`SS`\> & [`StoreGetters`](index.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<[`StoreState`](index.md#storestate)<`SS`\>\>\>

Creates an object of references with all the state, getters, and plugin-added
state properties of the store. Similar to `toRefs()` but specifically
designed for Pinia stores so methods and non reactive properties are
completely ignored.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SS` | extends [`_StoreWithState`](/api/modules/pinia/interfaces/_StoreWithState.md)<`string`, [`StateTree`](index.md#statetree), [`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>, [`_ActionsTree`](index.md#_actionstree), `SS`\> & [`StateTree`](index.md#statetree) & [`_StoreWithGetters`](index.md#_storewithgetters)<[`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>\> & [`PiniaCustomProperties`](/api/modules/pinia/interfaces/PiniaCustomProperties.md)<`string`, [`StateTree`](index.md#statetree), [`_GettersTree`](index.md#_getterstree)<[`StateTree`](index.md#statetree)\>, [`_ActionsTree`](index.md#_actionstree), `SS`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<[`StateTree`](index.md#statetree), `SS`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | `SS` | store to extract the refs from |

#### Returns

`ToRefs`<[`StoreState`](index.md#storestate)<`SS`\> & [`StoreGetters`](index.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<[`StoreState`](index.md#storestate)<`SS`\>\>\>