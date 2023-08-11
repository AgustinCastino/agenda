// Script para cargar las categorias predeterminadas
let categorias = ["Facultad", "Hobbies", "Medico"]
let tareas = [
    {categoria:"Facultad", descripcion:"Parcial Algoritmia", fecha: "10/10", id:1},
    {categoria:"Hobbies", descripcion:"Futbol", fecha: "Mañana", id:2}
]

cargarTareas(tareas)


categorias.forEach(categoria => {
    interfazButtonCategoria(categoria)
    interfazSelectCategoria(categoria)
});


// Función que me crea la interfaz de la nueva categoria
function interfazButtonCategoria(categoria) {

    // Creo el nuevo button con la nueva categoría.
    let $categoria = document.createElement("button")

    $categoria.addEventListener("click", ()=>{
        filtrarCategoria(categoria)
    })

    $categoria.classList.add("itemCategoria")
    $categoria.innerText = categoria

    // Creo el button para eliminar la categoria.
    let $btnEliminarCategoria = document.createElement("button")
    $btnEliminarCategoria.classList.add("btnEliminarCategoria")

    let $iconElimnarCategoria = document.createElement("i")
    $iconElimnarCategoria.classList.add("bi", "bi-trash3")

    $btnEliminarCategoria.appendChild($iconElimnarCategoria)

    $btnEliminarCategoria.addEventListener("click", () => {
        eliminarCategoria(categoria)
    })

    // Creo contenedor de los 2 botones anteriores
    let $div = document.createElement("div")
    $div.appendChild($categoria)
    $div.appendChild($btnEliminarCategoria)

    let $categorias = document.querySelector(".categorias")
    $categorias.appendChild($div)

}

// -----------------------------------
// Script para agregar nueva Categoria
let $btnAgregarCategoria = document.querySelector("#btnAgregarCategoria")

$btnAgregarCategoria.addEventListener("click", (e) => {
    e.preventDefault()
    let error = manejarErroresNuevaCategoria()

    if (!error){
        agregarCategoria()
    }
})


function manejarErroresNuevaCategoria(){

    let $inputNuevaCategoria = document.querySelector("#nuevaCategoria")
    let nuevaCategoria = $inputNuevaCategoria.value
    let error = false

    if(nuevaCategoria.trim() == 0){
        error = true
    }

    nuevaCategoria = nuevaCategoria.toUpperCase()
    
    categorias.forEach(categoria => {
        categoria = categoria.toUpperCase()

        if(categoria == nuevaCategoria){
            error = true
        }

    });

    if(error){
        $inputNuevaCategoria.style.border = "1px solid #f85a69"
        return true
    }else{
        $inputNuevaCategoria.style.border = "1px solid black"
        return false
    }

    

}

function agregarCategoria() {
    // Obtengo el input y el valor ingresado en él.
    let $inputNuevaCategoria = document.querySelector("#nuevaCategoria")
    let nuevaCategoria = $inputNuevaCategoria.value
    $inputNuevaCategoria.value = ""

    interfazButtonCategoria(nuevaCategoria)
    interfazSelectCategoria(nuevaCategoria)

    // Agrego la nueva categoría al array de categorías
    categorias.push(nuevaCategoria)
}

// ----------------------------------- 
// Script para eliminar una categoría

function eliminarCategoria(categoriaEliminada) {
    let indiceEliminar = categorias.indexOf(categoriaEliminada);

    let $categorias = document.querySelectorAll(".categorias div")
    $categorias[indiceEliminar + 1].remove()

    let $categoriasSelect = document.querySelectorAll("option")
    $categoriasSelect[indiceEliminar].remove()

    // Elimino del array de categorias la categoria eliminada
    categorias = categorias.filter(categoria => categoria != categoriaEliminada)
}

// FORM NUEVA TAREA ------------------

function interfazSelectCategoria(categoria){

    // Creo el nuevo opcion con la nueva categoría.
    let $optionCategoria = document.createElement("option")
    $optionCategoria.innerText = categoria


    let $categorias = document.querySelector("#opcionesCategorias")
    $categorias.appendChild($optionCategoria)

}

// ---------------------------------------------------------------

// Script para cargar las tareas

function cargarTareas(tareas){

    let $tablaTareas = document.querySelector("#tablaTareas")

    $tablaTareas.innerHTML = `
    <tr>
        <th>Categoría</th>
        <th>Descripcion</th>
        <th>Fecha</th>
    </tr>`

    tareas.forEach(tarea => {
        
        // Con el -1 la fila se agrega al final. Es como un append
        let $nuevaFila = $tablaTareas.insertRow(-1)
    
        let $nuevaCelda = $nuevaFila.insertCell(0)
        $nuevaCelda.textContent = tarea.categoria
    
        $nuevaCelda = $nuevaFila.insertCell(1)
        $nuevaCelda.textContent = tarea.descripcion
    
        $nuevaCelda = $nuevaFila.insertCell(2)
        $nuevaCelda.textContent = tarea.fecha
    
        // Creo el button para eliminar la tarea.
        let $btnEliminarTarea = document.createElement("button")
    
        let $iconElimnarTarea = document.createElement("button")
        $iconElimnarTarea.classList.add("bi", "bi-x-lg")
    
        $btnEliminarTarea.appendChild($iconElimnarTarea)
    
        $btnEliminarTarea.addEventListener("click", () => {
            eliminarTarea(tarea.id)
        })

        $nuevaCelda = $nuevaFila.insertCell(3)
        $nuevaCelda.appendChild($btnEliminarTarea)
    });   

}

// Script para agregar y elinar una tarea

let $btnAgregarTarea = document.querySelector(".containerBtnAgregar button")

$btnAgregarTarea.addEventListener("click", (e) => {
    e.preventDefault()
    agregarTarea()
})

function agregarTarea(){
    let categoria = document.querySelector("#opcionesCategorias").value
    let descripcion = document.querySelector("#descripcion").value
    let fecha = document.querySelector("#fecha").value
    let id = tareas.length + 1

    document.querySelector("#opcionesCategorias").value = ""
    document.querySelector("#descripcion").value = ""
    document.querySelector("#fecha").value = ""

    tareas.push({
        categoria:categoria,
        descripcion:descripcion,
        fecha:fecha,
        id:id
    })

    cargarTareas(tareas)

    // Oculto el formulario para agregar tareas
    let $formNuevaTarea = document.querySelector("#formNuevaTarea")
    $formNuevaTarea.style.display = "none"

    // Muestro la tabla y el botón

    let $tablaTareas = document.querySelector("#tablaTareas")
    $tablaTareas.style.display = "table"

    $btnMostrarFormTarea.style.display = "block"
}

function eliminarTarea(id){
    tareas = tareas.filter(tarea => tarea.id != id);

    cargarTareas(tareas)
}

// Script para filtrar por categoria

function filtrarCategoria(categoria){
    let tareasFiltradas = tareas.filter(tarea => tarea.categoria == categoria)

    cargarTareas(tareasFiltradas)
}


// Script para mostrar y ocultar form tarea y tabla

let $btnMostrarFormTarea = document.querySelector("#mostrarFormTarea")

$btnMostrarFormTarea.addEventListener("click", ()=>{
    // Muestro el formulario para agregar tareas
    let $formNuevaTarea = document.querySelector("#formNuevaTarea")
    $formNuevaTarea.style.display = "block"

    // Oculto la tabla y el botón

    let $tablaTareas = document.querySelector("#tablaTareas")
    $tablaTareas.style.display = "none"

    $btnMostrarFormTarea.style.display = "none"
})
