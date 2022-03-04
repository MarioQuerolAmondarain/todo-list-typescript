/* 
    LISTAS
*/
const tareaTemplate = document.getElementById("tareaGeneral");
const listaGeneral = document.getElementById("listaGeneral");
const listaToDo = document.getElementById("listaToDo");
const listaDoing = document.getElementById("listaDoing");
const listaDone = document.getElementById("listaDone");
const listaDeleted = document.getElementById("listaDeleted");

listaGeneral.removeChild(listaGeneral.firstChild);// Eliminamos el primer nodo que es el template


/* 
    EVENTOS BOTONES
*/
document.getElementById("btnAñadirTarea").addEventListener('click', (e) => {
    e.preventDefault();
    let nombre = document.getElementById("nombreTarea").value;
    let descripcion = document.getElementById("descripcionTarea").value;
    let estado = document.getElementById("estadoTarea").value;
    let prioridad = document.getElementById("prioridadTarea").value;

    let nuevaTarea = new Task(nombre, descripcion, estado, prioridad, id++);
    actualizarTareas(nuevaTarea);
    tareas.push(nuevaTarea);
    console.log("Se añade nueva tarea, con id: " + id);
});;

document.getElementById("ocultarGeneral").addEventListener('click', (e) => {
    ocultar("general");
});
document.getElementById("mostrarCreadas").style.display = "none";
document.getElementById("mostrarCreadas").addEventListener('click', (e) => {
    mostrar("general");
});

document.getElementById("ocultarDeleted").addEventListener('click', (e) => {
    ocultar("deleted");
});
document.getElementById("mostrarEliminadas").style.display = "none";
document.getElementById("mostrarEliminadas").addEventListener('click', (e) => {
    mostrar("deleted");
});

const nombreBotones = ["ToDo", "Doing", "Done"];
nombreBotones.forEach(nombre => {
    document.getElementById("vaciar" + nombre).addEventListener('click', (e) => {
        vaciarLista(nombre.toLowerCase());
    });    

    document.getElementById("ordenarAscendente" + nombre).addEventListener('click', (e) => {
        ordenarLista(nombre.toLowerCase(), true);
    });

    document.getElementById("ordenarDescendente" + nombre).addEventListener('click', (e) => {
        ordenarLista(nombre.toLowerCase(), false);
    });
});
