let url = "http://localhost:8085/departamento/listar-deptos";
fetch(url).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))


        const mostrarData = (data) =>{
            // console.log(data);
            let body = '';
            for(let i = 0; i< data.length; i++){
                body += `<tr><td>${data[i].idDepartamento}</td><td>${data[i].direccion}</td><td>${data[i].comuna}</td><td>${data[i].region}</td><td>${data[i].estado}</td></tr>`
            }
            document.getElementById('data').innerHTML = body
        }

// window.addEventListener('load', async (event) => {
//     const respuesta = await fetch("http://localhost:8085/departamento/listar-deptos");
//     if(respuesta.status === 200) {
//         listadoDepto = respuesta.json();
//         console.log("200")
//         console.log(listadoDepto)
//         listadoDepto.forEach(element => {
//             console.log(element.direccion)
            
//         });
        

//     }else if(respuesta.status === 401) {
//         console.log("error 401")
//     } else if(respuesta.status === 404) {
//         console.log("error 404")
//     }
// });




