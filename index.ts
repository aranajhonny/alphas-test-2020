import { state, root } from 'membrane';

state.nextKey = state.nextKey ?? 1;
state.items = state.items ?? {};

export const Root = {
  put: ({ args: { node, name }}) => {
    let key;
    if (name != undefined) {
      key = name;
    } else {
       do {
         key = `node${state.nextKey++}`;
       } while (state.items[key] !== undefined);
    }
    state.items[key] = node;
    return key;
  },
  remove: ({ args: { name }}) => {
    delete state.items[name];
  },
  one: ({ args: { name }}) => state.items[name],
  page: () => {
    return {
      items: Object.entries(state.items).map(([name, node]) => ({ gref: root.one({ name }), name, node })),
      // TODO: paginate
      next: null
    }
  }
}
