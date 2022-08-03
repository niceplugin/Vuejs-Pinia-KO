---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / PiniaPlugin

# Interface: PiniaPlugin

[pinia](../modules/pinia.md).PiniaPlugin

## Callable

### PiniaPlugin

▸ **PiniaPlugin**(`context`): `void` \| `Partial`<[`PiniaCustomProperties`](PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> & [`PiniaCustomStateProperties`](PiniaCustomStateProperties.md)<[`StateTree`](../modules/pinia.md#statetree)\>\>

Plugin to extend every store. Returns an object to extend the store or
nothing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`PiniaPluginContext`](PiniaPluginContext.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> | Context |

#### Returns

`void` \| `Partial`<[`PiniaCustomProperties`](PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\> & [`PiniaCustomStateProperties`](PiniaCustomStateProperties.md)<[`StateTree`](../modules/pinia.md#statetree)\>\>
