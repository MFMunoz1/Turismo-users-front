$('.listaserv').hide()
$('.nombreserv').hide()
$('#agregarServicio').hide()
$('#btnEnviarLista').hide()
$('#btnEliminarServicioDepto').hide()

// ELEMENTOS DEL FORMULARIO SEGUN OPCION
function elementos_servicio(){
    var accion
    accion = document.f1.accionserv.value

    if (accion=='1') {
        $('.nombreserv').show();
        $('.listaserv').hide()
        $('#agregarServicio').show()
        $('#btnEnviarLista').show()
        $('#btnEliminarServicioDepto').hide()
    }
    else if (accion=='2') {
        $('.listaserv').show();
        $('.nombreserv').show();
    }
    else if (accion=='3') {
        $('.listaserv').show();
        $('.nombreserv').hide()
        $('#btnEliminarServicioDepto').show()
        $('#agregarServicio').hide()
        $('#btnEnviarLista').hide()
    }
    else {
        $('.listaserv').hide()
        $('.nombreserv').hide()  
        $('#agregarServicio').hide()
        $('#btnEnviarLista').hide()
        $('#btnEliminarServicioDepto').hide()
    }
    
}


