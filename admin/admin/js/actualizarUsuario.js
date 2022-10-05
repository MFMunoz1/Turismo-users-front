var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var usuarioActualizar = {};

$.ajax({
    url : "http://localhost:8085/usuario-sistema/buscar-usuario-id?id="+id,
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        usuarioActualizar = data;
        $('#select-tipo-usuario').val(data.tipoUsuario);
        $('#txt-usuario').val(data.nombreUsuario);
        $('#txt-rut').val(data.rutUsuario);
        $('#txt-email').val(data.emailUsuario);
        $('#txt-telefono').val(data.telefonoUsuario);
        $('#txt-password').val(data.passwordUsuario);
        $('#txt-password2').val(data.passwordUsuario);
        
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener transportes");
    }
});

function modificarDatos(){

    if (window.confirm('¿Desea modificar los datos?')) {
        usuarioActualizar.tipoUsuario = $('#select-tipo-usuario').find(":selected").text();
        usuarioActualizar.nombreUsuario = $('#txt-usuario').val();
        usuarioActualizar.rutUsuario = $('#txt-rut').val();
        usuarioActualizar.emailUsuario = $('#txt-email').val();
        usuarioActualizar.telefonoUsuario = $('#txt-telefono').val();
        usuarioActualizar.passwordUsuario = $('#txt-password').val();

        $.ajax({
            url : "http://localhost:8085/usuario-sistema/update-datos-user",
            type: "PUT",
            data : JSON.stringify(usuarioActualizar),
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, jqXHR)
            {
                alert("Usuario modificado correctamente");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Error al actualizar datos")
            }
        });
    } 
}