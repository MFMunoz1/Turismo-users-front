var fotoDeptoList = [];

var form = document.getElementById('crear-depto-form');
form.addEventListener('submit', async function(e){
    e.preventDefault();

    var fotoDeptoList = [];
    // cargar imagen
    const userFile = document.getElementById('formFile').files[0];
    var image64 = await toBase64(userFile);

    var formData = new FormData(form);

    var fotoEnviar = {
        "tituloFotoDepto": "tituloFotoDepto",
        "fotoDepto": image64
    }

    fotoDeptoList.push(fotoEnviar);
    
    // añadiendo lista de serivicion a object plain 
    const plainObjectFormData = Object.fromEntries(formData.entries());
    const listaServicios = [
        {
            "idServicioDepto":3
        }
    ]
    const listaCondiciones = [
        {
            "idCondicion":3
        }
    ]
    plainObjectFormData.servicioDeptoList = listaServicios;
    plainObjectFormData.fotoDeptoList = fotoDeptoList
    plainObjectFormData.condicionesDeUsoList = listaCondiciones

    console.log(JSON.stringify(plainObjectFormData))
    
    fetch("http://localhost:8085/departamento/crear-depto",
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
    
    //Dont submit the form.
    return false; 
});

var toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});