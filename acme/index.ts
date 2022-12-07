// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persist across program updates. Store data here.
import { nodes, root, state } from "membrane";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}

export const Root = {
  getAllTask: async ({ args }) => {
    const resource = await nodes.http
      .get({ url: `http://100.26.212.185:3000/todos` })
      .$query("{status, body}");
    console.log(resource.status);
  },
  getTask: async ({ args }) => {
    const resource = await nodes.http
      .get({ url: `http://100.26.212.185:3000/todos/${args.id}` })
      .$query("{status, body}");
    console.log(resource.status);
  },
  addTask: async ({ args }) => {
    const request = await nodes.http
      .post({
        url: "http://100.26.212.185:3000/todos/",
        headers: JSON.stringify({ "Content-Type": "application/json" }),
        body: JSON.stringify(args),
      })
      .$invoke();
    console.log(request.status);
  },
  editTask: async ({ args }) => {
    const request = await nodes.http
      .put({
        url: `http://100.26.212.185:3000/todos/${args.id}`,
        headers: JSON.stringify({ "Content-Type": "application/json" }),
        body: JSON.stringify(omit(args, "id")),
      })
      .$invoke();
    console.log(request.status);
  },
  deleteTask: async ({ args }) => {
    const request = await nodes.http
      .delete({
        url: `http://100.26.212.185:3000/todos/${args.id}`,
      })
      .$invoke();
    console.log(request.status);
  },
};
