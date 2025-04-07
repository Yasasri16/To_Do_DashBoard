let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  totalTasks++;

  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      completedTasks++;
    } else {
      completedTasks--;
    }
    updateProgress();
  });

  const label = document.createElement('label');
  label.textContent = taskText;

  listItem.appendChild(checkbox);
  listItem.appendChild(label);

  document.getElementById('taskList').appendChild(listItem);
  taskInput.value = '';

  updateProgress();
}

function updateProgress() {
  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  document.getElementById('progressFill').style.width = `${percent}%`;
  document.getElementById('progressText').textContent = `${percent}% completed`;
}
