var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var tourActualizar = {};

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

    let region = $('#select-region').find(":selected").text() !== "" ? $('#select-region').find(":selected").text() : tourActualizar.region;

    const response = await fetch('http://localhost:8085/mantenedor/listar-comunas?region='+region);
    const comunas = await response.json();
    $.each(comunas, function( index, comuna ) {
        $('#select-comuna').append($('<option>', {
            value: comuna.nombreComuna,
            text: comuna.nombreComuna
        }));
    });
}

async function buscarTour(){
    await cargarRegiones();
    await $.ajax({
        url : "http://localhost:8085/servicio-extra/buscar-tour-id?id="+id,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            tourActualizar = data;
            $('#txt-persona-a-cargo').val(data.personaACargo);
            $('#txt-titulo').val(data.tituloTour);
            $('#txt-descripcion').val(data.descripcionTour);
            $('#txt-cantidad-personas').val(data.cantidadPersonasMax);
            $('#txt-valor').val(data.valorTour);

            var tableImagenesTour = document.getElementById("table-body-imagenes-tour")

            $.each(data.fotoTourList, function( index, foto ) {
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
                    $.each(tourActualizar.fotoTourList, function( index, fotoEliminar ) {
                        if(index == id){
                            fotoEliminar.accion = "ELIMINAR";
                            document.getElementById(id+"trImagen").remove();
                        }
                    });
                });

                imgForImagen.src = "data:image/jpg;base64,"+foto.fotoTourByte;
                imgForImagen.width = 100
                imgForImagen.height = 100

                tdTitle.textContent = foto.tituloFotoTour;

                tdEliminar.appendChild(btnEliminar);
                tdImagen.appendChild(imgForImagen);
                trForImage.appendChild(tdTitle)
                trForImage.appendChild(tdImagen)
                trForImage.appendChild(tdEliminar)
                tableImagenesTour.appendChild(trForImage)
            });

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener tours");
        }
    });  
    $('#select-region').val(tourActualizar.region);
    await cargarComunas();
    $('#select-comuna').val(tourActualizar.comuna);
}  

buscarTour();

async function agregarFoto(){
    var tableImagenesTour = document.getElementById("table-body-imagenes-tour")

    const userFile = document.getElementById('formFile').files[0];
    const tituloImagen = document.getElementById('titulo-imagen').value;
    var image64 = await toBase64(userFile);

    var nuevaFoto = {
        tituloFotoTour: tituloImagen,
        fotoTourString: image64,
        accion: "AGREGAR",
        idNuevaFoto: tourActualizar.fotoTourList.length+1
    }

    tourActualizar.fotoTourList.push(nuevaFoto);
    // cargar imagen
    var trForImage = document.createElement("tr");
    trForImage.id = tourActualizar.fotoTourList.length+"trImagen";
    var tdTitle = document.createElement("td")
    var tdImagen = document.createElement("td")
    var tdEliminar = document.createElement("td")
    var imgForImagen = document.createElement("img")

    var btnEliminar = document.createElement("button");
    btnEliminar.id = tourActualizar.fotoTourList.length;
    btnEliminar.innerHTML = "Eliminar"
    btnEliminar.className = "btn btn-danger ms-2"
    btnEliminar.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(tourActualizar.fotoTourList, function( index, fotoEliminar ) {
            if(fotoEliminar.idNuevaFoto == id){
                fotoEliminar.accion = null;
                document.getElementById(id+"trImagen").remove();
            }
        });
    });

    imgForImagen.src = image64
    imgForImagen.width = 100
    imgForImagen.height = 100

    tdTitle.textContent = tituloImagen

    tdImagen.appendChild(imgForImagen);
    tdEliminar.appendChild(btnEliminar);
    trForImage.appendChild(tdTitle)
    trForImage.appendChild(tdImagen)
    trForImage.appendChild(tdEliminar)
    tableImagenesTour.appendChild(trForImage)
}

var toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const botonConfirmImagenes = document.getElementById('btn-confirm-fotos');
botonConfirmImagenes.addEventListener('click', function (e) {
    if (window.confirm('¿Desea modificar las imagenes?')) {
        modificarFotos();
    } 
});

const botonConfirmDatos = document.getElementById('btn-confirm-datos');
botonConfirmDatos.addEventListener('click', function (e) {
    if (window.confirm('¿Desea modificar los datos?')) {
        modificarDatos();
    } 
});

function modificarFotos(){
    $.ajax({
        url : "http://localhost:8085/servicio-extra/actualizar-fotos",
        type: "POST",
        data : JSON.stringify(tourActualizar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar imagenes")
        }
    });
}

function modificarDatos(){

    tourActualizar.personaACargo = $('#txt-persona-a-cargo').val();
    tourActualizar.tituloTour = $('#txt-titulo').val();
    tourActualizar.cantidadPersonasMax = $('#txt-cantidad-personas').val();
    tourActualizar.region = $('#select-region').find(":selected").text();
    tourActualizar.comuna = $('#select-comuna').find(":selected").text();
    tourActualizar.descripcionTour = $('#txt-descripcion').val();
    tourActualizar.valorTour = $('#txt-valor').val();

    $.ajax({
        url : "http://localhost:8085/servicio-extra/actualizar-tour",
        type: "POST",
        data : JSON.stringify(tourActualizar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar datos")
        }
    });
}