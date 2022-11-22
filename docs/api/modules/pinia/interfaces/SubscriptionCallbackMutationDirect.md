# Interface: SubscriptionCallbackMutationDirect

Context passed to a subscription callback when directly mutating the state of
a store with `store.someState = newValue` or `store.$state.someState =
newValue`.

## Hierarchy

- [`_SubscriptionCallbackMutationBase`](_SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationDirect`**

## Properties

### events

• **events**: `DebuggerEvent`

🔴 DEV ONLY, DO NOT use for production code. Different mutation calls. Comes from
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging and allows to track mutations in
devtools and plugins **during development only**.

#### Overrides

[_SubscriptionCallbackMutationBase](_SubscriptionCallbackMutationBase.md).[events](_SubscriptionCallbackMutationBase.md#events)

___

### storeId

• **storeId**: `string`

`id` of the store doing the mutation.

#### Inherited from

[_SubscriptionCallbackMutationBase](_SubscriptionCallbackMutationBase.md).[storeId](_SubscriptionCallbackMutationBase.md#storeid)

___

### type

• **type**: [`direct`](../enums/MutationType.md#direct)

Type of the mutation.

#### Overrides

[_SubscriptionCallbackMutationBase](_SubscriptionCallbackMutationBase.md).[type](_SubscriptionCallbackMutationBase.md#type)
