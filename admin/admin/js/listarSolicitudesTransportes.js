function buscarSolicitudes(){
    $.ajax({
        url : "http://localhost:8085/servicio-extra/buscar-solicitudes",
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, solicitud ) {
                body += `<tr>
                <td>${solicitud.idSolicitud}</td>
                <td>${solicitud.fechaSolicitud.split("T")[0]}</td>
                <td>${solicitud.origen}</td>
                <td>${solicitud.destino}</td>
                <td>Pendiente</td>
                <td><button onclick="cargarInfoModalTransportes(${solicitud.idSolicitud},${solicitud.idReserva},'${solicitud.origen}','${solicitud.destino}', '${solicitud.personas}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-transporte">Planificar</button></td>
                </tr>`
            });
            document.getElementById('solicitudesTransportes').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener regiones");
        }
    });
}

let solicitudAsignada = null;

async function cargarInfoModalTransportes(idSolicitud, idReserva, origen, destino, personas){
    solicitudAsignada = idSolicitud;

    let reservaResponse = await fetch(
        'http://localhost:8085/reserva/obtener-reserva?id='+idReserva);
    let reservaAsignada = await reservaResponse.json();

    $("#dato-id-reserva").html("ID Reserva: "+reservaAsignada.idReserva);
    $("#dato-estado-reserva").html("Estado reserva: "+reservaAsignada.estadoReserva.glosa);
    $("#dato-nombre-depto").html("Nombre departamento: "+reservaAsignada.departamento.nombreDepto);
    $("#dato-region-depto").html("Region: "+reservaAsignada.departamento.region);
    $("#dato-comuna-depto").html("Comuna: "+reservaAsignada.departamento.comuna);

    $("#dato-solicitud-origen").html("Origen: "+origen);
    $("#dato-solicitud-destino").html("Destino: "+destino);
    $("#dato-solicitud-personas").html("Cantidad de personas: "+personas);

    let transportesResponse = await fetch(
        'http://localhost:8085/servicio-extra/listar-transporte-region-comuna?region='+reservaAsignada.departamento.region+'&comuna='+reservaAsignada.departamento.comuna+"&personas="+personas);
    let transportesResponseJSON = await transportesResponse.json();

    let transportesBody = "";
    $.each(transportesResponseJSON, function( index, transporte ) {
        transportesBody += `<tr>
        <td>${transporte.idServicioExtra}</td>
        <td>${transporte.marca+" "+transporte.modelo}</td>
        <td>${transporte.patente}</td>
        <td>${transporte.personaACargo}</td>
        <td><input type="radio" id="${transporte.idServicioExtra}" name="radio_transporte" value="${transporte.idServicioExtra}"></td>
        </tr>`
    });
    document.getElementById('transportesDisponibles').innerHTML = transportesBody

}

async function asignarTransporte(){
    let solicitudResponse = await fetch(
        'http://localhost:8085/servicio-extra/buscar-solicitud?id='+solicitudAsignada);
    let solicitudResponseJson = await solicitudResponse.json();

    let fechaPlanificacion = $("#fecha-planificacion").val();
    let horaPlanificacion = $("#hora-planificacion").val();
    let idServicioExtra = $('input[name="radio_transporte"]:checked').val();

    let dateMomentObject = moment(fechaPlanificacion+" "+horaPlanificacion, "YYYY/MM/DD HH:MM"); // 1st argument - string, 2nd argument - format
    let datePlanificacion = dateMomentObject.toDate();

    solicitudResponseJson.servicioExtra = {
        idServicioExtra: idServicioExtra
    };
    solicitudResponseJson.fechaPlanificacion = datePlanificacion;


}