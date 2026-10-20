const heading = document.createElement("h2");
heading.textContent = "Список задач";
const form = document.createElement("form");

const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.name = "title";
nameInput.placeholder = "Введите название задачи";
nameInput.required = true;

const deadlineInput = document.createElement("input");
deadlineInput.type = "date";
deadlineInput.name = "deadline";
deadlineInput.required = true;

const responsibleInput = document.createElement("input");
responsibleInput.type = "text";
responsibleInput.name = "responsibleName";
responsibleInput.placeholder = "Укажите ответственного";
responsibleInput.required = true;

const submitBtn = document.createElement("input");
submitBtn.type = "submit";
submitBtn.value = "Создать задачу";

form.append(nameInput, deadlineInput, responsibleInput, submitBtn);
document.body.append(heading, form);

const taskList = document.createElement("ul");
document.body.append(taskList);

const errorMessage = document.createElement("p");
errorMessage.classList.add("error");
form.after(errorMessage);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    !nameInput.value.trim() ||
    !responsibleInput.value.trim() ||
    !deadlineInput.value
  ) {
    errorMessage.textContent = "Заполните все поля";
    return;
  }

  errorMessage.textContent = "";

  const taskListItem = document.createElement("li");
  const success = document.createElement("input");
  success.type = "checkbox";

  success.addEventListener("change", (event) => {
    taskListItem.classList.toggle("completed", success.checked);
  });

  taskListItem.textContent = `${nameInput.value} - ${deadlineInput.value} - ответственный: ${responsibleInput.value}`;
  taskListItem.append(success);
  taskList.append(taskListItem);
  form.reset();
});
