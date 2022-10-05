var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id')

var deptoActualizar = {};

let listadoRegiones = [];

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

    let region = $('#select-region').find(":selected").text() !== "" ? $('#select-region').find(":selected").text() : deptoActualizar.region;

    const response = await fetch('http://localhost:8085/mantenedor/listar-comunas?region='+region);
    const comunas = await response.json();
    $.each(comunas, function( index, comuna ) {
        $('#select-comuna').append($('<option>', {
            value: comuna.nombreComuna,
            text: comuna.nombreComuna
        }));
    });
}

let listadoServicios = [];

$.ajax({
    url : "http://localhost:8085/mantenedor/listar-servicios-depto",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus, jqXHR)
    {
        $.each(data, function( index, servicio ) {
            //va a agregar el nombre a la lista
            listadoServicios.push(servicio)
        });

        var selectServiciosDepto = document.getElementById("select-servicio");
        listadoServicios.forEach(servicio => {
            var option = document.createElement("option");
            option.value = servicio.idServicioDepto;
            option.text = servicio.tipoServicioDepto;
            selectServiciosDepto.add(option)
        })
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener servicios");
    }
});

let listadoCondiciones = [];

$.ajax({
    url : "http://localhost:8085/mantenedor/listar-condiciones",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus, jqXHR)
    {
        $.each(data, function( index, condicion ) {
            //va a agregar el nombre a la lista
            listadoCondiciones.push(condicion)
        });

        var selectCondicionesDepto = document.getElementById("select-condicion");
        listadoCondiciones.forEach(condicion => {
            var option = document.createElement("option");
            option.value = condicion.idCondicion;
            option.text = condicion.tipoCondicionDeUso;
            selectCondicionesDepto.add(option)
        })
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert("Error al obtener condiciones");
    }
});

async function buscarDepto(){
    await cargarRegiones();
    await $.ajax({
        url : "http://localhost:8085/departamento/buscar-depto-por-id?id="+id,
        type: "GET",
        //dataType : "json",
        contentType: "application/json; charset=utf-8",
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            deptoActualizar = data;
            $('#txt-direccion').val(data.direccion);
            $('#txt-nombre').val(data.nombreDepto);
            $('#txt-habitaciones').val(data.cantidadHabitaciones);
            $('#txt-banios').val(data.cantidadBanios);
            $('#select-region').val(data.region);
            $('#txt-dimensiones').val(data.dimensiones);
            $('#txt-huespedes').val(data.capacidadHuespedes);
            $('#txt-camas').val(data.cantidadCamas);
            $('#txt-valor').val(data.valorDiario);
            $('#txt-descripcion').val(data.descripcion);
    
            var tituloModificarInventario = document.getElementById("titulo-modificar-inventario");
            tituloModificarInventario.textContent = "Inventario (última actualización el "+data.inventario.fechaInventario+")";
    
            var tableElementosDepto = document.getElementById("table-body-elementos-depto")
    
            $.each(data.inventario.elementoList, function( index, elemento ) {
                var trElemento = document.createElement("tr");
                trElemento.id = index+"trElemento";
                trElemento.value = elemento.idElemento;
                var tdNombre = document.createElement("td");
                var tdValor = document.createElement("td");
                var tdCantidad = document.createElement("td");
                tdCantidad.id = index+"tdCantidad";
                var tdEliminar = document.createElement("td");
                var tdAgregarCantidad = document.createElement("td");
                var tdQuitarCantidad = document.createElement("td");
    
                var btnEliminar = document.createElement("button");
                btnEliminar.id = index;
                btnEliminar.value = elemento.idElemento;
                btnEliminar.innerHTML = "Eliminar"
                btnEliminar.className = "btn btn-danger ms-2"
                btnEliminar.addEventListener('click', (event) => {
                    var value = event.target.value;
                    var id = event.target.id;
                    $.each(deptoActualizar.inventario.elementoList, function( index, elementoEliminar ) {
                        if(elementoEliminar.idElemento == value){
                            elementoEliminar.accion = "ELIMINAR";
                            document.getElementById(id+"trElemento").remove();
                        }
                    });
                });
    
                var btnQuitarCantidad = document.createElement("button");
                btnQuitarCantidad.id = index;
                btnQuitarCantidad.value = elemento.idElemento;
                btnQuitarCantidad.innerHTML = "-"
                btnQuitarCantidad.className = "btn btn-primary ms-2";
                btnQuitarCantidad.style = "float: right;";
                btnQuitarCantidad.addEventListener('click', (event) => {
                    var value = event.target.value;
                    var id = event.target.id;
                    $.each(deptoActualizar.inventario.elementoList, function( index, elementoRestar ) {
                        if(elementoRestar.idElemento == value &&
                            elementoRestar.cantidadElemento > 0){
                            elementoRestar.cantidadElemento -= 1;
                            elementoRestar.accion = "MODIFICAR";
                            var tdCantidadModificar = document.getElementById(id+"tdCantidad");
                            tdCantidadModificar.textContent = elementoRestar.cantidadElemento;
                        }
                    });
                });
    
                var btnAgregarCantidad = document.createElement("button");
                btnAgregarCantidad.id = index;
                btnAgregarCantidad.value = elemento.idElemento;
                btnAgregarCantidad.innerHTML = "+"
                btnAgregarCantidad.className = "btn btn-primary ms-2";
                btnAgregarCantidad.addEventListener('click', (event) => {
                    var value = event.target.value;
                    var id = event.target.id;
                    $.each(deptoActualizar.inventario.elementoList, function( index, elementoAgregar ) {
                        if(elementoAgregar.idElemento == value &&
                            elementoAgregar.cantidadElemento < 99){
                            elementoAgregar.cantidadElemento += 1;
                            elementoAgregar.accion = "MODIFICAR";
                            var tdCantidadModificar = document.getElementById(id+"tdCantidad");
                            tdCantidadModificar.textContent = elementoAgregar.cantidadElemento;
                        }
                    });
                });
    
                tdEliminar.appendChild(btnEliminar);
                tdNombre.textContent = elemento.nombreElemento;
                tdValor.textContent = elemento.valorElemento;
                tdCantidad.textContent = elemento.cantidadElemento;
                tdQuitarCantidad.appendChild(btnQuitarCantidad);
                tdAgregarCantidad.appendChild(btnAgregarCantidad);
    
                trElemento.appendChild(tdNombre);
                trElemento.appendChild(tdValor);
                trElemento.appendChild(tdCantidad);
                trElemento.appendChild(tdQuitarCantidad);
                trElemento.appendChild(tdAgregarCantidad);
                trElemento.appendChild(tdEliminar);
                tableElementosDepto.appendChild(trElemento)
            });
    
            var tableImagenesDepto = document.getElementById("table-body-imagenes-depto")
    
            $.each(data.fotoDeptoList, async function( index, foto ) {
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
                    $.each(deptoActualizar.fotoDeptoList, function( index, fotoEliminar ) {
                        if(index == id){
                            fotoEliminar.accion = "ELIMINAR";
                            document.getElementById(id+"trImagen").remove();
                        }
                    });
                });
    
                imgForImagen.src = "data:image/jpg;base64,"+foto.fotoDeptoByte;
                imgForImagen.width = 100
                imgForImagen.height = 100
    
                tdTitle.textContent = foto.tituloFotoDepto;
    
                tdEliminar.appendChild(btnEliminar);
                tdImagen.appendChild(imgForImagen);
                trForImage.appendChild(tdTitle)
                trForImage.appendChild(tdImagen)
                trForImage.appendChild(tdEliminar)
                tableImagenesDepto.appendChild(trForImage)
            });
    
            var tableServiciosDepto = document.getElementById("table-body-servicios-depto")
    
            $.each(deptoActualizar.servicioDeptoList, function( index, servicio ) {
                var trServicio = document.createElement("tr");
                trServicio.id = servicio.idServicioDepto+"trServicio";
                var tdNombre = document.createElement("td")
                var tdEliminar = document.createElement("td")
    
                var btnEliminar = document.createElement("button");
                btnEliminar.id = servicio.idServicioDepto;
                btnEliminar.innerHTML = "Eliminar"
                btnEliminar.className = "btn btn-danger ms-2"
                btnEliminar.addEventListener('click', (event) => {
                    var id = event.target.id;
                    $.each(deptoActualizar.servicioDeptoList, function( index, servicioEliminar ) {
                        if(servicioEliminar.idServicioDepto == id){
                            servicioEliminar.accion = "ELIMINAR";
                            document.getElementById(id+"trServicio").remove();
                        }
                    });
                });
    
                tdNombre.textContent = servicio.tipoServicioDepto;
    
                tdEliminar.appendChild(btnEliminar);
                trServicio.appendChild(tdNombre)
                trServicio.appendChild(tdEliminar)
                tableServiciosDepto.appendChild(trServicio)
            });
    
            var tableCondicionesDepto = document.getElementById("table-body-condiciones-depto")
    
            $.each(deptoActualizar.condicionesDeUsoList, function( index, condicion ) {
                var trCondicion = document.createElement("tr");
                trCondicion.id = condicion.idCondicion+"trCondicion";
                var tdNombre = document.createElement("td")
                var tdEliminar = document.createElement("td")
    
                var btnEliminar = document.createElement("button");
                btnEliminar.id = condicion.idCondicion;
                btnEliminar.innerHTML = "Eliminar"
                btnEliminar.className = "btn btn-danger ms-2"
                btnEliminar.addEventListener('click', (event) => {
                    var id = event.target.id;
                    $.each(deptoActualizar.condicionesDeUsoList, function( index, condicionEliminar ) {
                        if(index == id){
                            condicionEliminar.accion = "ELIMINAR";
                            document.getElementById(id+"trCondicion").remove();
                        }
                    });
                });
    
                tdNombre.textContent = condicion.tipoCondicionDeUso;
    
                tdEliminar.appendChild(btnEliminar);
                trCondicion.appendChild(tdNombre)
                trCondicion.appendChild(tdEliminar)
                tableCondicionesDepto.appendChild(trCondicion)
            });
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al obtener departamentos");
        }
    });
    $('#select-region').val(deptoActualizar.region);
    await cargarComunas();
    $('#select-comuna').val(deptoActualizar.comuna);

}

buscarDepto();

function agregarServicio(){
    var tableServiciosDepto = document.getElementById("table-body-servicios-depto")

    var selectServiciosDepto = document.getElementById("select-servicio");

    var textoServicio = selectServiciosDepto.options[selectServiciosDepto.selectedIndex].text;
    var idServicio = selectServiciosDepto.options[selectServiciosDepto.selectedIndex].value;

    var nuevoServicio = {
        idServicioDepto: idServicio,
        tipoServicioDepto: textoServicio,
        accion: "AGREGAR"
    }

    deptoActualizar.servicioDeptoList.push(nuevoServicio);
    // cargar imagen
    var trServicio = document.createElement("tr");
    trServicio.id = idServicio+"trServicio";
    var tdNombre = document.createElement("td")
    var tdEliminar = document.createElement("td")

    var btnEliminar = document.createElement("button");
    btnEliminar.id = idServicio;
    btnEliminar.innerHTML = "Eliminar"
    btnEliminar.className = "btn btn-danger ms-2"
    btnEliminar.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(deptoActualizar.servicioDeptoList, function( index, servicioEliminar ) {
            if(servicioEliminar.idServicioDepto == id){
                servicioEliminar.accion = null;
                document.getElementById(id+"trServicio").remove();
            }
        });
    });

    tdNombre.textContent = textoServicio
    tdEliminar.appendChild(btnEliminar);

    trServicio.appendChild(tdNombre)
    trServicio.appendChild(tdEliminar)
    tableServiciosDepto.appendChild(trServicio)
}

function agregarCondicion(){
    var tableCondicionesDepto = document.getElementById("table-body-condiciones-depto")

    var selectCondicionDepto = document.getElementById("select-condicion");

    var textoCondicion = selectCondicionDepto.options[selectCondicionDepto.selectedIndex].text;
    var idCondicionSelect = selectCondicionDepto.options[selectCondicionDepto.selectedIndex].value;

    var nuevaCondicion = {
        idCondicion: idCondicionSelect,
        tipoCondicionDeUso: textoCondicion,
        accion: "AGREGAR"
    }

    deptoActualizar.condicionesDeUsoList.push(nuevaCondicion);
    var trCondicion = document.createElement("tr");
    trCondicion.id = idCondicionSelect+"trCondicion";
    var tdNombre = document.createElement("td")
    var tdEliminar = document.createElement("td")

    var btnEliminar = document.createElement("button");
    btnEliminar.id = idCondicionSelect;
    btnEliminar.innerHTML = "Eliminar"
    btnEliminar.className = "btn btn-danger ms-2"
    btnEliminar.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(deptoActualizar.condicionesDeUsoList, function( index, condicionEliminar ) {
            if(condicionEliminar.idCondicion == id){
                condicionEliminar.accion = null;
                document.getElementById(id+"trCondicion").remove();
            }
        });
    });

    tdNombre.textContent = textoCondicion
    tdEliminar.appendChild(btnEliminar);

    trCondicion.appendChild(tdNombre)
    trCondicion.appendChild(tdEliminar)
    tableCondicionesDepto.appendChild(trCondicion)
}

async function agregarFoto(){
    var tableImagenesDepto = document.getElementById("table-body-imagenes-depto")

    const userFile = document.getElementById('formFile').files[0];
    const tituloImagen = document.getElementById('titulo-imagen').value;
    var image64 = await toBase64(userFile);

    var nuevaFoto = {
        tituloFotoDepto: tituloImagen,
        fotoDeptoString: image64,
        accion: "AGREGAR",
        idNuevaFoto: deptoActualizar.fotoDeptoList.length+1
    }

    deptoActualizar.fotoDeptoList.push(nuevaFoto);
    // cargar imagen
    var trForImage = document.createElement("tr");
    trForImage.id = deptoActualizar.fotoDeptoList.length+"trImagen";
    var tdTitle = document.createElement("td")
    var tdImagen = document.createElement("td")
    var tdEliminar = document.createElement("td")
    var imgForImagen = document.createElement("img")

    var btnEliminar = document.createElement("button");
    btnEliminar.id = deptoActualizar.fotoDeptoList.length;
    btnEliminar.innerHTML = "Eliminar"
    btnEliminar.className = "btn btn-danger ms-2"
    btnEliminar.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(deptoActualizar.fotoDeptoList, function( index, fotoEliminar ) {
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
    tableImagenesDepto.appendChild(trForImage)
}

function agregarElemento(){
    var elemento = {
        nombreElemento: $('#txt-nombre-elemento').val(),
        valorElemento: parseInt($('#txt-valor-elemento').val()),
        cantidadElemento: parseInt($('#txt-cantidad-elemento').val()),
        accion: "AGREGAR",
        idNuevoElemento: deptoActualizar.inventario.elementoList.length+1
    }

    deptoActualizar.inventario.elementoList.push(elemento);

    var tableElementosDepto = document.getElementById("table-body-elementos-depto")

    var trElemento = document.createElement("tr");
    trElemento.id = deptoActualizar.inventario.elementoList.length+"trElemento";
    var tdNombre = document.createElement("td");
    var tdValor = document.createElement("td");
    var tdCantidad = document.createElement("td");
    tdCantidad.id = deptoActualizar.inventario.elementoList.length+"tdCantidad";
    var tdEliminar = document.createElement("td");
    var tdAgregarCantidad = document.createElement("td");
    var tdQuitarCantidad = document.createElement("td");

    var btnEliminar = document.createElement("button");
    btnEliminar.id = deptoActualizar.inventario.elementoList.length;
    btnEliminar.innerHTML = "Eliminar"
    btnEliminar.className = "btn btn-danger ms-2"
    btnEliminar.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(deptoActualizar.inventario.elementoList, function( index, elementoEliminar ) {
            if(elementoEliminar.idNuevoElemento == id){
                elementoEliminar.accion = null;
                document.getElementById(id+"trElemento").remove();
            }
        });
    });

    var btnQuitarCantidad = document.createElement("button");
    btnQuitarCantidad.id = deptoActualizar.inventario.elementoList.length;
    btnQuitarCantidad.innerHTML = "-"
    btnQuitarCantidad.className = "btn btn-primary ms-2";
    btnQuitarCantidad.style = "float: right;";
    btnQuitarCantidad.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(deptoActualizar.inventario.elementoList, function( index, elementoRestar ) {
            if(elementoRestar.idNuevoElemento == id &&
                elementoRestar.cantidadElemento > 0){
                elementoRestar.cantidadElemento -= 1;
                elementoRestar.accion = "AGREGAR";
                var tdCantidadModificar = document.getElementById(id+"tdCantidad");
                tdCantidadModificar.textContent = elementoRestar.cantidadElemento;
            }
        });
    });

    var btnAgregarCantidad = document.createElement("button");
    btnAgregarCantidad.id = deptoActualizar.inventario.elementoList.length;
    btnAgregarCantidad.innerHTML = "+"
    btnAgregarCantidad.className = "btn btn-primary ms-2";
    btnAgregarCantidad.addEventListener('click', (event) => {
        var id = event.target.id;
        $.each(deptoActualizar.inventario.elementoList, function( index, elementoAgregar ) {
            if(elementoAgregar.idNuevoElemento == id &&
                elementoAgregar.cantidadElemento < 99){
                elementoAgregar.cantidadElemento += 1;
                elementoAgregar.accion = "AGREGAR";
                var tdCantidadModificar = document.getElementById(id+"tdCantidad");
                tdCantidadModificar.textContent = elementoAgregar.cantidadElemento;
            }
        });
    });

    tdEliminar.appendChild(btnEliminar);
    tdNombre.textContent = elemento.nombreElemento;
    tdValor.textContent = elemento.valorElemento;
    tdCantidad.textContent = elemento.cantidadElemento;
    tdQuitarCantidad.appendChild(btnQuitarCantidad);
    tdAgregarCantidad.appendChild(btnAgregarCantidad);

    trElemento.appendChild(tdNombre);
    trElemento.appendChild(tdValor);
    trElemento.appendChild(tdCantidad);
    trElemento.appendChild(tdQuitarCantidad);
    trElemento.appendChild(tdAgregarCantidad);
    trElemento.appendChild(tdEliminar);
    tableElementosDepto.appendChild(trElemento)

}

var toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const botonConfirmInventario = document.getElementById('btn-confirm-inventario');
botonConfirmInventario.addEventListener('click', function (e) {
    if (window.confirm('¿Desea modificar el inventario?')) {
        modificarInventario();
    } 
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

const botonConfirmServicios = document.getElementById('btn-confirm-servicios');
botonConfirmServicios.addEventListener('click', function (e) {
    if (window.confirm('¿Desea modificar los servicios?')) {
        modificarServicios();
    } 
});

const botonConfirmCondiciones = document.getElementById('btn-confirm-condiciones');
botonConfirmCondiciones.addEventListener('click', function (e) {
    if (window.confirm('¿Desea modificar las condiciones?')) {
        modificarCondiciones();
    } 
});

function modificarInventario(){
    $.ajax({
        url : "http://localhost:8085/departamento/actualizar-inventario",
        type: "POST",
        data : JSON.stringify(deptoActualizar.inventario),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar inventario")
        }
    });
}

function modificarFotos(){
    $.ajax({
        url : "http://localhost:8085/departamento/actualizar-fotos",
        type: "POST",
        data : JSON.stringify(deptoActualizar),
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

function modificarServicios(){
    $.ajax({
        url : "http://localhost:8085/departamento/actualizar-servicio-depto",
        type: "POST",
        data : JSON.stringify(deptoActualizar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar servicios")
        }
    });
}

function modificarCondiciones(){
    $.ajax({
        url : "http://localhost:8085/departamento/actualizar-condiciones-depto",
        type: "POST",
        data : JSON.stringify(deptoActualizar),
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus, jqXHR)
        {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al actualizar condiciones")
        }
    });
}

function modificarDatos(){

    deptoActualizar.direccion = $('#txt-direccion').val();
    deptoActualizar.nombreDepto = $('#txt-nombre').val();
    deptoActualizar.cantidadHabitaciones = $('#txt-habitaciones').val();
    deptoActualizar.cantidadBanios = $('#txt-banios').val();
    deptoActualizar.region = $('#select-region').find(":selected").text();
    deptoActualizar.comuna = $('#select-comuna').find(":selected").text();
    deptoActualizar.dimensiones = $('#txt-dimensiones').val();
    deptoActualizar.capacidadHuespedes = $('#txt-huespedes').val();
    deptoActualizar.cantidadCamas = $('#txt-camas').val();
    deptoActualizar.descripcion = $('#txt-descripcion').val();
    deptoActualizar.valorDiario = $('#txt-valor').val();


    $.ajax({
        url : "http://localhost:8085/departamento/actualizar-datos-depto",
        type: "POST",
        data : JSON.stringify(deptoActualizar),
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