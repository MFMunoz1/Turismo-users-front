var selectTipoServicioExtra;
var fotoTourList = [];

$.ajax({
    url : "http://localhost:8085/mantenedor/listar-regiones",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        $.each(data, function( index, region ) {
            $('#select-region').append($('<option>', {
                value: region.nombreRegion,
                text: region.nombreRegion
            }));
        });
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener regiones");
    }
});

function cargarComunas(){

    $('#select-comuna')
    .find('option')
    .remove()
    .end()
    .append('<option value="Seleccione la comuna">Seleccione la comuna</option>')
    .val('Seleccione la comuna');

    let region = $('#select-region').find(":selected").text();

    $.ajax({
        url : "http://localhost:8085/mantenedor/listar-comunas?region="+region,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            $.each(data, function( index, comuna ) {
                $('#select-comuna').append($('<option>', {
                    value: comuna.nombreComuna,
                    text: comuna.nombreComuna
                }));
            });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener comunas");
        }
    });
}

selectTipoServicioExtra= document.getElementById('selectServicioExtra');

console.log(selectTipoServicioExtra.value);
// var IdServicioExtra = selectTipoServicioExtra.value;

var form = document.getElementById('formularioCrearServicioExtra');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);

    

    const plainObjectFormData = Object.fromEntries(formData.entries());
    plainObjectFormData.estado = true;

    if(plainObjectFormData.region === "Seleccione la región"){
        alert("Debe seleccionar una región");
        return false;
    }
    if(plainObjectFormData.comuna === "Seleccione la comuna"){
        alert("Debe seleccionar una comuna");
        return false;
    }

    plainObjectFormData.fotoTourList = fotoTourList
    var endpoint = "";
    if (selectTipoServicioExtra.value == "1") {
        endpoint="crear-servicio-extra-tour"
    }else if (selectTipoServicioExtra.value == "2"){
        endpoint="crear-servicio-extra-transporte"
    }else {
        console.log("se selecciono un value invalido")
        return false;
    }

    console.log(JSON.stringify(plainObjectFormData))

    var fullEndpoint = "http://localhost:8085/servicio-extra/" + endpoint 
    fetch(fullEndpoint,{
        body: JSON.stringify(plainObjectFormData),
        method: "post",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            "Accept": "application/json"
         }
    }).then(console.log("200")),
    alert("Servicio extra creado exitosamente"),
    location.reload()
        
})

var toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

var btnCargarFoto = document.getElementById("btn-cargar-foto");
var tableImagenesTour = document.getElementById("table-body-imagenes-tour")
btnCargarFoto.addEventListener('click', async function(){
    // cargar imagen
    const userFile = document.getElementById('formFile').files[0];
    const tituloImagen = document.getElementById('titulo-imagen').value;
    var trForImage = document.createElement("tr");
    var tdTitle = document.createElement("td")
    var tdImagen = document.createElement("td")
    var imgForImagen = document.createElement("img")
    var image64 = await toBase64(userFile);

    imgForImagen.src = image64
    imgForImagen.width = 100
    imgForImagen.height = 100

    tdTitle.textContent = tituloImagen
    
    var fotoEnviar = {
        "tituloFotoTour": tituloImagen,
        "fotoTourString": image64
    }

    tdImagen.appendChild(imgForImagen);
    trForImage.appendChild(tdTitle)
    trForImage.appendChild(tdImagen)
    tableImagenesTour.appendChild(trForImage)
    fotoTourList.push(fotoEnviar);
    console.log(fotoTourList)
})


//-------------------------------VALIDACIONES-------------------------------------------
//PERMITIR SOLO TEXTO CAMPO "NOMBRE Y APELLIDO"
function txNombres() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     event.returnValue = false;
}


