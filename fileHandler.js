const fs = require("fs");
const path = require("path");

const taskFilePath = path.join(__dirname, "tasks.json");

function loadData() {
  try {
    if (!fs.existsSync(taskFilePath)) {
      console.warn(`File ${taskFilePath} does not exist. Creating a new one.`);
      saveData({ counter: 0, tasks: [] });
    }
    return JSON.parse(fs.readFileSync(taskFilePath, "utf8").toString());
  } catch (error) {
    console.error(`Error loading data:`, error.message);
    return { counter: 0, tasks: [] };
  }
}

function saveData(data) {
  try {
    const dataJSON = JSON.stringify(data, null, 2);
    fs.writeFileSync(taskFilePath, dataJSON);
  } catch (error) {
    console.error("Error saving data", error.message);
  }
}

module.exports = {
  loadData,
  saveData,
};
