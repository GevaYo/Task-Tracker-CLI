const {
  addTask,
  updateTask,
  deleteTask,
  markTask,
  listTasks,
} = require("./taskManager");

const args = process.argv.slice(2);
const action = args[0];
const inputs = args.slice(1);

switch (action) {
  case "add":
    addTask(inputs.join(" "));
    break;
  case "update":
    updateTask(inputs[0], inputs.slice(1).join(" "));
    break;
  case "delete":
    deleteTask(inputs[0]);
    break;
  case "mark-in-progress":
    markTask(inputs[0], "in-progress");
    break;
  case "mark-done":
    markTask(inputs[0], "done");
    break;
  case "list":
    if (inputs.length > 0) {
      listTasks(inputs[0]);
    } else {
      listTasks();
    }
    break;
  default:
    console.log(
      "Unknown action. Use 'add', 'update', 'delete', 'mark-in-progress', 'mark-done', or 'list'."
    );
}
