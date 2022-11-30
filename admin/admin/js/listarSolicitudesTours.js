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
                if(solicitud.tipoServicio === "transporte"){
                    return;
                }
                let estadoSolicitud = solicitud.fechaPlanificacion !== null && solicitud.fechaPlanificacion !== undefined ? "Planificada" : "Pendiente";
                /**<th scope="col">ID</th>
                                    <th scope="col">Fecha Solicitud</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col"></th> */
                body += `<tr>
                <td>${solicitud.idSolicitud}</td>
                <td>${solicitud.personas}</td>
                <td>${solicitud.fechaSolicitud.split("T")[0]}</td>
                <td>${estadoSolicitud === "Planificada" ? solicitud.fechaPlanificacion.split("T")[0] : "Sin planificar"}</td>
                <td>${estadoSolicitud}</td>`;
                if(estadoSolicitud === "Pendiente"){
                    body += `<td><button onclick="cargarInfoModalTours(${solicitud.idSolicitud},${solicitud.idReserva}, '${solicitud.personas}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-tour">Planificar</button></td>`;
                }
                else{
                    body += `<td><button disabled class="btn btn-primary">Planificar</button></td>`;
                }
                body += `</tr>`;
            });
            document.getElementById('solicitudesTours').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener solicitudes");
        }
    });
}

let solicitudAsignada = null;

async function cargarInfoModalTours(idSolicitud, idReserva, personas){
    solicitudAsignada = idSolicitud;

    let reservaResponse = await fetch(
        'http://localhost:8085/reserva/obtener-reserva?id='+idReserva);
    let reservaAsignada = await reservaResponse.json();

    $("#dato-id-reserva").html("ID Reserva: "+reservaAsignada.idReserva);
    $("#dato-estado-reserva").html("Estado reserva: "+reservaAsignada.estadoReserva.glosa);
    $("#dato-nombre-depto").html("Nombre departamento: "+reservaAsignada.departamento.nombreDepto);
    $("#dato-region-depto").html("Region: "+reservaAsignada.departamento.region);
    $("#dato-comuna-depto").html("Comuna: "+reservaAsignada.departamento.comuna);

    $("#fecha-planificacion").val(reservaAsignada.fechaLlegada.split("T")[0]);

    $("#dato-solicitud-personas").html("Cantidad de personas: "+personas);
}

async function planificarTour(){
    let solicitudResponse = await fetch(
        'http://localhost:8085/servicio-extra/buscar-solicitud?id='+solicitudAsignada);
    let solicitudResponseJson = await solicitudResponse.json();

    let fechaPlanificacion = $("#fecha-planificacion").val();
    let horaPlanificacion = $("#hora-planificacion").val();

    let dateMomentObject = moment(fechaPlanificacion+" "+horaPlanificacion, "YYYY-MM-DD hh:mm"); // 1st argument - string, 2nd argument - format
    let datePlanificacion = dateMomentObject.toDate();

    solicitudResponseJson.fechaPlanificacion = datePlanificacion;

    $.ajax({
        url : "http://localhost:8085/servicio-extra/planificar-servicio",
        type: "POST",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(solicitudResponseJson),
        success: function(data, textStatus, jqXHR)
        {
            alert("Tour planificado con éxito");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al planificar tour");
        }
    });
}