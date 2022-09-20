var fotoDeptoList = [];
var selectCondicionesDeUso;
var condicionesDeUso = [];
var selectServiciosDepto;
var serviciosDepto= [];
var listCondicionesAgregadas = [];
var listServiciosAgregadosDepto = [];
var listCondicionesAgregadosObject = [];
var listServiciosAgregadosObject = [];
//
var form = document.getElementById('crear-depto-form');
form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    // añadiendo lista de serivicion a object plain 
    const plainObjectFormData = Object.fromEntries(formData.entries());
    plainObjectFormData.fotoDeptoList = fotoDeptoList
    plainObjectFormData.servicioDeptoList = listServiciosAgregadosObject
    plainObjectFormData.condicionesDeUsoList = listCondicionesAgregadosObject
    
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


//----------CONDICIONES DE USO-------------------------------------------------------
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
    //text = "prohibdo fumar"
    var divPadreCondicion = document.createElement("div")
    var spanTituloCondicion = document.createElement("span")
    
    if(textoSeleccionado !== "Seleccione condicion" && !listCondicionesAgregadas.includes(value)) {
        listCondicionesAgregadas.push(value);
        listCondicionesAgregadosObject.push({
            idCondicion: value
        })
        spanTituloCondicion.textContent = textoSeleccionado;
        divPadreCondicion.appendChild(spanTituloCondicion)
        divPadreCondicion.classList.add = "d-flex w-100 align-items-center justify-content-between";
        listadoCondicionesSeleccionadas.appendChild(divPadreCondicion)
    }    
})

//----------SERVICIOS DEPTO---------------

window.addEventListener('load', async (event) => {
    const respuesta = await fetch("http://localhost:8085/mantenedor/listar-servicios-depto");
    if(respuesta.status === 200) {
        serviciosDepto = await respuesta.json();
        selectServiciosDepto = document.getElementById("select-servicio");
        serviciosDepto.forEach(servicio => {
            var option = document.createElement("option");
            option.value = servicio.idServicioDepto;
            option.text = servicio.tipoServicioDepto;
            selectServiciosDepto.add(option)
        })
    }else if(respuesta.status === 401) {
        console.log("error 401")
    } else if(respuesta.status === 404) {
        console.log("error 404")
    }
});

var btnServicioDepto = document.getElementById("btnServicioDepto");
var listadoServiciosDeptoSeleccionados = document.getElementById("list-servicios-depto");
btnServicioDepto.addEventListener('click', function(){

    var value = selectServiciosDepto.value;
    // guarda el texto seleccionado del select
    var textoSeleccionado = selectServiciosDepto.options[selectServiciosDepto.selectedIndex].text;
    //text = "prohibdo fumar"
    var divPadreServicioDepto = document.createElement("div")
    var spanTituloServicioDepto = document.createElement("span")
    
    if(textoSeleccionado !== "Seleccione servicio" && !listServiciosAgregadosDepto.includes(value)) {
        listServiciosAgregadosDepto.push(value);
        listServiciosAgregadosObject.push({
            idServicioDepto: value
        })
        spanTituloServicioDepto.textContent = textoSeleccionado;
        divPadreServicioDepto.appendChild(spanTituloServicioDepto)
        divPadreServicioDepto.classList.add = "d-flex w-100 align-items-center justify-content-between";
        listadoServiciosDeptoSeleccionados.appendChild(divPadreServicioDepto)
    }    
})

var btnCargarFoto = document.getElementById("btn-cargar-foto");
var tableImagenesDepto = document.getElementById("table-body-imagenes-depto")
btnCargarFoto.addEventListener('click', async function(){
    // cargar imagen
    const userFile = document.getElementById('formFile').files[0];
    const tituloImagen = document.getElementById('titulo-imagen').value;
    var trForImage = document.createElement("tr");
    var tdTitle = document.createElement("td")
    var tdImagen = document.createElement("td")
    var imgForImagen = document.createElement("img")
    var image64 = await toBase64(userFile);

    imgForImagen.src = image64
    imgForImagen.width = 100
    imgForImagen.height = 100

    tdTitle.textContent = tituloImagen
    
    var fotoEnviar = {
        "tituloFotoDepto": tituloImagen,
        "fotoDepto": image64
    }

    tdImagen.appendChild(imgForImagen);
    trForImage.appendChild(tdTitle)
    trForImage.appendChild(tdImagen)
    tableImagenesDepto.appendChild(trForImage)
    fotoDeptoList.push(fotoEnviar);
    console.log(fotoDeptoList)
})


