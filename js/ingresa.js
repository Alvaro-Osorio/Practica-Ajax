$(document).ready(function() {
    //La etiqueta "button" va a funcionar como un botón jQuery
    $("#btnEnviar").button();

    //Al recibir click, hará algo
    $('#btnEnviar').click(function(event) {
        event.preventDefault(); //para que no haga el submit
        var sURL = 'login.php';
        var sCve = $('#txtCve').val();
        var sPwd = $('#txtPwd').val();

        var llamada = $.post(
            sURL, //URL
            { //Datos de envío
                txtCve: sCve,
                txtPwd: sPwd
            },
            function(oDatos) { //trabajo a realizar en caso de éxito
                //Si la respuesta es OK, cambia el contenido
                if (oDatos.sSit == 'Ok') {
                    $('#espacio1').html(''); //Quitó el formulario
                    $('#espacio1').html('<h3>Inicio</h3>' +
                        '<h4>Bienvenido ' + oDatos.sNom + '</h4>' +
                        '<h4>Eres tipo ' + oDatos.sTipo + '</h4>' +
                        '<div class="por_columnas"></div>');
                    //Agrega una liga al menú
                    if (oDatos.sTipo == "Alumno") {
                        oLigaNva = $('<a/>');
                        oLigaNva.attr('href', 'tabMaterias.php');
                        oLigaNva.html('ABC Materias');
                        $('#nuevo').append(oLigaNva);
                    }
                    if (oDatos.sTipo == "Administrador") {
                        oLigaNva = $('<a/>');
                        oLigaNva.attr('href', 'tabAlumnos.php');
                        oLigaNva.html('ABC Alumnos');
                        $('#nuevo').append(oLigaNva);
                    }
                    //Cambiar la liga del menú
                    $('#ligaSalir').attr('href', 'logout.php');
                    $('#ligaSalir').html('Salir');
                } else {
                    //Error "de negocio"
                    sError = oDatos.sNom;
                    alert(sError);
                }
            }); //fin llamada

        //Informativo
        llamada.done(function() {
                console.log("terminado");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("completado");
            });
    }); //fin de la definición del click del botón
}); //fin del ready