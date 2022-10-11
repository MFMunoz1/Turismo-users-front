

function buscarReservas(){
    var valueFecha = $('#select-fecha').val();
    var valueEstado = $('#select-estado').val();

    var request = {};

    var fechaActual = moment().format("YYYY-MM-DD");

    if(valueEstado != 0){
        request.estado = valueEstado;
    }
    if(valueFecha != 0){
        if(valueFecha == 1){
            request.fechaLlegada = fechaActual;
        }
        else{
            request.fechaSalida = fechaActual;
        }
    }


    $.ajax({
        url : "http://localhost:8085/reserva/obtener-reservas-filtro",
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: request,
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, reserva ) {
                var fechaLlegadaReserva = reserva.fechaLlegada.split("T")[0];
                var fechaSalidaReserva = reserva.fechaSalida.split("T")[0]
                var tipoCheckList = fechaLlegadaReserva == fechaActual ? "checkin" : fechaSalidaReserva == fechaActual ? "checkout" : "ninguno";
                body += `<tr>
                <td>${reserva.idReserva}</td>
                <td>${reserva.departamento.idDepartamento}</td>
                <td>${reserva.departamento.nombreDepto}</td>
                <td>${reserva.clienteUsuario.nombreCliente}</td>
                <td>${reserva.fechaLlegada.split("T")[0]}</td>
                <td>${reserva.fechaSalida.split("T")[0]}</td>
                <td>${reserva.estadoReserva.glosa}</td>
                <td>${reserva.montoPrepago}</td>`;
                if(tipoCheckList === "ninguno"){
                    body += `<td><a class="btn btn-sm btn-primary disabled">Ingresar</a></td>`;
                }else{
                    body += `<td><a class="btn btn-sm btn-primary" href="crear-checklist.html?tipo=${tipoCheckList}&id=${reserva.idReserva}">Ingresar</a></td>`;
                }
                if(reserva.checklistList == null || reserva.checklistList.length == 0){
                    body += `<td><a class="btn btn-sm btn-primary disabled">Checklists</a></td>`;
                }else{
                    body += `<td><a class="btn btn-sm btn-primary" href="ver-checklists.html?id=${reserva.idReserva}">Checklists</a></td>`;
                }
                body += `</tr>`
            });
            document.getElementById('reservas_checklist').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener reservas");
        }
    });
}

buscarReservas();

