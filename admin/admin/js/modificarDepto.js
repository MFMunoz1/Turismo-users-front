async function cargarRegiones() {
    const response = await fetch('http://localhost:8085/mantenedor/listar-regiones');
    const regiones = await response.json();
    $.each(regiones, function( index, region ) {
        $('#select-region').append($('<option>', {
            value: region.nombreRegion,
            text: region.nombreRegion
        }));
    });
}

async function cargarComunas() {
    $('#select-comuna')
    .find('option')
    .remove()
    .end()
    .append('<option value="Seleccione la comuna">Seleccione la comuna</option>')
    .val('Seleccione la comuna');

    let region = $('#select-region').find(":selected").text();

    const response = await fetch('http://localhost:8085/mantenedor/listar-comunas?region='+region);
    const comunas = await response.json();
    $.each(comunas, function( index, comuna ) {
        $('#select-comuna').append($('<option>', {
            value: comuna.nombreComuna,
            text: comuna.nombreComuna
        }));
    });
}

async function initRegiones(){
    await cargarRegiones();
}

initRegiones();

async function buscarDeptos(){

    var region = $('#select-region').find(":selected").text() === "Seleccione la región" ? 
                                            undefined : $('#select-region').find(":selected").text();
    var comuna = $('#select-comuna').find(":selected").text() === "Seleccione la comuna" ? 
                                            undefined : $('#select-comuna').find(":selected").text();

    $.ajax({
        url : "http://localhost:8085/departamento/listar-deptos",
        type: "GET",
        data: {
            estado: true,
            region: region,
            comuna: comuna
        },
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            let body = ""
            $.each(data, function( index, depto ) {
                body += `<tr><td>${depto.idDepartamento}</td>
                <td>${depto.direccion}</td><td>${depto.comuna}</td><td>${depto.region}</td>
                <td>${depto.estado}</td>
                <td><a class="btn btn-sm btn-primary" href="actualizarDeptoFormulario.html?id=${depto.idDepartamento}">Actualizar</a></td>
                <td><button value=${depto.idDepartamento} class="btn btn-danger col-sm-12" onclick="eliminarDepto(this.value)">Eliminar</button></td></tr>`
            });
            document.getElementById('data').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener departamentos");
        }
    });
}

buscarDeptos();

function eliminarDepto(idDepto){
    $.ajax({
        url : "http://localhost:8085/departamento/actualizar-estado-depto?estado=false&idDepartamento="+idDepto,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al eliminar departamento")
        }
    });
}