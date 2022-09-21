var selectTipoServicioExtra;
selectTipoServicioExtra= document.getElementById('selectServicioExtra');

console.log(selectTipoServicioExtra.text);
var IdServicioExtra = selectTipoServicioExtra.value;

var form = document.getElementById('formularioCrearServicioExtra');

if(IdServicioExtra.value =="Tour" ){
    form.addEventListener('submit', async function(e){
        e.preventDefault();
        var formData = new FormData(form);
        // añadiendo lista de serivicion a object plain 
        const plainObjectFormData = Object.fromEntries(formData.entries());
        
    
        fetch("http://localhost:8085/servicio-extra/crear-servicio-extra-tour",
        {
        
           body: JSON.stringify(plainObjectFormData),
           method: "post",
           mode: "cors",
           headers: {
               'Access-Control-Allow-Origin': '*',
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
        }).then(
            console.log("200")
        );
        
        // Dont submit the form.
        return false; 
    });
}

else if(IdServicioExtra.value =="Transporte" ){
    form.addEventListener('submit', async function(e){
        e.preventDefault();
        var formData = new FormData(form);
        // añadiendo lista de serivicion a object plain 
        const plainObjectFormData = Object.fromEntries(formData.entries());
        
    
        fetch("http://localhost:8085/servicio-extra/crear-servicio-extra-transporte",
        {
        
           body: JSON.stringify(plainObjectFormData),
           method: "post",
           mode: "cors",
           headers: {
               'Access-Control-Allow-Origin': '*',
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
        }).then(
            console.log("200")
        );
        
        // Dont submit the form.
        return false; 
    });
}
