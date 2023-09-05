let gestionar = (e) => {
    const titulo = document.querySelector('#titulo').value
    const descripcion = document.querySelector('#descripcion').value

    const tarea = {
        titulo,
        descripcion
    }

    if (localStorage.getItem('tareas') === null) {
        let tareas = [];
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas))
    } else {
        let tareas = JSON.parse(localStorage.getItem('tareas'))
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }

    if (e) {
        e.preventDefault()
    }
    mostratarea()
}

let mostratarea = () => {
    let tareas = JSON.parse(localStorage.getItem('tareas'))
    let tareasView = document.getElementById('tareas')
    tareasView.innerHTML = ''
    for (let i = 0; i < tareas.length; i++) {
        let titulo = tareas[i].titulo;
        let descripcion = tareas[i].descripcion

        tareasView.innerHTML += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-tittle">${titulo}</h5> 
                <p class="card-text">${descripcion}</p>
            </div>
            <a href="#" onclick="deleteTask(${titulo})" class="btn btn-danger">Delete</a>
        </div>
    `
    }


}

const agregar = document.querySelector('#agregar')
agregar.addEventListener('click', gestionar)


export { gestionar }
export { mostratarea }