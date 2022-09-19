var form = document.getElementById('crear-depto-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    var formData = new FormData(form);

    const plainFormData = Object.fromEntries(formData.entries());
    const listaServicios = [
        {
            "idServicioDepto":1
        }
    ]
    plainFormData.servicioDeptoList = listaServicios;
    formDataJsonString = JSON.stringify(plainFormData);
    console.log(plainFormData)
    
    fetch("http://localhost:8085/departamento/crear-depto",
    {
       body: formDataJsonString,
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
    
    //Dont submit the form.
    return false; 
})