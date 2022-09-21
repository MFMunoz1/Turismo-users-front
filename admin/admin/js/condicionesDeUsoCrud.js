var condicionesDeUso = [];
var arrayCondicionesDeUso =[];
var selectCondiciones;
var form = document.getElementById('condicionesDeUsoForm');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    // añadiendo lista de serivicion a object plain 
    const plainObjectFormData = Object.fromEntries(formData.entries());
    condicionesDeUso.push(plainObjectFormData)
    
    return false; 
});

var btnEnviarLista = document.getElementById('btnEnviarLista');
btnEnviarLista.addEventListener('click', ()=>{
    console.log(condicionesDeUso)

    fetch("http://localhost:8085/mantenedor/crear-condiciones-de-uso",
    {
    
       body: JSON.stringify(condicionesDeUso),
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
})

window.addEventListener('load', async (event) => {
    // hace un get al endpoint indicado
    const respuesta = await fetch("http://localhost:8085/mantenedor/listar-condiciones");
    if(respuesta.status === 200) {
        arrayCondicionesDeUso = await respuesta.json();
        selectCondiciones = document.getElementById("selectCondicionDeUso");
        arrayCondicionesDeUso.forEach(condicion => {
            var option = document.createElement("option");
            option.value = condicion.idCondicion
            option.text = condicion.tipoCondicionDeUso
            selectCondiciones.add(option)
        })
    }else if(respuesta.status === 401) {
        console.log("error 401")
    } else if(respuesta.status === 404) {
        console.log("error 404")
    }
});


var btnEliminarCondicion = document.getElementById('btnEliminarCondicion');
btnEliminarCondicion.addEventListener('click', ()=>{
    selectCondiciones = document.getElementById("selectCondicionDeUso");
    var idCondicionDeUso =  selectCondiciones.value;
    console.log(idCondicionDeUso)
    var ruta = "http://localhost:8085/mantenedor/eliminar-condicion-de-uso?idCondicionDeUso=" + idCondicionDeUso;
    console.log(ruta);
    fetch(ruta, {
    method: "DELETE",
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Accept": "application/json"
     }
 }).then(
     
     console.log("200")
 );

    });