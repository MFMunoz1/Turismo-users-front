var condicionesDeUso = [];
var arrayCondicionesDeUso =[];
var selectCondiciones;
var form = document.getElementById('condicionesDeUsoForm');
var selectAccion = document.getElementById('selectAccion');
var inputNombreCondicion = document.getElementById('inputcond');
var agregarElementoLista = document.getElementById('agregarCondicion');
var enviarLista = document.getElementById('btnEnviarLista');
var eliminarCondicion = document.getElementById('btnEliminarCondicion');


form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    // añadiendo lista de serivicion a object plain 
    const plainObjectFormData = Object.fromEntries(formData.entries());
    condicionesDeUso.push(plainObjectFormData);

    //alert("Elemento agregado a la lista");
    
    return false; 
});

 enviarLista.disabled = true;
 agregarElementoLista.disabled = true;
function contieneElemento(){

    agregarElementoLista.disabled = true;
    enviarLista.disabled = false;
}

function validarNombreVacio(valor){
    $(document).ready(function() {
        
            //var inputNombre = $('#inputNombre').val();
            var inputNombre = document.getElementById("inputcond").value;
            //enviarLista.disabled = true;
            //agregarElementoLista.disabled = true;

            if(inputNombre == "" || inputNombre == null){
                $('#errorVacio').text("Ingrese una condición").css("color", "red");
                agregarElementoLista.disabled = true;
                enviarLista.disabled = true;
            }
            else{
                $('#errorVacio').text("")
                agregarElementoLista.disabled = false;
                enviarLista.disabled = false;
            }
            
            // }else if (inputNombre != null || inputNombre != "" ){
            //     $('#errorVacio').text("");
            //     agregarElementoLista.disabled = false;
            //     enviarLista.disabled = false;
            // }
        })
    
}



var btnEnviarLista = document.getElementById('btnEnviarLista');
btnEnviarLista.addEventListener('click', ()=>{
    console.log(condicionesDeUso)

    fetch("http://localhost:8085/mantenedor/crear-condiciones-de-uso",
    {
    
       body: JSON.stringify(condicionesDeUso),
       method: "post",
       mode: "cors",
       headers: {
           'Access-Control-Allow-Origin': '*',
           "Content-Type": "application/json",
		   "Accept": "application/json"
        }
    }).then(
        
        console.log("200"),
        alert("Condición creada exitosamente"),
        selectAccion.value = "Selected",
        inputNombreCondicion.value = "",
        location.reload(),
    );
})

window.addEventListener('load', async (event) => {
    // hace un get al endpoint indicado
    const respuesta = await fetch("http://localhost:8085/mantenedor/listar-condiciones");
    if(respuesta.status === 200) {
        arrayCondicionesDeUso = await respuesta.json();
        selectCondiciones = document.getElementById("selectCondicionDeUso");
        arrayCondicionesDeUso.forEach(condicion => {
            var option = document.createElement("option");
            option.value = condicion.idCondicion
            option.text = condicion.tipoCondicionDeUso
            selectCondiciones.add(option)
        })
    }else if(respuesta.status === 401) {
        console.log("error 401")
    } else if(respuesta.status === 404) {
        console.log("error 404")
    }
});


var btnEliminarCondicion = document.getElementById('btnEliminarCondicion');
btnEliminarCondicion.addEventListener('click', ()=>{
    selectCondiciones = document.getElementById("selectCondicionDeUso");
    var idCondicionDeUso =  selectCondiciones.value;
    console.log(idCondicionDeUso)
    var ruta = "http://localhost:8085/mantenedor/eliminar-condicion-de-uso?idCondicionDeUso=" + idCondicionDeUso;
    console.log(ruta);
    fetch(ruta, {
    method: "DELETE",
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Accept": "application/json"
     }
 }).then(
     
    console.log("200"),
    alert("Condición eliminada exitosamente"),
    location.reload(),
    selectCondiciones.remove(idCondicionDeUso),
    selectAccion.value = "Selected"
    
 );

    });


let url_condicionesUso = "http://localhost:8085/mantenedor/listar-condiciones";
fetch(url_condicionesUso)
    .then(response => response.json())
    .then(data => mostrarData_condicionesUso(data))
    .catch(error => console.log(error))
    
    
        const mostrarData_condicionesUso = (data) =>{
            console.log(data);
            let body = ""
            for(let i = 0; i< data.length; i++){
                body += `<tr><td>${data[i].idCondicion}</td><td>${data[i].tipoCondicionDeUso}</td></tr>`
            }
            document.getElementById('data-condicionesDeUso').innerHTML = body
        }

//-------------------------------------VALIDACIONES-------------------------------------------------------------------
//PERMITIR SOLO TEXTO CAMPO "NOMBRE Y APELLIDO"
function nombreCondicion() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     event.returnValue = false;
}