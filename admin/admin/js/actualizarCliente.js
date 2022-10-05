var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var usuarioActualizar = {};

$.ajax({
    url : "http://localhost:8085/cliente-usuario/buscar-id?id="+id,
    type: "GET",
    //dataType : "json",
    contentType: "application/json; charset=utf-8",
    // data -> trae la respuesta del servicio
    success: function(data, textStatus, jqXHR)
    {
        usuarioActualizar = data;
        $('#txt-idcliente').val(data.idCliente);
        $('#txt-rutcliente').val(data.rutCliente);
        $('#txt-nombrecliente').val(data.nombreCliente);
        $('#txt-fechanacimiento').val(data.fechaNacimiento.split("T")[0]);
        $('#txt-genero').val(data.genero);
        $('#txt-email').val(data.emailCliente);
        $('#txt-telefono').val(data.telefonoCliente);
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener cliente");
    }
});

function modificarDatos(){

    if (window.confirm('¿Desea modificar los datos?')) {
        usuarioActualizar.emailCliente = $('#txt-email').val();
        usuarioActualizar.telefonoCliente = $('#txt-telefono').val();

        $.ajax({
            url : "http://localhost:8085/cliente-usuario/modificar-cliente",
            type: "POST",
            data : JSON.stringify(usuarioActualizar),
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus, jqXHR)
            {
                alert("Cliente modificado correctamente");
                location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert("Error al actualizar datos")
            }
        });
    } 
}