//SE LISTAN TODOS LOS DEPTOS
let url = "http://localhost:8085/departamento/listar-deptos";
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))


        const mostrarData = (data) =>{
            console.log(data);
            let body = ""
            for(let i = 0; i< data.length; i++){
                body += `<tr><td value=${data[i].idDepartamento}>${data[i].idDepartamento}</td><td>${data[i].direccion}</td><td>${data[i].comuna}</td><td>${data[i].region}</td><td>${data[i].estado}</td>
                <td><button class="btn btn-primary col-sm-12">Modificar</button></td>
                <td><button class="btn btn-danger col-sm-12" name="delete">Eliminar</button></td></tr>`
            }
            document.getElementById('data').innerHTML = body
        }

//FALTA AGREGAR FUNCIONALIDAD A BOTON DE MODIFICAR DEPTO
document.getElementById("data").addEventListener('click', (e)=>{
    console.log()
    var idDepto = e.target.parentElement.parentElement.firstChild.textContent
    var ruta = "http://localhost:8085/departamento/eliminar-depto?id_depto=" + idDepto;
    fetch(ruta, {
    method: "DELETE",
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Accept": "application/json"
     }
    }).then(
        e.target.parentElement.parentElement.remove()
    )

})