import { root, nodes, state } from "membrane";
const { sys_user } = nodes;

export const Root = {
  configure: async ({ args }) =>
    await sys_user.configureEmail({ ...args }).$invoke(),

  handleEmail: async ({ args: { message } }) => {
    await root.received.$emit({ message });
  },

  send: async ({ self, args }) => {
    await sys_user.email.tell({ ...args }).$invoke();
  },
};

// pruebas
