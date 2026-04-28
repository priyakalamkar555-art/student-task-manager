const themeSwitcher = document.getElementById("themeSwitcher");
const savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

if (themeSwitcher) {
  themeSwitcher.value = savedTheme;

  themeSwitcher.addEventListener("change", function (e) {
    const selectedTheme = e.target.value;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
}

document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const category = document.getElementById("categoryInput").value;

  if (task === "") {
    errorMsg.textContent = "Please enter a task.";
    return;
  }

  errorMsg.textContent = "";

  const li = document.createElement("li");
  li.setAttribute("data-category", category);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    toggleTask(checkbox);
  });

  const span = document.createElement("span");
  span.textContent = task;

  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[now.getDay()];
  const date = `${now.getDate()} ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`;
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const timeElement = document.createElement("small");
  timeElement.textContent = `${day}, ${date} at ${time}`;

  const taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn";
  editButton.addEventListener("click", function () {
    const newTask = prompt("Edit task:", span.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      span.textContent = newTask.trim();

      const now = new Date();
      const day = dayNames[now.getDay()];
      const date = `${now.getDate()} ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`;
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      timeElement.textContent = `${day}, ${date} at ${time}`;
    }
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "remove-btn";
  removeButton.addEventListener("click", function () {
    li.remove();
  });

  taskActions.appendChild(editButton);
  taskActions.appendChild(removeButton);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(timeElement);
  li.appendChild(taskActions);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
  input.focus();
}

function toggleTask(checkbox) {
  const li = checkbox.closest("li");
  const span = li.querySelector("span");

  if (checkbox.checked) {
    li.classList.add("completed");
    span.setAttribute("aria-label", `${span.textContent}, completed`);
  } else {
    li.classList.remove("completed");
    span.removeAttribute("aria-label");
  }
}

function sortTasks(order) {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.getElementsByTagName("li"));

  tasks.sort((a, b) => {
    const textA = a.querySelector("span").textContent.toLowerCase();
    const textB = b.querySelector("span").textContent.toLowerCase();

    if (order === "asc") {
      return textA.localeCompare(textB);
    } else {
      return textB.localeCompare(textA);
    }
  });

  tasks.forEach(task => taskList.appendChild(task));
}
