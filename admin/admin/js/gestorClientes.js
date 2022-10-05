$.ajax({
    url : "http://localhost:8085/cliente-usuario/listar-clientes",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        let body = ""
        $.each(data, function( index, user ) {
            body += `<tr>
            <td>${user.idCliente}</td>
            <td>${user.rutCliente}</td>
            <td>${user.nombreCliente}</td>
            <td>${user.emailCliente}</td>
            <td>${user.telefonoCliente}</td>
            <td>${user.estadoCuenta}</td>
            <td>${user.estadoRut.glosa}</td>
            <td><a class="btn btn-primary" href="actualizarCliente.html?id=${user.idCliente}">Actualizar</a></td>`
            if((user.estadoRut.idEstadoRut == 1 || user.estadoRut.idEstadoRut == 2) && user.estadoCuenta === "Activa"){
                body += `<td><button id=${user.idCliente} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-verificacion" onclick="cargarDatosModal(this.id)">Verificar</button></td>`;
            }else{
                body += `<td><button class="btn btn-primary" disabled >Verificar</button></td>`;
            }

            if(user.estadoCuenta === "Activa"){
                body += `<td><button value=${user.idCliente} class="btn btn-danger col-sm-12" onclick="suspenderCliente(this.value)">Suspender</button></td>`;
            }
            else{
                body += `<td><button disabled class="btn btn-danger col-sm-12">Suspender</button></td>`;
            }
            body += `</tr>`
        });
        document.getElementById('clientes').innerHTML = body
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener clientes");
    }
});

function buscarClientes(){

    var rutCliente = $('#txt-rut').val() === '' ? undefined : $('#txt-rut').val();
    var estadoCuenta = $('#select-estado-cuenta').find(":selected").text() === "Seleccione el estado de cuenta" ? 
                                            undefined : $('#select-estado-cuenta').find(":selected").text();
    var estadoRut = $('#select-estado-rut').find(":selected").text() === "Seleccione el estado de rut" ? 
                                            undefined : $('#select-estado-rut').find(":selected").text();

    $.ajax({
        url : "http://localhost:8085/cliente-usuario/buscar-clientes",
        type: "GET",
        data: {
            rutCliente: rutCliente,
            estadoCuenta: estadoCuenta,
            estadoRut: estadoRut
        },
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, user ) {
                body += `<tr>
                <td>${user.idCliente}</td>
                <td>${user.rutCliente}</td>
                <td>${user.nombreCliente}</td>
                <td>${user.emailCliente}</td>
                <td>${user.telefonoCliente}</td>
                <td>${user.estadoCuenta}</td>
                <td>${user.estadoRut.glosa}</td>
                <td><a class="btn btn-primary" href="actualizarCliente.html?id=${user.idCliente}">Actualizar</a></td>`
                if((user.estadoRut.idEstadoRut == 1 || user.estadoRut.idEstadoRut == 2) && user.estadoCuenta === "Activa"){
                    body += `<td><button id=${user.idCliente} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-verificacion" onclick="cargarDatosModal(this.id)">Verificar</button></td>`;
                }else{
                    body += `<td><button class="btn btn-primary" disabled >Verificar</button></td>`;
                }

                if(user.estadoCuenta === "Activa"){
                    body += `<td><button value=${user.idCliente} class="btn btn-danger col-sm-12" onclick="suspenderCliente(this.value)">Suspender</button></td>`;
                }
                else{
                    body += `<td><button disabled class="btn btn-danger col-sm-12">Suspender</button></td>`;
                }
                body += `</tr>`
            });
            document.getElementById('clientes').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener clientes");
        }
    });
}

function suspenderCliente(idUsuario){

    if (window.confirm('¿Desea suspender esta cuenta?')) {
        $.ajax({
            url : "http://localhost:8085/cliente-usuario/suspender-cliente?idUsuario="+idUsuario+"&estadoCuenta=Suspendida",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, jqXHR)
            {
                alert("Cuenta suspendida");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Error al suspender cuenta")
            }
        });
    } 
}

function cargarDatosModal(idCliente){

    $.ajax({
        url : "http://localhost:8085/cliente-usuario/buscar-id?id="+idCliente,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            document.getElementById('img-carnet-frontal').src = "data:image/jpg;base64,"+data.imagenCarnetList[0].fotoCarnetByte;
            document.getElementById('img-carnet-trasera').src = "data:image/jpg;base64,"+data.imagenCarnetList[1].fotoCarnetByte;
            document.getElementById('lbl-rut-cliente').innerHTML = "Rut del cliente: "+data.rutCliente;
            document.getElementById('input-id-cliente').value = data.idCliente;
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener cliente");
        }
    });

}

function aprobarCliente(){
    if (window.confirm('¿Desea aprobar el cliente?')) {
        $.ajax({
            url : "http://localhost:8085/cliente-usuario/aprobar-rut-cliente?estadoRutId=3&idCliente="+$('#input-id-cliente').val(),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, jqXHR)
            {
                alert("Cliente aprobado con éxito");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Error al aprobar cliente");
            }
        });
    }
}

function rechazarCliente(){
    if (window.confirm('¿Desea rechazar el cliente?')) {
        $.ajax({
            url : "http://localhost:8085/cliente-usuario/aprobar-rut-cliente?estadoRutId=2&idCliente="+$('#input-id-cliente').val(),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, jqXHR)
            {
                alert("Cliente rechazado con éxito");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Error al rechazar cliente");
            }
        });
    }
}