let tasks = [];

function prioritySort(tasks) {
  return tasks.sort((a, b) => {
    if (a.priority === b.priority) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return b.priority - a.priority;
  });
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const priorityInput = document.getElementById("priority-input");
  const deadlineInput = document.getElementById("deadline-input");

  const task = taskInput.value.trim();
  const priority = parseInt(priorityInput.value);
  const deadline = new Date(deadlineInput.value);

  if (task && deadlineInput.value) {
    const newTask = { task, priority, deadline, done: false };
    tasks.push(newTask);
    tasks = prioritySort(tasks);
    renderTaskTable();
  }

  taskInput.value = "";
  deadlineInput.value = "";
}

function renderTaskTable() {
  const taskTable = document.getElementById("task-table").getElementsByTagName("tbody")[0];
  taskTable.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = taskTable.insertRow();
    const priorityText = task.priority === 1 ? "Low" : task.priority === 2 ? "Medium" : "High";
    const priorityClass = task.priority === 1 ? "priority-low" : task.priority === 2 ? "priority-medium" : "priority-high";

    row.innerHTML = `
      <td>${task.task}</td>
      <td class="${priorityClass}">${priorityText}</td>
      <td>${task.deadline.toLocaleDateString()}</td>
      <td>
        <button class="button is-small is-success" onclick="toggleDone(${index})">
          <i class="fas ${task.done ? 'fa-undo' : 'fa-check'}"></i>
        </button>
        <button class="button is-small is-danger" onclick="deleteTask(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTaskTable();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTaskTable();
}


