// Nexus Task Master - Core Logic
// Enhanced Version

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskCategory = document.getElementById('taskCategory');
    const taskPriority = document.getElementById('taskPriority');
    const taskList = document.getElementById('taskList');
    const taskStatsText = document.getElementById('taskStatsText');
    const progressBar = document.getElementById('progressBar');
    const searchInput = document.getElementById('searchInput');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const errorMsg = document.getElementById('errorMsg');
    const themeSwitcher = document.getElementById('themeSwitcher');
    const emptyState = document.getElementById('emptyState');
    const celebration = document.getElementById('celebration');

    // State
    let tasks = JSON.parse(localStorage.getItem('nexus_tasks')) || [];

    // Initialize
    init();

    function init() {
        renderTasks();
        setupTheme();
        attachEventListeners();
    }

    function setupTheme() {
        const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        if (themeSwitcher) themeSwitcher.value = savedTheme;
    }

    function attachEventListeners() {
        // Add Task
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addTask();
        });

        // Theme Switcher
        themeSwitcher.addEventListener('change', (e) => {
            const theme = e.target.value;
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('nexus_theme', theme);
        });

        // Search
        searchInput.addEventListener('input', (e) => {
            renderTasks(e.target.value);
        });

        // Clear All
        clearAllBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all tasks?')) {
                tasks = [];
                saveAndRender();
            }
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        const category = taskCategory.value;
        const priority = taskPriority.value;

        if (text === '') {
            showError('Please enter a task description.');
            return;
        }

        const newTask = {
            id: Date.now(),
            text,
            category,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask);
        taskInput.value = '';
        errorMsg.textContent = '';
        saveAndRender();
    }

    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveAndRender();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    }

    function editTask(id) {
        const task = tasks.find(t => t.id === id);
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            tasks = tasks.map(t => 
                t.id === id ? { ...t, text: newText.trim() } : t
            );
            saveAndRender();
        }
    }

    function saveAndRender() {
        localStorage.setItem('nexus_tasks', JSON.stringify(tasks));
        renderTasks(searchInput.value);
    }

    function renderTasks(filter = '') {
        const filteredTasks = tasks.filter(task => 
            task.text.toLowerCase().includes(filter.toLowerCase())
        );

        taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
            emptyState.querySelector('p').textContent = filter ? 'No matching tasks found.' : 'No tasks yet. Add one to get started!';
        } else {
            emptyState.style.display = 'none';
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''} priority-${task.priority.toLowerCase()}`;
            
            const date = new Date(task.createdAt);
            const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = date.toLocaleDateString();

            li.innerHTML = `
                <div class="task-main">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle task">
                    <div class="task-content">
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <div class="task-meta">
                            <span class="tag category-tag">${task.category}</span>
                            <span class="tag priority-tag">${task.priority}</span>
                            <span class="timestamp">${dateStr} at ${timeStr}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-icon edit-btn" title="Edit Task">✏️</button>
                    <button class="btn-icon delete-btn" title="Delete Task">🗑️</button>
                </div>
            `;

            // Event Listeners for dynamic elements
            li.querySelector('input').addEventListener('change', () => toggleTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
            li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));

            taskList.appendChild(li);
        });

        updateStats();
    }

    function updateStats() {
        const total = tasks.length;
        const completedCount = tasks.filter(t => t.completed).length;
        const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

        taskStatsText.textContent = `✅ ${completedCount} / ${total} completed (${percent}%)`;
        progressBar.style.width = `${percent}%`;

        // Celebration logic
        if (total > 0 && total === completedCount) {
            celebration.classList.remove('hidden');
            celebration.classList.add('show');
        } else {
            celebration.classList.remove('show');
            celebration.classList.add('hidden');
        }
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        setTimeout(() => { errorMsg.textContent = ''; }, 3000);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});

