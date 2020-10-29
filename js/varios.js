function evalua(oCve) {
    var sErr = "";
    var bRet = false;

    if ($('#txtClave').prop("readonly") == false && $('#txtClave').val() == "")
        sErr = sErr + "\n Falta clave";

    if ($('#txtContrasenia').prop("disabled") == false && $('#txtContrasenia').val() == "")
        sErr = sErr + "\n Falta password";

    if ($('#txtRepite').prop("disabled") == false && $('#txtRepite').val() == "")
        sErr = sErr + "\n Falta repetir password";

    if ($('#txtContrasenia').prop("disabled") == false &&
        $('#txtRepite').prop("disabled") == false &&
        $('#txtContrasenia').val() != $('#txtRepite').val())
        sErr = sErr + "\n Los password no coinciden";

    if ($('#txtNombre').prop("readonly") == false && $('#txtNombre').val() == "")
        sErr = sErr + "\n Falta nombre";

    if ($('#txtApePat').prop("readonly") == false && $('#txtApePat').val() == "")
        sErr = sErr + "\n Falta apellido paterno";
    if ($('#txtNumero').prop("readonly") == false && $('#txtNumero').val() == "")
        sErr = sErr + "\n Falta numero de control";
    if ($('#txtCve').prop("readonly") == false && $('#txtCve').val() == "")
        sErr = sErr + "\n Falta falta clave carrera";
    if ($('#txtSem').prop("readonly") == false && $('#txtSem').val() == "")
        sErr = sErr + "\n Falta semestre";
    if (sErr == "")
        bRet = true;
    else
        alert(sErr);

    return bRet;
}

//Inicialización de elementos jQuery
$(document).ready(function() {
    //Se trata de tabla y edición de Alumnos
    if ($("#dlgEdicionAlumno") != null) {
        //Configurar diálogo de edición
        $("#dlgEdicionAlumno").dialog({
            autoOpen: false,
            show: {
                effect: "fold",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            },
            modal: true,
            open: function() {
                var sOpe = $(this).data("ope");
                var bCveEditable = false,
                    bCampoEditable = false;
                var sNomBoton = "Eliminar";
                var nNumCtrl;
                var nCarrera;
                var nSem;
                $("#txtOpe").val(sOpe);
                $("#txtClave").val($(this).data("cve"));
                $("#txtNombre").val($(this).data("nom"));
                $("#txtApePat").val($(this).data("apePat"));
                $("#txtApeMat").val($(this).data("apeMat"));
                $("#txtNumero").val($(this).data("num"));
                nNumCtrl = parseInt($(this).data("num"), 10);
                $("#txtNumCtrl").val(nNumCtrl);
                $("#txtCve").val($(this).data("carrera"));
                nCarrera = parseInt($(this).data("carrera"), 10);
                $("#txtNumCtrl").val(nCarrera);
                $("#txtSem").val($(this).data("sem"));
                nSem = parseInt($(this).data("sem"), 10);
                $("#txtSem").val(nSem);

                if (sOpe == "a") {
                    bCveEditable = true;
                    bCampoEditable = true;
                    sNomBoton = "Agregar";
                } else if (sOpe == "m") {
                    bCampoEditable = true;
                    sNomBoton = "Modificar";
                }

                $("#txtClave").attr("readonly", !bCveEditable);
                $("#txtContrasenia").attr("disabled", !bCampoEditable);
                $("#txtRepite").attr("disabled", !bCampoEditable);
                $("#txtNombre").attr("disabled", !bCampoEditable);
                $("#txtApePat").attr("disabled", !bCampoEditable);
                $("#txtApeMat").attr("disabled", !bCampoEditable);
                $("#txtNumero").attr("disabled", !bCampoEditable);
                $("#txtCve").attr("disabled", !bCampoEditable);
                $("#txtSem").attr("disabled", !bCampoEditable);
                $("#btnGuardarAlumno").text(sNomBoton);
            }
        });
    }

    //Configurar botón del dlg para llamada parcial
    $("#btnGuardarAlumno").button();
    $('#btnGuardarAlumno').click(function(event) {
        var bDatosValidos = false;
        event.preventDefault(); //para que no haga el submit
        bDatosValidos = evalua($("#txtClave"));

        if (bDatosValidos) {
            var llamada = $.post(
                'resABCalumno.php', //URL
                { //Datos de envío
                    txtClave: $('#txtClave').val(),
                    txtOpe: $('#txtOpe').val(),
                    txtContrasenia: $('#txtContrasenia').val(),
                    txtNombre: $('#txtNombre').val(),
                    txtApePat: $('#txtApePat').val(),
                    txtApeMat: $('#txtApeMat').val(),
                    txtNumero: $('#txtNumero').val(),
                    txtCve: $('#txtCve').val(),
                    txtSem: $('#txtSem').val()
                },
                function(oDatos) { //trabajo a realizar en caso de éxito
                    var linea, celdaCve, celdaNom, celdaApePat, celdaApeMat,
                        celdaSalario, celdaCtrls;
                    var btnModif, btnElim;
                    var celdas;
                    var idx;
                    var i = 0;
                    //Si la respuesta es OK, cambia el contenido
                    if (oDatos.sSit == 'Ok') {
                        //Si la operación es "a", agregar un registro a la tabla
                        if ($('#txtOpe').val() == "a") {
                            linea = $('<tr/>').attr("id", "lin" + $('#tblAlum tr').length);
                            celdaCve = $('<td/>');
                            celdaNom = $('<td/>');
                            celdaApePat = $('<td/>');
                            celdaApeMat = $('<td/>');
                            celdaNumCtrl = $('<td/>');
                            celdaCarrera = $('<td/>');
                            celdaSem = $('<td/>');
                            celdaCtrls = $('<td/>');
                            btnModif = $('<input/>').attr({
                                type: "submit",
                                class: "ui-button ui-corner-all",
                                value: "Modificar",
                                onclick: "txtCveTbl.value='" + $('#txtClave').val() +
                                    "'; txtOpeTbl.value='m'; txtIdxTbl.value='lin" + $('#tblAlum tr').length + "';llamaEditarAlumno();"
                            });
                            btnElim = $('<input/>').attr({
                                type: "submit",
                                class: "ui-button ui-corner-all",
                                value: "Borrar",
                                onclick: "txtCveTbl.value='" + $('#txtClave').val() +
                                    "'; txtOpeTbl.value='b'; txtIdxTbl.value='lin" + $('#tblAlum tr').length + "';llamaEditarAlumno();"
                            });
                            //Pasar datos a las celdas
                            celdaCve.text($('#txtClave').val());
                            celdaNom.text($('#txtNombre').val());
                            celdaApePat.text($('#txtApePat').val());
                            celdaApeMat.text($('#txtApeMat').val());
                            celdaNumCtrl.text($('#txtNumero').val());
                            celdaCarrera.text($('#txtCve').val());
                            celdaSem.text($('#txtSem').val());
                            celdaCtrls.append(btnModif, btnElim);
                            //Pasar celdas a línea
                            linea.append(celdaCve, celdaNom, celdaApePat, celdaApeMat,
                                celdaNumCtrl, celdaCarrera, celdaSem, celdaCtrls);
                            //Pasar línea a tabla
                            $('#tblAlum').append(linea);
                        } else {
                            //En otro caso buscar la línea a afectar/eliminar
                            idx = $("#txtIdxTbl").val();
                            if ($('#txtOpe').val() == "m") {
                                celdas = $("#" + idx).children();
                                celdas.each(function() {
                                    switch (i) {
                                        case 1: //nombre
                                            $(this).text($('#txtNombre').val());
                                            break;
                                        case 2: //ape-pat
                                            $(this).text($('#txtApePat').val());
                                            break;
                                        case 3: //ape-mat
                                            $(this).text($('#txtApeMat').val());
                                            break;
                                        case 4: //numero de ctrl
                                            $(this).text($('#txtNumero').val());
                                            break;
                                        case 5: //numero de carrera
                                            $(this).text($('#txtCve').val());
                                            break;
                                        case 6: //numero de semestre
                                            $(this).text($('#txtSem').val());
                                            break;
                                    }
                                    i++;
                                });
                            } else {
                                $("#" + idx).remove();
                            }
                        }
                        //Limpiar campos idx, contraseña y repite
                        $('#txtContrasenia').val('');
                        $('#txtRepite').val('');
                        $("#txtIdxTbl").val('');
                    } else {
                        //Error "de negocio"
                        alert(oDatos.sError);
                    }
                }); //fin llamada

            //Informativo
            llamada.done(function() {
                    console.log("terminado");
                })
                .fail(function() {
                    console.log("error");
                    alert("Error al llamar al servidor");
                })
                .always(function() {
                    console.log("completado");
                });
            $("#dlgEdicionAlumno").dialog("close");
        } //Fin datos ok
    }); //fin de la definición del click del botón
});

function llamaEditarAlumno() {
    var ope = $("#txtOpeTbl").val();
    var idx = $("#txtIdxTbl").val();
    var celdas;
    var i = 0;
    $("#dlgEdicionAlumno").data("ope", ope);
    //Dependiendo de la operación, pasar datos al espacio de información

    if (ope == 'a') {
        $("#dlgEdicionAlumno").data("cve", "");
        $("#dlgEdicionAlumno").data("nom", "");
        $("#dlgEdicionAlumno").data("apePat", "");
        $("#dlgEdicionAlumno").data("apeMat", "");
        $("#dlgEdicionAlumno").data("num", "");
        $("#dlgEdicionAlumno").data("carrera", "");
        $("#dlgEdicionAlumno").data("sem", "");
    } else {
        celdas = $("#" + idx).children();
        celdas.each(function() {
            switch (i) {
                case 0:
                    $("#dlgEdicionAlumno").data("cve", $(this).text());
                    break;
                case 1:
                    $("#dlgEdicionAlumno").data("nom", $(this).text());
                    break;
                case 2:
                    $("#dlgEdicionAlumno").data("apePat", $(this).text());
                    break;
                case 3:
                    $("#dlgEdicionAlumno").data("apeMat", $(this).text());
                    break;
                case 4:
                    $("#dlgEdicionAlumno").data("num", $(this).text());
                    break;
                case 5:
                    $("#dlgEdicionAlumno").data("carrera", $(this).text());
                    break;
                case 6:
                    $("#dlgEdicionAlumno").data("sem", $(this).text());
                    break;
            }
            i++;
        });
        $("#dlgEdicionAlumno").data("cve", $("#txtCveTbl").val());
    }


    $("#dlgEdicionAlumno").dialog("open");
}