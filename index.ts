import { root, nodes, state } from "membrane";
const { sys_user } = nodes;

export const Root = {
  configure: async ({ args }) =>
    await sys_user.configureSms({ ...args }).$invoke(),

  handleSms: async ({ args: { message } }) => {
    await root.received.$emit({ message });
  },

  send: async ({ self, args }) => {
    await sys_user.sms.tell({ ...args }).$invoke();
  },
};

