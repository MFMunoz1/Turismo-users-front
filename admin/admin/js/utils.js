function cerrarNav(){
    if (!document.getElementById("sidebar-menu").classList.contains('open')) {
        document.getElementById("sidebar-toggler").click();
    }
}

function loginUser(){

    var email = $('#txt-email-login').val();
    var password = $('#txt-password-login').val();
    
    $.ajax({
        url : "http://localhost:8085/usuario-sistema/login",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        data : {
            email: email,
            password: password
        },
        // data -> trae la respuesta del servicio
        success: function(data, textStatus, jqXHR)
        {
            if(data === ""){
                alert("Usuario no encontrado");
                return;
            }
            setCookie("user", data.nombreUsuario, 30);
            setCookie("tipo_usuario", data.tipoUsuario, 30);
            if(data.tipoUsuario === "Funcionario"){
                window.location.replace("checklist-reservas.html");
            }
            else if(data.tipoUsuario === "Administrador"){
                window.location.replace("actualizarEliminarDepto.html");
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Error al autenticarse")
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function cerrarSesion() {
    document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'tipo_usuario=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace("login.html");
};
