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
                <td>${depto.nombreDepto}</td>
                <td>${depto.direccion}</td>
                <td>${depto.comuna}</td>
                <td>${depto.region}</td>
                <td>${depto.enMantencion === true ? "En Mantención" : "Disponible"}</td>
                <td><a class="btn btn-sm btn-primary" href="crear-mantencion.html?id=${depto.idDepartamento}">Ingresar</a></td>`;

                if(depto.mantencionList !== null && depto.mantencionList !== undefined && depto.mantencionList.length > 0){
                    body += `<td><a class="btn btn-sm btn-primary" href="mantenciones-depto.html?id=${depto.idDepartamento}">Ver mantenciones</a></td>`;
                }else{
                    body += `<td><button class="btn btn-sm btn-primary" disabled>Ver mantenciones</button></td>`;
                }
                body += `</tr>`
            });
            document.getElementById('tabla-mantencion-deptos').innerHTML = body
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener departamentos");
        }
    });
}

async function cargarDatosNuevaMantencion(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    const response = await fetch('http://localhost:8085/departamento/buscar-depto-por-id?id='+id);
    const depto = await response.json();

    $("#dato-nombre-depto").html("<b>Nombre: </b>"+depto.nombreDepto);
    $("#dato-id-depto").html("<b>ID: </b>"+depto.idDepartamento);
    $("#dato-direccion-depto").html("<b>Dirección: </b>"+depto.direccion+", "+depto.comuna+", "+depto.region);
    $("#dato-valor-diario").html("<b>Valor diario: </b>$"+depto.valorDiario);
    if(depto.enMantencion === true){
        $("#dato-estado-mantencion").html("<b>Estado: </b>En mantención");
    }else{
        $("#dato-estado-mantencion").html("<b>Estado: </b>Disponible");
    }

}

let fotoMantencionList = [];

async function cargarFoto(){
    var tableImagenesDepto = document.getElementById("table-body-imagenes-mantencion")

    const userFile = document.getElementById('formFile').files[0];
    const tituloImagen = document.getElementById('titulo-imagen').value;
    var trForImage = document.createElement("tr");
    trForImage.id = fotoMantencionList.length+"trImagen";
    var tdTitle = document.createElement("td")
    var tdImagen = document.createElement("td")
    var imgForImagen = document.createElement("img")
    var image64 = await toBase64(userFile);

    imgForImagen.src = image64
    imgForImagen.width = 100
    imgForImagen.height = 100

    tdTitle.textContent = tituloImagen
    
    var nuevaFoto = {
        tituloFoto: tituloImagen,
        fotoMantencionString: image64,
        accion: "AGREGAR"
    }

    tdImagen.appendChild(imgForImagen);
    trForImage.appendChild(tdTitle)
    trForImage.appendChild(tdImagen)
    tableImagenesDepto.appendChild(trForImage)
    fotoMantencionList.push(nuevaFoto);
    console.log(fotoMantencionList)
}

async function cargarFotoModificar(){
    var tableImagenesDepto = document.getElementById("table-body-imagenes-mantencion")

    const userFile = document.getElementById('formFile').files[0];
    const tituloImagen = document.getElementById('titulo-imagen').value;
    var trForImage = document.createElement("tr");
    trForImage.id = fotoMantencionList.length+"trImagen";
    var tdTitle = document.createElement("td")
    var tdImagen = document.createElement("td")
    var tdEliminar = document.createElement("td")
    var imgForImagen = document.createElement("img")
    var image64 = await toBase64(userFile);

    imgForImagen.src = image64
    imgForImagen.width = 100
    imgForImagen.height = 100

    tdTitle.textContent = tituloImagen
    
    var nuevaFoto = {
        tituloFoto: tituloImagen,
        fotoMantencionString: image64,
        accion: "AGREGAR"
    }

    var btnEliminar = document.createElement("button");
    btnEliminar.id = fotoMantencionList.length;
    btnEliminar.innerHTML = "Eliminar"
    btnEliminar.className = "btn btn-danger ms-2"
    btnEliminar.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(fotoMantencionList, function( index, fotoEliminar ) {
            if(index == id){
                fotoEliminar.accion = "";
                document.getElementById(id+"trImagen").remove();
            }
        });
    });
    tdEliminar.appendChild(btnEliminar);

    tdImagen.appendChild(imgForImagen);
    trForImage.appendChild(tdTitle)
    trForImage.appendChild(tdImagen)
    trForImage.appendChild(tdEliminar)
    tableImagenesDepto.appendChild(trForImage)
    fotoMantencionList.push(nuevaFoto);
    console.log(fotoMantencionList)
}

var toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function crearNuevaMantencion(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    let mantencion = {
        idDepartamento: id,
        titulo: $("#txt-titulo-mantencion").val(),
        descripcion: $("#txt-descripcion-mantencion").val(),
        presupuesto: $("#txt-presupuesto-mantencion").val(),
        estado: "En curso",
        fotoMantencionList: fotoMantencionList
    }

    let fechaInicioMoment = moment($("#date-fecha-inicio").val(), "YYYY-MM-DD");
    mantencion.fechaInicio = fechaInicioMoment.toDate();

    let fechaTerminoMoment = moment($("#date-fecha-termino").val(), "YYYY-MM-DD");
    mantencion.fechaTermino = fechaTerminoMoment;

    $.ajax({
        url : "http://localhost:8085/mantenedor/nueva-mantencion",
        type: "POST",
        data: JSON.stringify(mantencion),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            alert("Mantención creada con éxito")
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al crear mantención")
        }
    });
}

async function buscarMantenciones(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    const response = await fetch('http://localhost:8085/mantenedor/buscar-mantenciones-depto?id='+id);
    const mantenciones = await response.json();

    let body = ""
    $.each(mantenciones, function( index, mantencion ) {
        body += `<tr><td>${mantencion.idMantencion}</td>
        <td>${mantencion.fechaInicio.split("T")[0]}</td>
        <td>${mantencion.fechaTermino.split("T")[0]}</td>
        <td>${mantencion.titulo}</td>
        <td>${mantencion.presupuesto}</td>
        <td>${mantencion.estado}</td>
        <td><a class="btn btn-sm btn-primary" href="modificar-mantencion.html?id=${mantencion.idMantencion}">Modificar</a></td>
        </tr>`;
    });
    document.getElementById('tabla-mantenciones').innerHTML = body
}

let mantencionModificar = null;

async function cargarDatosModificacionMantencion(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    const response = await fetch('http://localhost:8085/mantenedor/buscar-mantencion?id='+id);
    mantencionModificar = await response.json();

    $("#txt-titulo-mantencion").val(mantencionModificar.titulo);
    $("#txt-descripcion-mantencion").val(mantencionModificar.descripcion);
    $("#txt-presupuesto-mantencion").val(mantencionModificar.presupuesto);
    $("#select-estado").val(mantencionModificar.estado);
    $("#date-fecha-inicio").val(mantencionModificar.fechaInicio.split("T")[0]);
    $("#date-fecha-termino").val(mantencionModificar.fechaTermino.split("T")[0]);

    var tableImagenesMantencion = document.getElementById("table-body-imagenes-mantencion")
    
    $.each(mantencionModificar.fotoMantencionList, function( index, foto ) {
        var trForImage = document.createElement("tr");
        trForImage.id = index+"trImagen";
        var tdTitle = document.createElement("td")
        var tdImagen = document.createElement("td")
        var tdEliminar = document.createElement("td")
        var imgForImagen = document.createElement("img")

        var btnEliminar = document.createElement("button");
        btnEliminar.id = index;
        btnEliminar.innerHTML = "Eliminar"
        btnEliminar.className = "btn btn-danger ms-2"
        btnEliminar.addEventListener('click', (event) => {
            var id = event.target.id;
            $.each(mantencionModificar.fotoMantencionList, function( index, fotoEliminar ) {
                if(index == id){
                    fotoEliminar.accion = "ELIMINAR";
                    document.getElementById(id+"trImagen").remove();
                }
            });
        });

        imgForImagen.src = "data:image/jpg;base64,"+foto.fotoMantencionByte;
        imgForImagen.width = 100
        imgForImagen.height = 100

        tdTitle.textContent = foto.tituloFoto;

        tdEliminar.appendChild(btnEliminar);
        tdImagen.appendChild(imgForImagen);
        trForImage.appendChild(tdTitle)
        trForImage.appendChild(tdImagen)
        trForImage.appendChild(tdEliminar)
        tableImagenesMantencion.appendChild(trForImage)

        fotoMantencionList = mantencionModificar.fotoMantencionList;
    });
}

function modificarFotosMantencion(){
    mantencionModificar.fotoMantencionList = fotoMantencionList;

    $.ajax({
        url : "http://localhost:8085/mantenedor/modificar-fotos-mantencion",
        type: "POST",
        data: JSON.stringify(mantencionModificar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            alert("Fotos modificadas con éxito")
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al modificar mantención")
        }
    });
}

function modificarDatosMantencion(){

    mantencionModificar.titulo = $("#txt-titulo-mantencion").val();
    mantencionModificar.descripcion = $("#txt-descripcion-mantencion").val();
    mantencionModificar.presupuesto = $("#txt-presupuesto-mantencion").val();
    mantencionModificar.estado = $("#select-estado").val();

    let fechaInicioMoment = moment($("#date-fecha-inicio").val(), "YYYY-MM-DD");
    mantencionModificar.fechaInicio = fechaInicioMoment.toDate();

    let fechaTerminoMoment = moment($("#date-fecha-termino").val(), "YYYY-MM-DD");
    mantencionModificar.fechaTermino = fechaTerminoMoment;

    $.ajax({
        url : "http://localhost:8085/mantenedor/modificar-datos-mantencion",
        type: "POST",
        data: JSON.stringify(mantencionModificar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            alert("Datos modificados con éxito")
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al modificar mantención")
        }
    });
}