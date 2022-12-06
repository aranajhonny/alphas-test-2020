import { nodes } from 'membrane';
const QUERY = '{ status headers body }';

export const Root = {
  get: ({ args }) => nodes.sys_http.get({ ...args }).$query(QUERY),
  post: ({ args }) => nodes.sys_http.post({ ...args }).$invoke(),
  put: ({ args }) => nodes.sys_http.put({ ...args }).$invoke(),
  patch: ({ args }) => nodes.sys_http.patch({ ...args }).$invoke(),
  'delete': ({ args }) => nodes.sys_http.delete({ ...args }).$invoke(),
}
