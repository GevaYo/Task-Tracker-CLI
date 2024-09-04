const { loadData, saveData } = require("./fileHandler");

const NOT_FOUND = -1;
let tasksData = loadData();

function addTask(taskDescription) {
  const newTask = {
    id: tasksData.counter,
    description: taskDescription,
    status: "todo",
    createdAt: Date.now().toISOString(),
    updatedAt: Date.now().toISOString(),
  };
  tasksData.tasks.push(newTask);
  tasksData.counter++;
  saveData(tasksData);
  console.log(`Task added successfully (ID:${newTask.id})`);
}

function updateTask(taskId, newTaskDescription) {
  const taskToUpdate = findById(taskId);
  if (taskToUpdate) {
    taskToUpdate.description = newTaskDescription;
    taskToUpdate.updatedAt = Date.now();
    saveData(tasksData);
    console.log(`Task updated successfully (ID:${taskId})`);
  } else {
    console.error(`Task with ID ${taskId} not found.`);
  }
}

function deleteTask(taskId) {
  const taskIndex = tasksData.tasks.findIndex(
    (task) => task.id.toString() === taskId.toString()
  );
  if (taskIndex !== NOT_FOUND) {
    tasksData.tasks.splice(taskIndex, 1);
    saveData(tasksData);
    console.log(`Task deleted successfully (ID:${taskId})`);
  } else {
    console.error(`Task with ID ${taskId} not found.`);
  }
}

function markTask(taskId, status) {
  const taskToModify = findById(taskId);
  if (taskToModify) {
    taskToModify.status = status;
    saveData(tasksData);
    console.log(`Task ${taskId} makred as ${status}`);
  } else {
    console.error(`Task with ID ${taskId} not found.`);
  }
}

function listTasks(status = null) {
  const tasksToDisplay = status
    ? tasksData.tasks.filter((task) => task.status === status)
    : tasksData.tasks;

  tasksToDisplay.forEach((task) => {
    console.log(`- ${task.description} (Status: ${task.status})`);
  });
}

function findById(taskId) {
  return tasksData.tasks.find(
    (task) => task.id.toString() === taskId.toString()
  );
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  markTask,
  listTasks,
};
