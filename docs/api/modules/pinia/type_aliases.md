# Type Aliases

## PiniaStorePlugin

Ƭ **PiniaStorePlugin**: [`PiniaPlugin`](/api/modules/pinia/interfaces/PiniaPlugin.md)

Plugin to extend every store.

**`Deprecated`**

use PiniaPlugin instead

___

## StateTree

Ƭ **StateTree**: `Record`<`string` \| `number` \| `symbol`, `any`\>

Generic state of a Store

___

## Store

Ƭ **Store**<`Id`, `S`, `G`, `A`\>: [`_StoreWithState`](/api/modules/pinia/interfaces/_StoreWithState.md)<`Id`, `S`, `G`, `A`\> & `UnwrapRef`<`S`\> & [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> & [`_ActionsTree`](pinia.md#_actionstree) extends `A` ? {} : `A` & [`PiniaCustomProperties`](/api/modules/pinia/interfaces/PiniaCustomProperties.md)<`Id`, `S`, `G`, `A`\> & [`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<`S`\>

Store type to build a store.

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` = `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) = {} |
| `G` | {} |
| `A` | {} |

___

## StoreActions

Ƭ **StoreActions**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, infer A\> ? `A` : [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>

Extract the actions of a store type. Works with both a Setup Store or an
Options Store.

### Type parameters

| Name |
| :------ |
| `SS` |

___

## StoreGeneric

Ƭ **StoreGeneric**: [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\>

Generic and type-unsafe version of Store. Doesn't fail on access with
strings, making it much easier to write generic functions that do not care
about the kind of store that is passed.

___

## StoreGetters

Ƭ **StoreGetters**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), infer G, [`_ActionsTree`](pinia.md#_actionstree)\> ? [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> : [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>

Extract the getters of a store type. Works with both a Setup Store or an
Options Store.

### Type parameters

| Name |
| :------ |
| `SS` |

___

## StoreOnActionListener

Ƭ **StoreOnActionListener**<`Id`, `S`, `G`, `A`\>: (`context`: [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\>) => `void`

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

### Type declaration

▸ (`context`): `void`

Argument of `store.$onAction()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extends `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\> |

#### Returns

`void`

___

## StoreOnActionListenerContext

Ƭ **StoreOnActionListenerContext**<`Id`, `S`, `G`, `A`\>: [`_ActionsTree`](pinia.md#_actionstree) extends `A` ? [`_StoreOnActionListenerContext`](/api/modules/pinia/interfaces/_StoreOnActionListenerContext.md)<[`StoreGeneric`](pinia.md#storegeneric), `string`, [`_ActionsTree`](pinia.md#_actionstree)\> : { [Name in keyof A]: Name extends string ? \_StoreOnActionListenerContext<Store<Id, S, G, A\>, Name, A\> : never }[keyof `A`]

Context object passed to callbacks of `store.$onAction(context => {})`
TODO: should have only the Id, the Store and Actions to generate the proper object

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

___

## StoreState

Ƭ **StoreState**<`SS`\>: `SS` extends [`Store`](pinia.md#store)<`string`, infer S, [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> ? `UnwrapRef`<`S`\> : [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>

Extract the state of a store type. Works with both a Setup Store or an
Options Store. Note this unwraps refs.

### Type parameters

| Name |
| :------ |
| `SS` |

___

## SubscriptionCallback

Ƭ **SubscriptionCallback**<`S`\>: (`mutation`: [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\>, `state`: `UnwrapRef`<`S`\>) => `void`

### Type parameters

| Name |
| :------ |
| `S` |

### Type declaration

▸ (`mutation`, `state`): `void`

Callback of a subscription

#### Parameters

| Name | Type |
| :------ | :------ |
| `mutation` | [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\> |
| `state` | `UnwrapRef`<`S`\> |

#### Returns

`void`

___

## SubscriptionCallbackMutation

Ƭ **SubscriptionCallbackMutation**<`S`\>: [`SubscriptionCallbackMutationDirect`](/api/modules/pinia/interfaces/SubscriptionCallbackMutationDirect.md) \| [`SubscriptionCallbackMutationPatchObject`](/api/modules/pinia/interfaces/SubscriptionCallbackMutationPatchObject.md)<`S`\> \| [`SubscriptionCallbackMutationPatchFunction`](/api/modules/pinia/interfaces/SubscriptionCallbackMutationPatchFunction.md)

Context object passed to a subscription callback.

### Type parameters

| Name |
| :------ |
| `S` |

___

## \_ActionsTree

Ƭ **\_ActionsTree**: `Record`<`string`, [`_Method`](pinia.md#_method)\>

Type of an object of Actions. For internal usage only.
For internal use **only**

___

## \_Awaited

Ƭ **\_Awaited**<`T`\>: `T` extends ``null`` \| `undefined` ? `T` : `T` extends `object` & { `then`: (`onfulfilled`: `F`) => `any`  } ? `F` extends (`value`: infer V, ...`args`: `any`) => `any` ? [`_Awaited`](pinia.md#_awaited)<`V`\> : `never` : `T`

### Type parameters

| Name |
| :------ |
| `T` |

___

## \_DeepPartial

Ƭ **\_DeepPartial**<`T`\>: { [K in keyof T]?: \_DeepPartial<T[K]\> }

Recursive `Partial<T>`. Used by [['$patch']](pinia.md#store).

For internal use **only**

### Type parameters

| Name |
| :------ |
| `T` |

___

## \_ExtractActionsFromSetupStore

Ƭ **\_ExtractActionsFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\>\> : `never`

For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |

___

## \_ExtractActionsFromSetupStore\_Keys

Ƭ **\_ExtractActionsFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method ? K : never]: any }

Type that enables refactoring through IDE.
For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |

___

## \_ExtractGettersFromSetupStore

Ƭ **\_ExtractGettersFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\> extends keyof `SS` ? `Pick`<`SS`, [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\>\> : `never`

For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |

___

## \_ExtractGettersFromSetupStore\_Keys

Ƭ **\_ExtractGettersFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends ComputedRef ? K : never]: any }

Type that enables refactoring through IDE.
For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |

___

## \_ExtractStateFromSetupStore

Ƭ **\_ExtractStateFromSetupStore**<`SS`\>: `SS` extends `undefined` \| `void` ? {} : [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\> extends keyof `SS` ? [`_UnwrapAll`](pinia.md#_unwrapall)<`Pick`<`SS`, [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\>\>\> : `never`

For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |

___

## \_ExtractStateFromSetupStore\_Keys

Ƭ **\_ExtractStateFromSetupStore\_Keys**<`SS`\>: keyof { [K in keyof SS as SS[K] extends \_Method \| ComputedRef ? never : K]: any }

Type that enables refactoring through IDE.
For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |

___

## \_GettersTree

Ƭ **\_GettersTree**<`S`\>: `Record`<`string`, (`state`: `UnwrapRef`<`S`\> & `UnwrapRef`<[`PiniaCustomStateProperties`](/api/modules/pinia/interfaces/PiniaCustomStateProperties.md)<`S`\>\>) => `any` \| () => `any`\>

Type of an object of Getters that infers the argument. For internal usage only.
For internal use **only**

### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |

___

## \_MapActionsObjectReturn

Ƭ **\_MapActionsObjectReturn**<`A`, `T`\>: { [key in keyof T]: A[T[key]] }

For internal use **only**

### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `A`\> |

___

## \_MapActionsReturn

Ƭ **\_MapActionsReturn**<`A`\>: { [key in keyof A]: A[key] }

For internal use **only**

### Type parameters

| Name |
| :------ |
| `A` |

___

## \_MapStateObjectReturn

Ƭ **\_MapStateObjectReturn**<`Id`, `S`, `G`, `A`, `T`\>: { [key in keyof T]: Function }

For internal use **only**

### Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `T` | extends `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> = {} |

___

## \_MapStateReturn

Ƭ **\_MapStateReturn**<`S`, `G`, `Keys`\>: { [key in Keys]: Function }

For internal use **only**

### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `G` | extends [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `Keys` | extends keyof `S` \| keyof `G` = keyof `S` \| keyof `G` |

___

## \_MapWritableStateObjectReturn

Ƭ **\_MapWritableStateObjectReturn**<`S`, `T`\>: { [key in keyof T]: Object }

For internal use **only**

### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |
| `T` | extends `Record`<`string`, keyof `S`\> |

___

## \_MapWritableStateReturn

Ƭ **\_MapWritableStateReturn**<`S`\>: { [key in keyof S]: Object }

For internal use **only**

### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](pinia.md#statetree) |

___

## \_Method

Ƭ **\_Method**: (...`args`: `any`[]) => `any`

### Type declaration

▸ (...`args`): `any`

Generic type for a function that can infer arguments and return type

For internal use **only**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`any`

___

## \_Spread

Ƭ **\_Spread**<`A`\>: `A` extends [infer L, ...(infer R)] ? [`_StoreObject`](pinia.md#_storeobject)<`L`\> & [`_Spread`](pinia.md#_spread)<`R`\> : `unknown`

For internal use **only**.

### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `any`[] |

___

## \_StoreObject

Ƭ **\_StoreObject**<`S`\>: `S` extends [`StoreDefinition`](/api/modules/pinia/interfaces/StoreDefinition.md)<infer Ids, infer State, infer Getters, infer Actions\> ? { [Id in \`${Ids}${MapStoresCustomization extends Record<"suffix", string\> ? MapStoresCustomization["suffix"] : "Store"}\`]: Function } : {}

For internal use **only**.

### Type parameters

| Name |
| :------ |
| `S` |

___

## \_StoreWithActions

Ƭ **\_StoreWithActions**<`A`\>: { [k in keyof A]: A[k] extends Function ? Function : never }

Store augmented for actions. For internal usage only.
For internal use **only**

### Type parameters

| Name |
| :------ |
| `A` |

___

## \_StoreWithGetters

Ƭ **\_StoreWithGetters**<`G`\>: { readonly [k in keyof G]: G[k] extends Function ? R : UnwrapRef<G[k]\> }

Store augmented with getters. For internal usage only.
For internal use **only**

### Type parameters

| Name |
| :------ |
| `G` |

___

## \_UnwrapAll

Ƭ **\_UnwrapAll**<`SS`\>: { [K in keyof SS]: UnwrapRef<SS[K]\> }

Type that enables refactoring through IDE.
For internal use **only**

### Type parameters

| Name |
| :------ |
| `SS` |