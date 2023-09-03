const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const listSelector = document.getElementById("listSelector");
const lists = {};

// Agrega una nueva lista
function addList(listName) {
  lists[listName] = [];
  const option = document.createElement("option");
  option.value = listName;
  option.textContent = listName;
  listSelector.appendChild(option);
}

// Cambia la lista actual
listSelector.addEventListener("change", function () {
  const selectedList = listSelector.value;
  renderTasks(selectedList);
});

// Función para renderizar las tareas de una lista
function renderTasks(listName) {
  taskList.innerHTML = "";

  lists[listName].forEach((taskObj, index) => {
    const up_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    up_svg.setAttribute("width", "32");
    up_svg.setAttribute("height", "32");
    up_svg.setAttribute("viewBox", "0 0 24 24");
    up_svg.innerHTML = `<path fill="#333" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41z"/>`;
    
    const down_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    down_svg.setAttribute("width", "32");
    down_svg.setAttribute("height", "32");
    down_svg.setAttribute("viewBox", "0 0 24 24");
    down_svg.innerHTML = `<path fill="#333" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"/>`;

    const { task, description } = taskObj;
    const li = document.createElement("li");

    const taskTitle = document.createElement("span");
    taskTitle.textContent = task;
    li.appendChild(taskTitle);
    
    
    const descriptionElem = document.createElement("textarea");
    descriptionElem.value = description;
    descriptionElem.placeholder = "Descripción de la tarea...";
    descriptionElem.style.display = 'none';
    li.appendChild(descriptionElem);
    
    li.appendChild(document.createElement("div"));
    const div = li.lastElementChild;
    div.className = 'options_wrapper'

    const toggleDescriptionButton = document.createElement("button");
    toggleDescriptionButton.title = 'Mostrar/Ocultar descripcion';
    toggleDescriptionButton.className = 'description';
    toggleDescriptionButton.appendChild(down_svg);
    toggleDescriptionButton.addEventListener("click", function () {
      if (descriptionElem.style.display === "none") {
        descriptionElem.style.display = "block";
        toggleDescriptionButton.removeChild(down_svg);
        toggleDescriptionButton.appendChild(up_svg);
      } else {
        descriptionElem.style.display = "none";
        toggleDescriptionButton.removeChild(up_svg);
        toggleDescriptionButton.appendChild(down_svg);
      }
    });
    div.appendChild(toggleDescriptionButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function () {
      lists[listName].splice(index, 1);
      renderTasks(listName);
    });
    deleteButton.className = 'delete';
    div.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

// Manejar el envío del formulario para agregar una tarea
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedList = listSelector.value;
  const newTask = taskInput.value;
  const newDescription = ""; // Agrega la lógica para obtener la descripción
  addTask(selectedList, newTask, newDescription);
  taskInput.value = "";
});

// Agrega una tarea a una lista
function addTask(listName, task, description) {
  lists[listName].push({ task, description });
  renderTasks(listName);
}

addList("Lista inicial");
addList("Lista secundaria");