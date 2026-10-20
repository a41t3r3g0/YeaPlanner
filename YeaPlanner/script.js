const form = document.querySelector(".task-form");
const input = document.querySelector(".task-form_input");
const taskList = document.querySelector(".tasklist-list");
const emptyState = document.querySelector(".tasklist-empty");
const activeCountElement = document.querySelector(".tasklist-active_count");
const resolvedCountElement = document.querySelector(".tasklist-resolved_count");

let activeCount = 0;
let resolvedCount = 0;

function updateCounters() {
  activeCountElement.textContent = activeCount;
  resolvedCountElement.textContent = resolvedCount;
}

function updateEmptyState() {
  if (taskList.children.length === 0) {
    taskList.classList.add("is-hidden");
    emptyState.classList.remove("is-hidden");
  } else {
    taskList.classList.remove("is-hidden");
    emptyState.classList.add("is-hidden");
  }
}

function createTaskItem(taskText) {
  const taskItem = document.createElement("li");
  taskItem.className = "tasklist-list_item";

  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.className = "tasklist-list_complete-btn";
  completeButton.textContent = "✓";
  completeButton.setAttribute("aria-label", "Отметить задачу выполненной");

  const taskTextElement = document.createElement("span");
  taskTextElement.className = "tasklist-list_text";
  taskTextElement.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "tasklist-list_delete-btn";
  deleteButton.setAttribute("aria-label", "Удалить задачу");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "images/Layer 2.svg";
  deleteIcon.alt = "";
  deleteButton.appendChild(deleteIcon);

  let isCompleted = false;

  completeButton.addEventListener("click", () => {
    if (isCompleted === false) {
      isCompleted = true;
      taskItem.classList.add("is-completed");
      completeButton.setAttribute("aria-label", "Вернуть задачу в активные");
      activeCount--;
      resolvedCount++;
    } else {
      isCompleted = false;
      taskItem.classList.remove("is-completed");
      completeButton.setAttribute("aria-label", "Отметить задачу выполненной");
      activeCount++;
      resolvedCount--;
    }

    updateCounters();
  });

  deleteButton.addEventListener("click", () => {
    if (isCompleted) {
      resolvedCount--;
    } else {
      activeCount--;
    }

    taskItem.remove();
    updateCounters();
    updateEmptyState();
  });

  taskItem.appendChild(completeButton);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskItem(taskText);
  taskList.appendChild(taskItem);

  activeCount++;
  updateCounters();
  updateEmptyState();
  input.value = "";
});

updateCounters();
updateEmptyState();
