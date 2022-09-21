$('.listaserv').hide()
$('.nombreserv').hide()

// ELEMENTOS DEL FORMULARIO SEGUN OPCION
function elementos_servicio(){
    var accion
    accion = document.f1.accionserv.value

    if (accion=='1') {
        $('.nombreserv').show();
        $('.listaserv').hide()
    }
    else if (accion=='2') {
        $('.listaserv').show();
        $('.nombreserv').show();
    }
    else if (accion=='3') {
        $('.listaserv').show();
        $('.nombreserv').hide()
    }
    else {
        $('.listaserv').hide()
        $('.nombreserv').hide()  
    }
    
}


