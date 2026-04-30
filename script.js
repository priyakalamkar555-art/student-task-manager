// State Management
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let searchQuery = "";

// Selectors
const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");
const emptyState = document.getElementById("emptyState");
const taskStats = document.getElementById("taskStats");
const themeSwitcher = document.getElementById("themeSwitcher");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  renderTasks();
});

// Task Functions
function addTask() {
  const text = taskInput.value.trim();
  const category = categoryInput.value;

  if (text === "") {
    errorMsg.textContent = "Please enter a task.";
    return;
  }
  errorMsg.textContent = "";

  const newTask = {
    id: Date.now(),
    text: text,
    category: category,
    completed: false,
    timestamp: getFormattedDate()
  };

  tasks.push(newTask);
  saveTasks();
  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      currentFilter === "all" || 
      (currentFilter === "active" && !task.completed) || 
      (currentFilter === "completed" && task.completed) ||
      (task.category === currentFilter);
    
    return matchesSearch && matchesFilter;
  });

  if (filteredTasks.length === 0) {
    emptyState.style.display = "block";
    emptyState.textContent = searchQuery ? "No matching tasks found." : "No tasks in this category.";
  } else {
    emptyState.style.display = "none";
    filteredTasks.forEach(task => {
      const li = createTaskElement(task);
      taskList.appendChild(li);
    });
  }

  updateStats();
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
    <div class="task-content ${task.completed ? "completed" : ""}">
      <div class="task-text-row">
        <span class="task-text">${task.text}</span>
        <span class="category-badge">${getCategoryEmoji(task.category)} ${task.category}</span>
      </div>
      <small class="task-time">${task.timestamp}</small>
    </div>
    <div class="task-actions">
      <button onclick="editTask(${task.id})">Edit</button>
      <button class="remove-btn" onclick="deleteTask(${task.id})">Remove</button>
    </div>
  `;
  return li;
}

function updateStats() {
  const completedCount = tasks.filter(t => t.completed).length;
  taskStats.innerText = `✅ ${completedCount} / ${tasks.length} completed`;
}

// Helpers
function getFormattedDate() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[now.getDay()];
  const date = `${now.getDate()} ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`;
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `(${day}, ${date} at ${time})`;
}

function getCategoryEmoji(category) {
  const emojis = {
    Theory: "📘",
    Practical: "💻",
    Revision: "🔄",
    Assignment: "📝"
  };
  return emojis[category] || "";
}

// Event Listeners
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderTasks();
  });
}

if (filterButtons) {
  filterButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.getAttribute("data-filter");
      renderTasks();
    }
  });
}

// Theme Management
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeSwitcher) themeSwitcher.value = savedTheme;
}

if (themeSwitcher) {
  themeSwitcher.addEventListener("change", function (e) {
    const selectedTheme = e.target.value;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
}
