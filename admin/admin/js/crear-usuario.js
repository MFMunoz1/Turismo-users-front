var form = document.getElementById('crear-usuario-form');
form.addEventListener('submit', async function(e){
    e.preventDefault();
    var formData = new FormData(form);
    // añadiendo lista de serivicion a object plain 
    const plainObjectFormData = Object.fromEntries(formData.entries());
    
    fetch("http://localhost:8085/usuario-sistema/save-usuario-sistema",
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
        alert("Usuario creado exitosamente"),
        location.reload()
    );
    
    //Dont submit the form.
    return false; 
});


//-------------------------------------VALIDACIONES-------------------------------------------
//PERMITIR SOLO TEXTO CAMPO "NOMBRE Y APELLIDO"
function txNombres() {
    if ((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))
     event.returnValue = false;
}

//AUTOFORMATEAR RUT
function formatearRut(){

    $('#inputRut').inputmask({
        mask: '9{1,2}.9{3}.9{3}-K|k|9',
        casing: 'upper',
        clearIncomplete: true,
        numericInput: true,
        positionCaretOnClick: 'none'
    });
}

//VALIDAR MAIL (ES CORRECTO O NO)
function validarCorreo(correo){
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(correo);
    if(esValido == true){
        $('#errorMail').text("Correo válido").css("color", "green");
        document.getElementById("registrar-cliente").disabled = false;
    }else{
        $('#errorMail').text("Correo NO es válido").css("color", "red");
        document.getElementById("registrar-cliente").disabled = true;
    }

}

//VALIDAR CONTRASEÑAS IGUALES
function comparar_pass(){
    $(document).ready(function() {
        $('#pass_1').keyup(function(){
            var pass1 = $('#inputContrasenia').val();
            var pass2 = $('#pass_1').val();
            
            if(pass2 == pass1){
                $('#error2').text("Coinciden").css("color", "green");
                document.getElementById("registrar-cliente").disabled = false;
            }else{
                $('#error2').text("No coinciden").css("color", "red");
                document.getElementById("registrar-cliente").disabled = true;
            }
    
            if(pass2 == ""){
                $('#error2').text("No se puede dejar en blanco").css("color", "red");
            }
        })
    });
}