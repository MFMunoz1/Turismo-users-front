var serviciosDepto = [];
var arrayServicioDepto =[];
var selectServiciosDepto;
var form = document.getElementById('servicioDeptoForm');

var selectAccionServicio = document.getElementById("selectAccionServicio");
var inputNombreServicio = document.getElementById("inputname");
var agregarElementoLista = document.getElementById('agregarServicio');
var enviarLista = document.getElementById('btnEnviarLista');
var eliminarServicio = document.getElementById('btnEliminarServicioDepto');
//POR DEFECTO LOS BOTONES ESTÁN DESHABILITADOS
enviarLista.disabled = true;
agregarElementoLista.disabled = true;
eliminarServicio.disabled = true;


form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    // añadiendo lista de serivicion a object plain 
    const plainObjectFormData = Object.fromEntries(formData.entries());
    serviciosDepto.push(plainObjectFormData)
    
    return false; 
});

function contieneElemento(){
    agregarElementoLista.disabled = true;
    enviarLista.disabled = false;
}

//VALIDA QUE EL INPUT NO ESTÉ VACÍO.
//ACCIÓN: CREAR CONDICIÓN
function validarNombreVacio(valor){
    $(document).ready(function() {

            var inputNombre = document.getElementById("inputname").value;

            if(inputNombre == "" || inputNombre == null){
                $('#errorVacio').text("Ingrese una servicio").css("color", "red");
                agregarElementoLista.disabled = true;
                enviarLista.disabled = true;
            }
            else{
                $('#errorVacio').text("")
                //se habilitan botones
                agregarElementoLista.disabled = false;
                //enviarLista.disabled = false;
            }
        })
}
// psicologicas pruebas
// mañana 5 
//VALIDA QUE SE SELECCIONE UN ELEMENTO DE LA LISTA DEL COMBOBOX
function validarServicioVacio(valor){
    $(document).ready(function() {

            var opcionServicio = document.getElementById("select-serviciosDepto");

            if(opcionServicio.value == "0"){
                $('#errorVacio').text("Seleccione servicio").css("color", "red");
                eliminarServicio.disabled = true;
            }
            else{
                $('#errorVacio').text("")
                //se habilitan botones
                eliminarServicio.disabled = false;
                //enviarLista.disabled = false;
            }
        })
}


var btnEnviarLista = document.getElementById('btnEnviarLista');
btnEnviarLista.addEventListener('click', ()=>{
    console.log(serviciosDepto)

    fetch("http://localhost:8085/mantenedor/crear-servicio-depto",
    {
    
       body: JSON.stringify(serviciosDepto),
       method: "post",
       mode: "cors",
       headers: {
           'Access-Control-Allow-Origin': '*',
           "Content-Type": "application/json",
		   "Accept": "application/json"
        }
    }).then(
        
        console.log("200"),
        alert("Servicio depto creado exitosamente"),
        selectAccionServicio.value = "Selected",
        inputNombreServicio.value = "",
        location.reload(),
    );
})



//---------------CARGAR SELECT CON VALORES DE LA BDD

window.addEventListener('load', async (event) => {
    // hace un get al endpoint indicado
    const respuesta = await fetch("http://localhost:8085/mantenedor/listar-servicios-depto");
    if(respuesta.status === 200) {
        arrayServicioDepto = await respuesta.json();
        selectServiciosDepto = document.getElementById("select-serviciosDepto");
        arrayServicioDepto.forEach(servicioDepto => {
            var option = document.createElement("option");
            option.value = servicioDepto.idServicioDepto
            option.text = servicioDepto.tipoServicioDepto
            selectServiciosDepto.add(option)
        })
    }else if(respuesta.status === 401) {
        console.log("error 401")
    } else if(respuesta.status === 404) {
        console.log("error 404")
    }
});


var btnEliminarServicioDepto = document.getElementById('btnEliminarServicioDepto');
btnEliminarServicioDepto.addEventListener('click', ()=>{
    selectServiciosDepto = document.getElementById("select-serviciosDepto");
    var idServicioSeleccionado =  selectServiciosDepto.value;
    console.log(idServicioSeleccionado)
    var ruta = "http://localhost:8085/mantenedor/eliminar-servicio?idServicioDepto=" + idServicioSeleccionado;
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
    alert("Servicio depto eliminado exitosamente"),
    location.reload(),
    selectServiciosDepto.remove(idServicioSeleccionado),
    selectAccionServicio.value = "Selected"
 );

    });


    let url_servicioDepto = "http://localhost:8085/mantenedor/listar-servicios-depto";
    fetch(url_servicioDepto)
        .then(response => response.json())
        .then(data => mostrarData_servicioDepto(data))
        .catch(error => console.log(error))
    
    
            const mostrarData_servicioDepto = (data) =>{
                console.log(data);
                let body = ""
                for(let i = 0; i< data.length; i++){
                    body += `<tr><td>${data[i].idServicioDepto}</td><td>${data[i].tipoServicioDepto}</td></tr>`
                }
                document.getElementById('data_serviciosDepto').innerHTML = body
            }
    

//---------------------------VALIDACIONES-----------------------------------------------------------------------------------------
//PERMITIR SOLO TEXTO CAMPO "NOMBRE Y APELLIDO"
function nombreServicio() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     event.returnValue = false;
}