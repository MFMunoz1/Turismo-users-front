let url = "http://localhost:8085/usuario-sistema/listar-all-users";
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))


        const mostrarData = (data) =>{
            console.log(data);
            let body = ""
            for(let i = 0; i< data.length; i++){
                body += `<tr><td>${data[i].idUsuario}</td><td>${data[i].tipoUsuario}</td><td>${data[i].nombreUsuario}</td><td>${data[i].emailUsuario}</td>
                <td>${data[i].telefonoUsuario}</td><td>${data[i].rutUsuario}</td></tr>`
            }
            document.getElementById('data').innerHTML = body
        }

       