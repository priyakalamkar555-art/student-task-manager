
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  const errorMsg = document.getElementById("errorMsg");


  if (task.trim() === "") {

  if (task.trim()=== "") {

    errorMsg.textContent = " Please enter a task.";
    return;
  };
  errorMsg.textContent = "";


  const li = document.createElement("li");

  const li = document.createElement("li");


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

  const date =`${now.getDate()} ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`;
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const timeElement = document.createElement("small");
  timeElement.textContent = ` (${day}, ${date} at ${time})`;
  timeElement.style.marginLeft = "10px";
  timeElement.style.color = "#888";


  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    const newTask = prompt("Edit task:", span.textContent);

    if (newTask !== null && newTask.trim() !== "") {
      span.textContent = newTask;

      const now = new Date();
      const day = dayNames[now.getDay()];
      const date = `${now.getDate()} ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`;
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      timeElement.textContent = ` (${day}, ${date} at ${time})`;
    }
  });

  li.appendChild(span);
  li.appendChild(timeElement);
  li.appendChild(editButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(removeButton);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
}


function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
}

  const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      const newTask = prompt("Edit task:", span.textContent);
      if (newTask !== null) {
        span.textContent = newTask;
      }
    });
    li.appendChild(span);
    li.appendChild(timeElement);
    li.appendChild(editButton);
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    li.remove();

    taskTracker();
    
  });



  li.appendChild(checkbox);
  li.appendChild(span);


  li.appendChild(removeButton);

  document.getElementById("taskList").appendChild(li);
  
  input.value = "";

  taskTracker();

}

/* =========================
   MULTI-THEME SWITCHER
========================= */

const themeSwitcher = document.getElementById("themeSwitcher");


  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").textContent = "☀️ Light Mode";
  }
};


// Load saved theme
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




function toggleTask(checkbox) {
  const span = checkbox.nextElementSibling;
  span.classList.toggle("completed");

  taskTracker();
}


function taskTracker() {
  const tasks = document.querySelectorAll("#taskList li");
  const completed = document.querySelectorAll("#taskList input:checked");

  const empty = document.getElementById("emptyState");
  if (empty) {
    empty.style.display = tasks.length === 0 ? "block" : "none";
  }

  const stats = document.getElementById("taskStats");
  if (stats) {
    stats.innerText = `✅ ${completed.length} / ${tasks.length} completed`;
  }

}

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

  const celebration = document.getElementById("celebration");

  if (tasks.length > 0 && tasks.length === completed.length) {
    celebration.classList.remove("hidden");

    setTimeout(() => {
      celebration.classList.add("show");
    }, 100);
  } else {
    celebration.classList.remove("show");
    celebration.classList.add("hidden");
  }
}

