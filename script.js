function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value;
  const errorMsg = document.getElementById("errorMsg");

  if (task.trim()=== "") {
    errorMsg.textContent = " Please enter a task.";
    return;
  };

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    toggleTask(checkbox);
  });

  const span = document.createElement("span");
  span.textContent = task;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    li.remove();
  });


  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeButton);

  document.getElementById("taskList").appendChild(li);
  
  input.value = "";
  updateUI();
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
