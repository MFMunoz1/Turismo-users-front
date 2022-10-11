function mostrarFormularioCostoReparacion(){
    var urlParams = new URLSearchParams(window.location.search);
    var tipo = urlParams.get('tipo');

    if(tipo === "checkout"){
        let formularioCosto = `<hr>
        <div class="bg-light rounded p-4">
            <h6 class="mb-4">Ingresar costo de reparación (si aplica)</h6>
            <form name="fchecklist">
                <div class="row mb-3 element1">
                    <label class="col-sm-3 col-form-label">Título de reparación</label> 
                    <div class="col-sm-9">
                        <input id="txt-titulo-reparacion" class="form-control"></input>
                    </div>
                </div>
                <div class="row mb-3 element1">
                    <label class="col-sm-3 col-form-label">Costo reparación</label> 
                    <div class="col-sm-9">
                        <input id="txt-costo-reparacion" type="number" class="form-control"></input>
                    </div>
                </div>
                <div class="row mb-3 ob8 obs">
                    <label class="col-sm-3 col-form-label">Descripción</label>
                    <div class="col-sm-9">
                        <input id="txt-costo-descripcion" class="form-control"></input>
                    </div>
                </div>
            </form>
        </div>`;
        document.getElementById("div-costo-reparacion").innerHTML = formularioCosto;
    }
}

function buscarReserva(){

    var urlParams = new URLSearchParams(window.location.search);
    var idReserva = urlParams.get('id')
    var tipo = urlParams.get('tipo')

    document.getElementById("lbl-tipo-checklist").innerHTML = "Tipo de checklist: <b>"+tipo+"</b>";

    var request = {
        id: idReserva
    }

    $.ajax({
        url : "http://localhost:8085/reserva/obtener-reserva",
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: request,
        success: function(data, textStatus, jqXHR)
        {
            document.getElementById("lbl-cliente").innerHTML = "Cliente: <b>"+data.clienteUsuario.nombreCliente+"</b>";
            document.getElementById("lbl-rut").innerHTML = "Rut: <b>"+data.clienteUsuario.rutCliente+"</b>";
            document.getElementById("lbl-depto").innerHTML = "Departamento: <b>"+data.departamento.nombreDepto+"</b>";
            document.getElementById("lbl-direccion").innerHTML = "Direccion: <b>"+data.departamento.direccion+"</b>";
            document.getElementById("lbl-periodo").innerHTML = "Periodo reserva: <b>"+data.fechaLlegada.split("T")[0]+" - "+data.fechaSalida.split("T")[0]+"</b>";
            if(data.estadoReserva.idEstadoReserva == 6){
                document.getElementById("lbl-pago-restante").innerHTML = "Restante de pago: <b>$ 0</b>";
            }
            else{
                document.getElementById("lbl-pago-restante").innerHTML = "Restante de pago: <b>$ "+data.montoPrepago+"</b>";
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener reserva");
        }
    });
}

function buscarChecklistsReserva(){

    var urlParams = new URLSearchParams(window.location.search);
    var idReserva = urlParams.get('id')

    var request = {
        id: idReserva
    }

    $.ajax({
        url : "http://localhost:8085/reserva/obtener-reserva",
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: request,
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data.checklistList, function( index, checklist ) {
                body += `<tr>
                <td>${checklist.idChecklist}</td>
                <td>${data.idReserva}</td>
                <td>${checklist.tipoChecklist}</td>
                <td>${checklist.inspeccionCocina}</td>
                <td>${checklist.inspeccionHabitaciones}</td>
                <td>${checklist.inspeccionBanio}</td>
                <td>${checklist.inspeccionLiving}</td>
                <td>${checklist.inspeccionTerraza}</td>
                <td>${checklist.aguaCaliente}</td>
                <td>${checklist.luz}</td>
                <td>${checklist.refrigerador}</td>
                <td>${checklist.estadoChecklist.glosa}</td>`;
                if(checklist.observaciones != null && checklist.observaciones != ""){
                    body += `<td><button onclick="setObservacion('${checklist.observaciones}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-observaciones">Ver</button></td>`;
                }else{
                    body += `<td>Sin Observaciones</td>`;
                }
                body += `</tr>`
            });
            document.getElementById('checklists').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener checklists");
        }
    });
}

function setObservacion(observacion){
    $("#div-observaciones").html(observacion);
}

function ingresarChecklist(){

    var urlParams = new URLSearchParams(window.location.search);
    var idReserva = urlParams.get('id')
    var tipo = urlParams.get('tipo')

    var inspeccionCocina = $('#select-cocina').val() == 1 || $('#select-cocina').val() == 2;
    var inspeccionHabitaciones = $('#select-habitacion').val() == 1 || $('#select-habitacion').val() == 2;
    var inspeccionBanio = $('#select-banio').val() == 1 || $('#select-banio').val() == 2;
    var inspeccionLiving = $('#select-living').val() == 1 || $('#select-living').val() == 2;
    var inspeccionTerraza = $('#select-terraza').val() == 1 || $('#select-terraza').val() == 2;
    var aguaCaliente = $('#select-agua').val() == 1 || $('#select-agua').val() == 2;
    var luz = $('#select-luz').val() == 1 || $('#select-luz').val() == 2;
    var inspeccionRefrigerador = $('#select-refrigerador').val() == 1 || $('#select-refrigerador').val() == 2;


    var resultadoInspeccion = inspeccionCocina && inspeccionHabitaciones && inspeccionBanio && 
                                inspeccionLiving && inspeccionTerraza && aguaCaliente && luz && inspeccionRefrigerador;

    var request = {
        tipoChecklist: tipo,
        inspeccionCocina: $('#select-cocina').find(":selected").text(),
        inspeccionHabitaciones: $('#select-habitacion').find(":selected").text(),
        inspeccionBanio: $('#select-banio').find(":selected").text(),
        inspeccionLiving: $('#select-living').find(":selected").text(),
        inspeccionTerraza: $('#select-terraza').find(":selected").text(),
        aguaCaliente: $('#select-agua').find(":selected").text(),
        luz: $('#select-luz').find(":selected").text(),
        refrigerador: $('#select-refrigerador').find(":selected").text(),
        observaciones: $('#txt-observacion').val(),
        idReserva: idReserva,
        estadoChecklist: {
            idEstadoChecklist: resultadoInspeccion ? 1 : 2
        }

    }

    $.ajax({
        url : "http://localhost:8085/reserva/crear-checklist",
        type: "POST",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request),
        success: function(data, textStatus, jqXHR)
        {
            if(tipo === 'checkout' && !resultadoInspeccion){
                ingresarCostoReparacion();
            }
            alert("Checklist creado");
            window.location.replace("checklist-reservas.html");
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al ingresar checklist");
        }
    });

}


async function ingresarCostoReparacion(){

    var urlParams = new URLSearchParams(window.location.search);
    var idReserva = urlParams.get('id')

    var request = {
        tituloReparacion: $('#txt-titulo-reparacion').val(),
        costoReparacion: $('#txt-costo-reparacion').val(),
        descripcion: $('#txt-costo-descripcion').val(),
        idReserva: idReserva
    }

    await $.ajax({
        url : "http://localhost:8085/reserva/crear-costo-reparacion",
        type: "POST",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request),
        success: function(data, textStatus, jqXHR)
        {
            console.log("Costo creado");
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log("Error al ingresar costo");
        }
    });
}
