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
    tareas.push(new Task("Tarea " + index, "Descripcion", estados[indice], Math.round(Math.random() * 10), id));
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

function actualizarTareas(tarea)
{
    let tareaItem = tareaTemplate.cloneNode(true);
    tareaItem.setAttribute('id', tarea.id);

    let tituloTarea = tareaItem.getElementsByClassName("tituloTarea");
    tituloTarea[0].innerHTML = tarea.name + " [" + tarea.priority + "]";
    
    let descripcionTarea = tareaItem.getElementsByClassName("textoTarea");
    descripcionTarea[0].innerHTML = tarea.description;

    let estadoTarea = tareaItem.getElementsByClassName("estadoTarea");
    estadoTarea[0].innerHTML = tarea.state;
    
    if(tarea.state === "todo"){
        estadoTarea[0].style.color = "yellow";
        listaToDo.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "doing") {
        estadoTarea[0].style.color = "blue";
        listaDoing.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state === "done") {    
        estadoTarea[0].style.color = "#1E7116";
        listaDone.appendChild(tareaItem.cloneNode(true));
    } else if(tarea.state == "deleted"){
        tareaItem.setAttribute("draggable", "false");
        estadoTarea[0].style.color = "red";
        listaDeleted.appendChild(tareaItem.cloneNode(true));
    }

    tareaItem.setAttribute("draggable", "false");
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

/* 
    EN DESARROLLO
*/
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
function obtenerPrioridad(hijos, nElemento)
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
