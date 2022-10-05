$.ajax({
    url : "http://localhost:8085/mantenedor/listar-servicios-depto",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        let body = ""
        $.each(data, function( index, servicio ) {
            body += `<tr>
            <td>${servicio.idServicioDepto}</td>
            <td>${servicio.tipoServicioDepto}</td>
            <td><button value=${servicio.idServicioDepto} class="btn btn-danger col-sm-12" onclick="eliminarServicioDepto(this.value)">Eliminar</button></td>
            </tr>`
        });
        document.getElementById('servicios').innerHTML = body
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener servicios depto");
    }
});

function eliminarServicioDepto(idServicio){
    $.ajax({
        url : "http://localhost:8085/mantenedor/eliminar-servicio?idServicioDepto="+idServicio,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al eliminar servicio depto")
        }
    });
}

function crearServicio(){

    if($('#txt-servicio').val() === ""){
        alert("El servicio no puede estar vacío");
        return;
    }

    var servicio = {
        tipoServicioDepto: $('#txt-servicio').val()
    }

    $.ajax({
        url : "http://localhost:8085/mantenedor/crear-servicio-depto",
        type: "POST",
        data : JSON.stringify(servicio),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            alert("Servicio creado exitosamente");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al crear servicio depto")
        }
    });
}


//VALIDAR INPUT SERVICIO SOLO TEXTO
function txNombres() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     event.returnValue = false;
}