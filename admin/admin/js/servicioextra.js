$('.tipotour').hide()
$('.tipotransp').hide()

// ELEMENTOS DEL FORMULARIO SEGUN OPCION
function elementos_servicioextra(){
    var accion
    accion = document.fservextra.tservextra.value

    if (accion=='1') {
        $('.tipotour').show();
        $('.tipotransp').hide()
    }
    else if (accion=='2') {
        $('.tipotransp').show();
        $('.tipotour').hide();
    }
    
    else {
        $('.tipotour').hide()
        $('.tipotransp').hide()  
    }
    
}