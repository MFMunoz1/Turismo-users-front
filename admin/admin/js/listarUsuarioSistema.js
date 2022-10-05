$.ajax({
    url : "http://localhost:8085/usuario-sistema/listar-all-users",
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        let body = ""
        $.each(data, function( index, user ) {
            body += `<tr>
            <td>${user.idUsuario}</td>
            <td>${user.tipoUsuario}</td>
            <td>${user.nombreUsuario}</td>
            <td>${user.emailUsuario}</td>
            <td>${user.telefonoUsuario}</td>
            <td>${user.rutUsuario}</td>
            <td><a class="btn btn-sm btn-primary" href="actualizarUsuarioSistema.html?id=${user.idUsuario}">Actualizar</a></td>
            <td><button value=${user.idUsuario} class="btn btn-danger col-sm-12" onclick="eliminarUsuario(this.value)">Eliminar</button></td>
            </tr>`
        });
        document.getElementById('usuarios').innerHTML = body
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener usuarios");
    }
});

function buscarUsuarios(){

    var tipo = $('#select-tipo').find(":selected").text();

    if(tipo === "Seleccione el tipo"){
        alert("Por favor seleccione el tipo");
        return;
    }

    $.ajax({
        url : "http://localhost:8085/usuario-sistema/listar-por-tipo?tipo="+tipo,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, user ) {
                body += `<tr>
                <td>${user.idUsuario}</td>
                <td>${user.tipoUsuario}</td>
                <td>${user.nombreUsuario}</td>
                <td>${user.emailUsuario}</td>
                <td>${user.telefonoUsuario}</td>
                <td>${user.rutUsuario}</td>
                <td><a class="btn btn-sm btn-primary" href="actualizarUsuarioSistema.html?id=${user.idUsuario}">Actualizar</a></td>
                <td><button value=${user.idUsuario} class="btn btn-danger col-sm-12" onclick="eliminarUsuario(this.value)">Eliminar</button></td>
                </tr>`
            });
            document.getElementById('usuarios').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener usuarios");
        }
    });
}

function eliminarUsuario(idUsuario){

    if (window.confirm('¿Desea modificar el inventario?')) {
        $.ajax({
            url : "http://localhost:8085/usuario-sistema/delete-user?id_user="+idUsuario,
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, jqXHR)
            {
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Error al eliminar usuario")
            }
        });
    } 
    
}