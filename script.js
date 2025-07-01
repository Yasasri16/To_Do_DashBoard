
  let tasks = [];

  window.onload = function () {
    // Load saved tasks from localStorage
    const saved = localStorage.getItem('tasks');
    if (saved) {
      tasks = JSON.parse(saved);
      tasks.forEach(task => renderTask(task.text, task.completed));
    }
    updateProgress();
  };

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTask(taskText, false);
    taskInput.value = '';
    updateProgress();
  }

  function renderTask(text, completed) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    checkbox.addEventListener('change', function () {
      const index = Array.from(taskList.children).indexOf(li);
      tasks[index].completed = this.checked;
      saveTasks();
      updateProgress();
    });

    const label = document.createElement('label');
    label.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.style.marginLeft = 'auto';
    deleteBtn.style.border = 'none';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.fontSize = '18px';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.addEventListener('click', function () {
      const index = Array.from(taskList.children).indexOf(li);
      tasks.splice(index, 1);
      saveTasks();
      li.remove();
      updateProgress();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('progressText').textContent = `${percent}% completed`;
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
