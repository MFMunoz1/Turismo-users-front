$('.listacond').hide()
$('.nombrecond').hide()
$(' #btnEliminarCondicion').hide()
$(' #agregarCondicion').hide()
$(' #btnEnviarLista').hide()

// ELEMENTOS DEL FORMULARIO SEGUN OPCION
function elementos_condicion(){
    var accion
    accion = document.f2.accioncond.value

    if (accion=='1') {
        $('.nombrecond').show();
        $('.listacond').hide();
        $(' #agregarCondicion').show();
        $(' #btnEnviarLista').show();
        $(' #btnEliminarCondicion').hide();
    }
    else if (accion=='2') {
        $('.listacond').show();
        $('.nombrecond').show();
    }
    else if (accion=='3') {
        $('.listacond').show();
        $('.nombrecond').hide();
        $(' #btnEliminarCondicion').show();
        $(' #agregarCondicion').hide();
        $(' #btnEnviarLista').hide();
    }
    else {
        $('.listacond').hide()
        $('.nombrecond').hide()  
        $(' #btnEliminarCondicion').hide();
        $(' #agregarCondicion').hide();
        $(' #btnEnviarLista').hide();
    }
    
}


