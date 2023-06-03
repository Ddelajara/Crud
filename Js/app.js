
let tareas = []

let modoAppend = true; 
let indiceGlobal = null;
const title = document.getElementById('title')
const boton = document.getElementById('boton')
const desc = document.getElementById('desc')
const tabla = document.getElementById('cuerpoTabla')
const form = document.getElementById('form')
const Lista = document.getElementById('Lista')
const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')

// console.log({title,boton,desc})

// console.log(Lista.value);

traerLS()
ListarTareas()

boton.addEventListener('click',crear)


function crear(e){
   e.preventDefault()

   if (validaEntradas()) {
    return;
}

    if (modoAppend){

        let id = Date.now()

        const tarea = {
            id: id,
            title:  title.value,
            desc: desc.value,
            Mesa: Lista.value,
            fecha: fecha.value,
            hora: hora.value,
            completed: false
        }
    
        tareas.push(tarea)
    }
    else{
        modoAppend = true;
        tareas[indiceGlobal].title = title.value;
        tareas[indiceGlobal].desc = desc.value;
        tareas[indiceGlobal].Mesa = Lista.value;
        tareas[indiceGlobal].fecha = fecha.value;
        tareas[indiceGlobal].hora = hora.value;
    }

    guardarLS()
    ListarTareas()
    limpiaform()
}

function guardarLS(){
    localStorage.setItem('Tareas',JSON.stringify(tareas))
}

function traerLS () {
    if (localStorage.getItem('Tareas') !== null) {
        tareas = JSON.parse(localStorage.getItem('Tareas'))
    }
}

function ListarTareas(){
    tabla.innerHTML = ''
    tareas.forEach(tarea =>{
        tabla.innerHTML += `
        <td>${tarea.title}</td>
        <td>${tarea.desc}</td>
        <td>${tarea.Mesa}</td>
        <td>${tarea.fecha}</td>
        <td>${tarea.hora}</td>
        <td>
            <button id="botEditar" class="botDisable button-width" onclick="editarFila(${tarea.id})">Editar</button>
            <button class="botBorrar button-width" onclick="eliminarFila(${tarea.id})">Borrar</button>
        </td>
        `
    })

}

function limpiaform() {
    form.reset()
}

function eliminarFila(vId) {
    
    const indice = tareas.findIndex((x)=> x.id == vId)

    Swal.fire({
        title: 'Confirmar la acción de borrado?',
        text: "No podras revertir los cambios!",
        icon: 'Advertencia',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'satisfactoriamente'
          )
          tareas.splice(indice,1)
          guardarLS()
          ListarTareas()
        }
      })
 }

function editarFila(vId) {
    const indice = tareas.findIndex((x)=> x.id == vId)
    // Asignación de los valores de la tarea al formulario
    title.value = tareas[indice].title;
    desc.value = tareas[indice].desc;
    Lista.value = tareas[indice].Mesa;
    fecha.value  = tareas[indice].fecha;
    hora.value  = tareas[indice].hora;
    indiceGlobal = indice;
    modoAppend = false;


    const botonesEditar = document.getElementsByClassName('botDisable');
    for (let i = 0; i < botonesEditar.length; i++) {
        const boton = botonesEditar[i];
            boton.setAttribute('disabled', 'true');
            boton.style.color = 'gray';
    }
}

//Mensaje Sweet Alert Error
function warning(Mensaje){
    Swal.fire({
        position: "top-center",
        icon: "info",
        title: `Debes completar la información del formulario`,
        text: Mensaje,
        showConfirmButton: true,
        timer: 4000,
    });
};


function validaEntradas(){
    if (title.value.trim() === '') {
        warning('Nombre de quien Reserva');
            // Resaltar el objeto
        title.classList.add('error-input');
        title.focus();
        return true;
    }

    if (desc.value.trim() === '') {
        warning('Correo eletrónico de quien reserva');
        return true;
    }

    if (Lista.value.trim() === 'seleccione Mesa') {
        warning('Reservar Capacidad de Personas ');
        return true;
    }

    if (fecha.value.trim() === '') {
        warning('Seleccionar una fecha');
        return true;
    }
    
    if (hora.value.trim() === '') {
        warning('Seleccionar una hora');
        return true;
    }
    return false;
}




// guaradermos en un array tarea los objetos
//const tareas = [tarea1, tarea2, tarea3]
//console.log(tareas)
//localStorage.setItem('Tareas',JSON.stringify(tareas))