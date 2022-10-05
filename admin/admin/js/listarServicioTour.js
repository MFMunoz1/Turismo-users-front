$.ajax({
    url : "http://localhost:8085/servicio-extra/listar-regiones-tour",
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
        url : "http://localhost:8085/servicio-extra/listar-comunas-tour?region="+region,
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
    url : "http://localhost:8085/servicio-extra/listar-tours",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        let body = ""
        $.each(data, function( index, tour ) {
            body += `<tr>
            <td>${tour.idServicioExtra}</td>
            <td>${tour.tituloTour}</td>
            <td>${tour.personaACargo}</td>
            <td>${tour.cantidadPersonasMax}</td>
            <td>${tour.region}</td>
            <td>${tour.comuna}</td>
            <td>${tour.descripcionTour}</td>
            <td>${tour.valorTour}</td>
            <td><a class="btn btn-sm btn-primary" href="actualizarTourFormulario.html?id=${tour.idServicioExtra}">Actualizar</a></td>
            <td><button value=${tour.idServicioExtra} class="btn btn-danger col-sm-12" onclick="cambiarEstadoTour(this.value, false)">Eliminar</button></td>
            </tr>`
        });
        document.getElementById('servicioTours').innerHTML = body
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener Tours");
    }
});

function buscarTours(){

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
        url : "http://localhost:8085/servicio-extra/listar-tour-region-comuna?region="+region+"&comuna="+comuna,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, tour ) {
                body += `<tr>
                <td>${tour.idServicioExtra}</td>
                <td>${tour.tituloTour}</td>
                <td>${tour.personaACargo}</td>
                <td>${tour.cantidadPersonasMax}</td>
                <td>${tour.region}</td>
                <td>${tour.comuna}</td>
                <td>${tour.descripcionTour}</td>
                <td>${tour.valorTour}</td>
                <td><a class="btn btn-sm btn-primary" href="actualizarTourFormulario.html?id=${tour.idServicioExtra}">Actualizar</a></td>
                <td><button value=${tour.idServicioExtra} class="btn btn-danger col-sm-12" onclick="cambiarEstadoTour(this.value, false)">Eliminar</button></td>
                </tr>`
            });
            document.getElementById('servicioTours').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener Tours");
        }
    });
}

function cambiarEstadoTour(idServicio, estado){
    $.ajax({
        url : "http://localhost:8085/servicio-extra/estado-tour?idTour="+idServicio+"&estado="+estado,
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar estado de tour")
        }
    });
}