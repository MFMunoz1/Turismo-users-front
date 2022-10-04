var selectTipoServicioExtra;
var fotoTourList = [];
selectTipoServicioExtra= document.getElementById('selectServicioExtra');

console.log(selectTipoServicioExtra.value);
// var IdServicioExtra = selectTipoServicioExtra.value;

var form = document.getElementById('formularioCrearServicioExtra');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    const plainObjectFormData = Object.fromEntries(formData.entries());
    plainObjectFormData.fotoTourList = fotoTourList
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

var toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

var btnCargarFoto = document.getElementById("btn-cargar-foto");
var tableImagenesTour = document.getElementById("table-body-imagenes-tour")
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
        "tituloFotoTour": tituloImagen,
        "fotoTourString": image64
    }

    tdImagen.appendChild(imgForImagen);
    trForImage.appendChild(tdTitle)
    trForImage.appendChild(tdImagen)
    tableImagenesTour.appendChild(trForImage)
    fotoTourList.push(fotoEnviar);
    console.log(fotoTourList)
})