let url = "http://localhost:8085/departamento/listar-deptos?estado=false";
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))


        const mostrarData = (data) =>{
            console.log(data);
            let body = ""
            for(let i = 0; i< data.length; i++){
                body += `<tr><td>${data[i].idDepartamento}</td><td>${data[i].nombreDepto}</td><td>${data[i].valorDiario}</td><td>${data[i].direccion}</td><td>${data[i].comuna}</td><td>${data[i].region}</td></tr>`
            }
            document.getElementById('data').innerHTML = body
        }

