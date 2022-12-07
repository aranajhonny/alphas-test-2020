// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persist across program updates. Store data here.
import { nodes, root, state } from "membrane";

state.tasks = [];

export const Root = {
  getAllTask: async ({ args }) => {
    console.log(JSON.stringify(state.tasks));
  },
  getTask: async ({ args }) => {
    const result = state.tasks.find((task) => task.id === args.id);
    console.log(JSON.stringify(result));
  },
  addTask: async ({ args }) => {
    state.tasks.push({
      id: args.id,
      title: args.title,
      dueDate: args.dueDate,
    });
  },
  editTask: async ({ args }) => {
    const result = state.tasks.find((task) => task.id === args.id);
    result.title = args.title;
    result.dueDate = args.dueDate;
  },
  deleteTask: async ({ args }) => {
    const index = state.tasks.findIndex((task) => task.id === args.id);
    delete state.tasks[index];
  },
};
// interface Task {
//   id: number,
//   title: string,
//   dueDate: string,
// }