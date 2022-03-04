/* 
    TYPESCRIPT
*/
class Task
{
    static idGeneral = 0;
    name: string;
    description: string;
    state: string;
    priority: number;
    private _id: number;

    constructor(name: string, description: string, state: string, priority: number, id?: number)
    {
        this.name = name;
        this.description = description;
        this.state = state;
        this.priority = priority;
        Task.idGeneral++;
        this._id =(!!id ? id : Task.idGeneral);
    }

    get id(): number
    {
        return this._id;
    }
}

/* 
    LISTAS
*/
const tareaTemplate: HTMLElement = document.getElementById("tareaGeneral");
const listaGeneral: HTMLElement = document.getElementById("listaGeneral");
const listaToDo: HTMLElement = document.getElementById("listaToDo");
const listaDoing: HTMLElement = document.getElementById("listaDoing");
const listaDone: HTMLElement = document.getElementById("listaDone");
const listaDeleted: HTMLElement= document.getElementById("listaDeleted");

listaGeneral.removeChild(listaGeneral.firstChild);// Eliminamos el primer nodo que es el template


/* 
    EVENTOS BOTONES
*/
document.getElementById("btnAñadirTarea").addEventListener('click', (e) => {
    e.preventDefault();
    let nombre: string= (document.getElementById("nombreTarea") as HTMLInputElement).value;
    let descripcion: string = (document.getElementById("descripcionTarea") as HTMLInputElement).value;
    let estado: string = (document.getElementById("estadoTarea") as HTMLInputElement).value;
    let prioridad: number = Number((document.getElementById("prioridadTarea") as HTMLInputElement).value);

    let nuevaTarea = new Task(nombre, descripcion, estado, Number(prioridad));
    actualizarTareas(nuevaTarea);
    tareas.push(nuevaTarea);
    console.log("Se añade nueva tarea, con id: " + nuevaTarea.id);
});

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

/* 
    TAREAS
*/
const tareas = [];
const estados = ["todo", "doing", "done", "deleted"];

let indice = 0;
var id;
for (let index = 0; index < 8; index++) 
{
    id = index;
    let nuevaTarea: Task = new Task("Tarea " + index, "Descripcion", estados[indice], Math.round(Math.random() * 10), id); 
    tareas.push(nuevaTarea);
    indice++;
    if(indice >= 4) indice = 0;
}
console.log("Se crean las tareas");


tareas.forEach(tarea => {
    actualizarTareas(tarea);
});
listaGeneral.removeChild(listaGeneral.firstChild);
console.log("Se añaden las tareas a las respectivas listas");

/* 
    FUNCIONES
*/
function ocultar(lista)
{
    if(lista == "general")
    {
        document.getElementById("listaGeneralContenedor").style.display = "none";
        document.getElementById("mostrarCreadas").style.display = "";
    }
    else
    {
        document.getElementById("listaDeletedContenedor").style.display = "none";
        document.getElementById("mostrarEliminadas").style.display = "";

    }
    console.log("Se oculta " + lista + " se muestra botón para desocultar");
}
function mostrar(lista)
{
    if(lista == "general")
    {
        document.getElementById("listaGeneralContenedor").style.display = "";
        document.getElementById("mostrarCreadas").style.display = "none";
    }
    else
    {
        document.getElementById("listaDeletedContenedor").style.display = "";
        document.getElementById("mostrarEliminadas").style.display = "none";
    }
    console.log("Se muestra " + lista + " se oculta botón para desocultar");
}

function actualizarTareas(tarea: Task)
{
    let tareaItem: Node = tareaTemplate.cloneNode(true);
    (tareaItem as HTMLElement).setAttribute('id', tarea.id.toString());

    let tituloTarea = (tareaItem as HTMLElement).getElementsByClassName("tituloTarea");
    tituloTarea[0].innerHTML = tarea.name + " [" + tarea.priority + "]";
    
    let descripcionTarea = (tareaItem as HTMLElement).getElementsByClassName("textoTarea");
    descripcionTarea[0].innerHTML = tarea.description;

    let estadoTarea = (tareaItem as HTMLElement).getElementsByClassName("estadoTarea");
    estadoTarea[0].innerHTML = tarea.state;
    
    if(tarea.state === "todo"){
        (estadoTarea[0] as HTMLElement).style.color = "yellow";
        listaToDo.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "doing") {
        (estadoTarea[0] as HTMLElement).style.color = "blue";
        listaDoing.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "done") {    
        (estadoTarea[0] as HTMLElement).style.color = "#1E7116";
        listaDone.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state == "deleted"){
        (tareaItem as HTMLElement).setAttribute("draggable", "false");
        (estadoTarea[0] as HTMLElement).style.color = "red";
        listaDeleted.appendChild(tareaItem.cloneNode(true));
    }

    (tareaItem as HTMLElement).setAttribute("draggable", "false");
    listaGeneral.appendChild(tareaItem.cloneNode(true));
    indice++;
}
function vaciarLista(lista)
{
    var confirmacion = confirm("Desea eliminar la lista " + lista);
    if(!confirmacion){
        return;
    }

    for (let indice = 0; indice < tareas.length; indice++) 
    {
        let tarea = tareas[indice];
        if(tareas[indice].state == lista)
        {
            tareas[indice].state = "deleted";
            let tareaActualizada = tareas[indice];
            eliminarTarea(tarea.id);
            actualizarTareas(tareaActualizada);

            console.log("Actualizada " + tareas[indice].name + " Estado: " + tareas[indice].state);
        }
    }

    if(lista == "todo"){
        listaToDo.innerHTML = "";
    } else if( lista == "doing") {
        listaDoing.innerHTML = "";
    } else if(lista == "done") {  
        listaDone.innerHTML = "";  
    } else if(lista == "deleted") {
        listaDeleted.innerHTML = "";
    } else {
        console.log("Lista no válida");
    }

    console.log("Lista " + lista + " vaciada");
}
function eliminarTarea(tareaId)
{
    let hijos = listaGeneral.getElementsByClassName("itemTarea");
    
    let eliminada = false;
    for(let i = 0; i < hijos.length; i++)
    {
        if(hijos[i].getAttribute("id") == tareaId)
        {
            listaGeneral.removeChild(hijos[i]);
            eliminada = true;
        }
    }

    if(eliminada){
        console.log("Tarea con id " + tareaId + " ha sido eliminada");
    }else {
        console.log("No existe la tarea con id " + tareaId);
    }
}

function ordenarLista(lista, ascendente)
{
    let hijos;
    let padre;
    if(lista == "todo"){
        padre = listaToDo;
        hijos = listaToDo.getElementsByClassName("itemTarea");
    } else if( lista == "doing") {
        padre = listaDoing;
        hijos = listaDoing.getElementsByClassName("itemTarea");
    } else if(lista == "done") {
        padre = listaDone;  
        hijos = listaDone.getElementsByClassName("itemTarea");
    }
    
    for(let i = 0; i < hijos.length; i++)
    {
        for(let j = 0; j < hijos.length - i - 1; j++)
        {
            let hijo1 = obtenerPrioridad(hijos, j);
            let hijo2 = obtenerPrioridad(hijos, j + 1);

            if(hijo1 > hijo2 && ascendente)
            {
                padre.insertBefore(hijos[j + 1], hijos[j]);
            }
            
            if(hijo1 < hijo2 && !ascendente)
            {
                padre.insertBefore(hijos[j + 1], hijos[j]);
            }
        }
    }
    console.log(lista + " ordenada de forma " + (ascendente ? "ascendete" : "descendete"));
}
function obtenerPrioridad(hijos: Node, nElemento: number): string
{
    let titulo = hijos[nElemento].getElementsByClassName("tituloTarea")[0].innerHTML;

    let indice;
    for (let i = titulo.length-1; i > 0; i--) {
        if(titulo[i] == "[")
        {
            indice = i;
            break;
        }
    }
    return titulo.substring(indice+1, titulo.length-1);
}
