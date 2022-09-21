let url_tours = "http://localhost:8085/servicio-extra/listar-tours";
fetch(url_tours)
    .then(response => response.json())
    .then(data => mostrarData_tours(data))
    .catch(error => console.log(error))


        const mostrarData_tours = (data) =>{
            console.log(data);
            let body = ""
            for(let i = 0; i< data.length; i++){
                body += `<tr><td>${data[i].idServicioExtra}</td><td>${data[i].tituloTour}</td><td>${data[i].personaACargo}</td><td>${data[i].cantidadPersonasMax}</td><td>${data[i].region}</td>
                <td>${data[i].comuna}</td><td>${data[i].descripcionTour}</td></tr>`
            }
            document.getElementById('data_tours').innerHTML = body
        }

let url_transportes = "http://localhost:8085/servicio-extra/listar-transportes";
fetch(url_transportes)
        .then(response => response.json())
        .then(data => mostrarData_transportes(data))
        .catch(error => console.log(error))
        
        const mostrarData_transportes = (data) =>{
             console.log(data);
                let body = ""
                for(let i = 0; i< data.length; i++){
                    body += `<tr><td>${data[i].idServicioExtra}</td><td>${data[i].personaACargo}</td><td>${data[i].capacidadPasajeros}</td><td>${data[i].region}</td>
                    <td>${data[i].comuna}</td><td>${data[i].patente}</td><td>${data[i].modelo}</td><td>${data[i].marca}</td></tr>`
                    }
                    document.getElementById('data_transportes').innerHTML = body
            }