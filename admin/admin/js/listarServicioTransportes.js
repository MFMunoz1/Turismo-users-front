$.ajax({
    url : "http://localhost:8085/servicio-extra/listar-regiones-transporte",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        $.each(data, function( index, region ) {
            $('#select-region').append($('<option>', {
                value: index,
                text: region
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
    .append('<option value="0">Seleccione la comuna</option>')
    .val('Seleccione la comuna');

    let region = $('#select-region').find(":selected").text();

    $.ajax({
        url : "http://localhost:8085/servicio-extra/listar-comunas-transporte?region="+region,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            $.each(data, function( index, comuna ) {
                $('#select-comuna').append($('<option>', {
                    value: index,
                    text: comuna
                }));
            });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener comunas");
        }
    });
}

$.ajax({
    url : "http://localhost:8085/servicio-extra/listar-transportes",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        let body = ""
        $.each(data, function( index, transporte ) {
            body += `<tr>
            <td>${transporte.idServicioExtra}</td>
            <td>${transporte.personaACargo}</td>
            <td>${transporte.capacidadPasajeros}</td>
            <td>${transporte.region}</td>
            <td>${transporte.comuna}</td>
            <td>${transporte.patente}</td>
            <td>${transporte.modelo}</td>
            <td>${transporte.marca}</td>
            <td><a class="btn btn-sm btn-primary" href="actualizarTransporteFormulario.html?id=${transporte.idServicioExtra}">Actualizar</a></td>
            <td><button value=${transporte.idServicioExtra} class="btn btn-danger col-sm-12" onclick="cambiarEstadoTransporte(this.value, false)">Eliminar</button></td>
            </tr>`
        });
        document.getElementById('servicioTransportes').innerHTML = body
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener Transportes");
    }
});

function buscarTransportes(){

    var region = $('#select-region').find(":selected").text();
    var comuna = $('#select-comuna').find(":selected").text();

    if(region === "Seleccione la región"){
        alert("Por favor seleccione la región");
        return;
    }
    if(comuna === "Seleccione la comuna"){
        alert("Por favor seleccione la comuna");
        return;
    }

    $.ajax({
        url : "http://localhost:8085/servicio-extra/listar-transporte-region-comuna?region="+region+"&comuna="+comuna,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, transporte ) {
                body += `<tr>
                <td>${transporte.idServicioExtra}</td>
                <td>${transporte.personaACargo}</td>
                <td>${transporte.capacidadPasajeros}</td>
                <td>${transporte.region}</td>
                <td>${transporte.comuna}</td>
                <td>${transporte.patente}</td>
                <td>${transporte.modelo}</td>
                <td>${transporte.marca}</td>
                <td><a class="btn btn-sm btn-primary" href="actualizarTransporteFormulario.html?id=${transporte.idServicioExtra}">Actualizar</a></td>
                <td><button value=${transporte.idServicioExtra} class="btn btn-danger col-sm-12" onclick="cambiarEstadoTransporte(this.value, false)">Eliminar</button></td>
                </tr>`
            });
            document.getElementById('servicioTransportes').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener Transportes");
        }
    });
}

function cambiarEstadoTransporte(idServicio, estado){
    $.ajax({
        url : "http://localhost:8085/servicio-extra/estado-transporte?idTransporte="+idServicio+"&estado="+estado,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar estado de transporte")
        }
    });
}