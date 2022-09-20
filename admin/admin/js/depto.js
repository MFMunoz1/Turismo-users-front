var fotoDeptoList = [];
var selectCondicionesDeUso;
var condicionesDeUso = [];
var listCondicionesAgregadas = []

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

//espera que la pagina este totalmente cargada y ejecuta la funcion
//window hace referencia a la pagina (html),
window.addEventListener('load', async (event) => {
    // hace un get al endpoint indicado
    const respuesta = await fetch("http://localhost:8085/mantenedor/listar-condiciones");
    if(respuesta.status === 200) {
        condicionesDeUso = await respuesta.json();
        selectCondicionesDeUso = document.getElementById("select-condicion");
        condicionesDeUso.forEach(condicion => {
            var option = document.createElement("option");
            option.value = condicion.idCondicion
            option.text = condicion.tipoCondicionDeUso
            selectCondicionesDeUso.add(option)
        })
    }else if(respuesta.status === 401) {
        console.log("error 401")
    } else if(respuesta.status === 404) {
        console.log("error 404")
    }
});

var btnCondicion = document.getElementById("btn-agregar-condicion");
var listadoCondicionesSeleccionadas = document.getElementById("list-condiciones");
btnCondicion.addEventListener('click', function(){

    var value = selectCondicionesDeUso.value;
    // guarda el texto seleccionado del select
    var textoSeleccionado = selectCondicionesDeUso.options[selectCondicionesDeUso.selectedIndex].text;
    text = "prohibdo fumar"
    var divPadreCondicion = document.createElement("div")
    var spanTituloCondicion = document.createElement("span")
    
    if(text !== "Seleccione condicion" && !listCondicionesAgregadas.includes(textoSeleccionado)) {
        listCondicionesAgregadas.push(textoSeleccionado);
        spanTituloCondicion.textContent = textoSeleccionado;
        divPadreCondicion.appendChild(spanTituloCondicion)
        divPadreCondicion.classList.add = "d-flex w-100 align-items-center justify-content-between";
        listadoCondicionesSeleccionadas.appendChild(divPadreCondicion)
    }    
})