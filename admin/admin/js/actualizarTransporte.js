var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var transporteActualizar = {};

async function cargarRegiones() {
    const response = await fetch('http://localhost:8085/mantenedor/listar-regiones');
    const regiones = await response.json();
    $.each(regiones, function( index, region ) {
        $('#select-region').append($('<option>', {
            value: region.nombreRegion,
            text: region.nombreRegion
        }));
    });
}

async function cargarComunas() {
    $('#select-comuna')
    .find('option')
    .remove()
    .end()
    .append('<option value="Seleccione la comuna">Seleccione la comuna</option>')
    .val('Seleccione la comuna');

    let region = $('#select-region').find(":selected").text() !== "" ? $('#select-region').find(":selected").text() : transporteActualizar.region;

    const response = await fetch('http://localhost:8085/mantenedor/listar-comunas?region='+region);
    const comunas = await response.json();
    $.each(comunas, function( index, comuna ) {
        $('#select-comuna').append($('<option>', {
            value: comuna.nombreComuna,
            text: comuna.nombreComuna
        }));
    });
}

async function buscarTransporte(){
    await cargarRegiones();
    await $.ajax({
        url : "http://localhost:8085/servicio-extra/buscar-transporte-id?id="+id,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            transporteActualizar = data;
            $('#txt-persona-a-cargo').val(data.personaACargo);
            $('#txt-modelo').val(data.modelo);
            $('#txt-marca').val(data.marca);
            $('#txt-patente').val(data.patente);
            $('#txt-capacidad-pasajeros').val(data.capacidadPasajeros);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener transportes");
        }
    });
    $('#select-region').val(transporteActualizar.region);
    await cargarComunas();
    $('#select-comuna').val(transporteActualizar.comuna);
}

buscarTransporte();

const botonConfirmDatos = document.getElementById('btn-confirm-datos');
botonConfirmDatos.addEventListener('click', function (e) {
    if (window.confirm('¿Desea modificar los datos?')) {
        modificarDatos();
    } 
});

function modificarDatos(){

    transporteActualizar.personaACargo = $('#txt-persona-a-cargo').val();
    transporteActualizar.capacidadPasajeros = $('#txt-titulo').val();
    transporteActualizar.modelo = $('#txt-modelo').val();
    transporteActualizar.marca = $('#txt-marca').val();
    transporteActualizar.patente = $('#txt-patente').val();
    transporteActualizar.region = $('#select-region').find(":selected").text();
    transporteActualizar.comuna = $('#select-comuna').find(":selected").text();

    $.ajax({
        url : "http://localhost:8085/servicio-extra/actualizar-transporte",
        type: "POST",
        data : JSON.stringify(transporteActualizar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar datos")
        }
    });
}