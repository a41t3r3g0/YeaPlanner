const form = document.querySelector(".form");
const input = document.querySelector(".form_text");
const list = document.querySelector(".list");

const activeCounter = document.querySelector(
  ".tasklist_counters_active-counter",
);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskValue = input.value.trim();

  if (!taskValue) {
    alert("Введено пустое значение");
    return;
  }

  const emptyImage = document.querySelector(".tasklist_list_empty-image");
  const emptyText = document.querySelector(".tasklist_list_empty-text");
  emptyImage.classList.add("hidden");
  emptyText.classList.add("hidden");
  list.classList.remove("hidden");

  const newTask = document.createElement("li");
  newTask.classList.add("tasklist_task");

  const resolvedCounter = document.querySelector(
    ".tasklist_counters_resolved-counter",
  );

  function updateResolvedCounter() {
    const completedTasks = list.querySelectorAll(
      ".success_button-clicked",
    ).length;
    const totalTasks = list.children.length;

    resolvedCounter.textContent = `${completedTasks} из ${totalTasks}`;
  }

  const successBtn = document.createElement("button");
  successBtn.classList.add("success_button");
  successBtn.type = "button";

  successBtn.addEventListener("click", () => {
    const isCompleted = successBtn.classList.toggle("success_button-clicked");
    successBtn.textContent = isCompleted ? "✓" : "";

    updateResolvedCounter();
  });

  const taskText = document.createElement("p");
  taskText.textContent = taskValue;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete_button");
  const deleteBtnImg = document.createElement("img");
  deleteBtnImg.src = "images/Layer 2.svg";
  deleteBtn.type = "button";
  deleteBtn.addEventListener("click", () => {
    newTask.remove();
    activeCounter.textContent = Number(activeCounter.textContent) - 1;
    updateResolvedCounter();
    if (list.children.length === 0) {
      list.classList.add("hidden");
      emptyImage.classList.remove("hidden");
      emptyText.classList.remove("hidden");
    }
  });
  deleteBtn.append(deleteBtnImg);

  activeCounter.textContent = Number(activeCounter.textContent) + 1;

  newTask.append(successBtn, taskText, deleteBtn);
  list.append(newTask);
  updateResolvedCounter();
  input.value = "";
});
