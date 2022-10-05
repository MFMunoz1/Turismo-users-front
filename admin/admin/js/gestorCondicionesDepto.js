var inputCondicion = document.getElementById("txt-condicion");



$.ajax({
    url : "http://localhost:8085/mantenedor/listar-condiciones",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        let body = ""
        $.each(data, function( index, condicion ) {
            body += `<tr>
            <td>${condicion.idCondicion}</td>
            <td>${condicion.tipoCondicionDeUso}</td>
            <td><button value=${condicion.idCondicion} class="btn btn-danger col-sm-12" onclick="eliminarCondicion(this.value)">Eliminar</button></td>
            </tr>`
        });
        document.getElementById('condiciones').innerHTML = body
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener condiciones de uso");
    }
});

function eliminarCondicion(idCondicion){
    $.ajax({
        url : "http://localhost:8085/mantenedor/eliminar-condicion-de-uso?idCondicionDeUso="+idCondicion,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al eliminar condición de uso")
        }
    });
}


function crearCondicion(){

    if($('#txt-condicion').val() === ""){
        alert("La condición no puede estar vacía");
        return;
    }

    var condicion = {
        tipoCondicionDeUso: $('#txt-condicion').val()
    }

    $.ajax({
        url : "http://localhost:8085/mantenedor/crear-condiciones-de-uso",
        type: "POST",
        data : JSON.stringify(condicion),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            alert("Condición de uso creada exitosamente");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al crear condición de uso")
        }
    });
}

//VALIDAR INPUT CONDICION SOLO TEXTO
function txNombres() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     event.returnValue = false;
}

