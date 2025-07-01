<script>
  let tasks = [];

  // Load tasks from localStorage when page loads
  window.onload = function () {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      tasks = JSON.parse(stored);
      tasks.forEach(task => renderTask(task.text, task.completed));
      updateProgress();
    }
  };

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const task = { text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    renderTask(taskText, false);
    taskInput.value = '';
    updateProgress();
  }

  function renderTask(text, isCompleted) {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;

    checkbox.addEventListener('change', function () {
      const index = Array.from(document.getElementById('taskList').children).indexOf(listItem);
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
      const index = Array.from(document.getElementById('taskList').children).indexOf(listItem);
      tasks.splice(index, 1);
      saveTasks();
      listItem.remove();
      updateProgress();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);

    document.getElementById('taskList').appendChild(listItem);
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
</script>
