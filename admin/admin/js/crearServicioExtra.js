var selectTipoServicioExtra;
selectTipoServicioExtra= document.getElementById('selectServicioExtra');

console.log(selectTipoServicioExtra.value);
// var IdServicioExtra = selectTipoServicioExtra.value;

var form = document.getElementById('formularioCrearServicioExtra');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    const plainObjectFormData = Object.fromEntries(formData.entries());
    var endpoint = "";
    if (selectTipoServicioExtra.value == "1") {
        endpoint="crear-servicio-extra-tour"
    }else if (selectTipoServicioExtra.value == "2"){
        endpoint="crear-servicio-extra-transporte"
    }else {
        console.log("se selecciono un value invalido")
        return false;
    }

    console.log(JSON.stringify(plainObjectFormData))

    var fullEndpoint = "http://localhost:8085/servicio-extra/" + endpoint 
    fetch(fullEndpoint,{
        body: JSON.stringify(plainObjectFormData),
        method: "post",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            "Accept": "application/json"
         }
    }).then(console.log("200"))
        
})