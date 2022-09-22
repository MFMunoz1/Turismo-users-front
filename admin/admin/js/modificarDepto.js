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
                body += `<tr><td>${data[i].idDepartamento}</td><td>${data[i].direccion}</td><td>${data[i].comuna}</td><td>${data[i].region}</td><td>${data[i].estado}</td>
                <td><button type="submit" class="btn btn-primary col-sm-12">Modificar</button></td>
                <td><button type="submit" class="btn btn-danger col-sm-12">Eliminar</button></td></tr>`
            }
            document.getElementById('data').innerHTML = body
        }

//FALTA AGREGAR FUNCIONALIDAD A BOTON DE MODIFICAR DEPTO