---
editLink: false
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / SetupStoreDefinition

# Interface: SetupStoreDefinition\<Id, SS\>

[pinia](../modules/pinia.md).SetupStoreDefinition

Return type of `defineStore()` with a setup function.
- `Id` is a string literal of the store's name
- `SS` is the return type of the setup function

**`See`**

[StoreDefinition](pinia.StoreDefinition.md)

## Type parameters

| Name | Type |
| :------ | :------ |
| `Id` | extends `string` |
| `SS` | `SS` |

## Hierarchy

- [`StoreDefinition`](pinia.StoreDefinition.md)\<`Id`, [`_ExtractStateFromSetupStore`](../modules/pinia.md#_ExtractStateFromSetupStore)\<`SS`\>, [`_ExtractGettersFromSetupStore`](../modules/pinia.md#_ExtractGettersFromSetupStore)\<`SS`\>, [`_ExtractActionsFromSetupStore`](../modules/pinia.md#_ExtractActionsFromSetupStore)\<`SS`\>\>

  ↳ **`SetupStoreDefinition`**

## Callable

### SetupStoreDefinition

▸ **SetupStoreDefinition**(`pinia?`, `hot?`): [`Store`](../modules/pinia.md#Store)\<`Id`, [`_ExtractStateFromSetupStore`](../modules/pinia.md#_ExtractStateFromSetupStore)\<`SS`\>, [`_ExtractGettersFromSetupStore`](../modules/pinia.md#_ExtractGettersFromSetupStore)\<`SS`\>, [`_ExtractActionsFromSetupStore`](../modules/pinia.md#_ExtractActionsFromSetupStore)\<`SS`\>\>

Returns a store, creates it if necessary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pinia?` | ``null`` \| [`Pinia`](pinia.Pinia.md) | Pinia instance to retrieve the store |
| `hot?` | [`StoreGeneric`](../modules/pinia.md#StoreGeneric) | dev only hot module replacement |

#### Returns

[`Store`](../modules/pinia.md#Store)\<`Id`, [`_ExtractStateFromSetupStore`](../modules/pinia.md#_ExtractStateFromSetupStore)\<`SS`\>, [`_ExtractGettersFromSetupStore`](../modules/pinia.md#_ExtractGettersFromSetupStore)\<`SS`\>, [`_ExtractActionsFromSetupStore`](../modules/pinia.md#_ExtractActionsFromSetupStore)\<`SS`\>\>

## Properties

### $id

• **$id**: `Id`

Id of the store. Used by map helpers.

#### Inherited from

[StoreDefinition](pinia.StoreDefinition.md).[$id](pinia.StoreDefinition.md#$id)
