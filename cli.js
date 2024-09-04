#!/usr/bin/env node
const {
  addTask,
  updateTask,
  deleteTask,
  markTask,
  listTasks,
} = require("./taskHandler");

const args = process.argv.slice(2);
const validActions = [
  "add",
  "update",
  "delete",
  "mark-in-progress",
  "mark-done",
  "list",
  "help",
];
const action = args[0];
const inputs = args.slice(1);

if (!validActions.includes(action)) {
  console.error(
    `Unknown action: ${action}. Use one of: ${validActions.join(", ")}`
  );
  showHelp();
  process.exit(1);
}

switch (action) {
  case "add":
    if (!inputs) {
      console.log("Please enter a task description");
    } else {
      addTask(inputs.join(" "));
    }
    break;
  case "update":
    if (inputs.length < 2) {
      console.log("Please enter a valid task ID and description to update");
    } else {
      updateTask(inputs[0], inputs.slice(1).join(" "));
    }
    break;
  case "delete":
    if (inputs.length < 1) {
      console.log("Please provide a task ID to delete.");
    } else {
      deleteTask(inputs[0]);
    }
    break;
  case "mark-in-progress":
    if (inputs.length < 1) {
      console.log("Please provide a task ID to mark as in-progress.");
    } else {
      markTask(inputs[0], "in-progress");
    }
    break;
  case "mark-done":
    if (inputs.length < 1) {
      console.log("Please provide a task ID to mark as done.");
    } else {
      markTask(inputs[0], "done");
    }
    break;
  case "list":
    if (inputs.length < 1) {
      listTasks();
    } else if (!["todo", "in-progress", "done"].includes(inputs[0])) {
      console.log("Invalid Status! please choose todo, in-progress or done.");
    } else {
      listTasks(inputs[0]);
    }
    break;
  case "help":
    showHelp();
    break;
  default:
    showHelp();
}

function showHelp() {
  console.log(`
    Use one of the following commands:
    - add <task description>: Add a new task
    - update <task ID> <new description>: Update an existing task
    - delete <task ID>: Delete a task
    - mark-in-progress <task ID>: Mark a task as in-progress
    - mark-done <task ID>: Mark a task as done
    - list [status]: List tasks, optionally filtered by status (todo, in-progress, done)
  `);
}
