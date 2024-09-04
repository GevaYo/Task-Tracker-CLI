const { create } = require("domain");
const fs = require("fs");
const path = require("path");

const taskFilePath = path.join(__dirname, "tasks.json");

const args = process.argv.slice(2);
const action = args[0];
const inputs = args.slice(1);

const tasksData = loadData();

/* tasks.json structure:
counter
counter: integer,
tasks: [
  id: number,
  description: string,
  status: todo, in-progress, done,
  createdAt: Date,
  updateAt: Ddte
] 
*/

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

function addTask(taskDescription) {
  let counter = tasksData.counter;
  const newTask = {
    id: counter,
    description: taskDescription,
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  tasksData.tasks.push(newTask);
  tasksData.counter++;
  saveTask();
}

function findById(taskId) {
  const task = tasksData.tasks.filter((task) => {
    return task.id.toString() === taskId.toString();
  });
  return task[0];
}

function updateTask(taskId, newTaskDescription) {
  const taskToUpdate = findById(taskId);
  taskToUpdate.description = newTaskDescription;
  taskToUpdate.updatedAt = Date.now();
  saveTask();
}

function deleteTask(taskId) {
  const taskToDelete = tasksData.tasks.indexOf((task) => {
    return task.id.toString() === taskId.toString();
  });
  tasksData.tasks.splice(taskToDelete, 1);
  saveTask();
}

function markTask(taskId, status) {
  const taskToModify = findById(taskId);
  taskToModify.status = status;
  saveTask();
}

function listTasks(status = null) {
  if (!status) {
    tasksData.tasks.forEach((task) => {
      console.log(`- ${task.description} (Status: ${task.status})`);
    });
  } else {
    const tasksByStatus = tasksData.tasks.filter((task) => {
      return task.status.toString() === status.toString();
    });
    tasksByStatus.forEach((task) => {
      console.log(`- ${task.description}`);
    });
  }
}

function loadData() {
  return JSON.parse(fs.readFileSync(taskFilePath, "utf8").toString());
}

function saveTask() {
  const dataJSON = JSON.stringify(tasksData, null, 2);
  fs.writeFileSync(taskFilePath, dataJSON);
}
